import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { Resend } from "npm:resend";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const resendApiKey = Deno.env.get("RESEND_API_KEY") ?? "";
const emailFrom = Deno.env.get("EMAIL_FROM") ?? "";
const medicoNotificationEmail =
  Deno.env.get("MEDICO_NOTIFICATION_EMAIL") ?? "";
const siteUrl = Deno.env.get("SITE_URL") ?? "";

const supabase = createClient(supabaseUrl, serviceRoleKey);
const resend = new Resend(resendApiKey);

serve(async (req) => {
  try {
    const { appointment_id } = await req.json();

    if (!appointment_id) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "appointment_id es requerido",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { data: appointment, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", appointment_id)
      .single();

    if (error || !appointment) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No se encontró la cita",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const confirmUrl = `${siteUrl}/confirmar?token=${appointment.confirmation_token}`;

    let patientEmailSent = false;
    let doctorEmailSent = false;

    if (
      appointment.correo &&
      !appointment.confirmation_required_email_sent_at
    ) {
      await resend.emails.send({
        from: emailFrom,
        to: appointment.correo,
        subject: "Confirma tu cita médica",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
            <h2>Confirma tu cita médica</h2>
            <p>Hola <strong>${appointment.nombre}</strong>, tu cita fue registrada correctamente.</p>
            <p><strong>Fecha:</strong> ${appointment.fecha_cita}</p>
            <p><strong>Horario:</strong> ${String(appointment.hora_cita).slice(0, 5)}</p>
            <p><strong>Tipo:</strong> ${
              appointment.tipo_consulta === "online"
                ? "Consulta en línea"
                : "Consulta presencial"
            }</p>
            <p>Para conservar tu espacio, confirma tu cita aquí:</p>
            <p>
              <a href="${confirmUrl}" style="display:inline-block;padding:12px 18px;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;">
                Confirmar cita
              </a>
            </p>
            <p>Si no confirmas dentro del tiempo establecido, la cita se cancelará automáticamente.</p>
          </div>
        `,
      });

      await supabase
        .from("appointments")
        .update({
          confirmation_required_email_sent_at: new Date().toISOString(),
        })
        .eq("id", appointment.id);

      patientEmailSent = true;
    }

    if (medicoNotificationEmail && !appointment.doctor_notification_sent_at) {
      await resend.emails.send({
        from: emailFrom,
        to: medicoNotificationEmail,
        subject: "Nueva cita agendada",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
            <h2>Nueva cita agendada</h2>
            <p><strong>Paciente:</strong> ${appointment.nombre}</p>
            <p><strong>Teléfono:</strong> ${appointment.telefono || "Sin dato"}</p>
            <p><strong>Correo:</strong> ${appointment.correo || "Sin dato"}</p>
            <p><strong>Fecha:</strong> ${appointment.fecha_cita}</p>
            <p><strong>Horario:</strong> ${String(appointment.hora_cita).slice(0, 5)}</p>
            <p><strong>Tipo:</strong> ${
              appointment.tipo_consulta === "online"
                ? "Consulta en línea"
                : "Consulta presencial"
            }</p>
            <p><strong>Estatus:</strong> ${appointment.status}</p>
          </div>
        `,
      });

      await supabase
        .from("appointments")
        .update({
          doctor_notification_sent_at: new Date().toISOString(),
        })
        .eq("id", appointment.id);

      doctorEmailSent = true;
    }

    return new Response(
      JSON.stringify({
        success: true,
        patientEmailSent,
        doctorEmailSent,
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