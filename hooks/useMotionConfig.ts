"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

// Stable references required by useSyncExternalStore (defined outside component)
function subscribeMobileQuery(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getMobileSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}
function getMobileServerSnapshot() { return false; }

/**
 * Central animation config hook.
 * Every animated component should consume this to respect reduced-motion
 * preferences and automatically scale back effects on mobile.
 */
export function useMotionConfig() {
  const prefersReduced = useReducedMotion();
  const isMobile = useSyncExternalStore(
    subscribeMobileQuery,
    getMobileSnapshot,
    getMobileServerSnapshot,
  );

  const disabled = !!prefersReduced;
  const reduced  = isMobile;

  return {
    /** True when prefers-reduced-motion is set — skip all animation */
    disabled,
    /** True on mobile — use shorter, simpler transitions */
    reduced,

    transition: disabled
      ? { duration: 0 }
      : reduced
        ? { duration: 0.3, ease: "easeOut" as const }
        : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },

    fadeIn: {
      initial: { opacity: disabled ? 1 : 0 },
      animate: { opacity: 1 },
    },

    slideUp: {
      initial: {
        opacity: disabled ? 1 : 0,
        y: disabled ? 0 : reduced ? 15 : 30,
      },
      animate: { opacity: 1, y: 0 },
    },
  };
}
