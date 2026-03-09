"use client";

import { motion } from "framer-motion";
import { PulsingIrisSVG } from "@/components/PulsingIrisSVG";
import { profile }        from "@/data/portfolioData";
import { useMotionConfig } from "@/hooks/useMotionConfig";

export function About() {
  const { disabled, transition } = useMotionConfig();

  return (
    <section id="about" className="section-padding" aria-label="About">
      <motion.p
        className="font-mono text-[10px] tracking-widest uppercase text-neon-pink/50 mb-12 sm:mb-16"
        initial={disabled ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transition}
      >
        SYS_MODULE: 03A {" // "} SUBJECT_PROFILE
      </motion.p>

      {/*
        Mobile:  single column, SVG centred above text
        md+:     SVG left (1fr), text right (1.6fr)
      */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-center">

        {/* Pulsing iris */}
        <motion.div
          className="w-full max-w-[220px] mx-auto md:max-w-none md:mx-0"
          initial={disabled ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, duration: 1.0 }}
        >
          <PulsingIrisSVG />
        </motion.div>

        {/* Narrative text */}
        <motion.div
          className="space-y-5 text-center md:text-left"
          initial={disabled ? {} : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, delay: disabled ? 0 : 0.2 }}
        >
          <h2
            className="font-display uppercase leading-tight"
            style={{
              fontSize:     "clamp(1.875rem, 5vw + 0.5rem, 5rem)",
              letterSpacing: "0.12em",
              color:         "#00F3FF",
              textShadow:    "0 0 20px rgba(0,243,255,0.3)",
            }}
          >
            ABOUT
          </h2>

          <div className="h-px w-16 mx-auto md:mx-0"
               style={{ background: "linear-gradient(90deg, #FF007F, #00F3FF)" }} />

          <p
            className="font-mono text-white/50 leading-loose whitespace-pre-line"
            style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}
          >
            {profile.bio}
          </p>

          {/* Voight-Kampff subject metadata */}
          <div
            className="glass-card-cyan p-4 sm:p-5 text-left"
            style={{ marginTop: "1.5rem" }}
          >
            <p className="font-mono text-[9px] tracking-widest uppercase text-cyan/40 mb-3">
              BASELINE_DATA:
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                { label: "LOCATION",  value: profile.location },
                { label: "STATUS",    value: "AVAILABLE" },
                { label: "CLEARANCE", value: "FULL_STACK" },
                { label: "SIGNAL",    value: "ONLINE" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[8px] tracking-widest uppercase text-cyan/30">{label}</p>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-neon-pink/70">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
