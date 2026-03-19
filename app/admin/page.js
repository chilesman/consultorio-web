"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase";

export default function AdminPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });

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

  const [licenses, setLicenses] = useState([]);
  const [newLicense, setNewLicense] = useState({
    label: "",
    license_number: "",
  });

  const [documents, setDocuments] = useState([]);

  const [titleFile, setTitleFile] = useState(null);
  const [diplomaFile, setDiplomaFile] = useState(null);
  const [clinicFile, setClinicFile] = useState(null);
  const [publicityFile, setPublicityFile] = useState(null);

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        await Promise.all([
          fetchServices(),
          fetchProfile(),
          fetchLicenses(),
          fetchDocuments(),
        ]);
      }
    }

    getSession();
  }, []);

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error al iniciar sesión");
      return;
    }

    if (data?.session) {
      setSession(data.session);
      window.location.reload();
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    window.location.reload();
  }

  async function fetchServices() {
    setLoading(true);

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Error cargando servicios");
    } else {
      setServices(data || []);
    }

    setLoading(false);
  }

  async function fetchProfile() {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .limit(1)
      .single();

    if (error) {
      console.error(error);
      alert("Error cargando perfil");
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
      console.error(error);
      alert("Error cargando cédulas");
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
      console.error(error);
      alert("Error cargando imágenes");
    } else {
      setDocuments(data || []);
    }
  }

  async function updateService(id, field, value) {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  }

  async function saveService(service) {
    const { error } = await supabase
      .from("services")
      .update({
        name: service.name,
        description: service.description,
        price: Number(service.price),
      })
      .eq("id", service.id);

    if (error) {
      console.error(error);
      alert("Error al guardar cambios");
    } else {
      alert("Servicio actualizado");
    }
  }

  async function addService() {
    if (!newService.name || !newService.price) {
      alert("Completa al menos nombre y precio");
      return;
    }

    const { error } = await supabase.from("services").insert([
      {
        name: newService.name,
        description: newService.description,
        price: Number(newService.price),
      },
    ]);

    if (error) {
      console.error(error);
      alert("Error al agregar servicio");
    } else {
      alert("Servicio agregado");
      setNewService({ name: "", description: "", price: "" });
      fetchServices();
    }
  }

  async function deleteService(id) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este servicio?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Error al eliminar servicio");
    } else {
      alert("Servicio eliminado");
      fetchServices();
    }
  }

  async function saveProfile() {
    if (!profile.id) {
      alert("No se encontró el perfil");
      return;
    }

    const { error } = await supabase
      .from("profile")
      .update({
        doctor_name: profile.doctor_name,
        bio: profile.bio,
        university: profile.university,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        schedule: profile.schedule,
      })
      .eq("id", profile.id);

    if (error) {
      console.error(error);
      alert("Error al guardar perfil");
    } else {
      alert("Perfil actualizado");
    }
  }

  async function addLicense() {
    if (!newLicense.label || !newLicense.license_number) {
      alert("Completa tipo y número de cédula");
      return;
    }

    const { error } = await supabase.from("licenses").insert([newLicense]);

    if (error) {
      console.error(error);
      alert("Error al agregar cédula");
    } else {
      alert("Cédula agregada");
      setNewLicense({ label: "", license_number: "" });
      fetchLicenses();
    }
  }

  async function updateLicense(id, field, value) {
    setLicenses((prev) =>
      prev.map((license) =>
        license.id === id ? { ...license, [field]: value } : license
      )
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
      console.error(error);
      alert("Error al guardar cédula");
    } else {
      alert("Cédula actualizada");
      fetchLicenses();
    }
  }

  async function deleteLicense(id) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta cédula?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("licenses").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Error al eliminar cédula");
    } else {
      alert("Cédula eliminada");
      fetchLicenses();
    }
  }

  async function uploadImage(file, category) {
    if (!file) {
      alert("Selecciona una imagen");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;
    const filePath = `${category}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      alert("Error al subir imagen");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase.from("documents").insert([
      {
        category,
        file_url: publicUrl,
      },
    ]);

    if (dbError) {
      console.error(dbError);
      alert("Imagen subida pero error al guardar en base de datos");
      return;
    }

    alert("Imagen subida correctamente");
    fetchDocuments();
  }

  async function deleteDocument(id, fileUrl) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar esta imagen?"
    );

    if (!confirmDelete) return;

    const pathPart = fileUrl.split("/storage/v1/object/public/documents/")[1];

    if (pathPart) {
      await supabase.storage.from("documents").remove([pathPart]);
    }

    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Error al eliminar imagen");
    } else {
      alert("Imagen eliminada");
      fetchDocuments();
    }
  }

  const titleImages = documents.filter((d) => d.category === "titulo_academico");
  const diplomaImages = documents.filter(
    (d) => d.category === "diplomado_certificacion"
  );
  const clinicImages = documents.filter((d) => d.category === "foto_consultorio");
  const publicityImages = documents.filter((d) => d.category === "publicidad");

  function ImageSection({ title, files, category, fileStateSetter }) {
    return (
      <div className="mt-10 bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-bold">{title}</h2>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
          <input
            type="file"
            className="border p-3 rounded-lg"
            onChange={(e) => fileStateSetter(e.target.files[0])}
          />
          <button
            onClick={() => {
              if (category === "titulo_academico") uploadImage(titleFile, category);
              if (category === "diplomado_certificacion") uploadImage(diplomaFile, category);
              if (category === "foto_consultorio") uploadImage(clinicFile, category);
              if (category === "publicidad") uploadImage(publicityFile, category);
            }}
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            Subir imagen
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {files.map((doc) => (
            <div key={doc.id} className="overflow-hidden rounded-xl border bg-slate-50">
              <img
                src={doc.file_url}
                alt={title}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  Ver imagen
                </a>
                <button
                  onClick={() => deleteDocument(doc.id, doc.file_url)}
                  className="ml-4 text-sm text-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-md mx-auto p-10">
        <h1 className="text-2xl font-bold">Panel de administrador</h1>
        <p className="mt-2 text-gray-600">
          Inicia sesión para administrar tu sitio.
        </p>

        <input
          type="email"
          placeholder="Correo"
          className="border p-3 w-full mt-6 rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-3 w-full mt-4 rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white px-4 py-3 mt-4 w-full rounded-lg"
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Administrador</h1>
          <p className="text-gray-600 mt-2">
            Edita perfil, cédulas, servicios e imágenes sin tocar código.
          </p>
        </div>

        <button
          onClick={logout}
          className="border px-4 py-2 rounded-lg text-red-600"
        >
          Cerrar sesión
        </button>
      </div>

      {/* PERFIL */}
      <div className="mt-10 bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-bold">Perfil profesional y contacto</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="Nombre del médico"
            className="border p-3 rounded-lg"
            value={profile.doctor_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, doctor_name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Universidad"
            className="border p-3 rounded-lg"
            value={profile.university || ""}
            onChange={(e) =>
              setProfile({ ...profile, university: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Teléfono"
            className="border p-3 rounded-lg"
            value={profile.phone || ""}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Correo"
            className="border p-3 rounded-lg"
            value={profile.email || ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Horario"
            className="border p-3 rounded-lg"
            value={profile.schedule || ""}
            onChange={(e) =>
              setProfile({ ...profile, schedule: e.target.value })
            }
          />
        </div>

        <textarea
          placeholder="Semblanza profesional"
          className="border p-3 rounded-lg w-full mt-4 min-h-28"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />

        <textarea
          placeholder="Dirección"
          className="border p-3 rounded-lg w-full mt-4 min-h-24"
          value={profile.address || ""}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
        />

        <button
          onClick={saveProfile}
          className="bg-blue-600 text-white px-5 py-3 mt-4 rounded-lg"
        >
          Guardar perfil
        </button>
      </div>

      {/* CÉDULAS */}
      <div className="mt-10 bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-bold">Cédulas profesionales</h2>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="Tipo (Licenciatura, Especialidad, Maestría 1...)"
            className="border p-3 rounded-lg"
            value={newLicense.label}
            onChange={(e) =>
              setNewLicense({ ...newLicense, label: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Número de cédula"
            className="border p-3 rounded-lg"
            value={newLicense.license_number}
            onChange={(e) =>
              setNewLicense({
                ...newLicense,
                license_number: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={addLicense}
          className="bg-green-600 text-white px-5 py-3 mt-4 rounded-lg"
        >
          Agregar cédula
        </button>

        <div className="mt-8 space-y-4">
          {licenses.map((license) => (
            <div
              key={license.id}
              className="bg-slate-50 border rounded-xl p-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="border p-3 rounded-lg"
                  value={license.label || ""}
                  onChange={(e) =>
                    updateLicense(license.id, "label", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="border p-3 rounded-lg"
                  value={license.license_number || ""}
                  onChange={(e) =>
                    updateLicense(license.id, "license_number", e.target.value)
                  }
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => saveLicense(license)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Guardar
                </button>

                <button
                  onClick={() => deleteLicense(license.id)}
                  className="border border-red-600 text-red-600 px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageSection
        title="Títulos académicos"
        files={titleImages}
        category="titulo_academico"
        fileStateSetter={setTitleFile}
      />

      <ImageSection
        title="Diplomados / certificaciones"
        files={diplomaImages}
        category="diplomado_certificacion"
        fileStateSetter={setDiplomaFile}
      />

      <ImageSection
        title="Fotos del consultorio"
        files={clinicImages}
        category="foto_consultorio"
        fileStateSetter={setClinicFile}
      />

      <ImageSection
        title="Publicidad"
        files={publicityImages}
        category="publicidad"
        fileStateSetter={setPublicityFile}
      />

      {/* NUEVO SERVICIO */}
      <div className="mt-10 bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-bold">Agregar nuevo servicio</h2>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <input
            type="text"
            placeholder="Nombre del servicio"
            className="border p-3 rounded-lg"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Descripción"
            className="border p-3 rounded-lg"
            value={newService.description}
            onChange={(e) =>
              setNewService({ ...newService, description: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Precio"
            className="border p-3 rounded-lg"
            value={newService.price}
            onChange={(e) =>
              setNewService({ ...newService, price: e.target.value })
            }
          />
        </div>

        <button
          onClick={addService}
          className="bg-green-600 text-white px-5 py-3 mt-4 rounded-lg"
        >
          Agregar servicio
        </button>
      </div>

      {/* SERVICIOS */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Servicios actuales</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white border rounded-xl p-6 shadow"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    className="border p-3 rounded-lg"
                    value={service.name || ""}
                    onChange={(e) =>
                      updateService(service.id, "name", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    className="border p-3 rounded-lg"
                    value={service.description || ""}
                    onChange={(e) =>
                      updateService(service.id, "description", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="border p-3 rounded-lg"
                    value={service.price || ""}
                    onChange={(e) =>
                      updateService(service.id, "price", e.target.value)
                    }
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => saveService(service)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Guardar cambios
                  </button>

                  <button
                    onClick={() => deleteService(service.id)}
                    className="border border-red-600 text-red-600 px-4 py-2 rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}