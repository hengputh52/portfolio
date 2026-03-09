import type { Metadata } from "next";
import { Syne, Fira_Code } from "next/font/google";
import "./globals.css";
import { CinematicProvider } from "@/providers/CinematicProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio — Solar-Tech Architect",
  description:
    "Full-stack software engineering portfolio. Cloud, mobile, and AI systems built at the intersection of technology and nature.",
  openGraph: {
    title: "Portfolio — Solar-Tech Architect",
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
        className={`${syne.variable} ${firaCode.variable} antialiased bg-obsidian text-ink`}
      >
        <CinematicProvider>
          {children}
        </CinematicProvider>
      </body>
    </html>
  );
}
