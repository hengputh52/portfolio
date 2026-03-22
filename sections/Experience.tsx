"use client";

import { motion } from "framer-motion";
import { experiences, volunteers } from "@/data/portfolioData";
import { useMotionConfig }         from "@/hooks/useMotionConfig";

interface TimelineEntry {
  id:          string;
  date:        string;
  company?:    string;
  org?:        string;
  title:       string;
  description: string;
  tech:        string[];
  imageSrc:    string;
}

interface TimelineProps {
  items:  TimelineEntry[];
  accent: "emerald" | "cyan";
}

/* ============================================================
   GEOMETRIC TREE SVG — for Experience section header
   Represents fiber-optic growth rings
   ============================================================ */
function GeometricTree() {
  return (
    <svg
      viewBox="0 0 60 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={48}
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", marginRight: "0.6rem" }}
    >
      {/* Trunk */}
      <line x1="30" y1="70" x2="30" y2="40" stroke="#059669" strokeWidth="2" />
      {/* Growth ring circles — fiber-optic style */}
      <circle cx="30" cy="36" r="14" stroke="rgba(5,150,105,0.35)" strokeWidth="1" strokeDasharray="4 5" />
      <circle cx="30" cy="36" r="22" stroke="rgba(8,145,178,0.22)" strokeWidth="1" strokeDasharray="3 7" />
      {/* Crown branches */}
      <path d="M 30 40 L 16 22 L 22 26 L 18 14 L 28 24 L 26 10 L 30 22" stroke="#059669" strokeWidth="1.4" fill="rgba(5,150,105,0.08)" strokeLinejoin="round" />
      <path d="M 30 40 L 44 22 L 38 26 L 42 14 L 32 24 L 34 10 L 30 22" stroke="#059669" strokeWidth="1.4" fill="rgba(5,150,105,0.08)" strokeLinejoin="round" />
      {/* Glow nodes */}
      <circle cx="18" cy="13"  r="2.5" fill="#F97316" opacity="0.8" />
      <circle cx="42" cy="13"  r="2.5" fill="#F97316" opacity="0.8" />
      <circle cx="30" cy="8"   r="3"   fill="#059669" opacity="0.9" />
      <circle cx="30" cy="70"  r="3"   fill="rgba(5,150,105,0.5)" />
    </svg>
  );
}

/* ============================================================
   HANDS + SPROUT SVG — for Volunteer section header
   ============================================================ */
function HandsSproutIcon() {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", marginRight: "0.6rem" }}
    >
      {/* Left hand arc */}
      <path d="M 8 48 Q 10 36 22 30 Q 28 28 30 20" stroke="rgba(8,145,178,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Right hand arc */}
      <path d="M 52 48 Q 50 36 38 30 Q 32 28 30 20" stroke="rgba(8,145,178,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Sprout stem */}
      <line x1="30" y1="52" x2="30" y2="20" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
      {/* Sprout leaf left */}
      <path d="M 30 32 Q 18 26 20 16 Q 28 18 30 28" stroke="#059669" strokeWidth="1.2" fill="rgba(5,150,105,0.15)" />
      {/* Sprout leaf right */}
      <path d="M 30 32 Q 42 26 40 16 Q 32 18 30 28" stroke="#059669" strokeWidth="1.2" fill="rgba(5,150,105,0.15)" />
      {/* Glow top of sprout */}
      <circle cx="30" cy="14" r="4" fill="#059669" opacity="0.7" />
      <circle cx="30" cy="14" r="7" stroke="rgba(5,150,105,0.3)" strokeWidth="1" />
    </svg>
  );
}

/* ============================================================
   FIBER-OPTIC TIMELINE
   Spine line styled as fiber-optic tree rings (glowing segments)
   ============================================================ */
