'use client';

import React, { useEffect, useRef } from 'react';
import { TERRAIN_GROUND_DEPTH, WORLD_DATA } from './GameConfig';
import { useGame } from './GameContext';

/** Avoid restarting the RAF loop when unlock flags change (prevents hitches). */
function useTerrainUnlockRefs() {
  const { unlockedAbout, unlockedSkillsTiers } = useGame();
  const unlockedAboutRef = useRef(unlockedAbout);
  const unlockedSkillsTiersRef = useRef(unlockedSkillsTiers);
  unlockedAboutRef.current = unlockedAbout;
  unlockedSkillsTiersRef.current = unlockedSkillsTiers;
  return { unlockedAboutRef, unlockedSkillsTiersRef };
}

export function drawTile(ctx: CanvasRenderingContext2D, x: number, y: number, type: string) {
  const TILE = 40;
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
  } else if (type === 'ground_blue') {
    ctx.fillStyle = '#0040D8';
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = '#0020A8';
    ctx.fillRect(x, y + TILE - 6, TILE, 6);
    ctx.fillStyle = '#5C94FC';
    ctx.fillRect(x, y, TILE, 6);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, TILE, TILE);
  } else if (type === 'ground_green') {
    ctx.fillStyle = '#109010';
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = '#087008';
    ctx.fillRect(x, y + TILE - 6, TILE, 6);
    ctx.fillStyle = '#30C030';
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
  } else if (type === 'qblock_hit') {
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = '#6B4F0A';
    ctx.fillRect(x + 3, y + 3, TILE - 6, 6);
    ctx.fillStyle = '#5A3E00';
    ctx.fillRect(x + 3, y + TILE - 9, TILE - 6, 6);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, TILE, TILE);
  } else if (type === 'brick') {
    ctx.fillStyle = '#C84C0C';
    ctx.fillRect(x, y, TILE, TILE);
    ctx.strokeStyle = '#8B2500';
    ctx.strokeRect(x, y, TILE, TILE);
  } else if (type === 'coin') {
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 16, 10, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawEnemy(ctx: CanvasRenderingContext2D, x: number, y: number, type: string, isDead: boolean) {
  const TILE = 40;
  if (isDead) {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x, y + 20, TILE, 12);
    return;
  }
  if (type === 'goomba') {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x, y, TILE, 24);
    ctx.fillStyle = '#D2B48C';
    ctx.fillRect(x + 4, y + 24, TILE - 8, 8);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x + 6, y + 6, 6, 6);
    ctx.fillRect(x + 20, y + 6, 6, 6);
  } else {
    ctx.fillStyle = '#00A800';
    ctx.fillRect(x, y + 8, TILE, 24);
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x + 4, y + 20, TILE - 8, 12);
  }
}

export function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  [[20, 24, 48, 20], [28, 12, 28, 20], [10, 20, 28, 20], [44, 18, 22, 18]].forEach(([rx, ry, rw, rh]) => {
    ctx.fillRect(x + rx, y + ry, rw, rh);
  });
}

export function drawHill(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.fillStyle = '#00A800';
  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI, 0);
  ctx.fill();
  ctx.fillStyle = '#00D800';
  for (let a = -70; a <= 70; a += 20) {
    const rad = (a * Math.PI) / 180;
    ctx.fillRect(x + Math.cos(rad) * (r * 0.6) - 3, y - Math.sin(rad) * (r * 0.6) - 6, 6, 12);
  }
}

interface WorldTerrainProps {
  worldId: string;
}

