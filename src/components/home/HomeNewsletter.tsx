"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomeNewsletter() {
  return (
      <section className="w-full py-24 px-6 text-center max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-[#4A3B32] mb-4">
            Únete a nuestra comunidad
          </h2>
          <p className="text-[#6B5A4E] mb-8">
            Suscríbete para recibir noticias de nuevos talleres, promociones en
            coworking y tips de bienestar.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 shadow-lg rounded-full overflow-hidden border border-[#dfa445]/50" onSubmit={(e) => { e.preventDefault(); alert("¡Te has suscrito exitosamente!"); }}>
            <input
              type="email"
              placeholder="tu@correo.com"
              className="flex-1 px-6 py-4 bg-white focus:outline-none text-[#4A3B32]"
              required
            />
            <button
              type="submit"
              className="bg-[#dfa445] text-white px-8 py-4 font-semibold hover:bg-[#c99136] transition-colors"
            >
              Suscribirme
            </button>
          </form>
          <p className="text-[11px] text-[#a08a78] mt-3">
            Al suscribirte aceptas el tratamiento de tus datos para el envío de novedades. Conoce nuestra{" "}
            <a href="/privacidad" className="underline hover:text-[#8B5E3C]">Política de Privacidad</a>.
          </p>
        </motion.div>
      </section>
  );
}
