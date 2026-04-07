import type { Metadata } from "next";
import { Montserrat, Dancing_Script } from "next/font/google";

import "./globals.css";
import { NavBar } from "@/components/nav/NavBar";
import Footer from "@/components/footer/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Rincón del Aromo | Cafetería, Talleres y Bienestar",
  description: "Un refugio en la ciudad. Disfruta de café de especialidad, coworking, talleres de la comunidad y un espacio seguro para tu bienestar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${dancingScript.variable} font-montserrat antialiased`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
