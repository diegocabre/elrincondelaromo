import type { Metadata } from "next";
import { Dancing_Script, Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Footer from "@/components/footer/Footer";
import { NavBar } from "@/components/nav/NavBar";
import CookieBanner from "@/components/legal/CookieBanner";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import "./globals.css";

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
  metadataBase: new URL("https://www.rincondelaromo.com"),
  title: {
    default: "Rincón del Aromo | Cafetería, Talleres y Cowork",
    template: "%s | Rincón del Aromo",
  },
  description:
    "Un refugio en la ciudad. Disfruta de café de especialidad, coworking, talleres de la comunidad y un espacio seguro para tu bienestar.",
  keywords: [
    "Cafetería",
    "Bienestar",
    "Talleres",
    "Cowork",
    "Café de Especialidad",
    "Terapias",
    "Los Aromos",
  ],
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://www.rincondelaromo.com",
    siteName: "Rincón del Aromo",
    title: "Rincón del Aromo | Cafetería, Talleres y Cowork",
    description:
      "Un refugio en la ciudad. Disfruta de café de especialidad, coworking y talleres para tu bienestar.",
    images: [
      {
        url: "/og-image.jpg", // Agrega esta imagen en la carpeta public
        width: 1200,
        height: 630,
        alt: "Fachada o Logo de El Rincón del Aromo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Rincón del Aromo",
    description:
      "Café de especialidad, coworking, talleres y un espacio para tu bienestar.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "6fxZgHFwVHUSWY5tChwkrYyDpXbUmM2dPXEbpV4Kc3M",
  },
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
        <CookieBanner />
        <SpeedInsights />
        <MicrosoftClarity />
      </body>
    </html>
  );
}

