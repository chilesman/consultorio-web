import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
const emailFrom = Deno.env.get("EMAIL_FROM") ?? "";

const supabase = createClient(supabaseUrl, serviceRoleKey);
const resend = new Resend(resendApiKey);

serve(async () => {
  try {
    const { data, error } = await supabase.rpc(
      "cancel_expired_pending_appointments"
    );

    if (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const cancelledAppointments = data ?? [];

    for (const appointment of cancelledAppointments) {
      if (!appointment.correo) continue;

      await resend.emails.send({
        from: emailFrom,
        to: appointment.correo,
        subject: "Tu cita fue cancelada por falta de confirmación",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
            <h2>Cita cancelada por falta de confirmación</h2>
            <p>Hola <strong>${appointment.nombre}</strong>, tu cita fue cancelada automáticamente porque no se confirmó a tiempo.</p>
            <p><strong>Fecha:</strong> ${appointment.fecha_cita}</p>
            <p><strong>Horario:</strong> ${String(appointment.hora_cita).slice(0, 5)}</p>
            <p><strong>Tipo:</strong> ${
              appointment.tipo_consulta === "online"
                ? "Consulta en línea"
                : "Consulta presencial"
            }</p>
            <p>Puedes volver a agendar cuando lo necesites.</p>
          </div>
        `,
      });

      await supabase
        .from("appointments")
        .update({
          automatic_cancellation_notified_at: new Date().toISOString(),
        })
        .eq("id", appointment.appointment_id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        cancelledCount: cancelledAppointments.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error ? error.message : "Error interno desconocido",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});