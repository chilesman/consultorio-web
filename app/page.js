"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
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
          <p className="mt-1 text-sm text-slate-500">Paciente verificado</p>
        </div>

        <Stars rating={review.rating} />
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">
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
  centered = false,
}) {
  return (
    <div
      className={`flex flex-wrap gap-4 ${
        centered ? "justify-center" : "justify-start"
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        {primaryText}
      </a>

      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        {secondaryText}
      </a>
    </div>
  );
}

function SlotButton({ slot, selected, onClick }) {
  const isAvailable = Boolean(slot.available);

  return (
    <button
      type="button"
      disabled={!isAvailable}
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
        isAvailable
          ? selected
            ? "border-cyan-700 bg-cyan-700 text-white"
            : "border-slate-300 bg-white text-slate-700 hover:border-cyan-400 hover:bg-cyan-50"
          : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
      }`}
    >
      <div>{String(slot.slot).slice(0, 5)}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide">
        {isAvailable ? "Disponible" : "Ocupado"}
      </div>
    </button>
  );
}

const DEFAULT_CONFIG = {
  booking_url: "",
  whatsapp_number: "5533331304",
  whatsapp_message:
    "Hola, quiero agendar una consulta médica. ¿Me puedes compartir disponibilidad?",
  hero_title:
    "Médico general en Nezahualcóyotl con consulta médica privada, diagnóstico claro y tratamiento oportuno",
  hero_subtitle:
    "Atención médica profesional en Nezahualcóyotl, Estado de México, para pacientes que buscan consulta médica cercana, explicación clara, diagnóstico, tratamiento y seguimiento real.",
  cta_primary_text: "Agendar por WhatsApp",
  cta_secondary_text: "Reservar en línea",
  agenda_title: "Da el siguiente paso para cuidar tu salud",
  agenda_subtitle:
    "Recibe atención médica profesional, cercana y con seguimiento. Agenda hoy tu consulta médica por WhatsApp o reserva en línea.",
  include_1: "Valoración médica completa de tus síntomas, antecedentes y estado general.",
  include_2: "Explicación clara del diagnóstico y de las posibles causas de tu malestar.",
  include_3: "Tratamiento e indicaciones concretas sobre medicamentos, estudios y cuidados.",
  include_4: "Seguimiento orientado a tu evolución clínica y prevención de complicaciones.",
  reason_1: "Tienes síntomas recientes y necesitas atención médica pronta.",
  reason_2: "Buscas seguimiento de un padecimiento o ajuste de tratamiento.",
  reason_3: "Necesitas aclarar dudas sobre estudios, diagnóstico o medicamentos.",
  reason_4: "Quieres una revisión general con enfoque preventivo y consulta médica oportuna.",
  faq_q1: "¿Cómo puedo agendar una consulta médica?",
  faq_a1:
    "Puedes agendar de forma rápida por WhatsApp o reservar en línea según te resulte más cómodo.",
  faq_q2: "¿Dónde se encuentra el consultorio?",
  faq_a2:
    "La dirección exacta del consultorio aparece en la sección de ubicación en Nezahualcóyotl, Estado de México.",
  faq_q3: "¿Qué tipo de atención médica se ofrece?",
  faq_a3:
    "Se ofrece consulta médica privada para valoración, diagnóstico, tratamiento, seguimiento y orientación preventiva.",
  faq_q4: "¿Cuándo debo acudir con un médico general?",
  faq_a4:
    "Cuando presentas síntomas, molestias que no mejoran, necesitas revisión preventiva o quieres una valoración médica clara y profesional.",
  seo_title: "Médico general en Nezahualcóyotl | Consulta médica privada",
  seo_description:
    "Consulta médica privada con médico general en Nezahualcóyotl, Estado de México. Atención médica cercana, diagnóstico, tratamiento y seguimiento profesional.",
  seo_city: "Nezahualcóyotl",
  seo_region: "Estado de México",
};

