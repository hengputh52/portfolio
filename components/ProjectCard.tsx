"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface ProjectCardProps {
  title:    string;
  description: string;
  tech:     string[];
  imageSrc: string;
  source: string;
  demo: string;
  year:     string;
  status:   string;
}

export function ProjectCard({
  title, description, tech, imageSrc, source, demo, year, status,
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
      <div className="relative overflow-hidden aspect-[16/9] sm:aspect-[2/1] xl:aspect-[21/9]">

        {/* Image or nature-gradient placeholder */}
        {hasImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageSrc}
            alt={`${title} preview`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* Gradient placeholder — rice field / solar horizon */
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(8,145,178,0.08) 0%, rgba(240,253,244,0.95) 35%, rgba(5,150,105,0.1) 60%, rgba(210,250,225,0.6) 100%)",
            }}
          />
        )}

        {/* Subtle organic grid */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.045,
            backgroundImage:
              "linear-gradient(rgba(5,150,105,1) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,1) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Corner brackets — emerald / cyan */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-k-orange/45" aria-hidden="true" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan/45" aria-hidden="true" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan/45" aria-hidden="true" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-k-orange/45" aria-hidden="true" />

        {/* Status badge */}
        <div
          className="absolute top-3 right-3 font-mono text-[9px] tracking-widest uppercase border px-2 py-0.5"
          style={{
            background:  "rgba(240,253,244,0.88)",
            backdropFilter: "blur(8px)",
            color:       "#059669",
            borderColor: "rgba(5,150,105,0.3)",
          }}
        >
          {status}
        </div>

        {/* Hover reveal overlay — light glassmorphism */}
        <AnimatePresence>
          {scanning && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-4"
              style={{
                background:        "rgba(240,253,244,0.88)",
                backdropFilter:    "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
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
                  background:    "linear-gradient(90deg, #059669, #0891B2)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <p className="font-mono text-[9px] tracking-widest uppercase mb-3" style={{ color: "#059669" }}>
                [ growing... ] {" // "} {year}
              </p>
              {/* Tech tags */}
              <ul className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-[9px] tracking-wider px-2 py-0.5"
                    style={{
                      color:       "rgba(8,145,178,0.85)",
                      border:      "1px solid rgba(8,145,178,0.3)",
                      background:  "rgba(8,145,178,0.06)",
                    }}
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
          className="font-display uppercase mb-1.5 leading-tight"
          style={{
            fontSize:      "clamp(0.9rem, 2.5vw, 1.2rem)",
            letterSpacing: "0.08em",
            color:         "#064e3b",
          }}
        >
          {title}
        </h3>
        <p
          className="font-mono text-[0.78rem] leading-relaxed line-clamp-2 mb-4"
          style={{ color: "rgba(6,78,59,0.55)" }}
        >
          {description}
        </p>

        <div className="flex flex-row items-center gap-4">
          {/* First Link */}
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="chromatic inline-flex items-center gap-2 font-mono text-xs 
                      tracking-widest uppercase py-3 px-6 border border-[#059669] 
                      transition-all duration-200 hover:bg-[#059669]/10"
            style={{ color: "#059669", textShadow: "0 0 8px rgba(5,150,105,0.35)" }}
          >
            DEMO PROJECT 
          </a>

          {/* Second Link */}
          <a
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="chromatic inline-flex items-center gap-2 font-mono text-xs 
                      tracking-widest uppercase py-3 px-6 border border-[#059669] 
                      transition-all duration-200 hover:bg-[#059669]/10"
            style={{ color: "#059669", textShadow: "0 0 8px rgba(5,150,105,0.35)" }}
          >
            VIEW CODE 
          </a>
</div>

      </div>
    </motion.article>
  );
}
