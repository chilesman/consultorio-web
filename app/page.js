export default function ConsultorioPremium() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #e2e8f0", background: "#fff" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>Dr. José Antonio Reyes Hernández</p>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Consulta médica · Vacunación · Electrocardiograma</p>
          </div>
          <a href="#agenda" style={{ background: "#2563eb", color: "#fff", padding: "10px 16px", borderRadius: 12, textDecoration: "none" }}>
            Agendar cita
          </a>
        </div>
      </header>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          <h1 style={{ fontSize: 42, marginBottom: 16 }}>Diagnóstico claro y atención médica de confianza</h1>
          <p style={{ color: "#475569", fontSize: 18, lineHeight: 1.6 }}>
            Atención médica integral con enfoque en prevención, diagnóstico oportuno y seguimiento profesional.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
            <a href="https://wa.me/525533331304" style={{ background: "#22c55e", color: "#fff", padding: "12px 20px", borderRadius: 12, textDecoration: "none" }}>
              WhatsApp
            </a>
            <a href="#agenda" style={{ border: "1px solid #cbd5e1", padding: "12px 20px", borderRadius: 12, textDecoration: "none", color: "#0f172a" }}>
              Ver horarios
            </a>
          </div>
        </div>
        <div style={{ border: "1px solid #e2e8f0", borderRadius: 24, padding: 24 }}>
          <div style={{ fontSize: 20 }}>⭐⭐⭐⭐⭐</div>
          <p style={{ marginTop: 12, fontSize: 14 }}>"Excelente atención, muy profesional y explica todo claramente."</p>
          <p style={{ marginTop: 12, fontSize: 14 }}>"Muy buena experiencia, diagnóstico rápido y acertado."</p>
        </div>
      </section>

      <section style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30 }}>Servicios y precios</h2>
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <div style={{ background: "#fff", padding: 24, borderRadius: 20, border: "1px solid #e2e8f0" }}>
              <h3>Consulta médica</h3>
              <p style={{ fontSize: 14, color: "#475569" }}>Valoración, diagnóstico y tratamiento.</p>
              <p style={{ marginTop: 16, fontWeight: 700 }}>$500 MXN</p>
            </div>
            <div style={{ background: "#fff", padding: 24, borderRadius: 20, border: "1px solid #e2e8f0" }}>
              <h3>Vacunación</h3>
              <p style={{ fontSize: 14, color: "#475569" }}>Aplicación segura de vacunas.</p>
              <p style={{ marginTop: 16, fontWeight: 700 }}>Desde $300 MXN</p>
            </div>
            <div style={{ background: "#fff", padding: 24, borderRadius: 20, border: "1px solid #e2e8f0" }}>
              <h3>Electrocardiograma</h3>
              <p style={{ fontSize: 14, color: "#475569" }}>Evaluación cardíaca básica.</p>
              <p style={{ marginTop: 16, fontWeight: 700 }}>$400 MXN</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: 30 }}>Sobre el médico</h2>
        <p style={{ marginTop: 16, color: "#475569", maxWidth: 760, lineHeight: 1.7 }}>
          Médico con enfoque en atención integral, prevención y seguimiento clínico. Experiencia en consulta general y manejo de enfermedades crónicas.
        </p>
        <ul style={{ marginTop: 24, fontSize: 14, lineHeight: 1.8 }}>
          <li>• Universidad: [Agregar]</li>
          <li>• Cédula profesional: [Agregar]</li>
          <li>• Diplomados: [Agregar]</li>
        </ul>
      </section>

      <section style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30 }}>Formación y certificaciones</h2>
          <p style={{ marginTop: 16, color: "#475569" }}>
            Aquí puedes agregar imágenes o PDFs de tus títulos, diplomados y certificaciones.
          </p>
        </div>
      </section>

      <section id="agenda" style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: 30 }}>Agenda tu cita</h2>
        <div style={{ marginTop: 24 }}>
          <iframe
            src="https://calendar.google.com/calendar/embed?src=doc.jareyes%40gmail.com&ctz=America%2FMexico_City"
            width="100%"
            height="600"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </section>

      <section style={{ background: "#f8fafc", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30 }}>Ubicación</h2>
          <p style={{ marginTop: 16 }}>
            Avenida Chimalhuacán 285, segundo piso, Nezahualcóyotl, Estado de México, México.
          </p>
          <iframe
            src="https://www.google.com/maps?q=avenida+chimalhuacan+285&output=embed"
            width="100%"
            height="320"
            style={{ border: 0, marginTop: 24 }}
          ></iframe>
        </div>
      </section>

      <section style={{ background: "#2563eb", color: "#fff", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: 30 }}>Contacto</h2>
          <p style={{ marginTop: 16 }}>Teléfono y WhatsApp: 5533331304</p>
          <p>Correo: doc.jareyes@gmail.com</p>
          <p style={{ marginTop: 8 }}>Lunes a jueves 10:00–17:00 · Viernes 10:00–15:00</p>
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: 24, color: "#64748b", fontSize: 14 }}>
        © 2026 Dr. José Antonio Reyes Hernández
      </footer>
    </div>
  );
}
