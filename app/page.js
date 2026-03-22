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

function RatingSelector({ rating, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-3xl transition ${
            Number(rating) >= star ? "text-yellow-500" : "text-slate-300"
          }`}
          aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function InfoCard({ title, description, icon = "•" }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-lg font-bold text-cyan-700">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        </div>
      </div>
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

function ReviewCard({ review }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-cyan-50/40 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {review.patient_name}
          </p>
          <div className="mt-2">
            <Stars rating={review.rating} />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {review.verified ? (
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-800">
              Verificada
            </span>
          ) : null}

          {review.verified && review.verification_type ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700">
              {review.verification_type === "consulta"
                ? "Consulta asistida"
                : review.verification_type === "agenda"
                ? "Cita agendada"
                : "Manual"}
            </span>
          ) : null}
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-700">
        {review.review_text}
      </p>
    </div>
  );
}

function CTAButtons({
  whatsappUrl,
  bookingUrl,
  primaryText,
  secondaryText,
  dark = false,
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-2xl px-6 py-3 text-center font-semibold transition ${
          dark
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {primaryText}
      </a>

      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`rounded-2xl px-6 py-3 text-center font-semibold transition ${
          dark
            ? "border border-white/20 bg-white/10 text-white hover:bg-white/15"
            : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
        }`}
      >
        {secondaryText}
      </a>
    </div>
  );
}

const DEFAULT_CONFIG = {
  booking_url: "https://calendar.app.google/HU8UzZuocbHrX9p38",
  whatsapp_number: "5533331304",
  whatsapp_message:
    "Hola, quiero agendar una consulta médica. ¿Me puedes compartir disponibilidad?",
  hero_title:
    "Atención médica clara y confiable para resolver tu problema de salud con seguimiento real",
  hero_subtitle:
    "Consulta privada con valoración integral, explicación sencilla, tratamiento y acompañamiento. Agenda fácil por WhatsApp o reserva en línea en pocos minutos.",
  cta_primary_text: "Agendar por WhatsApp",
  cta_secondary_text: "Reservar en línea",
  agenda_title: "Da el siguiente paso para cuidar tu salud",
  agenda_subtitle:
    "Recibe atención médica profesional, cercana y con seguimiento. Agenda hoy por WhatsApp o reserva en línea.",
  include_1: "Valoración médica completa de tus síntomas y antecedentes.",
  include_2: "Explicación clara del diagnóstico y del tratamiento.",
  include_3: "Indicaciones concretas sobre medicamentos, estudios y cuidados.",
  include_4: "Seguimiento orientado a tu evolución clínica.",
  reason_1: "Tienes síntomas recientes y necesitas orientación médica pronta.",
  reason_2: "Buscas seguimiento de un padecimiento o tratamiento.",
  reason_3: "Necesitas aclarar dudas sobre estudios, diagnóstico o medicamentos.",
  reason_4: "Quieres una revisión general con enfoque preventivo.",
  faq_q1: "¿Cómo puedo agendar una cita?",
  faq_a1:
    "Puedes agendar de forma rápida por WhatsApp o reservar en línea según te resulte más cómodo.",
  faq_q2: "¿Dónde se encuentra el consultorio?",
  faq_a2:
    "La dirección exacta del consultorio aparece en la sección de ubicación.",
  faq_q3: "¿Cuál es el horario de atención?",
  faq_a3: "El horario de atención se encuentra en la sección de ubicación.",
  faq_q4: "¿Qué tipo de atención se ofrece?",
  faq_a4:
    "Consulta médica privada con valoración, orientación, tratamiento y seguimiento con enfoque profesional y humano.",
};

export default function Page() {
  const supabase = createClient();

  const [services, setServices] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [sendingReview, setSendingReview] = useState(false);

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

  const [reviewForm, setReviewForm] = useState({
    patient_name: "",
    review_text: "",
    rating: 5,
  });

  useEffect(() => {
    async function loadData() {
      const [
        servicesRes,
        profileRes,
        licensesRes,
        documentsRes,
        reviewsRes,
        configRes,
      ] = await Promise.all([
        supabase.from("services").select("*").order("id", { ascending: true }),
        supabase.from("profile").select("*").limit(1).single(),
        supabase.from("licenses").select("*").order("id", { ascending: true }),
        supabase.from("documents").select("*").order("id", { ascending: false }),
        supabase.from("reviews").select("*").order("id", { ascending: false }),
        supabase.from("config").select("*"),
      ]);

      if (!servicesRes.error) setServices(servicesRes.data || []);
      if (!profileRes.error && profileRes.data) setProfile(profileRes.data);
      if (!licensesRes.error) setLicenses(licensesRes.data || []);
      if (!documentsRes.error) setDocuments(documentsRes.data || []);
      if (!reviewsRes.error) setReviews(reviewsRes.data || []);

      if (!configRes.error && configRes.data) {
        const mapped = { ...DEFAULT_CONFIG };

        (configRes.data || []).forEach((item) => {
          if (item?.key) {
            mapped[item.key] =
              item.value !== null && item.value !== undefined && item.value !== ""
                ? item.value
                : mapped[item.key];
          }
        });

        setConfig(mapped);
      }
    }

    loadData();
  }, [supabase]);

  async function submitReview() {
    if (!reviewForm.patient_name.trim() || !reviewForm.review_text.trim()) {
      alert("Completa tu nombre y tu reseña.");
      return;
    }

    setSendingReview(true);

    const { error } = await supabase.from("reviews").insert([
      {
        patient_name: reviewForm.patient_name.trim(),
        review_text: reviewForm.review_text.trim(),
        rating: Number(reviewForm.rating),
        verified: false,
        is_published: false,
        verification_type: "manual",
        review_status: "pending",
      },
    ]);

    setSendingReview(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Tu reseña fue enviada correctamente.");
    setReviewForm({
      patient_name: "",
      review_text: "",
      rating: 5,
    });
    setOpenReviewModal(false);
  }

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

  const publishedVerifiedReviews = useMemo(
    () =>
      reviews.filter(
        (review) =>
          review.is_published === true && review.review_status === "verified"
      ),
    [reviews]
  );

  const topReviews = useMemo(
    () => publishedVerifiedReviews.slice(0, 3),
    [publishedVerifiedReviews]
  );

  const sortedServices = useMemo(() => {
    return [...services].sort((a, b) => {
      const featuredA = a.destacado ? 1 : 0;
      const featuredB = b.destacado ? 1 : 0;

      if (featuredA !== featuredB) return featuredB - featuredA;

      const orderA = Number(a.orden || 0);
      const orderB = Number(b.orden || 0);

      if (orderA !== orderB) return orderA - orderB;

      return Number(a.id || 0) - Number(b.id || 0);
    });
  }, [services]);

  const featuredServices = useMemo(
    () => sortedServices.slice(0, 6),
    [sortedServices]
  );

  const averageRating = useMemo(() => {
    if (publishedVerifiedReviews.length === 0) return 0;
    const sum = publishedVerifiedReviews.reduce(
      (acc, review) => acc + Number(review.rating || 0),
      0
    );
    return (sum / publishedVerifiedReviews.length).toFixed(1);
  }, [publishedVerifiedReviews]);

  const includeItems = useMemo(
    () =>
      [
        config.include_1,
        config.include_2,
        config.include_3,
        config.include_4,
      ].filter(Boolean),
    [config]
  );

  const reasonItems = useMemo(
    () =>
      [
        config.reason_1,
        config.reason_2,
        config.reason_3,
        config.reason_4,
      ].filter(Boolean),
    [config]
  );

  const faqItems = useMemo(() => {
    const items = [
      { question: config.faq_q1, answer: config.faq_a1 },
      { question: config.faq_q2, answer: config.faq_a2 },
      { question: config.faq_q3, answer: config.faq_a3 },
      { question: config.faq_q4, answer: config.faq_a4 },
    ].filter((item) => item.question && item.answer);

    if (items.length > 0) return items;

    return [
      {
        question: "¿Cómo puedo agendar una cita?",
        answer:
          "Puedes agendar de forma rápida por WhatsApp o reservar en línea según te resulte más cómodo.",
      },
      {
        question: "¿Dónde se encuentra el consultorio?",
        answer: `El consultorio se encuentra en ${profile.address}`,
      },
      {
        question: "¿Cuál es el horario de atención?",
        answer: profile.schedule,
      },
      {
        question: "¿Qué tipo de atención se ofrece?",
        answer:
          "Consulta médica privada con valoración, orientación, tratamiento y seguimiento con enfoque profesional y humano.",
      },
    ];
  }, [config, profile.address, profile.schedule]);

  const doctorName = profile.doctor_name || "Dr. José Antonio Reyes Hernández";

  const whatsappNumberRaw =
    config.whatsapp_number || profile.phone || DEFAULT_CONFIG.whatsapp_number;

  const normalizedWhatsappNumber = String(whatsappNumberRaw).replace(/\D/g, "");

  const whatsappMessage =
    config.whatsapp_message || DEFAULT_CONFIG.whatsapp_message;

  const whatsappUrl = `https://wa.me/52${
    normalizedWhatsappNumber || "5533331304"
  }?text=${encodeURIComponent(whatsappMessage)}`;

  const bookingUrl = config.booking_url || DEFAULT_CONFIG.booking_url;

  const primaryCtaText =
    config.cta_primary_text || DEFAULT_CONFIG.cta_primary_text;

  const secondaryCtaText =
    config.cta_secondary_text || DEFAULT_CONFIG.cta_secondary_text;

  const heroTitle = config.hero_title || DEFAULT_CONFIG.hero_title;
  const heroSubtitle = config.hero_subtitle || DEFAULT_CONFIG.hero_subtitle;
  const agendaTitle = config.agenda_title || DEFAULT_CONFIG.agenda_title;
  const agendaSubtitle =
    config.agenda_subtitle || DEFAULT_CONFIG.agenda_subtitle;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-green-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
      >
        {primaryCtaText}
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
              className="rounded-2xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              {primaryCtaText}
            </a>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {secondaryCtaText}
            </a>
          </div>
        </div>
      </header>

      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-sky-50 to-emerald-50" />
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 shadow-sm">
              Consulta médica privada en Nezahualcóyotl
            </p>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              {heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {heroSubtitle}
            </p>

            <div className="mt-8">
              <CTAButtons
                whatsappUrl={whatsappUrl}
                bookingUrl={bookingUrl}
                primaryText={primaryCtaText}
                secondaryText={secondaryCtaText}
              />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Qué hago
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Valoro, diagnostico, trato y doy seguimiento.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Para quién es
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Para pacientes que necesitan atención clara y rápida.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Cómo agendar
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Por WhatsApp o reserva en línea en minutos.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-xl backdrop-blur md:p-8">
              <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto.file_url}
                      alt={`Foto profesional de ${doctorName}`}
                      className="h-[280px] w-full object-cover md:h-[320px]"
                    />
                  ) : (
                    <div className="flex h-[280px] items-center justify-center bg-slate-100 px-6 text-center text-sm text-slate-400 md:h-[320px]">
                      Agrega una foto profesional en el panel
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                    Atención con cita
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {doctorName}
                  </h2>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Dirección
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-800">
                        {profile.address}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Horario
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-800">
                        {profile.schedule}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Contacto
                      </p>
                      <p className="mt-2 text-sm text-slate-800">
                        {profile.phone}
                      </p>
                      <p className="text-sm text-slate-800">{profile.email}</p>
                    </div>

                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">
                        Agenda fácil
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Elige WhatsApp o reserva en línea y asegura tu cita sin complicaciones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Agenda rápida */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Agenda rápida
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {agendaTitle}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                {agendaSubtitle}
              </p>
            </div>

            <CTAButtons
              whatsappUrl={whatsappUrl}
              bookingUrl={bookingUrl}
              primaryText={primaryCtaText}
              secondaryText={secondaryCtaText}
            />
          </div>
        </div>
      </section>

      {/* 3. Servicios / en qué te ayudo */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Servicios"
          title="¿En qué te ayudo?"
          subtitle="Información clara, tarjetas fáciles de escanear y servicios ordenados para que el paciente identifique rápido si esta consulta es para él."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <InfoCard
            title="Consulta médica general"
            description="Valoración integral para identificar el problema, orientar el tratamiento y resolver tus dudas con claridad."
            icon="✚"
          />
          <InfoCard
            title="Síntomas recientes"
            description="Atención para molestias agudas, malestares comunes o síntomas que no quieres dejar avanzar."
            icon="!"
          />
          <InfoCard
            title="Control y seguimiento"
            description="Seguimiento de padecimientos, revisión de evolución y ajuste de indicaciones según tu caso."
            icon="↺"
          />
          <InfoCard
            title="Medicina preventiva"
            description="Revisión general y orientación para cuidar tu salud antes de que aparezcan complicaciones."
            icon="✓"
          />
          <InfoCard
            title="Diagnóstico y tratamiento"
            description="Explicación sencilla de lo que ocurre, qué tratamiento seguir y qué señales vigilar."
            icon="?"
          />
          <InfoCard
            title="Atención con enfoque humano"
            description="Consulta profesional, cercana y organizada para pacientes que buscan confianza y seguimiento."
            icon="♥"
          />
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-slate-900">
              Servicios disponibles
            </h3>
            <p className="text-slate-600">
              Prioridad en lo importante: menos ruido, mejor lectura y acción más rápida.
            </p>
          </div>

          {featuredServices.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-slate-500 shadow-sm">
              Aún no hay servicios registrados.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {service.name}
                    </h3>

                    {service.destacado ? (
                      <span className="rounded-full bg-cyan-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-800">
                        Destacado
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>

                  <p className="mt-5 text-lg font-bold text-slate-900">
                    ${service.price} MXN
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {reasonItems.length > 0 ? (
          <div className="mt-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Cuándo consultar
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Agenda si te identificas con alguna de estas situaciones
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {reasonItems.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl bg-slate-50 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 font-bold text-emerald-700">
                      ✓
                    </div>
                    <p className="text-sm leading-7 text-slate-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* 4. Reseñas */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Confianza"
            title="Opiniones de pacientes"
            subtitle="Mejor jerarquía visual para que la reputación se entienda rápido: calificación, número de reseñas y testimonios principales."
          />

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Calificación promedio
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl font-bold">
                  {publishedVerifiedReviews.length > 0 ? averageRating : "0.0"}
                </span>
                <span className="pb-1 text-sm text-slate-300">de 5</span>
              </div>

              <div className="mt-4">
                <Stars rating={Math.round(Number(averageRating) || 0)} />
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                {publishedVerifiedReviews.length} reseña
                {publishedVerifiedReviews.length === 1 ? "" : "s"} verificada
                {publishedVerifiedReviews.length === 1 ? "" : "s"} publicada
                {publishedVerifiedReviews.length === 1 ? "" : "s"}.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setOpenReviewModal(true)}
                  className="rounded-2xl bg-cyan-700 px-6 py-3 font-semibold text-white transition hover:bg-cyan-800"
                >
                  Escribir reseña
                </button>

                <button
                  type="button"
                  onClick={() => setShowAllReviews((prev) => !prev)}
                  className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  {showAllReviews
                    ? "Ocultar historial"
                    : `Ver todas (${publishedVerifiedReviews.length})`}
                </button>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  {showAllReviews ? "Todas las reseñas" : "3 reseñas destacadas"}
                </h3>
                <p className="mt-2 text-slate-600">
                  {showAllReviews
                    ? "Historial completo de reseñas verificadas publicadas."
                    : "Las opiniones más visibles para reforzar confianza desde el primer vistazo."}
                </p>
              </div>

              {(showAllReviews
                ? publishedVerifiedReviews
                : topReviews
              ).length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-500">
                  Aún no hay reseñas publicadas.
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {(showAllReviews
                    ? publishedVerifiedReviews
                    : topReviews
                  ).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sobre el médico */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeader
              eyebrow="Sobre el médico"
              title="Atención profesional, humana y enfocada en resolver"
              subtitle="Esta sección tiene un objetivo distinto: explicar quién te atenderá, cómo trabaja y qué puede esperar el paciente durante la consulta."
            />

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">
                {doctorName}
              </h3>

              <p className="mt-5 text-base leading-8 text-slate-600">
                {profile.bio ||
                  "Atención médica con enfoque humano, explicación clara y seguimiento cercano para ayudarte a entender tu problema de salud y recibir el tratamiento adecuado."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Universidad
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {profile.university || "Pendiente por agregar en el panel."}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Enfoque de atención
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    Valoración, orientación, tratamiento y seguimiento.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Contacto
                  </p>
                  <p className="mt-2 text-sm text-slate-800">{profile.phone}</p>
                  <p className="text-sm text-slate-800">{profile.email}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Horario
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {profile.schedule}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Qué incluye la consulta
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              Una experiencia clara, ordenada y útil para el paciente
            </h3>

            <div className="mt-8 grid gap-4">
              {includeItems.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl bg-white/5 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-bold text-cyan-300">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-slate-200">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <CTAButtons
                whatsappUrl={whatsappUrl}
                bookingUrl={bookingUrl}
                primaryText={primaryCtaText}
                secondaryText={secondaryCtaText}
                dark
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Credenciales */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Credenciales"
            title="Formación y respaldo profesional"
            subtitle="Información puntual para generar confianza sin saturar la página."
          />

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Cédulas profesionales
              </h3>

              {licenses.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-500">
                  Aún no hay cédulas registradas.
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {licenses.map((license) => (
                    <div
                      key={license.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                        {license.label}
                      </p>
                      <p className="mt-2 text-lg font-medium text-slate-900">
                        {license.license_number}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Títulos académicos
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Documentación académica que respalda la formación profesional.
                </p>

                <div className="mt-5 text-sm font-semibold text-slate-900">
                  {titleImages.length} archivo{titleImages.length === 1 ? "" : "s"} cargado
                  {titleImages.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Diplomados y certificaciones
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Formación complementaria y actualización relevante para la
                  práctica médica.
                </p>

                <div className="mt-5 text-sm font-semibold text-slate-900">
                  {diplomaImages.length} archivo
                  {diplomaImages.length === 1 ? "" : "s"} cargado
                  {diplomaImages.length === 1 ? "" : "s"}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900">
                  Respaldo profesional
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Consulta privada con atención profesional, ordenada y enfocada en orientar con claridad al paciente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Consultorio */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Consultorio"
          title="Conoce el espacio de atención"
          subtitle="Más aire visual y una presentación limpia para que el lugar transmita orden y confianza."
        />

        {clinicImages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-slate-500 shadow-sm">
            Aún no hay imágenes del consultorio.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {clinicImages.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={item.file_url}
                  alt="Consultorio médico"
                  className="h-72 w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 8. Ubicación */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Ubicación"
            title="Cómo llegar al consultorio"
            subtitle="Dirección, horario y contacto en un solo lugar para reducir dudas antes de agendar."
          />

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Información del consultorio
              </h3>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Dirección
                  </p>
                  <p className="mt-2 text-slate-800">{profile.address}</p>
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Horario
                  </p>
                  <p className="mt-2 text-slate-800">{profile.schedule}</p>
                </div>

                <div className="rounded-2xl bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Contacto
                  </p>
                  <p className="mt-2 text-slate-800">{profile.phone}</p>
                  <p className="text-slate-800">{profile.email}</p>
                </div>
              </div>

              <div className="mt-6">
                <CTAButtons
                  whatsappUrl={whatsappUrl}
                  bookingUrl={bookingUrl}
                  primaryText={primaryCtaText}
                  secondaryText={secondaryCtaText}
                />
              </div>
            </div>

            <iframe
              className="min-h-[360px] rounded-3xl border border-slate-200 shadow-sm"
              src="https://www.google.com/maps?q=avenida+chimalhuacan+285&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del consultorio"
            />
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Resolvemos dudas comunes antes de tu cita"
          subtitle="Una sección breve y clara para que el paciente tome acción con más confianza."
          center
        />

        <div className="mx-auto grid max-w-4xl gap-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={`${item.question}-${index}`}
              question={item.question}
              answer={
                item.answer === DEFAULT_CONFIG.faq_a2
                  ? `El consultorio se encuentra en ${profile.address}`
                  : item.answer === DEFAULT_CONFIG.faq_a3
                  ? profile.schedule
                  : item.answer
              }
            />
          ))}
        </div>
      </section>

      {/* 10. Agenda final */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 px-8 py-14 text-white shadow-xl md:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Agenda final
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              Agenda tu consulta hoy
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-200">
              Menos vueltas, más acción. Escribe por WhatsApp o reserva en línea y asegura tu atención médica.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                {primaryCtaText}
              </a>

              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                {secondaryCtaText}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold">{doctorName}</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Consulta médica privada con atención profesional, cercana y
                orientada al seguimiento del paciente.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Contacto
              </p>
              <p className="mt-3 text-white">{profile.phone}</p>
              <p className="mt-1 text-white">{profile.email}</p>
            </div>

            <div className="rounded-2xl bg-slate-800 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Horario
              </p>
              <p className="mt-3 text-white">{profile.schedule}</p>
            </div>
          </div>
        </div>
      </footer>

      {openReviewModal ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                  Reseñas
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Escribe tu reseña
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setOpenReviewModal(false)}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-6 grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={reviewForm.patient_name}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      patient_name: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                  placeholder="Escribe tu nombre"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Calificación
                </label>
                <RatingSelector
                  rating={reviewForm.rating}
                  onChange={(rating) =>
                    setReviewForm({
                      ...reviewForm,
                      rating,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Tu experiencia
                </label>
                <textarea
                  value={reviewForm.review_text}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      review_text: e.target.value,
                    })
                  }
                  className="min-h-[140px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                  placeholder="Cuéntanos cómo fue tu experiencia"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={submitReview}
                  disabled={sendingReview}
                  className="rounded-2xl bg-cyan-700 px-6 py-3 font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {sendingReview ? "Enviando..." : "Enviar reseña"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpenReviewModal(false)}
                  className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}