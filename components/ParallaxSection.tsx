"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface ParallaxSectionProps {
  children: React.ReactNode;
  /** Scroll parallax speed. 0.1 = subtle, 0.4 = dramatic. Default 0.2 */
  speed?: number;
  className?: string;
}

/**
 * Wraps content in a parallax scroll layer.
 * Speed is automatically reduced on mobile and disabled on prefers-reduced-motion.
 */
export function ParallaxSection({
  children,
  speed = 0.2,
  className = "",
}: ParallaxSectionProps) {
  const ref  = useRef<HTMLDivElement>(null);
  const { disabled, reduced } = useMotionConfig();
  const { scrollYProgress }   = useScroll({
    target:  ref,
    offset: ["start end", "end start"],
  });

  const effectiveSpeed = reduced ? speed * 0.3 : speed;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${effectiveSpeed * 100}%`]
  );

  if (disabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {/* will-change-transform puts element on its own compositor layer (GPU) */}
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
