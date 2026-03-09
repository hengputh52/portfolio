"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  imageSrc: string;
  href: string;
  year: string;
  status: string;
}

export function ProjectCard({
  title,
  description,
  tech,
  imageSrc,
  href,
  year,
  status,
}: ProjectCardProps) {
  const [scanning, setScanning] = useState(false);
  const { disabled } = useMotionConfig();

  return (
    <motion.article
      className="group relative bg-fog border border-k-orange/10 overflow-hidden"
      onHoverStart={() => { if (!disabled) setScanning(true); }}
      onHoverEnd={() => setScanning(false)}
      whileHover={disabled ? {} : { borderColor: "rgba(255,140,0,0.35)" }}
      transition={{ duration: 0.2 }}
    >
      {/*
        Aspect ratio shifts with breakpoints:
        mobile → 16:9   (generous height, readable at 375px wide)
        sm     → 2:1    (transitional, avoids overly short card at 2 columns)
        xl     → 21:9   (full cinematic on large desktop)
      */}
      <div className="relative overflow-hidden aspect-[16/9] sm:aspect-[2/1] xl:aspect-[21/9]">
        {/* Image placeholder / actual image */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-fog via-obsidian to-fog"
          style={{
            backgroundImage: `linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 50%, #1A1A1A 100%)`,
          }}
        />
        {/* Subtle grid overlay on the image placeholder */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,140,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,140,0,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Image (if provided and not a placeholder path) */}
        {!imageSrc.startsWith("/projects/") ? null : null}

        {/* HUD corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-k-orange/50" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-k-orange/50" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-k-orange/50" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-k-orange/50" aria-hidden="true" />

        {/* Status badge */}
        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-widest uppercase text-k-orange/70 border border-k-orange/30 px-2 py-0.5 bg-obsidian/80">
          {status}
        </div>

        {/* Scan overlay on desktop hover */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              className="absolute inset-0 bg-obsidian/88 flex flex-col justify-end p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Scanning progress bar */}
              <motion.div
                className="h-px bg-k-orange mb-3"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <p className="font-mono text-[10px] tracking-widest text-k-orange uppercase mb-3">
                [ scanning... ] {year}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-[10px] text-dune-gold/80 border border-dune-gold/30 px-2 py-0.5 tracking-wider"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card footer */}
      <div className="p-4 sm:p-5">
        <h3 className="text-section font-display tracking-[0.15em] uppercase text-white mb-1.5 leading-tight">
          {title}
        </h3>
        <p className="font-mono text-[0.8rem] text-white/45 leading-relaxed line-clamp-2">
          {description}
        </p>
        <a
          href={href}
          className="chromatic inline-flex items-center gap-2 mt-4 font-mono text-[10px] tracking-widest text-k-orange uppercase
                     hover:text-white transition-colors min-h-[44px] py-2"
        >
          VIEW PROJECT →
        </a>
      </div>
    </motion.article>
  );
}
