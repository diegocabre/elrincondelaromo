"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroImages = [
  "/assets/img/home/Rincon.jpeg",
  "/assets/img/home/Rincon1.jpeg",
  "/assets/img/home/Rincon2.jpeg",
  "/assets/img/home/Rincon3.jpeg",
];

export default function HomeHero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {heroImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Rincón del Aromo - Espacio ${index + 1}`}
          fill
          className={`object-cover object-center scale-105 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FDFCF8]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mt-12"
      >
        <span className="text-[#E8D1B5] font-medium tracking-[0.2em] uppercase text-sm mb-4">
          El Refugio en la Ciudad
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-sm mb-6 leading-tight">
          Donde la comunidad <br className="hidden md:block" /> florece.
        </h1>
        <p className="text-lg md:text-2xl text-white/90 font-light mb-10 max-w-2xl">
          Cafetería, Coworking, Talleres y Bienestar. Todo en un ambiente
          diseñado para la conexión y el crecimiento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/cafeteria-cowork">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#8B5E3C] text-white rounded-full font-medium hover:bg-[#6D492E] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
              Reserva un Espacio
            </button>
          </Link>
          <Link href="/talleres">
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-medium hover:bg-white hover:text-[#8B5E3C] transition-all duration-300">
              Ver Talleres
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
