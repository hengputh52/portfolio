"use client";

import { generateCommitData } from "@/data/portfolioData";

// Deterministic at module level — no re-evaluation on re-render
const COMMIT_DATA = generateCommitData();

// Solarpunk energy-level palette — light mint → vibrant emerald → solar orange
const CELL_COLORS = [
  "rgba(209,250,229,0.6)",      // 0 — no commits (very light mint)
  "rgba(5,150,105,0.22)",       // 1 — low growth
  "rgba(5,150,105,0.5)",        // 2 — medium growth
  "rgba(5,150,105,0.8)",        // 3 — high growth
  "rgba(249,115,22,0.85)",      // 4 — peak solar energy (orange burst)
];
const CELL_SHADOW = [
  "none",
  "0 0 3px rgba(5,150,105,0.2)",
  "0 0 5px rgba(5,150,105,0.35)",
  "0 0 7px rgba(5,150,105,0.55)",
  "0 0 10px rgba(249,115,22,0.6), 0 0 18px rgba(249,115,22,0.3)",
];

/**
 * Solarpunk commit activity graph — energy output visualization.
 * Data is deterministic at module level — replace generateCommitData()
 * with a GitHub GraphQL API call for real data.
 */
export function CommitGraph() {
  return (
    <div className="overflow-x-auto pb-2">
      <p
        className="font-mono text-[9px] tracking-widest uppercase mb-3"
        style={{ color: "rgba(5,150,105,0.5)" }}
      >
        Growth Frequency {" // "} 52 Weeks
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
                  border:     level === 0 ? "1px solid rgba(5,150,105,0.1)" : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span
          className="font-mono text-[8px] uppercase tracking-widest"
          style={{ color: "rgba(6,78,59,0.35)" }}
        >
          LESS
        </span>
        {CELL_COLORS.map((color, i) => (
          <div
            key={i}
            className="w-[10px] h-[10px] rounded-sm"
            style={{
              background: color,
              boxShadow:  CELL_SHADOW[i],
              border:     i === 0 ? "1px solid rgba(5,150,105,0.1)" : "none",
            }}
          />
        ))}
        <span
          className="font-mono text-[8px] uppercase tracking-widest"
          style={{ color: "rgba(6,78,59,0.35)" }}
        >
          MORE
        </span>
      </div>
    </div>
  );
}
