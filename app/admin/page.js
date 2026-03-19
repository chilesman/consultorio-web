"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase";

export default function AdminPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error al iniciar sesión");
    } else {
      alert("Login correcto");
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Admin Login</h1>

      <input
        type="email"
        placeholder="Correo"
        className="border p-2 w-full mt-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mt-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-blue-600 text-white px-4 py-2 mt-4 w-full"
      >
        Entrar
      </button>
    </div>
  );
}