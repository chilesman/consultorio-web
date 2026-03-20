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

export default function Page() {
  const supabase = createClient();

  const [services, setServices] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
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

  const publishedReviews = useMemo(
    () => reviews.filter((review) => review.is_published !== false),
    [reviews]
  );

  const topReviews = useMemo(
    () => publishedReviews.slice(0, 3),
    [publishedReviews]
  );

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

          <div className="grid gap-6">
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
                    <div className="flex h-[280px] items-center justify-center bg-slate-100 text-center text-sm text-slate-400 md:h-[320px]">
                      Agrega una foto profesional en el panel
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                    Atención médica
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {doctorName}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {profile.bio ||
                      "Brindo atención médica con enfoque humano, diagnóstico claro y seguimiento cercano para ayudar a cada paciente a entender su problema de salud y recibir un tratamiento adecuado."}
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Dirección
                      </p>
                      <p className="mt-2 text-slate-800">{profile.address}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Horario de atención
                      </p>
                      <p className="mt-2 text-slate-800">{profile.schedule}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Contacto
                      </p>
                      <p className="mt-2 text-slate-800">{profile.phone}</p>
                      <p className="text-slate-800">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">
              Consulta profesional
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Valoración médica integral y orientación clara.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">
              Atención cercana
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Trato humano con enfoque en confianza y claridad.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">
              Seguimiento real
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Acompañamiento según evolución y necesidades del paciente.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">
              Agenda sencilla
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Reserva por WhatsApp o en línea en pocos pasos.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Atención"
          title="¿En qué puedo ayudarte?"
          subtitle="Consulta orientada a valorar síntomas, dar tratamiento, resolver dudas médicas y acompañar el seguimiento de tu salud."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <InfoCard
            title="Consulta médica general"
            description="Valoración integral para identificar el problema de salud, orientar el tratamiento y resolver tus dudas con claridad."
          />
          <InfoCard
            title="Control y seguimiento"
            description="Seguimiento de padecimientos frecuentes y vigilancia de tu evolución con indicaciones comprensibles."
          />
          <InfoCard
            title="Síntomas agudos"
            description="Atención para molestias recientes, malestares comunes y situaciones que requieren valoración médica pronta."
          />
          <InfoCard
            title="Medicina preventiva"
            description="Consulta para revisión general, orientación preventiva y cuidado oportuno de tu salud."
          />
          <InfoCard
            title="Orientación clara"
            description="Explicación sencilla de diagnósticos, tratamientos, estudios y medidas de cuidado en casa."
          />
          <InfoCard
            title="Atención para tu familia"
            description="Acompañamiento médico cercano para pacientes que buscan confianza, orden y seguimiento."
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader
            eyebrow="Confianza"
            title="Opiniones de pacientes"
            subtitle="Experiencias compartidas por pacientes que reflejan atención, claridad y confianza."
          />

          {publishedReviews.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-500 shadow-sm">
              Aún no hay reseñas disponibles.
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {topReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {publishedReviews.length > 3 ? (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllReviews((prev) => !prev)}
                    className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    {showAllReviews
                      ? "Ocultar historial de reseñas"
                      : `Ver todas las reseñas (${publishedReviews.length})`}
                  </button>
                </div>
              ) : null}

              {showAllReviews ? (
                <div className="mt-12">
                  <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                        Historial completo de reseñas
                      </h3>
                      <p className="mt-2 text-slate-600">
                        Aquí puedes consultar todas las opiniones publicadas de
                        pacientes.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                      {publishedReviews.length} reseña
                      {publishedReviews.length === 1 ? "" : "s"} publicada
                      {publishedReviews.length === 1 ? "" : "s"}
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {publishedReviews.map((review) => (
                      <ReviewCard key={`all-${review.id}`} review={review} />
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Sobre el médico
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Atención profesional con enfoque humano
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-600">
              Soy {doctorShortName}. Mi enfoque es brindar atención médica clara,
              profesional y cercana, para que cada paciente entienda su estado
              de salud, reciba un tratamiento adecuado y tenga seguimiento según
              su evolución.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              {profile.bio ||
                "La consulta está pensada para escuchar, valorar, explicar con claridad y acompañar al paciente con un trato serio, humano y orientado a soluciones."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Formación
                </p>
                <p className="mt-2 font-medium text-slate-900">
                  {profile.university || "Agregar universidad en panel"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Modalidad
                </p>
                <p className="mt-2 font-medium text-slate-900">
                  Consulta presencial privada
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              ¿Por qué elegir esta consulta?
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-semibold">Explicación clara</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  El paciente entiende qué tiene, qué tratamiento seguirá y qué
                  señales debe vigilar.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-semibold">Trato profesional y humano</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Atención cercana, respetuosa y enfocada en generar confianza.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-semibold">Seguimiento real</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  No solo se trata de valorar, sino de orientar y acompañar tu
                  evolución.
                </p>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <h3 className="font-semibold">Agenda sencilla</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Puedes reservar de forma rápida por WhatsApp o en línea según
                  te resulte más cómodo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader
            eyebrow="Servicios"
            title="Servicios y consulta"
            subtitle="Opciones disponibles de atención médica. Si necesitas orientación rápida, también puedes escribir por WhatsApp."
          />

          {featuredServices.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-slate-500 shadow-sm">
              Aún no hay servicios registrados.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {service.name}
                  </h3>
                  <p className="mt-3 min-h-[84px] text-sm leading-7 text-slate-600">
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Consultorio"
          title="Conoce el espacio de atención"
          subtitle="Un entorno profesional y cómodo también ayuda a que el paciente llegue con más confianza a su consulta."
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader
            eyebrow="Credenciales"
            title="Formación y respaldo profesional"
            subtitle="Información relevante para que el paciente tenga confianza en la preparación y trayectoria del médico."
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
                  Universidad
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {profile.university || "Pendiente por agregar en el panel."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-900 px-8 py-12 text-white shadow-xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Agenda tu consulta
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Da el siguiente paso para cuidar tu salud
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Recibe atención médica profesional, cercana y con seguimiento.
              Agenda hoy por WhatsApp o reserva en línea.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
                className="rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Reservar en línea
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader
            eyebrow="Ubicación"
            title="Cómo llegar al consultorio"
            subtitle="Dirección y referencia para facilitar tu visita."
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

      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Resolvemos dudas comunes antes de tu cita"
          subtitle="Una sección breve para reducir fricción y ayudar a que el paciente tome acción con más confianza."
          center
        />

        <div className="mx-auto grid max-w-4xl gap-4">
          <FAQItem
            question="¿Cómo puedo agendar una cita?"
            answer="Puedes agendar de forma rápida por WhatsApp o reservar en línea según te resulte más cómodo."
          />
          <FAQItem
            question="¿Dónde se encuentra el consultorio?"
            answer={`El consultorio se encuentra en ${profile.address}`}
          />
          <FAQItem
            question="¿Cuál es el horario de atención?"
            answer={profile.schedule}
          />
          <FAQItem
            question="¿Qué tipo de atención se ofrece?"
            answer="Consulta médica privada con valoración, orientación, tratamiento y seguimiento con enfoque profesional y humano."
          />
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
    </div>
  );
}