'use client';

import React, { useEffect, useRef } from 'react';
import { WORLD_DATA } from './GameConfig';

export function drawTile(ctx: CanvasRenderingContext2D, x: number, y: number, type: string) {
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
    // Spent block — darker, no question mark
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
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, TILE, TILE);
    ctx.fillStyle = '#8B2500';
    ctx.fillRect(x, y + TILE / 2 - 1, TILE, 2);
    ctx.fillRect(x + TILE / 2 - 1, y, 2, TILE / 2);
    ctx.fillRect(x + TILE / 4 - 1, y + TILE / 2, 2, TILE / 2);
    ctx.fillRect(x + (3 * TILE) / 4 - 1, y + TILE / 2, 2, TILE / 2);
  } else if (type === 'coin') {
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 16, 12, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.fillStyle = '#DAA520';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 16, 6, 12, 0, 0, Math.PI * 2);
    ctx.fill();
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
    // Pipe highlight
    ctx.fillStyle = '#40FF40';
    ctx.fillRect(x + 2, y + 16, 4, 56);
  }
}

// Draw a power-up star emerging from a block
function drawPowerUpStar(ctx: CanvasRenderingContext2D, x: number, y: number, progress: number) {
  const size = 24 * Math.min(progress * 2, 1);
  const alpha = Math.max(0, 1 - (progress - 0.5) * 2);
  const floatY = y - progress * 60;
  
  ctx.save();
  ctx.globalAlpha = alpha;
  
  // Star body
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  const cx = x + 16;
  const cy = floatY;
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const r = i === 0 ? 0 : size / 2;
    if (i === 0) ctx.moveTo(cx + Math.cos(angle) * size / 2, cy + Math.sin(angle) * size / 2);
    else {
      ctx.lineTo(cx + Math.cos(angle - Math.PI / 5) * size / 4, cy + Math.sin(angle - Math.PI / 5) * size / 4);
      ctx.lineTo(cx + Math.cos(angle) * size / 2, cy + Math.sin(angle) * size / 2);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#B8860B';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.restore();
}

export function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ([[20, 24, 48, 20], [28, 12, 28, 20], [10, 20, 28, 20], [44, 18, 22, 18]] as [number, number, number, number][]).forEach(([rx, ry, rw, rh]) => {
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
    ctx.fillRect(
      x + Math.cos(rad) * (r * 0.6) - 3,
      y - Math.sin(rad) * (r * 0.6) - 6,
      6,
      12
    );
  }
}

interface WorldTerrainProps {
  worldId: string;
  theme?: 'overworld' | 'underground' | 'night';
}

export default function WorldTerrain({ worldId, theme = 'overworld' }: WorldTerrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const viewport = document.getElementById('viewport-wrapper');
    const H = viewport ? viewport.clientHeight : (window.innerHeight - 64);
    canvas.height = H;

    let animationId: number;

    const loop = () => {
      const H = canvas.height;
      const W = canvas.width;
      ctx.clearRect(0, 0, W, H);

      const t = Date.now() / 1000;
      const now = performance.now();

      const config = WORLD_DATA[worldId];
      if (!config) return;

      // Draw clouds if not underground
      if (theme !== 'underground') {
        for (let cx = 100; cx < config.width; cx += 500) {
          drawCloud(ctx, ((cx - t * 20) % (config.width) + config.width) % config.width, H * 0.15 + (Math.sin(cx) * 20));
        }
      }

      // Draw hills if overworld
      const groundY = H - 64;
      if (theme === 'overworld') {
        for (let hx = 300; hx < config.width; hx += 800) {
          drawHill(ctx, hx, groundY, 60 + (hx % 40));
        }
      }

      // Draw ground
      const TILE = 32;
      const groundType = theme === 'underground' ? 'ground_blue' : 'ground';
      for (let gx = 0; gx < config.width; gx += TILE) {
        drawTile(ctx, gx, groundY, groundType);
        drawTile(ctx, gx, groundY + TILE, groundType);
      }

      // Draw pipes with down-arrow hint
      config.pipes.forEach(p => {
        drawTile(ctx, p.x, groundY - 74, 'pipe');
        
        // Blinking down arrow above pipe
        if (Math.floor(t * 2) % 2 === 0) {
          ctx.fillStyle = '#FFF';
          ctx.font = '10px "Press Start 2P"';
          ctx.textAlign = 'center';
          ctx.fillText('▼', p.x + 16, groundY - 84);
        }
      });

      // Draw blocks with bounce animation
      if (config.blocks) {
        config.blocks.forEach(b => {
          let bounceOffset = 0;
          if (b.bounceTime) {
            const elapsed = (now - b.bounceTime) / 1000;
            if (elapsed < 0.3) {
              bounceOffset = Math.sin(elapsed / 0.3 * Math.PI) * -12;
            }
          }
          
          const blockType = b.hit ? 'qblock_hit' : 'qblock';
          drawTile(ctx, b.x, groundY - b.yOffset + bounceOffset, blockType);
          
          // Draw power-up star emerging if block was just hit and has a project
          if (b.hit && b.bounceTime && b.project) {
            const elapsed = (now - b.bounceTime) / 1000;
            if (elapsed < 1.5) {
              drawPowerUpStar(ctx, b.x, groundY - b.yOffset - 10, elapsed / 1.5);
            }
          }
        });
      }

      // Draw coins with bobbing + pop animation
      if (config.coins) {
        config.coins.forEach(c => {
          if (c.collected) {
            // Pop animation
            if (c.popTime) {
              const elapsed = (now - c.popTime) / 1000;
              if (elapsed < 0.4) {
                const scale = 1 + elapsed * 3;
                const alpha = 1 - elapsed / 0.4;
                ctx.save();
                ctx.globalAlpha = alpha;
                const cY = groundY - c.yOffset;
                ctx.translate(c.x + 16, cY + 16);
                ctx.scale(scale, scale);
                ctx.translate(-(c.x + 16), -(cY + 16));
                drawTile(ctx, c.x, cY - elapsed * 80, 'coin');
                ctx.restore();
              }
            }
          } else {
            // Normal bobbing coin
            const bob = Math.sin(t * 3 + c.x) * 4;
            drawTile(ctx, c.x, groundY - c.yOffset + bob, 'coin');
          }
        });
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [worldId, theme]);

  return (
    <canvas
      ref={canvasRef}
      width={WORLD_DATA[worldId]?.width || 1500}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    />
  );
}
