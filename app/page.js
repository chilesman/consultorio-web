import { useState } from "react";

export default function Page() {

  const [services, setServices] = useState([
    { name: "Consulta médica", price: 500 },
    { name: "Vacunación", price: 300 },
    { name: "Electrocardiograma", price: 400 }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="bg-white border-b p-4 flex justify-between">
        <div>
          <h1 className="font-bold text-lg">Dr. José Antonio Reyes</h1>
          <p className="text-sm text-gray-500">Consulta · Vacunas · ECG</p>
        </div>
        <a href="#agenda" className="bg-blue-600 text-white px-4 py-2 rounded-xl">
          Agendar
        </a>
      </header>

      {/* HERO */}
      <section className="p-10">
        <h2 className="text-3xl font-bold">
          Diagnóstico claro y atención médica profesional
        </h2>
        <p className="mt-4 text-gray-600">
          Consulta médica integral con seguimiento y confianza.
        </p>
      </section>

      {/* SERVICIOS */}
      <section className="p-10">
        <h2 className="text-2xl font-bold">Servicios</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold">{s.name}</h3>
              <p className="mt-2 font-bold">${s.price} MXN</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-bold">Reseñas</h2>
        <div className="mt-4 space-y-3">
          <div className="p-4 border rounded-xl">
            ⭐⭐⭐⭐⭐ Paciente verificado  
            <p>Excelente atención.</p>
          </div>
          <div className="p-4 border rounded-xl">
            ⭐⭐⭐⭐⭐ Google  
            <p>Muy buen servicio.</p>
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="p-10">
        <h2 className="text-2xl font-bold">Agenda</h2>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=doc.jareyes%40gmail.com&ctz=America%2FMexico_City"
          width="100%"
          height="500"
        />
      </section>

      {/* UBICACION */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-bold">Ubicación</h2>
        <p>Av. Chimalhuacán 285, Nezahualcóyotl</p>
        <iframe
          className="mt-4"
          src="https://www.google.com/maps?q=avenida+chimalhuacan+285&output=embed"
          width="100%"
          height="300"
        />
      </section>

      {/* CONTACTO */}
      <section className="p-10 bg-blue-600 text-white">
        <h2 className="text-2xl font-bold">Contacto</h2>
        <p>5533331304</p>
        <p>doc.jareyes@gmail.com</p>
      </section>

    </div>
  );
}