const DEFAULT_BOOKING_FORM = {
  nombre: "",
  telefono: "",
  correo: "",
  edad: "",
  fecha_nacimiento: "",
  fecha_cita: "",
  hora_cita: "",
  tipo_consulta: "presencial",
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

  const [bookingForm, setBookingForm] = useState(DEFAULT_BOOKING_FORM);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [submittingBooking, setSubmittingBooking] = useState(false);

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

  useEffect(() => {
    if (!bookingForm.fecha_cita) {
      setAvailableSlots([]);
      return;
    }

    async function loadSlots() {
      setLoadingSlots(true);

      const { data, error } = await supabase.rpc(
        "get_available_appointment_slots",
        {
          p_fecha: bookingForm.fecha_cita,
        }
      );

      setLoadingSlots(false);

      if (error) {
        setAvailableSlots([]);
        return;
      }

      setAvailableSlots(data || []);
    }

    loadSlots();
  }, [bookingForm.fecha_cita, supabase]);

  const seoTitle = config.seo_title || DEFAULT_CONFIG.seo_title;
  const seoDescription =
    config.seo_description || DEFAULT_CONFIG.seo_description;

  useEffect(() => {
    document.title = seoTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", seoDescription);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      "content",
      "médico en Nezahualcóyotl, consulta médica cerca, doctor particular, médico general Neza, consulta médica, médico general, atención médica, diagnóstico, tratamiento"
    );
  }, [seoTitle, seoDescription]);

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

  async function submitBooking() {
    if (
      !bookingForm.nombre.trim() ||
      !bookingForm.fecha_cita ||
      !bookingForm.hora_cita ||
      !bookingForm.tipo_consulta
    ) {
      alert("Completa nombre, fecha, horario y tipo de consulta.");
      return;
    }

    setSubmittingBooking(true);

    const { error } = await supabase.rpc("book_public_appointment", {
      p_nombre: bookingForm.nombre.trim(),
      p_telefono: bookingForm.telefono || null,
      p_correo: bookingForm.correo || null,
      p_edad: bookingForm.edad === "" ? null : Number(bookingForm.edad),
      p_fecha_nacimiento: bookingForm.fecha_nacimiento || null,
      p_fecha_cita: bookingForm.fecha_cita,
      p_hora_cita: bookingForm.hora_cita,
      p_tipo_consulta: bookingForm.tipo_consulta,
    });

    setSubmittingBooking(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Tu cita fue registrada correctamente. Revisa tu correo para confirmar la cita."
    );

    const selectedDate = bookingForm.fecha_cita;

    setBookingForm(DEFAULT_BOOKING_FORM);

    if (selectedDate) {
      const { data } = await supabase.rpc("get_available_appointment_slots", {
        p_fecha: selectedDate,
      });
      setAvailableSlots(data || []);
    }
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
        question: "¿Cómo puedo agendar una consulta médica?",
        answer:
          "Puedes agendar de forma rápida por WhatsApp o reservar en línea según te resulte más cómodo.",
      },
      {
        question: "¿Dónde se encuentra el consultorio?",
        answer: `El consultorio se encuentra en ${profile.address}`,
      },
      {
        question: "¿Qué tipo de atención médica se ofrece?",
        answer:
          "Consulta médica privada con valoración, diagnóstico, tratamiento y seguimiento con enfoque profesional y humano.",
      },
      {
        question: "¿Cuándo debo acudir con un médico general?",
        answer:
          "Cuando presentas síntomas, molestias persistentes, necesitas prevención o quieres una valoración médica clara.",
      },
    ];
  }, [config, profile.address]);

  const doctorName = profile.doctor_name || "Dr. José Antonio Reyes Hernández";

  const whatsappNumberRaw =
    config.whatsapp_number || profile.phone || DEFAULT_CONFIG.whatsapp_number;

  const normalizedWhatsappNumber = String(whatsappNumberRaw).replace(/\D/g, "");

  const whatsappMessage =
    config.whatsapp_message || DEFAULT_CONFIG.whatsapp_message;

  const whatsappUrl = `https://wa.me/52${
    normalizedWhatsappNumber || "5533331304"
  }?text=${encodeURIComponent(whatsappMessage)}`;

  const bookingUrl = "#agenda-online";

  const primaryCtaText =
    config.cta_primary_text || DEFAULT_CONFIG.cta_primary_text;

  const secondaryCtaText =
    config.cta_secondary_text || DEFAULT_CONFIG.cta_secondary_text;

  const heroTitle = config.hero_title || DEFAULT_CONFIG.hero_title;
  const heroSubtitle = config.hero_subtitle || DEFAULT_CONFIG.hero_subtitle;
  const agendaTitle = config.agenda_title || DEFAULT_CONFIG.agenda_title;
  const agendaSubtitle =
    config.agenda_subtitle || DEFAULT_CONFIG.agenda_subtitle;

  const seoCity = config.seo_city || DEFAULT_CONFIG.seo_city;
  const seoRegion = config.seo_region || DEFAULT_CONFIG.seo_region;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physician"],
    name: doctorName,
    description: seoDescription,
    medicalSpecialty: "GeneralPractice",
    telephone: profile.phone || whatsappNumberRaw,
    email: profile.email || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: profile.address || "",
      addressLocality: seoCity,
      addressRegion: seoRegion,
      addressCountry: "MX",
    },
    areaServed: [
      {
        "@type": "City",
        name: seoCity,
      },
      {
        "@type": "State",
        name: seoRegion,
      },
    ],
    openingHours: profile.schedule || "",
    image: profilePhoto?.file_url || "",
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Script
        id="medical-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
              Médico general · Consulta médica privada · {seoCity}
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
              className="rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {secondaryCtaText}
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
              Consulta médica privada en {seoCity}, {seoRegion}
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
                <p className="text-sm font-semibold text-slate-900">Qué hago</p>
                <p className="mt-1 text-sm text-slate-600">
                  Consulta médica, diagnóstico, tratamiento y seguimiento.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Para quién es
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Para pacientes que buscan atención médica clara y cercana.
                </p>
              </div>

              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Cómo agendar
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Elige fecha, horario y confirma tu cita.
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
                      alt={`Foto profesional de ${doctorName}, médico general en ${seoCity}`}
                      className="h-[280px] w-full object-cover md:h-[320px]"
                      loading="eager"
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
                        Atención médica
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-800">
                        Consulta médica privada en {seoCity}, {seoRegion}, con
                        orientación clara, tratamiento oportuno y seguimiento.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda-online" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 rounded-[2rem] bg-slate-50 p-8 lg:grid-cols-[0.9fr_1.1fr]">
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

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    1. Elige tu fecha
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Consulta los bloques disponibles de 30 minutos.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    2. Selecciona horario y tipo de consulta
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Presencial y en línea comparten agenda, así evitamos cruces.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    3. Confirma tu cita
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Después de agendar, recibirás un correo para confirmar.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Reserva en línea
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={bookingForm.nombre}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        nombre: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Escribe tu nombre"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={bookingForm.telefono}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        telefono: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Tu teléfono"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Correo
                  </label>
                  <input
                    type="email"
                    value={bookingForm.correo}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        correo: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Tu correo"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Edad
                  </label>
                  <input
                    type="number"
                    value={bookingForm.edad}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        edad: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Tu edad"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Fecha de nacimiento
                  </label>
                  <input
                    type="date"
                    value={bookingForm.fecha_nacimiento}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        fecha_nacimiento: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Fecha de cita
                  </label>
                  <input
                    type="date"
                    value={bookingForm.fecha_cita}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        fecha_cita: e.target.value,
                        hora_cita: "",
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tipo de consulta
                  </label>
                  <select
                    value={bookingForm.tipo_consulta}
                    onChange={(e) =>
                      setBookingForm((prev) => ({
                        ...prev,
                        tipo_consulta: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                  >
                    <option value="presencial">Presencial</option>
                    <option value="online">En línea</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Horario seleccionado
                  </label>
                  <input
                    type="text"
                    value={bookingForm.hora_cita}
                    readOnly
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
                    placeholder="Selecciona un horario abajo"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-slate-700">
                  Horarios disponibles
                </p>

                {!bookingForm.fecha_cita ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                    Primero selecciona una fecha para ver horarios disponibles.
                  </div>
                ) : loadingSlots ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                    Cargando horarios...
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                    No hay horarios disponibles para esta fecha.
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {availableSlots.map((slot, index) => (
                      <SlotButton
                        key={`${slot.slot}-${index}`}
                        slot={slot}
                        selected={
                          bookingForm.hora_cita === String(slot.slot).slice(0, 5)
                        }
                        onClick={() =>
                          setBookingForm((prev) => ({
                            ...prev,
                            hora_cita: String(slot.slot).slice(0, 5),
                          }))
                        }
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={submitBooking}
                  disabled={submittingBooking}
                  className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submittingBooking ? "Agendando..." : "Agendar cita"}
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {primaryCtaText}
                </a>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Al enviar tu solicitud, tu cita queda pendiente de confirmación.
                Recibirás un correo para confirmar el horario seleccionado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Servicios"
          title="¿En qué te ayudo?"
          subtitle={`Consulta médica en ${seoCity} para pacientes que buscan valoración, atención médica, diagnóstico y tratamiento sin complicaciones.`}
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
              Servicios claros y fáciles de escanear para que el paciente
              identifique rápido si esta atención médica es para él.
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
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {service.name}
                    </h3>

                    {service.destacado ? (
                      <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-800">
                        Destacado
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {service.description ||
                      "Consulta médica y atención profesional adaptada a tu necesidad."}
                  </p>

                  {Number(service.price) > 0 ? (
                    <p className="mt-5 text-sm font-semibold text-slate-900">
                      Desde ${Number(service.price).toLocaleString("es-MX")} MXN
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Reseñas"
            title="Pacientes que ya confiaron en esta consulta médica"
            subtitle="Confianza, claridad y seguimiento en una atención médica privada cercana."
            center
          />

          <div className="mb-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Calificación promedio
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-900">
                {averageRating || "0.0"}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Reseñas verificadas
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-900">
                {publishedVerifiedReviews.length}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Tipo de atención
              </p>
              <p className="mt-3 text-xl font-bold text-slate-900">
                Consulta privada
              </p>
            </div>
          </div>

          {publishedVerifiedReviews.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-500 shadow-sm">
              Aún no hay reseñas verificadas visibles.
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {(showAllReviews ? publishedVerifiedReviews : topReviews).map(
                  (review) => (
                    <ReviewCard key={review.id} review={review} />
                  )
                )}
              </div>

              {publishedVerifiedReviews.length > 3 ? (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllReviews((prev) => !prev)}
                    className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    {showAllReviews ? "Ver menos reseñas" : "Ver más reseñas"}
                  </button>
                </div>
              ) : null}
            </>
          )}

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setOpenReviewModal(true)}
              className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Escribir reseña
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Sobre el médico"
          title={`Atención médica profesional en ${seoCity}`}
          subtitle={`Médico general con consulta médica privada en ${seoCity}, ${seoRegion}, enfocado en orientar al paciente con claridad, diagnóstico oportuno y tratamiento adecuado.`}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Perfil profesional
            </h3>

            <p className="mt-4 text-sm leading-8 text-slate-600">
              {profile.bio ||
                "Consulta médica privada con enfoque profesional, cercano y orientado a resolver dudas, identificar problemas de salud y acompañar al paciente con un tratamiento claro."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Universidad
                </p>
                <p className="mt-2 text-slate-800">
                  {profile.university || "Información disponible en el panel"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Atención
                </p>
                <p className="mt-2 text-slate-800">
                  Consulta médica privada y preventiva
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Qué incluye tu consulta médica
            </h3>

            <div className="mt-6 grid gap-4">
              {includeItems.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-5 text-slate-600">
                  Agrega la información en el panel de administración.
                </div>
              ) : (
                includeItems.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="rounded-2xl bg-slate-50 p-5"
                  >
                    <h3 className="text-base font-semibold text-slate-900">
                      {`Paso ${index + 1}`}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Credenciales"
            title="Respaldo profesional y formación"
            subtitle="Información clara para reforzar confianza sin recargar el diseño."
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Cédulas profesionales
              </h3>

              {licenses.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-white p-5 text-slate-500">
                  Aún no hay cédulas registradas.
                </div>
              ) : (
                <div className="mt-6 grid gap-4">
                  {licenses.map((license) => (
                    <div
                      key={license.id}
                      className="rounded-2xl bg-white p-5 shadow-sm"
                    >
                      <h3 className="text-base font-semibold text-slate-900">
                        {license.label}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        Cédula: {license.license_number}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Títulos académicos
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Documentación académica que respalda la formación médica.
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
                  Motivos frecuentes para consultar
                </h3>

                <div className="mt-5 grid gap-3">
                  {reasonItems.length === 0 ? (
                    <p className="text-sm text-slate-600">
                      Agrega los motivos desde el panel de administración.
                    </p>
                  ) : (
                    reasonItems.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="rounded-2xl bg-slate-50 p-4"
                      >
                        <h3 className="text-sm font-semibold text-slate-900">
                          Motivo {index + 1}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {item}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Consultorio"
          title={`Consulta médica cerca de ti en ${seoCity}`}
          subtitle="Un espacio ordenado y profesional para transmitir confianza antes de tu visita."
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
                  alt={`Consultorio médico en ${seoCity}`}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Ubicación"
            title={`Médico general en ${seoCity}, ${seoRegion}`}
            subtitle="Dirección, horario y contacto en un solo lugar para reducir dudas antes de agendar tu consulta médica."
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

                <div className="rounded-2xl bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    SEO local
                  </p>
                  <p className="mt-2 text-slate-800">
                    Consulta médica privada en {seoCity}, {seoRegion}, con
                    atención médica cercana, diagnóstico y tratamiento.
                  </p>
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
              answer={item.answer}
            />
          ))}
        </div>
      </section>

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
              Elige fecha, horario y tipo de consulta en tu agenda en línea o
              escríbenos por WhatsApp para atención directa en {seoCity}.
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
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
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
                orientada al seguimiento del paciente en {seoCity}, {seoRegion}.
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
                  className="min-h-[150px] w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                  placeholder="Cuéntanos tu experiencia"
                />
              </div>

              <button
                type="button"
                onClick={submitReview}
                disabled={sendingReview}
                className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sendingReview ? "Enviando..." : "Enviar reseña"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}