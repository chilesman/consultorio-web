"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase";

function Card({ title, subtitle, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {subtitle ? (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100 ${
        props.className || ""
      }`}
    />
  );
}

function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100 ${
        props.className || ""
      }`}
    />
  );
}

function PrimaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 ${
        props.className || ""
      }`}
    >
      {children}
    </button>
  );
}

function AccentButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl bg-cyan-700 px-5 py-3 font-semibold text-white transition hover:bg-cyan-800 ${
        props.className || ""
      }`}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 ${
        props.className || ""
      }`}
    >
      {children}
    </button>
  );
}

function DangerButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl border border-red-300 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50 ${
        props.className || ""
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ImageAdminSection({
  title,
  subtitle,
  items,
  onFileChange,
  onUpload,
  onDelete,
}) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input type="file" onChange={(e) => onFileChange(e.target.files[0])} />
        <AccentButton type="button" onClick={onUpload}>
          Subir imagen
        </AccentButton>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
          Aún no hay imágenes en este apartado.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
            >
              <img
                src={img.file_url}
                alt={title}
                className="h-52 w-full object-cover"
              />
              <div className="flex items-center justify-between p-4">
                <a
                  href={img.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
                >
                  Ver imagen
                </a>
                <DangerButton onClick={() => onDelete(img.id, img.file_url)}>
                  Eliminar
                </DangerButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function ReviewStatusBadge({ status }) {
  if (status === "verified") {
    return (
      <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-800">
        Verificada
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-700">
        Rechazada
      </span>
    );
  }

  return (
    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
      Pendiente
    </span>
  );
}

function ReviewEditor({ review, updateReview, saveReview, deleteReviewPermanently }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            value={review.patient_name || ""}
            onChange={(e) =>
              updateReview(review.id, "patient_name", e.target.value)
            }
          />

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Calificación
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => updateReview(review.id, "rating", star)}
                  className={`text-3xl transition ${
                    Number(review.rating) >= star
                      ? "text-yellow-500"
                      : "text-slate-300"
                  }`}
                  aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>

        <Textarea
          className="min-h-24"
          value={review.review_text || ""}
          onChange={(e) =>
            updateReview(review.id, "review_text", e.target.value)
          }
        />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">Estado</p>
            <select
              value={review.review_status || "pending"}
              onChange={(e) =>
                updateReview(review.id, "review_status", e.target.value)
              }
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            >
              <option value="pending">Pendiente</option>
              <option value="verified">Verificada</option>
              <option value="rejected">Rechazada</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Tipo de verificación
            </p>
            <select
              value={review.verification_type || "manual"}
              onChange={(e) =>
                updateReview(review.id, "verification_type", e.target.value)
              }
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            >
              <option value="manual">Manual</option>
              <option value="agenda">Cita agendada</option>
              <option value="consulta">Consulta asistida</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <ReviewStatusBadge status={review.review_status || "pending"} />

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
              {review.verification_type === "consulta"
                ? "Consulta asistida"
                : review.verification_type === "agenda"
                ? "Cita agendada"
                : "Manual"}
            </span>

            {review.is_published ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                Visible
              </span>
            ) : (
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-600">
                No visible
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <SecondaryButton onClick={() => saveReview(review)}>
              Guardar
            </SecondaryButton>
            <DangerButton onClick={() => deleteReviewPermanently(review.id)}>
              Borrar permanentemente
            </DangerButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewSection({
  title,
  subtitle,
  reviews,
  updateReview,
  saveReview,
  deleteReviewPermanently,
}) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {reviews.length}
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
          No hay reseñas en este apartado.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewEditor
              key={review.id}
              review={review}
              updateReview={updateReview}
              saveReview={saveReview}
              deleteReviewPermanently={deleteReviewPermanently}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const supabase = createClient();

  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [services, setServices] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [profile, setProfile] = useState({
    id: null,
    doctor_name: "",
    bio: "",
    university: "",
    phone: "",
    email: "",
    address: "",
    schedule: "",
  });

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [newLicense, setNewLicense] = useState({
    label: "",
    license_number: "",
  });

  const [newReview, setNewReview] = useState({
    patient_name: "",
    review_text: "",
    rating: 5,
    verified: false,
    is_published: false,
    verification_type: "manual",
    review_status: "pending",
  });

  const [titleFile, setTitleFile] = useState(null);
  const [diplomaFile, setDiplomaFile] = useState(null);
  const [clinicFile, setClinicFile] = useState(null);
  const [publicityFile, setPublicityFile] = useState(null);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    if (session) {
      fetchAll();
    }
  }

  async function fetchAll() {
    await Promise.all([
      fetchServices(),
      fetchDocuments(),
      fetchLicenses(),
      fetchProfile(),
      fetchReviews(),
    ]);
  }

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setSession(data.session);
    fetchAll();
  }

  async function logout() {
    await supabase.auth.signOut();
    location.reload();
  }

  async function fetchServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: true });
    setServices(data || []);
  }

  async function addService() {
    const { error } = await supabase.from("services").insert([
      { ...newService, price: Number(newService.price) },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setNewService({ name: "", description: "", price: "" });
      fetchServices();
    }
  }

  function updateService(id, field, value) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  async function saveService(service) {
    const { error } = await supabase
      .from("services")
      .update(service)
      .eq("id", service.id);

    if (error) {
      alert(error.message);
    } else {
      fetchServices();
    }
  }

  async function deleteService(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchServices();
    }
  }

  async function fetchProfile() {
    const { data } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .single();

    if (data) setProfile(data);
  }

  async function saveProfile() {
    const { error } = await supabase
      .from("profile")
      .update(profile)
      .eq("id", profile.id);

    if (error) {
      alert(error.message);
    } else {
      alert("Perfil actualizado");
    }
  }

  async function fetchLicenses() {
    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      alert(error.message);
    } else {
      setLicenses(data || []);
    }
  }

  async function addLicense() {
    if (!newLicense.label || !newLicense.license_number) {
      alert("Completa tipo y número de cédula");
      return;
    }

    const { error } = await supabase.from("licenses").insert([
      {
        label: newLicense.label.trim(),
        license_number: newLicense.license_number.trim(),
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setNewLicense({ label: "", license_number: "" });
      fetchLicenses();
    }
  }

  function updateLicense(id, field, value) {
    setLicenses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  }

  async function saveLicense(license) {
    const { error } = await supabase
      .from("licenses")
      .update({
        label: license.label,
        license_number: license.license_number,
      })
      .eq("id", license.id);

    if (error) {
      alert(error.message);
    } else {
      fetchLicenses();
    }
  }

  async function deleteLicense(id) {
    const { error } = await supabase.from("licenses").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchLicenses();
    }
  }

  async function fetchDocuments() {
    const { data } = await supabase
      .from("documents")
      .select("*")
      .order("id", { ascending: false });

    setDocuments(data || []);
  }

  async function uploadImage(file, category) {
    if (!file) {
      alert("Selecciona una imagen");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("documents").getPublicUrl(fileName);

    const { error: insertError } = await supabase.from("documents").insert([
      {
        category,
        file_url: data.publicUrl,
      },
    ]);

    if (insertError) {
      alert(insertError.message);
    } else {
      fetchDocuments();
    }
  }

  async function deleteImage(id, url) {
    const path = url.split("/documents/")[1];

    if (path) {
      await supabase.storage.from("documents").remove([path]);
    }

    await supabase.from("documents").delete().eq("id", id);
    fetchDocuments();
  }

  async function fetchReviews() {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("id", { ascending: false });

    setReviews(data || []);
  }

  function normalizeReviewByStatus(review) {
    const status = review.review_status || "pending";

    if (status === "verified") {
      return {
        ...review,
        verified: true,
        is_published: true,
      };
    }

    if (status === "rejected") {
      return {
        ...review,
        verified: false,
        is_published: false,
      };
    }

    return {
      ...review,
      verified: false,
      is_published: false,
    };
  }

  async function addReview() {
    if (!newReview.patient_name || !newReview.review_text) {
      alert("Completa nombre y reseña");
      return;
    }

    const reviewToInsert = normalizeReviewByStatus(newReview);

    const { error } = await supabase.from("reviews").insert([
      {
        patient_name: reviewToInsert.patient_name,
        review_text: reviewToInsert.review_text,
        rating: Number(reviewToInsert.rating),
        verified: reviewToInsert.verified,
        is_published: reviewToInsert.is_published,
        verification_type: reviewToInsert.verification_type,
        review_status: reviewToInsert.review_status,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      setNewReview({
        patient_name: "",
        review_text: "",
        rating: 5,
        verified: false,
        is_published: false,
        verification_type: "manual",
        review_status: "pending",
      });
      fetchReviews();
    }
  }

  function updateReview(id, field, value) {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, [field]: value };

        if (field === "review_status") {
          return normalizeReviewByStatus(updated);
        }

        return updated;
      })
    );
  }

  async function saveReview(review) {
    const reviewToSave = normalizeReviewByStatus(review);

    const { error } = await supabase
      .from("reviews")
      .update({
        patient_name: reviewToSave.patient_name,
        review_text: reviewToSave.review_text,
        rating: Number(reviewToSave.rating),
        verified: reviewToSave.verified,
        is_published: reviewToSave.is_published,
        verification_type: reviewToSave.verification_type,
        review_status: reviewToSave.review_status,
      })
      .eq("id", reviewToSave.id);

    if (error) {
      alert(error.message);
    } else {
      fetchReviews();
    }
  }

  async function deleteReviewPermanently(id) {
    const confirmed = window.confirm(
      "¿Seguro que quieres borrar permanentemente esta reseña?"
    );

    if (!confirmed) return;

    const { error } = await supabase.from("reviews").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchReviews();
    }
  }

  const titleImages = documents.filter((d) => d.category === "titulo_academico");
  const diplomaImages = documents.filter(
    (d) => d.category === "diplomado_certificacion"
  );
  const clinicImages = documents.filter((d) => d.category === "foto_consultorio");
  const publicityImages = documents.filter((d) => d.category === "publicidad");

  const verifiedReviews = useMemo(
    () => reviews.filter((review) => (review.review_status || "pending") === "verified"),
    [reviews]
  );

  const pendingReviews = useMemo(
    () => reviews.filter((review) => (review.review_status || "pending") === "pending"),
    [reviews]
  );

  const rejectedReviews = useMemo(
    () => reviews.filter((review) => (review.review_status || "pending") === "rejected"),
    [reviews]
  );

  const verifiedCount = verifiedReviews.length;
  const pendingCount = pendingReviews.length;
  const rejectedCount = rejectedReviews.length;

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-50 px-6 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900">Panel privado</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Inicia sesión para gestionar tu perfil, servicios, cédulas, imágenes y reseñas.
          </p>

          <div className="mt-6 space-y-4">
            <Input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton className="w-full" onClick={login}>
              Entrar
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Panel de administración
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Gestiona el contenido de tu sitio de forma clara y ordenada.
            </p>
          </div>

          <DangerButton onClick={logout}>Cerrar sesión</DangerButton>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-7">
          <Stat label="Servicios" value={services.length} />
          <Stat label="Cédulas" value={licenses.length} />
          <Stat label="Imágenes" value={documents.length} />
          <Stat label="Reseñas" value={reviews.length} />
          <Stat label="Verificadas" value={verifiedCount} />
          <Stat label="Pendientes" value={pendingCount} />
          <Stat label="Rechazadas" value={rejectedCount} />
        </div>

        <div className="space-y-8">
          <Card
            title="Perfil profesional"
            subtitle="Actualiza tu nombre, semblanza, universidad, datos de contacto y horario."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Nombre del médico"
                value={profile.doctor_name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, doctor_name: e.target.value })
                }
              />
              <Input
                placeholder="Universidad"
                value={profile.university || ""}
                onChange={(e) =>
                  setProfile({ ...profile, university: e.target.value })
                }
              />
              <Input
                placeholder="Teléfono"
                value={profile.phone || ""}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
              <Input
                placeholder="Correo"
                value={profile.email || ""}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
              <Input
                className="md:col-span-2"
                placeholder="Horario"
                value={profile.schedule || ""}
                onChange={(e) =>
                  setProfile({ ...profile, schedule: e.target.value })
                }
              />
            </div>

            <Textarea
              className="mt-4 min-h-28"
              placeholder="Semblanza profesional"
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />

            <Textarea
              className="mt-4 min-h-24"
              placeholder="Dirección"
              value={profile.address || ""}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
            />

            <AccentButton className="mt-4" onClick={saveProfile}>
              Guardar perfil
            </AccentButton>
          </Card>

          <Card
            title="Cédulas profesionales"
            subtitle="Agrega, edita o elimina las cédulas correspondientes a cada grado académico."
          >
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <Input
                placeholder="Tipo (Licenciatura, Especialidad, Maestría...)"
                value={newLicense.label}
                onChange={(e) =>
                  setNewLicense({ ...newLicense, label: e.target.value })
                }
              />
              <Input
                placeholder="Número de cédula"
                value={newLicense.license_number}
                onChange={(e) =>
                  setNewLicense({
                    ...newLicense,
                    license_number: e.target.value,
                  })
                }
              />
              <AccentButton onClick={addLicense}>Agregar</AccentButton>
            </div>

            <div className="mt-6 space-y-4">
              {licenses.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
                  Aún no hay cédulas registradas.
                </div>
              ) : (
                licenses.map((license) => (
                  <div
                    key={license.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto_auto] md:items-center">
                      <Input
                        value={license.label || ""}
                        onChange={(e) =>
                          updateLicense(license.id, "label", e.target.value)
                        }
                      />
                      <Input
                        value={license.license_number || ""}
                        onChange={(e) =>
                          updateLicense(license.id, "license_number", e.target.value)
                        }
                      />
                      <SecondaryButton onClick={() => saveLicense(license)}>
                        Guardar
                      </SecondaryButton>
                      <DangerButton onClick={() => deleteLicense(license.id)}>
                        Eliminar
                      </DangerButton>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <ImageAdminSection
            title="Títulos académicos"
            subtitle="Sube imágenes de títulos de licenciatura, especialidad, maestrías u otros grados formales."
            items={titleImages}
            onFileChange={setTitleFile}
            onUpload={() => uploadImage(titleFile, "titulo_academico")}
            onDelete={deleteImage}
          />

          <ImageAdminSection
            title="Diplomados y certificaciones"
            subtitle="Sube constancias, certificados o diplomados relevantes para tu práctica profesional."
            items={diplomaImages}
            onFileChange={setDiplomaFile}
            onUpload={() => uploadImage(diplomaFile, "diplomado_certificacion")}
            onDelete={deleteImage}
          />

          <ImageAdminSection
            title="Fotos del consultorio"
            subtitle="Muestra el espacio de atención para generar confianza antes de la visita."
            items={clinicImages}
            onFileChange={setClinicFile}
            onUpload={() => uploadImage(clinicFile, "foto_consultorio")}
            onDelete={deleteImage}
          />

          <ImageAdminSection
            title="Publicidad"
            subtitle="Gestiona imágenes informativas o promocionales relacionadas con servicios y campañas."
            items={publicityImages}
            onFileChange={setPublicityFile}
            onUpload={() => uploadImage(publicityFile, "publicidad")}
            onDelete={deleteImage}
          />

          <Card
            title="Reseñas"
            subtitle="Gestiona reseñas por apartados: pendientes, verificadas y rechazadas, con opción de borrado permanente."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Nombre del paciente"
                value={newReview.patient_name}
                onChange={(e) =>
                  setNewReview({ ...newReview, patient_name: e.target.value })
                }
              />

              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">
                  Calificación
                </p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={`text-3xl transition ${
                        Number(newReview.rating) >= star
                          ? "text-yellow-500"
                          : "text-slate-300"
                      }`}
                      aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Textarea
              className="mt-4 min-h-24"
              placeholder="Texto de la reseña"
              value={newReview.review_text}
              onChange={(e) =>
                setNewReview({ ...newReview, review_text: e.target.value })
              }
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">
                  Estado de la reseña
                </p>
                <select
                  value={newReview.review_status}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      review_status: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                >
                  <option value="pending">Pendiente</option>
                  <option value="verified">Verificada</option>
                  <option value="rejected">Rechazada</option>
                </select>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">
                  Tipo de verificación
                </p>
                <select
                  value={newReview.verification_type}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      verification_type: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
                >
                  <option value="manual">Manual</option>
                  <option value="agenda">Cita agendada</option>
                  <option value="consulta">Consulta asistida</option>
                </select>
              </div>
            </div>

            <AccentButton className="mt-4" onClick={addReview}>
              Agregar reseña
            </AccentButton>

            <ReviewSection
              title="Pendientes"
              subtitle="Reseñas enviadas por pacientes que aún no se verifican ni publican."
              reviews={pendingReviews}
              updateReview={updateReview}
              saveReview={saveReview}
              deleteReviewPermanently={deleteReviewPermanently}
            />

            <ReviewSection
              title="Verificadas"
              subtitle="Reseñas confirmadas y publicadas en la página."
              reviews={verifiedReviews}
              updateReview={updateReview}
              saveReview={saveReview}
              deleteReviewPermanently={deleteReviewPermanently}
            />

            <ReviewSection
              title="Rechazadas"
              subtitle="Reseñas descartadas que no se muestran en la página pública."
              reviews={rejectedReviews}
              updateReview={updateReview}
              saveReview={saveReview}
              deleteReviewPermanently={deleteReviewPermanently}
            />
          </Card>

          <Card
            title="Servicios"
            subtitle="Agrega nuevos servicios o modifica los actuales, con sus precios y descripciones."
          >
            <div className="grid gap-4 md:grid-cols-[1fr_1.2fr_180px_auto]">
              <Input
                placeholder="Nombre del servicio"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
              <Input
                placeholder="Descripción"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Precio"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
              />
              <AccentButton onClick={addService}>Agregar</AccentButton>
            </div>

            <div className="mt-6 space-y-4">
              {services.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
                  Aún no hay servicios registrados.
                </div>
              ) : (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-[1fr_1.2fr_180px_auto_auto] md:items-center">
                      <Input
                        value={service.name || ""}
                        onChange={(e) =>
                          updateService(service.id, "name", e.target.value)
                        }
                      />
                      <Input
                        value={service.description || ""}
                        onChange={(e) =>
                          updateService(service.id, "description", e.target.value)
                        }
                      />
                      <Input
                        type="number"
                        value={service.price || ""}
                        onChange={(e) =>
                          updateService(service.id, "price", e.target.value)
                        }
                      />
                      <SecondaryButton onClick={() => saveService(service)}>
                        Guardar
                      </SecondaryButton>
                      <DangerButton onClick={() => deleteService(service.id)}>
                        Eliminar
                      </DangerButton>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}