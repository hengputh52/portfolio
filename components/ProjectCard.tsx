"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface ProjectCardProps {
  title:    string;
  description: string;
  tech:     string[];
  imageSrc: string;
  href:     string;
  year:     string;
  status:   string;
}

export function ProjectCard({
  title, description, tech, imageSrc, href, year, status,
}: ProjectCardProps) {
  const [scanning, setScanning] = useState(false);
  const { disabled } = useMotionConfig();

  const hasImage = imageSrc && !imageSrc.startsWith("/projects/");

  return (
    <motion.article
      className="glass-card group relative overflow-hidden"
      onHoverStart={() => { if (!disabled) setScanning(true); }}
      onHoverEnd={() => setScanning(false)}
      whileHover={disabled ? {} : {
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {/*
        Aspect ratio progression (responsive):
        Mobile (<640px) : 16:9  — comfortable height
        Tablet  (640px) : 2:1   — transitional
        Desktop (1280px): 21:9  — full cinematic widescreen
      */}
      <div className="relative overflow-hidden aspect-[16/9] sm:aspect-[2/1] xl:aspect-[21/9]">

        {/* Image or gradient placeholder */}
        {hasImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={`${title} preview`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            style={{ mixBlendMode: "screen" }}
          />
        ) : (
          /* Gradient placeholder with duotone feel */
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(255,0,127,0.08) 0%, rgba(13,17,23,0.95) 45%, rgba(0,243,255,0.08) 100%)",
            }}
          />
        )}

        {/* Subtle coordinate grid on image area */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,243,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.8) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* HUD corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-neon-pink/50" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan/50" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan/50" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-neon-pink/50" aria-hidden="true" />

        {/* Status badge */}
        <div
          className="absolute top-3 right-3 font-mono text-[9px] tracking-widest uppercase
                     text-neon-pink border border-neon-pink/30 px-2 py-0.5"
          style={{ background: "rgba(13,17,23,0.85)" }}
        >
          {status}
        </div>

        {/* Hover reveal overlay — glassmorphism */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-4"
              style={{
                background: "rgba(5,7,10,0.82)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Scan progress bar */}
              <motion.div
                className="h-px mb-3"
                style={{
                  background: "linear-gradient(90deg, #FF007F, #00F3FF)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <p className="font-mono text-[9px] tracking-widest text-neon-pink uppercase mb-3">
                [ scanning... ] {" // "} {year}
              </p>
              {/* Tech tags — HUD metadata */}
              <ul className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-[9px] tracking-wider text-cyan/80
                               border border-cyan/25 px-2 py-0.5"
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
        <h3
          className="font-display uppercase text-white mb-1.5 leading-tight"
          style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)", letterSpacing: "0.1em" }}
        >
          {title}
        </h3>
        <p className="font-mono text-[0.78rem] text-white/40 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        <a
          href={href}
          className="chromatic inline-flex items-center gap-2 font-mono text-[9px]
                     tracking-widest text-neon-pink uppercase
                     hover:text-white transition-colors duration-200 min-h-[44px] py-2"
          style={{ textShadow: "0 0 8px rgba(255,0,127,0.5)" }}
        >
          VIEW PROJECT →
        </a>
      </div>
    </motion.article>
  );
}
