"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../lib/supabase";

function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={center ? "mx-auto mb-10 max-w-3xl text-center" : "mb-10"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-4 text-lg leading-8 text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            Number(rating) >= star
              ? "text-xl text-yellow-500"
              : "text-xl text-slate-300"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

function InfoCard({ title, description }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <details className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
        {question}
      </summary>
      <p className="mt-3 text-sm leading-7 text-slate-600">{answer}</p>
    </details>
  );
}

export default function Page() {
  const supabase = createClient();

  const [services, setServices] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [reviews, setReviews] = useState([]);
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
        reviewsRes,
      ] = await Promise.all([
        supabase.from("services").select("*").order("id", { ascending: true }),
        supabase.from("profile").select("*").limit(1).single(),
        supabase.from("licenses").select("*").order("id", { ascending: true }),
        supabase.from("documents").select("*").order("id", { ascending: false }),
        supabase.from("reviews").select("*").order("id", { ascending: false }),
      ]);

      if (!servicesRes.error) setServices(servicesRes.data || []);
      if (!profileRes.error && profileRes.data) setProfile(profileRes.data);
      if (!licensesRes.error) setLicenses(licensesRes.data || []);
      if (!documentsRes.error) setDocuments(documentsRes.data || []);
      if (!reviewsRes.error) setReviews(reviewsRes.data || []);
    }

    loadData();
  }, [supabase]);

  const profilePhoto = useMemo(
    () => documents.find((doc) => doc.category === "foto_profesional"),
    [documents]
  );

  const clinicImages = useMemo(
    () => documents.filter((doc) => doc.category === "foto_consultorio"),
    [documents]
  );

  const titleImages = useMemo(
    () => documents.filter((doc) => doc.category === "titulo_academico"),
    [documents]
  );

  const diplomaImages = useMemo(
    () => documents.filter((doc) => doc.category === "diplomado_certificacion"),
    [documents]
  );

  const topReviews = useMemo(() => reviews.slice(0, 3), [reviews]);
  const featuredServices = useMemo(() => services.slice(0, 6), [services]);

  const whatsappUrl = `https://wa.me/52${profile.phone || "5533331304"}`;
  const bookingUrl = "https://calendar.app.google/HU8UzZuocbHrX9p38";

  const doctorName = profile.doctor_name || "Dr. José Antonio Reyes Hernández";
  const doctorShortName = doctorName.replace(/^Dr\.\s*/i, "");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
      >
        Agendar por WhatsApp
      </a>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-lg font-bold text-slate-900 md:text-xl">
              {doctorName}
            </p>
            <p className="text-sm text-slate-500">
              Médico general · Consulta privada · Atención integral
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Agendar por WhatsApp
            </a>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
            >
              Reservar en línea
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-sky-50 to-emerald-50" />
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm">
              Consulta médica privada en Nezahualcóyotl
            </p>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              Atención médica confiable, clara y humana para ti y tu familia
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Consulta médica integral con diagnóstico, tratamiento y
              seguimiento. Agenda de forma rápida por WhatsApp o reserva en
              línea en pocos minutos.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Agendar por WhatsApp
              </a>

              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Reservar en línea
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Diagnóstico y explicación clara
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Entiende qué tienes, qué hacer y qué vigilar.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Tratamiento y seguimiento
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Atención orientada a resolver y dar continuidad.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Consulta humana y profesional
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Trato cercano, serio y enfocado en tu bienestar.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
            <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                {profilePhoto ? (
                  <img
                    src={profilePhoto.file_url}
                    alt={`Foto profesional de ${doctorName}`}
                    className="h-[280px] w-full object-cover md:h-[320px]"
                  />
                ) : (
                  <div className="flex h-[280px] items-center justify-center text-sm text-slate-400">
                    Agrega una foto profesional en el panel
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {doctorName}
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {profile.bio ||
                    "Brindo atención médica con enfoque humano, diagnóstico claro y seguimiento cercano."}
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Dirección</p>
                    <p className="mt-2">{profile.address}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Horario</p>
                    <p className="mt-2">{profile.schedule}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Contacto</p>
                    <p className="mt-2">{profile.phone}</p>
                    <p>{profile.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Atención"
          title="¿En qué puedo ayudarte?"
          subtitle="Consulta orientada a valorar síntomas, dar tratamiento y acompañar tu salud."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <InfoCard title="Consulta general" description="Valoración médica integral." />
          <InfoCard title="Control de enfermedades" description="Seguimiento clínico." />
          <InfoCard title="Síntomas agudos" description="Atención inmediata." />
          <InfoCard title="Prevención" description="Chequeos y orientación." />
          <InfoCard title="Explicación clara" description="Diagnóstico entendible." />
          <InfoCard title="Atención familiar" description="Consulta cercana." />
        </div>
      </section>

      <section id="agenda" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] bg-slate-900 px-8 py-12 text-white text-center">
          <h2 className="text-3xl font-bold">Agenda tu consulta</h2>
          <div className="mt-6 flex justify-center gap-4">
            <a href={whatsappUrl} className="bg-green-600 px-6 py-3 rounded-xl">
              WhatsApp
            </a>
            <a href={bookingUrl} className="border px-6 py-3 rounded-xl">
              Reservar
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white text-center p-6">
        {doctorName}
      </footer>
    </div>
  );
}