"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../lib/supabase";

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function ImageGallery({ title, subtitle, items }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14">
      <SectionHeader title={title} subtitle={subtitle} />

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">
          Aún no hay contenido disponible en este apartado.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <img
                src={item.file_url}
                alt={title}
                className="h-72 w-full object-cover"
              />
              <div className="p-5">
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  Ver imagen completa
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Page() {
  const supabase = createClient();

  const [services, setServices] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [profile, setProfile] = useState({
    doctor_name: "Dr. José Antonio Reyes Hernández",
    bio: "",
    university: "",
    phone: "5533331304",
    email: "doc.jareyes@gmail.com",
    address:
      "Avenida Chimalhuacán 285, segundo piso, Nezahualcóyotl, Estado de México, México.",
    schedule: "Lunes a jueves de 10:00 a 17:00 · Viernes de 10:00 a 15:00",
  });

  useEffect(() => {
    async function loadData() {
      const [
        servicesRes,
        profileRes,
        licensesRes,
        documentsRes,
      ] = await Promise.all([
        supabase.from("services").select("*").order("id", { ascending: true }),
        supabase.from("profile").select("*").limit(1).single(),
        supabase.from("licenses").select("*").order("id", { ascending: true }),
        supabase.from("documents").select("*").order("id", { ascending: false }),
      ]);

      if (!servicesRes.error) setServices(servicesRes.data || []);
      if (!profileRes.error && profileRes.data) setProfile(profileRes.data);
      if (!licensesRes.error) setLicenses(licensesRes.data || []);
      if (!documentsRes.error) setDocuments(documentsRes.data || []);
    }

    loadData();
  }, [supabase]);

  const titleImages = useMemo(
    () => documents.filter((doc) => doc.category === "titulo_academico"),
    [documents]
  );

  const diplomaImages = useMemo(
    () => documents.filter((doc) => doc.category === "diplomado_certificacion"),
    [documents]
  );

  const clinicImages = useMemo(
    () => documents.filter((doc) => doc.category === "foto_consultorio"),
    [documents]
  );

  const publicityImages = useMemo(
    () => documents.filter((doc) => doc.category === "publicidad"),
    [documents]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xl font-bold text-slate-900">
              {profile.doctor_name || "Dr. José Antonio Reyes Hernández"}
            </p>
            <p className="text-sm text-slate-500">
              Consultorio médico · Atención integral
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/52${profile.phone || "5533331304"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 md:inline-block"
            >
              WhatsApp
            </a>

            <a
              href="#agenda"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Agendar
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              Consultorio privado
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Atención médica profesional, clara y cercana
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {profile.bio ||
                "Consulta médica integral, diagnóstico claro y seguimiento continuo."}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://calendar.app.google/HU8UzZuocbHrX9p38"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Agendar cita
              </a>

              <a
                href={`https://wa.me/52${profile.phone || "5533331304"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-white"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Información de consulta
            </h3>

            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">Ubicación</p>
                <p>{profile.address}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Horario</p>
                <p>{profile.schedule}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Contacto</p>
                <p>{profile.phone}</p>
                <p>{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeader
          title="Servicios"
          subtitle="Atención orientada a diagnóstico, seguimiento y prevención, con un enfoque práctico y profesional."
        />

        {services.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">
            Aún no hay servicios registrados.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {service.name}
                </h3>
                <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
                <p className="mt-5 text-lg font-bold text-slate-900">
                  ${service.price} MXN
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PERFIL */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <SectionHeader
            title="Perfil profesional"
            subtitle="Trayectoria, formación académica y datos relevantes para que el paciente conozca mejor al médico y su práctica."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Universidad
              </p>
              <p className="mt-3 text-lg text-slate-800">
                {profile.university || "Pendiente por agregar"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Horario
              </p>
              <p className="mt-3 text-lg text-slate-800">
                {profile.schedule || "Pendiente por agregar"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CÉDULAS */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeader
          title="Cédulas profesionales"
          subtitle="Registro de cédulas correspondientes a los distintos grados académicos y profesionales."
        />

        {licenses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-500">
            Aún no hay cédulas registradas.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {licenses.map((license) => (
              <div
                key={license.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {license.label}
                </p>
                <p className="mt-3 text-lg font-medium text-slate-900">
                  {license.license_number}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <ImageGallery
        title="Títulos académicos"
        subtitle="Documentación de grados académicos como licenciatura, especialidad, maestrías u otros estudios formales."
        items={titleImages}
      />

      <ImageGallery
        title="Diplomados y certificaciones"
        subtitle="Formación complementaria, constancias y certificaciones relevantes para la práctica profesional."
        items={diplomaImages}
      />

      <ImageGallery
        title="Consultorio"
        subtitle="Imágenes del espacio de atención para que el paciente conozca el entorno antes de su visita."
        items={clinicImages}
      />

      <ImageGallery
        title="Publicidad e información visual"
        subtitle="Material visual relacionado con servicios, campañas y contenidos informativos."
        items={publicityImages}
      />

      {/* AGENDA */}
      <section id="agenda" className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeader
          title="Agenda tu cita"
          subtitle="Selecciona el horario disponible o contacta directamente por WhatsApp."
        />

        <div className="flex flex-wrap gap-4">
          <a
            href="https://calendar.app.google/HU8UzZuocbHrX9p38"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Agendar ahora
          </a>

          <a
            href={`https://wa.me/52${profile.phone || "5533331304"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-white"
          >
            Agendar por WhatsApp
          </a>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <SectionHeader
            title="Ubicación"
            subtitle="Dirección del consultorio y mapa de referencia para facilitar tu visita."
          />

          <p className="text-base text-slate-700">{profile.address}</p>

          <iframe
            className="mt-6 rounded-2xl border border-slate-200"
            src="https://www.google.com/maps?q=avenida+chimalhuacan+285&output=embed"
            width="100%"
            height="340"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación del consultorio"
          />
        </div>
      </section>

      {/* CONTACTO */}
      <footer className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h2 className="text-2xl font-bold">Contacto</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Teléfono
              </p>
              <p className="mt-2">{profile.phone || "5533331304"}</p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Correo
              </p>
              <p className="mt-2">{profile.email || "doc.jareyes@gmail.com"}</p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Horario
              </p>
              <p className="mt-2">
                {profile.schedule ||
                  "Lunes a jueves de 10:00 a 17:00 · Viernes de 10:00 a 15:00"}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}