import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "zekalcnflpjukquiyute.supabase.co" }
    ],
  },
  /* config options here */
};

export default nextConfig;
