import React from "react";
import HomeHero from "@/components/home/HomeHero";
import HomeServices from "@/components/home/HomeServices";
import HomeAbout from "@/components/home/HomeAbout";
import HomeNewsletter from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#FDFCF8] text-[#4A3B32]">
      {/* Componentes fragmentados. Home es Server Component ahora! */}
      <HomeHero />
      <HomeServices />
      <HomeAbout />
      <HomeNewsletter />
    </div>
  );
}
