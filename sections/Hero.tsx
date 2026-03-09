"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ParticleSystem } from "@/components/ParticleSystem";
import { useMotionConfig } from "@/hooks/useMotionConfig";
import { profile } from "@/data/portfolioData";

/* ============================================================
   WHITE SOLARPUNK SPINNER — high-gloss white flying vehicle
   ============================================================ */
function SolarpunkSpinner() {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        right:   "clamp(2rem, 8vw, 8rem)",
        bottom:  "clamp(6rem, 18vh, 14rem)",
        width:   "clamp(120px, 18vw, 240px)",
        opacity: 0.18,
      }}
      animate={{ y: [0, -14, 0], rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg" fill="none">
        {/* Main hull — glossy white */}
        <ellipse cx="140" cy="40" rx="118" ry="15" stroke="white" strokeWidth="1.4" fill="rgba(255,255,255,0.05)" />
        {/* Upper dome */}
        <path d="M 92 40 Q 140 12 188 40" stroke="white" strokeWidth="1.3" fill="rgba(255,255,255,0.03)" />
        {/* Lower control surfaces */}
        <path d="M 68 46 L 38 58 L 76 50" stroke="white" strokeWidth="1" opacity="0.8" />
        <path d="M 212 46 L 242 58 L 204 50" stroke="white" strokeWidth="1" opacity="0.8" />
        {/* Engine glow — solar orange */}
        <circle cx="62" cy="42" r="3" fill="#F97316" opacity="0.95" />
        <circle cx="218" cy="42" r="3" fill="#F97316" opacity="0.95" />
        <circle cx="140" cy="37" r="2" fill="white" opacity="0.9" />
        {/* Canopy */}
        <ellipse cx="140" cy="32" rx="22" ry="7" stroke="white" strokeWidth="0.9" strokeDasharray="3 5" opacity="0.55" />
        {/* Hull scan lines */}
        <line x1="82" y1="40" x2="198" y2="40" stroke="white" strokeWidth="0.5" opacity="0.3" />
        <line x1="100" y1="36" x2="180" y2="36" stroke="white" strokeWidth="0.4" opacity="0.2" />
        {/* Exhaust trails — solar orange */}
        <line x1="22" y1="42" x2="55" y2="42" stroke="#F97316" strokeWidth="1" opacity="0.5" />
        <line x1="225" y1="42" x2="256" y2="42" stroke="#F97316" strokeWidth="1" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ============================================================
   LEAF CORNER DECORATIONS
   ============================================================ */
function LeafCorners() {
  return (
    <>
      {/* Top-left leaf motif */}
      <div className="absolute top-4 left-4 pointer-events-none" aria-hidden="true">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M 6 66 Q 8 44 24 28 Q 38 14 64 8" stroke="rgba(5,150,105,0.35)" strokeWidth="1.5" fill="none" />
          <path d="M 6 66 Q 14 50 32 40 Q 48 30 64 8" stroke="rgba(5,150,105,0.15)" strokeWidth="1" fill="none" />
          <circle cx="6"  cy="66" r="3" stroke="rgba(5,150,105,0.4)" strokeWidth="1" fill="rgba(5,150,105,0.08)" />
          <circle cx="64" cy="8"  r="2" stroke="rgba(8,145,178,0.5)" strokeWidth="1" fill="rgba(8,145,178,0.1)" />
          <line x1="6" y1="66" x2="24" y2="66" stroke="rgba(5,150,105,0.25)" strokeWidth="0.8" />
          <line x1="6" y1="66" x2="6"  y2="44" stroke="rgba(5,150,105,0.25)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Top-right */}
      <div className="absolute top-4 right-4 pointer-events-none" aria-hidden="true">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <path d="M 66 66 Q 64 44 48 28 Q 34 14 8 8" stroke="rgba(8,145,178,0.35)" strokeWidth="1.5" fill="none" />
          <path d="M 66 66 Q 58 50 40 40 Q 24 30 8 8" stroke="rgba(8,145,178,0.15)" strokeWidth="1" fill="none" />
          <circle cx="66" cy="66" r="3" stroke="rgba(8,145,178,0.4)" strokeWidth="1" fill="rgba(8,145,178,0.08)" />
          <line x1="66" y1="66" x2="44" y2="66" stroke="rgba(8,145,178,0.25)" strokeWidth="0.8" />
          <line x1="66" y1="66" x2="66" y2="44" stroke="rgba(8,145,178,0.25)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Bottom-left */}
      <div className="absolute bottom-4 left-4 pointer-events-none" aria-hidden="true">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <line x1="0" y1="72" x2="28" y2="72" stroke="rgba(8,145,178,0.3)" strokeWidth="1" />
          <line x1="0" y1="72" x2="0"  y2="44" stroke="rgba(8,145,178,0.3)" strokeWidth="1" />
          <circle cx="0" cy="72" r="3" stroke="rgba(8,145,178,0.35)" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom-right */}
      <div className="absolute bottom-4 right-4 pointer-events-none" aria-hidden="true">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <line x1="72" y1="72" x2="44" y2="72" stroke="rgba(5,150,105,0.3)" strokeWidth="1" />
          <line x1="72" y1="72" x2="72" y2="44" stroke="rgba(5,150,105,0.3)" strokeWidth="1" />
          <circle cx="72" cy="72" r="3" stroke="rgba(5,150,105,0.35)" strokeWidth="1" />
        </svg>
      </div>
    </>
  );
}

/* ============================================================
   GROWING TEXT HOOK
   Each word "grows" from scale(0) with organic spring physics.
   ============================================================ */
function GrowingTitle({
  text,
  delay = 0,
  color,
  fontSize,
}: {
  text: string;
  delay?: number;
  color: string;
  fontSize: string;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.3em" }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", color, fontSize, fontFamily: "inherit", letterSpacing: "inherit" }}
          initial={{ opacity: 0, scale: 0.4, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.12,
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ============================================================
   POWER SOURCE INDICATOR
   "System Power: Solar | Grid Status: Optimal"
   ============================================================ */
function PowerSourceIndicator() {
  return (
    <motion.div
      className="absolute top-6 right-4 sm:right-6 pointer-events-none hidden sm:flex items-center gap-2"
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      aria-hidden="true"
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0 animate-solar-pulse"
        style={{ background: "#F97316" }}
      />
      <span
        className="font-mono text-[8px] tracking-widest uppercase"
        style={{ color: "rgba(249,115,22,0.7)" }}
      >
        System Power: Solar{" "}
        <span style={{ color: "rgba(5,150,105,0.6)" }}>| Grid Status: Optimal</span>
      </span>
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "#059669", boxShadow: "0 0 5px #059669" }}
      />
    </motion.div>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
export function Hero() {
  const { disabled } = useMotionConfig();

  return (
    <section
      className="relative w-full h-screen-safe overflow-hidden flex flex-col items-center justify-center"
      aria-label="Hero"
    >
      {/* Nature particles (pollen/spores) */}
      <ParticleSystem />

      {/* Bright radial gradient — warm sunlight feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(5,150,105,0.08) 0%, rgba(8,145,178,0.04) 40%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(249,115,22,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Subtle organic grid — rice field / solar panel pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(rgba(5,150,105,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Horizon shimmer line — represents rice field horizon */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "28%",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(5,150,105,0.2), rgba(8,145,178,0.15), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Corner leaf decorations */}
      <LeafCorners />

      {/* Floating white solarpunk spinner (hidden on mobile) */}
      <div className="hidden sm:block">
        <SolarpunkSpinner />
      </div>

      {/* Power Source indicator (top-right) */}
      {!disabled && <PowerSourceIndicator />}

      {/* Top HUD bar */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-widest uppercase hidden sm:flex items-center gap-3"
        style={{ color: "rgba(5,150,105,0.5)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-k-orange animate-pulse-hud" />
        Solar-Tech Architect {" // "} Phnom Penh {" // "} Status: Growing
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse-hud"
          style={{ background: "#0891B2", animationDelay: "0.5s" }}
        />
      </motion.div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="relative z-10 text-center px-4 sm:px-8">

        {/* Name — GROWING animation (organic spring) */}
        <h1
          className="font-display uppercase leading-none mb-2 sm:mb-4"
          style={{ letterSpacing: "0.08em" }}
        >
          {disabled ? (
            <span
              style={{
                fontSize: "clamp(2.75rem, 8vw + 0.5rem, 7.5rem)",
                color: "#059669",
              }}
            >
              {profile.name.toUpperCase()}
            </span>
          ) : (
            <GrowingTitle
              text={profile.name.toUpperCase()}
              delay={0.3}
              color="#059669"
              fontSize="clamp(2.75rem, 8vw + 0.5rem, 7.5rem)"
            />
          )}
        </h1>

        {/* Separator — emerald to cyan gradient */}
        <motion.div
          className="h-px mx-auto mb-3 sm:mb-5"
          style={{
            background: "linear-gradient(90deg, transparent, #059669, #0891B2, transparent)",
            width: "clamp(200px, 60%, 600px)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: disabled ? 0 : 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Tagline */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: disabled ? 0 : 0.9, duration: 0.6 }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{
              background: "#059669",
              boxShadow: "0 0 6px #059669, 0 0 12px rgba(5,150,105,0.4)",
              animation: "solar-pulse 2.5s ease-in-out infinite",
            }}
          />
          <p
            className="font-mono uppercase tracking-widest"
            style={{
              fontSize: "clamp(0.6rem, 1.2vw, 0.8rem)",
              letterSpacing: "0.28em",
              color: "rgba(5,150,105,0.75)",
            }}
          >
            {profile.tagline}
          </p>
        </motion.div>

        {/* Professional title */}
        <motion.p
          className="font-mono mb-8 sm:mb-10 max-w-sm mx-auto"
          style={{
            fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
            color: "rgba(6,78,59,0.55)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: disabled ? 0 : 1.4, duration: 0.7 }}
        >
          {profile.title}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: disabled ? 0 : 1.7, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="chromatic font-mono text-[11px] tracking-widest uppercase
                       min-h-[48px] flex items-center justify-center
                       px-6 sm:px-8 py-3 w-full sm:w-auto
                       transition-all duration-200"
            style={{
              border: "1px solid rgba(5,150,105,0.5)",
              color: "#059669",
              background: "rgba(5,150,105,0.05)",
              boxShadow: "0 0 12px rgba(5,150,105,0.15)",
            }}
          >
            [ VIEW PROJECTS ]
          </a>
          <a
            href="#contact"
            className="font-mono text-[11px] tracking-widest uppercase
                       min-h-[48px] flex items-center justify-center
                       px-6 sm:px-8 py-3 w-full sm:w-auto
                       transition-all duration-200"
            style={{
              border: "1px solid rgba(8,145,178,0.35)",
              color: "rgba(8,145,178,0.75)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(8,145,178,0.65)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#0891B2";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(8,145,178,0.35)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(8,145,178,0.75)";
            }}
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
        transition={{ delay: disabled ? 0 : 2.2, duration: 0.8 }}
      >
        <span
          className="font-mono text-[9px] tracking-widest uppercase"
          style={{ color: "rgba(5,150,105,0.4)" }}
        >
          SCROLL
        </span>
        <div
          className="w-px h-8 animate-pulse-hud"
          style={{ background: "linear-gradient(to bottom, rgba(5,150,105,0.5), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
