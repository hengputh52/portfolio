"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolioData";
import { useMotionConfig } from "@/hooks/useMotionConfig";

export function Experience() {
  const { disabled, transition } = useMotionConfig();

  return (
    <section id="experience" className="section-padding" aria-label="Experience">
      {/* Section header */}
      <motion.div
        className="mb-10 sm:mb-14"
        initial={disabled ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <p className="font-mono text-[10px] tracking-widest uppercase text-k-orange/50 mb-2">
          SYS_MODULE: 04 // OPERATIONAL_HISTORY
        </p>
        <h2
          className="font-display uppercase text-white leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.15em" }}
        >
          EXPERIENCE
        </h2>
        <div className="h-px w-24 bg-k-orange/50 mt-4" />
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Spine line — left on mobile, center on md+ */}
        <div
          className="absolute top-0 bottom-0 w-px left-3 md:left-1/2 md:-translate-x-px
                     bg-gradient-to-b from-transparent via-k-orange/30 to-transparent"
          aria-hidden="true"
        />

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16"
              initial={disabled ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ ...transition, delay: disabled ? 0 : i * 0.1 }}
            >
              {/* Spine dot */}
              <div
                className="absolute left-[7px] md:left-1/2 top-1.5
                           w-3 h-3 rounded-full bg-k-orange md:-translate-x-1.5
                           ring-4 ring-k-orange/15"
                aria-hidden="true"
              />

              {/*
                Content alternates sides on desktop.
                Odd items → right column, even → left column (right-aligned).
              */}
              <div
                className={
                  i % 2 === 0
                    ? "md:text-right md:pr-12 md:col-start-1"
                    : "md:col-start-2 md:pl-12"
                }
              >
                <p className="font-mono text-[10px] tracking-widest uppercase text-k-orange/50 mb-1">
                  {exp.date}{" // "}{exp.company}
                </p>
                <h3
                  className="font-display uppercase text-dune-gold mb-2 leading-tight"
                  style={{ fontSize: "clamp(1rem, 2.5vw, 1.5rem)", letterSpacing: "0.12em" }}
                >
                  {exp.title}
                </h3>
                <p
                  className="font-mono text-white/45 leading-loose mb-3"
                  style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
                >
                  {exp.description}
                </p>
                <ul
                  className={`flex flex-wrap gap-1.5 ${
                    i % 2 === 0 ? "md:justify-end" : ""
                  }`}
                >
                  {exp.tech.map((t) => (
                    <li
                      key={t}
                      className="font-mono text-[9px] tracking-wider uppercase
                                 border border-k-orange/20 text-k-orange/50 px-2 py-0.5"
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
    </section>
  );
}
