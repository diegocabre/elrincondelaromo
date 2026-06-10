import React from 'react';
import type { Metadata } from 'next';
import BienestarInfo from '@/components/bienestar/BienestarInfo';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Terapias y Bienestar',
  description: 'Encuentra terapias holísticas y clases regulares para tu bienestar físico y mental en El Rincón del Aromo.',
  openGraph: {
    title: 'Terapias y Bienestar | El Rincón del Aromo',
    description: 'Reserva tu hora para terapias y descubre nuestros planes de clases de pilates, yoga y más.',
  }
};

export default async function BienestarPage() {
    const { data: therapiesData } = await supabase.from('therapies').select('*').order('created_at', { ascending: true });
    const therapies = therapiesData || [];

    const { data: instData } = await supabase.from('instructors').select('*');
    const instructors = instData || [];

    const { data: schData } = await supabase.from('general_schedules').select('*');
    const schedules = schData || [];

    const { data: pricesData } = await supabase.from('class_prices').select('*').order('sort_order', { ascending: true });
    const prices = pricesData || [];

    return (
        <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
            <div className="w-full max-w-6xl">
                <BienestarInfo 
                    therapies={therapies} 
                    instructors={instructors}
                    schedules={schedules}
                    prices={prices}
                />
            </div>
        </main>
    );
}