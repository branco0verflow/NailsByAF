"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionShell } from "./SectionShell";
import { Hero } from "./Hero";
import { WhatWeDo } from "./WhatWeDo";
import { Courses } from "./Courses";

gsap.registerPlugin(ScrollTrigger);

export function Landing() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Premium scroll snap hint + subtle parallax
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={wrapRef}
      className="min-h-screen w-full bg-black text-white "
      style={{
        scrollSnapType: "y mandatory",
      }}
    >
      <SectionShell id="home">
        <div data-parallax className="absolute inset-0" />
        <Hero />
      </SectionShell>

      <SectionShell id="whatwedo">
        <div data-parallax className="absolute inset-0" />
        <WhatWeDo />
      </SectionShell>

      <SectionShell id="cursos" className="snap-end">
        <div data-parallax className="absolute inset-0" />
        <Courses />
      </SectionShell>
    </main>
  );
}
