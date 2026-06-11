"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomeEspacios() {
  return (
    <section className="w-full py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#dfa445]/20 mt-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="text-center mb-16"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-[#4A3B32] mb-4"
        >
          Nuestros Espacios
        </motion.h2>
        <motion.div
          variants={fadeInUp}
          className="w-24 h-1 bg-[#dfa445] mx-auto rounded-full"
        />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {/* Card 1 */}
        <motion.div variants={fadeInUp} className="group cursor-pointer">
          <Link href="/cafeteria-cowork">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/img/home/home5.jpg"
                alt="Cafetería"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Cafetería</h3>
                <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                  Café de especialidad en un ambiente relajado.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={fadeInUp} className="group cursor-pointer">
          <Link href="/cafeteria-cowork">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/img/home/cowork.jpeg"
                alt="Coworking"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Coworking</h3>
                <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                  Inspírate y trabaja con comodidad.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={fadeInUp} className="group cursor-pointer">
          <Link href="/talleres">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/img/tallerTarotandWine.jpeg"
                alt="Talleres"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Talleres</h3>
                <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                  Aprende, crea y conecta en comunidad.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Card 4 - BUG FIX DEL LINK DE TERAPIA A BIENESTAR */}
        <motion.div variants={fadeInUp} className="group cursor-pointer">
          <Link href="/bienestar">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/assets/img/home/espacios.jpeg"
                alt="Bienestar"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Mov. y Bienestar</h3>
                <p className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">
                  Clases y terapias para cuerpo y mente.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
