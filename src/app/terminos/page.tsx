import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Políticas, términos y condiciones comerciales de El Rincón del Aromo y devoluciones de compras en línea.',
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#FDFCF8] flex flex-col items-center pt-32 pb-24 px-6 md:px-12 text-[#4A3B32]">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-xl p-8 md:p-16 border border-[#EACCA4]/30">
        <h1 className="text-4xl md:text-5xl font-bold font-dancing text-[#8B5E3C] mb-8 text-center">Términos y Condiciones</h1>
        
        <div className="space-y-8 text-[#6B5A4E] leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold mb-3 text-[#4A3B32]">1. Consideraciones Generales</h2>
            <p>
              Bienvenido al sitio web de <strong>El Rincón del Aromo</strong>. Al acceder, navegar y/o comprar en nuestro sitio web oficial (www.rincondelaromo.com), usted acepta haber leído, entendido y estar de acuerdo con los siguientes términos y condiciones dispuestos en cumplimiento de la Ley N° 19.496 sobre Protección de los Derechos de los Consumidores en la República de Chile.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#4A3B32]">2. Contratación de Servicios e Inscripción a Talleres</h2>
            <p className="mb-2">
              A través de este sitio web, usted podrá reservar, agendar y comprar cupos para <strong>Talleres, Sesiones de Bienestar y Clases</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>El pago de los talleres asegura un lugar intransferible (salvo aviso previo de 48 horas) dentro de un cupo limitado de participantes.</li>
              <li>Nos reservamos el derecho de reprogramar o cancelar talleres en caso de no cumplir con el aforo mínimo requerido. En tal caso, ofreceremos alternativas de fechas o la devolución íntegra del dinero depositado.</li>
              <li>A fin de garantizar un servicio puntual, se espera la llegada de los participantes al menos 10 minutos antes del inicio de la actividad.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#4A3B32]">3. Derecho a Retracto y Políticas de Devolución</h2>
            <p className="mb-2">
              En conformidad con el Artículo 3° bis de la Ley del Consumidor, <strong>El Rincón del Aromo otorga a sus clientes el Derecho a Retracto</strong> en las siguientes condiciones específicas relativas a nuestros servicios (Talleres y Terapias presenciales):
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Podrá anular o cancelar su compra con derecho a devolución total del dinero si da aviso justificable <strong>con al menos 72 horas de anticipación</strong> antes del inicio programado del evento o taller.</li>
              <li>Las cancelaciones ocurridas en un periodo <strong>menor a 72 horas</strong> de la realización del taller no accederán a devolución, dado que el cupo fue bloqueado imposibilitando su venta, y los insumos fueron adquiridos por parte de nuestra administración. Sin embargo, en casos de fuerza mayor con certicado médico, evaluaremos otorgarle crédito para el futuro u otra clase.</li>
              <li>El canal válido y exclusivo para solicitar devoluciones o alteraciones es el correo electrónico oficial: <strong>contacto@rincondelaromo.com</strong> o mediante nuestro WhatsApp de contacto.</li>
              <li>Toda devolución validada se procesará mediante transferencia electrónica a cuenta bancaria local de Chile en un plazo no mayor a 10 días hábiles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#4A3B32]">4. Medio de Pago Seguro (Mercado Pago)</h2>
            <p>
              Toda transacción realizada en nuestra plataforma digital transita y es validada a través de los servidores de encriptación certificada de <strong>Mercado Pago Chile</strong>. El Rincón del Aromo no recopila ni almacena bajo ningún concepto los números de sus tarjetas de crédito o débito, resguardando íntegramente su privacidad financiera mercantil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#4A3B32]">5. Privacidad y Protección de Datos</h2>
            <p>
              En estricto rigor con la Ley N° 19.628 sobre Protección de la Vida Privada, los datos suministrados por los clientes durante el flujo de la compra (Nombres, Correo Electrónico y Teléfono celular) se utilizarán estricta y puramente para fines operacionales, administrativos y de contacto vital referentes a las sesiones adquiridas por el cliente. En El Rincón del Aromo nos comprometemos de manera intachable a <strong>no distribuir, vendar ni facilitar sus datos personales a terceras partes.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3 text-[#4A3B32]">6. Contacto y Consultas Adicionales</h2>
            <p>
              Si tienes cualquier consulta con respecto a nuestras bases operativas o nuestros sistemas de compras en línea, tu ejecutivo responderá de lunes a viernes en los horarios hábiles mediante nuestros canales presenciales de la cafetería o al correo <strong>contacto@rincondelaromo.com</strong>.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-[#EACCA4]/40 text-center text-xs text-[#a08a78]">
            Última actualización de documento: Documento Actualizado en base a la Ley de Derechos del Consumidor vigente. <br/>
            El Rincón del Aromo - Osorno, Región de Los Lagos, Chile.
          </div>
        </div>
      </div>
    </main>
  );
}
