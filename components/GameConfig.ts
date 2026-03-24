export interface ProjectData {
  title: string;
  type: string;
  description: string;
  techStack: string[];
  link: string;
  caseStudy?: string;
}

export interface BlockData {
  x: number;
  yOffset: number;
  project?: ProjectData;
  isEasterEgg?: boolean;
  // Runtime state for bounce animation
  bounceTime?: number;
  hit?: boolean;
}

export interface CoinData {
  x: number;
  yOffset: number;
  collected?: boolean;
  // Runtime state for pop animation
  popTime?: number;
}

export interface WorldConfig {
  width: number;
  startX: number;
  pipes: { x: number; to: string }[];
  blocks?: BlockData[];
  coins?: CoinData[];
  // Collision boxes for solid HTML elements (like the about board)
  solidZones?: { x: number; width: number; height: number }[];
}

export const WORLD_DATA: Record<string, WorldConfig> = {
  hero: { 
    width: 2000, 
    startX: 100, 
    pipes: [{x: 1500, to: 'about'}],
    blocks: [
      { x: 500, yOffset: 160, isEasterEgg: true },
    ],
    coins: [
      { x: 300, yOffset: 80 },
      { x: 350, yOffset: 100 },
      { x: 400, yOffset: 120 },
      { x: 450, yOffset: 100 },
      { x: 500, yOffset: 80 },
      { x: 700, yOffset: 80 },
      { x: 750, yOffset: 80 },
      { x: 800, yOffset: 80 },
    ]
  },
  about: { 
    width: 2200, 
    startX: 100, 
    pipes: [{x: 1800, to: 'projects'}],
    blocks: [
      { x: 400, yOffset: 160, isEasterEgg: true },
      { x: 432, yOffset: 160, isEasterEgg: true },
    ],
    coins: [
      { x: 300, yOffset: 80 },
      { x: 350, yOffset: 110 },
      { x: 400, yOffset: 140 },
      { x: 450, yOffset: 110 },
      { x: 500, yOffset: 80 },
      { x: 1200, yOffset: 80 },
      { x: 1250, yOffset: 80 },
      { x: 1300, yOffset: 80 },
    ]
  },
  projects: { 
    width: 3500, 
    startX: 100, 
    pipes: [{x: 3000, to: 'contact'}],
    blocks: [
      { 
        x: 500, yOffset: 160, 
        project: {
          title: 'RESXUME',
          type: 'WEB DESIGN',
          description: 'A sleek resume-builder web product with clean layout, smooth interactions and conversion-focused UX.',
          techStack: ['React', 'Framer', 'Figma', 'CSS'],
          link: 'https://devlakshay.framer.ai/#projects',
        }
      },
      { 
        x: 1000, yOffset: 160, 
        project: {
          title: 'JUICE FACTORY',
          type: 'PROTOTYPING',
          description: 'A vibrant brand & interactive Framer prototype for a fresh juice business — full UX from landing to checkout.',
          techStack: ['Framer', 'Figma', 'Branding', 'Prototype'],
          link: 'https://devlakshay.framer.ai/#projects',
        }
      },
      { 
        x: 1500, yOffset: 160, 
        project: {
          title: 'DEVYUT',
          type: 'WEB DESIGN',
          description: 'A professional tech-company website with dark aesthetic, 3D accents and polished component system.',
          techStack: ['Next.js', 'ThreeJS', 'Figma', 'CSS'],
          link: 'https://devlakshay.framer.ai/#projects',
        }
      },
      { 
        x: 2000, yOffset: 160, 
        project: {
          title: 'ORDETA',
          type: 'WEB DEV',
          description: 'A fully developed product website with dynamic interactions, built from scratch.',
          techStack: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
          link: 'https://devlakshay.framer.ai/#projects',
        }
      },
    ],
    coins: [
      // Coin arcs between project blocks
      { x: 650, yOffset: 80 },
      { x: 700, yOffset: 100 },
      { x: 750, yOffset: 120 },
      { x: 800, yOffset: 100 },
      { x: 850, yOffset: 80 },
      { x: 1150, yOffset: 80 },
      { x: 1200, yOffset: 100 },
      { x: 1250, yOffset: 80 },
      { x: 1650, yOffset: 80 },
      { x: 1700, yOffset: 100 },
      { x: 1750, yOffset: 120 },
      { x: 1800, yOffset: 100 },
      { x: 1850, yOffset: 80 },
      { x: 2200, yOffset: 80 },
      { x: 2250, yOffset: 80 },
      { x: 2300, yOffset: 80 },
    ]
  },
  contact: { 
    width: 2000, 
    startX: 100, 
    pipes: [],
    blocks: [
      { x: 400, yOffset: 160, isEasterEgg: true },
      { x: 700, yOffset: 160, isEasterEgg: true },
    ],
    coins: [
      { x: 300, yOffset: 80 },
      { x: 350, yOffset: 110 },
      { x: 400, yOffset: 140 },
      { x: 500, yOffset: 80 },
      { x: 700, yOffset: 140 },
      { x: 800, yOffset: 80 },
    ]
  }
};