function FiberOpticTimeline({ items, accent }: TimelineProps) {
  const { disabled, transition } = useMotionConfig();
  const color    = accent === "emerald" ? "#059669" : "#0891B2";
  const colorRgb = accent === "emerald" ? "5,150,105" : "8,145,178";

  return (
    <div className="relative">
      {/* Fiber-optic spine line — segmented dashes like tree rings */}
      <div
        className="absolute top-0 bottom-0 w-px left-3 md:left-1/2 md:-translate-x-px"
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            rgba(${colorRgb},0.55) 0px,
            rgba(${colorRgb},0.55) 8px,
            rgba(${colorRgb},0.1) 8px,
            rgba(${colorRgb},0.1) 14px
          )`,
        }}
        aria-hidden="true"
      />

      <div className="space-y-12 sm:space-y-16">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16"
            initial={disabled ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...transition, delay: disabled ? 0 : i * 0.1 }}
          >
            {/* Spine dot — glowing fiber node */}
            <div
              className="absolute left-[7px] md:left-1/2 top-1.5 w-3 h-3 rounded-full md:-translate-x-1.5"
              style={{
                background: color,
                boxShadow:  `0 0 8px ${color}, 0 0 16px rgba(${colorRgb},0.4)`,
              }}
              aria-hidden="true"
            />

            {/* Content — alternates sides on desktop */}
            <div
              className={`glass-card p-5 sm:p-6 ${i % 2 === 0 ? "md:text-right md:pr-8 md:col-start-1" : "md:col-start-2 md:pl-8"}`}
            >
              {/* Image (if provided) */}
              {item.imageSrc && (
                <div className="relative overflow-hidden mb-4 rounded" style={{ aspectRatio: "16/7" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: `hue-rotate(${accent === "emerald" ? "0deg" : "180deg"})` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(${colorRgb},0.12), rgba(240,253,244,0.5))`,
                    }}
                  />
                </div>
              )}

              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-1"
                style={{ color: `rgba(${colorRgb},0.6)` }}
              >
                {item.date}{" // "}{item.company ?? item.org}
              </p>
              <h3
                className="font-display uppercase mb-2 leading-tight"
                style={{
                  fontSize:      "clamp(1rem, 2.5vw, 1.4rem)",
                  letterSpacing: "0.08em",
                  color:         accent === "emerald" ? "#0891B2" : "#059669",
                }}
              >
                {item.title}
              </h3>
              <p
                className="font-mono leading-loose mb-3"
                style={{
                  fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
                  color:    "rgba(6,78,59,0.6)",
                }}
              >
                {item.description}
              </p>
              <ul className={`flex flex-wrap gap-1.5 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                {item.tech.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5"
                    style={{
                      border:     `1px solid rgba(${colorRgb},0.25)`,
                      color:      `rgba(${colorRgb},0.7)`,
                      background: `rgba(${colorRgb},0.04)`,
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   CIRCULAR VOLUNTEER CARDS — Symbiosis layout
   ============================================================ */
function VolunteerCircleCards({ items }: { items: TimelineEntry[] }) {
  const { disabled, transition } = useMotionConfig();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          className="relative"
          initial={disabled ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ ...transition, delay: disabled ? 0 : i * 0.15 }}
        >
          {/* Circular outer ring accent */}
          <div
            className="absolute -top-6 -left-6 w-24 h-24 rounded-full pointer-events-none"
            style={{
              border:     "1px solid rgba(8,145,178,0.15)",
              background: "radial-gradient(circle, rgba(8,145,178,0.04) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute -top-2 -left-2 w-10 h-10 rounded-full pointer-events-none"
            style={{
              border:     "1px solid rgba(8,145,178,0.3)",
              background: "radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div
            className="glass-card p-8 lg:p-10 relative z-10 overflow-hidden"
            style={{
              borderLeft: "3px solid rgba(8,145,178,0.4)",
              backgroundImage: item.imageSrc ? `url(${item.imageSrc})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "360px",
              
            }}
          >
            {item.imageSrc && (<div className="absolute inset-0 z-0" style={{background: "rgba(255,255,255,0.1)"}} aria-hidden= "true" />)}
          <div className="relative z-10">
            <div className="flex items-start gap-3 mb-3">
              {/* Circular org badge */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(8,145,178,0.1)",
                  border:     "1px solid rgba(8,145,178,0.35)",
                  boxShadow:  "0 0 8px rgba(8,145,178,0.15)",
                }}
              >
                <span className="font-mono text-[11px] uppercase font-bold" style={{ color: "#0891B2" }}>
                  {(item.org ?? item.company ?? "V").charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-widest uppercase mb-0.5" style={{ color: "rgba(8,145,178,0.6)" }}>
                  {item.date}{" // "}{item.org ?? item.company}
                </p>
                <h3
                  className="font-display uppercase leading-tight"
                  style={{
                    fontSize:      "clamp(0.9rem, 2vw, 1.2rem)",
                    letterSpacing: "0.06em",
                    color:         "#059669",
                  }}
                >
                  {item.title}
                </h3>
              </div>
            </div>
          </div>

            <p
              className="font-mono leading-loose mb-4"
              style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)", color: "rgba(6,78,59,0.6)" }}
            >
              {item.description}
            </p>

            <ul className="flex flex-wrap gap-1.5">
              {item.tech.map((t) => (
                <li
                  key={t}
                  className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-0.5"
                  style={{
                    border:       "1px solid rgba(8,145,178,0.22)",
                    color:        "rgba(8,145,178,0.75)",
                    background:   "rgba(8,145,178,0.05)",
                    borderRadius: "9999px",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   EXPERIENCE SECTION
   ============================================================ */
export function Experience() {
  const { disabled, transition } = useMotionConfig();

  return (
    <section id="experience" className="section-padding" aria-label="Experience and Volunteer">

      {/* ── EXPERIENCE ── */}
      <motion.div
        className="mb-10 sm:mb-14"
        initial={disabled ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <p
          className="font-mono text-[10px] tracking-widest uppercase mb-2"
          style={{ color: "rgba(5,150,105,0.55)" }}
        >
          Growth Ring: 04 {" // "} Operational History
        </p>
        <h2
          className="font-display uppercase leading-none flex items-center"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.08em", color: "#064e3b" }}
        >
          <GeometricTree />
          EXPERIENCE
        </h2>
        <div className="h-px w-24 mt-4" style={{ background: "linear-gradient(90deg, #059669, transparent)" }} />
      </motion.div>

      <FiberOpticTimeline items={experiences} accent="emerald" />

      {/* ── VOLUNTEER ── */}
      <motion.div
        className="mt-20 sm:mt-28 mb-10 sm:mb-14"
        initial={disabled ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <p
          className="font-mono text-[10px] tracking-widest uppercase mb-2"
          style={{ color: "rgba(8,145,178,0.55)" }}
        >
          Symbiosis: 04B {" // "} Social Impact
        </p>
        <h2
          className="font-display uppercase leading-none flex items-center"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.08em", color: "#064e3b" }}
        >
          <HandsSproutIcon />
          VOLUNTEER
        </h2>
        <div className="h-px w-24 mt-4" style={{ background: "linear-gradient(90deg, #0891B2, transparent)" }} />
      </motion.div>

      <VolunteerCircleCards items={volunteers} />
    </section>
  );
}
