"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../lib/supabase";

function Card({ title, subtitle, children, id }) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
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

function Label({ children }) {
  return <p className="mb-2 text-sm font-semibold text-slate-700">{children}</p>;
}

function ConfigGroupTitle({ children }) {
  return (
    <div className="mb-4 mt-8">
      <h3 className="text-lg font-bold text-slate-900">{children}</h3>
    </div>
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

function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100 ${
        props.className || ""
      }`}
    >
      {children}
    </select>
  );
}

function PrimaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 ${
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
      className={`rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 ${
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
      className={`rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 ${
        props.className || ""
      }`}
    >
      {children}
    </button>
  );
}

function StatusBadge({ children, tone = "default" }) {
  const tones = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    danger: "bg-rose-100 text-rose-700 border-rose-200",
    info: "bg-cyan-100 text-cyan-700 border-cyan-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        tones[tone] || tones.default
      }`}
    >
      {children}
    </span>
  );
}

function InfoStat({ label, value, helper }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      {helper ? <p className="mt-2 text-sm text-slate-500">{helper}</p> : null}
    </div>
  );
}

function EmptyState({ title, description }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <p className="text-lg font-semibold text-slate-800">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Divider() {
  return <div className="my-6 h-px w-full bg-slate-200" />;
}

function SidebarButton({ active, onClick, icon, label, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
        active
          ? "border-slate-900 bg-slate-900 text-white shadow-lg"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span className={active ? "text-white" : "text-slate-500"}>{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{label}</span>
        <span
          className={`mt-1 block text-xs leading-5 ${
            active ? "text-slate-200" : "text-slate-500"
          }`}
        >
          {description}
        </span>
      </span>
    </button>
  );
}

function RoleBadge({ role }) {
  if (role === "admin") {
    return <StatusBadge tone="success">Administrador</StatusBadge>;
  }

  if (role === "secretaria") {
    return <StatusBadge tone="info">Secretaria</StatusBadge>;
  }

  return <StatusBadge>Sin rol</StatusBadge>;
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm10 0h6V11h-6v9Zm0-11h6V4h-6v5Z" />
    </svg>
  );
}

function IconConfig() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .15 1.7 1.7 0 0 0-.85 1.45V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-.85-1.45 1.7 1.7 0 0 0-1-.15 1.7 1.7 0 0 0-1.87.34l-.06.06A2 2 0 1 1 2.54 16.9l.06-.06A1.7 1.7 0 0 0 2.94 15a1.7 1.7 0 0 0-.15-1 1.7 1.7 0 0 0-1.45-.85H1.25a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 2.79 8a1.7 1.7 0 0 0 .15-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06A2 2 0 1 1 5.37 2.24l.06.06A1.7 1.7 0 0 0 7.3 2.64a1.7 1.7 0 0 0 1-.15A1.7 1.7 0 0 0 9.15 1h.09a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 .85 1.45 1.7 1.7 0 0 0 1 .15 1.7 1.7 0 0 0 1.87-.34l.06-.06A2 2 0 1 1 21.46 5.1l-.06.06A1.7 1.7 0 0 0 21.06 7c.1.33.15.66.15 1a1.7 1.7 0 0 0 1.45.85h.09a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.45.85c-.1.33-.15.66-.15 1Z" />
    </svg>
  );
}

function IconProfile() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 21a8 8 0 1 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconAgenda() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  );
}

function IconPatients() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconReviews() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" />
      <path d="m9 10 1.2 1.2L15 6.5" />
    </svg>
  );
}

function IconClinic() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 21h16" />
      <path d="M6 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
      <path d="M10 9h4M12 7v4M9 14h2M13 14h2M9 18h2M13 18h2" />
    </svg>
  );
}

function IconPublicity() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 11v2" />
      <path d="M7 9v6" />
      <path d="M11 7v10" />
      <path d="M15 9v6" />
      <path d="M19 11v2" />
    </svg>
  );
}

function IconServices() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

function IconLicenses() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function IconCredentials() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3 2 9l10 6 10-6-10-6Z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
    </svg>
  );
}

function IconExpediente() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M9 3h6l1 2h3a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a2 2 0 0 1 2-2h3l1-2Z" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}

function IconHeartbeat() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 12h4l2-4 4 8 2-4h6" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function formatDate(dateString) {
  if (!dateString) return "—";

  try {
    return new Date(`${dateString}T00:00:00`).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function formatDateTime(dateString, timeString) {
  if (!dateString) return "—";
  const datePart = formatDate(dateString);
  const safeTime = timeString ? String(timeString).slice(0, 5) : "—";
  return `${datePart} · ${safeTime}`;
}

function formatDateTimeStamp(dateString) {
  if (!dateString) return "—";
  try {
    return new Date(dateString).toLocaleString("es-MX");
  } catch {
    return dateString;
  }
}

function calculateAgeFromBirthDate(dateString) {
  if (!dateString) return "";
  const today = new Date();
  const birth = new Date(`${dateString}T00:00:00`);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age >= 0 ? String(age) : "";
}

function calculateImc(pesoKg, tallaCm) {
  const peso = Number(pesoKg || 0);
  const tallaMetros = Number(tallaCm || 0) / 100;

  if (!peso || !tallaMetros) return "";
  const imc = peso / (tallaMetros * tallaMetros);
  if (!Number.isFinite(imc)) return "";
  return imc.toFixed(2);
}

const DEFAULT_CONFIG = {
  booking_url: "",
  whatsapp_number: "",
  whatsapp_message: "",
  hero_title: "",
  hero_subtitle: "",
  cta_primary_text: "",
  cta_secondary_text: "",
  agenda_title: "",
  agenda_subtitle: "",
  doctor_name: "",
  doctor_specialty: "",
  doctor_city: "",
  doctor_state: "",
  doctor_whatsapp: "",
  doctor_email: "",
  doctor_phone: "",
  about_title: "",
  about_text: "",
  reasons_title: "",
  reason_1_title: "",
  reason_1: "",
  reason_2_title: "",
  reason_2: "",
  reason_3_title: "",
  reason_3: "",
  reason_4_title: "",
  reason_4: "",
  faq_q1: "",
  faq_a1: "",
  faq_q2: "",
  faq_a2: "",
  faq_q3: "",
  faq_a3: "",
  faq_q4: "",
  faq_a4: "",
  seo_title: "",
  seo_description: "",
  seo_city: "",
  seo_region: "",
  reviews_primary_url: "",
  reviews_secondary_url: "",
};

const DEFAULT_APPOINTMENT_FORM = {
  id: null,
  patient_id: null,
  nombre: "",
  telefono: "",
  correo: "",
  edad: "",
  fecha_nacimiento: "",
  fecha_cita: "",
  hora_cita: "",
  tipo_consulta: "presencial",
  status: "pending",
  confirmed: false,
  notes_admin: "",
};

const DEFAULT_PATIENT_FORM = {
  id: null,
  nombre: "",
  telefono: "",
  correo: "",
  fecha_nacimiento: "",
  edad: "",
  sexo: "",
};

const DEFAULT_CLINICAL_HISTORY = {
  id: null,
  motivo_consulta: "",
  padecimiento_actual: "",
  antecedentes_heredofamiliares: "",
  antecedentes_personales_no_patologicos: "",
  antecedentes_personales_patologicos: "",
  antecedentes_gineco_obstetricos: "",
  antecedentes_perinatales: "",
  antecedentes_inmunizaciones: "",
  alergias: "",
  medicamentos_actuales: "",
  toxicomanias: "",
  interrogatorio_aparatos_sistemas: "",
  exploracion_fisica_general: "",
};

const DEFAULT_VITAL_FORM = {
  id: null,
  taken_at: "",
  appointment_id: null,
  peso_kg: "",
  talla_cm: "",
  imc: "",
  temperatura_c: "",
  frecuencia_cardiaca: "",
  frecuencia_respiratoria: "",
  tension_arterial_sistolica: "",
  tension_arterial_diastolica: "",
  saturacion_oxigeno: "",
  glucosa_capilar: "",
  perimetro_cefalico_cm: "",
  observaciones: "",
};

const DEFAULT_MEDICAL_NOTE = {
  id: null,
  appointment_id: null,
  vital_signs_id: null,
  note_type: "consulta_general",
  note_date: "",
  motivo_consulta: "",
  padecimiento_actual: "",
  subjetivo: "",
  objetivo: "",
  exploracion_fisica: "",
  analisis: "",
  impresion_diagnostica: "",
  pronostico: "",
  plan_terapeutico: "",
  indicaciones: "",
  estudios_solicitados: "",
  referencia_texto: "",
  observaciones: "",
  consultation_status: "open",
};

const DEFAULT_DIAGNOSIS_FORM = {
  id: null,
  diagnosis_type: "principal",
  cie10_code: "",
  diagnosis_name: "",
  observations: "",
};

const DEFAULT_TREATMENT_FORM = {
  id: null,
  medication_name: "",
  presentation: "",
  dosage: "",
  route: "",
  frequency: "",
  duration: "",
  recommendations: "",
  non_pharmacological_measures: "",
};

const DEFAULT_FOLLOW_UP_FORM = {
  id: null,
  follow_up_date: "",
  follow_up_reason: "",
  instructions: "",
  warning_signs: "",
  pending_studies: "",
  next_step: "",
  status: "pending",
};

function buildPatientSnapshot(patient) {
  if (!patient) {
    return {
      patient_id: null,
      nombre: "",
      telefono: "",
      correo: "",
      edad: "",
      fecha_nacimiento: "",
    };
  }

  return {
    patient_id: patient.id,
    nombre: patient.nombre || "",
    telefono: patient.telefono || "",
    correo: patient.correo || "",
    edad:
      patient.edad === null || patient.edad === undefined
        ? ""
        : String(patient.edad),
    fecha_nacimiento: patient.fecha_nacimiento || "",
  };
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

export default function AdminPage() {
  const supabase = createClient();

  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [services, setServices] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [savingConfig, setSavingConfig] = useState(false);

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
    destacado: false,
    orden: 0,
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

  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [titleFile, setTitleFile] = useState(null);
  const [diplomaFile, setDiplomaFile] = useState(null);
  const [clinicFile, setClinicFile] = useState(null);
  const [publicityFile, setPublicityFile] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState(DEFAULT_APPOINTMENT_FORM);
  const [appointmentMode, setAppointmentMode] = useState("create");
  const [savingAppointment, setSavingAppointment] = useState(false);
  const [slotsDate, setSlotsDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [appointmentFilters, setAppointmentFilters] = useState({
    fecha: new Date().toISOString().split("T")[0],
    status: "all",
    tipo: "all",
  });

  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [patientsSearch, setPatientsSearch] = useState("");
  const [patientForm, setPatientForm] = useState(DEFAULT_PATIENT_FORM);
  const [patientMode, setPatientMode] = useState("create");
  const [savingPatient, setSavingPatient] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientAppointments, setSelectedPatientAppointments] = useState([]);
  const [patientAppointmentsLoading, setPatientAppointmentsLoading] =
    useState(false);

  const [activeClinicalTab, setActiveClinicalTab] = useState("historia");
  const [clinicalFile, setClinicalFile] = useState(null);
  const [clinicalFileLoading, setClinicalFileLoading] = useState(false);

  const [clinicalHistory, setClinicalHistory] = useState(DEFAULT_CLINICAL_HISTORY);
  const [clinicalHistoryLoading, setClinicalHistoryLoading] = useState(false);
  const [savingClinicalHistory, setSavingClinicalHistory] = useState(false);

  const [vitalSigns, setVitalSigns] = useState([]);
  const [vitalSignsLoading, setVitalSignsLoading] = useState(false);
  const [vitalForm, setVitalForm] = useState(DEFAULT_VITAL_FORM);
  const [vitalMode, setVitalMode] = useState("create");
  const [savingVitalSigns, setSavingVitalSigns] = useState(false);

  const [medicalNotes, setMedicalNotes] = useState([]);
  const [medicalNotesLoading, setMedicalNotesLoading] = useState(false);
  const [medicalNoteForm, setMedicalNoteForm] = useState(DEFAULT_MEDICAL_NOTE);
  const [medicalNoteMode, setMedicalNoteMode] = useState("create");
  const [savingMedicalNote, setSavingMedicalNote] = useState(false);

  const [diagnoses, setDiagnoses] = useState([]);
  const [diagnosesLoading, setDiagnosesLoading] = useState(false);
  const [diagnosisForm, setDiagnosisForm] = useState(DEFAULT_DIAGNOSIS_FORM);
  const [savingDiagnosis, setSavingDiagnosis] = useState(false);

  const [treatments, setTreatments] = useState([]);
  const [treatmentsLoading, setTreatmentsLoading] = useState(false);
  const [treatmentForm, setTreatmentForm] = useState(DEFAULT_TREATMENT_FORM);
  const [savingTreatment, setSavingTreatment] = useState(false);

  const [followUps, setFollowUps] = useState([]);
  const [followUpsLoading, setFollowUpsLoading] = useState(false);
  const [followUpForm, setFollowUpForm] = useState(DEFAULT_FOLLOW_UP_FORM);
  const [savingFollowUp, setSavingFollowUp] = useState(false);

  const isAdmin = userRole === "admin";
  const isSecretary = userRole === "secretaria";

  const canManageReviews = isAdmin || isSecretary;
  const canManageClinicImages = isAdmin || isSecretary;
  const canManagePublicity = isAdmin || isSecretary;
  const canManageAgenda = isAdmin || isSecretary;
  const canManagePatients = isAdmin || isSecretary;
  const canSeeSensitiveConfig = isAdmin;
  const canManageProfile = isAdmin;
  const canManageServices = isAdmin;
  const canManageLicenses = isAdmin;
  const canManageProfessionalImages = isAdmin;

  const canViewClinicalFile = isAdmin || isSecretary;
  const canEditIdentification = isAdmin || isSecretary;
  const canEditVitalSigns = isAdmin || isSecretary;
  const canEditClinicalHistory = isAdmin;
  const canEditMedicalNotes = isAdmin;
  const canEditDiagnoses = isAdmin;
  const canEditTreatments = isAdmin;
  const canEditFollowUps = isAdmin;

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (isSecretary) {
      const allowed = [
        "dashboard",
        "agenda",
        "patients",
        "reviews",
        "clinic",
        "publicity",
        "expediente",
      ];

      if (!allowed.includes(activeSection)) {
        setActiveSection("dashboard");
      }
    }
  }, [activeSection, isSecretary]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeSection]);

  useEffect(() => {
    if (!canManagePatients) return;

    const timeout = setTimeout(() => {
      fetchPatients();
    }, 250);

    return () => clearTimeout(timeout);
  }, [patientsSearch, canManagePatients]);

  useEffect(() => {
    if (!selectedPatientId) return;
    fetchPatientAppointments(selectedPatientId);
  }, [selectedPatientId]);

  async function init() {
    setAuthLoading(true);

    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();

    setSession(currentSession);

    if (!currentSession) {
      setUserRole(null);
      setAuthLoading(false);
      return;
    }

    await loadRoleAndData(currentSession);
    setAuthLoading(false);
  }

  async function loadRoleAndData(currentSession) {
    if (!currentSession) return;

    setRoleLoading(true);

    const { data: role, error } = await supabase.rpc("get_my_role");

    if (error || !role) {
      setUserRole(null);
      setRoleLoading(false);
      return;
    }

    setUserRole(role);
    await fetchAllByRole(role);

    setRoleLoading(false);
  }

  async function fetchAllByRole(role) {
    const tasks = [fetchDocuments(), fetchReviews()];

    if (role === "admin") {
      tasks.push(fetchServices(), fetchLicenses(), fetchProfile(), fetchConfig());
    }

    if (role === "admin" || role === "secretaria") {
      tasks.push(fetchAppointments(), fetchAvailableSlots(slotsDate), fetchPatients());
    }

    await Promise.all(tasks);
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
    await loadRoleAndData(data.session);
  }

  async function logout() {
    await supabase.auth.signOut();
    location.reload();
  }

  async function fetchServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      alert(error.message);
      return;
    }

    setServices(
      (data || []).map((service) => ({
        ...service,
        destacado: Boolean(service.destacado),
        orden: Number(service.orden || 0),
      }))
    );
  }

  async function addService() {
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!newService.name.trim()) {
      alert("Agrega al menos el nombre del servicio");
      return;
    }

    const payload = {
      name: newService.name.trim(),
      description: newService.description.trim(),
      price: Number(newService.price || 0),
      destacado: Boolean(newService.destacado),
      orden: Number(newService.orden || 0),
    };

    const { error } = await supabase.from("services").insert([payload]);

    if (error) {
      alert(error.message);
    } else {
      setNewService({
        name: "",
        description: "",
        price: "",
        destacado: false,
        orden: 0,
      });
      fetchServices();
    }
  }

  function updateService(id, field, value) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  async function saveService(service) {
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    const payload = {
      name: service.name || "",
      description: service.description || "",
      price: Number(service.price || 0),
      destacado: Boolean(service.destacado),
      orden: Number(service.orden || 0),
    };

    const { error } = await supabase
      .from("services")
      .update(payload)
      .eq("id", service.id);

    if (error) {
      alert(error.message);
    } else {
      fetchServices();
    }
  }

  async function deleteService(id) {
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchServices();
    }
  }

  async function fetchProfile() {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      return;
    }

    if (data) setProfile(data);
  }

  async function saveProfile() {
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!profile.id) {
      alert("No se encontró el perfil para actualizar");
      return;
    }

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
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

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
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

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
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    const { error } = await supabase.from("licenses").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      fetchLicenses();
    }
  }

  async function fetchDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setDocuments(data || []);
  }

  async function uploadImage(file, category) {
    const allowedForSecretary = ["foto_consultorio", "publicidad"];

    if (!isAdmin && !(isSecretary && allowedForSecretary.includes(category))) {
      alert("No tienes permisos para esta acción.");
      return;
    }

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
    const image = documents.find((doc) => doc.id === id);
    const allowedForSecretary = ["foto_consultorio", "publicidad"];

    if (
      !isAdmin &&
      !(isSecretary && image && allowedForSecretary.includes(image.category))
    ) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    const path = url.split("/documents/")[1];

    if (path) {
      await supabase.storage.from("documents").remove([path]);
    }

    await supabase.from("documents").delete().eq("id", id);
    fetchDocuments();
  }

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setReviews((data || []).map(normalizeReviewByStatus));
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
    async function addReview() {
    if (!canManageReviews) {
      alert("No tienes permisos para esta acción.");
      return;
    }

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

  async function saveReview(review) {
    if (!canManageReviews) {
      alert("No tienes permisos para esta acción.");
      return;
    }

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
    if (!canManageReviews) {
      alert("No tienes permisos para esta acción.");
      return;
    }

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

  async function fetchConfig() {
    const { data, error } = await supabase.from("config").select("*");

    if (error) {
      console.error(error.message);
      return;
    }

    const mapped = { ...DEFAULT_CONFIG };

    (data || []).forEach((item) => {
      if (item?.key) {
        mapped[item.key] = item.value ?? "";
      }
    });

    setConfig(mapped);
  }

  function updateConfigField(key, value) {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function saveConfig() {
    if (!isAdmin) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    setSavingConfig(true);

    const rows = Object.entries(config).map(([key, value]) => ({
      key,
      value: value ?? "",
    }));

    const { error } = await supabase
      .from("config")
      .upsert(rows, { onConflict: "key" });

    setSavingConfig(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Configuración actualizada");
      fetchConfig();
    }
  }

  async function fetchPatients(customSearch = patientsSearch) {
    if (!canManagePatients) return;

    setPatientsLoading(true);

    let query = supabase
      .from("patients")
      .select("*")
      .order("updated_at", { ascending: false });

    const safeSearch = (customSearch || "").trim();

    if (safeSearch) {
      query = query.or(
        `nombre.ilike.%${safeSearch}%,telefono.ilike.%${safeSearch}%,correo.ilike.%${safeSearch}%`
      );
    }

    const { data, error } = await query;

    setPatientsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setPatients(data || []);
  }

  async function fetchPatientAppointments(patientId) {
    if (!canManagePatients || !patientId) {
      setSelectedPatientAppointments([]);
      return;
    }

    setPatientAppointmentsLoading(true);

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("patient_id", patientId)
      .order("fecha_cita", { ascending: false })
      .order("hora_cita", { ascending: false });

    setPatientAppointmentsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setSelectedPatientAppointments(data || []);
  }

  function resetPatientForm() {
    setPatientMode("create");
    setPatientForm(DEFAULT_PATIENT_FORM);
  }

  function resetClinicalState() {
    setClinicalFile(null);
    setClinicalHistory(DEFAULT_CLINICAL_HISTORY);
    setVitalSigns([]);
    setVitalForm(DEFAULT_VITAL_FORM);
    setVitalMode("create");
    setMedicalNotes([]);
    setMedicalNoteForm(DEFAULT_MEDICAL_NOTE);
    setMedicalNoteMode("create");
    setDiagnoses([]);
    setDiagnosisForm(DEFAULT_DIAGNOSIS_FORM);
    setTreatments([]);
    setTreatmentForm(DEFAULT_TREATMENT_FORM);
    setFollowUps([]);
    setFollowUpForm(DEFAULT_FOLLOW_UP_FORM);
    setActiveClinicalTab("historia");
  }

  function openCreatePatient(prefill = {}) {
    setPatientMode("create");
    setPatientForm({
      ...DEFAULT_PATIENT_FORM,
      ...prefill,
      edad:
        prefill.edad === null || prefill.edad === undefined
          ? prefill.fecha_nacimiento
            ? calculateAgeFromBirthDate(prefill.fecha_nacimiento)
            : ""
          : String(prefill.edad),
    });
    setSelectedPatientId(null);
    setSelectedPatientAppointments([]);
    resetClinicalState();
    setActiveSection("patients");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function openEditPatient(patient) {
    setPatientMode("edit");
    setPatientForm({
      id: patient.id,
      nombre: patient.nombre || "",
      telefono: patient.telefono || "",
      correo: patient.correo || "",
      fecha_nacimiento: patient.fecha_nacimiento || "",
      edad:
        patient.edad === null || patient.edad === undefined
          ? patient.fecha_nacimiento
            ? calculateAgeFromBirthDate(patient.fecha_nacimiento)
            : ""
          : String(patient.edad),
      sexo: patient.sexo || "",
    });

    setSelectedPatientId(patient.id);
    setActiveSection("patients");

    await Promise.all([
      fetchPatientAppointments(patient.id),
      loadClinicalFile(patient.id),
    ]);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function attachPatientToAppointment(patient) {
    const snapshot = buildPatientSnapshot(patient);
    setAppointmentForm((prev) => ({
      ...prev,
      ...snapshot,
    }));
  }

  function removePatientFromAppointment() {
    setAppointmentForm((prev) => ({
      ...prev,
      patient_id: null,
    }));
  }

  async function savePatientForm() {
    if (!canEditIdentification) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!patientForm.nombre.trim()) {
      alert("El nombre del paciente es obligatorio.");
      return;
    }

    setSavingPatient(true);

    const safeBirthDate = patientForm.fecha_nacimiento || null;
    const safeAge =
      patientForm.edad === ""
        ? safeBirthDate
          ? Number(calculateAgeFromBirthDate(safeBirthDate))
          : null
        : Number(patientForm.edad);

    const payload = {
      nombre: patientForm.nombre.trim(),
      telefono: patientForm.telefono.trim() || null,
      correo: patientForm.correo.trim().toLowerCase() || null,
      fecha_nacimiento: safeBirthDate,
      edad: Number.isFinite(safeAge) ? safeAge : null,
      sexo: patientForm.sexo || null,
    };

    let response;

    if (patientMode === "create") {
      response = await supabase.from("patients").insert(payload).select().single();
    } else {
      response = await supabase
        .from("patients")
        .update(payload)
        .eq("id", patientForm.id)
        .select()
        .single();
    }

    setSavingPatient(false);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    const savedPatient = response.data;

    if (savedPatient) {
      setSelectedPatientId(savedPatient.id);
      await Promise.all([
        fetchPatientAppointments(savedPatient.id),
        loadClinicalFile(savedPatient.id),
      ]);
      attachPatientToAppointment(savedPatient);
    }

    await fetchPatients();

    alert(
      patientMode === "create"
        ? "Paciente registrado correctamente."
        : "Paciente actualizado correctamente."
    );

    setPatientMode("edit");
    setPatientForm({
      id: savedPatient.id,
      nombre: savedPatient.nombre || "",
      telefono: savedPatient.telefono || "",
      correo: savedPatient.correo || "",
      fecha_nacimiento: savedPatient.fecha_nacimiento || "",
      edad:
        savedPatient.edad === null || savedPatient.edad === undefined
          ? savedPatient.fecha_nacimiento
            ? calculateAgeFromBirthDate(savedPatient.fecha_nacimiento)
            : ""
          : String(savedPatient.edad),
      sexo: savedPatient.sexo || "",
    });
  }

  async function fetchAppointments() {
    if (!canManageAgenda) return;

    setAppointmentsLoading(true);

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("fecha_cita", { ascending: true })
      .order("hora_cita", { ascending: true });

    setAppointmentsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setAppointments(data || []);
  }

  async function fetchAvailableSlots(date) {
    if (!canManageAgenda || !date) return;

    setSlotsLoading(true);

    const { data, error } = await supabase.rpc(
      "get_available_appointment_slots",
      { p_fecha: date }
    );

    setSlotsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setAvailableSlots(data || []);
  }

  function resetAppointmentForm(targetDate = "") {
    setAppointmentMode("create");
    setAppointmentForm({
      ...DEFAULT_APPOINTMENT_FORM,
      fecha_cita: targetDate || appointmentFilters.fecha || "",
    });
  }

  function openEditAppointment(appointment) {
    setAppointmentMode("edit");
    setActiveSection("agenda");
    setAppointmentForm({
      id: appointment.id,
      patient_id: appointment.patient_id || null,
      nombre: appointment.nombre || "",
      telefono: appointment.telefono || "",
      correo: appointment.correo || "",
      edad:
        appointment.edad === null || appointment.edad === undefined
          ? ""
          : String(appointment.edad),
      fecha_nacimiento: appointment.fecha_nacimiento || "",
      fecha_cita: appointment.fecha_cita || "",
      hora_cita: appointment.hora_cita
        ? String(appointment.hora_cita).slice(0, 5)
        : "",
      tipo_consulta: appointment.tipo_consulta || "presencial",
      status: appointment.status || "pending",
      confirmed: Boolean(appointment.confirmed),
      notes_admin: appointment.notes_admin || "",
    });

    setSlotsDate(appointment.fecha_cita || slotsDate);
    if (appointment.fecha_cita) {
      fetchAvailableSlots(appointment.fecha_cita);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveAppointmentForm() {
    if (!canManageAgenda) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (
      !appointmentForm.nombre.trim() ||
      !appointmentForm.fecha_cita ||
      !appointmentForm.hora_cita
    ) {
      alert("Completa nombre, fecha y horario.");
      return;
    }

    setSavingAppointment(true);

    if (appointmentMode === "create") {
      const { error } = await supabase.rpc("book_internal_appointment", {
        p_patient_id: appointmentForm.patient_id || null,
        p_nombre: appointmentForm.nombre.trim(),
        p_telefono: appointmentForm.telefono || null,
        p_correo: appointmentForm.correo || null,
        p_edad:
          appointmentForm.edad === "" ? null : Number(appointmentForm.edad),
        p_fecha_nacimiento: appointmentForm.fecha_nacimiento || null,
        p_fecha_cita: appointmentForm.fecha_cita,
        p_hora_cita: appointmentForm.hora_cita,
        p_tipo_consulta: appointmentForm.tipo_consulta,
        p_status: appointmentForm.status || "pending",
        p_confirmed: Boolean(appointmentForm.confirmed),
        p_notes_admin: appointmentForm.notes_admin || null,
      });

      setSavingAppointment(false);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Cita creada correctamente.");
    } else {
      const { error } = await supabase.rpc("update_internal_appointment", {
        p_appointment_id: appointmentForm.id,
        p_patient_id: appointmentForm.patient_id || null,
        p_nombre: appointmentForm.nombre.trim(),
        p_telefono: appointmentForm.telefono || null,
        p_correo: appointmentForm.correo || null,
        p_edad:
          appointmentForm.edad === "" ? null : Number(appointmentForm.edad),
        p_fecha_nacimiento: appointmentForm.fecha_nacimiento || null,
        p_fecha_cita: appointmentForm.fecha_cita,
        p_hora_cita: appointmentForm.hora_cita,
        p_tipo_consulta: appointmentForm.tipo_consulta,
        p_status: appointmentForm.status || "pending",
        p_confirmed: Boolean(appointmentForm.confirmed),
        p_notes_admin: appointmentForm.notes_admin || null,
      });

      setSavingAppointment(false);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Cita actualizada correctamente.");
    }

    resetAppointmentForm(appointmentForm.fecha_cita);
    fetchAppointments();
    fetchAvailableSlots(appointmentForm.fecha_cita);
  }

  async function cancelAppointment(appointment) {
    if (!canManageAgenda) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    const confirmed = window.confirm(
      `¿Seguro que quieres cancelar la cita de ${appointment.nombre}?`
    );

    if (!confirmed) return;

    const reason = window.prompt(
      "Motivo de cancelación (opcional):",
      appointment.cancelled_reason || ""
    );

    const { error } = await supabase.rpc("cancel_internal_appointment", {
      p_appointment_id: appointment.id,
      p_reason: reason || null,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Cita cancelada.");
    fetchAppointments();
    fetchAvailableSlots(appointment.fecha_cita);
  }

  async function loadClinicalFile(patientId) {
    if (!canViewClinicalFile || !patientId) {
      setClinicalFile(null);
      return;
    }

    setClinicalFileLoading(true);

    const { data, error } = await supabase
      .from("patient_clinical_files")
      .select("*")
      .eq("patient_id", patientId)
      .single();

    setClinicalFileLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setClinicalFile(data || null);

    if (data?.id) {
      await Promise.all([
        fetchClinicalHistory(patientId, data.id),
        fetchVitalSigns(patientId, data.id),
        fetchMedicalNotes(patientId, data.id),
      ]);
    } else {
      setClinicalHistory(DEFAULT_CLINICAL_HISTORY);
      setVitalSigns([]);
      setMedicalNotes([]);
    }
  }

  async function fetchClinicalHistory(patientId, clinicalFileId) {
    if (!patientId || !clinicalFileId) return;

    setClinicalHistoryLoading(true);

    const { data, error } = await supabase
      .from("clinical_histories")
      .select("*")
      .eq("patient_id", patientId)
      .eq("clinical_file_id", clinicalFileId)
      .maybeSingle();

    setClinicalHistoryLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setClinicalHistory(
      data
        ? {
            id: data.id,
            motivo_consulta: data.motivo_consulta || "",
            padecimiento_actual: data.padecimiento_actual || "",
            antecedentes_heredofamiliares:
              data.antecedentes_heredofamiliares || "",
            antecedentes_personales_no_patologicos:
              data.antecedentes_personales_no_patologicos || "",
            antecedentes_personales_patologicos:
              data.antecedentes_personales_patologicos || "",
            antecedentes_gineco_obstetricos:
              data.antecedentes_gineco_obstetricos || "",
            antecedentes_perinatales: data.antecedentes_perinatales || "",
            antecedentes_inmunizaciones: data.antecedentes_inmunizaciones || "",
            alergias: data.alergias || "",
            medicamentos_actuales: data.medicamentos_actuales || "",
            toxicomanias: data.toxicomanias || "",
            interrogatorio_aparatos_sistemas:
              data.interrogatorio_aparatos_sistemas || "",
            exploracion_fisica_general: data.exploracion_fisica_general || "",
          }
        : DEFAULT_CLINICAL_HISTORY
    );
  }

  async function saveClinicalHistory() {
    if (!canEditClinicalHistory) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!selectedPatientId || !clinicalFile?.id) {
      alert("Selecciona un paciente con expediente clínico.");
      return;
    }

    setSavingClinicalHistory(true);

    const payload = {
      patient_id: selectedPatientId,
      clinical_file_id: clinicalFile.id,
      motivo_consulta: clinicalHistory.motivo_consulta || null,
      padecimiento_actual: clinicalHistory.padecimiento_actual || null,
      antecedentes_heredofamiliares:
        clinicalHistory.antecedentes_heredofamiliares || null,
      antecedentes_personales_no_patologicos:
        clinicalHistory.antecedentes_personales_no_patologicos || null,
      antecedentes_personales_patologicos:
        clinicalHistory.antecedentes_personales_patologicos || null,
      antecedentes_gineco_obstetricos:
        clinicalHistory.antecedentes_gineco_obstetricos || null,
      antecedentes_perinatales: clinicalHistory.antecedentes_perinatales || null,
      antecedentes_inmunizaciones:
        clinicalHistory.antecedentes_inmunizaciones || null,
      alergias: clinicalHistory.alergias || null,
      medicamentos_actuales: clinicalHistory.medicamentos_actuales || null,
      toxicomanias: clinicalHistory.toxicomanias || null,
      interrogatorio_aparatos_sistemas:
        clinicalHistory.interrogatorio_aparatos_sistemas || null,
      exploracion_fisica_general:
        clinicalHistory.exploracion_fisica_general || null,
    };

    let response;

    if (clinicalHistory.id) {
      response = await supabase
        .from("clinical_histories")
        .update(payload)
        .eq("id", clinicalHistory.id)
        .select()
        .single();
    } else {
      response = await supabase
        .from("clinical_histories")
        .insert(payload)
        .select()
        .single();
    }

    setSavingClinicalHistory(false);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    await fetchClinicalHistory(selectedPatientId, clinicalFile.id);
    alert("Historia clínica guardada.");
  }

  async function fetchVitalSigns(patientId, clinicalFileId) {
    if (!patientId || !clinicalFileId) return;

    setVitalSignsLoading(true);

    const { data, error } = await supabase
      .from("vital_signs")
      .select("*")
      .eq("patient_id", patientId)
      .eq("clinical_file_id", clinicalFileId)
      .order("taken_at", { ascending: false });

    setVitalSignsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setVitalSigns(data || []);
  }

  function resetVitalForm() {
    setVitalMode("create");
    setVitalForm(DEFAULT_VITAL_FORM);
  }

  function openEditVital(vital) {
    setVitalMode("edit");
    setVitalForm({
      id: vital.id,
      taken_at: vital.taken_at
        ? new Date(vital.taken_at).toISOString().slice(0, 16)
        : "",
      appointment_id: vital.appointment_id || null,
      peso_kg:
        vital.peso_kg === null || vital.peso_kg === undefined
          ? ""
          : String(vital.peso_kg),
      talla_cm:
        vital.talla_cm === null || vital.talla_cm === undefined
          ? ""
          : String(vital.talla_cm),
      imc:
        vital.imc === null || vital.imc === undefined ? "" : String(vital.imc),
      temperatura_c:
        vital.temperatura_c === null || vital.temperatura_c === undefined
          ? ""
          : String(vital.temperatura_c),
      frecuencia_cardiaca:
        vital.frecuencia_cardiaca === null ||
        vital.frecuencia_cardiaca === undefined
          ? ""
          : String(vital.frecuencia_cardiaca),
      frecuencia_respiratoria:
        vital.frecuencia_respiratoria === null ||
        vital.frecuencia_respiratoria === undefined
          ? ""
          : String(vital.frecuencia_respiratoria),
      tension_arterial_sistolica:
        vital.tension_arterial_sistolica === null ||
        vital.tension_arterial_sistolica === undefined
          ? ""
          : String(vital.tension_arterial_sistolica),
      tension_arterial_diastolica:
        vital.tension_arterial_diastolica === null ||
        vital.tension_arterial_diastolica === undefined
          ? ""
          : String(vital.tension_arterial_diastolica),
      saturacion_oxigeno:
        vital.saturacion_oxigeno === null || vital.saturacion_oxigeno === undefined
          ? ""
          : String(vital.saturacion_oxigeno),
      glucosa_capilar:
        vital.glucosa_capilar === null || vital.glucosa_capilar === undefined
          ? ""
          : String(vital.glucosa_capilar),
      perimetro_cefalico_cm:
        vital.perimetro_cefalico_cm === null ||
        vital.perimetro_cefalico_cm === undefined
          ? ""
          : String(vital.perimetro_cefalico_cm),
      observaciones: vital.observaciones || "",
    });
    setActiveClinicalTab("vitales");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function saveVitalForm() {
    if (!canEditVitalSigns) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!selectedPatientId || !clinicalFile?.id) {
      alert("Selecciona un paciente con expediente clínico.");
      return;
    }

    setSavingVitalSigns(true);

    const safeImc =
      vitalForm.imc || calculateImc(vitalForm.peso_kg, vitalForm.talla_cm);

    const payload = {
      patient_id: selectedPatientId,
      clinical_file_id: clinicalFile.id,
      appointment_id: vitalForm.appointment_id || null,
      taken_at: vitalForm.taken_at || new Date().toISOString(),
      peso_kg: vitalForm.peso_kg === "" ? null : Number(vitalForm.peso_kg),
      talla_cm: vitalForm.talla_cm === "" ? null : Number(vitalForm.talla_cm),
      imc: safeImc === "" ? null : Number(safeImc),
      temperatura_c:
        vitalForm.temperatura_c === "" ? null : Number(vitalForm.temperatura_c),
      frecuencia_cardiaca:
        vitalForm.frecuencia_cardiaca === ""
          ? null
          : Number(vitalForm.frecuencia_cardiaca),
      frecuencia_respiratoria:
        vitalForm.frecuencia_respiratoria === ""
          ? null
          : Number(vitalForm.frecuencia_respiratoria),
      tension_arterial_sistolica:
        vitalForm.tension_arterial_sistolica === ""
          ? null
          : Number(vitalForm.tension_arterial_sistolica),
      tension_arterial_diastolica:
        vitalForm.tension_arterial_diastolica === ""
          ? null
          : Number(vitalForm.tension_arterial_diastolica),
      saturacion_oxigeno:
        vitalForm.saturacion_oxigeno === ""
          ? null
          : Number(vitalForm.saturacion_oxigeno),
      glucosa_capilar:
        vitalForm.glucosa_capilar === ""
          ? null
          : Number(vitalForm.glucosa_capilar),
      perimetro_cefalico_cm:
        vitalForm.perimetro_cefalico_cm === ""
          ? null
          : Number(vitalForm.perimetro_cefalico_cm),
      observaciones: vitalForm.observaciones || null,
    };

    let response;

    if (vitalMode === "create") {
      response = await supabase
        .from("vital_signs")
        .insert(payload)
        .select()
        .single();
    } else {
      response = await supabase
        .from("vital_signs")
        .update(payload)
        .eq("id", vitalForm.id)
        .select()
        .single();
    }

    setSavingVitalSigns(false);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    await fetchVitalSigns(selectedPatientId, clinicalFile.id);
    resetVitalForm();
    alert("Signos vitales guardados.");
  }

  async function deleteVital(id) {
    if (!isAdmin) {
      alert("Solo el administrador puede borrar signos vitales.");
      return;
    }

    const confirmed = window.confirm(
      "¿Seguro que quieres borrar este registro de signos vitales?"
    );

    if (!confirmed) return;

    const { error } = await supabase.from("vital_signs").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchVitalSigns(selectedPatientId, clinicalFile.id);
  }

  async function fetchMedicalNotes(patientId, clinicalFileId) {
    if (!patientId || !clinicalFileId) return;

    setMedicalNotesLoading(true);

    const { data, error } = await supabase
      .from("medical_notes")
      .select("*")
      .eq("patient_id", patientId)
      .eq("clinical_file_id", clinicalFileId)
      .order("note_date", { ascending: false });

    setMedicalNotesLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setMedicalNotes(data || []);
  }

  function resetMedicalNoteForm() {
    setMedicalNoteMode("create");
    setMedicalNoteForm(DEFAULT_MEDICAL_NOTE);
    setDiagnosisForm(DEFAULT_DIAGNOSIS_FORM);
    setTreatmentForm(DEFAULT_TREATMENT_FORM);
    setFollowUpForm(DEFAULT_FOLLOW_UP_FORM);
    setDiagnoses([]);
    setTreatments([]);
    setFollowUps([]);
  }

  async function openEditMedicalNote(note) {
    setMedicalNoteMode("edit");
    setMedicalNoteForm({
      id: note.id,
      appointment_id: note.appointment_id || null,
      vital_signs_id: note.vital_signs_id || null,
      note_type: note.note_type || "consulta_general",
      note_date: note.note_date
        ? new Date(note.note_date).toISOString().slice(0, 16)
        : "",
      motivo_consulta: note.motivo_consulta || "",
      padecimiento_actual: note.padecimiento_actual || "",
      subjetivo: note.subjetivo || "",
      objetivo: note.objetivo || "",
      exploracion_fisica: note.exploracion_fisica || "",
      analisis: note.analisis || "",
      impresion_diagnostica: note.impresion_diagnostica || "",
      pronostico: note.pronostico || "",
      plan_terapeutico: note.plan_terapeutico || "",
      indicaciones: note.indicaciones || "",
      estudios_solicitados: note.estudios_solicitados || "",
      referencia_texto: note.referencia_texto || "",
      observaciones: note.observaciones || "",
      consultation_status: note.consultation_status || "open",
    });

    setActiveClinicalTab("nota");
    await Promise.all([
      fetchDiagnoses(note.id),
      fetchTreatments(note.id),
      fetchFollowUps(note.id),
    ]);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
    async function saveMedicalNoteForm(closeConsultation = false) {
    if (!canEditMedicalNotes) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!selectedPatientId || !clinicalFile?.id) {
      alert("Selecciona un paciente con expediente clínico.");
      return;
    }

    setSavingMedicalNote(true);

    const payload = {
      patient_id: selectedPatientId,
      clinical_file_id: clinicalFile.id,
      appointment_id: medicalNoteForm.appointment_id || null,
      vital_signs_id: medicalNoteForm.vital_signs_id || null,
      note_type: medicalNoteForm.note_type || "consulta_general",
      note_date: medicalNoteForm.note_date || new Date().toISOString(),
      motivo_consulta: medicalNoteForm.motivo_consulta || null,
      padecimiento_actual: medicalNoteForm.padecimiento_actual || null,
      subjetivo: medicalNoteForm.subjetivo || null,
      objetivo: medicalNoteForm.objetivo || null,
      exploracion_fisica: medicalNoteForm.exploracion_fisica || null,
      analisis: medicalNoteForm.analisis || null,
      impresion_diagnostica: medicalNoteForm.impresion_diagnostica || null,
      pronostico: medicalNoteForm.pronostico || null,
      plan_terapeutico: medicalNoteForm.plan_terapeutico || null,
      indicaciones: medicalNoteForm.indicaciones || null,
      estudios_solicitados: medicalNoteForm.estudios_solicitados || null,
      referencia_texto: medicalNoteForm.referencia_texto || null,
      observaciones: medicalNoteForm.observaciones || null,
      consultation_status: closeConsultation
        ? "closed"
        : medicalNoteForm.consultation_status || "open",
    };

    let response;

    if (medicalNoteMode === "create") {
      response = await supabase
        .from("medical_notes")
        .insert(payload)
        .select()
        .single();
    } else {
      response = await supabase
        .from("medical_notes")
        .update(payload)
        .eq("id", medicalNoteForm.id)
        .select()
        .single();
    }

    setSavingMedicalNote(false);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    const savedNote = response.data;

    if (closeConsultation && savedNote?.appointment_id) {
      await supabase
        .from("appointments")
        .update({
          status: "completed",
        })
        .eq("id", savedNote.appointment_id);
    }

    await fetchMedicalNotes(selectedPatientId, clinicalFile.id);
    setMedicalNoteMode("edit");
    setMedicalNoteForm({
      id: savedNote.id,
      appointment_id: savedNote.appointment_id || null,
      vital_signs_id: savedNote.vital_signs_id || null,
      note_type: savedNote.note_type || "consulta_general",
      note_date: savedNote.note_date
        ? new Date(savedNote.note_date).toISOString().slice(0, 16)
        : "",
      motivo_consulta: savedNote.motivo_consulta || "",
      padecimiento_actual: savedNote.padecimiento_actual || "",
      subjetivo: savedNote.subjetivo || "",
      objetivo: savedNote.objetivo || "",
      exploracion_fisica: savedNote.exploracion_fisica || "",
      analisis: savedNote.analisis || "",
      impresion_diagnostica: savedNote.impresion_diagnostica || "",
      pronostico: savedNote.pronostico || "",
      plan_terapeutico: savedNote.plan_terapeutico || "",
      indicaciones: savedNote.indicaciones || "",
      estudios_solicitados: savedNote.estudios_solicitados || "",
      referencia_texto: savedNote.referencia_texto || "",
      observaciones: savedNote.observaciones || "",
      consultation_status: savedNote.consultation_status || "open",
    });

    await Promise.all([
      fetchDiagnoses(savedNote.id),
      fetchTreatments(savedNote.id),
      fetchFollowUps(savedNote.id),
    ]);

    alert(
      closeConsultation
        ? "Consulta cerrada correctamente."
        : "Nota médica guardada."
    );
  }

  async function deleteMedicalNote(id) {
    if (!isAdmin) {
      alert("Solo el administrador puede borrar notas médicas.");
      return;
    }

    const confirmed = window.confirm(
      "¿Seguro que quieres borrar esta nota médica?"
    );

    if (!confirmed) return;

    const { error } = await supabase.from("medical_notes").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchMedicalNotes(selectedPatientId, clinicalFile.id);
    resetMedicalNoteForm();
  }

  async function fetchDiagnoses(medicalNoteId) {
    if (!medicalNoteId) {
      setDiagnoses([]);
      return;
    }

    setDiagnosesLoading(true);

    const { data, error } = await supabase
      .from("medical_diagnoses")
      .select("*")
      .eq("medical_note_id", medicalNoteId)
      .order("id", { ascending: true });

    setDiagnosesLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setDiagnoses(data || []);
  }

  async function saveDiagnosis() {
    if (!canEditDiagnoses) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!medicalNoteForm.id) {
      alert("Primero guarda la nota médica.");
      return;
    }

    if (!diagnosisForm.diagnosis_name.trim()) {
      alert("El nombre del diagnóstico es obligatorio.");
      return;
    }

    setSavingDiagnosis(true);

    const payload = {
      patient_id: selectedPatientId,
      clinical_file_id: clinicalFile.id,
      medical_note_id: medicalNoteForm.id,
      diagnosis_type: diagnosisForm.diagnosis_type || "principal",
      cie10_code: diagnosisForm.cie10_code.trim() || null,
      diagnosis_name: diagnosisForm.diagnosis_name.trim(),
      observations: diagnosisForm.observations.trim() || null,
    };

    let response;

    if (diagnosisForm.id) {
      response = await supabase
        .from("medical_diagnoses")
        .update(payload)
        .eq("id", diagnosisForm.id);
    } else {
      response = await supabase.from("medical_diagnoses").insert(payload);
    }

    setSavingDiagnosis(false);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    await fetchDiagnoses(medicalNoteForm.id);
    setDiagnosisForm(DEFAULT_DIAGNOSIS_FORM);
  }

  function openEditDiagnosis(diagnosis) {
    setDiagnosisForm({
      id: diagnosis.id,
      diagnosis_type: diagnosis.diagnosis_type || "principal",
      cie10_code: diagnosis.cie10_code || "",
      diagnosis_name: diagnosis.diagnosis_name || "",
      observations: diagnosis.observations || "",
    });
  }

  async function deleteDiagnosis(id) {
    if (!isAdmin) {
      alert("Solo el administrador puede borrar diagnósticos.");
      return;
    }

    const confirmed = window.confirm(
      "¿Seguro que quieres borrar este diagnóstico?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("medical_diagnoses")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchDiagnoses(medicalNoteForm.id);
    setDiagnosisForm(DEFAULT_DIAGNOSIS_FORM);
  }

  async function fetchTreatments(medicalNoteId) {
    if (!medicalNoteId) {
      setTreatments([]);
      return;
    }

    setTreatmentsLoading(true);

    const { data, error } = await supabase
      .from("medical_treatments")
      .select("*")
      .eq("medical_note_id", medicalNoteId)
      .order("id", { ascending: true });

    setTreatmentsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setTreatments(data || []);
  }

  async function saveTreatment() {
    if (!canEditTreatments) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!medicalNoteForm.id) {
      alert("Primero guarda la nota médica.");
      return;
    }

    setSavingTreatment(true);

    const payload = {
      patient_id: selectedPatientId,
      clinical_file_id: clinicalFile.id,
      medical_note_id: medicalNoteForm.id,
      medication_name: treatmentForm.medication_name.trim() || null,
      presentation: treatmentForm.presentation.trim() || null,
      dosage: treatmentForm.dosage.trim() || null,
      route: treatmentForm.route.trim() || null,
      frequency: treatmentForm.frequency.trim() || null,
      duration: treatmentForm.duration.trim() || null,
      recommendations: treatmentForm.recommendations.trim() || null,
      non_pharmacological_measures:
        treatmentForm.non_pharmacological_measures.trim() || null,
    };

    let response;

    if (treatmentForm.id) {
      response = await supabase
        .from("medical_treatments")
        .update(payload)
        .eq("id", treatmentForm.id);
    } else {
      response = await supabase.from("medical_treatments").insert(payload);
    }

    setSavingTreatment(false);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    await fetchTreatments(medicalNoteForm.id);
    setTreatmentForm(DEFAULT_TREATMENT_FORM);
  }

  function openEditTreatment(treatment) {
    setTreatmentForm({
      id: treatment.id,
      medication_name: treatment.medication_name || "",
      presentation: treatment.presentation || "",
      dosage: treatment.dosage || "",
      route: treatment.route || "",
      frequency: treatment.frequency || "",
      duration: treatment.duration || "",
      recommendations: treatment.recommendations || "",
      non_pharmacological_measures:
        treatment.non_pharmacological_measures || "",
    });
  }

  async function deleteTreatment(id) {
    if (!isAdmin) {
      alert("Solo el administrador puede borrar tratamientos.");
      return;
    }

    const confirmed = window.confirm(
      "¿Seguro que quieres borrar este tratamiento?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("medical_treatments")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchTreatments(medicalNoteForm.id);
    setTreatmentForm(DEFAULT_TREATMENT_FORM);
  }

  async function fetchFollowUps(medicalNoteId) {
    if (!medicalNoteId) {
      setFollowUps([]);
      return;
    }

    setFollowUpsLoading(true);

    const { data, error } = await supabase
      .from("medical_follow_ups")
      .select("*")
      .eq("medical_note_id", medicalNoteId)
      .order("id", { ascending: true });

    setFollowUpsLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setFollowUps(data || []);
  }

  async function saveFollowUp() {
    if (!canEditFollowUps) {
      alert("No tienes permisos para esta acción.");
      return;
    }

    if (!medicalNoteForm.id) {
      alert("Primero guarda la nota médica.");
      return;
    }

    setSavingFollowUp(true);

    const payload = {
      patient_id: selectedPatientId,
      clinical_file_id: clinicalFile.id,
      medical_note_id: medicalNoteForm.id,
      follow_up_date: followUpForm.follow_up_date || null,
      follow_up_reason: followUpForm.follow_up_reason.trim() || null,
      instructions: followUpForm.instructions.trim() || null,
      warning_signs: followUpForm.warning_signs.trim() || null,
      pending_studies: followUpForm.pending_studies.trim() || null,
      next_step: followUpForm.next_step.trim() || null,
      status: followUpForm.status || "pending",
    };

    let response;

    if (followUpForm.id) {
      response = await supabase
        .from("medical_follow_ups")
        .update(payload)
        .eq("id", followUpForm.id);
    } else {
      response = await supabase.from("medical_follow_ups").insert(payload);
    }

    setSavingFollowUp(false);

    if (response.error) {
      alert(response.error.message);
      return;
    }

    await fetchFollowUps(medicalNoteForm.id);
    setFollowUpForm(DEFAULT_FOLLOW_UP_FORM);
  }

  function openEditFollowUp(followUp) {
    setFollowUpForm({
      id: followUp.id,
      follow_up_date: followUp.follow_up_date
        ? new Date(followUp.follow_up_date).toISOString().slice(0, 16)
        : "",
      follow_up_reason: followUp.follow_up_reason || "",
      instructions: followUp.instructions || "",
      warning_signs: followUp.warning_signs || "",
      pending_studies: followUp.pending_studies || "",
      next_step: followUp.next_step || "",
      status: followUp.status || "pending",
    });
  }

  async function deleteFollowUp(id) {
    if (!isAdmin) {
      alert("Solo el administrador puede borrar seguimientos.");
      return;
    }

    const confirmed = window.confirm(
      "¿Seguro que quieres borrar este seguimiento?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("medical_follow_ups")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await fetchFollowUps(medicalNoteForm.id);
    setFollowUpForm(DEFAULT_FOLLOW_UP_FORM);
  }

  const profilePhotos = documents.filter(
    (d) => d.category === "foto_profesional"
  );
  const titleImages = documents.filter((d) => d.category === "titulo_academico");
  const diplomaImages = documents.filter(
    (d) => d.category === "diplomado_certificacion"
  );
  const clinicImages = documents.filter((d) => d.category === "foto_consultorio");
  const publicityImages = documents.filter((d) => d.category === "publicidad");

  const verifiedReviews = useMemo(
    () =>
      reviews.filter(
        (review) => (review.review_status || "pending") === "verified"
      ),
    [reviews]
  );

  const pendingReviews = useMemo(
    () =>
      reviews.filter(
        (review) => (review.review_status || "pending") === "pending"
      ),
    [reviews]
  );

  const rejectedReviews = useMemo(
    () =>
      reviews.filter(
        (review) => (review.review_status || "pending") === "rejected"
      ),
    [reviews]
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

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchFecha =
        appointmentFilters.fecha === "all" ||
        appointment.fecha_cita === appointmentFilters.fecha;

      const matchStatus =
        appointmentFilters.status === "all" ||
        appointment.status === appointmentFilters.status;

      const matchTipo =
        appointmentFilters.tipo === "all" ||
        appointment.tipo_consulta === appointmentFilters.tipo;

      return matchFecha && matchStatus && matchTipo;
    });
  }, [appointments, appointmentFilters]);

  const appointmentsToday = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return appointments.filter((appointment) => appointment.fecha_cita === today);
  }, [appointments]);

  const upcomingAppointments = useMemo(() => {
    const nowDate = new Date().toISOString().split("T")[0];
    return appointments.filter(
      (appointment) =>
        appointment.fecha_cita >= nowDate &&
        appointment.status !== "cancelled" &&
        appointment.status !== "completed"
    );
  }, [appointments]);

  const appointmentsHistory = useMemo(() => {
    return appointments.filter(
      (appointment) =>
        appointment.status === "completed" ||
        appointment.status === "cancelled" ||
        appointment.status === "no_show"
    );
  }, [appointments]);

  const patientsWithClinicalFile = useMemo(() => {
    return patients.filter((patient) => Boolean(patient.id));
  }, [patients]);

  const verifiedCount = verifiedReviews.length;
  const pendingCount = pendingReviews.length;
  const rejectedCount = rejectedReviews.length;

  const sidebarItems = useMemo(() => {
    const items = [
      {
        key: "dashboard",
        label: "Resumen",
        icon: <IconDashboard />,
        description: "Vista general del panel",
        group: "general",
      },
      {
        key: "agenda",
        label: "Citas",
        icon: <IconAgenda />,
        description: "Agenda, horarios y cambios",
        group: "operacion",
      },
      {
        key: "patients",
        label: "Pacientes",
        icon: <IconPatients />,
        description: "Listado, búsqueda, ficha y citas ligadas",
        group: "operacion",
      },
      {
        key: "expediente",
        label: "Expediente",
        icon: <IconExpediente />,
        description: "Historia clínica, vitales y notas",
        group: "clinico",
      },
      {
        key: "reviews",
        label: "Reseñas",
        icon: <IconReviews />,
        description: "Moderación y publicación",
        group: "operacion",
      },
      {
        key: "clinic",
        label: "Consultorio",
        icon: <IconClinic />,
        description: "Fotos del espacio médico",
        group: "contenido",
      },
      {
        key: "publicity",
        label: "Publicidad",
        icon: <IconPublicity />,
        description: "Banners y material visual",
        group: "contenido",
      },
    ];

    if (isAdmin) {
      items.splice(
        1,
        0,
        {
          key: "config",
          label: "Configuración",
          icon: <IconConfig />,
          description: "Textos, SEO y enlaces",
          group: "general",
        },
        {
          key: "profile",
          label: "Perfil del médico",
          icon: <IconProfile />,
          description: "Datos profesionales y contacto",
          group: "general",
        }
      );

      items.splice(
        3,
        0,
        {
          key: "services",
          label: "Servicios",
          icon: <IconServices />,
          description: "Oferta médica publicada",
          group: "operacion",
        },
        {
          key: "licenses",
          label: "Cédulas",
          icon: <IconLicenses />,
          description: "Números y grados académicos",
          group: "operacion",
        },
        {
          key: "credentials",
          label: "Credenciales",
          icon: <IconCredentials />,
          description: "Títulos y certificaciones",
          group: "operacion",
        }
      );
    }

    return items;
  }, [isAdmin]);

  const sidebarGroups = useMemo(() => {
    const orderedGroups = [
      {
        key: "general",
        label: "General",
      },
      {
        key: "operacion",
        label: "Operación",
      },
      {
        key: "contenido",
        label: "Contenido",
      },
      {
        key: "clinico",
        label: "Clínico",
      },
    ];

    return orderedGroups
      .map((group) => ({
        ...group,
        items: sidebarItems.filter((item) => item.group === group.key),
      }))
      .filter((group) => group.items.length > 0);
  }, [sidebarItems]);
    if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-50 px-6 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900">Panel privado</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Cargando sesión y permisos...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-50 px-6 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900">Acceso al panel</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Inicia sesión con tu cuenta autorizada para administrar la página médica.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <Label>Correo</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <Label>Contraseña</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>

            <PrimaryButton className="w-full" onClick={login}>
              Entrar
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-50 px-6 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900">Verificando permisos</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Estamos validando el rol de tu cuenta...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin && !isSecretary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-50 px-6 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-xl backdrop-blur">
          <h1 className="text-3xl font-bold text-slate-900">Sin permisos</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Tu cuenta no tiene acceso a este panel administrativo.
          </p>
          <div className="mt-6">
            <SecondaryButton onClick={logout}>Cerrar sesión</SecondaryButton>
          </div>
        </div>
      </div>
    );
  }

  const selectedPatient =
    patients.find((patient) => patient.id === selectedPatientId) || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-50">
      <div className="sticky top-0 z-30 border-b border-white/60 bg-white/80 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Panel privado
            </p>
            <h1 className="text-lg font-bold text-slate-900">
              Administración médica
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm"
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside
            className={`${
              sidebarOpen ? "block" : "hidden"
            } rounded-3xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur lg:block`}
          >
            <div className="border-b border-slate-200 pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Panel privado
              </p>
              <h1 className="mt-3 text-2xl font-bold text-slate-900">
                Administración médica
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Administra agenda, pacientes, expediente, reseñas, credenciales y
                contenido visual del sitio.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {sidebarGroups.map((group) => (
                <div key={group.key}>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {group.label}
                  </p>

                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <SidebarButton
                        key={item.key}
                        active={activeSection === item.key}
                        onClick={() => setActiveSection(item.key)}
                        icon={item.icon}
                        label={item.label}
                        description={item.description}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Divider />

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Sesión actual
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {session.user.email}
              </p>
              <div className="mt-3">
                <RoleBadge role={userRole} />
              </div>
              <div className="mt-4">
                <SecondaryButton onClick={logout}>Cerrar sesión</SecondaryButton>
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            {activeSection === "dashboard" ? (
              <Card
                title="Resumen del sistema"
                subtitle="Vista rápida de agenda, pacientes, expediente y reputación digital."
              >
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <InfoStat
                    label="Citas hoy"
                    value={appointmentsToday.length}
                    helper="Programadas para hoy"
                  />
                  <InfoStat
                    label="Próximas citas"
                    value={upcomingAppointments.length}
                    helper="Pendientes y confirmadas"
                  />
                  <InfoStat
                    label="Pacientes"
                    value={patients.length}
                    helper="Registros en el sistema"
                  />
                  <InfoStat
                    label="Reseñas verificadas"
                    value={verifiedCount}
                    helper="Publicadas"
                  />
                </div>
              </Card>
            ) : null}

            {activeSection === "agenda" && canManageAgenda ? (
              <Card
                title="Agenda"
                subtitle="Crear, editar, filtrar y relacionar citas con pacientes."
              >
                <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-slate-900">
                          {appointmentMode === "create" ? "Nueva cita" : "Editar cita"}
                        </h3>
                        {appointmentMode === "edit" ? (
                          <SecondaryButton onClick={() => resetAppointmentForm()}>
                            Nueva
                          </SecondaryButton>
                        ) : null}
                      </div>

                      <div className="mt-5 space-y-4">
                        <div>
                          <Label>Nombre del paciente</Label>
                          <Input
                            value={appointmentForm.nombre}
                            onChange={(e) =>
                              setAppointmentForm((prev) => ({
                                ...prev,
                                nombre: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label>Teléfono</Label>
                            <Input
                              value={appointmentForm.telefono}
                              onChange={(e) =>
                                setAppointmentForm((prev) => ({
                                  ...prev,
                                  telefono: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>Correo</Label>
                            <Input
                              type="email"
                              value={appointmentForm.correo}
                              onChange={(e) =>
                                setAppointmentForm((prev) => ({
                                  ...prev,
                                  correo: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label>Fecha de cita</Label>
                            <Input
                              type="date"
                              value={appointmentForm.fecha_cita}
                              onChange={(e) =>
                                setAppointmentForm((prev) => ({
                                  ...prev,
                                  fecha_cita: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>Hora</Label>
                            <Input
                              type="time"
                              value={appointmentForm.hora_cita}
                              onChange={(e) =>
                                setAppointmentForm((prev) => ({
                                  ...prev,
                                  hora_cita: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label>Tipo de consulta</Label>
                            <Select
                              value={appointmentForm.tipo_consulta}
                              onChange={(e) =>
                                setAppointmentForm((prev) => ({
                                  ...prev,
                                  tipo_consulta: e.target.value,
                                }))
                              }
                            >
                              <option value="presencial">Presencial</option>
                              <option value="online">En línea</option>
                            </Select>
                          </div>
                          <div>
                            <Label>Estatus</Label>
                            <Select
                              value={appointmentForm.status}
                              onChange={(e) =>
                                setAppointmentForm((prev) => ({
                                  ...prev,
                                  status: e.target.value,
                                }))
                              }
                            >
                              <option value="pending">Pendiente</option>
                              <option value="confirmed">Confirmada</option>
                              <option value="completed">Completada</option>
                              <option value="cancelled">Cancelada</option>
                              <option value="no_show">No asistió</option>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Nota administrativa</Label>
                          <Textarea
                            rows={4}
                            value={appointmentForm.notes_admin}
                            onChange={(e) =>
                              setAppointmentForm((prev) => ({
                                ...prev,
                                notes_admin: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <PrimaryButton
                            onClick={saveAppointmentForm}
                            disabled={savingAppointment}
                          >
                            {savingAppointment
                              ? "Guardando..."
                              : appointmentMode === "create"
                              ? "Guardar cita"
                              : "Actualizar cita"}
                          </PrimaryButton>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card
                      title="Citas registradas"
                      subtitle="Listado completo con edición y cancelación."
                    >
                      <div className="grid gap-4">
                        {filteredAppointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <p className="text-lg font-bold text-slate-900">
                                  {appointment.nombre || "Paciente sin nombre"}
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                  {formatDateTime(
                                    appointment.fecha_cita,
                                    appointment.hora_cita
                                  )}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <SecondaryButton
                                  onClick={() => openEditAppointment(appointment)}
                                >
                                  Editar
                                </SecondaryButton>
                                <DangerButton
                                  onClick={() => cancelAppointment(appointment)}
                                >
                                  Cancelar
                                </DangerButton>
                              </div>
                            </div>
                          </div>
                        ))}

                        {!filteredAppointments.length ? (
                          <EmptyState
                            title="No hay citas para mostrar"
                            description="Ajusta filtros o crea la primera cita."
                          />
                        ) : null}
                      </div>
                    </Card>
                  </div>
                </div>
              </Card>
            ) : null}

            {(activeSection === "patients" || activeSection === "expediente") &&
            canViewClinicalFile ? (
              <Card
                title={
                  activeSection === "patients"
                    ? "Pacientes"
                    : "Expediente clínico"
                }
                subtitle={
                  activeSection === "patients"
                    ? "Listado general, buscador, ficha individual y acceso al expediente."
                    : "Historia clínica, signos vitales, nota médica, diagnósticos, tratamientos y seguimiento."
                }
              >
                <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
                  <div className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold text-slate-900">
                          {patientMode === "create"
                            ? "Nuevo paciente"
                            : "Ficha de identificación"}
                        </h3>
                        <div className="flex gap-2">
                          <SecondaryButton onClick={() => openCreatePatient()}>
                            Nuevo
                          </SecondaryButton>
                          <SecondaryButton onClick={resetPatientForm}>
                            Limpiar
                          </SecondaryButton>
                        </div>
                      </div>

                      <div className="mt-5 space-y-4">
                        <div>
                          <Label>Nombre completo</Label>
                          <Input
                            value={patientForm.nombre}
                            onChange={(e) =>
                              setPatientForm((prev) => ({
                                ...prev,
                                nombre: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label>Teléfono</Label>
                            <Input
                              value={patientForm.telefono}
                              onChange={(e) =>
                                setPatientForm((prev) => ({
                                  ...prev,
                                  telefono: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>Correo</Label>
                            <Input
                              type="email"
                              value={patientForm.correo}
                              onChange={(e) =>
                                setPatientForm((prev) => ({
                                  ...prev,
                                  correo: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label>Fecha de nacimiento</Label>
                            <Input
                              type="date"
                              value={patientForm.fecha_nacimiento}
                              onChange={(e) =>
                                setPatientForm((prev) => ({
                                  ...prev,
                                  fecha_nacimiento: e.target.value,
                                  edad: e.target.value
                                    ? calculateAgeFromBirthDate(e.target.value)
                                    : prev.edad,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label>Edad</Label>
                            <Input
                              type="number"
                              value={patientForm.edad}
                              onChange={(e) =>
                                setPatientForm((prev) => ({
                                  ...prev,
                                  edad: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label>Sexo</Label>
                            <Select
                              value={patientForm.sexo}
                              onChange={(e) =>
                                setPatientForm((prev) => ({
                                  ...prev,
                                  sexo: e.target.value,
                                }))
                              }
                            >
                              <option value="">Selecciona</option>
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                              <option value="Otro">Otro</option>
                            </Select>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <PrimaryButton
                            onClick={savePatientForm}
                            disabled={savingPatient}
                          >
                            {savingPatient
                              ? "Guardando..."
                              : patientMode === "create"
                              ? "Guardar paciente"
                              : "Actualizar paciente"}
                          </PrimaryButton>

                          {selectedPatientId ? (
                            <SecondaryButton
                              onClick={() => setActiveSection("expediente")}
                            >
                              Abrir expediente
                            </SecondaryButton>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <Card
                      title="Listado general de pacientes"
                      subtitle="Busca por nombre, teléfono o correo."
                    >
                      <div className="flex flex-col gap-3 md:flex-row">
                        <Input
                          placeholder="Buscar por nombre, teléfono o correo"
                          value={patientsSearch}
                          onChange={(e) => setPatientsSearch(e.target.value)}
                        />
                        <SecondaryButton onClick={() => fetchPatients()}>
                          Buscar
                        </SecondaryButton>
                      </div>

                      <div className="mt-5 grid gap-4">
                        {patients.map((patient) => (
                          <div
                            key={patient.id}
                            className={`rounded-2xl border p-5 transition ${
                              selectedPatientId === patient.id
                                ? "border-slate-900 bg-slate-900 text-white shadow-lg"
                                : "border-slate-200 bg-slate-50 text-slate-900"
                            }`}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div className="min-w-0">
                                <p className="text-lg font-bold">
                                  {patient.nombre || "Sin nombre"}
                                </p>
                                <div
                                  className={`mt-3 grid gap-2 text-sm ${
                                    selectedPatientId === patient.id
                                      ? "text-slate-200"
                                      : "text-slate-500"
                                  }`}
                                >
                                  <p>Teléfono: {patient.telefono || "—"}</p>
                                  <p>Correo: {patient.correo || "—"}</p>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <SecondaryButton onClick={() => openEditPatient(patient)}>
                                  Ver paciente
                                </SecondaryButton>
                                <SecondaryButton
                                  onClick={() => {
                                    openEditPatient(patient);
                                    setActiveSection("expediente");
                                  }}
                                >
                                  Expediente
                                </SecondaryButton>
                              </div>
                            </div>
                          </div>
                        ))}

                        {!patients.length ? (
                          <EmptyState
                            title="No hay pacientes registrados"
                            description="Puedes crearlos desde este módulo o desde agenda."
                          />
                        ) : null}
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    {activeSection === "patients" ? (
                      <Card
                        title="Citas ligadas al paciente"
                        subtitle={
                          selectedPatient
                            ? `Historial vinculado del paciente ${selectedPatient.nombre || ""}`
                            : "Selecciona o guarda un paciente para ver su historial."
                        }
                      >
                        {!selectedPatientId ? (
                          <EmptyState
                            title="Sin paciente seleccionado"
                            description="Elige un paciente del listado o guarda uno nuevo."
                          />
                        ) : (
                          <div className="grid gap-4">
                            {selectedPatientAppointments.map((appointment) => (
                              <div
                                key={appointment.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                              >
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                  <div>
                                    <p className="text-lg font-bold text-slate-900">
                                      {formatDateTime(
                                        appointment.fecha_cita,
                                        appointment.hora_cita
                                      )}
                                    </p>
                                    <p className="mt-2 text-sm text-slate-500">
                                      Tipo: {appointment.tipo_consulta || "—"}
                                    </p>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    <SecondaryButton
                                      onClick={() => openEditAppointment(appointment)}
                                    >
                                      Editar cita
                                    </SecondaryButton>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {!selectedPatientAppointments.length ? (
                              <EmptyState
                                title="Sin citas ligadas"
                                description="Este paciente todavía no tiene consultas vinculadas."
                              />
                            ) : null}
                          </div>
                        )}
                      </Card>
                    ) : null}

                    {activeSection === "expediente" ? (
                      <Card
                        title="Expediente clínico"
                        subtitle={
                          selectedPatient
                            ? `Paciente: ${selectedPatient.nombre || ""}`
                            : "Selecciona un paciente para trabajar el expediente."
                        }
                      >
                        {!selectedPatientId ? (
                          <EmptyState
                            title="Sin paciente seleccionado"
                            description="Abre un paciente desde el listado para trabajar su expediente."
                          />
                        ) : !clinicalFile ? (
                          <EmptyState
                            title="Sin expediente disponible"
                            description="Guarda o vuelve a abrir el paciente para cargar su expediente."
                          />
                        ) : (
                          <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setActiveClinicalTab("historia")}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                                  activeClinicalTab === "historia"
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-300 bg-white text-slate-700"
                                }`}
                              >
                                <IconFileText />
                                Historia clínica
                              </button>

                              <button
                                type="button"
                                onClick={() => setActiveClinicalTab("vitales")}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                                  activeClinicalTab === "vitales"
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-300 bg-white text-slate-700"
                                }`}
                              >
                                <IconHeartbeat />
                                Signos vitales
                              </button>

                              <button
                                type="button"
                                onClick={() => setActiveClinicalTab("nota")}
                                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                                  activeClinicalTab === "nota"
                                    ? "border-slate-900 bg-slate-900 text-white"
                                    : "border-slate-300 bg-white text-slate-700"
                                }`}
                              >
                                <IconClipboard />
                                Nota médica
                              </button>
                            </div>

                            {activeClinicalTab === "historia" ? (
                              <div className="space-y-4">
                                <div>
                                  <Label>Motivo de consulta</Label>
                                  <Textarea
                                    rows={3}
                                    value={clinicalHistory.motivo_consulta}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        motivo_consulta: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Padecimiento actual</Label>
                                  <Textarea
                                    rows={4}
                                    value={clinicalHistory.padecimiento_actual}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        padecimiento_actual: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Antecedentes heredofamiliares</Label>
                                  <Textarea
                                    rows={4}
                                    value={clinicalHistory.antecedentes_heredofamiliares}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        antecedentes_heredofamiliares: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Antecedentes personales no patológicos</Label>
                                  <Textarea
                                    rows={4}
                                    value={clinicalHistory.antecedentes_personales_no_patologicos}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        antecedentes_personales_no_patologicos:
                                          e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Antecedentes personales patológicos</Label>
                                  <Textarea
                                    rows={4}
                                    value={clinicalHistory.antecedentes_personales_patologicos}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        antecedentes_personales_patologicos:
                                          e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Alergias</Label>
                                  <Textarea
                                    rows={4}
                                    value={clinicalHistory.alergias}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        alergias: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Medicamentos actuales</Label>
                                  <Textarea
                                    rows={4}
                                    value={clinicalHistory.medicamentos_actuales}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        medicamentos_actuales: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Interrogatorio por aparatos y sistemas</Label>
                                  <Textarea
                                    rows={5}
                                    value={clinicalHistory.interrogatorio_aparatos_sistemas}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        interrogatorio_aparatos_sistemas:
                                          e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div>
                                  <Label>Exploración física general</Label>
                                  <Textarea
                                    rows={5}
                                    value={clinicalHistory.exploracion_fisica_general}
                                    onChange={(e) =>
                                      setClinicalHistory((prev) => ({
                                        ...prev,
                                        exploracion_fisica_general: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div className="flex justify-end">
                                  <PrimaryButton
                                    onClick={saveClinicalHistory}
                                    disabled={savingClinicalHistory || !canEditClinicalHistory}
                                  >
                                    {savingClinicalHistory
                                      ? "Guardando..."
                                      : "Guardar historia clínica"}
                                  </PrimaryButton>
                                </div>
                              </div>
                            ) : null}

                            {activeClinicalTab === "vitales" ? (
                              <div className="space-y-6">
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                  <div className="grid gap-4 md:grid-cols-3">
                                    <div>
                                      <Label>Fecha y hora</Label>
                                      <Input
                                        type="datetime-local"
                                        value={vitalForm.taken_at}
                                        onChange={(e) =>
                                          setVitalForm((prev) => ({
                                            ...prev,
                                            taken_at: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>Peso (kg)</Label>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={vitalForm.peso_kg}
                                        onChange={(e) =>
                                          setVitalForm((prev) => ({
                                            ...prev,
                                            peso_kg: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>Talla (cm)</Label>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        value={vitalForm.talla_cm}
                                        onChange={(e) =>
                                          setVitalForm((prev) => ({
                                            ...prev,
                                            talla_cm: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>IMC</Label>
                                      <Input
                                        value={vitalForm.imc}
                                        onChange={(e) =>
                                          setVitalForm((prev) => ({
                                            ...prev,
                                            imc: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>Temperatura °C</Label>
                                      <Input
                                        type="number"
                                        step="0.1"
                                        value={vitalForm.temperatura_c}
                                        onChange={(e) =>
                                          setVitalForm((prev) => ({
                                            ...prev,
                                            temperatura_c: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                    <div>
                                      <Label>Frecuencia cardíaca</Label>
                                      <Input
                                        type="number"
                                        value={vitalForm.frecuencia_cardiaca}
                                        onChange={(e) =>
                                          setVitalForm((prev) => ({
                                            ...prev,
                                            frecuencia_cardiaca: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="mt-5 flex flex-wrap gap-3">
                                    <PrimaryButton
                                      onClick={saveVitalForm}
                                      disabled={savingVitalSigns || !canEditVitalSigns}
                                    >
                                      {savingVitalSigns
                                        ? "Guardando..."
                                        : vitalMode === "create"
                                        ? "Guardar signos vitales"
                                        : "Actualizar signos vitales"}
                                    </PrimaryButton>
                                  </div>
                                </div>

                                <div className="grid gap-4">
                                  {vitalSigns.map((vital) => (
                                    <div
                                      key={vital.id}
                                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                    >
                                      <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                          <p className="text-lg font-bold text-slate-900">
                                            {formatDateTimeStamp(vital.taken_at)}
                                          </p>
                                          <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                                            <p>Peso: {vital.peso_kg ?? "—"} kg</p>
                                            <p>Talla: {vital.talla_cm ?? "—"} cm</p>
                                            <p>IMC: {vital.imc ?? "—"}</p>
                                            <p>Temp: {vital.temperatura_c ?? "—"} °C</p>
                                          </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                          <SecondaryButton onClick={() => openEditVital(vital)}>
                                            Editar
                                          </SecondaryButton>
                                          {isAdmin ? (
                                            <DangerButton onClick={() => deleteVital(vital.id)}>
                                              Borrar
                                            </DangerButton>
                                          ) : null}
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  {!vitalSigns.length ? (
                                    <EmptyState
                                      title="Sin signos vitales registrados"
                                      description="Aquí aparecerán los parámetros capturados."
                                    />
                                  ) : null}
                                </div>
                              </div>
                            ) : null}

                            {activeClinicalTab === "nota" ? (
                              <div className="space-y-6">
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                      <Label>Tipo de nota</Label>
                                      <Select
                                        value={medicalNoteForm.note_type}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            note_type: e.target.value,
                                          }))
                                        }
                                      >
                                        <option value="consulta_general">Consulta general</option>
                                        <option value="primera_vez">Primera vez</option>
                                        <option value="subsecuente">Subsecuente</option>
                                        <option value="urgencias">Urgencias</option>
                                        <option value="evolucion">Evolución</option>
                                      </Select>
                                    </div>

                                    <div>
                                      <Label>Fecha y hora</Label>
                                      <Input
                                        type="datetime-local"
                                        value={medicalNoteForm.note_date}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            note_date: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="md:col-span-2">
                                      <Label>Motivo de consulta</Label>
                                      <Textarea
                                        rows={3}
                                        value={medicalNoteForm.motivo_consulta}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            motivo_consulta: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="md:col-span-2">
                                      <Label>Padecimiento actual</Label>
                                      <Textarea
                                        rows={4}
                                        value={medicalNoteForm.padecimiento_actual}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            padecimiento_actual: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div>
                                      <Label>Subjetivo</Label>
                                      <Textarea
                                        rows={4}
                                        value={medicalNoteForm.subjetivo}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            subjetivo: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div>
                                      <Label>Objetivo</Label>
                                      <Textarea
                                        rows={4}
                                        value={medicalNoteForm.objetivo}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            objetivo: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="md:col-span-2">
                                      <Label>Exploración física</Label>
                                      <Textarea
                                        rows={4}
                                        value={medicalNoteForm.exploracion_fisica}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            exploracion_fisica: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="md:col-span-2">
                                      <Label>Impresión diagnóstica</Label>
                                      <Textarea
                                        rows={4}
                                        value={medicalNoteForm.impresion_diagnostica}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            impresion_diagnostica: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="md:col-span-2">
                                      <Label>Indicaciones</Label>
                                      <Textarea
                                        rows={4}
                                        value={medicalNoteForm.indicaciones}
                                        onChange={(e) =>
                                          setMedicalNoteForm((prev) => ({
                                            ...prev,
                                            indicaciones: e.target.value,
                                          }))
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="mt-5 flex flex-wrap gap-3">
                                    <PrimaryButton
                                      onClick={() => saveMedicalNoteForm(false)}
                                      disabled={savingMedicalNote || !canEditMedicalNotes}
                                    >
                                      {savingMedicalNote ? "Guardando..." : "Guardar nota"}
                                    </PrimaryButton>

                                    <SecondaryButton
                                      onClick={() => saveMedicalNoteForm(true)}
                                      disabled={savingMedicalNote || !canEditMedicalNotes}
                                    >
                                      Cerrar consulta
                                    </SecondaryButton>
                                  </div>
                                </div>

                                <Card
                                  title="Notas médicas previas"
                                  subtitle="Historial cronológico de evolución y consultas."
                                >
                                  <div className="grid gap-4">
                                    {medicalNotes.map((note) => (
                                      <div
                                        key={note.id}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                                      >
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                          <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                              <p className="text-lg font-bold text-slate-900">
                                                {formatDateTimeStamp(note.note_date)}
                                              </p>
                                              <StatusBadge
                                                tone={
                                                  note.consultation_status === "closed"
                                                    ? "success"
                                                    : "warning"
                                                }
                                              >
                                                {note.consultation_status === "closed"
                                                  ? "Cerrada"
                                                  : "Abierta"}
                                              </StatusBadge>
                                            </div>
                                          </div>

                                          <div className="flex flex-wrap gap-2">
                                            <SecondaryButton
                                              onClick={() => openEditMedicalNote(note)}
                                            >
                                              Editar nota
                                            </SecondaryButton>
                                            {isAdmin ? (
                                              <DangerButton
                                                onClick={() => deleteMedicalNote(note.id)}
                                              >
                                                Borrar
                                              </DangerButton>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    ))}

                                    {!medicalNotes.length ? (
                                      <EmptyState
                                        title="Sin notas médicas"
                                        description="Crea la primera nota médica para registrar evolución."
                                      />
                                    ) : null}
                                  </div>
                                </Card>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </Card>
                    ) : null}
                  </div>
                </div>
              </Card>
            ) : null}

            {activeSection === "reviews" && canManageReviews ? (
              <Card
                title="Reseñas"
                subtitle="Moderación, edición y publicación."
              >
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <div>
                          <Label>Paciente</Label>
                          <Input
                            value={review.patient_name || ""}
                            onChange={(e) =>
                              updateReview(review.id, "patient_name", e.target.value)
                            }
                          />
                        </div>

                        <div className="xl:col-span-2">
                          <Label>Texto</Label>
                          <Textarea
                            rows={3}
                            value={review.review_text || ""}
                            onChange={(e) =>
                              updateReview(review.id, "review_text", e.target.value)
                            }
                          />
                        </div>

                        <div>
                          <Label>Calificación</Label>
                          <Select
                            value={String(review.rating || 5)}
                            onChange={(e) =>
                              updateReview(review.id, "rating", Number(e.target.value))
                            }
                          >
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Estatus</Label>
                          <Select
                            value={review.review_status || "pending"}
                            onChange={(e) =>
                              updateReview(review.id, "review_status", e.target.value)
                            }
                          >
                            <option value="pending">Pendiente</option>
                            <option value="verified">Verificada</option>
                            <option value="rejected">Rechazada</option>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <PrimaryButton onClick={() => saveReview(review)}>
                          Guardar cambios
                        </PrimaryButton>
                        <DangerButton
                          onClick={() => deleteReviewPermanently(review.id)}
                        >
                          Borrar
                        </DangerButton>
                      </div>
                    </div>
                  ))}

                  {!reviews.length ? (
                    <EmptyState
                      title="No hay reseñas registradas"
                      description="Aquí podrás moderar y publicar la prueba social del sitio."
                    />
                  ) : null}
                </div>
              </Card>
            ) : null}

            {activeSection === "clinic" && canManageClinicImages ? (
              <Card
                title="Consultorio"
                subtitle="Fotos del espacio médico."
              >
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <Label>Subir imagen del consultorio</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setClinicFile(e.target.files?.[0] || null)}
                  />
                  <div className="mt-4">
                    <PrimaryButton
                      onClick={() => uploadImage(clinicFile, "foto_consultorio")}
                    >
                      Subir imagen
                    </PrimaryButton>
                  </div>
                </div>

                <Divider />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {clinicImages.map((doc) => (
                    <div
                      key={doc.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <img
                        src={doc.file_url}
                        alt="Consultorio"
                        className="h-52 w-full rounded-2xl object-cover"
                      />
                      <div className="mt-4">
                        <DangerButton onClick={() => deleteImage(doc.id, doc.file_url)}>
                          Borrar
                        </DangerButton>
                      </div>
                    </div>
                  ))}

                  {!clinicImages.length ? (
                    <EmptyState
                      title="Sin imágenes del consultorio"
                      description="Sube fotos para reforzar confianza y contexto visual."
                    />
                  ) : null}
                </div>
              </Card>
            ) : null}

            {activeSection === "publicity" && canManagePublicity ? (
              <Card
                title="Publicidad"
                subtitle="Banners, creativos y material gráfico."
              >
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <Label>Subir imagen de publicidad</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPublicityFile(e.target.files?.[0] || null)}
                  />
                  <div className="mt-4">
                    <PrimaryButton
                      onClick={() => uploadImage(publicityFile, "publicidad")}
                    >
                      Subir imagen
                    </PrimaryButton>
                  </div>
                </div>

                <Divider />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {publicityImages.map((doc) => (
                    <div
                      key={doc.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <img
                        src={doc.file_url}
                        alt="Publicidad"
                        className="h-52 w-full rounded-2xl object-cover"
                      />
                      <div className="mt-4">
                        <DangerButton onClick={() => deleteImage(doc.id, doc.file_url)}>
                          Borrar
                        </DangerButton>
                      </div>
                    </div>
                  ))}

                  {!publicityImages.length ? (
                    <EmptyState
                      title="Sin material publicitario"
                      description="Sube recursos gráficos para campañas y presencia visual."
                    />
                  ) : null}
                </div>
              </Card>
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}