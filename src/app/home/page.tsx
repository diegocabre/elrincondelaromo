import React from "react";
import HomeHero from "@/components/home/HomeHero";
import HomeEspacios from "@/components/home/HomeEspacios";
import HomeServices from "@/components/home/HomeServices";
import HomeAbout from "@/components/home/HomeAbout";
import HomeGallery from "@/components/home/HomeGallery";
import HomeReviews from "@/components/home/HomeReviews";
import HomeNewsletter from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#FDFCF8] text-[#4A3B32]">
      {/* Componentes fragmentados. Home es Server Component ahora! */}
      <HomeHero />
      <HomeEspacios />
      <HomeServices />
      <HomeAbout />
      <HomeGallery />
      <HomeReviews />
      <HomeNewsletter />
    </div>
  );
}
