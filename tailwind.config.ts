import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60% 60% at 50% 30%, rgba(236,72,153,0.25) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 50% at 80% 20%, rgba(56,189,248,0.18) 0%, rgba(0,0,0,0) 60%)",
      },
      boxShadow: {
        premium: "0 20px 60px rgba(0,0,0,0.55)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
