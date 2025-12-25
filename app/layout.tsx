import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  openGraph: {
    title: "Nails by Anto Figueroa",
    description: "Reservá tu turno online de forma rápida y sencilla",
    icons: {
    icon: "/favicon.svg",
  },
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nails Anto Figueroa",
      },
    ],
    type: "website",
  },
};

