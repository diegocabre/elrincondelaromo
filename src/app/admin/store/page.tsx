"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit3, Image as ImageIcon, X, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface Brand {
  id: string;
  name: string;
  description: string;
  image_url: string;
  instagram?: string;
  website_url?: string;
  status: string;
}

interface StorePhoto {
  id: string;
  image_url: string;
}

export default function AdminStorePage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [photos, setPhotos] = useState<StorePhoto[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados del formulario de marca
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploadingBrand, setUploadingBrand] = useState(false);
  const [editBrandId, setEditBrandId] = useState<string | null>(null);
  
  const [brandFormData, setBrandFormData] = useState({
    name: "",
    description: "",
    instagram: "",
    website_url: "",
    status: "activo"
  });
  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);

  // Estados del gestor de galería
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    // 1. Obtener marcas
    const { data: dbBrands } = await supabase
      .from("store_brands")
      .select("*")
      .order("created_at", { ascending: false });
    setBrands(dbBrands || []);

    // 2. Obtener fotos del local
    const { data: dbPhotos } = await supabase
      .from("store_gallery")
      .select("*")
      .order("created_at", { ascending: false });
    setPhotos(dbPhotos || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Manejador del submit de Marcas (Agregar / Editar)
  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadingBrand(true);
    let imageUrl = null;

    if (brandImageFile) {
      const fileExt = brandImageFile.name.split(".").pop();
      const fileName = `brand_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`talleres/${fileName}`, brandImageFile);

      if (uploadError) {
        alert("Error al subir la imagen: " + uploadError.message);
        setUploadingBrand(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(`talleres/${fileName}`);
      imageUrl = publicUrlData.publicUrl;
    }

    const payload = {
      name: brandFormData.name,
      description: brandFormData.description,
      instagram: brandFormData.instagram || null,
      website_url: brandFormData.website_url || null,
      status: brandFormData.status,
      ...(imageUrl ? { image_url: imageUrl } : {})
    };

    let error;
    if (editBrandId) {
      const { error: updateError } = await supabase
        .from("store_brands")
        .update(payload)
        .eq("id", editBrandId);
      error = updateError;
    } else {
      if (!imageUrl) {
        alert("Debes seleccionar una imagen para la marca.");
        setUploadingBrand(false);
        return;
      }
      const { error: insertError } = await supabase
        .from("store_brands")
        .insert([payload]);
      error = insertError;
    }

    setUploadingBrand(false);

    if (!error) {
      alert(editBrandId ? "Marca actualizada con éxito" : "Marca creada con éxito");
      setBrandFormData({
        name: "",
        description: "",
        instagram: "",
        website_url: "",
        status: "activo"
      });
      setBrandImageFile(null);
      setEditBrandId(null);
      setIsFormOpen(false);
      fetchData();
    } else {
      alert("Error al guardar la marca: " + error.message);
    }
  };

  const handleEditBrand = (brand: Brand) => {
    setBrandFormData({
      name: brand.name,
      description: brand.description,
      instagram: brand.instagram || "",
      website_url: brand.website_url || "",
      status: brand.status
    });
    setEditBrandId(brand.id);
    setIsFormOpen(true);
    window.scrollTo(0, 0);
  };

  const handleDeleteBrand = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar la marca "${name}"?`)) return;

    const { error } = await supabase.from("store_brands").delete().eq("id", id);
    if (!error) {
      fetchData();
    } else {
      alert("Error al eliminar la marca: " + error.message);
    }
  };

  // Subir fotos para la galería física
  const handleUploadGalleryPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `store_gallery_${Date.now()}_${i}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`talleres/${fileName}`, file);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("images")
          .getPublicUrl(`talleres/${fileName}`);

        await supabase.from("store_gallery").insert([{
          image_url: publicUrlData.publicUrl
        }]);
      } else {
        console.error("Error subiendo foto de galería:", uploadError.message);
      }
    }

    const { data: dbPhotos } = await supabase
      .from("store_gallery")
      .select("*")
      .order("created_at", { ascending: false });
    setPhotos(dbPhotos || []);
    setUploadingGallery(false);
  };

  const handleDeleteGalleryPhoto = async (id: string) => {
    if (!confirm("¿Eliminar esta foto del local?")) return;

    const { error } = await supabase.from("store_gallery").delete().eq("id", id);
    if (!error) {
      setPhotos(photos.filter(p => p.id !== id));
    } else {
      alert("Error al eliminar la foto: " + error.message);
    }
  };

  if (loading) return <div className="text-center py-20 text-[#8B5E3C] font-semibold">Cargando Concept Store...</div>;

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto mt-20 md:mt-0">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#4A3B32] flex items-center gap-2">
            <ShoppingBag className="text-[#8B5E3C]" /> Gestión Concept Store
          </h1>
          <p className="text-sm text-[#6B5A4E] mt-1">Administra las marcas colaboradoras y la galería de fotos del local.</p>
        </div>
        <button
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            if (isFormOpen) {
              setEditBrandId(null);
              setBrandFormData({ name: "", description: "", instagram: "", website_url: "", status: "activo" });
              setBrandImageFile(null);
            }
          }}
          className="bg-[#8B5E3C] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md flex items-center gap-2"
        >
          {isFormOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {isFormOpen ? "Cancelar" : "Nueva Marca"}
        </button>
      </div>

      {/* Formulario de Marca */}
      {isFormOpen && (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30 mb-10">
          <h2 className="text-xl font-bold text-[#4A3B32] mb-6">
            {editBrandId ? "Editar Marca Colaboradora" : "Agregar Nueva Marca Colaboradora"}
          </h2>
          <form onSubmit={handleBrandSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Nombre de la Marca</label>
              <input
                required
                value={brandFormData.name}
                onChange={e => setBrandFormData({ ...brandFormData, name: e.target.value })}
                type="text"
                placeholder="Ej. Aromo Botánica"
                className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Estado</label>
              <select
                required
                value={brandFormData.status}
                onChange={e => setBrandFormData({ ...brandFormData, status: e.target.value })}
                className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
              >
                <option value="activo">Activo (Visible en la web)</option>
                <option value="inactivo">Inactivo (Oculto)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Instagram (Opcional)</label>
              <input
                value={brandFormData.instagram}
                onChange={e => setBrandFormData({ ...brandFormData, instagram: e.target.value })}
                type="text"
                placeholder="Ej. @aromobotanica"
                className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Sitio Web / Catálogo Link (Opcional)</label>
              <input
                value={brandFormData.website_url}
                onChange={e => setBrandFormData({ ...brandFormData, website_url: e.target.value })}
                type="text"
                placeholder="Ej. https://aromobotanica.cl"
                className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Descripción de la Marca</label>
              <textarea
                required
                value={brandFormData.description}
                onChange={e => setBrandFormData({ ...brandFormData, description: e.target.value })}
                rows={3}
                placeholder="Describe brevemente sus productos..."
                className="px-4 py-3 rounded-xl bg-[#FDFCF8] border border-[#EACCA4]/50 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/50 text-[#4A3B32]"
              ></textarea>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-semibold text-[#8B5E3C] uppercase">Logo o Imagen de Marca</label>
              <label className="flex items-center justify-center gap-2 bg-[#FDFCF8] border border-[#EACCA4]/50 text-[#6B5A4E] px-4 py-4 rounded-xl cursor-pointer hover:bg-[#FAEDDF] transition-colors w-full">
                <ImageIcon className="w-5 h-5 text-[#8B5E3C]" />
                <span className="text-sm font-medium">{brandImageFile ? brandImageFile.name : "Seleccionar Imagen..."}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      setBrandImageFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                disabled={uploadingBrand}
                type="submit"
                className="bg-[#8B5E3C] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#6D492E] transition-colors shadow-md w-full md:w-auto disabled:opacity-50"
              >
                {uploadingBrand ? "Guardando..." : editBrandId ? "Guardar Cambios" : "Agregar Marca"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sección 1: Gestión de Marcas Colaboradoras */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-[#4A3B32] mb-6 border-b border-[#EACCA4]/30 pb-2">
          Marcas Colaboradoras ({brands.length})
        </h2>
        
        {brands.length === 0 ? (
          <p className="text-[#6B5A4E]">No hay marcas registradas actualmente.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map(brand => (
              <div 
                key={brand.id}
                className="bg-white rounded-[1.5rem] shadow-sm border border-[#EACCA4]/30 p-6 flex flex-col justify-between relative"
              >
                <div className="flex gap-4 items-start mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#EACCA4]/30 shrink-0 bg-[#FAEDDF]">
                    <Image src={brand.image_url} alt={brand.name} fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#4A3B32] leading-snug">{brand.name}</h3>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mt-1 ${
                      brand.status === "activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {brand.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-[#6B5A4E] text-xs leading-relaxed line-clamp-3 mb-6 flex-1">{brand.description}</p>
                
                <div className="flex gap-2 border-t border-[#EACCA4]/10 pt-4 mt-auto">
                  <button 
                    onClick={() => handleEditBrand(brand)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 font-semibold text-xs transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button 
                    onClick={() => handleDeleteBrand(brand.id, brand.name)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 font-semibold text-xs transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección 2: Galería del Local físico */}
      <div className="bg-white rounded-[2rem] p-8 border border-[#EACCA4]/30 shadow-sm">
        <h2 className="text-xl font-bold text-[#4A3B32] mb-2 flex items-center gap-2">
          <ImageIcon className="text-[#8B5E3C] w-5 h-5" /> Fotos del Local ({photos.length})
        </h2>
        <p className="text-sm text-[#6B5A4E] mb-6">Sube las fotos que se mostrarán en la galería pública para presentar el espacio físico del Concept Store.</p>
        
        {/* Zona de Subida */}
        <div className="border-2 border-dashed border-[#8B5E3C]/30 bg-[#FAEDDF]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center mb-8">
          <ImageIcon className="w-10 h-10 text-[#8B5E3C] mb-3 opacity-40" />
          <h3 className="text-base font-bold text-[#4A3B32] mb-1">{uploadingGallery ? "Subiendo fotos..." : "Subir Fotos del Local"}</h3>
          <p className="text-xs text-[#6B5A4E] mb-4">Selecciona múltiples imágenes desde tu computador.</p>
          <label className="bg-[#8B5E3C] text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#6D492E] transition-colors cursor-pointer shadow-sm">
            {uploadingGallery ? "Procesando..." : "Buscar Imágenes..."}
            <input multiple disabled={uploadingGallery} type="file" accept="image/*" className="hidden" onChange={handleUploadGalleryPhotos} />
          </label>
        </div>

        {/* Listado de Fotos de Galería */}
        {photos.length === 0 ? (
          <p className="text-xs text-[#6B5A4E] italic text-center py-4 bg-[#FDFCF8] rounded-xl border">No has subido fotos del local aún.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map(p => (
              <div key={p.id} className="relative aspect-square group rounded-xl overflow-hidden border border-[#EACCA4]/40 shadow-xs bg-white">
                <Image src={p.image_url} alt="Foto Concept Store" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => handleDeleteGalleryPhoto(p.id)} 
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md transition-transform"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
