import React from 'react';
import type { Metadata } from 'next';
import { FaWhatsapp } from 'react-icons/fa';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Espacios y Salas de Reunión',
  description: 'Encuentra salas de reunión, boxes de atención y salas multiuso completamente equipadas para tus proyectos, talleres y consultas en Osorno.',
  openGraph: {
    title: 'Espacios y Salas de Reunión | El Rincón del Aromo',
    description: 'Reserva salas por hora, boxes clínicos o estéticos, y salas multiuso para clases y eventos en un entorno privado.',
  }
};

export default function EspaciosPage() {
  const meetingRooms = [
    {
      title: "Sala de Reunión | Hasta 3 personas",
      desc: "Ideal para reuniones de trabajo, entrevistas o sesiones individuales.",
      price: "$5.000 por hora",
      promo: "Promoción: al reservar más de 2 horas y realizar un consumo mínimo de $10.000 en cafetería, la primera hora es gratis."
    },
    {
      title: "Sala de Aromo | de 4 a 5 personas",
      desc: "Perfecta para reuniones de equipo, sesiones colaborativas o encuentros con clientes.",
      price: "$6.000 por hora",
      promo: "Promoción: al reservar más de 2 horas y realizar un consumo mínimo de $10.000 en cafetería, la primera hora es gratis."
    }
  ];

  const boxes = [
    {
      title: "Box Ejecutivo",
      desc: "Un espacio cómodo y profesional para atender clientes, realizar asesorías, reuniones, entrevistas o sesiones individuales.",
      idealFor: ["Psicólogos", "Nutricionistas", "Coaches", "Consultores", "Profesionales independientes"],
      price: "$5.000 por hora",
      note: "Disponible mediante reserva previa."
    },
    {
      title: "Box Spa",
      desc: "Espacio acondicionado con camilla, espejo e iluminación cálida, ideal para servicios de bienestar y cuidado personal.",
      idealFor: ["Masajes", "Terapias complementarias", "Estética", "Cosmetología", "Servicios de bienestar"],
      price: "$6.000 por hora",
      note: "Disponible mediante reserva previa."
    },
    {
      title: "Sala Aromo",
      desc: "Un espacio versátil para reuniones, cowork privado, capacitaciones o talleres de grupos pequeños.",
      idealFor: ["Reuniones de trabajo", "Cowork en equipo", "Talleres y clases", "Sesiones grupales", "Encuentros colaborativos"],
      price: "$6.000 por hora",
      note: ""
    }
  ];

  const whatsappLink = "https://wa.me/56987222243?text=Hola!%20Me%20interesa%20reservar%20un%20espacio%20en%20El%20Rincón%20del%20Aromo.";

  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
      <div className="w-full max-w-6xl flex flex-col gap-24">
        
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#dfa445] font-semibold tracking-widest uppercase text-sm mb-4 block">Nuestros Espacios</span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] leading-tight mb-6">
            ESPACIOS
          </h1>
          <div className="w-24 h-1 bg-[#dfa445] mx-auto rounded-full"></div>
        </div>

        {/* Sección: Salas de reuniones */}
        <section className="flex flex-col gap-10">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A3B32] mb-6 border-b border-[#dfa445]/20 pb-3">
              Salas de reuniones
            </h2>
            <p className="text-lg text-[#6B5A4E] leading-relaxed font-light mb-4">
              Espacios privados y cómodos para reuniones de trabajo, entrevistas, sesiones de planificación, clases particulares o encuentros con clientes.
            </p>
            <p className="text-lg text-[#6B5A4E] leading-relaxed font-light">
              Nuestras salas se encuentran separadas de la cafetería, permitiendo mayor privacidad y concentración. Además, cuentan con calefacción exclusiva, wifi, enchufes disponibles y acceso a la atención de cafetería durante tu estadía.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {meetingRooms.map((room, idx) => (
              <div 
                key={idx} 
                className="bg-[#6e721b] text-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-[#6e721b]/20 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 tracking-wide border-b border-white/20 pb-3">
                    {room.title}
                  </h3>
                  <p className="text-white/80 text-base font-light leading-relaxed mb-6">
                    {room.desc}
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-extrabold mb-4">{room.price}</div>
                  <p className="text-xs text-white/70 italic border-t border-white/10 pt-4 font-light leading-relaxed">
                    {room.promo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Box de atención */}
        <section className="flex flex-col gap-10">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4A3B32] mb-6 border-b border-[#dfa445]/20 pb-3">
              BOX DE ATENCIÓN
            </h2>
            <p className="text-lg text-[#6B5A4E] leading-relaxed font-light mb-4">
              Espacios privados disponibles por hora para profesionales, emprendedores y equipos que buscan un lugar cómodo, equipado y acogedor para atender, reunirse o desarrollar sus actividades.
            </p>
            <p className="text-lg text-[#6B5A4E] leading-relaxed font-light">
              Todos los espacios cuentan con wifi, calefacción, enchufes disponibles, acceso a cafetería y estacionamiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {boxes.map((box, idx) => (
              <div 
                key={idx} 
                className="bg-[#6e721b] text-white rounded-[2rem] p-8 shadow-lg border border-[#6e721b]/20 flex flex-col justify-between min-h-[420px]"
              >
                <div>
                  <h3 className="text-xl font-bold mb-4 tracking-wide border-b border-white/20 pb-3">
                    {box.title}
                  </h3>
                  <p className="text-white/80 text-sm font-light leading-relaxed mb-4">
                    {box.desc}
                  </p>
                  
                  {/* Ideal para */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold tracking-wider uppercase text-white/90 mb-2.5">Ideal para:</h4>
                    <ul className="space-y-1">
                      {box.idealFor.map((item, fidx) => (
                        <li key={fidx} className="text-xs text-white/80 font-light flex items-center gap-1.5">
                          <Check size={12} className="text-white/80 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto border-t border-white/10 pt-4 flex flex-col gap-2">
                  <div className="text-xl font-extrabold">{box.price}</div>
                  {box.note && <p className="text-[10px] text-white/70 italic font-light">{box.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección: Sala multiuso */}
        <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-md border border-[#dfa445]/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[#4A3B32] mb-4">
              SALA MULTIUSO
            </h2>
            <div className="w-16 h-1 bg-[#dfa445] mb-6 rounded-full"></div>
            <p className="text-base text-[#6B5A4E] leading-relaxed font-light">
              Espacio de 34 m² ideal para talleres, clases, capacitaciones y actividades de bienestar. Capacidad para hasta 10 personas en actividades físicas o 15 personas sentadas.
            </p>
            <p className="text-sm text-[#dfa445] font-semibold mt-4">
              ✓ Incluye wifi, calefacción, enchufes, acceso a cafetería y estacionamiento.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#FAEDDF] rounded-2xl p-6 md:p-8 border border-[#dfa445]/20 min-w-[200px] text-center shrink-0">
            <span className="text-xs font-bold text-[#4A3B32]/70 uppercase tracking-widest mb-2">Valor Uso</span>
            <div className="text-2xl font-extrabold text-[#6e721b] mb-1">
              $15.000
            </div>
            <span className="text-xs text-[#6B5A4E]">por hora de uso</span>
          </div>
        </section>

        {/* Botón Flotante / General Call to Action */}
        <div className="flex flex-col items-center gap-4 mt-8 border-t border-[#dfa445]/10 pt-12 text-center">
          <h3 className="text-xl font-bold text-[#4A3B32]">¿Quieres reservar alguno de nuestros espacios?</h3>
          <p className="text-sm text-[#6B5A4E] max-w-md font-light">Ponte en contacto con nuestro equipo por WhatsApp para consultar disponibilidad y agendar tu reserva.</p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 bg-[#25D366] text-white py-4 px-10 rounded-full font-bold hover:bg-[#128C7E] transition-all tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-300"
          >
            <FaWhatsapp className="text-xl" />
            <span>RESERVAR ESPACIOS</span>
          </a>
        </div>

      </div>
    </main>
  );
}
