# Nails Anto Figueroa — Landing (Next.js + Tailwind + GSAP + Cloudinary)

## Requisitos
- Node.js 18+ (recomendado 20+)

## Instalación
```bash
npm install
npm run dev
```

## Estructura principal
- `app/page.tsx` → Landing
- `components/landing/*` → Secciones y carrusel
- `app/api/cloudinary/upload/route.ts` → Endpoint server-side para subir imágenes a Cloudinary
- `app/admin/upload/page.tsx` → Demo rápida para probar la subida y obtener URL

## Configurar Cloudinary
1. Copiá `.env.example` a `.env.local`
2. Completá las variables:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

Luego:
- Abrí `http://localhost:3000/admin/upload` para subir una imagen y recibir `secure_url`.

## Personalización rápida
- WhatsApp: editá el número en:
  - `components/landing/Hero.tsx`
  - `components/landing/Courses.tsx`
- Imágenes: reemplazá en `/public`:
  - `bg-hero.jpg`, `bg-whatwedo.jpg`, `bg-courses.jpg`
  - `work-1.jpg` ... `work-4.jpg`

## Notas de performance
- Las secciones usan `scroll-snap` para una experiencia fluida en móvil.
- Las animaciones usan GSAP + ScrollTrigger, con transiciones suaves y ligeras.
