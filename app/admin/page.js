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
    license: "",
    diplomas: "",
    postgraduate: "",
    phone: "",
    email: "",
    address: "",
    schedule: "",
  });

  const [documents, setDocuments] = useState([]);
  const [docTitle, setDocTitle] = useState("");
  const [docCategory, setDocCategory] = useState("");
  const [docFile, setDocFile] = useState(null);

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        fetchServices();
        fetchProfile();
        fetchDocuments();
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
      setServices(data);
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

  async function fetchDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      alert("Error cargando documentos");
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
        license: profile.license,
        diplomas: profile.diplomas,
        postgraduate: profile.postgraduate,
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

  async function uploadDocument() {
    if (!docTitle || !docCategory || !docFile) {
      alert("Completa título, categoría y archivo");
      return;
    }

    const fileExt = docFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `documents/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, docFile);

    if (uploadError) {
      console.error(uploadError);
      alert("Error al subir archivo");
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("documents")
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase.from("documents").insert([
      {
        title: docTitle,
        category: docCategory,
        file_url: publicUrl,
      },
    ]);

    if (dbError) {
      console.error(dbError);
      alert("Archivo subido pero error al guardar en base de datos");
      return;
    }

    alert("Documento subido correctamente");
    setDocTitle("");
    setDocCategory("");
    setDocFile(null);
    fetchDocuments();
  }

  async function deleteDocument(id, fileUrl) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este documento?"
    );

    if (!confirmDelete) return;

    const pathPart = fileUrl.split("/storage/v1/object/public/documents/")[1];

    if (pathPart) {
      await supabase.storage.from("documents").remove([pathPart]);
    }

    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Error al eliminar documento");
    } else {
      alert("Documento eliminado");
      fetchDocuments();
    }
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
            Aquí puedes editar tu perfil, servicios y documentos sin tocar código.
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
            placeholder="Cédula profesional"
            className="border p-3 rounded-lg"
            value={profile.license || ""}
            onChange={(e) =>
              setProfile({ ...profile, license: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Diplomados"
            className="border p-3 rounded-lg"
            value={profile.diplomas || ""}
            onChange={(e) =>
              setProfile({ ...profile, diplomas: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Posgrados"
            className="border p-3 rounded-lg"
            value={profile.postgraduate || ""}
            onChange={(e) =>
              setProfile({ ...profile, postgraduate: e.target.value })
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

      {/* DOCUMENTOS */}
      <div className="mt-10 bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-bold">Subir documentos e imágenes</h2>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <input
            type="text"
            placeholder="Título del documento"
            className="border p-3 rounded-lg"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Categoría (titulo, cedula, diplomado, posgrado, foto)"
            className="border p-3 rounded-lg"
            value={docCategory}
            onChange={(e) => setDocCategory(e.target.value)}
          />

          <input
            type="file"
            className="border p-3 rounded-lg"
            onChange={(e) => setDocFile(e.target.files[0])}
          />
        </div>

        <button
          onClick={uploadDocument}
          className="bg-green-600 text-white px-5 py-3 mt-4 rounded-lg"
        >
          Subir documento
        </button>

        <div className="mt-8 space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{doc.title}</p>
                <p className="text-sm text-gray-500">{doc.category}</p>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm"
                >
                  Ver archivo
                </a>
              </div>

              <button
                onClick={() => deleteDocument(doc.id, doc.file_url)}
                className="border border-red-600 text-red-600 px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

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