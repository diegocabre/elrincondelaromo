// src/components/legal/LegalFormConsent.tsx
"use client";

import React from "react";
import Link from "next/link";
import { legalConfig } from "@/config/legalConfig";

interface LegalFormConsentProps {
  privacyAccepted: boolean;
  onPrivacyChange: (checked: boolean) => void;
  showMarketingOption?: boolean;
  marketingAccepted?: boolean;
  onMarketingChange?: (checked: boolean) => void;
  className?: string;
}

export default function LegalFormConsent({
  privacyAccepted,
  onPrivacyChange,
  showMarketingOption = false,
  marketingAccepted = false,
  onMarketingChange,
  className = "",
}: LegalFormConsentProps) {
  return (
    <div className={`space-y-3 pt-2 text-left text-xs ${className}`}>
      {/* 1. Checkbox Obligatorio */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="consent-privacy"
          name="consent_privacy"
          required
          checked={privacyAccepted}
          onChange={(e) => onPrivacyChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-[#dfa445]/40 text-[#dfa445] accent-[#8B5E3C] focus:ring-[#8B5E3C] cursor-pointer flex-shrink-0"
        />
        <label
          htmlFor="consent-privacy"
          className="text-[#6B5A4E] cursor-pointer leading-tight"
        >
          He leído y acepto la{" "}
          <Link
            href="/privacidad"
            target="_blank"
            className="text-[#8B5E3C] underline font-semibold hover:text-[#6D492E]"
          >
            Política de Privacidad
          </Link>{" "}
          y los{" "}
          <Link
            href="/terminos"
            target="_blank"
            className="text-[#8B5E3C] underline font-semibold hover:text-[#6D492E]"
          >
            Términos y Condiciones
          </Link>
          . <span className="text-red-500 font-bold">*</span>
        </label>
      </div>

      {/* 2. Checkbox Opcional de Marketing (si aplica) */}
      {showMarketingOption && onMarketingChange && (
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="consent-marketing"
            name="consent_marketing"
            checked={marketingAccepted}
            onChange={(e) => onMarketingChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-[#dfa445]/40 text-[#dfa445] accent-[#8B5E3C] focus:ring-[#8B5E3C] cursor-pointer flex-shrink-0"
          />
          <label
            htmlFor="consent-marketing"
            className="text-[#6B5A4E] cursor-pointer leading-tight"
          >
            Deseo recibir novedades sobre talleres y actividades de {legalConfig.brandName}. (Opcional)
          </label>
        </div>
      )}

      {/* 3. Micro-copy Legal de Primera Capa (Ley 19.628 / 21.719) */}
      <div className="p-2.5 bg-[#FAEDDF]/40 border border-[#EACCA4]/50 rounded-xl text-[11px] text-[#6B5A4E] leading-relaxed">
        <strong>Información básica:</strong> {legalConfig.companyName} ({legalConfig.brandName}) tratará sus datos únicamente para dar respuesta y seguimiento a su solicitud. Puede ejercer sus derechos ARCOP escribiendo a <span className="text-[#8B5E3C] font-semibold">{legalConfig.privacyEmail}</span>.
      </div>
    </div>
  );
}
