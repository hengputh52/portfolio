"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { coreSkills, techSkills, languages } from "@/data/portfolioData";
import { CommitGraph }                        from "@/components/CommitGraph";
import { useMotionConfig }                    from "@/hooks/useMotionConfig";

/**
 * HUD tooltip bubble — shown on skill hover.
 */
function HudTooltip({ text }: { text: string }) {
  return (
    <div
      className="hud-tooltip font-mono text-[9px] tracking-wider text-cyan px-3 py-2"
      style={{
        background:  "rgba(13,17,23,0.92)",
        border:      "1px solid rgba(0,243,255,0.3)",
        boxShadow:   "0 0 12px rgba(0,243,255,0.2), 0 4px 16px rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="text-neon-pink/60 mr-1">›</span>
      {text}
    </div>
  );
}

/**
 * Diagnostic bar — animated neon progress indicator.
 */
function DiagnosticBar({ level, delay = 0 }: { level: number; delay?: number }) {
  return (
    <div
      className="w-full h-1 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background:  "linear-gradient(90deg, #FF007F, #00F3FF)",
          boxShadow:   "0 0 6px rgba(0,243,255,0.5)",
        }}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Skills() {
  const { disabled, transition } = useMotionConfig();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

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
        <p className="font-mono text-[10px] tracking-widest uppercase text-neon-pink/50 mb-2">
          SYS_MODULE: 03 {" // "} HARDWARE_DIAGNOSTIC
        </p>
        <h2
          className="font-display uppercase text-white leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.12em" }}
        >
          SKILLS
        </h2>
        <div className="h-px w-24 mt-4" style={{ background: "linear-gradient(90deg, #FF007F, #00F3FF)" }} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16">

        {/* ── LEFT: CORE SKILLS diagnostic ── */}
        <div>
          <p className="font-mono text-[9px] tracking-widest uppercase text-cyan/40 mb-6">
            CORE_MODULES // LOADING...
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
                {/* Tooltip */}
                <HudTooltip text={skill.tooltip} />

                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="font-mono text-[11px] uppercase tracking-wider transition-colors duration-200"
                    style={{ color: activeSkill === skill.name ? "#00F3FF" : "rgba(255,255,255,0.65)" }}
                  >
                    {skill.name}
                  </span>
                  <span className="font-mono text-[9px] text-neon-pink/60">
                    {skill.level}%
                  </span>
                </div>
                <DiagnosticBar level={skill.level} delay={disabled ? 0 : i * 0.1} />
              </motion.div>
            ))}
          </div>

          {/* Tech skills grid */}
          <motion.div
            className="mt-10"
            initial={disabled ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.5 }}
          >
            <p className="font-mono text-[9px] tracking-widest uppercase text-cyan/40 mb-4">
              TECH_STACK // INSTALLED
            </p>
            <ul className="flex flex-wrap gap-2">
              {techSkills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-[9px] tracking-wider uppercase
                             border border-cyan/15 text-cyan/55 px-3 py-1.5
                             hover:border-cyan/40 hover:text-cyan
                             transition-all duration-200 cursor-default"
                  style={{ background: "rgba(0,243,255,0.03)" }}
                >
                  {skill}
                </li>
              ))}
            </ul>
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
            <p className="font-mono text-[9px] tracking-widest uppercase text-cyan/40 mb-5">
              LANGUAGE_MODULES // LOADED
            </p>
            <div className="space-y-5">
              {languages.map((lang, i) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: i % 2 === 0 ? "#00F3FF" : "#FF007F", boxShadow: `0 0 6px ${i % 2 === 0 ? "#00F3FF" : "#FF007F"}` }}
                      />
                      <span className="font-display text-white uppercase tracking-widest text-[0.85rem]">
                        {lang.name}
                      </span>
                    </div>
                    <span
                      className="font-mono text-[8px] tracking-widest uppercase border px-2 py-0.5"
                      style={{
                        color:        i % 2 === 0 ? "rgba(0,243,255,0.7)"   : "rgba(255,0,127,0.7)",
                        borderColor:  i % 2 === 0 ? "rgba(0,243,255,0.25)"  : "rgba(255,0,127,0.25)",
                        background:   i % 2 === 0 ? "rgba(0,243,255,0.04)"  : "rgba(255,0,127,0.04)",
                      }}
                    >
                      {lang.level}
                    </span>
                  </div>
                  <div
                    className="h-0.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:  i % 2 === 0
                          ? "linear-gradient(90deg, rgba(0,243,255,0.8), rgba(0,243,255,0.3))"
                          : "linear-gradient(90deg, rgba(255,0,127,0.8), rgba(255,0,127,0.3))",
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, delay: 0.3 + i * 0.15, ease: "easeOut" }}
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
