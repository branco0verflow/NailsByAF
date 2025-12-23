"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Carousel } from "./Carousel";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { src: "/work1.png", alt: "Trabajo de uñas 1" },
  { src: "/work2.png", alt: "Trabajo de uñas 2" },
  { src: "/work3.png", alt: "Trabajo de uñas 3" },
  { src: "/work4.png", alt: "Trabajo de uñas 4" },
];

export function WhatWeDo() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-wwd]");

      // Estado inicial solo una vez
      gsap.set(items, { opacity: 0.6, y: 0, filter: "blur(8px)" });

      ScrollTrigger.batch(items, {
        start: "top 85%",
        // Si te interesa que no desaparezca jamás, esto es lo correcto:
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: "auto",
          }),
      });

      // Por si el layout cambia (imagenes/carousel/fonts), refrescamos triggers
      // en el próximo frame para medir correctamente.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative w-fullrelative h-[100svh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/bg-wwd.png)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        {/* En mobile es mejor no forzar 100svh si no es estrictamente necesario */}
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Texto */}
            <div className="lg:col-span-5">
              <div
                data-wwd
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] sm:text-xs tracking-[0.28em] uppercase text-white/80 backdrop-blur"
              >
                Conocé lo que hacemos
              </div>

              <h2
                data-wwd
                className={[
                  "mt-5 text-balance leading-[1.06] text-white",
                  "text-3xl sm:text-4xl md:text-5xl",
                  "font-semibold tracking-[-0.02em]",
                  "[font-family:ui-sans-serif,system-ui,-apple-system,'Segoe_UI',Inter,Helvetica,Arial,'Apple_Color_Emoji','Segoe_UI_Emoji']",
                ].join(" ")}
              >
                Diseño, precisión y estilo en cada detalle.
              </h2>

              

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { k: "Turnos coordinados", v: "Gestión ágil y confirmación clara." },
                  { k: "Diseños a medida", v: "Referencia + asesoría personalizada." },
                  { k: "Higiene y cuidado", v: "Protocolos y materiales de calidad." },
                ].map((item) => (
                  <div
                    key={item.k}
                    data-wwd
                    className="
        rounded-xl sm:rounded-[1.3rem]
        border border-white/12
        bg-white/6 backdrop-blur
        px-3 py-3
        sm:px-4 sm:py-5 md:px-4 md:py-5
      "
                  >
                    <div className="text-[13px] sm:text-[15px] font-semibold text-white/95 leading-tight">
                      {item.k}
                    </div>
                    <div className="mt-1 text-[12px] sm:text-sm leading-snug sm:leading-relaxed text-white/70">
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Carrusel */}
            <div className="lg:col-span-7">
              <div data-wwd className="mx-auto w-full max-w-[560px] lg:max-w-none">
                <Carousel slides={slides} intervalMs={2000} />
              </div>

              <div
                data-wwd
                className="mt-4 text-center text-xs text-white/55 sm:text-sm lg:text-left"
              >
                Trabajos a mano alzada, sin plantillas ni adhesivos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
