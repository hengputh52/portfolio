"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ParticleSystem } from "@/components/ParticleSystem";
import { useMotionConfig } from "@/hooks/useMotionConfig";
import { profile } from "@/data/portfolioData";

/* ============================================================
   FLOATING SPACESHIP — simple Spinner/Blade Runner silhouette
   ============================================================ */
function SpaceshipSVG() {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        right:  "clamp(2rem, 8vw, 8rem)",
        bottom: "clamp(6rem, 18vh, 14rem)",
        width:  "clamp(120px, 18vw, 260px)",
        opacity: 0.12,
      }}
      animate={{ y: [0, -16, 0], rotate: [-1, 1, -1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" fill="none">
        {/* Main hull */}
        <ellipse cx="150" cy="60" rx="130" ry="22" stroke="#00F3FF" strokeWidth="1.2" />
        {/* Upper dome */}
        <path d="M 100 60 Q 150 15 200 60" stroke="#00F3FF" strokeWidth="1.2" />
        {/* Lower fin */}
        <path d="M 80 68 L 50 95 L 90 75" stroke="#FF007F" strokeWidth="1" />
        <path d="M 220 68 L 250 95 L 210 75" stroke="#FF007F" strokeWidth="1" />
        {/* Engine glow dots */}
        <circle cx="75"  cy="62" r="3" fill="#FF007F" opacity="0.8" />
        <circle cx="225" cy="62" r="3" fill="#FF007F" opacity="0.8" />
        <circle cx="150" cy="58" r="2" fill="#00F3FF" opacity="0.9" />
        {/* Canopy */}
        <ellipse cx="150" cy="50" rx="25" ry="10" stroke="#00F3FF" strokeWidth="1" strokeDasharray="3 4" />
        {/* Hull lines */}
        <line x1="90"  y1="60" x2="210" y2="60" stroke="#00F3FF" strokeWidth="0.6" opacity="0.5" />
        <line x1="110" y1="55" x2="190" y2="55" stroke="#FF007F" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

/* ============================================================
   COORDINATE GRID CORNER DECORATIONS
   ============================================================ */
function CornerDecorations() {
  return (
    <>
      {/* Top-left crosshair */}
      <div className="absolute top-4 left-4 pointer-events-none" aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#FF007F" strokeWidth="1" opacity="0.4" />
          <line x1="0" y1="0" x2="0" y2="30" stroke="#FF007F" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="0" r="4" stroke="#FF007F" strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="18" x2="40" y2="48" stroke="#00F3FF" strokeWidth="0.5" opacity="0.2" />
          <line x1="18" y1="10" x2="48" y2="40" stroke="#00F3FF" strokeWidth="0.5" opacity="0.2" />
        </svg>
      </div>

      {/* Top-right */}
      <div className="absolute top-4 right-4 pointer-events-none" aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <line x1="80" y1="0" x2="50" y2="0" stroke="#00F3FF" strokeWidth="1" opacity="0.4" />
          <line x1="80" y1="0" x2="80" y2="30" stroke="#00F3FF" strokeWidth="1" opacity="0.4" />
          <circle cx="80" cy="0" r="4" stroke="#00F3FF" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-4 left-4 pointer-events-none" aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <line x1="0" y1="80" x2="30" y2="80" stroke="#00F3FF" strokeWidth="1" opacity="0.4" />
          <line x1="0" y1="80" x2="0" y2="50" stroke="#00F3FF" strokeWidth="1" opacity="0.4" />
          <circle cx="0" cy="80" r="4" stroke="#00F3FF" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-4 right-4 pointer-events-none" aria-hidden="true">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <line x1="80" y1="80" x2="50" y2="80" stroke="#FF007F" strokeWidth="1" opacity="0.4" />
          <line x1="80" y1="80" x2="80" y2="50" stroke="#FF007F" strokeWidth="1" opacity="0.4" />
          <circle cx="80" cy="80" r="4" stroke="#FF007F" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
    </>
  );
}

/* ============================================================
   NEON FLICKER HOOK
   Text is revealed one character at a time (decrypt effect),
   then a neon-sign irregular flicker plays on the full name.
   ============================================================ */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/@#";

function useNeonReveal(finalText: string, delay = 0) {
  const [display, setDisplay] = useState(() => Array(finalText.length).fill("_").join(""));
  const [revealed, setRevealed] = useState(false);
  const rafRef   = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const DURATION = 1600;

    const tick = (ts: number) => {
      if (startRef.current === null) startRef.current = ts + delay * 1000;
      const elapsed  = ts - startRef.current;
      if (elapsed < 0) { rafRef.current = requestAnimationFrame(tick); return; }

      const progress  = Math.min(elapsed / DURATION, 1);
      const targetLen = Math.floor(progress * finalText.length);

      setDisplay(
        finalText.split("").map((char, i) => {
          if (char === " ") return " ";
          if (i < targetLen) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(finalText);
        setRevealed(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [finalText, delay]);

  return { display, revealed };
}

/* ============================================================
   HERO SECTION
   ============================================================ */
export function Hero() {
  const { disabled } = useMotionConfig();
  const { display: nameDisplay, revealed } = useNeonReveal(
    profile.name.toUpperCase(), disabled ? 0 : 0.3
  );
  const { display: tagDisplay } = useNeonReveal(
    profile.tagline, disabled ? 0 : 1.0
  );

  return (
    <section
      className="relative w-full h-screen-safe overflow-hidden flex flex-col items-center justify-center scanlines"
      aria-label="Hero"
    >
      {/* Particles */}
      <ParticleSystem />

      {/* Deep atmospheric radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,0,127,0.07) 0%, rgba(0,243,255,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Subtle coordinate grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage:
            "linear-gradient(rgba(0,243,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Slow scan line */}
      {!disabled && (
        <div
          className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(0,243,255,0.08), transparent)",
            animation: "scan-line 5s linear infinite",
          }}
          aria-hidden="true"
        />
      )}

      {/* Corner HUD decorations */}
      <CornerDecorations />

      {/* Floating spaceship (hidden on sm-) */}
      <div className="hidden sm:block">
        <SpaceshipSVG />
      </div>

      {/* Top HUD bar */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest text-cyan/35 uppercase hidden sm:flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-hud" />
        SYS_REF: 2049.031 {" // "} NEON_HUD {" // "} STATUS: ONLINE
        <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse-hud" style={{ animationDelay: "0.5s" }} />
      </motion.div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 text-center px-4 sm:px-8">

        {/* Name — glitch/decrypt then neon flicker */}
        <h1
          className="font-display uppercase leading-none mb-2 sm:mb-4"
          style={{
            fontSize:    "clamp(2.75rem, 8vw + 0.5rem, 7.5rem)",
            letterSpacing: "0.10em",
            color:       "#00F3FF",
            // Neon flicker only once text is revealed
            animation:   revealed && !disabled ? "neon-flicker 3.5s infinite linear" : undefined,
            textShadow:  revealed
              ? "0 0 7px rgba(0,243,255,0.9), 0 0 20px rgba(0,243,255,0.5), 0 0 40px rgba(0,243,255,0.25)"
              : undefined,
          }}
        >
          {disabled ? profile.name.toUpperCase() : nameDisplay}
        </h1>

        {/* Separator */}
        <motion.div
          className="h-px mx-auto mb-3 sm:mb-5"
          style={{
            background: "linear-gradient(90deg, transparent, #FF007F, #00F3FF, transparent)",
            width: "clamp(200px, 60%, 600px)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: disabled ? 0 : 0.4, duration: 1.2, ease: "easeOut" }}
        />

        {/* Tagline */}
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
          {/* System Status indicator */}
          <motion.span
            className="w-2 h-2 rounded-full bg-cyan flex-shrink-0"
            style={{ boxShadow: "0 0 6px #00F3FF, 0 0 12px rgba(0,243,255,0.5)" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <p
            className="font-mono uppercase text-cyan/70 tracking-widest"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)", letterSpacing: "0.3em" }}
          >
            {disabled ? profile.tagline : tagDisplay}
          </p>
        </div>

        {/* Professional title */}
        <motion.p
          className="font-mono text-white/40 mb-8 sm:mb-10 max-w-sm mx-auto"
          style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: disabled ? 0 : 1.5, duration: 0.7 }}
        >
          {profile.title}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: disabled ? 0 : 1.8, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="chromatic font-mono text-[11px] tracking-widest uppercase
                       border border-neon-pink text-neon-pink px-6 sm:px-8 py-3
                       min-h-[48px] flex items-center justify-center
                       hover:bg-neon-pink/10 transition-all duration-200
                       w-full sm:w-auto"
            style={{ boxShadow: "0 0 12px rgba(255,0,127,0.2)" }}
          >
            [ VIEW PROJECTS ]
          </a>
          <a
            href="#contact"
            className="font-mono text-[11px] tracking-widest uppercase
                       border border-cyan/30 text-cyan/60 px-6 sm:px-8 py-3
                       min-h-[48px] flex items-center justify-center
                       hover:border-cyan/60 hover:text-cyan
                       transition-all duration-200 w-full sm:w-auto"
          >
            [ CONTACT ]
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: disabled ? 0 : 2.4, duration: 0.8 }}
      >
        <span className="font-mono text-[9px] tracking-widest uppercase text-neon-pink/30">
          SCROLL
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-neon-pink/40 to-transparent animate-pulse-hud" />
      </motion.div>
    </section>
  );
}
