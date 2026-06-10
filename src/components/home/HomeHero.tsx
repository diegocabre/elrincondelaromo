"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomeHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <Image
        src="/assets/img/home/Rincon.png"
        alt="Rincón del Aromo - Vista Panorámica"
        fill
        className="object-cover object-center scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#FDFCF8]" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mt-12"
      >
        <span className="text-[#E8D1B5] font-semibold tracking-[0.2em] uppercase text-sm mb-2">
          Casa colaborativa
        </span>
        <span className="text-white/80 font-medium tracking-[0.1em] text-xs md:text-sm mb-6">
          Bienestar Comunidad, creatividad y colaboración
        </span>
        <h1
          className="text-2xl md:text-4xl text-white drop-shadow-md mb-8 leading-tight italic font-light max-w-3xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          “Un espacio pensado para crear, <br className="hidden md:block" />{" "}
          pausar y hacer crecer tu proyecto”
        </h1>
        <div className="flex justify-center w-full mt-4">
          <Link href="/talleres">
            <button className="px-10 py-4 bg-[#d2cbb6] text-[#4A3B32] font-semibold tracking-wider rounded-full hover:bg-[#c2bba3] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300 uppercase text-sm">
              TALLERES & EXPERIENCIAS
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
