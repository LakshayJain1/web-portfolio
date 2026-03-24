'use client';

import { useEffect, useRef } from 'react';
import { useGame } from './GameContext';

const P = {
  R: '#E52020',
  S: '#FAB278',
  B: '#3060C8',
  W: '#FFFFFF',
  K: '#202020',
  Y: '#C08000',
  T: '#F07820',
  _: null as string | null,
};

const MARIO_FRAMES = [
  [
    [P._, P._, P._, P.R, P.R, P.R, P.R, P.R, P.R, P._, P._, P._, P._, P._, P._, P._],
    [P._, P._, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P._, P._, P._, P._],
    [P._, P._, P.K, P.K, P.K, P.S, P.S, P.K, P.S, P._, P._, P._, P._, P._, P._, P._],
    [P._, P.K, P.S, P.K, P.S, P.S, P.S, P.K, P.S, P.S, P.S, P._, P._, P._, P._, P._],
    [P._, P.K, P.S, P.K, P.K, P.S, P.S, P.S, P.K, P.S, P.S, P.S, P._, P._, P._, P._],
    [P._, P._, P.S, P.S, P.S, P.S, P.S, P.S, P.S, P.S, P._, P._, P._, P._, P._, P._],
    [P._, P._, P._, P.B, P.B, P.T, P.B, P._, P._, P._, P._, P._, P._, P._, P._, P._],
    [P._, P._, P.B, P.B, P.B, P.T, P.B, P.B, P.B, P._, P._, P._, P._, P._, P._, P._],
    [P.B, P.B, P.B, P.B, P.T, P.T, P.T, P.B, P.B, P.B, P.B, P._, P._, P._, P._, P._],
    [P.S, P.S, P.B, P.T, P.T, P.T, P.T, P.T, P.B, P.S, P.S, P._, P._, P._, P._, P._],
    [P.S, P.S, P.S, P.T, P.T, P.T, P.T, P.T, P.S, P.S, P.S, P._, P._, P._, P._, P._],
    [P._, P._, P.T, P.T, P.T, P._, P.T, P.T, P.T, P._, P._, P._, P._, P._, P._, P._],
    [P._, P.K, P.K, P.T, P._, P._, P._, P.T, P.K, P.K, P._, P._, P._, P._, P._, P._],
    [P.K, P.K, P.K, P._, P._, P._, P._, P._, P.K, P.K, P.K, P._, P._, P._, P._, P._],
  ],
];

function drawMarioFrame(ctx: CanvasRenderingContext2D, frame: number, scale: number) {
  const pixels = MARIO_FRAMES[frame % MARIO_FRAMES.length];
  pixels.forEach((row, ry) => {
    row.forEach((col, rx) => {
      if (!col) return;
      ctx.fillStyle = col;
      ctx.fillRect(rx * scale, ry * scale, scale, scale);
    });
  });
}

function drawProjectArt(ctx: CanvasRenderingContext2D, projId: number, W: number, H: number) {
  ctx.clearRect(0, 0, W, H);

  const themes = [
    { bg: '#001830', accent: '#00BFFF', label: 'RESXUME', sub: 'WEB DESIGN' },
    { bg: '#001800', accent: '#00FF80', label: 'JUICE FACTORY', sub: 'PROTOTYPE' },
    { bg: '#180030', accent: '#CC00FF', label: 'DEVYUT', sub: 'WEB DESIGN' },
    { bg: '#180800', accent: '#FF8000', label: 'ORDETA', sub: 'WEB DEV' },
  ];
  const t = themes[projId - 1];
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, H);

  for (let y = 0; y < H; y += 4) {
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, y, W, 2);
  }

  ctx.fillStyle = t.accent + '22';
  for (let x = 0; x < W; x += 16) {
    for (let y = 0; y < H; y += 16) {
      ctx.fillRect(x, y, 1, H);
      ctx.fillRect(x, y, W, 1);
    }
  }

  ctx.fillStyle = t.accent;
  ctx.font = 'bold 14px "Press Start 2P", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(t.label, W / 2, H / 2 - 8);
  ctx.font = '9px "Press Start 2P", monospace';
  ctx.fillStyle = '#888';
  ctx.fillText(t.sub, W / 2, H / 2 + 14);

  const mc = document.createElement('canvas');
  mc.width = 64;
  mc.height = 56;
  const mctx = mc.getContext('2d');
  if (mctx) {
    drawMarioFrame(mctx, 0, 4);
    ctx.drawImage(mc, W - 70, H - 62);
  }
}

interface Project {
  title: string;
  type: string;
  description: string;
  link: string;
}

const projects: Project[] = [
  {
    title: 'RESXUME WEBSITE',
    type: 'WEB DESIGN',
    description: 'A sleek resume-builder web product with clean layout, smooth interactions and conversion-focused UX.',
    link: 'https://devlakshay.framer.ai/#projects',
  },
  {
    title: 'THE JUICE FACTORY',
    type: 'PROTOTYPING',
    description: 'A vibrant brand & interactive Framer prototype for a fresh juice business — full UX from landing to checkout.',
    link: 'https://devlakshay.framer.ai/#projects',
  },
  {
    title: 'DEVYUT WEBSITE',
    type: 'WEB DESIGN',
    description: 'A professional tech-company website with dark aesthetic, 3D accents and polished component system.',
    link: 'https://devlakshay.framer.ai/#projects',
  },
  {
    title: 'ORDETA WEBSITE',
    type: 'WEB DEV',
    description: 'A fully developed product website with dynamic interactions, built from scratch with HTML/CSS/JS.',
    link: 'https://devlakshay.framer.ai/#projects',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { collectSkill } = useGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawProjectArt(ctx, index + 1, canvas.width, canvas.height);
  }, [index]);

  return (
    <div
      onClick={() => collectSkill(project.title, 500)}
      style={{
        background: '#1A0E00',
        border: '3px solid var(--question)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--coin)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--question)';
      }}
    >
      <div
        style={{
          width: '100%',
          height: '160px',
          background: '#000',
          borderBottom: '3px solid var(--question)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          width={300}
          height={160}
          style={{ width: '100%', height: '100%' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            background: 'var(--mario-red)',
            color: '#FFF',
            fontSize: '6px',
            padding: '4px 8px',
            border: '2px solid #000',
          }}
        >
          {project.type}
        </span>
      </div>
      <div style={{ padding: '16px' }}>
        <div
          style={{
            fontSize: '10px',
            color: 'var(--coin)',
            marginBottom: '8px',
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: '7px',
            color: '#AAA',
            lineHeight: '2',
            marginBottom: '12px',
          }}
        >
          {project.description}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '7px',
            color: '#5CF',
            border: '2px solid #5CF',
            padding: '6px 10px',
            display: 'inline-block',
            textDecoration: 'none',
            transition: 'background 0.1s, color 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5CF';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#5CF';
          }}
        >
          ▶ VIEW PROJECT
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        background: '#2A1800',
        minHeight: '90vh',
        padding: '80px 40px 60px',
        borderTop: '8px solid #000',
      }}
    >
      <div className="world-header">
        <div className="world-badge">WORLD 1-4</div>
        <h2 className="world-title">COMPLETED LEVELS</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '28px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
