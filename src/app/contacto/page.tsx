"use client";

import { submitContactAction } from "@/actions/contact";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaClock,
  FaEnvelope,
  FaInstagram,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formTimeRef = useRef<HTMLInputElement>(null);

  // Guardar el timestamp de carga del formulario para detectar envíos ultrarrápidos (bots)
  useEffect(() => {
    if (formTimeRef.current) {
      formTimeRef.current.value = Date.now().toString();
    }
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Calcular el tiempo transcurrido en el cliente para evitar problemas de sincronización de reloj
    if (formTimeRef.current && formTimeRef.current.value) {
      const loadTime = parseInt(formTimeRef.current.value, 10);
      const elapsed = Date.now() - loadTime;
      formData.set("_ft", elapsed.toString());
    }

    const res = await submitContactAction(formData);

    if (res.success && res.message) {
      setSuccessMessage(res.message);
      document.querySelector("form")?.reset();
      // Restaurar el timestamp tras reset
      if (formTimeRef.current)
        formTimeRef.current.value = Date.now().toString();
    } else {
      setErrorMessage(res.error || "Error al enviar.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-7xl grid lg:grid-cols-12 gap-12 items-stretch"
      >
        {/* COLUMNA IZQUIERDA: Imagen "Somos" */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-5 relative w-full h-[350px] lg:h-auto min-h-[450px] rounded-[2rem] overflow-hidden shadow-lg border border-[#dfa445]/10"
        >
          <Image
            src="/assets/img/home/somos.png"
            alt="Interior Rincón del Aromo"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/5" />
        </motion.div>

        {/* COLUMNA DERECHA: Somos + Hablemos/Contacto */}
        <motion.div
          variants={staggerContainer}
          className="lg:col-span-7 flex flex-col justify-between gap-12"
        >
          {/* Bloque: Quienes Somos (Fusión) */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <p className="text-xl md:text-2xl text-[#4A3B32] font-medium leading-relaxed italic border-l-4 border-[#dfa445] pl-6">
              Rincón del Aromo es un proyecto familiar que busca impulsar ideas,
              proyectos y emprendimientos a través de espacios de trabajo,
              aprendizaje y bienestar.
            </p>
            <p className="text-base md:text-lg text-[#6B5A4E] font-light leading-relaxed pl-6">
              Somos una casa colaborativa donde el café, la creatividad y la
              comunidad se encuentran para ofrecer un lugar donde crear, pausar
              y hacer crecer proyectos.
            </p>
          </motion.div>

          <div className="w-full h-px bg-[#dfa445]/20"></div>

          {/* Bloque: Hablemos / Contacto */}
          <div className="flex flex-col gap-8">
            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <span className="text-[#dfa445] font-semibold tracking-widest uppercase text-sm mb-1 block">
                Hablemos
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#4A3B32] leading-tight">
                Contacto
              </h2>
              <p className="text-[#6B5A4E] text-base font-light leading-relaxed mt-2">
                Estamos aquí para responder tus consultas, sugerencias o
                simplemente para conversar sobre tu próxima visita al Rincón del
                Aromo.
              </p>
            </motion.div>

            {/* Sub-grilla interna: Encuéntranos y Formulario */}
            <div className="grid md:grid-cols-5 gap-8">
              {/* Encuéntranos */}
              <motion.div
                variants={fadeUp}
                className="md:col-span-2 bg-[#FAEDDF] rounded-[1.5rem] p-6 flex flex-col gap-6 shadow-sm border border-[#dfa445]/15"
              >
                <h3 className="text-lg font-bold text-[#4A3B32] mb-1">
                  Encuéntranos
                </h3>

                <div className="flex gap-3 items-start text-xs">
                  <div className="text-[#dfa445] mt-0.5">
                    <FaMapMarkerAlt size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#dfa445] uppercase tracking-wide">
                      Dirección
                    </h4>
                    <p className="text-[#4A3B32] mt-1 leading-relaxed">
                      Isla Maulin 1871, Osorno, <br /> Región de Los Lagos
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start text-xs">
                  <div className="text-[#dfa445] mt-0.5">
                    <FaWhatsapp size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#dfa445] uppercase tracking-wide">
                      WhatsApp
                    </h4>
                    <Link
                      href="https://wa.me/56987222243"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A3B32] hover:text-[#dfa445] transition-colors mt-1 block font-semibold"
                    >
                      +56 9 8722 2243
                    </Link>
                  </div>
                </div>

                <div className="flex gap-3 items-start text-xs">
                  <div className="text-[#dfa445] mt-0.5">
                    <FaEnvelope size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#dfa445] uppercase tracking-wide">
                      Email
                    </h4>
                    <Link
                      href="mailto:contacto@rincondelaromo.com"
                      className="text-[#4A3B32] hover:text-[#dfa445] transition-colors mt-1 block font-semibold"
                    >
                      contacto@rincondelaromo.com
                    </Link>
                  </div>
                </div>

                <div className="flex gap-3 items-start text-xs">
                  <div className="text-[#dfa445] mt-0.5">
                    <FaClock size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#dfa445] uppercase tracking-wide">
                      Horarios
                    </h4>
                    <div className="mt-1 leading-relaxed text-[#6B5A4E]">
                      <p className="font-semibold text-[#4A3B32]">
                        Cafetería y Cowork
                      </p>
                      <p>Lun - Vie: 08:00 - 20:30</p>
                      <p>Sábados: 09:00 - 19:00</p>
                    </div>
                  </div>
                </div>

                {/* Redes Sociales */}
                <div className="border-t border-[#dfa445]/20 pt-4 mt-2">
                  <Link
                    href="https://www.instagram.com/rincondelaromo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white text-[#4A3B32] py-3 rounded-xl hover:bg-[#FDFCF8] hover:text-[#dfa445] transition-colors shadow-xs text-xs font-semibold"
                  >
                    <FaInstagram className="text-base" />
                    <span>Síguenos en Instagram</span>
                  </Link>
                </div>
              </motion.div>

              {/* Formulario de Mensaje */}
              <motion.div
                variants={fadeUp}
                className="md:col-span-3 bg-white rounded-[1.5rem] p-6 shadow-md border border-[#dfa445]/10 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-[#4A3B32] mb-4">
                    Envíanos un Mensaje
                  </h3>

                  {successMessage && (
                    <div className="mb-4 p-3.5 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] rounded-xl text-xs font-medium">
                      {successMessage}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="mb-4 p-3.5 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] rounded-xl text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <form action={handleSubmit} className="space-y-4 text-xs">
                    {/* Honeypot anti-spam */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ display: "none" }}
                    />
                    <input type="hidden" name="_ft" ref={formTimeRef} />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="nombre"
                          className="font-bold text-[#dfa445] uppercase tracking-wide"
                        >
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          className="w-full px-3.5 py-2.5 bg-[#FDFCF8] border border-[#dfa445]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#dfa445] text-[#4A3B32] transition-all"
                          placeholder="Ej. Camila Silva"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="email"
                          className="font-bold text-[#dfa445] uppercase tracking-wide"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-3.5 py-2.5 bg-[#FDFCF8] border border-[#dfa445]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#dfa445] text-[#4A3B32] transition-all"
                          placeholder="tu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="asunto"
                        className="font-bold text-[#dfa445] uppercase tracking-wide"
                      >
                        Asunto
                      </label>
                      <div className="relative">
                        <select
                          id="asunto"
                          name="asunto"
                          className="w-full px-3.5 py-2.5 bg-[#FDFCF8] border border-[#dfa445]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#dfa445] text-[#4A3B32] transition-all appearance-none"
                          required
                        >
                          <option value="">Selecciona un motivo</option>
                          <option value="cowork">Reserva Cowork</option>
                          <option value="talleres">
                            Información sobre Talleres
                          </option>
                          <option value="bienestar">Clases de Bienestar</option>
                          <option value="otros">Otras consultas</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#dfa445]">
                          <svg
                            className="fill-current h-3.5 w-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="mensaje"
                        className="font-bold text-[#dfa445] uppercase tracking-wide"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        className="w-full px-3.5 py-2.5 bg-[#FDFCF8] border border-[#dfa445]/20 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#dfa445] text-[#4A3B32] transition-all resize-y min-h-[100px]"
                        placeholder="¿En qué podemos ayudarte?"
                        required
                        minLength={4}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#dfa445] text-white mt-2 px-6 py-3 rounded-xl font-bold hover:bg-[#c99136] transition-colors shadow-xs flex items-center justify-center disabled:opacity-50 tracking-wider uppercase text-xs"
                    >
                      {loading ? "Enviando..." : "Enviar Mensaje"}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
