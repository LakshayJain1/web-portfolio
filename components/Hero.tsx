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

function drawMarioFrame(
  ctx: CanvasRenderingContext2D,
  frame: number,
  x: number,
  y: number,
  scale: number,
  flipX: boolean
) {
  const pixels = MARIO_FRAMES[frame % MARIO_FRAMES.length];
  ctx.save();
  if (flipX) {
    ctx.translate(x + 16 * scale, y);
    ctx.scale(-1, 1);
    ctx.translate(-x, -y);
  }
  pixels.forEach((row, ry) => {
    row.forEach((col, rx) => {
      if (!col) return;
      ctx.fillStyle = col;
      ctx.fillRect(x + rx * scale, y + ry * scale, scale, scale);
    });
  });
  ctx.restore();
}

function drawTile(ctx: CanvasRenderingContext2D, x: number, y: number, type: string) {
  const TILE = 32;
  if (type === 'ground') {
    ctx.fillStyle = '#C84C0C';
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = '#8B2500';
    ctx.fillRect(x, y + TILE - 6, TILE, 6);
    ctx.fillStyle = '#FF8C40';
    ctx.fillRect(x, y, TILE, 6);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, TILE, TILE);
  } else if (type === 'qblock') {
    ctx.fillStyle = '#E8A000';
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = '#FFD060';
    ctx.fillRect(x + 3, y + 3, TILE - 6, 6);
    ctx.fillStyle = '#A05000';
    ctx.fillRect(x + 3, y + TILE - 9, TILE - 6, 6);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, TILE, TILE);
    ctx.fillStyle = '#4A2800';
    ctx.font = 'bold 18px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('?', x + TILE / 2, y + TILE - 8);
  } else if (type === 'brick') {
    ctx.fillStyle = '#C84C0C';
    ctx.fillRect(x, y, TILE, TILE);
    ctx.strokeStyle = '#8B2500';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, TILE, TILE);
    ctx.fillStyle = '#8B2500';
    ctx.fillRect(x, y + TILE / 2 - 1, TILE, 2);
    ctx.fillRect(x + TILE / 2 - 1, y, 2, TILE / 2);
    ctx.fillRect(x + TILE / 4 - 1, y + TILE / 2, 2, TILE / 2);
    ctx.fillRect(x + (3 * TILE) / 4 - 1, y + TILE / 2, 2, TILE / 2);
  } else if (type === 'pipe') {
    ctx.fillStyle = '#00A800';
    ctx.fillRect(x - 4, y, 40, 14);
    ctx.fillRect(x, y + 14, 32, 60);
    ctx.strokeStyle = '#006400';
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 4, y, 40, 14);
    ctx.strokeRect(x, y + 14, 32, 60);
    ctx.fillStyle = '#00D800';
    ctx.fillRect(x + 2, y + 2, 8, 10);
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = 'white';
  ([[20, 24, 48, 20], [28, 12, 28, 20], [10, 20, 28, 20], [44, 18, 22, 18]] as [number, number, number, number][]).forEach(([rx, ry, rw, rh]) => {
    ctx.fillRect(x + rx, y + ry, rw, rh);
  });
}

function drawHill(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.fillStyle = '#00A800';
  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#00D800';
  for (let a = -70; a <= 70; a += 20) {
    const rad = (a * Math.PI) / 180;
    ctx.fillRect(
      x + Math.cos(rad) * (r * 0.6) - 3,
      y - Math.sin(rad) * (r * 0.6) - 6,
      6,
      12
    );
  }
}

