import "./globals.css";

export const metadata = {
  title: "Dr. José Antonio Reyes Hernández",
  description: "Consulta médica en Nezahualcóyotl"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
