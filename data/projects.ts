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
    slug: "inven-track",
    title: "INVEN TRACK",
    type: "WEB APP",
    description:
      "A full-stack inventory management app with real-time stock tracking, automated low-stock alerts, and an intuitive analytics dashboard.",
    excerpt:
      "Real-time inventory tracking, automated alerts, and dashboard analytics for streamlined stock management.",
    content: [
      "INVEN TRACK was built to solve the chaos of manual inventory management. The app provides a centralized dashboard where businesses can track stock levels in real time, set automated alerts for low inventory, and generate actionable insights from usage patterns.",
      "The architecture uses Next.js for the frontend with a PostgreSQL backend, delivering fast page loads and real-time data synchronization. The dashboard visualizes key metrics — turnover rates, restock urgency, and category breakdowns — so users can make informed decisions at a glance.",
      "A clean, role-based UI allows team members to manage products, process orders, and update stock quantities without friction. The goal was to make inventory management feel effortless, turning a tedious task into a streamlined workflow.",
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    link: "https://inven-tracker.vercel.app/dashboard",
    accentColor: "#3B82F6",
    year: "2025",
  },
  {
    slug: "agent-corp",
    title: "AGENT CORP",
    type: "WEBSITE",
    description:
      "A multi-agent AI company website showcasing autonomous agent services, team collaboration, and workflow automation capabilities.",
    excerpt:
      "Multi-agent AI platform site highlighting autonomous services and workflow automation.",
    content: [
      "AGENT CORP is a brand presence site for a multi-agent AI company. It communicates complex technology through clear visual storytelling, breaking down autonomous agent services into digestible sections with interactive demonstrations.",
      "The design balances technical credibility with approachability — a clean, modern layout with subtle motion cues that guide visitors through the agent ecosystem. Each service card explains what an agent does, how it collaborates with other agents, and the business value it delivers.",
      "Built with Next.js and Framer Motion, the site delivers smooth page transitions and a polished feel. The component system is designed for easy content updates, allowing the team to add new agent services without touching core layout code.",
    ],
    techStack: ["Next.js", "Framer", "TypeScript", "Tailwind"],
    link: "https://agent-corp.vercel.app/",
    accentColor: "#8B5CF6",
    year: "2025",
  },
  {
    slug: "ordeta",
    title: "ORDETA",
    type: "WEBSITE",
    description:
      "A professional company website for Ordeta, delivering a clean brand presence with modern web technologies and seamless user experience.",
    excerpt:
      "Clean brand presence site with modern design and seamless user experience.",
    content: [
      "ORDETA's website was crafted to establish a strong digital presence that reflects the company's professionalism and attention to detail. Every element — from typography to spacing — was chosen to communicate trust and quality.",
      "The design follows a clean, minimal aesthetic with purposeful whitespace and a refined color palette. Interactive elements are subtle yet engaging, using hover states and scroll-triggered reveals to create a sense of polish without overwhelming the content.",
      "Built with modern web technologies, the site is fully responsive and optimized for performance. The focus was on creating a fast, accessible experience that works seamlessly across all devices, ensuring visitors get a consistent brand impression whether on desktop or mobile.",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer"],
    link: "https://www.ordeta.tech/",
    accentColor: "#E52020",
    year: "2025",
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
