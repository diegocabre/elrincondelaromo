# 🌿 El Rincón del Aromo - Wellness & Specialty Coffee

Bienvenido al repositorio oficial de **El Rincón del Aromo**, una plataforma web Integral construida de forma moderna para gestionar un espacio físico y digital de cafetería de especialidad, comunidad de coworking, talleres interactivos y terapias de bienestar holístico.

![Arquitectura: Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js&logoColor=white)
![Lenguaje: TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript&logoColor=white)
![Estilos: Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Plataforma: Vercel](https://img.shields.io/badge/Hosting-Vercel-black?logo=vercel&logoColor=white)
![Base de Datos: Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?logo=supabase&logoColor=white)


## 🚀 Características Principales

Esta plataforma no es solo una "Landing Page". Funciona como un sistema SaaS de gestión interna (Dashboard) acoplado a un hermoso frontend para clientes.

### 👥 Portal Público (Frontend)
- **UI/UX Premium:** Diseño *responsive*, minimalista, usando tipografías Montserrat y Dancing Script, con paletas de colores corporativos amaderados y cálidos (`#8B5E3C`, `#FAEDDF`).
- **Talleres y Cursos:** Grillas dinámicas interactuables, Carruseles de fotos en pantalla completa (Lightbox), e inscripciones automatizadas.
- **Terapias y Bienestar:** Reserva de horas por especialidad mediante calendarios inteligentes interactivos de alta fricción cero.
- **Pago en Línea:** Integración nativa con **Mercado Pago Checkout v2**. Interceptación automática de fallos, retornos y éxito de ventas.
- **Optimización SEO:** Indexación robusta, generación dinámica de Sitemaps (`sitemap.xml`) y Open Graph (Tarjetas visuales para WhatsApp e Instagram).

### ⚙️ Panel de Administración (Backend/Dashboard)
- **Seguridad en Capas:** Sistema robusto de inicio de sesión validado mediante **JWT (JSON Web Tokens)** con contraseñas encriptadas nativamente a través de `bcryptjs`.
- **Gestión Multi-Usuario:** Autenticación soportada por una tabla de administradores dedicada en base de datos.
- **Gestión Ágil:** Sección estricta y privada (`/admin`) vigilada por _middlewares_ de Next.js de ruta cero. No indexada por robots (`robots.txt`).
- **CRUD Centralizado:** Administración fluida en base de datos Supabase:
  - Creación dinámica de *Instructores* (con fotos autoprocesadas en Base64 para carga ligera).
  - Configuración de horarios generales y grillas de precios asociadas.
  - Control de Cupos y "Modo Edición" en tiempo real sin recargar la página.
- **Facturación y Reportes:** Módulo de pagos automáticos que notifica cambios de estado directo a la base de datos tras una interacción del cliente con Mercado Pago.
- **Notificaciones:** Motor transaccional **Resend** que despacha automáticamente correos HTML pulidos al estudiante cuando su pago ha sido procesado exitosamente.

---

## 🛠 Stack Tecnológico

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Librería de UI:** [React 19](https://react.dev/) / Framer Motion (para transiciones y animaciones fluidas).
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos:** [Supabase](https://supabase.com/) (PostgreSQL + RLS Policies)
- **Autenticación (Seguridad):** JWT (Stateless Config) sin cookies de 3ros + `bcryptjs` en Edge/Server-Side.
- **Pasarela de Pagos:** [SDK Oficial de Mercado Pago (Node.js)](https://www.mercadopago.cl/developers/)
- **Correos Electrónicos:** [Resend API](https://resend.com/)

---

## 📦 Estructura de Rutas y Páginas

- `/` → Home y Servicios Core.
- `/talleres` → Cartelera de Talleres Activos, Agotados y Realizados + Checkout MP.
- `/bienestar` → Módulo de Terapias y clases de Yoga/Pilates asociado por instructor.
- `/admin` → Raíz del Dashboard.
- `/admin/clases` → Panel relacional de Instructores, Precios y Días.
- `/admin/talleres` → Creación de talleres y llenado de descripciones duales encapsuladas (Cortas/Total).
- `/api/checkout` → API Route que levanta la preferencia a Mercado Pago y guarda pre-registros.
- `/api/confirm-payment` → Recibe la rederección de pago, detecta éxito, muta la BD y envía correos.

---

## 💻 Desarrollo y Despliegue Configuración Local

1. Clona el repositorio e instala dependencias:
   \`\`\`bash
   git clone https://github.com/diegocabre/elrincondelaromo.git
   cd elrincondelaromo
   npm install
   \`\`\`

2. Genera un archivo `.env.local` en la raíz principal. El proyecto depende completamente de estas llaves para funcionar de principio a fin:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_key
   SUPABASE_SERVICE_ROLE_KEY=tu_supabase_secret_role_key
   ADMIN_PASSWORD=tu_admin_pass_fallback
   ADMIN_EMAIL=tu_correo_de_administrador_fallback
   RESEND_API_KEY=tu_resend_api
   MP_ACCESS_TOKEN=APP_USR-tu-token-produccion-mercadopago
   \`\`\`

3. Levanta el servidor local:
   \`\`\`bash
   npm run dev
   \`\`\`

> **Nota para Producción:** Al lanzar sobre Vercel, asegúrate siempre de duplicar estas mismas variables en los *Project Settings > Environment Variables* y volver a hacer *Redeploy* frente a cualquier cambio de token.

---

## 🛡 Permisos y Base de Datos (Supabase SQL)

El proyecto utiliza "Row Level Security" (RLS) habilitado. Asegúrese de que sus tablas en PostgreSQL tengan permisos de inserción públicos (`anon`) para módulos críticos como \`workshop_registrations\` de cara al Webhook/Retorno de Mercado Pago.

---
*Desarrollado con ❤️ para El Rincón del Aromo.*
