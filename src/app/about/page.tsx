import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#f7f3ee] flex flex-col items-center py-10 px-4">
      {/* Presentación: Logo arriba, texto debajo */}
      <div className="flex flex-col items-center mb-12">
        <Image
          src="/assets/img/LOGO.png"
          alt="Foto del lugar"
          width={140}
          height={140}
          className="rounded-xl object-cover shadow-md mb-4"
          priority
        />
        <div className="text-[#6b4f3b] text-lg text-center max-w-2xl">
          Somos Claudia, Javier y Camila y nuestro propósito es ofrecer un espacio cálido y acogedor para que las personas puedan desarrollar sus habilidades y desafíos junto a nosotros.
        </div>
      </div>
      {/* Perfiles */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Claudia */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow p-8">
          <Image
            src="/assets/img/claudia.png"
            alt="Claudia Vasquez"
            width={110}
            height={110}
            className="rounded-full object-cover shadow mb-4 border-4 border-[#da983c]"
          />
          <h2 className="text-xl font-bold text-[#6b4f3b] mb-1">Claudia Vásquez</h2>
          <div className="text-[#b7b7a4] text-sm mb-2">Educadora Diferencial</div>
          <ul className="text-sm text-[#6b4f3b] text-left list-disc list-inside space-y-1">
            <li>Magíster en Educación Especial y Comunicación</li>
            <li>Especialista en dificultades del aprendizaje y lenguaje</li>
            <li>Discapacidad intelectual</li>
            <li>Postítulo en Audición y Lenguaje</li>
            <li>Certificados en Neurociencia y Educación Emocional</li>
          </ul>
        </div>
        {/* Javier */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow p-8">
          <Image
            src="/assets/img/javier.jpg"
            alt="Javier Cisterna"
            width={110}
            height={110}
            className="rounded-full object-cover shadow mb-4 border-4 border-[#da983c]"
            priority
          />
          <h2 className="text-xl font-bold text-[#6b4f3b] mb-1">Javier Cisterna</h2>
          <div className="text-[#b7b7a4] text-sm mb-2">Ingeniero Civil Industrial</div>
          <ul className="text-sm text-[#6b4f3b] text-left list-disc list-inside space-y-1">
            <li>Ingeniero en Prevención de Riesgos</li>
            <li>Magíster en Gestión de Personas y Capital Humano</li>
          </ul>
        </div>
        {/* Camila */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow p-8">
          <Image
            src="/assets/img/camila.jpg"
            alt="Camila Alvear"
            width={110}
            height={110}
            className="rounded-full object-cover shadow mb-4 border-4 border-[#da983c]"
          />
          <h2 className="text-xl font-bold text-[#6b4f3b] mb-1">Camila Alvear</h2>
          <div className="text-[#b7b7a4] text-sm mb-2">Periodista</div>
          <ul className="text-sm text-[#6b4f3b] text-left list-disc list-inside space-y-1">
            <li>Magíster en Medios de Comunicación</li>
            <li>Magíster en Responsabilidad Social Corporativa y Sostenibilidad</li>
            <li>Diplomada en Comunicación Estratégica y Gestión de Personas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}