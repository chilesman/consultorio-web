import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
const emailFrom = Deno.env.get("EMAIL_FROM") ?? "";

const supabase = createClient(supabaseUrl, serviceRoleKey);
const resend = new Resend(resendApiKey);

serve(async (req) => {
  try {
    const { token } = await req.json();

    if (!token) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Token requerido",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data, error } = await supabase.rpc("confirm_appointment_by_token", {
      p_token: token,
    });

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

    if (
      data?.success === true &&
      data?.status === "confirmed" &&
      data?.correo
    ) {
      const { data: currentAppointment } = await supabase
        .from("appointments")
        .select("id, confirmation_success_email_sent_at")
        .eq("id", data.appointment_id)
        .single();

      if (
        currentAppointment &&
        !currentAppointment.confirmation_success_email_sent_at
      ) {
        await resend.emails.send({
          from: emailFrom,
          to: data.correo,
          subject: "Tu cita fue confirmada",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
              <h2>Tu cita fue confirmada</h2>
              <p>Hola <strong>${data.nombre}</strong>, tu cita quedó confirmada correctamente.</p>
              <p><strong>Fecha:</strong> ${data.fecha_cita}</p>
              <p><strong>Horario:</strong> ${String(data.hora_cita).slice(0, 5)}</p>
              <p><strong>Tipo:</strong> ${
                data.tipo_consulta === "online"
                  ? "Consulta en línea"
                  : "Consulta presencial"
              }</p>
            </div>
          `,
        });

        await supabase
          .from("appointments")
          .update({
            confirmation_success_email_sent_at: new Date().toISOString(),
          })
          .eq("id", data.appointment_id);
      }
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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