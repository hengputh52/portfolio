"use client";

/**
 * Abstract pulsing holographic iris SVG.
 * Uses Neon Pink + Electric Cyan palette.
 */
export function PulsingIrisSVG() {
  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Outer atmospheric ring — cyan */}
      <circle cx="120" cy="120" r="110" fill="none"
        stroke="rgba(0,243,255,0.07)" strokeWidth="1"
        className="animate-pulse-hud"
      />
      {/* Dashed scan ring — pink */}
      <circle cx="120" cy="120" r="95" fill="none"
        stroke="rgba(255,0,127,0.2)" strokeWidth="1"
        strokeDasharray="4 8"
      />
      {/* Cross-axis lines */}
      <line x1="120" y1="0" x2="120" y2="240" stroke="rgba(0,243,255,0.05)" strokeWidth="1" />
      <line x1="0" y1="120" x2="240" y2="120" stroke="rgba(0,243,255,0.05)" strokeWidth="1" />
      {/* Diagonal grid */}
      <line x1="20"  y1="20"  x2="220" y2="220" stroke="rgba(255,0,127,0.04)" strokeWidth="1" />
      <line x1="220" y1="20"  x2="20"  y2="220" stroke="rgba(255,0,127,0.04)" strokeWidth="1" />

      {/* Mid ring — cyan glow */}
      <circle cx="120" cy="120" r="72" fill="none"
        stroke="rgba(0,243,255,0.18)" strokeWidth="1.5"
        style={{ animationDelay: "0.8s" }} className="animate-pulse-hud"
      />
      {/* Inner iris spokes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i}
          x1="120" y1="120"
          x2={120 + 55 * Math.cos((i * Math.PI) / 4)}
          y2={120 + 55 * Math.sin((i * Math.PI) / 4)}
          stroke="rgba(255,0,127,0.18)" strokeWidth="1"
        />
      ))}

      {/* Inner ring — pink */}
      <circle cx="120" cy="120" r="42" fill="none"
        stroke="rgba(255,0,127,0.35)" strokeWidth="1.5"
        style={{ animationDelay: "1.2s" }} className="animate-pulse-hud"
      />
      {/* Core dot — cyan */}
      <circle cx="120" cy="120" r="5" fill="rgba(0,243,255,0.8)"
        className="animate-pulse-hud"
      />
      {/* Core outer ring */}
      <circle cx="120" cy="120" r="9" fill="none"
        stroke="rgba(0,243,255,0.4)" strokeWidth="1"
      />

      {/* HUD corner brackets */}
      <path d="M 10 30 L 10 10 L 30 10"   stroke="rgba(255,0,127,0.5)"  strokeWidth="1.5" fill="none" />
      <path d="M 210 30 L 210 10 L 190 10" stroke="rgba(0,243,255,0.5)" strokeWidth="1.5" fill="none" />
      <path d="M 10 210 L 10 230 L 30 230" stroke="rgba(0,243,255,0.5)" strokeWidth="1.5" fill="none" />
      <path d="M 210 210 L 210 230 L 190 230" stroke="rgba(255,0,127,0.5)" strokeWidth="1.5" fill="none" />

      {/* Data readout labels */}
      <text x="12"  y="8"  fontFamily="'JetBrains Mono', monospace" fontSize="5" fill="rgba(255,0,127,0.45)">SYS_01</text>
      <text x="168" y="8"  fontFamily="'JetBrains Mono', monospace" fontSize="5" fill="rgba(0,243,255,0.45)">ID_SCAN</text>
      <text x="12"  y="237" fontFamily="'JetBrains Mono', monospace" fontSize="5" fill="rgba(0,243,255,0.45)">ACTIVE</text>
      <text x="170" y="237" fontFamily="'JetBrains Mono', monospace" fontSize="5" fill="rgba(255,0,127,0.45)">LOCKED</text>
    </svg>
  );
}
