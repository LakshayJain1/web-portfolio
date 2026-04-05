'use client';

import { useEffect, useRef } from 'react';
import { useGame } from './GameContext';
import { WORLD_DATA } from './GameConfig';
import { playJump, playCoin, playPipeEnter, playPowerUp, playBlockBump } from './SoundManager';

const P = {
  R1: '#FF0000', // red
  R2: '#B80000', // red shadow
  B1: '#0058F8', // blue
  B2: '#002088', // blue shadow
  S1: '#D8A060', // tanned skin
  S2: '#B07C44', // shadow skin
  T1: '#8C5000', // brown
  T2: '#503000', // brown shadow
  K: '#000000',
  W: '#FFFFFF',
  _: null as string | null,
};

const SPRITE_SIZE = 24;
const E = P._;

const emptyRows = Array.from({ length: 9 }, () => Array(24).fill(E));

const MARIO_FRAMES = [
  // ================= IDLE =================
  [
    [E, E, E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, E, E],
    [E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1],
    [E, E, E, P.T1, P.T1, P.T1, P.S1, P.S1, P.K, P.S1, E, E],
    [E, E, P.T1, P.S1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1, P.S1],
    [E, E, P.T1, P.S1, P.T1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1],
    [E, E, E, P.T1, P.S1, P.S1, P.S1, P.S1, P.K, P.K, P.K, P.K],
    [E, E, E, E, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, E],
    [E, E, E, P.R1, P.R1, P.B1, P.R1, P.R1, P.R1, E, E, E],
    [E, E, P.R1, P.R1, P.R1, P.B1, P.R1, P.R1, P.B1, P.R1, P.R1, E],
    [E, P.R1, P.R1, P.R1, P.R1, P.B1, P.B1, P.B1, P.B1, P.R1, P.R1, P.R1],
    [E, P.S1, P.S1, P.R1, P.B1, P.S2, P.B1, P.B1, P.S2, P.B1, P.R1, P.S1],
    [E, P.S1, P.S1, P.S1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, P.S1, P.S1],
    [E, P.S1, P.S1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, E],
    [E, E, E, P.B1, P.B1, P.B1, E, E, P.B1, P.B1, P.B1, E],
    [E, E, P.T1, P.T1, P.T1, E, E, E, P.T1, P.T1, P.T1, E],
    [E, P.T1, P.T1, P.T1, P.T1, E, E, E, P.T1, P.T1, P.T1, P.T1]
  ],
  // ================= WALK 1 =================
  [
    [E, E, E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, E, E],
    [E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1],
    [E, E, E, P.T1, P.T1, P.T1, P.S1, P.S1, P.K, P.S1, E, E],
    [E, E, P.T1, P.S1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1, P.S1],
    [E, E, P.T1, P.S1, P.T1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1],
    [E, E, E, P.T1, P.S1, P.S1, P.S1, P.S1, P.K, P.K, P.K, P.K],
    [E, E, E, E, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, E],
    [E, E, E, P.R1, P.R1, P.B1, P.R1, P.R1, P.R1, E, E, E],
    [E, E, P.S1, P.R1, P.R1, P.B1, P.R1, P.R1, P.B1, P.R1, E, E], // Swing left arm forward
    [E, P.S1, P.S1, P.R1, P.R1, P.B1, P.B1, P.B1, P.B1, P.R1, P.R1, E],
    [E, P.R1, P.R1, P.R1, P.B1, P.S2, P.B1, P.B1, P.S2, P.B1, P.R1, E],
    [E, E, E, P.R1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, E, E],
    [E, E, E, P.S1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, E, E], // Pull right arm back
    [E, E, E, E, P.B1, P.B1, E, E, P.B1, P.B1, E, E],
    [E, E, E, P.T1, P.T1, E, E, E, P.T1, P.T1, P.T1, E],
    [E, E, P.T1, P.T1, P.T1, E, E, E, E, P.T1, P.T1, P.T1] // Leg split
  ],
  // ================= WALK 2 =================
  [
    [E, E, E, E, E, E, E, E, E, E, E, E], // Bob down row
    [E, E, E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, E, E],
    [E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1],
    [E, E, E, P.T1, P.T1, P.T1, P.S1, P.S1, P.K, P.S1, E, E],
    [E, E, P.T1, P.S1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1, P.S1],
    [E, E, P.T1, P.S1, P.T1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1],
    [E, E, E, P.T1, P.S1, P.S1, P.S1, P.S1, P.K, P.K, P.K, P.K],
    [E, E, E, E, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, E],
    [E, E, E, P.R1, P.R1, P.B1, P.R1, P.R1, P.R1, E, E, E],
    [E, E, P.R1, P.R1, P.R1, P.B1, P.R1, P.R1, P.S1, P.R1, E, E], // Swing right arm forward
    [E, P.R1, P.R1, P.R1, P.R1, P.B1, P.B1, P.B1, P.B1, P.S1, P.S1, E],
    [E, P.R1, P.R1, P.S1, P.B1, P.S2, P.B1, P.B1, P.S2, P.B1, P.R1, E],
    [E, E, P.S1, P.S1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, E, E],
    [E, E, E, E, P.B1, P.B1, E, E, P.B1, P.B1, E, E],
    [E, E, P.T1, P.T1, P.T1, E, E, E, P.T1, P.T1, E, E],
    [P.T1, P.T1, P.T1, P.T1, E, E, E, E, P.T1, P.T1, P.T1, P.T1] // Crouched leg split
  ],
];
function drawMarioFrame(
  ctx: CanvasRenderingContext2D,
  frame: number,
  scale: number,
  flipX: boolean
) {
  const pixels = MARIO_FRAMES[frame % MARIO_FRAMES.length];
  const rows = pixels.length;
  const cols = pixels[0].length;

  ctx.clearRect(0, 0, cols * scale, rows * scale);
  ctx.save();
  if (flipX) {
    ctx.translate(cols * scale, 0);
    ctx.scale(-1, 1);
  }
  pixels.forEach((row, ry) => {
    row.forEach((col, rx) => {
      if (!col) return;
      ctx.fillStyle = col;
      ctx.fillRect(rx * scale, ry * scale, scale, scale);
    });
  });
  ctx.restore();
}

