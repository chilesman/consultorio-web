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

  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        fetchServices();
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

  if (!session) {
    return (
      <div className="max-w-md mx-auto p-10">
        <h1 className="text-2xl font-bold">Panel de administrador</h1>
        <p className="mt-2 text-gray-600">
          Inicia sesión para administrar servicios y precios.
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
            Aquí puedes editar precios y servicios sin modificar código.
          </p>
        </div>

        <button
          onClick={logout}
          className="border px-4 py-2 rounded-lg text-red-600"
        >
          Cerrar sesión
        </button>
      </div>

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