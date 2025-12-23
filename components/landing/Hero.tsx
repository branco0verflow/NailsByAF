"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { Logo } from "@/components/ui/Logo";
import { TypeEffect } from "@/components/ui/TypeEffect";

const HERO_BACKGROUNDS = [
  { img: "/hero11.png" },
  { img: "/hero22.png" },
  { img: "/hero333.png" },
  { img: "/hero44.png" },
  { img: "/hero55.png" },
];

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bgA = useRef<HTMLDivElement | null>(null);
  const bgB = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);
  const [front, setFront] = useState<"A" | "B">("A");

  // Mantener referencias “live” para el intervalo sin meter index/front en deps.
  const indexRef = useRef(index);
  const frontRef = useRef(front);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    frontRef.current = front;
  }, [front]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const interval = setInterval(() => {
        const currentIndex = indexRef.current;
        const currentFront = frontRef.current;

        const next = (currentIndex + 1) % HERO_BACKGROUNDS.length;

        const incoming = currentFront === "A" ? bgB.current : bgA.current;
        const outgoing = currentFront === "A" ? bgA.current : bgB.current;

        if (!incoming || !outgoing) return;

        incoming.style.backgroundImage = `url(${HERO_BACKGROUNDS[next].img})`;

        gsap.set(incoming, { opacity: 0, filter: "blur(14px)", scale: 1.04 });
        gsap.to(incoming, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        });

        gsap.to(outgoing, {
          opacity: 0,
          filter: "blur(18px)",
          duration: 1.8,
          ease: "power3.out",
        });

        // Actualizás estado una sola vez por tick
        setFront(currentFront === "A" ? "B" : "A");
        setIndex(next);
      }, 5000);

      return () => clearInterval(interval);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const typingTexts = useMemo(
    () => ["Tu turno es un espacio pensado solo para vos.", 
      "Cada diseño requiere tiempo, precisión y cuidado.", 
      "Tiempo, técnica y amor en cada detalle. 💕",
      "Nos tomamos el tiempo que tu diseño merece."],
    []
  );

  return (
    <section ref={rootRef} className="relative h-[100svh] w-full overflow-hidden">
      {/* BACKGROUNDS */}
      <div
        ref={bgA}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BACKGROUNDS[0].img})` }}
      />
      <div ref={bgB} className="absolute inset-0 bg-cover bg-center opacity-0" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/85" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-10">
          <Logo />
        </div>

        <div className="w-full max-w-lg">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <PremiumButton href="https://wa.me/59891307261">Reservar turno</PremiumButton>

            <PremiumButton href="#cursos" variant="secondary">
              Cursos Nail Art
            </PremiumButton>
          </div>

          <div className="mt-6 text-sm sm:text-base text-white/70">

            <TypeEffect
              texts={typingTexts}
              typingSpeed={60}
              deletingSpeed={45}
              holdMs={4500}
              gapMs={500}
              caret
            />



          </div>

        </div>
      </div>
    </section>
  );
}

