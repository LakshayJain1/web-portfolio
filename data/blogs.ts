export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedAt: string;
  readTime: string;
  tags: string[];
  accentColor: string;
}

export const BLOGS: BlogPost[] = [
  {
    slug: "building-nexus-os-portfolio",
    title: "Building NEXUS-OS: A Game-Driven Portfolio",
    excerpt:
      "Why I turned my portfolio into a playable side-scroller — and what I learned about physics, state, and delight.",
    content: [
      "Most portfolios are static galleries. I wanted mine to feel like a world you explore — something that rewards curiosity the way a good platformer does.",
      "The core loop is simple: move Mario, hit ? blocks, unlock missions. Under the hood, a custom Canvas terrain renderer, React Context for global game state, and Framer Motion for UI overlays work together without fighting each other.",
      "The hardest part wasn't graphics — it was scroll. Native scrolling had to be disabled so arrow keys and pipes control navigation. Escape hatches like `.allow-scroll` on modals keep long-form content usable.",
      "If you're considering a playful portfolio, start with one interaction that feels great (a jump, a coin sound, a block bounce) and build the world around that moment.",
    ],
    publishedAt: "2025-11-12",
    readTime: "6 min",
    tags: ["Portfolio", "React", "Game Dev"],
    accentColor: "#FFD700",
  },
  {
    slug: "framer-vs-nextjs-for-prototypes",
    title: "Framer vs Next.js: When to Prototype vs Ship",
    excerpt:
      "A practical split: Framer for narrative and stakeholder demos, Next.js when you need data, auth, and scale.",
    content: [
      "Framer wins when the goal is to feel the product — scroll storytelling, marketing pages, and high-fidelity flows that stakeholders can click through in a meeting.",
      "Next.js wins when the prototype needs real APIs, SEO, dynamic routes, or a path to production without a full rebuild. That's why client sites like DEVYUT live in Next while brand explorations like JUICE FACTORY stay in Framer.",
      "My workflow: Figma for IA and visual direction → Framer for motion and narrative validation → Next.js for the shippable version. Skipping steps costs time later.",
      "Demo content for now — swap these entries with real posts when your blog goes live.",
    ],
    publishedAt: "2025-09-03",
    readTime: "4 min",
    tags: ["Framer", "Next.js", "Workflow"],
    accentColor: "#55CCFF",
  },
  {
    slug: "pixel-design-systems",
    title: "Pixel Design Systems That Don't Feel Cheap",
    excerpt:
      "Retro aesthetics work when typography, spacing, and motion are disciplined — not when everything is noisy.",
    content: [
      "Pixel art UI fails when every element screams for attention. The fix is restraint: one display face (Press Start 2P), one body face (VT323), and a tight palette anchored on gold, cyan, and deep navy.",
      "Borders do heavy lifting — 4px coin frames, hard shadows (`12px 12px 0 #000`), and terminal chrome (traffic-light dots, title bars) create cohesion without extra illustration.",
      "Motion should feel snappy, not bouncy. I use a consistent ease curve `[0.16, 1, 0.3, 1]` and short durations so overlays feel responsive, not floaty.",
      "This post is placeholder copy — replace with your own design-system notes when ready.",
    ],
    publishedAt: "2025-06-18",
    readTime: "5 min",
    tags: ["Design Systems", "CSS", "Typography"],
    accentColor: "#E52020",
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOGS.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOGS.map((b) => b.slug);
}
