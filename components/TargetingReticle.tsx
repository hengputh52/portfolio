"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Stable references for useSyncExternalStore
function subscribeFinePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getFineSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}
function getFineServerSnapshot() { return false; }

/**
 * Custom "Targeting Reticle" cursor.
 * Only renders on fine-pointer (mouse/trackpad) devices.
 * On touch devices: returns null — zero DOM overhead, no cursor:none injected.
 */
export function TargetingReticle() {
  const hasFine  = useSyncExternalStore(subscribeFinePointer, getFineSnapshot, getFineServerSnapshot);
  const [visible, setVisible]   = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x    = useSpring(rawX, { stiffness: 350, damping: 28, mass: 0.4 });
  const y    = useSpring(rawY, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!hasFine) return;

    const onMove   = (e: MouseEvent) => { rawX.set(e.clientX); rawY.set(e.clientY); setVisible(true); };
    const onLeave  = () => setVisible(false);
    const onEnter  = () => setVisible(true);
    const onIn     = () => setHovering(true);
    const onOut    = () => setHovering(false);

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
    targets.forEach(el => {
      el.addEventListener("mouseenter", onIn);
      el.addEventListener("mouseleave", onOut);
    });

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      targets.forEach(el => {
        el.removeEventListener("mouseenter", onIn);
        el.removeEventListener("mouseleave", onOut);
      });
    };
  }, [hasFine, rawX, rawY]);

  if (!hasFine) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="rounded-full border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            width:       hovering ? 52 : 28,
            height:      hovering ? 52 : 28,
            borderColor: hovering ? "rgba(255,140,0,1)" : "rgba(255,140,0,0.5)",
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        />
        <div className="w-1.5 h-1.5 rounded-full bg-k-orange absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <div key={i} className={`absolute ${cls} w-3 h-3 border-k-orange/60`} />
        ))}
      </motion.div>
    </>
  );
}
