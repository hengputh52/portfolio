"use client";

import { generateCommitData } from "@/data/portfolioData";

// Deterministic at module level — no re-evaluation on re-render
const COMMIT_DATA = generateCommitData();

const CELL_COLORS = [
  "rgba(13,17,23,0.8)",         // 0 — no commits
  "rgba(0,243,255,0.15)",       // 1 — low
  "rgba(0,243,255,0.35)",       // 2 — medium
  "rgba(255,0,127,0.5)",        // 3 — high
  "rgba(255,0,127,0.85)",       // 4 — intense
];
const CELL_SHADOW = [
  "none",
  "0 0 4px rgba(0,243,255,0.2)",
  "0 0 6px rgba(0,243,255,0.4)",
  "0 0 8px rgba(255,0,127,0.5)",
  "0 0 12px rgba(255,0,127,0.8), 0 0 20px rgba(255,0,127,0.4)",
];

/**
 * Stylised neon-themed GitHub contribution graph.
 * Data is deterministic at module level — replace generateCommitData()
 * with a GitHub GraphQL API call for real data.
 */
export function CommitGraph() {
  return (
    <div className="overflow-x-auto pb-2">
      <p className="font-mono text-[9px] tracking-widest uppercase text-neon-pink/40 mb-3">
        COMMIT_FREQUENCY {" // "} 52_WEEKS
      </p>
      <div className="flex gap-[3px] min-w-max">
        {COMMIT_DATA.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((level, di) => (
              <div
                key={di}
                className="w-[10px] h-[10px] rounded-sm transition-all duration-200 hover:scale-125"
                title={`${level === 0 ? "No" : level} commit${level !== 1 ? "s" : ""}`}
                style={{
                  background: CELL_COLORS[level],
                  boxShadow:  CELL_SHADOW[level],
                  border:     level > 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">LESS</span>
        {CELL_COLORS.map((color, i) => (
          <div
            key={i}
            className="w-[10px] h-[10px] rounded-sm"
            style={{ background: color, boxShadow: CELL_SHADOW[i], border: i === 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
          />
        ))}
        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">MORE</span>
      </div>
    </div>
  );
}
