"use client";

import React from "react";
import { cn } from "./cn";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  rightIcon?: React.ReactNode;
};

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
      className="opacity-70"
      fill="none"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PremiumButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  rightIcon,
}: Props) {
  // Más chico, más delicado, sin “lift” niícono más sutil.
  const base =
    "group relative inline-flex select-none items-center justify-center gap-2 " +
    "rounded-full px-6 py-3 text-[14px] sm:text-[15px] font-medium tracking-tight " +
    "transition-colors duration-200 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 " +
    "active:opacity-90";

  // Primary: minimal, claro, sin sombras 3D ni overlays agresivos.
  const primary =
    "text-slate-900 " +
    "bg-white/85 border border-white/60 " +
    "backdrop-blur-sm " +
    "shadow-[0_10px_24px_rgba(0,0,0,0.18)] " + // sombra suave, no 3D
    "hover:bg-white/90";

  // Secondary: glassy premium, minimal, sin relieve.
  const secondary =
    "text-white " +
    "bg-white/10 border border-white/18 " +
    "shadow-[0_10px_24px_rgba(0,0,0,0.22)] " +
    "hover:bg-white/12 hover:border-white/24";

  const cls = cn(base, variant === "primary" ? primary : secondary, className);

  const isInternal = href?.startsWith("/");

  const content = (
    <>
      <span className="relative">{children}</span>

      <span
        className={cn(
          "ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-200",
          variant === "primary"
            ? "border-black/10 bg-black/0 group-hover:bg-black/5"
            : "border-white/15 bg-white/0 group-hover:bg-white/10"
        )}
        aria-hidden="true"
      >
        {rightIcon ?? <ChevronRight />}
      </span>
    </>
  );

  if (href) {
    if (isInternal) {
      return (
        <Link href={href} className={cls}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {content}
      </a>
    );
  }


  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
