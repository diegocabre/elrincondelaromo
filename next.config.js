/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Solo se optimizan imágenes de estos dominios (antes "**" permitía cualquiera)
    remotePatterns: [
      { protocol: "https", hostname: "zekalcnflpjukquiyute.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
    ],
    formats: ["image/webp"],
    // Guarda las imágenes optimizadas 31 días: Supabase las entrega una vez, no a cada visita
    minimumCacheTTL: 2678400,
  },
};

module.exports = nextConfig;
