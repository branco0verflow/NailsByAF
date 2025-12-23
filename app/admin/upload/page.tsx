import { UploadDemo } from "@/components/upload/UploadDemo";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl">Subir imagen a Cloudinary (demo)</h1>
        <p className="mt-3 text-white/70">
          Esta página es un ejemplo para probar subida y luego usar la URL en tu base de datos o en
          una sección de galería.
        </p>

        <div className="mt-8">
          <UploadDemo />
        </div>

        <p className="mt-10 text-xs text-white/55">
          Nota: no es un panel final. Sirve como base para integrar administración más adelante.
        </p>
      </div>
    </div>
  );
}
