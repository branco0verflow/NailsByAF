"use client";

import { PremiumButton } from "@/components/ui/PremiumButton";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9A4.75 4.75 0 0 1 16.5 21.25h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 16.1a4.1 4.1 0 1 0 0-8.2 4.1 4.1 0 0 0 0 8.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M17.2 7.1h.01"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 3v10.2a3.8 3.8 0 1 1-3-3.72V7.2a6.2 6.2 0 1 0 6 6.18V8.1c1.2.9 2.6 1.4 4 1.4V6.4c-2.2 0-4-1.8-4-4h-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 8.5V7.2c0-1 .8-1.8 1.8-1.8H18V2.9h-2.2A5.3 5.3 0 0 0 10.5 8.2v.3H8V11h2.5v10.1H14V11h3l.6-2.5H14Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Social = {
  label: string;
  href: string; // luego lo cambiás
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export function Courses() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-c]", { opacity: 0, y: 18, filter: "blur(8px)" });

      ScrollTrigger.batch("[data-c]", {
        start: "top 82%",
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            stagger: 0.08,
          }),
        once: true,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const socials: Social[] = [
    { label: "Instagram", href: "#", Icon: InstagramIcon },
    { label: "TikTok", href: "#", Icon: TikTokIcon },
    { label: "Facebook", href: "#", Icon: FacebookIcon },
  ];

  return (
    <section ref={rootRef} className="relative w-fullrelative h-[100svh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/bg-courses.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 py-14 sm:py-16">


        {/* Mobile-first: mejor legibilidad + ancho controlado */}
        <div className="max-w-3xl">
          <div
            data-c
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] tracking-[0.28em] uppercase text-white/80 backdrop-blur"
          >
            Cursos Nail Art
          </div>

          {/* H2: tipografía profesional (stack elegante) */}
          <h2
            data-c
            className={[
              "mt-5 text-balance leading-[1.06] text-white",
              "text-3xl sm:text-4xl md:text-5xl",
              "font-semibold tracking-[-0.02em]",
              // stack: más premium que el default sin requerir fuente externa
              "[font-family:ui-sans-serif,system-ui,-apple-system,'Segoe_UI',Inter,Helvetica,Arial,'Apple_Color_Emoji','Segoe_UI_Emoji']",
            ].join(" ")}
          >
            Aprendé técnicas actuales, desde cero o perfeccionamiento.
          </h2>

          <p
            data-c
            className="mt-4 text-sm sm:text-base leading-relaxed text-white/75 text-balance"
          >
            Programas cortos, prácticos y orientados a resultados. Modalidad Online. Consultá fecha y disponibilidad.
          </p>

          {/* CTAs: full-width en mobile, lado a lado en sm+ */}
          <div data-c className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PremiumButton
              href="https://wa.me/5989000000?text=Hola%21%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20de%20los%20cursos%20Nail%20Art"
              variant="primary"
              className="w-full"
            >
              Pedir info por WhatsApp
            </PremiumButton>

            <PremiumButton href="#home" variant="secondary" className="w-full">
              Volver al inicio
            </PremiumButton>
          </div>
        </div>

        {/* Cards: 1 columna en mobile, 3 en desktop */}
        <div className="mt-10 sm:mt-12 mb-12 max-sm:hidden grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { k: "Nivel Inicial", v: "Bases, preparación, esmaltado y cuidado." },
            { k: "Nail Art", v: "Diseños, líneas finas, efectos y tendencias." },
            { k: "Perfeccionamiento", v: "Velocidad, prolijidad y técnica avanzada." },
          ].map((item) => (
            <div
              key={item.k}
              data-c
              className="rounded-[1.4rem] border border-white/12 bg-white/6 p-5 backdrop-blur"
            >
              <div className="text-[15px] font-semibold text-white/95">{item.k}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/70">{item.v}</div>
            </div>
          ))}
        </div>

        {/* Footer: social icons + copyright */}
        <footer className="mt-12  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <div>
            © {new Date().getFullYear()} Nails by Demo
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 backdrop-blur transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <Icon className="h-[18px] w-[18px] text-white/75 transition-colors group-hover:text-white/90" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
