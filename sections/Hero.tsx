"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ParticleSystem } from "@/components/ParticleSystem";
import { useMotionConfig } from "@/hooks/useMotionConfig";
import { profile } from "@/data/portfolioData";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/@#";

/** Decryption/glitch effect — shuffles characters before revealing the real one */
function useDecrypt(finalText: string, delay = 0) {
  const [display, setDisplay] = useState(() => Array(finalText.length).fill("_").join(""));
  const revealedRef = useRef<number[]>([]);
  const rafRef      = useRef<number>(0);
  const startRef    = useRef<number | null>(null);

  useEffect(() => {
    revealedRef.current = [];
    const DURATION = 1800; // ms for full reveal

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts + delay * 1000;
      const elapsed = ts - startRef.current;
      if (elapsed < 0) { rafRef.current = requestAnimationFrame(tick); return; }

      const progress  = Math.min(elapsed / DURATION, 1);
      const targetLen = Math.floor(progress * finalText.length);

      setDisplay(
        finalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < targetLen) return char;
            if (i === targetLen) return CHARS[Math.floor(Math.random() * CHARS.length)];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setDisplay(finalText);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [finalText, delay]);

  return display;
}

export function Hero() {
  const { disabled } = useMotionConfig();
  const name    = useDecrypt(profile.name.toUpperCase(), 0.3);
  const tagline = useDecrypt(profile.tagline, 0.9);

  return (
    <section
      className="relative w-full h-screen-safe overflow-hidden flex flex-col items-center justify-center scanlines"
      aria-label="Hero"
    >
      {/* Background particles */}
      <ParticleSystem />

      {/* Atmospheric background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 80%, rgba(26,26,26,0.8), transparent)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,140,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* HUD frame corners */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-k-orange/40" aria-hidden="true" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-k-orange/40" aria-hidden="true" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-k-orange/40" aria-hidden="true" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-k-orange/40" aria-hidden="true" />

      {/* HUD top data bar */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-k-orange/40 uppercase hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        SYS_REF: 2049.031 // ARCHITECT_HUD // STATUS: ONLINE
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-8">
        {/* Title */}
        <h1
          className="font-display uppercase text-dune-gold leading-none mb-2 sm:mb-4"
          style={{ fontSize: "clamp(2.75rem, 8vw + 0.5rem, 7.5rem)", letterSpacing: "0.12em" }}
        >
          {disabled ? profile.name.toUpperCase() : name}
        </h1>

        {/* Separator line */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-k-orange to-transparent mx-auto mb-3 sm:mb-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
          style={{ width: "clamp(200px, 60%, 600px)" }}
        />

        {/* Tagline */}
        <p
          className="font-mono uppercase text-k-orange/70 tracking-widest mb-6 sm:mb-10"
          style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.875rem)", letterSpacing: "0.3em" }}
        >
          {disabled ? profile.tagline : tagline}
        </p>

        {/* Title */}
        <motion.p
          className="font-mono text-white/50 mb-8 sm:mb-12 max-w-xs sm:max-w-sm mx-auto"
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: disabled ? 0 : 1.6, duration: 0.7 }}
        >
          {profile.title}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: disabled ? 0 : 1.9, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="chromatic font-mono text-[11px] tracking-widest uppercase
                       border border-k-orange text-k-orange px-6 sm:px-8 py-3
                       min-h-[48px] flex items-center hover:bg-k-orange/10
                       transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            [ VIEW PROJECTS ]
          </a>
          <a
            href="#contact"
            className="font-mono text-[11px] tracking-widest uppercase
                       border border-white/20 text-white/50 px-6 sm:px-8 py-3
                       min-h-[48px] flex items-center hover:border-white/40 hover:text-white/70
                       transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            [ CONTACT ]
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: disabled ? 0 : 2.4, duration: 0.8 }}
      >
        <span className="font-mono text-[9px] tracking-widest uppercase text-k-orange/30">
          SCROLL
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-k-orange/40 to-transparent animate-pulse-hud" />
      </motion.div>
    </section>
  );
}
