"use client";

import React, { useState, useEffect } from 'react';
import { createBookingAction } from '@/actions/booking';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

interface Therapy {
    id: string;
    title: string;
    description: string;
}

export default function BookingForm({ therapies }: { therapies: Therapy[] }) {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [loadingTimes, setLoadingTimes] = useState(false);

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!selectedDate) return;
        
        const fetchTimes = async () => {
            setLoadingTimes(true);
            try {
                // Sigue utilizando la API route pre-existente o puedes pasar a Server Action después, 
                // pero esto mantiene baja latencia para el calnedario
                const res = await fetch(`/api/availability?date=${selectedDate}`);
                const data = await res.json();
                if (data.available) {
                    setAvailableTimes(data.available);
                }
            } catch (err) {
                console.error("Error buscando horas", err);
            } finally {
                setLoadingTimes(false);
            }
        };

        fetchTimes();
        setSelectedTime(''); // Reset hora si cambia la fecha
    }, [selectedDate]);

    // Nueva conexión con Server Action
    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        
        // Adjuntamos datos sueltos que no provienen del Form directamente (los radio buttons si están en el form, 
        // pero la hora está controlada por state de botones, por lo que la interceptamos y adjuntamos al form temporalmente)
        formData.append('selectedTime', selectedTime);

        const result = await createBookingAction(formData);

        if (result.success && result.message) {
            setSuccessMessage(result.message);
            // Limpia Form UI
            setSelectedDate('');
            setSelectedTime('');
            setAvailableTimes([]);
            // Resetea HTML form elements
            document.querySelector("form")?.reset();
        } else {
            setErrorMessage(result.error || 'Fallo desconocido.');
        }

        setLoading(false);
    };

    return (
        <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl w-full border border-[#EACCA4]/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#8B5E3C]" />
            
            <h2 className="text-2xl font-bold text-[#4A3B32] mb-2 mt-2">Agenda tu Cita</h2>
            <p className="text-[#6B5A4E] text-sm mb-6">Selecciona el servicio, elige una fecha para ver las horas disponibles, e ingresa tus datos.</p>

            {successMessage && (
                <div className="mb-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] rounded-xl text-sm font-medium">
                    {successMessage}
                </div>
            )}
            
            {errorMessage && (
                <div className="mb-6 p-4 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] rounded-xl text-sm font-medium">
                    {errorMessage}
                </div>
            )}

            <form action={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Nombre Completo</label>
                        <input 
                            name="name"
                            type="text" 
                            required
                            placeholder="Ej. Juan Pérez"
                            className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Correo Electrónico</label>
                        <input 
                            name="email"
                            type="email" 
                            required
                            placeholder="tu@email.com"
                            className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Servicio</label>
                    <select 
                        name="selectedService"
                        required
                        defaultValue=""
                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        {therapies.map((t) => (
                            <option key={t.id} value={t.title}>{t.title}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Día Abierto</label>
                    <input 
                        name="selectedDate"
                        type="date" 
                        required
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                    />
                </div>

                {selectedDate && (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Horas Disponibles</label>
                        {loadingTimes ? (
                            <p className="text-[#6B5A4E] text-sm">Cargando cupos...</p>
                        ) : availableTimes.length > 0 ? (
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                {availableTimes.map(time => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-2 rounded-xl border text-sm font-medium transition-all ${selectedTime === time ? 'bg-[#8B5E3C] text-white border-[#8B5E3C]' : 'bg-transparent text-[#6B5A4E] border-[#EACCA4]/50 hover:border-[#8B5E3C]'}`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="p-4 bg-[#FFEBEE] border border-[#FFCDD2] rounded-xl text-[#C62828] text-sm">
                                No hay horas disponibles para el día seleccionado. Intenta otro día.
                            </div>
                        )}
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={loading || !selectedTime}
                    className="mt-4 w-full bg-[#8B5E3C] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Procesando Reserva..." : (!selectedTime ? "Selecciona una hora" : "Confirmar Reserva")}
                </button>
            </form>
        </motion.div>
    );
}
