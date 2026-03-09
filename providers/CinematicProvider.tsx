"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

export interface CinematicConfig {
  customCursor: boolean;
  particles: boolean;
  parallax: boolean;
  lensFlareTracked: boolean;
  animatedGrain: boolean;
  fullAnimations: boolean;
}

const defaultConfig: CinematicConfig = {
  customCursor: false, particles: false, parallax: false,
  lensFlareTracked: false, animatedGrain: false, fullAnimations: false,
};

const CinematicCtx = createContext<CinematicConfig>(defaultConfig);

// --- Stable store subscriptions for useSyncExternalStore ---

function subscribeFine(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getFineSnap() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
}

function subscribeWide(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("resize", cb, { passive: true });
  return () => window.removeEventListener("resize", cb);
}
function getWideSnap()  { return typeof window !== "undefined" && window.innerWidth >= 768; }
function getLargeSnap() { return typeof window !== "undefined" && window.innerWidth >= 1024; }
function getFalse()     { return false; }

export function CinematicProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  const isFine  = useSyncExternalStore(subscribeFine,  getFineSnap,  getFalse);
  const isWide  = useSyncExternalStore(subscribeWide,  getWideSnap,  getFalse);
  const isLarge = useSyncExternalStore(subscribeWide,  getLargeSnap, getFalse);

  const cfg: CinematicConfig = {
    customCursor:     isFine  && !prefersReduced,
    particles:        isWide  && !prefersReduced,
    parallax:                    !prefersReduced,
    lensFlareTracked: isFine,
    animatedGrain:    isLarge && !prefersReduced,
    fullAnimations:   isWide  && !prefersReduced,
  };

  return (
    <CinematicCtx.Provider value={cfg}>
      {children}
    </CinematicCtx.Provider>
  );
}

export const useCinematic = () => useContext(CinematicCtx);
