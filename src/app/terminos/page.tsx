// src/app/terminos/page.tsx
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { legalConfig } from "@/config/legalConfig";

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${legalConfig.brandName}`,
  description: `Términos y condiciones de uso, contratación de servicios y políticas de devolución de ${legalConfig.brandName}.`,
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12 text-[#4A3B32]">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-xl p-8 md:p-16 border border-[#EACCA4]/30">
        <div className="border-b border-[#EACCA4]/40 pb-6 mb-8 text-center md:text-left">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] hover:text-[#6D492E] transition mb-4 inline-flex items-center gap-1"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold font-dancing text-[#8B5E3C] mt-2 mb-3">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-xs text-[#a08a78] uppercase tracking-wider">
            Última actualización: {legalConfig.lastUpdated} | Legislación de la República de Chile
          </p>
        </div>

        <div className="space-y-8 text-[#6B5A4E] leading-relaxed text-sm md:text-base">
          {/* 1. Información General */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              1. Información General y Titularidad
            </h2>
            <p>
              El presente sitio web ({legalConfig.websiteUrl}) es operado por <strong>{legalConfig.companyName}</strong> (titular de la marca y establecimiento comercial <strong>{legalConfig.brandName}</strong>), RUT <strong>{legalConfig.companyRut}</strong>, con domicilio en {legalConfig.companyAddress}, correo electrónico de contacto: <a href={`mailto:${legalConfig.contactEmail}`} className="text-[#8B5E3C] underline">{legalConfig.contactEmail}</a>.
            </p>
            <p className="mt-2">
              Al acceder, navegar y/o adquirir servicios a través de este sitio web, usted declara haber leído, comprendido y aceptado en su totalidad los presentes Términos y Condiciones, los cuales se rigen por la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores y la Ley N° 19.628 / N° 21.719 sobre Protección de Datos Personales en Chile.
            </p>
          </section>

          {/* 2. Contratación de Servicios e Inscripción a Talleres */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              2. Contratación de Servicios e Inscripción a Talleres
            </h2>
            <p className="mb-2">
              A través de este sitio web, usted podrá consultar, reservar, agendar y adquirir cupos para <strong>Talleres, Sesiones de Bienestar, Espacios de Cowork y Clases</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>El pago o reserva de talleres asegura un cupo individual e intransferible (salvo aviso previo con al menos 48 horas de anticipación) dentro del aforo limitado del taller.</li>
              <li>{legalConfig.brandName} se reserva el derecho de reprogramar o suspender talleres en caso de no alcanzar el aforo mínimo indispensable o por causas de fuerza mayor. En tales circunstancias, se ofrecerá la reubicación en una nueva fecha o la devolución íntegra e inmediata del monto pagado.</li>
              <li>A fin de garantizar el desarrollo armónico y puntual de las actividades, se solicita a los asistentes presentarse al menos 10 minutos antes del inicio programado.</li>
            </ul>
          </section>

          {/* 3. Derecho a Retracto y Políticas de Devolución */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              3. Derecho a Retracto y Políticas de Devolución
            </h2>
            <p className="mb-2">
              En conformidad con el Artículo 3° bis de la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores, <strong>{legalConfig.brandName}</strong> establece las siguientes condiciones para cancelaciones y devoluciones:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Aviso previo con más de 72 horas:</strong> El usuario podrá anular su inscripción con derecho a devolución del 100% del dinero abonado si lo solicita formalmente con al menos 72 horas de anticipación al inicio del taller o sesión.
              </li>
              <li>
                <strong>Cancelaciones con menos de 72 horas:</strong> No procederá devolución dineraria debido a que el cupo fue reservado con anticipación, impidiendo su venta a otro interesado, y los insumos y materiales fueron adquiridos por la administración. No obstante, en situaciones de fuerza mayor debidamente acreditadas (ej. certificado médico), la administración evaluará otorgar crédito para una fecha posterior.
              </li>
              <li>
                <strong>Canal exclusivo de solicitud:</strong> Toda solicitud de cancelación debe enviarse al correo oficial <strong><a href={`mailto:${legalConfig.contactEmail}`} className="text-[#8B5E3C] underline">{legalConfig.contactEmail}</a></strong> o a través del WhatsApp oficial (<a href={`tel:${legalConfig.phone.replace(/\s+/g, '')}`} className="text-[#8B5E3C]">{legalConfig.phone}</a>).
              </li>
              <li>
                <strong>Plazo de procesamiento:</strong> Las devoluciones aprobadas serán transferidas a la cuenta bancaria chilena indicada por el titular en un plazo máximo de 10 días hábiles.
              </li>
            </ul>
          </section>

          {/* 4. Medio de Pago Seguro */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              4. Medios de Pago y Seguridad Transaccional
            </h2>
            <p>
              Las compras y pagos digitales se canalizan a través de servidores encriptados y certificados provistos por <strong>Mercado Pago Chile</strong>. {legalConfig.brandName} no recopila, no procesa ni almacena números de tarjetas de crédito o débito ni claves bancarias, garantizando la total confidencialidad financiera del usuario.
            </p>
          </section>

          {/* 5. Propiedad Intelectual */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              5. Propiedad Intelectual e Industrial
            </h2>
            <p>
              Todos los contenidos, imágenes, marcas comerciales, logotipos, textos, ilustraciones, diseños y código fuente exhibidos en este sitio web son propiedad exclusiva de <strong>{legalConfig.companyName}</strong> / <strong>{legalConfig.brandName}</strong> o de terceros que han autorizado su inclusión, protegidos por las leyes de propiedad intelectual e industrial de Chile y tratados internacionales. Queda prohibida su reproducción o distribución comercial sin consentimiento previo por escrito.
            </p>
          </section>

          {/* 6. Privacidad y Protección de Datos */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              6. Privacidad y Protección de Datos Personales
            </h2>
            <p>
              El tratamiento de datos personales recabados a través del sitio web se rige por lo dispuesto en nuestra <Link href="/privacidad" className="text-[#8B5E3C] font-semibold underline">Política de Privacidad</Link>. Nos comprometemos a no comercializar ni ceder los datos de los usuarios a terceros ajenos a la operación del servicio.
            </p>
          </section>

          {/* 7. Ley Aplicable y Jurisdicción */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              7. Legislación Aplicable y Jurisdicción
            </h2>
            <p>
              Los presentes Términos y Condiciones se interpretan y rigen íntegramente conforme a las leyes de la República de Chile. Para cualquier controversia, litigio o interpretación derivada de su validez o aplicación, las partes fijan su domicilio en la comuna de {legalConfig.cityJurisdiction} y se someten expresamente a la jurisdicción de los <strong>Tribunales Ordinarios de Justicia de la ciudad de {legalConfig.cityJurisdiction}, Chile</strong>.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#EACCA4]/40 text-center text-xs text-[#a08a78]">
            {legalConfig.brandName} — {legalConfig.companyAddress} <br />
            {legalConfig.cityJurisdiction}, Región de Los Lagos, Chile.
          </div>
        </div>
      </div>
    </main>
  );
}
