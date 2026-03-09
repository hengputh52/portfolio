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
  accent: "pink" | "cyan";
}

function Timeline({ items, accent }: TimelineProps) {
  const { disabled, transition } = useMotionConfig();
  const color = accent === "pink" ? "#FF007F" : "#00F3FF";
  const colorRgb = accent === "pink" ? "255,0,127" : "0,243,255";

  return (
    <div className="relative">
      {/* Spine line */}
      <div
        className="absolute top-0 bottom-0 w-px left-3 md:left-1/2 md:-translate-x-px"
        style={{
          background: `linear-gradient(to bottom, transparent, rgba(${colorRgb},0.4), transparent)`,
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
            {/* Spine dot */}
            <div
              className="absolute left-[7px] md:left-1/2 top-1.5 w-3 h-3 rounded-full md:-translate-x-1.5"
              style={{
                background: color,
                boxShadow:  `0 0 8px ${color}, 0 0 16px rgba(${colorRgb},0.4)`,
              }}
              aria-hidden="true"
            />

            {/* Content — alternates sides on desktop */}
            <div className={i % 2 === 0 ? "md:text-right md:pr-12 md:col-start-1" : "md:col-start-2 md:pl-12"}>

              {/* 21:9 cinematic image container (if image provided) */}
              {item.imageSrc && (
                <div
                  className="relative overflow-hidden mb-4 glass-card"
                  style={{ aspectRatio: "21/9" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ mixBlendMode: "screen", filter: `hue-rotate(${accent === "pink" ? "0deg" : "160deg"})` }}
                  />
                  {/* Duotone overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, rgba(${colorRgb},0.15), rgba(13,17,23,0.6))`,
                    }}
                  />
                </div>
              )}

              <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: `rgba(${colorRgb},0.5)` }}>
                {item.date}{" // "}{item.company ?? item.org}
              </p>
              <h3
                className="font-display uppercase mb-2 leading-tight"
                style={{
                  fontSize:     "clamp(1rem, 2.5vw, 1.5rem)",
                  letterSpacing: "0.1em",
                  color:         accent === "pink" ? "#00F3FF" : "#FF007F",
                }}
              >
                {item.title}
              </h3>
              <p
                className="font-mono text-white/40 leading-loose mb-3"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
              >
                {item.description}
              </p>
              <ul className={`flex flex-wrap gap-1.5 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                {item.tech.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5"
                    style={{
                      border:  `1px solid rgba(${colorRgb},0.2)`,
                      color:   `rgba(${colorRgb},0.55)`,
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
        <p className="font-mono text-[10px] tracking-widest uppercase text-neon-pink/50 mb-2">
          SYS_MODULE: 04 {" // "} OPERATIONAL_HISTORY
        </p>
        <h2
          className="font-display uppercase text-white leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.12em" }}
        >
          EXPERIENCE
        </h2>
        <div className="h-px w-24 mt-4" style={{ background: "linear-gradient(90deg, #FF007F, transparent)" }} />
      </motion.div>

      <Timeline items={experiences} accent="pink" />

      {/* ── VOLUNTEER ── */}
      <motion.div
        className="mt-20 sm:mt-28 mb-10 sm:mb-14"
        initial={disabled ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <p className="font-mono text-[10px] tracking-widest uppercase text-cyan/50 mb-2">
          SYS_MODULE: 04B {" // "} SOCIAL_IMPACT
        </p>
        <h2
          className="font-display uppercase text-white leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.12em" }}
        >
          VOLUNTEER
        </h2>
        <div className="h-px w-24 mt-4" style={{ background: "linear-gradient(90deg, #00F3FF, transparent)" }} />
      </motion.div>

      <Timeline items={volunteers} accent="cyan" />
    </section>
  );
}
