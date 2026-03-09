import { Hero }       from "@/sections/Hero";
import { Projects }   from "@/sections/Projects";
import { About }      from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Contact }    from "@/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian">
      {/* 01 — Hero */}
      <Hero />

      {/* Visual divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-k-orange/20 to-transparent" />

      {/* 02 — Projects */}
      <Projects />

      {/* Visual divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-dune-gold/15 to-transparent" />

      {/* 03 — About */}
      <About />

      {/* Visual divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-k-orange/20 to-transparent" />

      {/* 04 — Experience */}
      <Experience />

      {/* Visual divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-dune-gold/15 to-transparent" />

      {/* 05 — Contact */}
      <Contact />

      {/* Footer */}
      <footer className="section-padding py-8 border-t border-k-orange/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] tracking-widest uppercase text-white/20">
            SYS_BUILD: 2049.031 // ALL_RIGHTS_RESERVED
          </p>
          <p className="font-mono text-[9px] tracking-widest uppercase text-k-orange/25">
            DESIGNED &amp; BUILT IN THE FIELD
          </p>
        </div>
      </footer>
    </main>
  );
}
