"use client";

import { useCinematic } from "@/providers/CinematicProvider";

/**
 * White sleek flying vehicles (Solarpunk Spinners) that drift across the screen.
 * Uses pure CSS keyframe animations defined in globals.css for smooth cross-screen movement.
 * Disabled on mobile via CinematicProvider.
 */

function SpinnerSVG({ width = 200 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 280 80"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      aria-hidden="true"
    >
      {/* Main hull — high-gloss white */}
      <ellipse cx="140" cy="40" rx="118" ry="15" stroke="white" strokeWidth="1.4" fill="rgba(255,255,255,0.05)" />
      {/* Upper dome */}
      <path d="M 92 40 Q 140 10 188 40" stroke="white" strokeWidth="1.3" fill="rgba(255,255,255,0.03)" />
      {/* Control surfaces */}
      <path d="M 68 46 L 38 58 L 76 50" stroke="white" strokeWidth="1" opacity="0.75" />
      <path d="M 212 46 L 242 58 L 204 50" stroke="white" strokeWidth="1" opacity="0.75" />
      {/* Engine nodes — solar orange glow */}
      <circle cx="62" cy="42" r="3" fill="#F97316" opacity="0.9" />
      <circle cx="218" cy="42" r="3" fill="#F97316" opacity="0.9" />
      <circle cx="140" cy="37" r="2" fill="white" opacity="0.9" />
      {/* Canopy */}
      <ellipse cx="140" cy="30" rx="22" ry="8" stroke="white" strokeWidth="0.9" strokeDasharray="3 5" opacity="0.5" />
      {/* Hull details */}
      <line x1="82" y1="40" x2="198" y2="40" stroke="white" strokeWidth="0.5" opacity="0.25" />
      {/* Exhaust trails */}
      <line x1="18" y1="42" x2="55" y2="42" stroke="#F97316" strokeWidth="1.2" opacity="0.45" />
      <line x1="225" y1="42" x2="260" y2="42" stroke="#F97316" strokeWidth="1.2" opacity="0.45" />
    </svg>
  );
}

export function FlyingSpinner() {
  const { particles } = useCinematic();
  if (!particles) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 2 }}
    >
      {/* Spinner 1 — large, left-to-right at 18% height */}
      <div
        style={{
          position:              "absolute",
          top:                   "18%",
          left:                  0,
          opacity:               0,
          animation:             "spinner-drift 30s linear infinite",
          animationDelay:        "2s",
          animationFillMode:     "both",
        }}
      >
        <SpinnerSVG width={200} />
      </div>

      {/* Spinner 2 — medium, right-to-left at 42% height */}
      <div
        style={{
          position:              "absolute",
          top:                   "42%",
          left:                  0,
          opacity:               0,
          animation:             "spinner-drift-rtl 38s linear infinite",
          animationDelay:        "14s",
          animationFillMode:     "both",
        }}
      >
        <SpinnerSVG width={140} />
      </div>

      {/* Spinner 3 — small, left-to-right at 65% height */}
      <div
        style={{
          position:              "absolute",
          top:                   "65%",
          left:                  0,
          opacity:               0,
          animation:             "spinner-drift-3 24s linear infinite",
          animationDelay:        "6s",
          animationFillMode:     "both",
        }}
      >
        <SpinnerSVG width={110} />
      </div>
    </div>
  );
}
