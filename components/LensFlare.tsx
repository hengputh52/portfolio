"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// Stable references for useSyncExternalStore
function subscribeCoarsePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getCoarseSnapshot() {
  if (typeof window === "undefined") return true; // SSR: assume touch
  return window.matchMedia("(pointer: coarse)").matches;
}
function getCoarseServerSnapshot() { return true; }

/**
 * Anamorphic lens flare.
 * On desktop: a wide horizontal streak that follows the mouse.
 * On touch devices: a static atmospheric glow — no JS event listeners attached.
 */
export function LensFlare() {
  const isTouch = useSyncExternalStore(
    subscribeCoarsePointer,
    getCoarseSnapshot,
    getCoarseServerSnapshot,
  );

  const [pos, setPos] = useState({ x: 50, y: 15 });
  const posRef = useRef({ x: 50, y: 15 });
  const rafRef = useRef<number>(0);

  const handleMove = useCallback((e: MouseEvent) => {
    posRef.current = {
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;

    window.addEventListener("mousemove", handleMove, { passive: true });

    const tick = () => {
      setPos({ ...posRef.current });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, handleMove]);

  const { x, y } = isTouch ? { x: 50, y: 15 } : pos;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(
            ellipse 90% 6% at ${x}% ${y}%,
            rgba(255,140,0,0.07) 0%,
            rgba(197,160,89,0.04) 35%,
            transparent 65%
          ),
          radial-gradient(
            ellipse 35% 3% at ${x}% ${y}%,
            rgba(255,240,200,0.04) 0%,
            transparent 55%
          )
        `,
        transition: isTouch ? "none" : "background 0.12s linear",
      }}
    />
  );
}
