export const metadata = {
  title: "Dr. José Antonio Reyes Hernández",
  description: "Consulta médica, vacunación y electrocardiograma en Nezahualcóyotl."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#fff", color: "#0f172a" }}>
        {children}
      </body>
    </html>
  );
}
