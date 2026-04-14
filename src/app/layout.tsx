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
  metadataBase: new URL('https://www.rincondelaromo.com'),
  title: {
    default: "El Rincón del Aromo | Cafetería, Talleres y Bienestar",
    template: "%s | El Rincón del Aromo",
  },
  description: "Un refugio en la ciudad. Disfruta de café de especialidad, coworking, talleres de la comunidad y un espacio seguro para tu bienestar.",
  keywords: ["Cafetería", "Bienestar", "Talleres", "Coworking", "Café de Especialidad", "Terapias", "Los Aromos"],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://www.rincondelaromo.com',
    siteName: 'El Rincón del Aromo',
    title: 'El Rincón del Aromo | Cafetería, Talleres y Bienestar',
    description: 'Un refugio en la ciudad. Disfruta de café de especialidad, coworking y talleres para tu bienestar.',
    images: [
      {
        url: '/og-image.jpg', // Agrega esta imagen en la carpeta public
        width: 1200,
        height: 630,
        alt: 'Fachada o Logo de El Rincón del Aromo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Rincón del Aromo',
    description: 'Café de especialidad, coworking, talleres y un espacio para tu bienestar.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  }
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
