"use client";

import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase";

export default function Page() {
  const supabase = createClient();

  const [services, setServices] = useState([]);
  const [profile, setProfile] = useState({
    doctor_name: "Dr. José Antonio Reyes Hernández",
    bio: "",
    university: "",
    license: "",
    diplomas: "",
    postgraduate: "",
    phone: "5533331304",
    email: "doc.jareyes@gmail.com",
    address:
      "Avenida Chimalhuacán 285, segundo piso, Nezahualcóyotl, Estado de México, México.",
    schedule: "Lunes a jueves de 10:00 a 17:00 · Viernes de 10:00 a 15:00",
  });

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error cargando servicios:", error);
      } else {
        setServices(data || []);
      }
    }

    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error cargando perfil:", error);
      } else if (data) {
        setProfile(data);
      }
    }

    fetchServices();
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b bg-white p-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">
              {profile.doctor_name || "Dr. José Antonio Reyes Hernández"}
            </h1>
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
          Atención médica profesional y de confianza
        </h2>

        <p className="mt-4 max-w-2xl text-gray-600">
          {profile.bio ||
            "Consulta médica integral, diagnóstico claro y seguimiento continuo."}
        </p>

        <div className="mt-6 flex gap-4">
          <a
            href="https://calendar.app.google/HU8UzZuocbHrX9p38"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            Agendar cita
          </a>

          <a
            href={`https://wa.me/52${profile.phone || "5533331304"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-green-600 px-6 py-3 text-green-600"
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
            {profile.bio ||
              "Médico enfocado en atención integral, prevención, diagnóstico oportuno y seguimiento clínico."}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Universidad</p>
              <p className="text-gray-600">
                {profile.university || "Pendiente por agregar"}
              </p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Cédula profesional</p>
              <p className="text-gray-600">
                {profile.license || "Pendiente por agregar"}
              </p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Diplomados</p>
              <p className="text-gray-600">
                {profile.diplomas || "Pendiente por agregar"}
              </p>
            </div>

            <div className="rounded-xl border bg-slate-50 p-5">
              <p className="font-semibold">Posgrados / certificaciones</p>
              <p className="text-gray-600">
                {profile.postgraduate || "Pendiente por agregar"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="mx-auto max-w-7xl p-10">
        <h2 className="text-2xl font-bold">Agenda tu cita</h2>

        <p className="mt-4 text-gray-600">
          Selecciona tu horario disponible.
        </p>

        <a
          href="https://calendar.app.google/HU8UzZuocbHrX9p38"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          Agendar ahora
        </a>

        <div className="mt-4">
          <a
            href={`https://wa.me/52${profile.phone || "5533331304"}`}
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
            {profile.address ||
              "Avenida Chimalhuacán 285, segundo piso, Nezahualcóyotl, Estado de México, México."}
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
          <p className="mt-4">Teléfono y WhatsApp: {profile.phone || "5533331304"}</p>
          <p>Correo: {profile.email || "doc.jareyes@gmail.com"}</p>
          <p className="mt-2">
            {profile.schedule ||
              "Lunes a jueves de 10:00 a 17:00 · Viernes de 10:00 a 15:00"}
          </p>
        </div>
      </section>
    </div>
  );
}