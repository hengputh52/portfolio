"use client";

import { motion } from "framer-motion";
import { PulsingIrisSVG } from "@/components/PulsingIrisSVG";
import { profile, skills } from "@/data/portfolioData";
import { useMotionConfig } from "@/hooks/useMotionConfig";

export function About() {
  const { disabled, transition } = useMotionConfig();

  return (
    <section id="about" className="section-padding" aria-label="About">
      {/* Section header */}
      <motion.p
        className="font-mono text-[10px] tracking-widest uppercase text-k-orange/50 mb-12 sm:mb-16"
        initial={disabled ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transition}
      >
        SYS_MODULE: 03 // SUBJECT_PROFILE
      </motion.p>

      {/*
        Two-column layout:
        - Mobile:  single column, SVG centered above text
        - md+:     SVG on left (1fr), text on right (1.6fr)
      */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-center">

        {/* SVG column */}
        <motion.div
          className="w-full max-w-[220px] mx-auto md:max-w-none md:mx-0"
          initial={disabled ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, duration: 1.0 }}
        >
          <PulsingIrisSVG />
        </motion.div>

        {/* Text column */}
        <motion.div
          className="space-y-5 text-center md:text-left"
          initial={disabled ? {} : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, delay: disabled ? 0 : 0.2 }}
        >
          <h2
            className="font-display uppercase text-dune-gold leading-tight"
            style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.15em" }}
          >
            ABOUT
          </h2>

          <div className="h-px w-16 bg-k-orange/40 mx-auto md:mx-0" />

          <p className="font-mono text-white/55 leading-loose whitespace-pre-line"
             style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}>
            {profile.bio}
          </p>

          <div className="pt-2">
            <p className="font-mono text-[10px] tracking-widest text-k-orange/40 uppercase mb-3">
              SKILL_MATRIX:
            </p>
            <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-[10px] tracking-wider uppercase
                             border border-dune-gold/25 text-dune-gold/60
                             px-3 py-1 hover:border-dune-gold/50 hover:text-dune-gold
                             transition-colors duration-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Baseline data */}
          <div className="pt-2 font-mono text-[10px] tracking-widest uppercase space-y-1 text-k-orange/30">
            <p>LOCATION: {profile.location}</p>
            <p>STATUS: AVAILABLE_FOR_WORK</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
