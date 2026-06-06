export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  contentHtml: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  accentColor: string;
  world: string;
  emoji: string;
  nextSlug: string | null;
  featured: boolean;
}

export const BLOGS: BlogPost[] = [
  {
    slug: "nexus",
    title: "Building NEXUS-OS:\nA Game-Driven Portfolio",
    subtitle:
      "Why I turned my portfolio into a playable side-scroller — and what I learned about physics, state, and delight.",
    excerpt:
      "Why I turned my portfolio into a playable side-scroller — and what I learned about physics, state, and delight along the way.",
    contentHtml: `
      <p>Most portfolios are static galleries. I wanted mine to feel like a <strong>world you explore</strong> — something that rewards curiosity the way a good platformer does. The idea was simple: instead of scrolling through work, you run through it.</p>

      <h2>THE CORE LOOP</h2>
      <p>The interaction model is lifted directly from Mario: <em>move, jump, discover</em>. Hit a ? block, unlock a project. The terrain scrolls horizontally. Every section of the portfolio is a "world" with its own aesthetic — Skills Arsenal, Mission Archive, Comms Terminal.</p>

      <div class="callout">Start with one interaction that feels great — a jump, a coin sound, a block bounce — and build the world around that moment. Everything else follows from the feel.</div>

      <h2>TECH UNDER THE HOOD</h2>
      <p>Three systems work together here. A <strong>Canvas terrain renderer</strong> handles the ground, pipes, blocks, and Mario sprite. <strong>React Context</strong> manages global game state so any component can read position, unlocked missions, and current world. <strong>Framer Motion</strong> handles all the UI overlays — project cards, modal sheets, the contact terminal.</p>

      <div class="code-block">// Game state context
const GameState = createContext({
  score: 0,
  unlockedWorlds: [],
  marioX: 0,
  coinCount: 0
});</div>

      <p>The key architectural decision: the Canvas and React live in <em>separate layers</em>. The Canvas is fullscreen, fixed, z-index 1. React UI sits above it at z-index 10+. They communicate only through Context — the Canvas writes position, React reads it.</p>

      <h2>THE SCROLL PROBLEM</h2>
      <p>Native browser scrolling had to die. Arrow keys and pipe transitions control navigation instead. But long-form content — like project descriptions — still needs to scroll. The solution: an <strong>.allow-scroll</strong> class on any modal or panel that needs vertical scroll. Everything else has <code>overflow: hidden</code> and <code>touch-action: none</code>.</p>

      <h2>PHYSICS THAT FEEL RIGHT</h2>
      <p>Pixel-perfect Mario physics aren't just <em>addVelocity(9.8)</em>. The real feel comes from asymmetric gravity — fall faster than you rise — and coyote time (a 6-frame window where you can still jump after walking off a ledge). These two details alone make the jump feel satisfying rather than floaty.</p>

      <div class="callout">Coyote time is the secret sauce of every platformer that feels great. Most people don't know it exists — they just know the game "feels good."</div>

      <h2>WHAT I'D DO DIFFERENTLY</h2>
      <p>The Canvas and React split works, but communication through Context creates subtle timing bugs when Mario is mid-jump and a modal opens. Next time: a proper <strong>event bus</strong> or a state machine (XState is perfect for game logic) to decouple the systems cleanly.</p>
      <p>If you're considering a playful portfolio, start small. One interaction, polished to perfection. Then build the world outward from that moment of delight.</p>
    `,
    publishedAt: "2025-11-12",
    readTime: "6 min",
    tags: ["Portfolio", "React", "Game Dev"],
    accentColor: "#FFD700",
    world: "WORLD 1-1",
    emoji: "🕹️",
    nextSlug: "framer",
    featured: true,
  },
  {
    slug: "framer",
    title: "Framer vs Next.js:\nPrototype vs Ship",
    subtitle:
      "A practical split: Framer for narrative and stakeholder demos, Next.js when you need data, auth, and scale.",
    excerpt:
      "A practical split: Framer for narrative and stakeholder demos, Next.js when you need data, auth, and scale.",
    contentHtml: `
      <p>This isn't a "which is better" argument. Framer and Next.js solve different problems, and using the right one at the right moment is the skill that separates fast teams from slow ones.</p>

      <h2>WHEN TO REACH FOR FRAMER</h2>
      <p>Framer wins whenever <strong>narrative matters more than data</strong>. Marketing sites, portfolio pages, conference demos, investor decks that live on the web — anything where the goal is to communicate feel and vision. Framer's scroll interactions, component variants, and CMS are genuinely excellent for this. You can produce something that looks like a $50k agency build in a weekend.</p>

      <div class="callout">Rule: if a stakeholder needs to feel something — use Framer. If a user needs to do something — use Next.js.</div>

      <h2>WHEN NEXT.JS WINS</h2>
      <p>The moment you need <em>auth, a database, dynamic routes per user, complex API integrations, or real-time data</em> — Framer's abstraction layer becomes a ceiling. Next.js with App Router, Prisma, and a Postgres instance on Railway will handle anything you throw at it. The tradeoff is setup time and the absence of Framer's delightful visual tools.</p>

      <h2>THE HYBRID PATTERN</h2>
      <p>The workflow I've settled on: <strong>Framer for the shell, Next.js for the core</strong>. The landing page, pricing, and marketing routes live in Framer — fast to iterate, easy for non-devs to edit. The actual product — dashboard, user management, API — lives in Next.js, embedded via iframe or deployed on a subdomain. Users never feel the seam.</p>

      <div class="code-block">// next.config.js — allow Framer to embed
headers: [
  {
    source: '/dashboard/:path*',
    headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }]
  }
]</div>

      <p>The result: a marketing site that a designer can update without touching code, connected to a product that can scale to millions of users. Both tools, in their correct domain, doing what they're best at.</p>
    `,
    publishedAt: "2025-09-03",
    readTime: "4 min",
    tags: ["Framer", "Next.js", "Workflow"],
    accentColor: "#55CCFF",
    world: "WORLD 1-2",
    emoji: "⚙️",
    nextSlug: "pixel",
    featured: false,
  },
  {
    slug: "pixel",
    title: "Pixel Design Systems\nThat Don't Feel Cheap",
    subtitle:
      "Retro aesthetics work when typography, spacing, and motion are disciplined — not when everything is just noisy.",
    excerpt:
      "Retro aesthetics work when typography, spacing, and motion are disciplined — not when everything is just noisy.",
    contentHtml: `
      <p>Pixel aesthetics have a reputation problem. Done carelessly, they look like a game jam entry. Done with discipline, they're genuinely stunning — a coherent visual language with real personality.</p>

      <h2>THE TYPOGRAPHY PROBLEM</h2>
      <p>Most pixel sites fail at typography. They use <strong>Press Start 2P</strong> for everything — body copy, labels, headings, captions. The result is visually exhausting. Press Start 2P belongs in headings and labels only. For body text, pair it with a monospace companion like <em>VT323</em> or <em>Share Tech Mono</em> — legible at small sizes, retro in spirit.</p>

      <div class="callout">A pixel design system needs two type layers: display (Press Start 2P, pixelated, uppercase) and reading (VT323 or Share Tech Mono, smooth, larger size). Never use the display font for paragraphs.</div>

      <h2>SPACING THAT LOCKS</h2>
      <p>Pixel aesthetics thrive on <strong>4px grids</strong>. Every padding, margin, gap, and border-radius (always 0 — no rounding) should be a multiple of 4. This creates the "locked in" rigidity that makes retro UI feel intentional rather than accidental.</p>

      <div class="code-block">/* spacing tokens — 4px base grid */
--space-1: 4px;   --space-2: 8px;
--space-3: 12px;  --space-4: 16px;
--space-6: 24px;  --space-8: 32px;
--space-12: 48px; --space-16: 64px;</div>

      <h2>MOTION WITH RESTRAINT</h2>
      <p>Pixel motion should feel like it came out of a 1990 SNES game: <em>instantaneous, binary, stepped</em>. Use CSS steps() for coin animations. Use 0.08s transitions instead of 0.3s. Hover states should snap, not ease. The moment you add a cubic-bezier ease to a pixel interface, it starts to feel wrong.</p>

      <h2>COLOR DISCIPLINE</h2>
      <p>Pick a palette of 8 colors maximum. One background, one ground/surface, one accent (gold/coin), one danger (red), one nature (green), black, white, and one muted mid-tone. More than 8 and the system starts to feel arbitrary. The constraint forces clarity.</p>

      <p>The real test of a pixel design system: can a junior designer extend it without breaking the aesthetic? If yes, you built a system. If no, you built a vibe.</p>
    `,
    publishedAt: "2025-06-18",
    readTime: "5 min",
    tags: ["Design Systems", "CSS", "Typography"],
    accentColor: "#E52020",
    world: "WORLD 1-3",
    emoji: "🎨",
    nextSlug: "motion",
    featured: false,
  },
  {
    slug: "motion",
    title: "Framer Motion:\nThe Right Way",
    subtitle:
      "Stop using motion for everything. How to identify the three moments in a UI that deserve animation — and nothing else.",
    excerpt:
      "Stop using motion for everything. How to identify the three moments in a UI that deserve animation — and nothing else.",
    contentHtml: `
      <p>Framer Motion is easy to overuse. It's so frictionless to add animations that new React devs end up wrapping every div in a motion component. The result: a UI that feels like it has ADHD. Everything moves, nothing communicates.</p>

      <h2>THE THREE MOMENTS RULE</h2>
      <p>Every UI has exactly <strong>three moments</strong> that deserve animation. First: the <em>page load</em> — one orchestrated stagger that reveals the hierarchy. Second: <em>meaningful state changes</em> — a modal appearing, a form submitting, a list filtering. Third: <em>user-triggered delight</em> — a button press, a completion state, an easter egg.</p>

      <div class="callout">If an animation exists to fill silence or dead time rather than communicate meaning — delete it. Motion is punctuation, not prose.</div>

      <h2>PAGE LOAD: STAGGER ONCE</h2>
      <p>The page load stagger is the single highest-value animation in any UI. Cards that enter sequentially feel like a world materializing. The key: use <strong>delayChildren</strong> and <strong>staggerChildren</strong> in the parent variants, not individual delays on each child.</p>

      <div class="code-block">const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}</div>

      <h2>STATE CHANGES: LAYOUT ANIMATIONS</h2>
      <p>Framer's <em>layoutId</em> is the killer feature most devs ignore. When an element moves between two states — a card expanding to a modal, a tab indicator sliding, a list reordering — layoutId automatically interpolates the transition. You describe the before and after states; Framer figures out the tween.</p>

      <h2>PERFORMANCE TRAPS</h2>
      <p>Two rules to keep motion smooth. Rule one: <strong>only animate transform and opacity</strong>. Width, height, top, left — these trigger layout recalculation on every frame and drop below 60fps instantly. Rule two: <strong>use will-change sparingly</strong>. On elements that animate frequently (a background pulse, a floating element), <code>will-change: transform</code> hints the GPU to pre-composite. On everything else, it wastes VRAM.</p>

      <p>Animation should make a UI feel more alive, not more anxious. When in doubt: less motion, more meaning.</p>
    `,
    publishedAt: "2025-03-05",
    readTime: "7 min",
    tags: ["Framer Motion", "Animation", "React"],
    accentColor: "#00A800",
    world: "WORLD 2-1",
    emoji: "✨",
    nextSlug: "nexus",
    featured: false,
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return BLOGS.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOGS.map((b) => b.slug);
}
