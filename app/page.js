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
        console.error(error);
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
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <div>
            <h1 className="font-bold text-lg">Dr. José Antonio Reyes Hernández</h1>
            <p className="text-sm text-gray-500">
              Consulta médica · Vacunación · Electrocardiograma
            </p>
          </div>

          <a href="#agenda" className="bg-blue-600 text-white px-4 py-2 rounded-xl">
            Agendar
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="p-10 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">
          Atención médica profesional y de confianza
        </h2>

        <p className="mt-4 text-gray-600 max-w-2xl">
          Consulta médica integral, diagnóstico claro y seguimiento continuo.
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="https://calendar.app.google/HU8UzZuocbHrX9p38"
            target="_blank"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Agendar cita
          </a>

          <a
            href="https://wa.me/525533331304"
            target="_blank"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-xl"
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="p-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold">Servicios</h2>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">{s.name}</h3>
              <p className="text-gray-600 mt-2">{s.description}</p>
              <p className="mt-4 font-bold">${s.price} MXN</p>
            </div>
          ))}
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="p-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold">Agenda tu cita</h2>

        <p className="mt-4 text-gray-600">
          Selecciona tu horario disponible.
        </p>

        <a
          href="https://calendar.app.google/HU8UzZuocbHrX9p38"
          target="_blank"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Agendar ahora
        </a>

        <div className="mt-4">
          <a
            href="https://wa.me/525533331304"
            target="_blank"
            className="text-green-600 font-semibold"
          >
            O agenda por WhatsApp
          </a>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="bg-blue-600 text-white p-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold">Contacto</h2>
          <p className="mt-4">Teléfono: 5533331304</p>
          <p>Correo: doc.jareyes@gmail.com</p>
        </div>
      </section>

    </div>
  );
}