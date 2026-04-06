import React from 'react';
import { supabase } from '@/lib/supabase';
import TalleresClientManager, { Taller } from '@/components/talleres/TalleresClientManager';

export const revalidate = 0; // Prevenir caching stales si suben talleres nuevos (Opcionalmente usa revalidate = 60 para cachear cada minuto en Vercel)

export default async function TalleresPage() {
  // Data fetched directamente en Servidor! Sin Loading Spinners en Cliente.
  const { data } = await supabase.from('workshops').select('*').order('created_at', { ascending: false });
  const talleresData = (data as Taller[]) || [];

  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
      <div className="w-full max-w-6xl flex flex-col items-center gap-20">
        
        {/* Cabecera Estática server-side */}
        <div className="text-center max-w-2xl">
          <span className="text-[#8B5E3C] font-semibold tracking-widest uppercase text-sm mb-4 block">Aprende y Conecta</span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] leading-tight mb-6">
            Nuestros Talleres
          </h1>
          <p className="text-lg text-[#6B5A4E] font-light">
            Experiencias diseñadas para inspirarte. Cada taller es impartido por especialistas en un ambiente íntimo y acogedor.
          </p>
        </div>

        {/* Lógica de Cliente: Grillas y Galerías */}
        <TalleresClientManager talleresData={talleresData} />

      </div>
    </main>
  );
}