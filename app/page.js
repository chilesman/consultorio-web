"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../lib/supabase";

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

    async function fetchLicenses() {
      const { data, error } = await supabase
        .from("licenses")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error cargando cédulas:", error);
      } else {
        setLicenses(data || []);
      }
    }

    async function fetchDocuments() {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error cargando imágenes:", error);
      } else {
        setDocuments(data || []);
      }
    }

    fetchServices();
    fetchProfile();
    fetchLicenses();
    fetchDocuments();
  }, []);

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

  function ImageGallery({ title, description, items }) {
    return (
      <section className="mx-auto max-w-7xl p-10">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-gray-600">{description}</p>
        ) : null}

        {items.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed bg-white p-6 text-gray-500">
            Aún no hay imágenes en este apartado.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border bg-white shadow"
              >
                <img
                  src={item.file_url}
                  alt={title}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600"
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

        <div className="mt-6 flex flex-wrap gap-4">
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
              <p className="font-semibold">Horario</p>
              <p className="text-gray-600">
                {profile.schedule || "Pendiente por agregar"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CÉDULAS */}
      <section className="mx-auto max-w-7xl p-10">
        <h2 className="text-2xl font-bold">Cédulas profesionales</h2>

        {licenses.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed bg-white p-6 text-gray-500">
            Aún no hay cédulas registradas.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {licenses.map((license) => (
              <div
                key={license.id}
                className="rounded-xl border bg-white p-5 shadow"
              >
                <p className="font-semibold">{license.label}</p>
                <p className="mt-2 text-gray-600">{license.license_number}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TÍTULOS ACADÉMICOS */}
      <ImageGallery
        title="Títulos académicos"
        description="Documentos que acreditan grados académicos como licenciatura, especialidad, maestrías u otros estudios formales."
        items={titleImages}
      />

      {/* DIPLOMADOS / CERTIFICACIONES */}
      <ImageGallery
        title="Diplomados y certificaciones"
        description="Formación complementaria, constancias y certificaciones relevantes para la práctica profesional."
        items={diplomaImages}
      />

      {/* CONSULTORIO */}
      <ImageGallery
        title="Consultorio"
        description="Imágenes del espacio de atención para que el paciente conozca el entorno antes de su visita."
        items={clinicImages}
      />

      {/* PUBLICIDAD */}
      <ImageGallery
        title="Publicidad e información visual"
        description="Material visual relacionado con servicios, campañas o contenidos informativos."
        items={publicityImages}
      />

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
          <p className="mt-4">
            Teléfono y WhatsApp: {profile.phone || "5533331304"}
          </p>
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