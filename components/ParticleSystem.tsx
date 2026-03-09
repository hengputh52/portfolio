"use client";

import { motion } from "framer-motion";
import { useCinematic } from "@/providers/CinematicProvider";

// Generated at module load — not during render, satisfying react-hooks/purity
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id:       i,
  x:        Math.random() * 100,
  yStart:   80 + Math.random() * 20,
  yEnd:     -10 + Math.random() * 30,
  duration: Math.random() * 10 + 8,
  delay:    Math.random() * 8,
  size:     Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3,
  opacity:  Math.random() * 0.4 + 0.1,
}));

/**
 * Floating dust/sand particle system for the Hero section.
 * Automatically disabled on mobile (via CinematicProvider) and on
 * prefers-reduced-motion to avoid battery drain and layout jank.
 */
export function ParticleSystem() {
  const { particles } = useCinematic();

  const fallback = (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,140,0,0.05), transparent)",
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
            backgroundColor: `rgba(197,160,89,${p.opacity})`,
          }}
          initial={{ y: `${p.yStart}vh`, opacity: 0 }}
          animate={{ y: `${p.yEnd}vh`, opacity: [0, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
