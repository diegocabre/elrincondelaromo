"use client";

import React, { useState, useEffect, useRef } from 'react';
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

interface GlobalSlot {
    id: string;
    isoDate: string;
    isFull: boolean;
}

export default function BookingForm({ therapies }: { therapies: Therapy[] }) {
    const [slots, setSlots] = useState<GlobalSlot[]>([]);
    const [loadingTimes, setLoadingTimes] = useState(false);

    const [selectedSlot, setSelectedSlot] = useState<GlobalSlot | null>(null);
    const [selectedTherapyTitle, setSelectedTherapyTitle] = useState('');

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const formTimeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Guardar el timestamp de carga para detectar bots ultrarrápidos
        if (formTimeRef.current) {
            formTimeRef.current.value = Date.now().toString();
        }

        const therapyId = therapies.find(t => t.title === selectedTherapyTitle)?.id;
        if (!therapyId) {
            setSlots([]);
            return;
        }

        const fetchTimes = async () => {
            setLoadingTimes(true);
            try {
                const res = await fetch(`/api/availability?therapy_id=${therapyId}`);
                const data = await res.json();
                if (data.slots) {
                    setSlots(data.slots);
                }
            } catch (err) {
                console.error("Error buscando horas", err);
            } finally {
                setLoadingTimes(false);
            }
        };

        fetchTimes();
    }, [selectedTherapyTitle, therapies]);

    // Agrupar los cupos por fecha local
    const groupedSlots = slots.reduce((acc, slot) => {
        const d = new Date(slot.isoDate);
        const dateKey = d.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'America/Santiago' });
        const capitalDate = dateKey.charAt(0).toUpperCase() + dateKey.slice(1);
        
        if (!acc[capitalDate]) acc[capitalDate] = [];
        acc[capitalDate].push(slot);
        return acc;
    }, {} as Record<string, GlobalSlot[]>);

    const handleSubmit = async (formData: FormData) => {
        if (!selectedSlot) {
            setErrorMessage('Debes seleccionar un horario.');
            return;
        }

        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
        
        const d = new Date(selectedSlot.isoDate);
        // Formatear localmente para enviar retrocompatibilidad a la BD y a los emails (evitar GMT quirks)
        const dateString = d.toLocaleDateString('sv-SE', { timeZone: 'America/Santiago' }); // 'YYYY-MM-DD' nativo local
        const timeString = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago' });

        formData.append('selectedDate', dateString);
        formData.append('selectedTime', timeString);
        formData.append('isoDate', selectedSlot.isoDate);

        const result = await createBookingAction(formData);

        if (result.success && result.message) {
            setSuccessMessage(result.message);
            setSelectedSlot(null);
            document.querySelector("form")?.reset();
            // Refetch para que se marque como Lleno
            const therapyId = therapies.find(t => t.title === selectedTherapyTitle)?.id;
            if (therapyId) {
                const res = await fetch(`/api/availability?therapy_id=${therapyId}`);
                const data = await res.json();
                if (data.slots) setSlots(data.slots);
            }
        } else {
            setErrorMessage(result.error || 'Fallo desconocido.');
        }

        setLoading(false);
    };

    return (
        <motion.div variants={fadeUp} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl w-full border border-[#EACCA4]/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#8B5E3C]" />
            
            <h2 className="text-2xl font-bold text-[#4A3B32] mb-2 mt-2">Agenda tu Cita</h2>
            <p className="text-[#6B5A4E] text-sm mb-6">Selecciona tu terapia e inscríbete de inmediato en nuestros cupos habilitados a continuación.</p>

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
                {/* ── Campos de seguridad anti-spam ─────────────────────────── */}
                {/* Honeypot: invisible para humanos, los bots lo rellenan */}
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ display: 'none' }}
                />
                {/* Timestamp de carga del formulario */}
                <input type="hidden" name="_ft" ref={formTimeRef} />
                {/* ───────────────────────────────────────────────────── */}
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
                        <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Correo</label>
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
                        value={selectedTherapyTitle}
                        onChange={(e) => {
                            setSelectedTherapyTitle(e.target.value);
                            setSelectedSlot(null);
                        }}
                        className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        {therapies.map((t) => (
                            <option key={t.id} value={t.title}>{t.title}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-[#EACCA4]/30 pt-4 mt-2">
                        <label className="text-sm font-semibold text-[#8B5E3C] uppercase tracking-wide">Cupos Abiertos</label>
                        <button 
                            type="submit"
                            disabled={loading || !selectedSlot}
                            className="bg-[#8B5E3C] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed md:w-auto w-full text-base"
                        >
                            {loading ? "Procesando Reserva..." : (!selectedSlot ? "Selecciona un cupo abajo" : "Confirmar Reserva")}
                        </button>
                    </div>
                    {loadingTimes ? (
                        <p className="text-[#6B5A4E] text-sm animate-pulse py-4">Buscando disponibilidades...</p>
                    ) : !selectedTherapyTitle ? (
                        <div className="p-4 bg-[#FAEDDF]/50 border border-[#EACCA4]/50 rounded-xl text-[#6B5A4E] text-sm mt-1">
                            Por favor, selecciona un servicio primero para ver sus horarios disponibles.
                        </div>
                    ) : Object.keys(groupedSlots).length === 0 ? (
                        <div className="p-4 bg-[#FFEBEE] border border-[#FFCDD2] rounded-xl text-[#C62828] text-sm mt-1">
                            Aún no han habilitado cupos. Vuelve pronto o consúltanos.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6 mt-2 max-h-[350px] overflow-y-auto pr-2 rounded-xl custom-scrollbar border border-[#EACCA4]/30 p-4 bg-[#FDFCF8]/50 shadow-inner">
                            {Object.entries(groupedSlots).map(([date, daySlots]) => (
                                <div key={date} className="flex flex-col gap-3">
                                    <h4 className="text-sm font-bold text-[#4A3B32] border-b border-[#EACCA4]/30 pb-1">{date}</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {daySlots.map(slot => {
                                            const d = new Date(slot.isoDate);
                                            const timeString = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Santiago' });
                                            
                                            if (slot.isFull) {
                                                return (
                                                    <div key={slot.id} className="py-3 px-2 rounded-xl border bg-[#F5F5F5] border-gray-200 text-gray-400 text-sm font-medium flex flex-col items-center justify-center relative overflow-hidden opacity-70" title="Cupo ya reservado">
                                                        <span className="line-through">{timeString}</span>
                                                        <span className="text-[10px] font-bold uppercase mt-1 text-red-800/60 bg-red-100/50 px-2 py-0.5 rounded-full">Lleno</span>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <button
                                                    key={slot.id}
                                                    type="button"
                                                    onClick={() => setSelectedSlot(slot)}
                                                    className={`py-3 px-2 rounded-xl border text-sm font-bold transition-all flex flex-col items-center shadow-sm hover:shadow-md ${selectedSlot?.id === slot.id ? 'bg-[#8B5E3C] text-white border-[#8B5E3C] scale-105' : 'bg-[#FAEDDF]/40 text-[#4A3B32] border-[#EACCA4] hover:bg-[#EACCA4]/30 hover:border-[#8B5E3C]'}`}
                                                >
                                                    {timeString}
                                                    <span className={`text-[10px] font-medium uppercase mt-1 tracking-wider ${selectedSlot?.id === slot.id ? 'text-white/80' : 'text-[#8B5E3C]'}`}>Abonar Cita</span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: #FAEDDF; border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #EACCA4; border-radius: 10px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #8B5E3C; }
                `}} />
            </form>
        </motion.div>
    );
}
