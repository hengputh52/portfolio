// ============================================================
// Single source of truth — edit only this file.
// ============================================================

export const profile = {
  name:    "Meng Heng",
  title:   "Software Engineer",
  tagline: "SOLAR GRID: OPTIMAL — GROWING",
  bio: `Root system online. Growth confirmed.
I design and build high-performance software systems — from cloud infrastructure and mobile apps to AI-integrated products.
Every deployment is cultivated for clarity, resilience, and a future where technology serves nature.`,
  location: "PHNOM PENH, CAMBODIA",
  email:    "hello@yourdomain.com",
  github:   "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
};

// ============================================================
// EXPERIENCE
// ============================================================
export const experiences = [
  {
    id:          "exp-1",
    date:        "2023 — PRESENT",
    company:     "COMPANY_NAME",
    title:       "Senior Software Engineer",
    description: "Led architecture of a cloud-native SaaS platform on AWS serving 50k+ daily users. Designed multi-region failover with ALB, EC2, and RDS PostgreSQL. Reduced infra cost 35% via reserved instances and S3 lifecycle policies.",
    tech:        ["AWS", "Next.js", "PostgreSQL", "TypeScript"],
    imageSrc:    "",
  },
  {
    id:          "exp-2",
    date:        "2021 — 2023",
    company:     "STUDIO_ALPHA",
    title:       "Full-Stack & Mobile Developer",
    description: "Built cross-platform mobile app in Flutter/Dart (iOS + Android, 10k+ installs). Integrated AI recommendation engine reducing churn 22%. Designed normalized PostgreSQL schema handling 2M+ daily queries.",
    tech:        ["Flutter", "Dart", "Node.js", "PostgreSQL", "AI/ML"],
    imageSrc:    "",
  },
  {
    id:          "exp-3",
    date:        "2019 — 2021",
    company:     "AGENCY_CORP",
    title:       "Frontend Developer",
    description: "Delivered pixel-perfect web applications for enterprise clients. Integrated AWS Lambda for serverless operations. Improved core web vitals across all projects by 40%.",
    tech:        ["React", "AWS Lambda", "TypeScript", "Figma"],
    imageSrc:    "",
  },
];

// ============================================================
// VOLUNTEER
// ============================================================
export const volunteers = [
  {
    id:          "vol-1",
    date:        "2022 — PRESENT",
    org:         "TECH_FOR_GOOD",
    title:       "Volunteer Software Architect",
    description: "Designed and deployed a free digital platform for NGOs in Southeast Asia, enabling 30+ organizations to manage volunteers and collect offline data using Flutter.",
    tech:        ["Flutter", "Firebase", "PostgreSQL"],
    imageSrc:    "",
  },
  {
    id:          "vol-2",
    date:        "2020 — 2022",
    org:         "CODE_BRIDGE",
    title:       "Coding Mentor",
    description: "Mentored 50+ students from underserved communities in web development. Curriculum covered JavaScript, cloud fundamentals, and AWS deployment.",
    tech:        ["JavaScript", "AWS", "Education"],
    imageSrc:    "",
  },
];

// ============================================================
// PROJECTS
// ============================================================
export const projects = [
  {
    id:       "proj-1",
    title:    "CLOUD_MATRIX",
    description: "AWS-native multi-tenant SaaS platform. Auto-scaling EC2 fleet behind ALB, Aurora PostgreSQL with read replicas, S3, and Lambda for async jobs.",
    tech:     ["AWS EC2", "Aurora PostgreSQL", "Lambda", "Next.js"],
    imageSrc: "",
    href:     "#",
    year:     "2024",
    status:   "DEPLOYED",
  },
  {
    id:       "proj-2",
    title:    "FLUTTER_NEXUS",
    description: "Cross-platform mobile app (iOS + Android) in Flutter/Dart. Offline-first SQLite sync, AI recommendation engine, 10k+ active users.",
    tech:     ["Flutter", "Dart", "SQLite", "AI/ML"],
    imageSrc: "",
    href:     "#",
    year:     "2023",
    status:   "LIVE",
  },
  {
    id:       "proj-3",
    title:    "DATA_ARCHITECT",
    description: "Relational database design tool for visualising and normalising PostgreSQL schemas at scale. Supports 100+ table diagrams with query planner hints.",
    tech:     ["PostgreSQL", "TypeScript", "D3.js", "Node.js"],
    imageSrc: "",
    href:     "#",
    year:     "2023",
    status:   "OPEN_SOURCE",
  },
  {
    id:       "proj-4",
    title:    "AI_INTEGRATION_LAYER",
    description: "Modular AI middleware connecting LLMs to enterprise APIs. Supports streaming, context management, and tool-use with OpenAI and local Ollama models.",
    tech:     ["TypeScript", "OpenAI API", "Ollama", "PostgreSQL"],
    imageSrc: "",
    href:     "#",
    year:     "2024",
    status:   "IN_FIELD",
  },
];

// ============================================================
// SKILLS
// ============================================================
export interface SkillItem {
  name:    string;
  tooltip: string;
  level:   number; // 0–100 for diagnostic bar
}

export const coreSkills: SkillItem[] = [
  { name: "Software Architecture",        tooltip: "Microservices, DDD, Event-driven, API design, Hexagonal", level: 92 },
  { name: "Cloud Infrastructure (AWS)",   tooltip: "EC2, S3, Lambda, RDS, ALB, VPC, CloudFront, IAM",        level: 88 },
  { name: "Flutter / Dart Mobile",        tooltip: "iOS & Android, BLoC, Provider, SQLite, Flavors, CI/CD",  level: 85 },
  { name: "PostgreSQL (Relational DB)",   tooltip: "Schema design, indexing, EXPLAIN, replication, pgvector", level: 87 },
  { name: "AI Integration",               tooltip: "OpenAI, Ollama, LangChain, RAG, embeddings, tool-use",   level: 80 },
];

export const techSkills: string[] = [
  "Next.js", "TypeScript", "React", "Node.js",
  "AWS", "Flutter", "PostgreSQL",
  "Docker", "GraphQL", "Go",
];

// ============================================================
// LANGUAGES
// ============================================================
export interface LanguageItem {
  name:        string;
  level:       string;
  proficiency: number; // 0–100
}

export const languages: LanguageItem[] = [
  { name: "English", level: "NATIVE_FLUENCY",  proficiency: 100 },
  { name: "Khmer",   level: "NATIVE_FLUENCY",  proficiency: 100 },
];

// ============================================================
// COMMIT GRAPH (52 weeks × 7 days)
// Deterministic seed using Math.sin — replace with GitHub GraphQL API.
// ============================================================
export function generateCommitData(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      const seed = Math.abs(Math.sin(w * 31 + d * 17) * 10000);
      const frac = seed - Math.floor(seed);
      days.push(frac < 0.4 ? 0 : frac < 0.60 ? 1 : frac < 0.78 ? 2 : frac < 0.92 ? 3 : 4);
    }
    weeks.push(days);
  }
  return weeks;
}
