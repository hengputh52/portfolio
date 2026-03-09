"use client";

/**
 * Abstract pulsing SVG for the About / Voight-Kampff section.
 * Renders a layered iris / HUD rings composition.
 */
export function PulsingIrisSVG() {
  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full text-k-orange"
      aria-hidden="true"
    >
      {/* Outer atmospheric ring */}
      <circle
        cx="120" cy="120" r="110"
        fill="none"
        stroke="rgba(255,140,0,0.08)"
        strokeWidth="1"
        className="animate-pulse-hud"
      />
      {/* Dashed scan ring */}
      <circle
        cx="120" cy="120" r="95"
        fill="none"
        stroke="rgba(197,160,89,0.25)"
        strokeWidth="1"
        strokeDasharray="4 8"
      />
      {/* Cross-axis lines */}
      <line x1="120" y1="0" x2="120" y2="240" stroke="rgba(255,140,0,0.06)" strokeWidth="1" />
      <line x1="0" y1="120" x2="240" y2="120" stroke="rgba(255,140,0,0.06)" strokeWidth="1" />
      {/* Mid ring pulsing */}
      <circle
        cx="120" cy="120" r="72"
        fill="none"
        stroke="rgba(255,140,0,0.18)"
        strokeWidth="1.5"
        style={{ animationDelay: "0.8s" }}
        className="animate-pulse-hud"
      />
      {/* Inner iris petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="120" y1="120"
          x2={120 + 55 * Math.cos((i * Math.PI) / 4)}
          y2={120 + 55 * Math.sin((i * Math.PI) / 4)}
          stroke="rgba(197,160,89,0.2)"
          strokeWidth="1"
        />
      ))}
      {/* Inner ring */}
      <circle
        cx="120" cy="120" r="42"
        fill="none"
        stroke="rgba(255,140,0,0.35)"
        strokeWidth="1.5"
        style={{ animationDelay: "1.2s" }}
        className="animate-pulse-hud"
      />
      {/* Core dot */}
      <circle
        cx="120" cy="120" r="6"
        fill="rgba(255,140,0,0.7)"
        className="animate-pulse-hud"
      />
      {/* HUD corner brackets */}
      <path d="M 10 30 L 10 10 L 30 10"   stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" fill="none" />
      <path d="M 210 30 L 210 10 L 190 10" stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" fill="none" />
      <path d="M 10 210 L 10 230 L 30 230" stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" fill="none" />
      <path d="M 210 210 L 210 230 L 190 230" stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
