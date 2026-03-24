"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "../../lib/supabase";

function ConfirmarPageContent() {
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Validando tu confirmación...");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function confirmAppointment() {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("No se encontró un token válido.");
        return;
      }

      const { data, error } = await supabase.functions.invoke(
        "confirm-appointment",
        {
          body: { token },
        }
      );

      if (error) {
        setStatus("error");
        setMessage(error.message || "No fue posible confirmar la cita.");
        return;
      }

      if (!data?.success) {
        if (data?.status === "expired") {
          setStatus("expired");
          setMessage(
            "La confirmación expiró y la cita fue cancelada automáticamente."
          );
          setDetails(data);
          return;
        }

        if (data?.status === "cancelled") {
          setStatus("cancelled");
          setMessage("La cita ya fue cancelada.");
          setDetails(data);
          return;
        }

        setStatus("error");
        setMessage(data?.message || "No fue posible confirmar la cita.");
        setDetails(data || null);
        return;
      }

      if (data?.status === "already_confirmed") {
        setStatus("confirmed");
        setMessage("La cita ya estaba confirmada.");
        setDetails(data);
        return;
      }

      setStatus("confirmed");
      setMessage("Tu cita fue confirmada correctamente.");
      setDetails(data);
    }

    confirmAppointment();
  }, [searchParams, supabase]);

  const title =
    status === "loading"
      ? "Validando cita"
      : status === "confirmed"
      ? "Cita confirmada"
      : status === "expired"
      ? "Confirmación expirada"
      : status === "cancelled"
      ? "Cita cancelada"
      : "No se pudo confirmar";

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Confirmación de cita
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">{title}</h1>

        <p className="mt-4 text-base leading-7 text-slate-600">{message}</p>

        {details ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {details.nombre ? (
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Paciente
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {details.nombre}
                </p>
              </div>
            ) : null}

            {details.fecha_cita ? (
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Fecha
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {details.fecha_cita}
                </p>
              </div>
            ) : null}

            {details.hora_cita ? (
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Horario
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {String(details.hora_cita).slice(0, 5)}
                </p>
              </div>
            ) : null}

            {details.tipo_consulta ? (
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tipo
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {details.tipo_consulta === "online"
                    ? "Consulta en línea"
                    : "Consulta presencial"}
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8">
          <a
            href="/"
            className="inline-flex rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

function ConfirmarPageFallback() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Confirmación de cita
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Validando cita
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Cargando información de confirmación...
        </p>
      </div>
    </div>
  );
}

export default function ConfirmarPage() {
  return (
    <Suspense fallback={<ConfirmarPageFallback />}>
      <ConfirmarPageContent />
    </Suspense>
  );
}