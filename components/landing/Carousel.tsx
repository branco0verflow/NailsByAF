"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

type Slide = { src: string; alt: string };

export function Carousel({
  slides,
  intervalMs = 2500,
}: {
  slides: Slide[];
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const safeSlides = useMemo(() => (slides?.length ? slides : []), [slides]);

  useEffect(() => {
    if (!safeSlides.length) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % safeSlides.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [safeSlides.length, intervalMs]);

  useEffect(() => {
    if (!frameRef.current) return;
    const el = frameRef.current.querySelector("[data-slide]");
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 10, filter: "blur(6px)", scale: 0.99 },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  }, [active]);

  if (!safeSlides.length) return null;
  const s = safeSlides[active];

  return (
    <div
      ref={frameRef}
      className="relative w-full overflow-hidden rounded-[1.6rem] sm:rounded-[2rem] border border-white/12 bg-white/5"
    >
      {/* Área visual con altura estable en mobile: aspect + min-height */}
      <div
        data-slide
        className={[
          "relative w-full",
          // Fallback de altura para evitar “cortes” en móviles chicos / grids
          "min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]",
        ].join(" ")}
      >
        <Image
          src={s.src}
          alt={s.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 920px"
        />

        {/* Gradiente suave para lectura */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />

        {/* Overlay inferior: dentro del área del slide con padding y safe spacing */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <div className="flex items-end justify-between gap-4">

            <div className="flex items-center gap-2 shrink-0">
              {safeSlides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir a imagen ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                    i === active ? "bg-white" : "bg-white/35 hover:bg-white/60",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Borde/shine sutil arriba (premium minimal, no 3D) */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] sm:rounded-[2rem] ring-1 ring-white/10" />
    </div>
  );
}
