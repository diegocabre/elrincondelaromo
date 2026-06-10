import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { FaInstagram, FaGlobe, FaStore } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

export const revalidate = 0; // Evitar cacheado estático para reflejar marcas y fotos añadidas al instante

export const metadata: Metadata = {
  title: 'Concept Store | Vitrina de Diseño y Arte Local',
  description: 'Descubre nuestra Concept Store en Osorno. Una vitrina colaborativa que reúne marcas locales de diseño, decoración, bienestar y arte.',
  openGraph: {
    title: 'Concept Store | El Rincón del Aromo',
    description: 'Conoce los productos y marcas locales que forman parte de nuestra concept store. Diseño, arte y manufactura local.',
  }
};

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

// Marcas de fallback en caso de que la tabla esté vacía
const FALLBACK_BRANDS: Brand[] = [
  {
    id: '1',
    name: 'Aromo Botánica',
    description: 'Cosmética natural y fitoterapia elaborada a mano con hierbas nativas y aceites esenciales orgánicos.',
    image_url: '/assets/img/home/Rincon1.jpeg',
    instagram: '@aromobotanica',
    status: 'activo'
  },
  {
    id: '2',
    name: 'Taller de Greda',
    description: 'Cerámica de autor utilitaria y de decoración. Piezas únicas modeladas y esmaltadas artesanalmente.',
    image_url: '/assets/img/home/Rincon2.jpeg',
    instagram: '@tallerdegreda',
    website_url: 'https://tallerdegreda.cl',
    status: 'activo'
  },
  {
    id: '3',
    name: 'Tejidos del Sur',
    description: 'Diseños contemporáneos en lana natural de oveja hilada a mano. Mantas, bufandas y complementos de invierno.',
    image_url: '/assets/img/home/Rincon3.jpeg',
    instagram: '@tejidosdelsur',
    status: 'activo'
  }
];

const FALLBACK_PHOTOS: StorePhoto[] = [
  { id: '1', image_url: '/assets/img/fondo.png' },
  { id: '2', image_url: '/assets/img/home/Rincon1.jpeg' },
  { id: '3', image_url: '/assets/img/home/Rincon2.jpeg' }
];

export default async function ConceptStorePage() {
  // 1. Obtener las marcas de la base de datos
  let dbBrands: Brand[] = [];
  try {
    const { data } = await supabase
      .from('store_brands')
      .select('*')
      .eq('status', 'activo')
      .order('created_at', { ascending: false });
    dbBrands = (data as Brand[]) || [];
  } catch (err) {
    console.error('Error fetching store_brands, using fallback', err);
  }

  // 2. Obtener las fotos del local de la base de datos
  let dbPhotos: StorePhoto[] = [];
  try {
    const { data } = await supabase
      .from('store_gallery')
      .select('*')
      .order('created_at', { ascending: false });
    dbPhotos = (data as StorePhoto[]) || [];
  } catch (err) {
    console.error('Error fetching store_gallery, using fallback', err);
  }

  // Usar fallback si la base de datos no tiene datos
  const brands = dbBrands.length > 0 ? dbBrands : FALLBACK_BRANDS;
  const photos = dbPhotos.length > 0 ? dbPhotos : FALLBACK_PHOTOS;

  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12">
      <div className="w-full max-w-6xl flex flex-col gap-20">
        
        {/* Cabecera Principal */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#dfa445] font-semibold tracking-widest uppercase text-sm mb-4 block">Vitrina Colaborativa</span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] leading-tight mb-6">
            CONCEPT STORE
          </h1>
          <div className="w-24 h-1 bg-[#dfa445] mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-[#6B5A4E] font-light leading-relaxed">
            Nuestra concept store es un espacio físico dinámico dentro de nuestra casona que reúne el talento, arte y diseño de emprendimientos locales. Aquí encontrarás productos seleccionados con dedicación, que cambian constantemente para ofrecerte siempre algo único y con sentido.
          </p>
        </div>

        {/* Galería del Local */}
        <section className="flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-[#4A3B32] border-b border-[#dfa445]/20 pb-3 flex items-center gap-2">
            <FaStore className="text-[#dfa445]" /> Conoce la Tienda
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div 
                key={photo.id}
                className="relative h-64 md:h-72 rounded-[1.5rem] overflow-hidden shadow-md group border border-[#dfa445]/10 bg-white"
              >
                <Image
                  src={photo.image_url}
                  alt="Concept Store Osorno"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </section>

        {/* Listado de Marcas */}
        <section className="flex flex-col gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#4A3B32] border-b border-[#dfa445]/20 pb-3">
              Nuestras Marcas Colaboradoras
            </h2>
            <p className="text-sm text-[#6B5A4E] font-light mt-3">
              Estas son algunas de las marcas y creadores locales que exponen actualmente en nuestro Concept Store. Te invitamos a conocer su trabajo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => {
              // Asegurar que el instagram tenga @ si no tiene link completo
              const isUrl = brand.instagram?.startsWith('http');
              const instaHref = isUrl ? brand.instagram : `https://instagram.com/${brand.instagram?.replace('@', '')}`;
              const instaDisplay = brand.instagram?.startsWith('@') ? brand.instagram : `@${brand.instagram}`;

              return (
                <div 
                  key={brand.id}
                  className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#dfa445]/15 flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Logotipo/Imagen Marca */}
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border border-[#dfa445]/20 bg-[#FAEDDF]">
                      <Image
                        src={brand.image_url}
                        alt={`Marca ${brand.name}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    
                    {/* Nombre Marca */}
                    <h3 className="text-xl font-bold text-[#4A3B32] mb-3">{brand.name}</h3>
                    
                    {/* Descripción Marca */}
                    <p className="text-[#6B5A4E] text-sm font-light leading-relaxed mb-6">
                      {brand.description}
                    </p>
                  </div>

                  {/* Enlaces de Contacto */}
                  <div className="flex items-center justify-center gap-4 border-t border-[#dfa445]/15 pt-4 mt-auto">
                    {brand.instagram && (
                      <a 
                        href={instaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[#dfa445] hover:text-[#c99136] font-semibold transition-colors"
                      >
                        <FaInstagram className="text-base" />
                        <span>{instaDisplay}</span>
                      </a>
                    )}
                    {brand.website_url && (
                      <a 
                        href={brand.website_url.startsWith('http') ? brand.website_url : `https://${brand.website_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[#4A3B32] hover:text-[#dfa445] font-semibold transition-colors"
                      >
                        <FaGlobe className="text-sm" />
                        <span>Catálogo/Web</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
