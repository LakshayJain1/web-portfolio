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
      // Reset enemy position to original if possible (assuming x is starting x)
      // Actually we don't have starting x separate, but let's at least revive them
    });
  });
}

export const WORLD_DATA: Record<string, WorldConfig> = {
  hero: { 
    width: 2000, 
    startX: 100, 
    pipes: [{x: 1500, to: 'about'}],
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
    width: 2200, 
    startX: 100, 
    pipes: [{x: 1800, to: 'projects'}],
    theme: 'underground',
    skyColor: '#000000',
    groundType: 'ground_blue',
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
    ],
    enemies: [
      { id: 'a1', type: 'goomba', x: 600, yOffset: 0, dir: -1 },
      { id: 'a2', type: 'koopa', x: 1000, yOffset: 0, dir: -1 },
    ],
    powerUpBoxes: [
      { x: 900, yOffset: 160, powerUp: 'flower' },
    ]
  },
  projects: { 
    width: 3500, 
    startX: 100, 
    pipes: [{x: 3000, to: 'contact'}],
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
    width: 2000, 
    startX: 100, 
    pipes: [],
    theme: 'night',
    skyColor: '#000000',
    groundType: 'ground',
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
    ],
    enemies: [
      { id: 'c1', type: 'goomba', x: 600, yOffset: 0, dir: -1 },
      { id: 'c2', type: 'koopa', x: 900, yOffset: 0, dir: -1 },
    ],
    powerUpBoxes: [
      { x: 500, yOffset: 160, powerUp: 'mushroom' },
    ]
  }
};
