import type { Metadata } from "next";
import { Syncopate, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CinematicProvider } from "@/providers/CinematicProvider";
import { TargetingReticle } from "@/components/TargetingReticle";
import { FilmGrain } from "@/components/FilmGrain";
import { LensFlare } from "@/components/LensFlare";

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio — Cinematic Architect",
  description:
    "Full-stack engineering portfolio. High-performance digital experiences built at the intersection of engineering and aesthetics.",
  openGraph: {
    title: "Portfolio — Cinematic Architect",
    description: "Full-stack engineering portfolio.",
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
        className={`${syncopate.variable} ${jetbrainsMono.variable} antialiased bg-obsidian text-white`}
      >
        <CinematicProvider>
          {/* Fixed overlay layers — rendered above all page content */}
          <FilmGrain />
          <LensFlare />
          <TargetingReticle />
          {children}
        </CinematicProvider>
      </body>
    </html>
  );
}