export default function WorldTerrain({ worldId }: WorldTerrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { unlockedAboutRef, unlockedSkillsTiersRef } = useTerrainUnlockRefs();
  const rafRef = useRef<number | null>(null);
  const ioVisibleRef = useRef(typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parentHeight = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.height = parentHeight;
      canvas.width = WORLD_DATA[worldId]?.width || Math.max(window.innerWidth, 2000);
    };

    resizeCanvas();
    let resizeT: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        resizeCanvas();
        resizeT = undefined;
      }, 120);
    };
    window.addEventListener('resize', onResize);

    const scheduleLoop = () => {
      if (rafRef.current != null) return;
      if (!ioVisibleRef.current || document.visibilityState === 'hidden') return;
      const tick = () => {
        if (!ioVisibleRef.current || document.visibilityState === 'hidden') {
          rafRef.current = null;
          return;
        }

        const H = canvas.height;
        const W = canvas.width;
        ctx.clearRect(0, 0, W, H);

        const t = Date.now() / 1000;
        const now = performance.now();
        const config = WORLD_DATA[worldId];
        if (!config) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        const unlockedAbout = unlockedAboutRef.current;
        const unlockedSkillsTiers = unlockedSkillsTiersRef.current;

        const groundY = H - TERRAIN_GROUND_DEPTH;

        // 1. Clouds
        if (config.theme !== 'underground') {
          for (let cx = 100; cx < config.width; cx += 500) {
            drawCloud(ctx, ((cx - t * 20) % (config.width) + config.width) % config.width, H * 0.15 + (Math.sin(cx) * 20));
          }
        }

        // 2. Hills
        if (config.theme === 'overworld' || config.theme === 'forest') {
          for (let hx = 300; hx < config.width; hx += 800) {
            drawHill(ctx, hx, groundY, 140);
          }
        }

        // 3. Ground
        const groundCols = Math.ceil(config.width / 40) + 1;
        for (let i = 0; i < groundCols; i++) {
          drawTile(ctx, i * 40, groundY, config.groundType);
          drawTile(ctx, i * 40, groundY + 40, config.groundType);
          drawTile(ctx, i * 40, groundY + 80, config.groundType);
          drawTile(ctx, i * 40, groundY + 120, config.groundType);
        }

        // 4. Pipes
        (config.pipes || []).forEach(p => {
          ctx.fillStyle = config.theme === 'underground' ? '#007000' : '#00A800';
          ctx.fillRect(p.x, groundY - 64, 64, 64);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 3;
          ctx.strokeRect(p.x, groundY - 64, 64, 64);
          ctx.fillStyle = config.theme === 'underground' ? '#009000' : '#00D800';
          ctx.fillRect(p.x - 4, groundY - 74, 72, 16);
          ctx.strokeRect(p.x - 4, groundY - 74, 72, 16);

          let isLocked = false;
          if (worldId === 'hero') {
            const heroBlocks = WORLD_DATA['hero'].blocks || [];
            const heroUnlocked = heroBlocks.every(block => block.hit);
            if (!heroUnlocked) isLocked = true;
          } else if (worldId === 'about') {
            if (!unlockedAbout) isLocked = true;
          } else if (worldId === 'skills') {
            const skillBlocks = WORLD_DATA['skills'].blocks || [];
            const skillsUnlocked = skillBlocks.every(block => block.hit);
            if (!skillsUnlocked) isLocked = true;
          } else if (worldId === 'projects') {
            const projectBlocks = WORLD_DATA['projects'].blocks || [];
            const projectsUnlocked = projectBlocks.every(block => block.hit);
            if (!projectsUnlocked) isLocked = true;
          }

          if (isLocked) {
            ctx.fillStyle = '#FF0000';
            ctx.font = '8px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('LOCKED', p.x + 32, groundY - 84);
          } else {
            if (Math.floor(t * 3) % 2 === 0) {
              ctx.fillStyle = '#FFF';
              ctx.font = '10px "Press Start 2P"';
              ctx.textAlign = 'center';
              ctx.fillText('▼', p.x + 32, groundY - 84);
            }
          }
        });

        // 5. Blocks
        [...(config.blocks || []), ...(config.powerUpBoxes || [])].forEach(b => {
          let bounceOffset = 0;
          if (b.bounceTime) {
            const elapsed = (now - b.bounceTime) / 1000;
            if (elapsed < 0.2) bounceOffset = Math.sin(elapsed / 0.2 * Math.PI) * -10;
          }
          drawTile(ctx, b.x, groundY - b.yOffset - 40 + bounceOffset, b.hit ? 'qblock_hit' : 'qblock');
        });

        // 6. Enemies
        (config.enemies || []).forEach(e => {
          if (!e.isDead) {
            e.x += e.dir * 1.2;
            if (e.x < 0 || e.x > config.width - 40) e.dir *= -1;
          }
          drawEnemy(ctx, e.x, groundY - e.yOffset - 40, e.type, !!e.isDead);
        });

        // 7. Coins
        (config.coins || []).forEach(c => {
          if (!c.collected) {
            const bob = Math.sin(t * 4 + c.x) * 4;
            drawTile(ctx, c.x, groundY - c.yOffset - 40 + bob, 'coin');
          }
        });

        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') stopLoop();
      else if (ioVisibleRef.current) scheduleLoop();
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      ioVisibleRef.current = false;
      io = new IntersectionObserver(
        (entries) => {
          const hit = entries[0];
          ioVisibleRef.current = hit ? hit.isIntersecting : true;
          if (ioVisibleRef.current && document.visibilityState === 'visible') scheduleLoop();
          else stopLoop();
        },
        { root: null, rootMargin: '72px 0px', threshold: 0 }
      );
      io.observe(canvas);
    }

    document.addEventListener('visibilitychange', onVisibility);
    if (typeof IntersectionObserver === 'undefined') {
      scheduleLoop();
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      if (resizeT) clearTimeout(resizeT);
      io?.disconnect();
      stopLoop();
    };
  }, [worldId]);

  return (
    <canvas
      ref={canvasRef}
      width={WORLD_DATA[worldId]?.width || 2000}
      className="absolute inset-y-0 left-0 z-0 h-full pointer-events-none"
    />
  );
}
