"use client";

import { motion } from "framer-motion";
import { profile }        from "@/data/portfolioData";
import { useMotionConfig } from "@/hooks/useMotionConfig";

export function About() {
  const { disabled, transition } = useMotionConfig();

  return (
    <section id="about" className="section-padding" aria-label="About">
      <motion.p
        className="font-mono text-[10px] tracking-widest uppercase mb-12 sm:mb-16"
        style={{ color: "rgba(5,150,105,0.55)" }}
        initial={disabled ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={transition}
      >
        Horizon View: 03A {" // "} Architect Profile
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-center">

        {/* Profile image */}
        <motion.div
          className="w-full max-w-[280px] mx-auto md:max-w-none md:mx-0  overflow-hidden rounded-lg"
          initial={disabled ? {} : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ ...transition, duration: 1.0 }}
          style={{
            boxShadow: "0 0 24px rgba(5,150,105,0.3), inset 0 0 24px rgba(5,150,105,0.1)",
          }}
        >
          <img
            src="/pic_nobackground.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
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
              fontSize:      "clamp(1.875rem, 5vw + 0.5rem, 5rem)",
              letterSpacing: "0.08em",
              color:         "#059669",
              textShadow:    "0 0 20px rgba(5,150,105,0.25)",
            }}
          >
            ABOUT ME
          </h2>

          <div
            className="h-px w-16 mx-auto md:mx-0"
            style={{ background: "linear-gradient(90deg, #059669, #0891B2)" }}
          />

          <p
            className="font-mono leading-loose whitespace-pre-line"
            style={{
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              color:    "rgba(6,78,59,0.65)",
            }}
          >
            {profile.bio}
          </p>

          {/* Metadata card */}
          <div className="glass-card-cyan p-4 sm:p-5 text-left" style={{ marginTop: "1.5rem" }}>
            <p
              className="font-mono text-[9px] tracking-widest uppercase mb-3"
              style={{ color: "rgba(8,145,178,0.55)" }}
            >
              Profile Data:
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {[
                { label: "LOCATION",  value: profile.location },
                { label: "STATUS",    value: "AVAILABLE" },
                { label: "CLEARANCE", value: "FULL_STACK" },
                { label: "SIGNAL",    value: "ONLINE" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="font-mono text-[8px] tracking-widest uppercase"
                    style={{ color: "rgba(8,145,178,0.4)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: "rgba(5,150,105,0.85)" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
