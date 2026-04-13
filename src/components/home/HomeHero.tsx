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
        src="/assets/img/home/Rincon.jpeg"
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
        <span className="text-[#E8D1B5] font-medium tracking-[0.2em] uppercase text-sm mb-4">
          Un refugio en la ciudad
        </span>
        <h1
          className="text-6xl md:text-8xl text-white drop-shadow-md mb-6 leading-tight"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          donde la comunidad <br className="hidden md:block" /> florece.
        </h1>
        {/* Removed paragraph text underneath since it's not in the mockup */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto mt-6">
          <Link href="/talleres">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#D4A373] text-white border border-[#D4A373] rounded-full font-medium hover:bg-[#C28E5C] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
              Agenda tu Taller
            </button>
          </Link>
          <Link href="/contacto">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#8B5E3C] text-white rounded-full font-medium hover:bg-[#6D492E] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
              Contáctanos
            </button>
          </Link>
          <Link href="/about">
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-medium hover:bg-white hover:text-[#8B5E3C] transition-all duration-300">
              Conoce más
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.section>
  );
}
