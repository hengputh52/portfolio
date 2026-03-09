import { Hero }       from "@/sections/Hero";
import { Projects }   from "@/sections/Projects";
import { Skills }     from "@/sections/Skills";
import { About }      from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Contact }    from "@/sections/Contact";

/** Gradient divider between sections */
function Divider({ from = "pink" }: { from?: "pink" | "cyan" }) {
  return (
    <div
      className="w-full h-px"
      style={{
        background:
          from === "pink"
            ? "linear-gradient(90deg, transparent, rgba(255,0,127,0.2), rgba(0,243,255,0.1), transparent)"
            : "linear-gradient(90deg, transparent, rgba(0,243,255,0.2), rgba(255,0,127,0.1), transparent)",
      }}
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian">
      {/* 01 — Hero */}
      <Hero />
      <Divider from="cyan" />

      {/* 02 — Projects */}
      <Projects />
      <Divider from="pink" />

      {/* 03 — Skills & Diagnostics */}
      <Skills />
      <Divider from="cyan" />

      {/* 04 — About */}
      <About />
      <Divider from="pink" />

      {/* 05 — Experience & Volunteer */}
      <Experience />
      <Divider from="cyan" />

      {/* 06 — Contact */}
      <Contact />

      {/* Footer */}
      <footer
        className="section-padding py-8"
        style={{ borderTop: "1px solid rgba(255,0,127,0.08)" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] tracking-widest uppercase text-white/15">
            SYS_BUILD: 2049.031 {" // "} ALL_RIGHTS_RESERVED
          </p>
          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: "rgba(0,243,255,0.2)" }}>
            DESIGNED &amp; BUILT IN THE FIELD
          </p>
        </div>
      </footer>
    </main>
  );
}
