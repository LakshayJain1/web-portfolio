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
  [
    [P._, P._, P._, P.R, P.R, P.R, P.R, P.R, P.R, P._, P._, P._, P._, P._, P._, P._],
    [P._, P._, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P._, P._, P._],
    [P._, P._, P.K, P.K, P.K, P.S, P.S, P.K, P.S, P._, P._, P._, P._, P._, P._, P._],
    [P._, P.K, P.S, P.K, P.S, P.S, P.S, P.K, P.S, P.S, P.S, P._, P._, P._, P._, P._],
    [P._, P.K, P.S, P.K, P.K, P.S, P.S, P.S, P.K, P.S, P.S, P.S, P._, P._, P._, P._],
    [P._, P._, P.S, P.S, P.S, P.S, P.S, P.S, P.S, P.S, P._, P._, P._, P._, P._, P._],
    [P._, P._, P._, P.B, P.B, P.T, P.B, P._, P._, P._, P._, P._, P._, P._, P._, P._],
    [P._, P._, P.B, P.B, P.B, P.T, P.B, P.B, P.B, P._, P._, P._, P._, P._, P._, P._],
    [P.B, P.B, P.B, P.B, P.T, P.T, P.T, P.B, P.B, P.B, P.B, P._, P._, P._, P._, P._],
    [P.S, P.S, P.B, P.T, P.T, P.T, P.T, P.T, P.B, P.S, P.S, P._, P._, P._, P._, P._],
    [P.S, P.S, P.S, P.T, P.T, P.T, P.T, P.T, P.S, P.S, P.S, P._, P._, P._, P._, P._],
    [P._, P._, P.T, P.T, P._, P._, P._, P.T, P.T, P._, P._, P._, P._, P._, P._, P._],
    [P._, P.K, P.T, P.K, P._, P._, P._, P.K, P.T, P.K, P._, P._, P._, P._, P._, P._],
    [P.K, P.K, P._, P.K, P._, P._, P._, P.K, P._, P.K, P.K, P._, P._, P._, P._, P._],
  ],
  [
    [P._, P._, P._, P.R, P.R, P.R, P.R, P.R, P.R, P._, P._, P._, P._, P._, P._, P._],
    [P._, P._, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P.R, P._, P._, P._],
    [P._, P._, P.K, P.K, P.K, P.S, P.S, P.K, P.S, P._, P._, P._, P._, P._, P._, P._],
    [P._, P.K, P.S, P.K, P.S, P.S, P.S, P.K, P.S, P.S, P.S, P._, P._, P._, P._, P._],
    [P._, P.K, P.S, P.K, P.K, P.S, P.S, P.S, P.K, P.S, P.S, P.S, P._, P._, P._, P._],
    [P._, P._, P.S, P.S, P.S, P.S, P.S, P.S, P.S, P.S, P._, P._, P._, P._, P._, P._],
    [P._, P._, P._, P.B, P.B, P.T, P.B, P._, P._, P._, P._, P._, P._, P._, P._, P._],
    [P._, P._, P.B, P.B, P.T, P.T, P.T, P.B, P._, P._, P._, P._, P._, P._, P._, P._],
    [P._, P.B, P.B, P.T, P.T, P.T, P.T, P.T, P.B, P.B, P._, P._, P._, P._, P._, P._],
    [P._, P.B, P.T, P.T, P.T, P._, P.T, P.T, P.T, P.B, P._, P._, P._, P._, P._, P._],
    [P._, P.T, P.T, P.T, P._, P._, P._, P.T, P.T, P.T, P._, P._, P._, P._, P._, P._],
    [P._, P.T, P.T, P._, P._, P._, P._, P._, P.T, P.T, P._, P._, P._, P._, P._, P._],
    [P.K, P.K, P._, P._, P._, P._, P._, P._, P._, P.K, P.K, P._, P._, P._, P._, P._],
    [P.K, P.K, P._, P._, P._, P._, P._, P._, P._, P.K, P.K, P._, P._, P._, P._, P._],
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

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, 128, 160);
      drawMarioFrame(ctx, frameRef.current % 3, 8);
      frameRef.current++;
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      style={{
        background: 'var(--underground)',
        minHeight: '80vh',
        padding: '80px 40px 60px',
        borderTop: '8px solid #000',
        position: 'relative',
      }}
    >
      <div className="world-header">
        <div className="world-badge">WORLD 1-2</div>
        <h2 className="world-title">PLAYER SELECT</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          maxWidth: '900px',
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <canvas
            ref={canvasRef}
            width={128}
            height={160}
            style={{ width: '128px', height: '160px' }}
          />
          <div className="life-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '8px', color: '#FFF', marginTop: '8px' }}>
            <span>LIVES</span>
            <span style={{ color: '#F00', letterSpacing: '4px' }}>♥ ♥ ♥</span>
          </div>
          <a
            className="cv-btn"
            href="https://drive.google.com/file/d/19lSjaETHcUer7lcT06HqR2nW8XSeRfrE/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#FF0000',
              color: '#FFF',
              border: '3px solid #000',
              padding: '10px 20px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              boxShadow: '4px 4px 0 #000',
              textDecoration: 'none',
              letterSpacing: '0.5px',
              marginTop: '16px',
            }}
          >
            📄 READ CV
          </a>
        </div>
        <div>
          <div
            style={{
              background: '#000068',
              border: '3px solid #5050FF',
              padding: '24px',
            }}
          >
            <p style={{ fontSize: 'clamp(7px, 1.2vw, 9px)', lineHeight: '2.2', color: '#CCC', marginBottom: '12px' }}>
              Hi, I&apos;m <strong style={{ color: 'var(--coin)' }}>Lakshay Jain</strong> — a designer, developer & digital storyteller who lives at the intersection of creativity and code.
            </p>
            <p style={{ fontSize: 'clamp(7px, 1.2vw, 9px)', lineHeight: '2.2', color: '#CCC', marginBottom: '12px' }}>
              I believe great design isn&apos;t just seen — <strong style={{ color: 'var(--coin)' }}>it&apos;s felt</strong>. I build experiences that are beautiful, functional, and immersive.
            </p>
            <p style={{ fontSize: 'clamp(7px, 1.2vw, 9px)', lineHeight: '2.2', color: '#CCC', marginBottom: '12px' }}>
              From <strong style={{ color: 'var(--coin)' }}>minimalist UI</strong> to expressive <strong style={{ color: 'var(--coin)' }}>3D scenes</strong>, I craft digital moments that resonate and leave a mark.
            </p>
            <p style={{ fontSize: 'clamp(7px, 1.2vw, 9px)', lineHeight: '2.2', color: '#CCC' }}>
              What started as a childhood fascination with art & computers turned into a lifelong pursuit of <strong style={{ color: 'var(--coin)' }}>digital craftsmanship</strong>.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            {[
              { num: '3+', label: 'YEARS EXP' },
              { num: '20+', label: 'PROJECTS' },
              { num: '8+', label: 'SERVICES' },
              { num: '∞', label: 'CREATIVITY' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: '#000',
                  border: '2px solid #5050FF',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    color: 'var(--coin)',
                    fontSize: 'clamp(14px, 2vw, 20px)',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  {stat.num}
                </span>
                <span style={{ color: '#888', fontSize: '7px' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
