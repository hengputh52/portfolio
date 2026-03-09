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
        <p
          className="font-mono text-[10px] tracking-widest uppercase mb-2"
          style={{ color: "rgba(5,150,105,0.55)" }}
        >
          Field Deployments: 02 {" // "} Live Ecosystems
        </p>
        <h2
          className="font-display uppercase leading-none"
          style={{ fontSize: "clamp(1.875rem, 5vw + 0.5rem, 5rem)", letterSpacing: "0.08em", color: "#064e3b" }}
        >
          PROJECTS
        </h2>
        <div className="h-px w-24 mt-4" style={{ background: "linear-gradient(90deg, #059669, #0891B2)" }} />
      </motion.div>

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
