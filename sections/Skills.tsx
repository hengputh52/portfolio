"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { coreSkills, techSkills, languages } from "@/data/portfolioData";
import { CommitGraph }                        from "@/components/CommitGraph";
import { useMotionConfig }                    from "@/hooks/useMotionConfig";

/**
 * Tooltip bubble — shown on skill hover.
 */
function HudTooltip({ text }: { text: string }) {
  return (
    <div
      className="hud-tooltip font-mono text-[9px] tracking-wider px-3 py-2"
      style={{
        background:     "rgba(240,253,244,0.95)",
        border:         "1px solid rgba(5,150,105,0.3)",
        boxShadow:      "0 0 12px rgba(5,150,105,0.15), 0 4px 16px rgba(6,78,59,0.1)",
        backdropFilter: "blur(12px)",
        color:          "#064e3b",
      }}
    >
      <span style={{ color: "rgba(8,145,178,0.7)" }} className="mr-1">›</span>
      {text}
    </div>
  );
}

/**
 * Organic progress bar — animated emerald/cyan energy fill.
 */
function EnergyBar({ level, delay = 0 }: { level: number; delay?: number }) {
  return (
    <div
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ background: "rgba(5,150,105,0.1)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #059669, #0891B2)",
          boxShadow:  "0 0 6px rgba(5,150,105,0.4)",
        }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

/**
 * Hexagonal skill cell — represents one node on the "Energy Grid."
 */
function HexCell({
  skill,
  index,
  active,
  onEnter,
  onLeave,
}: {
  skill: string;
  index: number;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const highlightedSkills = ["AWS", "Flutter", "PostgreSQL", "Next.js", "TypeScript"];
  const isPrimary = highlightedSkills.includes(skill);

  return (
    <motion.div
      className="hex-clip flex items-center justify-center cursor-default select-none"
      style={{
        width:      80,
        height:     92,
        background: active
          ? "rgba(5,150,105,0.25)"
          : isPrimary
          ? "rgba(5,150,105,0.12)"
          : "rgba(240,253,244,0.8)",
        border:     "none",
        position:   "relative",
        outline:    active ? "none" : "none",
        boxShadow:  active
          ? "0 0 16px rgba(5,150,105,0.35)"
          : isPrimary
          ? "0 0 8px rgba(5,150,105,0.15)"
          : "none",
        transition: "background 0.2s ease, box-shadow 0.2s ease",
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* Inner hex border */}
      <div
        className="hex-clip absolute inset-[3px] pointer-events-none"
        style={{
          background: "transparent",
          border:     `1px solid ${active ? "rgba(5,150,105,0.5)" : isPrimary ? "rgba(5,150,105,0.3)" : "rgba(5,150,105,0.15)"}`,
        }}
      />
      <span
        className="font-mono text-[9px] uppercase tracking-wider text-center px-2 leading-tight z-10 relative"
        style={{
          color: active
            ? "#059669"
            : isPrimary
            ? "#064e3b"
            : "rgba(6,78,59,0.65)",
          fontWeight: isPrimary ? "600" : "400",
        }}
      >
        {skill}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const { disabled, transition } = useMotionConfig();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeHex, setActiveHex]     = useState<string | null>(null);

  return (
    <section id="skills" className="section-padding" aria-label="Skills">

      {/* Section header */}
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
          Energy Grid: 03 {" // "} Power Output Diagnostic
        </p>
        <h2
          className="font-display uppercase leading-none"
          style={{
            fontSize:      "clamp(1.875rem, 5vw + 0.5rem, 5rem)",
            letterSpacing: "0.08em",
            color:         "#064e3b",
          }}
        >
          SKILLS
        </h2>
        <div
          className="h-px w-24 mt-4"
          style={{ background: "linear-gradient(90deg, #059669, #0891B2)" }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16">

        {/* ── LEFT: CORE SKILLS energy bars ── */}
        <div>
          <p
            className="font-mono text-[9px] tracking-widest uppercase mb-6"
            style={{ color: "rgba(8,145,178,0.5)" }}
          >
            Core Systems // Energy Levels
          </p>
          <div className="space-y-6">
            {coreSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="has-tooltip"
                initial={disabled ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...transition, delay: disabled ? 0 : i * 0.1 }}
                onMouseEnter={() => setActiveSkill(skill.name)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <HudTooltip text={skill.tooltip} />
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono text-[11px] uppercase tracking-wider transition-colors duration-200"
                    style={{
                      color: activeSkill === skill.name ? "#059669" : "rgba(6,78,59,0.75)",
                      fontWeight: activeSkill === skill.name ? "600" : "400",
                    }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="font-mono text-[9px]"
                    style={{ color: "rgba(8,145,178,0.7)" }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <EnergyBar level={skill.level} delay={disabled ? 0 : i * 0.1} />
              </motion.div>
            ))}
          </div>

          {/* ── HEXAGONAL TECH GRID ── */}
          <motion.div
            className="mt-12"
            initial={disabled ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: disabled ? 0 : 0.5 }}
          >
            <p
              className="font-mono text-[9px] tracking-widest uppercase mb-5"
              style={{ color: "rgba(8,145,178,0.5)" }}
            >
              Tech Stack // Energy Grid
            </p>

            {/* Staggered hexagonal grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Row 1 */}
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {techSkills.slice(0, 4).map((skill, i) => (
                  <HexCell
                    key={skill}
                    skill={skill}
                    index={i}
                    active={activeHex === skill}
                    onEnter={() => setActiveHex(skill)}
                    onLeave={() => setActiveHex(null)}
                  />
                ))}
              </div>
              {/* Row 2 — offset by 42px */}
              <div style={{ display: "flex", gap: 4, marginLeft: 42, alignItems: "center" }}>
                {techSkills.slice(4, 7).map((skill, i) => (
                  <HexCell
                    key={skill}
                    skill={skill}
                    index={i + 4}
                    active={activeHex === skill}
                    onEnter={() => setActiveHex(skill)}
                    onLeave={() => setActiveHex(null)}
                  />
                ))}
              </div>
              {/* Row 3 */}
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {techSkills.slice(7, 10).map((skill, i) => (
                  <HexCell
                    key={skill}
                    skill={skill}
                    index={i + 7}
                    active={activeHex === skill}
                    onEnter={() => setActiveHex(skill)}
                    onLeave={() => setActiveHex(null)}
                  />
                ))}
              </div>
            </div>

            {/* Grid legend */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 hex-clip"
                  style={{ background: "rgba(5,150,105,0.2)" }}
                />
                <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "rgba(6,78,59,0.5)" }}>
                  Primary Stack
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 hex-clip"
                  style={{ background: "rgba(240,253,244,0.8)", border: "1px solid rgba(5,150,105,0.15)" }}
                />
                <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: "rgba(6,78,59,0.5)" }}>
                  Extended
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: LANGUAGE MODULES + COMMIT GRAPH ── */}
        <div className="space-y-10">

          {/* Language Modules */}
          <motion.div
            className="glass-card-cyan p-6"
            initial={disabled ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ ...transition, delay: disabled ? 0 : 0.2 }}
          >
            <p
              className="font-mono text-[9px] tracking-widest uppercase mb-5"
              style={{ color: "rgba(8,145,178,0.55)" }}
            >
              Language Nodes // Loaded
            </p>
            <div className="space-y-5">
              {languages.map((lang, i) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: i % 2 === 0 ? "#059669" : "#0891B2",
                          boxShadow:  `0 0 5px ${i % 2 === 0 ? "#059669" : "#0891B2"}`,
                        }}
                      />
                      <span
                        className="font-display uppercase tracking-widest text-[0.85rem]"
                        style={{ color: "#064e3b" }}
                      >
                        {lang.name}
                      </span>
                    </div>
                    <span
                      className="font-mono text-[8px] tracking-widest uppercase border px-2 py-0.5"
                      style={{
                        color:       i % 2 === 0 ? "rgba(5,150,105,0.8)"   : "rgba(8,145,178,0.8)",
                        borderColor: i % 2 === 0 ? "rgba(5,150,105,0.25)"  : "rgba(8,145,178,0.25)",
                        background:  i % 2 === 0 ? "rgba(5,150,105,0.06)"  : "rgba(8,145,178,0.06)",
                      }}
                    >
                      {lang.level}
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(5,150,105,0.1)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: i % 2 === 0
                          ? "linear-gradient(90deg, rgba(5,150,105,0.9), rgba(5,150,105,0.35))"
                          : "linear-gradient(90deg, rgba(8,145,178,0.9), rgba(8,145,178,0.35))",
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Commit Graph */}
          <motion.div
            className="glass-card p-5 sm:p-6"
            initial={disabled ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...transition, delay: disabled ? 0 : 0.3 }}
          >
            <CommitGraph />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
