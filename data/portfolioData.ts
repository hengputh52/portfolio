import angkor_guide_thuminal from '@/public/angkor_guide_thumnail.jpg'

// ============================================================
// Single source of truth — edit only this file.
// ============================================================

export const profile = {
  name:    "Meng Heng",
  title:   "Software Engineer",
  tagline: "Cambodia Academy of Digital Technology Student",
  bio: `Root system online. Growth confirmed.
I design and build high-performance software systems — from cloud infrastructure and mobile apps to AI-integrated products.
Every deployment is cultivated for clarity, resilience, and a future where technology serves nature.`,
  location: "PHNOM PENH, CAMBODIA",
  email:    "mheng770@gmail.com",
  github:   "https://github.com/hengputh52",
  linkedin: "https://linkedin.com/in/yourusername",
};

// ============================================================
// EXPERIENCE
// ============================================================
export const experiences = [
  {
    id:          "exp-1",
    date:        "June 2025 - December 2026",
    company:     "EdTech Cambodia (Minstiry of Education, Youth and Sport)",
    title:       "UX/UI and Web Developer",
    description: " worked as a UX/UI Designer and Web Developer, working dashboard and website design.",
    tech:        ["React JS", "Node JS", "MongoDB", "TypeScript"],
    imageSrc:    "",
  },

];

// ============================================================
// VOLUNTEER
// ============================================================
export const volunteers = [
  {
    id:          "vol-1",
    date:        "December 2025",
    org:         "Digital Government Forum",
    title:       "Public Relation",
    description: "Participating in making a video about the event",
    tech:        [],
    imageSrc:    "/dgf_gor.jpg",
  },
  {
    id:          "vol-2",
    date:        "November 2025",
    org:         "VBNK",
    title:       "Youth Digital Storytelling & Community Engagement",
    description: "Participate in workshop",
    tech:        [],
    imageSrc:    "/digital_story.jpg",
  },
];

// ============================================================
// PROJECTS
// ============================================================
export const projects = [
    {
    id:       "proj-1",
    title:    "Das Tern",
    description: "DasTern is now a fully functional mobile app that helps patients take their medicine correctly. By combining local OCR and smart AI, it instantly converts paper prescriptions into digital schedules",
    tech:     ["Flutter", "Nest JS", "PostgreSQL", "Docker"],
    imageSrc: "/das-tern.jpg",
    href:     "#",
    year:     "2024",
    status:   "DEPLOYED",
  },
  {
    id:       "proj-2",
    title:    "Angkor Guide",
    description: "Angkor Guide is offline tour application created for international tourists and people that is interested in historical temple. this app acts as tour guide while visiting temple.",
    tech:     ["Flutter"],
    imageSrc: "/angkor_guide_1.jpg",
    href:     "#",
    year:     "2024",
    status:   "DEPLOYED",
  },
  {
    id:       "proj-3",
    title:    "PSA Book",
    description: "PSABook is a website that lets people buy and sell second-hand books.  The goal is to make reading more accessible and promote book reuse in the local community.",
    tech:     ["React JS", "Node JS", "mySql"],
    imageSrc: "/psa_book.jpg",
    href:     "#",
    year:     "2023",
    status:   "LIVE",
  },
  {
    id:       "proj-4",
    title:    "TH Movie",
    description: "Streaming Movie Website",
    tech:     ["HTML", "CSS"],
    imageSrc: "/th-movie.jpg",
    href:     "#",
    year:     "2023",
    status:   "OPEN_SOURCE",
  },
  {
    id:       "proj-5",
    title:    "Delivery Guy Game",
    description: "Delivery Guy is a casual time-challenge game where players control a delivery driver in a busy city. The main objective is to deliver food orders to customers before time runs out, while avoiding traffic and police.",
    tech:     ["Unity"],
    imageSrc: "/delivery_guy.jpg",
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
