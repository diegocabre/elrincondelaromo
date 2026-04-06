"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const images = [
  "cafeteria.jpeg", "cafeteria1.jpeg", "cafeteria2.jpeg", "cafeteria3.jpeg",
  "cafeteria4.jpeg", "cafeteria5.jpeg", "cafeteria6.jpeg", "espacios.jpeg",
  "home1.jpg", "home2.jpg", "home3.jpg", "home4.jpg", "pizza.jpeg",
  "Rincon.jpeg", "Rincon1.jpeg", "Rincon2.jpeg", "Rincon3.jpeg", "trabajo.jpeg"
].map(name => `/assets/img/home/${name}`);

export default function HomeGallery() {
  // Duplicamos el arreglo para crear el efecto de scroll infinito sin saltos
  const duplicatedImages = [...images, ...images];

  return (
    <section className="w-full py-24 border-t border-[#E8D1B5]/40 overflow-hidden bg-[#FDFCF8]">
      <div className="flex flex-col items-center">
        <motion.h2 
          variants={fadeUp} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-16 uppercase tracking-[0.2em]"
        >
          Galería
        </motion.h2>

        <div className="relative w-full flex overflow-hidden">
          {/* Gradient Masks para suavizar los bordes */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FDFCF8] to-transparent z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FDFCF8] to-transparent z-10" />

          {/* Carrusel track animado */}
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max px-4"
            animate={{
              x: [0, -1920 * 2], // Animate fully to avoid jump (approx calculated for many images)
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 90, // Velocidad del carrusel, entre mayor número, más lento
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((src, idx) => (
              <div 
                key={idx} 
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group"
              >
                <Image
                  src={src}
                  alt={`Galería de fotos ${idx}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
