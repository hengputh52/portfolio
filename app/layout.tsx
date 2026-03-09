import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CinematicProvider } from "@/providers/CinematicProvider";
import { FilmGrain }         from "@/components/FilmGrain";
import { LensFlare }         from "@/components/LensFlare";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Neon-Noir Engineer",
  description:
    "Full-stack software engineering portfolio. Cloud, mobile, and AI systems built at the intersection of engineering and aesthetics.",
  openGraph: {
    title: "Portfolio — Neon-Noir Engineer",
    description: "Software architecture, AWS, Flutter, PostgreSQL, and AI integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${jetbrainsMono.variable} antialiased bg-obsidian text-white`}
      >
        <CinematicProvider>
          {/* Fixed atmospheric overlay layers */}
          <FilmGrain />
          <LensFlare />
          {/* TargetingReticle intentionally omitted — default cursor for professionalism */}
          {children}
        </CinematicProvider>
      </body>
    </html>
  );
}
