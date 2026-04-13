import React from 'react';
import BienestarInfo from '@/components/bienestar/BienestarInfo';
import BookingForm from '@/components/bienestar/BookingForm';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

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
            <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-16">
                
                {/* Info Section - Delegate motion and text static to client sub-chunk */}
                <div className="w-full lg:w-1/2 flex flex-col">
                    <BienestarInfo 
                        therapies={therapies} 
                        instructors={instructors}
                        schedules={schedules}
                        prices={prices}
                    />
                </div>
                
                {/* Booking Form Section - Interactive Form */}
                <div className="w-full lg:w-1/2 flex items-start justify-center lg:sticky lg:top-32 h-fit">
                    <BookingForm therapies={therapies} />
                </div>

            </div>
        </main>
    );
}