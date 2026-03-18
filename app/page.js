"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase";

export default function Page() {
  const [services, setServices] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from("services").select("*");

      if (error) {
        console.error("Error cargando servicios:", error);
      } else {
        setServices(data);
      }
    }

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b bg-white p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Dr. José Antonio Reyes Hernández</h1>
            <p className="text-sm text-gray-500">
              Consulta médica · Vacunación · Electrocardiograma
            </p>
          </div>

          <a
            href="#agenda"
            className="rounded-xl bg-blue-600 px-4 py-2 text-white"
          >
            Agendar
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl p-10">
        <h2 className="text-3xl font-bold">
          Diagnóstico claro y atención médica profesional
        </h2>
        <p className="mt-4 max-w-2xl text-gray-600">
          Atención médica integral con seguimiento profesional, trato cercano y
          orientación clara para cada paciente.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="https://calendar.app.google/HU8UzZuocbHrX9p38"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Agendar cita
          </a>

          <a
            href="https://wa.me/525533331304"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700"
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl p-10">
        <h2 className="text-2xl font-bold">Servicios</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="rounded-xl bg-white p-6 shadow">
              <h3 className="font-semibold">{s.name}</h3>
              <p className="mt-2 text-gray-600">{s.description}</p>
              <p className="mt-4 font-bold">${s.price} MXN</p>
            </div>
          ))}
        </div>
      </section>

      {/* PERFIL */}
      <section className="bg-white p-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">Perfil profesional</h2>
          <p className="mt-4 max-w-3xl text-gray-600">
            Médico enfocado en atención integral, prevención, diagnóstico
            oportuno y seguimiento clínico. Experiencia en consulta general y
            manejo de enfermedades crónicas.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Universidad</p>
              <p className="text-gray-600">[Agregar]</p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Cédula profesional</p>
              <p className="text-gray-600">[Agregar]</p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Diplomados</p>
              <p className="text-gray-600">[Agregar]</p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Posgrados / certificaciones</p>
              <p className="text-gray-600">[Agregar]</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTOS */}
      <section className="mx-auto max-w-7xl p-10">
        <h2 className="text-2xl font-bold">Formación y certificaciones</h2>
        <p className="mt-4 text-gray-600">
          Aquí puedes mostrar tus títulos, cédula, diplomados y certificaciones.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-white p-4 shadow">
            <img
              src="/titulo.jpg"
              alt="Título profesional"
              className="h-56 w-full rounded-lg object-cover"
            />
            <p className="mt-3 font-medium">Título profesional</p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow">
            <img
              src="/cedula.jpg"
              alt="Cédula profesional"
              className="h-56 w-full rounded-lg object-cover"
            />
            <p className="mt-3 font-medium">Cédula profesional</p>
          </div>

          <div className="rounded-xl border bg-white p-4 shadow">
            <img
              src="/diploma.jpg"
              alt="Diplomado o certificación"
              className="h-56 w-full rounded-lg object-cover"
            />
            <p className="mt-3 font-medium">Diplomado / certificación</p>
          </div>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="bg-white p-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">Reseñas</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border p-4">
              <p className="font-semibold">⭐⭐⭐⭐⭐ Paciente verificado</p>
              <p className="mt-2 text-gray-600">
                Excelente atención, explica todo claramente y genera mucha
                confianza.
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <p className="font-semibold">⭐⭐⭐⭐⭐ Google</p>
              <p className="mt-2 text-gray-600">
                Muy buena atención y trato profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="mx-auto max-w-7xl p-10">
        <h2 className="text-2xl font-bold">Agenda tu cita</h2>

        <p className="mt-4 max-w-2xl text-gray-600">
          Selecciona el horario disponible y agenda directamente en línea.
        </p>

        <a
          href="https://calendar.app.google/HU8UzZuocbHrX9p38"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Agendar cita ahora
        </a>

        <div className="mt-4">
          <a
            href="https://wa.me/525533331304"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-600"
          >
            O agenda por WhatsApp
          </a>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="bg-white p-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">Ubicación</h2>
          <p className="mt-4">
            Avenida Chimalhuacán 285, segundo piso, Nezahualcóyotl, Estado de
            México, México.
          </p>

          <iframe
            className="mt-4 rounded-xl"
            src="https://www.google.com/maps?q=avenida+chimalhuacan+285&output=embed"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación del consultorio"
          />
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-blue-600 p-10 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">Contacto</h2>
          <p className="mt-4">Teléfono y WhatsApp: 5533331304</p>
          <p>Correo: doc.jareyes@gmail.com</p>
          <p className="mt-2">
            Lunes a jueves de 10:00 a 17:00 · Viernes de 10:00 a 15:00
          </p>
        </div>
      </section>
    </div>
  );
}