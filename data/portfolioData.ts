// Single source of truth for all portfolio content.
// Edit only this file to update your portfolio.

export const profile = {
  name: "YOUR NAME",
  title: "Full-Stack Engineer",
  tagline: "ARCHITECT // SYSTEM ONLINE",
  bio: `Baseline established. Memory implants verified.
I design and build high-performance digital experiences at the intersection of engineering and aesthetics.
Every system I deploy is optimised for clarity, speed, and impact.`,
  location: "EARTH",
  email: "hello@yourdomain.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};

export const experiences = [
  {
    id: "exp-1",
    date: "2023 — PRESENT",
    company: "COMPANY_NAME",
    title: "Senior Frontend Engineer",
    description:
      "Led development of a real-time data dashboard serving 50k+ daily users. Reduced bundle size by 40% via code-splitting and lazy loading.",
    tech: ["Next.js", "TypeScript", "GraphQL"],
  },
  {
    id: "exp-2",
    date: "2021 — 2023",
    company: "STUDIO_ALPHA",
    title: "Full-Stack Developer",
    description:
      "Architected a multi-tenant SaaS platform from zero to 10k users. Designed REST API handling 2M+ daily requests with 99.9% uptime.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    id: "exp-3",
    date: "2019 — 2021",
    company: "AGENCY_CORP",
    title: "Frontend Developer",
    description:
      "Developed pixel-perfect, accessible web applications for Fortune 500 clients. Improved core web vitals scores across all projects.",
    tech: ["React", "CSS-in-JS", "Figma"],
  },
];

export const projects = [
  {
    id: "proj-1",
    title: "NEURAL_GRID",
    description:
      "A real-time collaborative design tool with AI-assisted layout generation. Built on WebRTC and a custom CRDT engine.",
    tech: ["Next.js", "WebRTC", "Rust", "WebAssembly"],
    imageSrc: "/projects/neural-grid.jpg",
    href: "#",
    year: "2024",
    status: "DEPLOYED",
  },
  {
    id: "proj-2",
    title: "VOID_SCANNER",
    description:
      "An open-source CLI tool for scanning and visualising dependency graphs in monorepos. 2k+ GitHub stars.",
    tech: ["Node.js", "TypeScript", "D3.js"],
    imageSrc: "/projects/void-scanner.jpg",
    href: "#",
    year: "2023",
    status: "OPEN_SOURCE",
  },
  {
    id: "proj-3",
    title: "SIGNAL_OS",
    description:
      "A headless CMS with a visual component builder and one-click edge deployment to 50+ CDN regions.",
    tech: ["React", "Go", "Cloudflare Workers"],
    imageSrc: "/projects/signal-os.jpg",
    href: "#",
    year: "2023",
    status: "IN_FIELD",
  },
  {
    id: "proj-4",
    title: "ECHO_PROTOCOL",
    description:
      "End-to-end encrypted messaging layer for internal enterprise tools. Zero-knowledge architecture.",
    tech: ["TypeScript", "Rust", "WebCrypto"],
    imageSrc: "/projects/echo-protocol.jpg",
    href: "#",
    year: "2022",
    status: "CLASSIFIED",
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Rust",
  "PostgreSQL",
  "GraphQL",
  "AWS",
  "Figma",
  "CI/CD",
];
