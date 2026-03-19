"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase";

export default function AdminPage() {
  const supabase = createClient();

  const [session, setSession] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [services, setServices] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [licenses, setLicenses] = useState([]);

  const [profile, setProfile] = useState({});

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [newLicense, setNewLicense] = useState({
    label: "",
    license_number: "",
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

  // -------- SERVICES --------

  async function fetchServices() {
    const { data } = await supabase.from("services").select("*");
    setServices(data || []);
  }

  async function addService() {
    const { error } = await supabase.from("services").insert([
      {
        ...newService,
        price: Number(newService.price),
      },
    ]);

    if (!error) {
      setNewService({ name: "", description: "", price: "" });
      fetchServices();
    }
  }

  async function updateService(id, field, value) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  async function saveService(service) {
    await supabase
      .from("services")
      .update(service)
      .eq("id", service.id);

    fetchServices();
  }

  async function deleteService(id) {
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  }

  // -------- PROFILE --------

  async function fetchProfile() {
    const { data } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .single();

    if (data) setProfile(data);
  }

  async function saveProfile() {
    await supabase
      .from("profile")
      .update(profile)
      .eq("id", profile.id);

    alert("Perfil actualizado");
  }

  // -------- LICENSES --------

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
      alert("Completa los campos");
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
    await supabase.from("licenses").delete().eq("id", id);
    fetchLicenses();
  }

  function updateLicense(id, field, value) {
    setLicenses((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  }

  // -------- IMAGES --------

  async function fetchDocuments() {
    const { data } = await supabase.from("documents").select("*");
    setDocuments(data || []);
  }

  async function upload(file, category) {
    if (!file) return;

    const name = `${Date.now()}-${file.name}`;

    await supabase.storage.from("documents").upload(name, file);

    const { data } = supabase.storage
      .from("documents")
      .getPublicUrl(name);

    await supabase.from("documents").insert([
      {
        category,
        file_url: data.publicUrl,
      },
    ]);

    fetchDocuments();
  }

  async function deleteImage(id, url) {
    const path = url.split("/documents/")[1];

    await supabase.storage.from("documents").remove([path]);

    await supabase.from("documents").delete().eq("id", id);

    fetchDocuments();
  }

  const titles = documents.filter((d) => d.category === "titulo_academico");
  const diplomas = documents.filter(
    (d) => d.category === "diplomado_certificacion"
  );
  const clinic = documents.filter((d) => d.category === "foto_consultorio");
  const publicity = documents.filter((d) => d.category === "publicidad");

  // -------- UI --------

  if (!session) {
    return (
      <div className="p-10 max-w-md mx-auto">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          placeholder="Correo"
          className="border p-2 w-full mt-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full mt-4 p-2"
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-10">
      <button onClick={logout} className="text-red-600">
        Cerrar sesión
      </button>

      {/* PROFILE */}
      <div>
        <h2 className="font-bold">Perfil</h2>

        <input
          className="border p-2 w-full mt-2"
          value={profile.doctor_name || ""}
          onChange={(e) =>
            setProfile({ ...profile, doctor_name: e.target.value })
          }
        />

        <textarea
          className="border p-2 w-full mt-2"
          value={profile.bio || ""}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
        />

        <button onClick={saveProfile} className="bg-blue-600 text-white p-2 mt-2">
          Guardar
        </button>
      </div>

      {/* LICENSES */}
      <div>
        <h2 className="font-bold">Cédulas</h2>

        <input
          placeholder="Tipo"
          className="border p-2 mt-2"
          value={newLicense.label}
          onChange={(e) =>
            setNewLicense({ ...newLicense, label: e.target.value })
          }
        />

        <input
          placeholder="Número"
          className="border p-2 mt-2"
          value={newLicense.license_number}
          onChange={(e) =>
            setNewLicense({
              ...newLicense,
              license_number: e.target.value,
            })
          }
        />

        <button onClick={addLicense} className="bg-green-600 text-white p-2 mt-2">
          Agregar
        </button>

        {licenses.map((l) => (
          <div key={l.id} className="border p-2 mt-2">
            <input
              value={l.label}
              onChange={(e) =>
                updateLicense(l.id, "label", e.target.value)
              }
            />

            <input
              value={l.license_number}
              onChange={(e) =>
                updateLicense(l.id, "license_number", e.target.value)
              }
            />

            <button onClick={() => saveLicense(l)}>Guardar</button>
            <button onClick={() => deleteLicense(l.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {/* IMAGE SECTIONS */}
      {[
        ["Títulos", titles, setTitleFile, titleFile, "titulo_academico"],
        ["Diplomados", diplomas, setDiplomaFile, diplomaFile, "diplomado_certificacion"],
        ["Consultorio", clinic, setClinicFile, clinicFile, "foto_consultorio"],
        ["Publicidad", publicity, setPublicityFile, publicityFile, "publicidad"],
      ].map(([title, list, setter, file, category]) => (
        <div key={title}>
          <h2 className="font-bold">{title}</h2>

          <input type="file" onChange={(e) => setter(e.target.files[0])} />

          <button onClick={() => upload(file, category)}>Subir</button>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {list.map((img) => (
              <div key={img.id}>
                <img src={img.file_url} />
                <button onClick={() => deleteImage(img.id, img.file_url)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}