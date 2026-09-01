// src/components/legal/CookieBanner.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { legalConfig } from "@/config/legalConfig";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("aromos_cookie_consent");
    if (!consent) {
      setIsOpen(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("aromos_cookie_consent", "accepted");
    setIsOpen(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem("aromos_cookie_consent", "essential_only");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Aviso de privacidad y cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-[#FDFCF8] text-[#4A3B32] p-5 rounded-2xl shadow-2xl border border-[#EACCA4] z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0" role="img" aria-label="cookie">
          🍪
        </span>
        <div>
          <h3 className="font-bold text-[#8B5E3C] text-sm">
            Privacidad y Cookies
          </h3>
          <p className="text-xs text-[#6B5A4E] mt-1 leading-relaxed">
            En {legalConfig.brandName} utilizamos cookies técnicas necesarias para garantizar la seguridad y correcta navegación en nuestro sitio. Puedes conocer más en nuestra{" "}
            <Link
              href="/privacidad#cookies"
              className="text-[#8B5E3C] underline hover:text-[#6D492E] font-medium"
            >
              Política de Privacidad y Cookies
            </Link>.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[#EACCA4]/30">
        <button
          type="button"
          onClick={handleEssentialOnly}
          className="px-3.5 py-1.5 text-xs font-semibold text-[#6B5A4E] bg-[#FAEDDF] hover:bg-[#EACCA4]/50 rounded-xl transition"
        >
          Solo esenciales
        </button>
        <button
          type="button"
          onClick={handleAcceptAll}
          className="px-4 py-1.5 text-xs font-semibold text-white bg-[#8B5E3C] hover:bg-[#6D492E] rounded-xl transition shadow-xs"
        >
          Aceptar
        </button>
      </div>
    </aside>
  );
}
