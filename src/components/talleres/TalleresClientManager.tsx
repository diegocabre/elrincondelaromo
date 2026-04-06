"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Image as ImageIcon, X, ChevronRight, ChevronLeft } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export interface Taller {
  id: string;
  title: string;
  price: number | string;
  description: string;
  category: string;
  status: string;
  image_url: string;
  date_info: string;
}

interface WorkshopPhoto {
  image_url: string;
}

export default function TalleresClientManager({ talleresData }: { talleresData: Taller[] }) {
  // Estados Galería
  const [galleryModalId, setGalleryModalId] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<WorkshopPhoto[]>([]);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const handleCheckout = async (taller: Taller) => {
    try {
        alert(`Redirigiendo a Mercado Pago para comprar: ${taller.title} por $${taller.price}... \n(Requiere credenciales)`);
    } catch (e) {
        console.error(e);
    }
  };

  const openGallery = async (id: string) => {
      const { data } = await supabase.from('workshop_gallery').select('image_url').eq('workshop_id', id).order('created_at', { ascending: true });
      if (data && data.length > 0) {
          setGalleryPhotos(data);
          setCurrentPhotoIdx(0);
          setGalleryModalId(id);
      } else {
          alert('Aún no se han subido fotos a esta galería.');
      }
  };

  const nextPhoto = () => setCurrentPhotoIdx(p => p === galleryPhotos.length - 1 ? 0 : p + 1);
  const prevPhoto = () => setCurrentPhotoIdx(p => p === 0 ? galleryPhotos.length - 1 : p - 1);

  const activos = talleresData.filter(t => t.status !== 'realizado');
  const realizados = talleresData.filter(t => t.status === 'realizado');

  return (
    <>
        <div className="w-full flex flex-col gap-24">
            
            {/* TALLERES ACTIVOS */}
            <div>
                <h2 className="text-3xl font-bold text-[#4A3B32] mb-10 text-center">Próximos Talleres</h2>
                {activos.length === 0 ? (
                    <p className="text-[#6B5A4E] text-center">Pronto publicaremos nuevos talleres. ¡Mantente atento!</p>
                ) : (
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {activos.map(taller => (
                        <WorkshopPublicCard key={taller.id} taller={taller} handleAction={() => handleCheckout(taller)} actionText="Inscribirme" isRealizado={false} />
                    ))}
                    </motion.div>
                )}
            </div>

            {/* TALLERES REALIZADOS */}
            <div>
                <h2 className="text-3xl font-bold text-[#4A3B32] mb-10 text-center border-t border-[#EACCA4]/30 pt-16">Experiencias Anteriores</h2>
                {realizados.length === 0 ? (
                    <p className="text-[#6B5A4E] text-center italic">Aquí compartiremos galerías de nuestros hermosos encuentros pasados.</p>
                ) : (
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {realizados.map(taller => (
                        <WorkshopPublicCard key={taller.id} taller={taller} handleAction={() => openGallery(taller.id)} actionText="Ver Galería" isRealizado={true} />
                    ))}
                    </motion.div>
                )}
            </div>
        </div>

        {/* LIGHTBOX GALERIA PUBLIC */}
        <AnimatePresence>
            {galleryModalId && galleryPhotos.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                >
                    <button onClick={() => setGalleryModalId(null)} className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white hover:text-[#EACCA4] transition-colors z-50">
                        <X size={40} strokeWidth={1.5} />
                    </button>
                    
                    <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center">
                        <button onClick={prevPhoto} className="absolute left-2 lg:-left-20 text-white/50 hover:text-white transition-colors z-10 bg-black/50 p-3 rounded-full">
                            <ChevronLeft size={36} />
                        </button>
                        
                        <motion.img 
                            key={currentPhotoIdx}
                            src={galleryPhotos[currentPhotoIdx].image_url}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-lg"
                        />

                        <button onClick={nextPhoto} className="absolute right-2 lg:-right-20 text-white/50 hover:text-white transition-colors z-10 bg-black/50 p-3 rounded-full">
                            <ChevronRight size={36} />
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-0 w-full flex justify-center gap-2">
                            {galleryPhotos.map((_, i) => (
                                <button key={i} onClick={() => setCurrentPhotoIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentPhotoIdx ? 'bg-[#EACCA4] w-6' : 'bg-white/30 hover:bg-white/50'}`} />
                            ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
}

function WorkshopPublicCard({ taller, handleAction, actionText, isRealizado }: { taller: Taller, handleAction: () => void, actionText: string, isRealizado: boolean }) {
    return (
        <motion.div 
            variants={fadeUp} 
            className={`relative min-h-[460px] rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#EACCA4]/20 flex flex-col justify-end overflow-hidden group`}
        >
            {/* Area de Imagen Absoluta */}
            {taller.image_url ? (
                <div className="absolute inset-0 z-0 bg-[#2c231d]">
                    <img src={taller.image_url} alt={taller.title} className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 ${isRealizado ? 'grayscale opacity-70' : 'opacity-90'}`} />
                </div>
            ) : (
                <div className="absolute inset-0 z-0 bg-[#FAEDDF] flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-[#EACCA4]" />
                </div>
            )}
            
            {/* Gradiente Overlay Extendido */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1512] via-[#2c231d]/60 to-transparent z-10"></div>

            {/* Contenido sobre Imagen */}
            <div className="relative z-20 p-8 flex flex-col h-full justify-end text-white">
                <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 self-start shadow-md backdrop-blur-md ${isRealizado ? 'bg-white/20 text-white' : 'bg-[#EACCA4] text-[#2c231d]'}`}>
                    {isRealizado ? 'Realizado' : taller.category}
                </span>
                
                <h3 className="text-3xl font-bold text-white mb-2">{taller.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {taller.description}
                </p>
                
                <div className="flex items-center gap-2 text-[#EACCA4] text-sm font-medium mb-6">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {taller.date_info}
                </div>
                
                <div className="pt-6 border-t border-white/20 mt-auto flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
                    {!isRealizado && (
                        <span className="text-3xl font-bold text-white">
                            ${Number(taller.price).toLocaleString('es-CL')}
                        </span>
                    )}
                    <button 
                        onClick={handleAction}
                        className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 flex-shrink-0 ${isRealizado ? 'w-full bg-white/20 text-white hover:bg-white hover:text-[#2c231d] backdrop-blur-sm' : 'w-full xl:w-auto bg-[#EACCA4] text-[#2c231d] hover:bg-white'}`}
                    >
                        {isRealizado && <ImageIcon className="w-4 h-4"/>}
                        {actionText}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
