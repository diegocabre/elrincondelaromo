"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PlayCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function HomeServices() {
  return (
    <section className="w-full py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Left Column - Texto y Viñetas */}
        <motion.div variants={fadeUp} className="flex flex-col">
          <span className="text-[#8B5E3C] font-semibold tracking-[0.2em] uppercase text-sm mb-4">
            Nuestro Enfoque
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-6 leading-tight">
            ¿Qué hacemos en <br /> Rincón del Aromo?
          </h2>
          <div className="w-16 h-1 bg-[#D4A373] mb-8 rounded-full" />

          <p className="text-lg text-[#6B5A4E] font-medium mb-6">
            En Rincón del Aromo promovemos el bienestar familiar con espacios
            para todos:
          </p>

          <ul className="space-y-4">
            {[
              "Terapias",
              "Coworking y apoyo a emprendedores",
              "Talleres para adultos y niños",
              "Un rincón acogedor para disfrutar en familia.",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                variants={fadeUp}
                className="flex items-start gap-3"
              >
                <div className="mt-1 bg-[#FAEDDF] text-[#8B5E3C] rounded-full p-1">
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                </div>
                <span className="text-lg text-[#4A3B32] font-medium leading-relaxed">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Right Column - Video Placeholder */}
        <motion.div
          variants={fadeUp}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-[#E8D1B5]/30 group cursor-pointer bg-black flex items-center justify-center"
        >
          {/* Temporary Video Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4A3B32] to-[#2A221C] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 text-white/90 shadow-xl mb-4"
            >
              <PlayCircle size={48} strokeWidth={1.5} className="ml-2" />
            </motion.div>
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
              Ver Video
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