// Mario hitbox: 40x56
const MARIO_W = 44;
const MARIO_H = 64;
const PIPE_TOP_W = 40;
const PIPE_BODY_W = 32;
const PIPE_H = 74;
const BLOCK_SIZE = 32;

function isColliding(r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) {
  return r1.x < r2.x + r2.w && r1.x + r1.w > r2.x && r1.y < r2.y + r2.h && r1.y + r1.h > r2.y;
}

export default function Player() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeWorld, setActiveWorld, collectCoin, setActivePopup,
    gameState, setGameState, triggerNavigation,
    lives, setLives, powerUpEffect, setPowerUpEffect,
    dismissOnboarding, fullReset
  } = useGame();

  const state = useRef({
    x: 100,
    y: 0,
    vx: 0,
    vy: 0,
    isJumping: false,
    dir: 1,
    frameTimer: 0,
    walkFrame: 0,
    animState: 'idle' as string,
    pipeEnterTimer: 0,
    hasPlayedPipeSound: false,
    cameraX: 0,
    invulnerableTimer: 0,
    knockbackTimer: 0,
  });

  const keys = useRef({
    ArrowRight: false,
    ArrowLeft: false,
    ArrowUp: false,
    ArrowDown: false,
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
    Space: false,
  });

  const hasInteracted = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code in keys.current) {
        keys.current[e.code as keyof typeof keys.current] = true;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
          e.preventDefault();
        }
      }
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        dismissOnboarding();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code in keys.current) {
        keys.current[e.code as keyof typeof keys.current] = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);

    // Mobile interaction trigger (for sound/onboarding)
    const handleTouchStart = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        dismissOnboarding();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [dismissOnboarding]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastTime = performance.now();
    let started = false;

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const s = state.current;
      const K = keys.current;

      const viewport = document.getElementById('viewport-wrapper');
      const H = viewport ? viewport.clientHeight : window.innerHeight;

      const TERRAIN_GROUND = H - 64;
      const GROUND_Y = TERRAIN_GROUND - MARIO_H;

      if (!started) {
        s.x = WORLD_DATA[activeWorld]?.startX || 100;
        s.y = GROUND_Y;
        started = true;
      }

      const SPEED = 350;
      const GRAVITY = 2400;
      const JUMP_FORCE = -750;
      const MAX_FALL = 900;

      const config = WORLD_DATA[activeWorld];
      if (!config) { animationId = requestAnimationFrame(loop); return; }

      if (s.animState === 'pipe_enter') {
        if (!s.hasPlayedPipeSound) {
          playPipeEnter();
          s.hasPlayedPipeSound = true;
        }
        s.pipeEnterTimer += dt;
        s.y += 120 * dt;

        if (s.pipeEnterTimer > 0.6) {
          const pipes = config.pipes || [];
          const hitPipe = pipes.find(p => Math.abs(s.x + MARIO_W / 2 - (p.x + PIPE_BODY_W / 2)) < 50);
          if (hitPipe) {
            triggerNavigation(hitPipe.to);
            setTimeout(() => {
              const nextConfig = WORLD_DATA[hitPipe.to];
              s.x = nextConfig?.startX || 100;
              s.y = GROUND_Y;
              s.animState = 'idle';
              s.vx = 0;
              s.vy = 0;
              s.pipeEnterTimer = 0;
              s.hasPlayedPipeSound = false;
              started = false;
            }, 300);
          } else {
            s.animState = 'idle';
            s.y = GROUND_Y;
            s.pipeEnterTimer = 0;
            s.hasPlayedPipeSound = false;
          }
        }
      } else if (gameState === 'idle') {
        const pipes = config.pipes || [];
        let onTopOfPipe: typeof pipes[0] | null = null;
        for (const p of pipes) {
          const pipeVisualTop = TERRAIN_GROUND - PIPE_H;
          const pipeCenterX = p.x + PIPE_BODY_W / 2;
          const marioCenterX = s.x + MARIO_W / 2;
          const distX = Math.abs(marioCenterX - pipeCenterX);

          const onGround = Math.abs(s.y - GROUND_Y) < 6;
          const onPipeTop = Math.abs((s.y + MARIO_H) - pipeVisualTop) < 10;
          if (distX < 60 && (onGround || onPipeTop) && !s.isJumping) {
            onTopOfPipe = p;
          }
        }

        if ((K.ArrowDown || K.KeyS) && onTopOfPipe) {
          s.animState = 'pipe_enter';
          s.vx = 0;
          s.vy = 0;
          s.pipeEnterTimer = 0;
          s.hasPlayedPipeSound = false;
          s.x = onTopOfPipe.x + PIPE_BODY_W / 2 - MARIO_W / 2;
        }

        if (s.animState !== 'pipe_enter') {
          if (s.knockbackTimer > 0) {
            s.knockbackTimer -= dt;
          } else {
            if (K.ArrowRight || K.KeyD) {
              s.vx = SPEED;
              s.dir = 1;
            } else if (K.ArrowLeft || K.KeyA) {
              s.vx = -SPEED;
              s.dir = -1;
            } else {
              s.vx = 0;
            }
          }

          if ((K.ArrowUp || K.KeyW || K.Space) && !s.isJumping) {
            s.vy = JUMP_FORCE;
            s.isJumping = true;
            playJump();
            setActivePopup(null);
          }

          s.vy += GRAVITY * dt;
          if (s.vy > MAX_FALL) s.vy = MAX_FALL;

          let nextX = s.x + s.vx * dt;
          let nextY = s.y + s.vy * dt;

          for (const p of pipes) {
            const pipeVisualTop = TERRAIN_GROUND - PIPE_H;
            const pipeLeft = p.x - 4;
            const pipeRight = p.x + PIPE_BODY_W + 4;

            if (s.y + MARIO_H > pipeVisualTop + 4) {
              if (nextX + MARIO_W > pipeLeft && nextX < pipeRight) {
                if (s.x + MARIO_W <= pipeLeft) {
                  nextX = pipeLeft - MARIO_W;
                } else if (s.x >= pipeRight) {
                  nextX = pipeRight;
                }
                s.vx = 0;
              }
            }
          }

          const solidZones = config.solidZones || [];
          for (const zone of solidZones) {
            const zoneTop = GROUND_Y - zone.height;
            if (s.y + MARIO_H > zoneTop) {
              if (nextX + MARIO_W > zone.x && nextX < zone.x + zone.width) {
                if (s.x + MARIO_W <= zone.x) {
                  nextX = zone.x - MARIO_W;
                } else if (s.x >= zone.x + zone.width) {
                  nextX = zone.x + zone.width;
                }
                s.vx = 0;
              }
            }
          }

          s.x = nextX;

          if (s.vy < 0) {
            const blocks = config.blocks || [];
            for (const b of blocks) {
              const bTop = TERRAIN_GROUND - b.yOffset;
              const bBottom = bTop + BLOCK_SIZE;
              const bLeft = b.x;
              const bRight = b.x + BLOCK_SIZE;

              if (s.x + MARIO_W > bLeft && s.x < bRight) {
                if (nextY < bBottom && s.y >= bBottom - 8) {
                  nextY = bBottom;
                  s.vy = 0;
                  if (!b.hit) {
                    b.hit = true;
                    b.bounceTime = performance.now();
                    playBlockBump();
                    if (b.project) {
                      playPowerUp();
                      setTimeout(() => { setActivePopup(b.project!); }, 400);
                    }
                  }
                }
              }
            }

            const powerBoxes = config.powerUpBoxes || [];
            for (const b of powerBoxes) {
              const bTop = TERRAIN_GROUND - b.yOffset;
              const bBottom = bTop + BLOCK_SIZE;
              const bLeft = b.x;
              const bRight = b.x + BLOCK_SIZE;

              if (s.x + MARIO_W > bLeft && s.x < bRight) {
                if (nextY < bBottom && s.y >= bBottom - 8) {
                  nextY = bBottom;
                  s.vy = 0;
                  if (!b.hit) {
                    b.hit = true;
                    b.bounceTime = performance.now();
                    playBlockBump();
                    playPowerUp();
                    setTimeout(() => {
                      if (b.powerUp === 'mushroom') setLives(prev => Math.min(prev + 1, 99));
                      else if (b.powerUp === 'flower') {
                        setPowerUpEffect('flower');
                        setTimeout(() => setPowerUpEffect('none'), 10000);
                      }
                    }, 300);
                  }
                }
              }
            }
          }

          let landedOnPipe = false;
          if (s.vy > 0) {
            for (const p of pipes) {
              const pipeVisualTop = TERRAIN_GROUND - PIPE_H;
              const pipeLeft = p.x - 4;
              const pipeRight = p.x + PIPE_BODY_W + 4;
              if (s.x + MARIO_W > pipeLeft + 8 && s.x < pipeRight - 8) {
                if (nextY + MARIO_H >= pipeVisualTop && s.y + MARIO_H <= pipeVisualTop + s.vy * dt + 4) {
                  nextY = pipeVisualTop - MARIO_H;
                  s.vy = 0;
                  s.isJumping = false;
                  landedOnPipe = true;
                  break;
                }
              }
            }
          }

          if (!landedOnPipe && nextY >= GROUND_Y) {
            nextY = GROUND_Y;
            s.vy = 0;
            s.isJumping = false;
          }
          s.y = nextY;

          const coins = config.coins || [];
          for (const c of coins) {
            if (!c.collected) {
              const cY = TERRAIN_GROUND - c.yOffset;
              if (s.x + MARIO_W > c.x && s.x < c.x + 32 &&
                s.y + MARIO_H > cY && s.y < cY + 32) {
                c.collected = true;
                c.popTime = performance.now();
                playCoin();
                collectCoin(c.x + s.cameraX, cY);
              }
            }
          }

          if (s.invulnerableTimer > 0) s.invulnerableTimer -= dt;
          const enemies = config.enemies || [];
          for (const e of enemies) {
            if (e.isDead) continue;
            const eY = TERRAIN_GROUND - e.yOffset - 32;
            const playerRect = { x: s.x + 8, y: s.y + 8, w: MARIO_W - 16, h: MARIO_H - 16 };
            const enemyRect = { x: e.x, y: eY, w: 32, h: 32 };

            if (isColliding(playerRect, enemyRect)) {
              if (s.vy > 0 && s.y + MARIO_H < eY + 16) {
                e.isDead = true;
                s.vy = -400;
                playBlockBump();
              } else if (s.invulnerableTimer <= 0) {
                setLives(prev => {
                  const next = prev - 1;
                  if (next <= 0) {
                    triggerNavigation('hero');
                    fullReset();
                    setTimeout(() => { s.x = 100; s.y = GROUND_Y; }, 500);
                  }
                  return next;
                });
                s.invulnerableTimer = 2;
                s.knockbackTimer = 0.4;
                s.vx = s.x < e.x ? -SPEED : SPEED;
                s.vy = -300;
              }
            }
          }

          const currentWorldWidth = Math.max(config.width, window.innerWidth);
          if (s.x < 0) s.x = 0;
          if (s.x > currentWorldWidth - MARIO_W) s.x = currentWorldWidth - MARIO_W;

          if (activeWorld === 'contact' && s.x >= config.width - 200) {
            triggerNavigation('hero');
            fullReset();
            s.x = WORLD_DATA['hero'].startX;
            s.y = GROUND_Y;
            s.vx = 0;
            s.vy = 0;
            started = false;
          }

          if (s.isJumping) s.animState = 'jump';
          else if (Math.abs(s.vx) > 0) {
            s.animState = 'walk';
            s.frameTimer += dt * 10;
            if (s.frameTimer > 1) { s.walkFrame++; s.frameTimer = 0; }
          } else { s.animState = 'idle'; s.walkFrame = 0; }
        }
      }

      const frame = s.animState === 'jump' ? 2 : (s.animState === 'walk' ? s.walkFrame % 3 : 0);
      if (s.invulnerableTimer > 0 && Math.floor(time / 100) % 2 === 0) {} 
      else {
        drawMarioFrame(ctx, frame, SCALE, s.dir === -1);
        if (powerUpEffect === 'flower') {
          ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 2; ctx.setLineDash([4, 4]);
          ctx.strokeRect(0, 0, CANVAS_W, CANVAS_H);
        }
      }

      if (containerRef.current) {
        const currentWorldWidth = Math.max(config.width, window.innerWidth);
        const maxScrollRight = Math.max(0, currentWorldWidth - window.innerWidth);
        let targetCameraX = window.innerWidth / 2 - s.x;
        targetCameraX = Math.min(0, Math.max(-maxScrollRight, targetCameraX));
        const worldContainer = document.getElementById('world-container');
        if (worldContainer) worldContainer.style.transform = `translateX(${targetCameraX}px)`;
        s.cameraX = targetCameraX;
        const offsetX = (MARIO_W - CANVAS_W) / 2;
        const offsetY = (MARIO_H - CANVAS_H) / 2;
        containerRef.current.style.transform = `translate(${s.x + targetCameraX + offsetX}px, ${s.y + offsetY}px)`
      }
      animationId = requestAnimationFrame(loop);
    };
    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [collectCoin, activeWorld, setActiveWorld, setActivePopup, gameState, triggerNavigation, dismissOnboarding, fullReset]);
  const SCALE = 4;
  const pixels = MARIO_FRAMES[0];
  const CANVAS_W = pixels[0].length * SCALE;
  const CANVAS_H = pixels.length * SCALE;
  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 z-[1000] translate-x-0 translate-y-0 will-change-transform"
      style={{ width: `${MARIO_W}px`, height: `${MARIO_H}px` }}
    >
      <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} className="block" />
    </div>
  );
}
