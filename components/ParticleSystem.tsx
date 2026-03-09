"use client";

import { motion } from "framer-motion";
import { useCinematic } from "@/providers/CinematicProvider";

// Generated at module load — not during render, satisfying react-hooks/purity
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id:       i,
  x:        Math.random() * 100,
  yStart:   85 + Math.random() * 15,
  yEnd:     -5 + Math.random() * 25,
  duration: Math.random() * 10 + 8,
  delay:    Math.random() * 8,
  size:     Math.random() < 0.55 ? 1.5 : Math.random() < 0.8 ? 2.5 : 3.5,
  opacity:  Math.random() * 0.35 + 0.1,
  // Mix of emerald pollen and light green spores
  colorIndex: Math.random(),
}));

function getPollenColor(colorIndex: number, opacity: number) {
  if (colorIndex < 0.4) return `rgba(16,185,129,${opacity})`;   // emerald
  if (colorIndex < 0.7) return `rgba(52,211,153,${opacity})`;   // lighter emerald
  if (colorIndex < 0.9) return `rgba(110,231,183,${opacity})`;  // light mint
  return `rgba(249,115,22,${opacity * 0.6})`;                   // rare solar-orange spore
}

/**
 * Floating pollen / spore particle system for the Hero section.
 * Solarpunk aesthetic: green pollen drifting upward like spring blossoms.
 * Disabled on mobile and prefers-reduced-motion.
 */
export function ParticleSystem() {
  const { particles } = useCinematic();

  const fallback = (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(5,150,105,0.06), transparent)",
      }}
    />
  );

  if (!particles) return fallback;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {fallback}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width:           p.size,
            height:          p.size,
            left:            `${p.x}%`,
            backgroundColor: getPollenColor(p.colorIndex, p.opacity),
            boxShadow:       p.colorIndex < 0.7
              ? `0 0 ${p.size * 2}px rgba(16,185,129,${p.opacity * 0.5})`
              : undefined,
          }}
          initial={{ y: `${p.yStart}vh`, opacity: 0 }}
          animate={{ y: `${p.yEnd}vh`, opacity: [0, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
