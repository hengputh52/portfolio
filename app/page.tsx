import { Hero }           from "@/sections/Hero";
import { Projects }       from "@/sections/Projects";
import { Skills }         from "@/sections/Skills";
import { About }          from "@/sections/About";
import { Experience }     from "@/sections/Experience";
import { Contact }        from "@/sections/Contact";
import { FlyingSpinner }  from "@/components/FlyingSpinner";
import { SolarFoliage }   from "@/components/SolarFoliage";

/** Gradient divider between sections — emerald / cyan */
function Divider({ from = "emerald" }: { from?: "emerald" | "cyan" }) {
  return (
    <div
      className="w-full h-px"
      style={{
        background:
          from === "emerald"
            ? "linear-gradient(90deg, transparent, rgba(5,150,105,0.2), rgba(8,145,178,0.12), transparent)"
            : "linear-gradient(90deg, transparent, rgba(8,145,178,0.2), rgba(5,150,105,0.12), transparent)",
      }}
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian relative">
      {/* Fixed atmospheric layers */}
      <FlyingSpinner />
      <SolarFoliage />

      {/* 01 — Hero */}
      <Hero />
      <Divider from="cyan" />

      {/* 02 — Projects */}
      <Projects />
      <Divider from="emerald" />

      {/* 03 — Skills & Energy Grid */}
      <Skills />
      <Divider from="cyan" />

      {/* 04 — About */}
      <About />
      <Divider from="emerald" />

      {/* 05 — Experience & Volunteer */}
      <Experience />
      <Divider from="cyan" />

      {/* 06 — Contact */}
      <Contact />

      {/* Footer */}
      <footer
        className="section-padding py-8"
        style={{ borderTop: "1px solid rgba(5,150,105,0.1)" }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="font-mono text-[9px] tracking-widest uppercase"
            style={{ color: "rgba(6,78,59,0.3)" }}
          >
            System Power: Solar {" // "} Grid Status: Optimal {" // "} Built with Purpose
          </p>
          <p
            className="font-mono text-[9px] tracking-widest uppercase"
            style={{ color: "rgba(8,145,178,0.35)" }}
          >
            Designed & Grown in the Field
          </p>
        </div>
      </footer>
    </main>
  );
}
