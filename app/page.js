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

      {/* HEADER */}
      {/* (sin cambios) */}

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-sky-50 to-emerald-50" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-4xl font-bold">
            Atención médica confiable, clara y humana
          </h1>
        </div>
      </section>

      {/* TODO EL RESTO DE TU PÁGINA SIGUE IGUAL */}
      {/* (solo quitamos badges y stats, no se tocó nada más) */}

    </div>
  );
}