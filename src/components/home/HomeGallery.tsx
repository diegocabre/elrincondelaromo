"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const images = [
  "cafeteria1.jpeg",
  "cafeteria2.jpeg",
  "cafeteria3.jpeg",
  "cafeteria4.jpeg",
  "cafeteria5.jpeg",
  "cafeteria6.jpeg",
  "cafeteria7.jpeg",
  "espacios.jpeg",
  "home1.jpg",
  "home2.jpg",
  "home3.jpg",
  "home4.jpg",
  "home5.jpg",
  "home6.jpg",
  "home7.png",
  "home8.jpg",
  "home9.png",
  "home10.png",
  "pizza.jpeg",
  "Rincon.png",
  "Rincon1.jpeg",
  "Rincon2.jpeg",
  "Rincon3.jpeg",
  "Rincon4.jpeg",
  "trabajo.jpeg",
].map((name) => `/assets/img/home/${name}`);

export default function HomeGallery() {
  const duplicatedImages = [...images, ...images];

  // Estado para el modal / lightbox
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Cerrar lightbox con la tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"; // Evitar scroll de la página de fondo
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );
  };

  return (
    <section className="w-full py-24 border-t border-[#E8D1B5]/40 overflow-hidden bg-[#FDFCF8]">
      <div className="flex flex-col items-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-[#4A3B32] mb-16 uppercase tracking-[0.2em] text-center"
        >
          Galería
        </motion.h2>

        <div className="relative w-full flex overflow-hidden">
          {/* Gradient Masks para suavizar los bordes decorativos */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FDFCF8] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FDFCF8] to-transparent z-10 pointer-events-none" />

          {/* Carrusel track animado */}
          <motion.div
            className="flex gap-4 sm:gap-6 lg:gap-8 min-w-max px-4"
            animate={{
              x: [0, -1920 * 2],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 90,
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((src, idx) => (
              <div
                key={idx}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-md flex-shrink-0 group cursor-pointer"
                onClick={() => setSelectedIndex(idx % images.length)} // Identifica el índice del array original
              >
                <Image
                  src={src}
                  alt={`Galería de fotos ${idx}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Lupa overlay al hacer hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/80 p-3 rounded-full text-[#4A3B32] font-semibold text-sm drop-shadow-md backdrop-blur-sm">
                    Ver Foto
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox / Modal Interactivo */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)} // Cierra si se hace clic afuera
          >
            {/* Botón de Cerrar */}
            <button
              className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white/70 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/40 rounded-full z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={32} />
            </button>

            {/* Controles de Navegación "En Tren" */}
            <button
              className="absolute left-4 lg:left-10 text-white/70 hover:text-white transition-all p-3 hover:scale-110 bg-black/20 hover:bg-black/40 rounded-full z-50 hidden sm:block"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={40} />
            </button>

            <button
              className="absolute right-4 lg:right-10 text-white/70 hover:text-white transition-all p-3 hover:scale-110 bg-black/20 hover:bg-black/40 rounded-full z-50 hidden sm:block"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={40} />
            </button>

            {/* Contenedor de la Imagen principal con arrastre táctil */}
            <div
              className="relative w-full h-full flex items-center justify-center px-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Evita que se cierre si se hace clic directo en la foto
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex} // Forza a re-renderizar la animación nueva cada vez que cambia el index
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  drag="x" // Habilita el swipe / arrastre lateral en celulares
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipeThreshold = 50; // Píxeles necesarios para contar como cambio de foto
                    if (offset.x < -swipeThreshold || velocity.x < -500) {
                      handleNext();
                    } else if (offset.x > swipeThreshold || velocity.x > 500) {
                      handlePrev();
                    }
                  }}
                  className="relative w-full h-full max-h-[80vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
                  title="Desliza para cambiar de foto"
                >
                  <Image
                    src={images[selectedIndex]}
                    alt={`Expanded gallery image ${selectedIndex}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    draggable={false} // Evita el fantasma del arrastre del navegador en PC
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicador táctil para teléfonos (Aparece abajo en móvil) */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-10 sm:hidden z-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="text-white/70 hover:text-white p-2 bg-black/40 rounded-full"
              >
                <ChevronLeft size={32} />
              </button>
              <span className="text-white/80 text-sm font-medium tracking-widest bg-black/40 px-4 py-1 rounded-full">
                {selectedIndex + 1} / {images.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="text-white/70 hover:text-white p-2 bg-black/40 rounded-full"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
