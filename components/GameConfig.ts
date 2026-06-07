import { PROJECTS, type ProjectData } from '../data/projects';

export type { ProjectData };

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
          id: 'fullstack_dev',
          title: 'Fullstack Development',
          type: 'ENGINEERING',
          description: 'Building end-to-end digital products from concept to deployment. Proficient in modern frameworks like Next.js and React for frontend architecture, paired with robust Node.js backends and PostgreSQL databases. Experienced with TypeScript for type-safe code, Docker for containerization, and Redis for caching layers. Focused on delivering scalable, maintainable solutions with clean APIs and responsive UIs.',
          techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'Redis']
        }
      },
      { 
        x: 600, yOffset: 160, 
        skill: {
          id: '3d_art',
          title: '3D Interactive Art Design',
          type: 'CREATIVE TECH',
          description: 'Crafting immersive 3D experiences that push the boundaries of web interactivity. Skilled in Three.js and WebGL for real-time 3D rendering, blended with Framer Motion for fluid UI animations. From low-poly worlds to interactive data visualizations, I merge creative direction with technical execution to build visually compelling digital art installations.',
          techStack: ['Three.js', 'WebGL', 'Blender', 'Framer Motion', 'Canvas API']
        }
      },
      { 
        x: 800, yOffset: 160, 
        skill: {
          id: 'ai_automation',
          title: 'AI Automations',
          type: 'AUTOMATION',
          description: 'Designing intelligent autonomous systems that bridge LLMs with real-world business workflows. Expertise in building RAG pipelines with vector databases, orchestrating multi-agent systems using Claude and GPT-4, and automating complex processes through n8n workflows. Focused on creating practical AI solutions that drive efficiency and scale.',
          techStack: ['n8n', 'Python', 'LangChain', 'Vector DBs', 'OpenAI', 'Claude']
        }
      },
      { 
        x: 1000, yOffset: 160, 
        skill: {
          id: 'system_design',
          title: 'System Design',
          type: 'SYSTEM DESIGN',
          description: 'Architecting scalable, resilient systems with a focus on clean separation of concerns and maintainable codebases. Proficient in microservices architecture, cloud infrastructure (AWS), container orchestration (Docker), and state management strategies. Experienced with designing real-time systems, caching layers, and event-driven architectures that handle complexity gracefully.',
          techStack: ['Microservices', 'AWS', 'Docker', 'Redis', 'State Machines', 'Event-Driven']
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
      { x: 500, yOffset: 160, project: PROJECTS[0] },
      { x: 1000, yOffset: 160, project: PROJECTS[1] },
      { x: 1500, yOffset: 160, project: PROJECTS[2] },
      { x: 2000, yOffset: 160, project: PROJECTS[3] },
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