function drawCastle(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#888';
  ctx.fillRect(x, y, 96, 80);
  ([[0, 0, 24, 24], [36, 0, 24, 24], [72, 0, 24, 24]] as [number, number, number, number][]).forEach(([rx, ry, rw, rh]) => {
    ctx.fillRect(x + rx, y + ry - 12, rw, rh);
  });
  ctx.fillStyle = '#000';
  ctx.fillRect(x + 36, y + 44, 24, 36);
  ([[8, 16, 16, 16], [56, 16, 16, 16], [8, 48, 12, 12], [68, 48, 12, 12]] as [number, number, number, number][]).forEach(([rx, ry, rw, rh]) => {
    ctx.fillRect(x + rx, y + ry, rw, rh);
  });
  ctx.fillStyle = '#F00';
  ctx.fillRect(x + 44, y - 24, 8, 12);
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { addScore } = useGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let marioX = 80;
    let marioVX = 1.8;
    let marioDir = 1;
    let marioJump = false;
    let marioJumpVY = 0;
    let marioGroundY = 0;
    let marioWalkFrame = 0;
    let marioFrameTimer = 0;
    const TILE = 32;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      marioGroundY = canvas.height - TILE * 2 - 16 * 4;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleClick = () => {
      if (!marioJump) {
        marioJump = true;
        marioJumpVY = -14;
        addScore(50);
      }
    };

    canvas.addEventListener('click', handleClick);

    let animationId: number;
    const heroLoop = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = '#5C94FC';
      ctx.fillRect(0, 0, W, H);

      const t = Date.now() / 1000;
      drawCloud(ctx, ((W * 0.05 - t * 30) % (W + 100) + W + 100) % (W + 100), H * 0.12);
      drawCloud(ctx, ((W * 0.3 - t * 20) % (W + 100) + W + 100) % (W + 100), H * 0.08);
      drawCloud(ctx, ((W * 0.6 - t * 25) % (W + 100) + W + 100) % (W + 100), H * 0.14);
      drawCloud(ctx, ((W * 0.8 - t * 18) % (W + 100) + W + 100) % (W + 100), H * 0.06);

      drawHill(ctx, W * 0.1, H - TILE * 2, 60);
      drawHill(ctx, W * 0.5, H - TILE * 2, 90);
      drawHill(ctx, W * 0.85, H - TILE * 2, 55);

      const groundY = H - TILE * 2;
      for (let x = 0; x < W; x += TILE) {
        drawTile(ctx, x, groundY, 'ground');
        drawTile(ctx, x, groundY + TILE, 'ground');
      }

      drawTile(ctx, W * 0.15, groundY - 74, 'pipe');
      drawTile(ctx, W * 0.78, groundY - 80, 'pipe');

      const blockY = groundY - TILE * 4;
      drawTile(ctx, W * 0.35, blockY, 'qblock');
      drawTile(ctx, W * 0.35 + TILE, blockY, 'brick');
      drawTile(ctx, W * 0.35 + TILE * 2, blockY, 'qblock');
      drawTile(ctx, W * 0.35 + TILE * 3, blockY, 'brick');
      drawTile(ctx, W * 0.35 + TILE * 4, blockY, 'qblock');

      drawCastle(ctx, W * 0.88, groundY - 80);

      ctx.textAlign = 'center';
      const fs = Math.min(32, W * 0.04);
      ctx.font = `bold ${fs}px "Press Start 2P"`;
      ctx.fillStyle = '#B8860B';
      ctx.fillText('DEV LAKSHAY', W / 2 + 4, H * 0.22 + 4);
      ctx.fillStyle = '#FFD700';
      ctx.fillText('DEV LAKSHAY', W / 2, H * 0.22);

      ctx.font = `${Math.min(12, W * 0.015)}px "Press Start 2P"`;
      ctx.fillStyle = 'white';
      ctx.fillText('DESIGNER  ✦  DEVELOPER  ✦  STORYTELLER', W / 2, H * 0.22 + Math.min(36, H * 0.065));

      if (Math.floor(Date.now() / 700) % 2 === 0) {
        ctx.font = `${Math.min(9, W * 0.012)}px "Press Start 2P"`;
        ctx.fillStyle = '#9be8ff';
        ctx.fillText('▼ SCROLL TO START ▼', W / 2, H * 0.22 + Math.min(60, H * 0.1));
      }

      const btnY = H * 0.42;
      const btn1X = W / 2 - 130;
      const btn2X = W / 2 + 10;
      const btnH = 34;
      const btnW = 120;

      ctx.fillStyle = '#008000';
      ctx.fillRect(btn1X, btnY, btnW, btnH);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeRect(btn1X, btnY, btnW, btnH);
      ctx.fillStyle = '#FFF';
      ctx.font = '7px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillText('▶ PROJECTS', btn1X + btnW / 2, btnY + 21);

      ctx.fillStyle = '#C00';
      ctx.fillRect(btn2X, btnY, btnW, btnH);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeRect(btn2X, btnY, btnW, btnH);
      ctx.fillStyle = '#FFF';
      ctx.font = '7px "Press Start 2P"';
      ctx.fillText('★ HIRE ME', btn2X + btnW / 2, btnY + 21);

      marioGroundY = groundY - 16 * 4;
      marioFrameTimer++;
      if (!marioJump && marioFrameTimer % 8 === 0) marioWalkFrame++;
      marioX += marioVX;
      if (marioX > W - 80) {
        marioVX = -Math.abs(marioVX);
        marioDir = -1;
      }
      if (marioX < 40) {
        marioVX = Math.abs(marioVX);
        marioDir = 1;
      }

      if (marioJump) {
        marioJumpVY += 0.7;
        marioGroundY += marioJumpVY;
        if (marioGroundY >= groundY - 16 * 4) {
          marioGroundY = groundY - 16 * 4;
          marioJump = false;
          marioJumpVY = 0;
        }
      }

      const frame = marioJump ? 2 : marioWalkFrame % 3;
      drawMarioFrame(ctx, frame, marioX, marioGroundY, 4, marioDir === -1);

      animationId = requestAnimationFrame(heroLoop);
    };

    heroLoop();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [addScore]);

  return (
    <section
      id="hero"
      style={{
        background: 'var(--sky)',
        minHeight: '100vh',
        paddingTop: '64px',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: 'calc(100vh - 64px)',
        }}
      />
    </section>
  );
}
