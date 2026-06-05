export interface ProjectData {
  slug: string;
  title: string;
  type: string;
  description: string;
  excerpt: string;
  content: string[];
  techStack: string[];
  link: string;
  accentColor: string;
  year: string;
}

export const PROJECTS: ProjectData[] = [
  {
    slug: "resxume",
    title: "RESXUME",
    type: "WEB DESIGN",
    description:
      "A sleek resume-builder web product with clean layout, smooth interactions and conversion-focused UX.",
    excerpt:
      "Conversion-first resume builder with modular sections, live preview, and export-ready layouts.",
    content: [
      "RESXUME was designed to strip away the friction of traditional resume tools. The goal was a product that feels fast, confident, and visually polished from the first interaction.",
      "The layout system uses a modular block approach — users drag sections, swap templates, and see changes instantly. Typography and spacing tokens keep every export consistent across PDF and web views.",
      "Key UX decisions focused on reducing drop-off: progressive disclosure for advanced settings, inline validation, and a single primary CTA path from landing to first export.",
    ],
    techStack: ["React", "Framer", "Figma", "CSS"],
    link: "https://devlakshay.framer.ai/#projects",
    accentColor: "#5C94FC",
    year: "2024",
  },
  {
    slug: "juice-factory",
    title: "JUICE FACTORY",
    type: "PROTOTYPING",
    description:
      "A vibrant brand & interactive Framer prototype for a fresh juice business — full UX from landing to checkout.",
    excerpt:
      "End-to-end Framer prototype for a juice brand — playful visuals, scroll storytelling, and checkout flow.",
    content: [
      "JUICE FACTORY started as a brand exercise and evolved into a full interactive prototype. The visual language leans into saturated citrus tones, chunky type, and motion that feels juicy — not corporate.",
      "The prototype maps the entire customer journey: hero storytelling, flavor catalog, subscription upsell, and a streamlined checkout. Each screen was built to test comprehension and delight before any code was written.",
      "Framer's component variants made it easy to iterate on micro-interactions — pour animations, cart feedback, and mobile thumb-zone CTAs were all validated in user walkthroughs.",
    ],
    techStack: ["Framer", "Figma", "Branding", "Prototype"],
    link: "https://devlakshay.framer.ai/#projects",
    accentColor: "#FF6B35",
    year: "2024",
  },
  {
    slug: "devyut",
    title: "DEVYUT",
    type: "WEB DESIGN",
    description:
      "A professional tech-company website with dark aesthetic, 3D accents and polished component system.",
    excerpt:
      "Dark-mode tech company site with 3D hero accents and a scalable component library.",
    content: [
      "DEVYUT needed a presence that communicated engineering credibility without feeling sterile. The solution pairs a deep charcoal palette with selective 3D accents and crisp monospace details.",
      "A shared component system covers cards, stat blocks, team grids, and case-study teasers. Tokens for elevation, border glow, and accent cyan keep the UI cohesive as new pages ship.",
      "Performance was a first-class constraint: lazy-loaded 3D scenes, optimized image delivery, and skeleton states for every async block so the site feels instant on mid-range hardware.",
    ],
    techStack: ["Next.js", "ThreeJS", "Figma", "CSS"],
    link: "https://devlakshay.framer.ai/#projects",
    accentColor: "#55CCFF",
    year: "2025",
  },
  {
    slug: "ordeta",
    title: "ORDETA",
    type: "WEB DEV",
    description:
      "A fully developed product website with dynamic interactions, built from scratch.",
    excerpt:
      "Hand-coded product site with GSAP motion, custom cursor states, and scroll-driven reveals.",
    content: [
      "ORDETA was built from scratch to showcase a product with personality. No page-builder — just semantic HTML, a custom CSS architecture, and GSAP for choreographed scroll sequences.",
      "Interaction design drives the narrative: staggered text reveals, pinned product sections, and hover states that respond with pixel-snapped motion curves tuned to feel arcade-adjacent.",
      "The codebase prioritizes maintainability — BEM-style class naming, a small animation controller, and responsive breakpoints tested down to 320px widths.",
    ],
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    link: "https://devlakshay.framer.ai/#projects",
    accentColor: "#E52020",
    year: "2023",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
