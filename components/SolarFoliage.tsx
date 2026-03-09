"use client";

import { motion } from "framer-motion";
import { useCinematic } from "@/providers/CinematicProvider";

/**
 * A single swaying leaf SVG element.
 */
function Leaf({
  size,
  rotation,
  delay,
  flipX = false,
  style,
}: {
  size:     number;
  rotation: number;
  delay:    number;
  flipX?:   boolean;
  style?:   React.CSSProperties;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width:            size,
        height:           size * 1.5,
        transformOrigin:  "bottom center",
        transform:        `rotate(${rotation}deg) ${flipX ? "scaleX(-1)" : ""}`,
        ...style,
      }}
      animate={{
        rotate: [rotation - 4, rotation + 5, rotation - 2, rotation + 2, rotation - 4],
      }}
      transition={{
        duration: 4 + delay * 0.6,
        repeat:   Infinity,
        ease:     "easeInOut",
        times:    [0, 0.28, 0.5, 0.72, 1],
      }}
    >
      <svg
        viewBox="0 0 40 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.5}
        aria-hidden="true"
      >
        {/* Leaf blade */}
        <path
          d="M 20 60 Q 4 44 6 22 Q 8 6 20 2 Q 32 6 34 22 Q 36 44 20 60 Z"
          fill="rgba(16,185,129,0.2)"
          stroke="rgba(5,150,105,0.45)"
          strokeWidth="1"
        />
        {/* Midrib */}
        <path d="M 20 60 Q 20 32 20 2" stroke="rgba(5,150,105,0.35)" strokeWidth="0.9" />
        {/* Veins left */}
        <path d="M 20 48 Q 11 40 9 30"  stroke="rgba(5,150,105,0.2)" strokeWidth="0.6" />
        <path d="M 20 36 Q 13 30 11 22" stroke="rgba(5,150,105,0.2)" strokeWidth="0.6" />
        {/* Veins right */}
        <path d="M 20 48 Q 29 40 31 30" stroke="rgba(5,150,105,0.2)" strokeWidth="0.6" />
        <path d="M 20 36 Q 27 30 29 22" stroke="rgba(5,150,105,0.2)" strokeWidth="0.6" />
      </svg>
    </motion.div>
  );
}

/**
 * Swaying foliage in the four corners of the viewport.
 * Disabled on mobile via CinematicProvider.
 */
export function SolarFoliage() {
  const { particles } = useCinematic();
  if (!particles) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Bottom-left cluster */}
      <Leaf size={50} rotation={-42} delay={0}   style={{ bottom: "4vh",  left: "-4px" }} />
      <Leaf size={38} rotation={-18} delay={1.5} style={{ bottom: "8vh",  left: "20px" }} />
      <Leaf size={62} rotation={-58} delay={0.8} style={{ bottom: "2vh",  left: "-8px" }} />
      <Leaf size={30} rotation={0}   delay={2.2} style={{ bottom: "14vh", left: "28px" }} />

      {/* Bottom-right cluster */}
      <Leaf size={46} rotation={42}  delay={1.2} flipX style={{ bottom: "5vh",  right: "-4px" }} />
      <Leaf size={35} rotation={20}  delay={0.4} flipX style={{ bottom: "9vh",  right: "18px" }} />
      <Leaf size={56} rotation={58}  delay={1.8} flipX style={{ bottom: "2vh",  right: "-8px" }} />

      {/* Top-left subtle accents */}
      <Leaf size={28} rotation={-25} delay={1.8} style={{ top: "5vh",  left: "-4px" }} />
      <Leaf size={22} rotation={8}   delay={0.6} style={{ top: "2vh",  left: "18px" }} />

      {/* Top-right subtle accents */}
      <Leaf size={25} rotation={18}  delay={1.4} flipX style={{ top: "4vh",  right: "-2px" }} />
    </div>
  );
}
