"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../lib/supabase";

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
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
            Number(rating) >= star ? "text-yellow-500 text-xl" : "text-slate-300 text-xl"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ImageGallery({ title, subtitle, items }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeader title={title} subtitle={subtitle} />

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-slate-500 shadow-sm">
          Aún no hay contenido disponible en este apartado.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={item.file_url}
                alt={title}
                className="h-72 w-full object-cover"
              />
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
        supabase.from("services").select("*"),
        supabase.from("profile").select("*").limit(1).single(),
        supabase.from("licenses").select("*"),
        supabase.from("documents").select("*"),
        supabase.from("reviews").select("*"),
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader title="Servicios" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-3xl border p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="mt-3 text-sm">{service.description}</p>
              <p className="mt-5 font-bold">${service.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader title="Opiniones de pacientes" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl border p-6 shadow-sm">
              <p className="font-semibold">{review.patient_name}</p>
              <Stars rating={review.rating} />
              <p className="mt-4 text-sm">{review.review_text}</p>
            </div>
          ))}
        </div>
      </section>

      <ImageGallery title="Títulos académicos" items={titleImages} />
      <ImageGallery title="Diplomados" items={diplomaImages} />
      <ImageGallery title="Consultorio" items={clinicImages} />

    </div>
  );
}