export interface ProjectData {
  title: string;
  type: string;
  description: string;
  techStack: string[];
  link: string;
  caseStudy?: string;
}

export interface SkillData {
  id: string;
  title: string;
  type: string;
  description: string;
  techStack: string[];
}

export interface BlockData {
  x: number;
  yOffset: number;
  project?: ProjectData;
  skill?: SkillData;
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

export type EnemyType = "goomba" | "koopa";
export interface EnemyData {
  id: string;
  type: EnemyType;
  x: number;
  yOffset: number;
  dir: -1 | 1;
  isDead?: boolean;
}

export type PowerUpType = "mushroom" | "flower";
export interface PowerUpBoxData extends BlockData {
  powerUp: PowerUpType;
  isUsed?: boolean;
}

export interface WorldConfig {
  width: number;
  startX: number;
  pipes: { x: number; to: string }[];
  blocks?: BlockData[];
  powerUpBoxes?: PowerUpBoxData[];
  enemies?: EnemyData[];
  coins?: CoinData[];
  // Collision boxes for solid HTML elements (like the about board)
  solidZones?: { x: number; width: number; height: number }[];
  theme: 'overworld' | 'underground' | 'night' | 'forest';
  skyColor: string;
  groundType: 'ground' | 'ground_blue' | 'ground_green';
}

export const TERRAIN_GROUND_DEPTH = 120;

export function resetAllWorlds() {
  Object.values(WORLD_DATA).forEach(world => {
    world.blocks?.forEach(b => {
      delete b.hit;
      delete b.bounceTime;
    });
    world.powerUpBoxes?.forEach(b => {
      delete b.hit;
      delete b.bounceTime;
      delete b.isUsed;
    });
    world.coins?.forEach(c => {
      delete c.collected;
      delete c.popTime;
    });
    world.enemies?.forEach(e => {
      delete e.isDead;
    });
  });
}

export const WORLD_DATA: Record<string, WorldConfig> = {
  hero: { 
    width: 1600, 
    startX: 100, 
    pipes: [{x: 1450, to: 'about'}],
    theme: 'overworld',
    skyColor: '#5C94FC',
    groundType: 'ground',
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
    ],
    enemies: [
      { id: 'h1', type: 'goomba', x: 800, yOffset: 0, dir: -1 },
      { id: 'h2', type: 'goomba', x: 1200, yOffset: 0, dir: -1 },
    ],
    powerUpBoxes: [
      { x: 600, yOffset: 160, powerUp: 'mushroom' },
    ]
  },
  about: { 
    width: 1600, 
    startX: 100, 
    pipes: [{x: 1450, to: 'skills'}],
    theme: 'underground',
    skyColor: '#000000',
    groundType: 'ground_blue',
    blocks: [
      { x: 400, yOffset: 160 },
      { x: 432, yOffset: 160 },
    ],
    coins: [
      { x: 300, yOffset: 80 },
      { x: 350, yOffset: 110 },
      { x: 400, yOffset: 140 },
      { x: 450, yOffset: 110 },
      { x: 500, yOffset: 80 },
    ],
    enemies: [
      { id: 'a1', type: 'goomba', x: 600, yOffset: 0, dir: -1 },
      { id: 'a2', type: 'koopa', x: 1000, yOffset: 0, dir: -1 },
    ],
    powerUpBoxes: [
      { x: 900, yOffset: 160, powerUp: 'mushroom', isEasterEgg: true },
    ]
  },
  skills: { 
    width: 1600, 
    startX: 100, 
    pipes: [{x: 1450, to: 'projects'}],
    theme: 'overworld',
    skyColor: '#0A0A1F',
    groundType: 'ground_green',
    blocks: [
      { 
        x: 400, yOffset: 160, 
        skill: {
          id: 'web_dev',
          title: 'Fullstack Systems',
          type: 'ENGINEERING',
          description: 'Architecting scalable applications with Next.js 14, TypeScript, and serverless patterns. Expertise in middleware security, ISR strategies, and high-performance hydration cycles.',
          techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Redis']
        }
      },
      { 
        x: 600, yOffset: 160, 
        skill: {
          id: 'ui_ux',
          title: 'Design Systems',
          type: 'UX STRATEGY',
          description: 'Creating cohesive design languages and atomic components. Beyond visuals, I focus on accessibility, tokens, and complex user journey mapping for seamless digital products.',
          techStack: ['Figma', 'Storybook', 'Framer Motion', 'Tailwind', 'A11y']
        }
      },
      { 
        x: 800, yOffset: 160, 
        skill: {
          id: 'ai_automation',
          title: 'AI Orchestration',
          type: 'AUTOMATION',
          description: 'Designing autonomous workflows that bridge LLMs with business logic. Expertise in RAG pipelines, n8n orchestration, and multi-agent systems using Claude & GPT-4.',
          techStack: ['n8n', 'Python', 'Vector DBs', 'LangChain', 'OpenAI']
        }
      },
      { 
        x: 1000, yOffset: 160, 
        skill: {
          id: 'system_design',
          title: 'Portfolio Architecture',
          type: 'SYSTEM DESIGN',
          description: 'The blueprint of this portfolio: A decoupled architecture using React Context for global state, a custom Canvas API physics engine, and Framer Motion for high-fidelity UI overlays.',
          techStack: ['System Design', 'Canvas API', 'Context API', 'State Machines']
        }
      },
    ],
    coins: [
      { x: 500, yOffset: 100 },
      { x: 700, yOffset: 100 },
      { x: 900, yOffset: 100 },
    ],
    enemies: [
      { id: 's1', type: 'goomba', x: 500, yOffset: 0, dir: -1 },
      { id: 's2', type: 'goomba', x: 1200, yOffset: 0, dir: -1 },
    ]
  },
  projects: { 
    width: 2800, 
    startX: 100, 
    pipes: [{x: 2600, to: 'contact'}],
    theme: 'forest',
    skyColor: '#5C94FC',
    groundType: 'ground_green',
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
    ],
    enemies: [
      { id: 'p1', type: 'goomba', x: 400, yOffset: 0, dir: -1 },
      { id: 'p2', type: 'goomba', x: 900, yOffset: 0, dir: -1 },
      { id: 'p3', type: 'koopa', x: 1400, yOffset: 0, dir: -1 },
      { id: 'p4', type: 'goomba', x: 1900, yOffset: 0, dir: -1 },
    ],
    powerUpBoxes: [
      { x: 700, yOffset: 160, powerUp: 'mushroom' },
      { x: 1200, yOffset: 160, powerUp: 'flower' },
    ]
  },
  contact: { 
    width: 1600, 
    startX: 100, 
    pipes: [],
    theme: 'night',
    skyColor: '#0A0A12',
    groundType: 'ground_blue',
    blocks: [
      { x: 800, yOffset: 160, isEasterEgg: true },
    ],
    coins: [
      { x: 400, yOffset: 80 },
      { x: 1200, yOffset: 80 },
    ],
    enemies: [
      { id: 'c1', type: 'goomba', x: 600, yOffset: 0, dir: -1 },
      { id: 'c2', type: 'koopa', x: 1000, yOffset: 0, dir: -1 },
    ]
  }
};
