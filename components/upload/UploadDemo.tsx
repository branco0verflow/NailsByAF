"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { PremiumButton } from "@/components/ui/PremiumButton";

export function UploadDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  const upload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", "nails-anto-figueroa/client-refs");

      const res = await fetch("/api/cloudinary/upload", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Error subiendo imagen.");
      }

      setUrl(data.secure_url);
    } catch (e: any) {
      setError(e?.message ?? "Error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-white/12 bg-white/6 p-6 backdrop-blur shadow-premium">
      <label className="block text-sm text-white/80">Seleccionar imagen</label>
      <input
        className="mt-2 block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-white/15 file:px-4 file:py-2 file:text-white file:hover:bg-white/20"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <PremiumButton onClick={upload} variant="primary">
          {loading ? "Subiendo..." : "Subir a Cloudinary"}
        </PremiumButton>
        {url ? (
          <PremiumButton href={url} variant="secondary">
            Abrir URL
          </PremiumButton>
        ) : (
          <PremiumButton href="/" variant="secondary">
            Volver al inicio
          </PremiumButton>
        )}
      </div>

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {preview ? (
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <div className="relative aspect-[4/5]">
              <Image src={preview} alt="Preview local" fill className="object-cover" />
            </div>
            <div className="p-3 text-xs text-white/65">Preview local</div>
          </div>
        ) : null}

        {url ? (
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <div className="relative aspect-[4/5]">
              <Image src={url} alt="Imagen subida" fill className="object-cover" />
            </div>
            <div className="p-3 text-xs text-white/65 break-all">{url}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
