"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/portfolioData";
import { useMotionConfig } from "@/hooks/useMotionConfig";

export function Projects() {
  const { disabled, transition } = useMotionConfig();

  return (
    <section id="projects" className="section-padding" aria-label="Projects">
      {/* Section header */}
      <motion.div
        className="mb-10 sm:mb-14"
        initial={disabled ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={transition}
      >
        <p className="font-mono text-[10px] tracking-widest uppercase text-k-orange/50 mb-2">
          SYS_MODULE: 02 // FIELD_DEPLOYMENTS
        </p>
        <h2
          className="font-display uppercase text-white leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.15em" }}
        >
          PROJECTS
        </h2>
        <div className="h-px w-24 bg-k-orange/50 mt-4" />
      </motion.div>

      {/*
        Grid responsive breakdown:
        1 column  on mobile  (< 640px)
        2 columns on tablet  (640–1279px)
        3 columns on desktop (≥ 1280px)

        Aspect ratio per card shifts correspondingly in ProjectCard.tsx:
        16:9 → 2:1 → 21:9
      */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3 xl:gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={disabled ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...transition, delay: disabled ? 0 : i * 0.08 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
