"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

export interface PayerData {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

export default function TalleresClientManager({ talleresData }: { talleresData: Taller[] }) {
  // Estados Galería y Detalles
  const [galleryModalId, setGalleryModalId] = useState<string | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<WorkshopPhoto[]>([]);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [detailModal, setDetailModal] = useState<Taller | null>(null);

  // Return Flow Estados
  const [paymentSuccessPopup, setPaymentSuccessPopup] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
      // Si volvemos de Mercado Pago
      const isSuccess = searchParams.get('success') === 'true';
      const collection_id = searchParams.get('collection_id');
      const payment_id = searchParams.get('payment_id');
      const external_reference = searchParams.get('external_reference');

      if (isSuccess && external_reference) {
          setIsConfirming(true);
          setPaymentSuccessPopup(true);

          fetch('/api/confirm-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ external_reference, collection_id, payment_id })
          }).then(res => res.json()).then(data => {
              if (data.success) {
                  setIsConfirming(false);
                  router.replace('/talleres', { scroll: false });
              } else {
                  console.error("Error confirmando pago", data.error);
                  setIsConfirming(false);
              }
          }).catch(e => {
              console.error(e);
              setIsConfirming(false);
          });
      }
  }, [searchParams, router]);

  const handleCheckout = async (taller: Taller, payer: PayerData) => {
    let paymentMode = 'mercadopago';
    try {
        const parsed = JSON.parse(taller.description);
        if (parsed.payment) paymentMode = parsed.payment;
    } catch {}

    if (paymentMode === 'sitio') {
        setIsConfirming(true);
        setPaymentSuccessPopup(true);
        try {
            const response = await fetch('/api/register-onsite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ item: taller, payer })
            });
            const data = await response.json();
            if (data.success) {
                setIsConfirming(false);
                setDetailModal(null);
                // No redirigimos ni limpiamos URL ya que ya mostramos el success y recargará pronto.
            } else {
                alert('Hubo un problema con la inscripción: ' + (data.error || ''));
                setPaymentSuccessPopup(false);
                setIsConfirming(false);
            }
        } catch (e) {
            console.error(e);
            alert('Error de conexión');
            setPaymentSuccessPopup(false);
            setIsConfirming(false);
        }
        return;
    }

    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item: taller, payer })
        });
        const data = await response.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert('Error al inicializar el pago: ' + (data.error || ''));
        }
    } catch (e) {
        console.error(e);
        const err = e as Error;
        alert('Hubo un error de conexión: ' + err.message);
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
                        <WorkshopPublicCard key={taller.id} taller={taller} handleAction={() => setDetailModal(taller)} actionText={taller.status === 'lleno' ? 'Cupos Agotados' : 'Inscribirme'} isRealizado={false} isLleno={taller.status === 'lleno'} onClickDetails={() => setDetailModal(taller)} />
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
                        <WorkshopPublicCard key={taller.id} taller={taller} handleAction={() => openGallery(taller.id)} actionText="Ver Galería" isRealizado={true} isLleno={false} onClickDetails={() => setDetailModal(taller)} />
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

        {/* MODAL DE ÉXITO PAGO (RETORNO MERCADO PAGO) */}
        <AnimatePresence>
            {paymentSuccessPopup && (
            <motion.div
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                className="bg-[#FDFCF8] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative p-8 text-center"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                >
                {isConfirming ? (
                    <div className="flex flex-col items-center py-6">
                        <div className="w-16 h-16 border-4 border-[#8B5E3C]/30 border-t-[#8B5E3C] rounded-full animate-spin mb-6 mx-auto"></div>
                        <h2 className="text-2xl font-semibold text-[#4A3B32] mb-2">Validando transacción...</h2>
                        <p className="text-[#6B5A4E]">Estamos comunicándonos con Mercado Pago para verificar la seguridad de la transacción y anotarte en la lista.</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto text-green-600">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-[#4A3B32] mb-3">¡Inscripción Exitosa!</h2>
                        <p className="text-[#6B5A4E] mb-6">Tu inscripción ha sido confirmada y tu cupo reservado. Te enviamos un correo electrónico detallado con toda la información.</p>
                        <button
                        onClick={() => setPaymentSuccessPopup(false)}
                        className="bg-[#8B5E3C] text-[#FAEDDF] px-8 py-3 rounded-full font-medium hover:bg-[#6A462B] transition uppercase tracking-wide w-full"
                        >
                        Aceptar y Continuar
                        </button>
                    </div>
                )}
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>

        <AnimatePresence>
            {/* LIGHTBOX DETALLES DEL TALLER */}
            {detailModal && (
                <WorkshopDetailModal 
                    taller={detailModal} 
                    onClose={() => setDetailModal(null)} 
                    handleAction={(payer) => { 
                        handleCheckout(detailModal, payer); 
                    }} 
                />
            )}
        </AnimatePresence>
    </>
  );
}

function WorkshopDetailModal({ taller, onClose, handleAction }: { taller: Taller, onClose: () => void, handleAction: (payer: PayerData) => void }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState<PayerData>({ name: '', surname: '', email: '', phone: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    let fullText = taller.description;
    let paymentMode = 'mercadopago';
    try {
        const parsed = JSON.parse(taller.description);
        if (parsed.full) fullText = parsed.full;
        if (parsed.payment) paymentMode = parsed.payment;
    } catch {}

    const isRealizado = taller.status === 'realizado';
    const isLleno = taller.status === 'lleno';

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.surname || !formData.email || !formData.phone) return;
        setIsSubmitting(true);
        handleAction(formData);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#4A3B32]/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-[#FDFCF8] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl flex flex-col items-center"
                onClick={e => e.stopPropagation()}
            >
                {taller.image_url && (
                    <div className="w-full aspect-[21/9] relative bg-[#2c231d]">
                        <img src={taller.image_url} alt={taller.title} className="w-full h-full object-cover opacity-90" />
                        <button onClick={onClose} className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/80 transition-colors backdrop-blur-md">
                            <X size={24} />
                        </button>
                    </div>
                )}
                
                <div className="p-8 pb-10 w-full flex flex-col text-left relative">
                    {!taller.image_url && (
                        <button onClick={onClose} className="absolute top-4 right-4 bg-[#FDFCF8] text-[#8B5E3C] border border-[#EACCA4] p-2 rounded-full hover:bg-[#EACCA4] transition-colors shadow-sm">
                            <X size={20} />
                        </button>
                    )}

                    <span className="text-[#8B5E3C] text-xs font-bold uppercase tracking-widest mb-2">{taller.category}</span>
                    <h2 className="text-3xl font-bold text-[#4A3B32] mb-6">{taller.title}</h2>
                    
                    <div className="flex items-center gap-2 text-[#6B5A4E] text-sm font-medium mb-8 bg-[#FAEDDF] w-max px-4 py-2 rounded-xl">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {taller.date_info}
                    </div>

                    {!showForm ? (
                        <>
                            <div className="mb-8 border-l-4 border-[#8B5E3C] pl-4">
                                <p className="text-[#4A3B32] text-md whitespace-pre-wrap leading-relaxed">{fullText}</p>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between mt-auto border-t border-[#EACCA4]/30 pt-6 gap-4">
                                <span className="text-3xl font-bold text-[#4A3B32]">
                                    ${Number(taller.price).toLocaleString('es-CL')}
                                </span>
                                
                                {(isRealizado || isLleno) ? (
                                    <button onClick={onClose} className="px-8 py-4 bg-[#8B5E3C] text-white rounded-xl font-bold shadow-lg hover:bg-[#6D492E] w-full md:w-auto">
                                        CERRAR DATOS
                                    </button>
                                ) : (
                                    <button onClick={() => setShowForm(true)} className="px-8 py-4 bg-[#D4A373] hover:bg-[#C28E5C] text-white rounded-xl font-bold shadow-lg w-full md:w-auto text-lg hover:-translate-y-1 transition-transform">
                                        INSCRIBIRME AHORA
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold text-[#4A3B32] mb-2 border-b border-[#EACCA4]/30 pb-2">Completa tus datos para el pago</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Taller Seleccionado</label>
                                <input type="text" value={taller.title} disabled className="w-full p-3 rounded-lg border border-[#EACCA4]/50 bg-[#FAEDDF] text-[#4A3B32] font-semibold cursor-not-allowed" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Nombre</label>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-lg border border-[#EACCA4] bg-white text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]" placeholder="Ej: Juan" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Apellido</label>
                                    <input type="text" required value={formData.surname} onChange={e => setFormData({...formData, surname: e.target.value})} className="w-full p-3 rounded-lg border border-[#EACCA4] bg-white text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]" placeholder="Ej: Pérez" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Email</label>
                                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 rounded-lg border border-[#EACCA4] bg-white text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]" placeholder="tu@email.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#6B5A4E] mb-1">Teléfono</label>
                                <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 rounded-lg border border-[#EACCA4] bg-white text-[#4A3B32] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]" placeholder="+56912345678" />
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-6 border-t border-[#EACCA4]/30 gap-4">
                                <button type="button" onClick={() => setShowForm(false)} className="text-[#8B5E3C] hover:text-[#6D492E] font-medium w-full md:w-auto">
                                    ← Volver
                                </button>
                                <button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-[#212121] hover:bg-[#000000] text-white rounded-xl font-bold shadow-lg w-full md:w-auto text-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2">
                                    {isSubmitting ? 'PROCESANDO...' : (paymentMode === 'sitio' ? 'AGENDAR (PAGO EN SITIO)' : `PAGAR $${Number(taller.price).toLocaleString('es-CL')}`)}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function WorkshopPublicCard({ taller, handleAction, actionText, isRealizado, isLleno, onClickDetails }: { taller: Taller, handleAction: () => void, actionText: string, isRealizado: boolean, isLleno: boolean, onClickDetails: () => void }) {
    
    // Extractor del JSON para el resumen
    let summaryText = taller.description;
    try {
        const parsed = JSON.parse(taller.description);
        if (parsed.short) summaryText = parsed.short;
    } catch {}

    return (
        <motion.div 
            variants={fadeUp} 
            onClick={onClickDetails}
            className={`relative min-h-[460px] rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#EACCA4]/20 flex flex-col justify-end overflow-hidden group cursor-pointer`}
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
            <div className="relative z-20 p-8 flex flex-col h-full justify-end text-white pointer-events-none">
                <span className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 self-start shadow-md backdrop-blur-md gap-2 ${isRealizado ? 'bg-white/20 text-white' : 'bg-[#EACCA4] text-[#2c231d]'}`}>
                    <span>{isRealizado ? 'Realizado' : taller.category}</span>
                    {isLleno && <span className="bg-red-600 text-white px-2 rounded-full">AGOTADO</span>}
                </span>
                
                <h3 className="text-3xl font-bold text-white mb-2">{taller.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {summaryText}
                </p>
                
                <div className="flex items-center gap-2 text-[#EACCA4] text-sm font-medium mb-6">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {taller.date_info}
                </div>
                
                <div className="pt-6 border-t border-white/20 mt-auto flex flex-col xl:flex-row gap-4 xl:items-center justify-between pointer-events-auto">
                    {!isRealizado && (
                        <span className="text-3xl font-bold text-white">
                            ${Number(taller.price).toLocaleString('es-CL')}
                        </span>
                    )}
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleAction(); }}
                        disabled={isLleno && !isRealizado}
                        className={`px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center justify-center gap-2 flex-shrink-0 disabled:cursor-not-allowed ${isRealizado ? 'w-full bg-white/20 text-white hover:bg-white hover:text-[#2c231d] backdrop-blur-sm' : isLleno ? 'w-full xl:w-auto bg-gray-500 text-gray-200' : 'w-full xl:w-auto bg-[#EACCA4] text-[#2c231d] hover:bg-white'}`}
                    >
                        {isRealizado && <ImageIcon className="w-4 h-4"/>}
                        {actionText}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
