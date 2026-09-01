// src/app/privacidad/page.tsx
import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { legalConfig } from "@/config/legalConfig";

export const metadata: Metadata = {
  title: `Política de Privacidad | ${legalConfig.brandName}`,
  description: `Política de privacidad y protección de datos personales de ${legalConfig.brandName} conforme a la legislación chilena (Ley N° 19.628 y N° 21.719).`,
};

export default function PrivacidadPage() {
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
            Política de Privacidad y Protección de Datos
          </h1>
          <p className="text-xs text-[#a08a78] uppercase tracking-wider">
            Última actualización: {legalConfig.lastUpdated} | Ley N° 19.628 y N° 21.719
          </p>
        </div>

        <div className="space-y-8 text-[#6B5A4E] leading-relaxed text-sm md:text-base">
          {/* Introducción */}
          <section>
            <p>
              La presente Política de Privacidad describe de qué manera <strong>{legalConfig.companyName}</strong> (en adelante &quot;<strong>{legalConfig.brandName}</strong>&quot;, &quot;nosotros&quot; o &quot;el Responsable&quot;) recopila, utiliza, almacena, resguarda y trata los datos personales de los usuarios y clientes a través de nuestro sitio web oficial <strong>{legalConfig.websiteUrl}</strong>.
            </p>
            <p className="mt-3">
              Nuestro compromiso es proteger la privacidad y garantizar el debido tratamiento de los datos personales en estricto apego a la legislación de la República de Chile, especialmente la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> y sus modificaciones introducidas por la <strong>Ley N° 21.719</strong>, así como las directrices y estándares de la Agencia de Protección de Datos Personales de Chile.
            </p>
          </section>

          {/* 1. Identificación */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              1. Identificación del Responsable del Tratamiento
            </h2>
            <div className="bg-[#FAEDDF]/40 border border-[#EACCA4]/50 rounded-2xl p-5 text-sm space-y-2">
              <p><strong>Titular / Razón Social:</strong> {legalConfig.companyName}</p>
              <p><strong>Nombre de Fantasía:</strong> {legalConfig.brandName}</p>
              <p><strong>RUT:</strong> {legalConfig.companyRut}</p>
              <p><strong>Domicilio Legal:</strong> {legalConfig.companyAddress}</p>
              <p><strong>Correo electrónico de contacto:</strong> <a href={`mailto:${legalConfig.contactEmail}`} className="text-[#8B5E3C] underline">{legalConfig.contactEmail}</a></p>
              <p><strong>Canal para el Ejercicio de Derechos de Privacidad:</strong> <a href={`mailto:${legalConfig.privacyEmail}`} className="text-[#8B5E3C] underline">{legalConfig.privacyEmail}</a></p>
              <p><strong>Teléfono:</strong> <a href={`tel:${legalConfig.phone.replace(/\s+/g, '')}`} className="text-[#8B5E3C]">{legalConfig.phone}</a></p>
            </div>
          </section>

          {/* 2. Datos recopilados */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              2. Datos Personales que Recopilamos
            </h2>
            <p>Recopilamos únicamente los datos pertinentes, adecuados y limitados a lo estrictamente necesario para las finalidades informadas:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Datos de Identificación y Contacto:</strong> Nombre, apellidos, dirección de correo electrónico, número de teléfono (WhatsApp) y mensaje, suministrados voluntariamente al enviar consultas de contacto, agendar citas de bienestar o inscribirse en talleres.
              </li>
              <li>
                <strong>Datos Transaccionales de Reserva:</strong> Fecha, hora y servicio/taller seleccionado para la adecuada coordinación operativa. (Nota: los datos de pago con tarjetas de crédito/débito son procesados directamente por pasarelas certificadas como Mercado Pago; {legalConfig.brandName} nunca tiene acceso ni almacena números de tarjetas bancarias).
              </li>
              <li>
                <strong>Datos Técnicos de Navegación:</strong> Dirección IP anonimizada, tipo de navegador y registros de seguridad para prevenir ataques automatizados, fraudes o envíos masivos de spam.
              </li>
            </ul>
            <p className="mt-3 text-xs bg-[#FAEDDF]/30 border-l-2 border-[#8B5E3C] p-3 text-[#6B5A4E]">
              <strong>No recopilación de datos sensibles:</strong> {legalConfig.brandName} no solicita ni procesa datos sensibles relativos a salud privada detallada, origen racial, convicciones religiosas, opiniones políticas o datos biométricos.
            </p>
          </section>

          {/* 3. Finalidades y Base Legal */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              3. Finalidades del Tratamiento y Base Legal
            </h2>
            <p>Tratamos sus datos con las siguientes finalidades explícitas:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Gestionar y responder a sus consultas, solicitudes de presupuesto o información general.</li>
              <li>Procesar la reserva de citas de bienestar, espacios de cowork y la inscripción a talleres de la comunidad.</li>
              <li>Emitir comprobantes de reserva y recordatorios operativos de las actividades agendadas.</li>
              <li>Enviar comunicaciones informativas o novedades de la comunidad <em>únicamente cuando el titular haya otorgado su consentimiento voluntario</em>.</li>
              <li>Garantizar la seguridad técnica y protección informática de nuestro sitio web.</li>
            </ul>
            <p className="mt-3">
              <strong>Base Jurídica:</strong> El tratamiento se sustenta en el <strong>consentimiento libre, informado y expreso</strong> del Titular otorgado al completar los formularios, así como en la <strong>ejecución de medidas precontractuales o contractuales</strong> solicitadas por el propio usuario (Art. 12 y siguientes de la Ley de Protección de Datos).
            </p>
          </section>

          {/* 4. Cesión y Terceros */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              4. Transferencia y Comunicación de Datos a Terceros
            </h2>
            <p>
              {legalConfig.brandName} <strong>no vende, arrienda, comercializa ni cede</strong> sus datos personales a terceros con fines publicitarios o comerciales ajenos a nuestra operación.
            </p>
            <p className="mt-2">
              Los datos solo son tratados por proveedores técnicos que actúan como encargados del tratamiento bajo estrictos acuerdos de confidencialidad y seguridad:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
              <li>Proveedores de infraestructura en la nube y hosting seguro (Vercel / Supabase).</li>
              <li>Servicios de envío de correos transaccionales (Resend).</li>
              <li>Pasarela de pagos en línea certificada PCI-DSS (Mercado Pago Chile).</li>
            </ul>
          </section>

          {/* 5. Derechos ARCOP */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              5. Derechos del Titular (Derechos ARCOP)
            </h2>
            <p>
              De conformidad con la Ley N° 19.628 y N° 21.719, usted tiene el derecho irrevocable y gratuito de ejercer en cualquier momento sus derechos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="p-4 bg-[#FAEDDF]/40 border border-[#EACCA4]/50 rounded-xl text-sm">
                <strong className="text-[#8B5E3C] block mb-1">Acceso</strong>
                Conocer qué datos personales suyos obran en nuestros registros y cómo están siendo tratados.
              </div>
              <div className="p-4 bg-[#FAEDDF]/40 border border-[#EACCA4]/50 rounded-xl text-sm">
                <strong className="text-[#8B5E3C] block mb-1">Rectificación</strong>
                Solicitar la corrección, actualización o complementación de datos inexactos o incompletos.
              </div>
              <div className="p-4 bg-[#FAEDDF]/40 border border-[#EACCA4]/50 rounded-xl text-sm">
                <strong className="text-[#8B5E3C] block mb-1">Cancelación / Supresión</strong>
                Solicitar la eliminación de sus datos cuando no exista deber legal o contractual de conservarlos.
              </div>
              <div className="p-4 bg-[#FAEDDF]/40 border border-[#EACCA4]/50 rounded-xl text-sm">
                <strong className="text-[#8B5E3C] block mb-1">Oposición</strong>
                Oponerse al tratamiento de sus datos personales para finalidades específicas como comunicaciones promocionales.
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#FDFCF8] border border-[#EACCA4] rounded-xl text-sm">
              <h3 className="font-bold text-[#4A3B32] mb-1">¿Cómo ejercer sus derechos?</h3>
              <p>
                Envíe un correo electrónico a <strong><a href={`mailto:${legalConfig.privacyEmail}`} className="text-[#8B5E3C] underline">{legalConfig.privacyEmail}</a></strong> indicando su nombre completo, copia o número de identificación para validar su identidad y la especificación del derecho que desea ejercer. Responderemos a su requerimiento dentro de los plazos legales establecidos.
              </p>
            </div>
          </section>

          {/* 6. Conservación y Seguridad */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              6. Plazo de Conservación y Medidas de Seguridad
            </h2>
            <p>
              Conservamos sus datos personales únicamente durante el tiempo necesario para la prestación del servicio solicitado, la atención de consultas o el cumplimiento de obligaciones tributarias y legales chilenas.
            </p>
            <p className="mt-2">
              Adoptamos medidas técnicas y organizativas rigurosas para proteger los datos frente a accesos no autorizados, pérdida o alteración, incluyendo comunicaciones cifradas mediante protocolo HTTPS/SSL, control de accesos restringidos y almacenamiento en bases de datos con altos estándares de seguridad.
            </p>
          </section>

          {/* 7. Cookies */}
          <section id="cookies" className="pt-4 border-t border-[#EACCA4]/40">
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              7. Política de Cookies
            </h2>
            <p>
              Una cookie es un pequeño archivo de información que se almacena en su navegador web. En <strong>{legalConfig.brandName}</strong> utilizamos exclusivamente cookies técnicas y de sesión estrictamente necesarias para la navegación fluida, la prevención de ataques automatizados y el funcionamiento seguro de los formularios y la pasarela de pagos.
            </p>
            <p className="mt-2">
              No empleamos cookies publicitarias invasivas de terceros para comercializar perfiles ni realizamos rastreo de comportamiento fuera de nuestro propio sitio. El usuario puede configurar o deshabilitar las cookies en cualquier momento a través del menú de opciones de su navegador web (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
            </p>
          </section>

          {/* 8. Modificaciones */}
          <section>
            <h2 className="text-xl font-bold text-[#4A3B32] mb-3 border-l-4 border-[#8B5E3C] pl-3">
              8. Modificaciones a la Política
            </h2>
            <p>
              {legalConfig.brandName} se reserva el derecho a actualizar esta Política de Privacidad para adecuarla a reformas legislativas o mejoras en nuestras operaciones. Las modificaciones entrarán en vigor a partir de su publicación en esta misma página.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#EACCA4]/40 text-center text-xs text-[#a08a78]">
            {legalConfig.brandName} — {legalConfig.companyAddress} <br />
            Contacto de Privacidad: {legalConfig.privacyEmail}
          </div>
        </div>
      </div>
    </main>
  );
}
