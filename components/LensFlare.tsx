"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeCoarsePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: coarse)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getCoarseSnapshot()       { return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches; }
function getCoarseServerSnapshot() { return true; }

/**
 * Anamorphic cyan/pink lens flare.
 * Desktop: horizontal streak tracks the mouse.
 * Touch:   static atmospheric glow — no JS listeners attached.
 */
export function LensFlare() {
  const isTouch = useSyncExternalStore(subscribeCoarsePointer, getCoarseSnapshot, getCoarseServerSnapshot);
  const [pos, setPos] = useState({ x: 50, y: 15 });
  const posRef = useRef({ x: 50, y: 15 });
  const rafRef = useRef<number>(0);

  const handleMove = useCallback((e: MouseEvent) => {
    posRef.current = {
      x: (e.clientX / window.innerWidth)  * 100,
      y: (e.clientY / window.innerHeight) * 100,
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;
    window.addEventListener("mousemove", handleMove, { passive: true });
    const tick = () => { setPos({ ...posRef.current }); rafRef.current = requestAnimationFrame(tick); };
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
            ellipse 95% 5% at ${x}% ${y}%,
            rgba(0,243,255,0.07) 0%,
            rgba(255,0,127,0.04) 40%,
            transparent 65%
          ),
          radial-gradient(
            ellipse 40% 3% at ${x}% ${y}%,
            rgba(255,255,255,0.03) 0%,
            transparent 55%
          ),
          radial-gradient(
            ellipse 120% 25% at 50% 100%,
            rgba(255,0,127,0.04) 0%,
            rgba(0,243,255,0.02) 40%,
            transparent 70%
          )
        `,
        transition: isTouch ? "none" : "background 0.1s linear",
      }}
    />
  );
}
