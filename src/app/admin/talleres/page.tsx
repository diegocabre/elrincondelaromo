'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Edit3, Image as ImageIcon } from 'lucide-react';

export default function AdminTalleresPage() {
    const [talleres, setTalleres] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [galleryModal, setGalleryModal] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        date_info: '',
        status: 'activo'
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    const fetchTalleres = async () => {
        setLoading(true);
        const { data } = await supabase.from('workshops').select('*').order('created_at', { ascending: false });
        if (data) setTalleres(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTalleres();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploadingImage(true);
        let imageUrl = null;

        // Subir imagen si existe
        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('images')
                .upload(`talleres/${fileName}`, imageFile);
                
            if (uploadError) {
                alert('Error subiendo imagen: ' + uploadError.message);
                setUploadingImage(false);
                return;
            }

            // Obtener URL pública
            const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`talleres/${fileName}`);
            imageUrl = publicUrlData.publicUrl;
        }

        const priceNum = parseInt(formData.price, 10) || 0;

        const { error } = await supabase.from('workshops').insert([{
            title: formData.title,
            category: formData.category,
            description: formData.description,
            price: priceNum,
            date_info: formData.date_info,
            image_url: imageUrl,
            status: formData.status
        }]);

        setUploadingImage(false);

        if (!error) {
            alert('Taller creado con éxito');
            setFormData({ title: '', category: '', description: '', price: '', date_info: '', status: 'activo' });
            setImageFile(null);
            setIsFormOpen(false);
            fetchTalleres();
        } else {
            alert('Error creando taller: ' + error.message);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`¿Estás seguro de que quieres eliminar el taller "${title}"?`)) return;
        
        const { error } = await supabase.from('workshops').delete().eq('id', id);
        if (!error) {
            fetchTalleres();
        }
    };

    if (loading) return <div className="text-center py-20 text-[#8B5E3C] font-semibold">Cargando Talleres...</div>;

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        if (!confirm('¿Marcar taller como Realizado? Ya no se podrá comprar en la web.')) return;
        const { error } = await supabase.from('workshops').update({ status: newStatus }).eq('id', id);
        if (!error) {
            alert('Estado actualizado correctamente.');
            fetchTalleres();
        }
    };

    return (
        <div className="p-6 md:p-12 max-w-7xl mx-auto mt-20 md:mt-0">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[#4A3B32]">Gestión de Talleres</h1>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="bg-[#8B5E3C] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md flex items-center gap-2"
                >
                    {isFormOpen ? <X className="w-5 h-5"/> : <Plus className="w-5 h-5"/>}
                    {isFormOpen ? 'Cancelar' : 'Nuevo Taller'}
                </button>
            </div>

            {/* Formulario de Creación */}
            {isFormOpen && (
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30">
                    <h2 className="text-xl font-bold text-[#4A3B32] mb-6">Crear Nuevo Taller</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Título del Taller</label>
                            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" placeholder="Ej. Cerámica Básica" className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Categoría</label>
                            <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} type="text" placeholder="Ej. Artístico" className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Fecha y Hora Público</label>
                            <input required value={formData.date_info} onChange={e => setFormData({...formData, date_info: e.target.value})} type="text" placeholder="Ej. Sábado 15, 10:00 - 13:00 hrs" className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Precio (Clp)</label>
                            <input required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" placeholder="Ej. 25000" className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"/>
                        </div>
                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Descripción Corta</label>
                            <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} placeholder="Aprende las técnicas manuales..." className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"></textarea>
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Fotografía Principal del Taller</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center justify-center gap-2 bg-[#FDFCF8] border border-[#EACCA4]/50 text-[#6B5A4E] px-4 py-3 rounded-xl cursor-pointer hover:bg-[#FAEDDF] transition-colors w-full">
                                    <ImageIcon className="w-5 h-5 text-[#8B5E3C]"/>
                                    <span className="text-sm font-medium">{imageFile ? imageFile.name : 'Seleccionar Imagen...'}</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            setImageFile(e.target.files[0]);
                                        }
                                    }} />
                                </label>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Estado del Taller</label>
                            <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]">
                                <option value="activo">Activo (En Venta)</option>
                                <option value="realizado">Realizado (Galería)</option>
                            </select>
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end">
                            <button disabled={uploadingImage} type="submit" className="bg-[#8B5E3C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md text-center w-full md:w-auto disabled:opacity-50">
                                {uploadingImage ? 'Subiendo y Guardando...' : 'Guardar Taller'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Listado de Talleres */}
            <div className="flex flex-col gap-10">
                <div>
                    <h2 className="text-2xl font-bold text-[#4A3B32] mb-6 border-b border-[#EACCA4]/30 pb-2">Próximos Talleres (En Venta)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {talleres.filter(t => t.status !== 'realizado').length === 0 ? (
                            <p className="text-[#6B5A4E]">No hay talleres activos en venta.</p>
                        ) : (
                            talleres.filter(t => t.status !== 'realizado').map(t => <WorkshopAdminCard key={t.id} t={t} handleDelete={handleDelete} setGalleryModal={setGalleryModal} handleUpdateStatus={handleUpdateStatus} />)
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[#4A3B32] mb-6 border-b border-[#EACCA4]/30 pb-2">Experiencias Anteriores (Realizados)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {talleres.filter(t => t.status === 'realizado').length === 0 ? (
                            <p className="text-[#6B5A4E]">Aún no has movido talleres al estado Realizado.</p>
                        ) : (
                            talleres.filter(t => t.status === 'realizado').map(t => <WorkshopAdminCard key={t.id} t={t} handleDelete={handleDelete} setGalleryModal={setGalleryModal} handleUpdateStatus={handleUpdateStatus} />)
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Gestor de Galerias */}
            {galleryModal && (
                <GalleryManagerModal 
                    workshop={talleres.find(t => t.id === galleryModal)} 
                    onClose={() => setGalleryModal(null)} 
                />
            )}
        </div>
    );
}

// Componente Tarjeta Taller Administrador
function WorkshopAdminCard({ t, handleDelete, setGalleryModal, handleUpdateStatus }: any) {
    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#EACCA4]/30 flex flex-col items-start overflow-hidden hover:shadow-lg transition-all relative h-full">
            {/* Imagen Header */}
            {t.image_url ? (
                <div className="w-full h-48 relative bg-[#FDFCF8]">
                    <img src={t.image_url} alt={t.title} className={`w-full h-full object-cover ${t.status === 'realizado' ? 'grayscale' : ''}`} />
                </div>
            ) : (
                <div className="w-full h-48 bg-[#FAEDDF] flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-[#EACCA4]" />
                </div>
            )}

            <div className="p-6 flex flex-col items-start gap-4 w-full h-full">
                <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${t.status === 'realizado' ? 'bg-[#EEEEEE] text-[#6B5A4E]' : 'bg-[#E8D1B5]/30 text-[#8B5E3C]'}`}>
                    {t.status === 'realizado' ? 'Realizado' : t.category}
                </span>
                <h3 className="text-xl font-bold text-[#4A3B32]">{t.title}</h3>
                <p className="text-[#6B5A4E] text-sm leading-relaxed flex-1 line-clamp-3">{t.description}</p>
                
                <div className="w-full bg-[#FAEDDF] px-4 py-3 rounded-xl flex items-center justify-between mt-auto">
                    <div className="text-sm font-semibold text-[#8B5E3C]">{t.date_info}</div>
                    <div className="text-lg font-bold text-[#4A3B32]">${Number(t.price).toLocaleString('es-CL')}</div>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-2 mt-2">
                    {t.status !== 'realizado' && (
                        <button onClick={() => handleUpdateStatus(t.id, 'realizado')} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#4A3B32] text-white hover:bg-[#2c231d] transition-colors font-semibold text-xs uppercase tracking-wide">
                            <Edit3 className="w-4 h-4" /> Finalizar
                        </button>
                    )}
                    {t.status === 'realizado' && (
                        <button onClick={() => setGalleryModal(t.id)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#8B5E3C] text-white hover:bg-[#6D492E] transition-colors font-semibold text-xs uppercase tracking-wide">
                            <ImageIcon className="w-4 h-4" /> Fotos
                        </button>
                    )}
                    <button onClick={() => handleDelete(t.id, t.title)} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[#C62828] hover:bg-[#FFEBEE] transition-colors font-semibold text-xs uppercase tracking-wide">
                        <Trash2 className="w-4 h-4" /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

// Gestor de Galería en Modal
function GalleryManagerModal({ workshop, onClose }: any) {
    const [photos, setPhotos] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!workshop) return;
        const fetchGallery = async () => {
             const { data } = await supabase.from('workshop_gallery').select('*').eq('workshop_id', workshop.id).order('created_at', { ascending: false });
             if (data) setPhotos(data);
        };
        fetchGallery();
    }, [workshop]);

    const handleUploadBundle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        setUploading(true);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `gallery_${Date.now()}_${i}.${fileExt}`;
            
            const { error: uploadError } = await supabase.storage.from('images').upload(`talleres/${fileName}`, file);
            if (!uploadError) {
                const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`talleres/${fileName}`);
                await supabase.from('workshop_gallery').insert([{
                    workshop_id: workshop.id,
                    image_url: publicUrlData.publicUrl
                }]);
            }
        }
        
        // Refetch de la galería local 
        const { data } = await supabase.from('workshop_gallery').select('*').eq('workshop_id', workshop.id).order('created_at', { ascending: false });
        if (data) setPhotos(data);
        
        setUploading(false);
    };

    const handleDeletePhoto = async (photoId: string) => {
        if (!confirm('¿Eliminar esta foto de la galería?')) return;
        const { error } = await supabase.from('workshop_gallery').delete().eq('id', photoId);
        if (!error) {
             setPhotos(photos.filter(p => p.id !== photoId));
        }
    };

    if (!workshop) return null;

    return (
        <div className="fixed inset-0 bg-[#4A3B32]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-[#FDFCF8] relative rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col border border-[#EACCA4]/30">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-[#FAEDDF] text-[#8B5E3C] rounded-full hover:bg-[#EACCA4] transition-colors z-10">
                    <X className="w-5 h-5"/>
                </button>

                <div className="p-8 border-b border-[#EACCA4]/30 sticky top-0 bg-[#FDFCF8] z-0">
                    <h2 className="text-2xl font-bold text-[#4A3B32]">Galería Pública de Taller</h2>
                    <p className="text-[#6B5A4E]">Sube múltiples fotos para mostrar lo increíble que fue "{workshop.title}". Estas fotos las verán tus clientes al dar clic en Ver Galería.</p>
                </div>

                <div className="p-8 flex-1 flex flex-col gap-8">
                    <div className="border border-dashed border-[#8B5E3C] bg-[#FAEDDF]/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                        <ImageIcon className="w-12 h-12 text-[#8B5E3C] mb-4 opacity-50" />
                        <h3 className="text-lg font-bold text-[#4A3B32] mb-2">{uploading ? 'Subiendo archivos...' : 'Sube tus Capturas Mágicas'}</h3>
                        <p className="text-sm text-[#6B5A4E] mb-6">Selecciona una o más fotografías desde tu computador.</p>
                        
                        <label className="bg-[#8B5E3C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors cursor-pointer shadow-md">
                            {uploading ? 'Procesando Imágenes...' : 'Explorar Archivos...'}
                            <input multiple disabled={uploading} type="file" accept="image/*" className="hidden" onChange={handleUploadBundle} />
                        </label>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-[#4A3B32] mb-4 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-[#8B5E3C]" /> Archivos en el Álbum ({photos.length})
                        </h3>
                        {photos.length === 0 ? (
                            <p className="text-sm text-[#6B5A4E] italic bg-white p-6 rounded-xl border border-[#EACCA4]/30 text-center">Esta galería está vacía. Añade algunas imágenes hermosas para inspirar a nuevos clientes.</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {photos.map(p => (
                                    <div key={p.id} className="relative aspect-square group rounded-xl overflow-hidden border border-[#EACCA4]/50 shadow-sm">
                                        <img src={p.image_url} alt="Foto Galería" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={() => handleDeletePhoto(p.id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icono simple "X" auxiliar integrado
function X(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  );
}
