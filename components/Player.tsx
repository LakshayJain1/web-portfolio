'use client';

import { useEffect, useRef } from 'react';
import { useGame } from './GameContext';
import { WORLD_DATA } from './GameConfig';
import { playJump, playCoin, playPipeEnter, playPowerUp, playBlockBump } from './SoundManager';

const P = {
  R1: '#FF4D4D', // highlight
  R2: '#E52020', // base
  R3: '#9E1010', // shadow

  S1: '#FFD6A5',
  S2: '#FAB278',
  S3: '#C68642',

  B1: '#4A7BFF',
  B2: '#3060C8',
  B3: '#1E3F8A',

  T1: '#F4A261',
  T2: '#F07820',
  T3: '#8C4A1A',

  K: '#202020',
  _: null as string | null,
};

const SPRITE_SIZE = 24;
const E = P._;

const emptyRows = Array.from({ length: 9 }, () => Array(24).fill(E));

const MARIO_FRAMES = [

  // ================= IDLE =================
  [
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, P.R1, P.R1, P.R2, P.R2, P.R3, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, P.R1, P.R1, P.R2, P.R2, P.R2, P.R3, P.R3, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.K, P.K, P.K, P.S1, P.S2, P.K, P.S2, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, P.K, P.S1, P.K, P.S2, P.S2, P.S2, P.K, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, P.K, P.S1, P.K, P.K, P.S2, P.S2, P.S2, P.K, P.S3, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.S2, P.S2, P.S2, P.S2, P.S2, P.S2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, E, E, E, P.B1, P.B2, P.T2, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.B1, P.B2, P.B2, P.T2, P.B2, P.B3, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.B1, P.B2, P.B2, P.B2, P.T2, P.T2, P.T2, P.B2, P.B3, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, P.S1, P.S2, P.B2, P.T2, P.T2, P.T2, P.T2, P.T2, P.B2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.S1, P.S2, P.S2, P.T2, P.T2, P.T2, P.T2, P.T2, P.S2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, E, P.T2, P.T2, P.T2, E, P.T2, P.T2, P.T3, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.K, P.K, P.T2, E, E, E, P.T2, P.K, P.K, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [P.K, P.K, P.K, E, E, E, E, E, P.K, P.K, P.K, E, E, E, E, E, E, E, E, E, E, E, E, E],

    ...emptyRows,
  ],

  // ================= WALK 1 =================
  [
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, P.R1, P.R1, P.R2, P.R2, P.R3, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, P.R1, P.R1, P.R2, P.R2, P.R2, P.R3, P.R3, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.K, P.K, P.K, P.S1, P.S2, P.K, P.S2, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, P.K, P.S1, P.K, P.S2, P.S2, P.S2, P.K, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, P.K, P.S1, P.K, P.K, P.S2, P.S2, P.S2, P.K, P.S3, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.S2, P.S2, P.S2, P.S2, P.S2, P.S2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, E, E, E, P.B1, P.B2, P.T2, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.B1, P.B2, P.B2, P.T2, P.B2, P.B3, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.B1, P.B2, P.B2, P.B2, P.T2, P.T2, P.T2, P.B2, P.B3, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, P.S1, P.S2, P.B2, P.T2, P.T2, P.T2, P.T2, P.T2, P.B2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.S1, P.S2, P.S2, P.T2, P.T2, P.T2, P.T2, P.T2, P.S2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, E, P.T2, P.T2, E, E, P.T2, P.T2, P.T3, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.K, P.T2, P.K, E, E, E, P.K, P.T2, P.K, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [P.K, P.K, E, P.K, E, E, E, P.K, E, P.K, P.K, E, E, E, E, E, E, E, E, E, E, E, E, E],

    ...emptyRows,
  ],

  // ================= WALK 2 =================
  [
    [E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, P.R1, P.R1, P.R2, P.R2, P.R3, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, P.R1, P.R1, P.R2, P.R2, P.R2, P.R3, P.R3, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.K, P.K, P.K, P.S1, P.S2, P.K, P.S2, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, P.K, P.S1, P.K, P.S2, P.S2, P.S2, P.K, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, P.K, P.S1, P.K, P.K, P.S2, P.S2, P.S2, P.K, P.S3, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.S2, P.S2, P.S2, P.S2, P.S2, P.S2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, E, E, E, P.B1, P.B2, P.T2, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, P.B1, P.B2, P.B2, P.T2, P.B2, P.B3, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.B1, P.B2, P.B2, P.B2, P.T2, P.T2, P.T2, P.B2, P.B3, P.B3, E, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, P.S1, P.S2, P.B2, P.T2, P.T2, P.T2, P.T2, P.T2, P.B2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.S1, P.S2, P.S2, P.T2, P.T2, P.T2, P.T2, P.T2, P.S2, P.S2, P.S3, E, E, E, E, E, E, E, E, E, E, E, E],

    [E, E, P.T2, P.T2, P.T2, E, E, P.T2, P.T3, E, E, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [E, P.K, P.K, P.T2, E, E, E, E, P.T2, P.K, P.K, E, E, E, E, E, E, E, E, E, E, E, E, E],
    [P.K, P.K, P.K, E, E, E, E, E, E, P.K, P.K, P.K, E, E, E, E, E, E, E, E, E, E, E, E],

    ...emptyRows,
  ],
];
function drawMarioFrame(
  ctx: CanvasRenderingContext2D,
  frame: number,
  scale: number,
  flipX: boolean
) {
  ctx.clearRect(0, 0, SPRITE_SIZE * scale, SPRITE_SIZE * scale);
  const pixels = MARIO_FRAMES[frame % MARIO_FRAMES.length];
  ctx.save();
  if (flipX) {
    ctx.translate(SPRITE_SIZE * scale, 0);
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

// Mario hitbox: 40x56 (roughly 1.25x1.75 blocks)
const MARIO_W = 40;
const MARIO_H = 56;
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
    dismissOnboarding
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
  });

  const hasInteracted = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.code)) {
        keys.current[e.code as keyof typeof keys.current] = true;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
          e.preventDefault();
        }
      }
      // Dismiss onboarding on first input
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        dismissOnboarding();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (keys.current.hasOwnProperty(e.code)) {
        keys.current[e.code as keyof typeof keys.current] = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
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
      
      // TERRAIN_GROUND matches WorldTerrain's groundY (H - 64) — where ground tiles are drawn
      const TERRAIN_GROUND = H - 64;
      const GROUND_Y = TERRAIN_GROUND - MARIO_H;

      if (!started) {
        s.x = WORLD_DATA[activeWorld]?.startX || 100;
        s.y = GROUND_Y;
        started = true;
      }

      // ─── Physics constants ─────────────────────
      const SPEED = 350;
      const GRAVITY = 2400;
      const JUMP_FORCE = -750;
      const MAX_FALL = 900;

      const config = WORLD_DATA[activeWorld];
      if (!config) { animationId = requestAnimationFrame(loop); return; }

      // ─── Pipe enter animation ──────────────────
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
        // ─── Check pipe entry ────────────────────
        const pipes = config.pipes || [];
        let onTopOfPipe: typeof pipes[0] | null = null;
        for (const p of pipes) {
          const pipeVisualTop = TERRAIN_GROUND - PIPE_H;
          const pipeCenterX = p.x + PIPE_BODY_W / 2;
          const marioCenterX = s.x + MARIO_W / 2;
          const distX = Math.abs(marioCenterX - pipeCenterX);

          // Enter pipe if: near pipe horizontally AND (on ground or on top of pipe) AND not jumping
          const onGround = Math.abs(s.y - GROUND_Y) < 6;
          const onPipeTop = Math.abs((s.y + MARIO_H) - pipeVisualTop) < 10;
          if (distX < 60 && (onGround || onPipeTop) && !s.isJumping) {
            onTopOfPipe = p;
          }
        }

        if (K.ArrowDown && onTopOfPipe) {
          s.animState = 'pipe_enter';
          s.vx = 0;
          s.vy = 0;
          s.pipeEnterTimer = 0;
          s.hasPlayedPipeSound = false;
          // Center Mario on pipe
          s.x = onTopOfPipe.x + PIPE_BODY_W / 2 - MARIO_W / 2;
        }

        if (s.animState !== 'pipe_enter') {
          // ─── Horizontal movement ───────────────
          if (s.knockbackTimer > 0) {
            s.knockbackTimer -= dt;
          } else {
            if (K.ArrowRight) {
              s.vx = SPEED;
              s.dir = 1;
            } else if (K.ArrowLeft) {
              s.vx = -SPEED;
              s.dir = -1;
            } else {
              s.vx = 0;
            }
          }

          // ─── Jump ──────────────────────────────
          if (K.ArrowUp && !s.isJumping) {
            s.vy = JUMP_FORCE;
            s.isJumping = true;
            playJump();
            setActivePopup(null);
          }

          // ─── Apply gravity ─────────────────────
          s.vy += GRAVITY * dt;
          if (s.vy > MAX_FALL) s.vy = MAX_FALL;

          let nextX = s.x + s.vx * dt;
          let nextY = s.y + s.vy * dt;

          // ─── Horizontal pipe collision ─────────
          for (const p of pipes) {
            const pipeVisualTop = TERRAIN_GROUND - PIPE_H;
            const pipeLeft = p.x - 4;
            const pipeRight = p.x + PIPE_BODY_W + 4;

            // Only block if Mario's bottom is below pipe top (walking beside it)
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

          // ─── Solid zones collision (about board) ──
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

          // ─── Block head collision (jumping up) ──
          if (s.vy < 0) {
            const blocks = config.blocks || [];
            for (const b of blocks) {
              const bTop = TERRAIN_GROUND - b.yOffset;
              const bBottom = bTop + BLOCK_SIZE;
              const bLeft = b.x;
              const bRight = b.x + BLOCK_SIZE;

              // Mario's head hitting block bottom
              if (s.x + MARIO_W > bLeft && s.x < bRight) {
                // If Mario's top is below block bottom but next frame it's above it
                if (nextY < bBottom && s.y >= bBottom - 8) {
                  nextY = bBottom;
                  s.vy = 0;

                  if (!b.hit) {
                    b.hit = true;
                    b.bounceTime = performance.now();
                    playBlockBump();

                    if (b.project) {
                      playPowerUp();
                      setTimeout(() => {
                        setActivePopup(b.project!);
                      }, 400);
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
                    // Spawn power-up effect after short delay
                    setTimeout(() => {
                      if (b.powerUp === 'mushroom') {
                        setLives(prev => Math.min(prev + 1, 99));
                      } else if (b.powerUp === 'flower') {
                        setPowerUpEffect('flower');
                        setTimeout(() => setPowerUpEffect('none'), 10000);
                      }
                    }, 300);
                  }
                }
              }
            }
          }

          // ─── Vertical pipe collision (landing) ──
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

          // ─── Ground collision ──────────────────
          if (!landedOnPipe && nextY >= GROUND_Y) {
            nextY = GROUND_Y;
            s.vy = 0;
            s.isJumping = false;
          }

          s.y = nextY;

          // ─── Coin collision ────────────────────
          const coins = config.coins || [];
          for (const c of coins) {
            if (!c.collected) {
              const cY = TERRAIN_GROUND - c.yOffset;
              if (s.x + MARIO_W > c.x && s.x < c.x + 32 &&
                s.y + MARIO_H > cY && s.y < cY + 32) {
                c.collected = true;
                c.popTime = performance.now();
                playCoin();
                // pop.x needs to be screen relative: worldX + cameraOffset
                collectCoin(c.x + s.cameraX, cY);
              }
            }
          }

          // ─── Enemy collision ────────────────────
          if (s.invulnerableTimer > 0) {
            s.invulnerableTimer -= dt;
          }

          const enemies = config.enemies || [];
          for (const e of enemies) {
            if (e.isDead) continue;

            const eY = TERRAIN_GROUND - e.yOffset - 32; // Assume enemy height 32
            const playerRect = { x: s.x + 8, y: s.y + 8, w: MARIO_W - 16, h: MARIO_H - 16 };
            const enemyRect = { x: e.x, y: eY, w: 32, h: 32 };

            if (isColliding(playerRect, enemyRect)) {
              // Stomp check
              if (s.vy > 0 && s.y + MARIO_H < eY + 16) {
                e.isDead = true;
                s.vy = -400; // Bounce up
                playBlockBump();
              } else if (s.invulnerableTimer <= 0) {
                // Hit by enemy
                setLives(prev => {
                  const next = prev - 1;
                  if (next <= 0) {
                    // Game Over - reset
                    triggerNavigation('hero');
                    setTimeout(() => {
                      s.x = 100;
                      s.y = GROUND_Y;
                      setLives(5);
                    }, 500);
                  }
                  return next;
                });
                s.invulnerableTimer = 2; // 2 seconds invulnerability
                s.knockbackTimer = 0.4;
                s.vx = s.x < e.x ? -SPEED : SPEED;
                s.vy = -300;
              }
            }
          }

          // ─── World bounds ──────────────────────
          const currentWorldWidth = Math.max(config.width, window.innerWidth);
          if (s.x < 0) s.x = 0;
          if (s.x > currentWorldWidth - MARIO_W) s.x = currentWorldWidth - MARIO_W;

          // ─── End-of-contact-world wrap ─────────
          if (activeWorld === 'contact' && s.x >= config.width - 200) {
            triggerNavigation('hero');
            s.x = WORLD_DATA['hero'].startX;
            s.y = GROUND_Y;
            s.vx = 0;
            s.vy = 0;
            started = false;
          }

          // ─── Animation state ───────────────────
          if (s.isJumping) {
            s.animState = 'jump';
          } else if (Math.abs(s.vx) > 0) {
            s.animState = 'walk';
            s.frameTimer += dt * 10;
            if (s.frameTimer > 1) {
              s.walkFrame++;
              s.frameTimer = 0;
            }
          } else {
            s.animState = 'idle';
            s.walkFrame = 0;
          }
        }
      }

      // ─── Draw Mario ───────────────────────────
      const frame = s.animState === 'jump' ? 2 : (s.animState === 'walk' ? s.walkFrame % 3 : 0);

      // Blink if invulnerable
      if (s.invulnerableTimer > 0 && Math.floor(time / 100) % 2 === 0) {
        // Skip drawing
      } else {
        drawMarioFrame(ctx, frame, SCALE, s.dir === -1);

        // Add flower aura if active
        if (powerUpEffect === 'flower') {
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
      }

      // ─── Camera ───────────────────────────────
      if (containerRef.current) {
        const currentWorldWidth = Math.max(config.width, window.innerWidth);
        const maxScrollRight = Math.max(0, currentWorldWidth - window.innerWidth);
        let targetCameraX = window.innerWidth / 2 - s.x;
        targetCameraX = Math.min(0, Math.max(-maxScrollRight, targetCameraX));

        const worldContainer = document.getElementById('world-container');
        if (worldContainer) {
          worldContainer.style.transform = `translateX(${targetCameraX}px)`;
        }
        s.cameraX = targetCameraX;
        const offsetX = (MARIO_W - CANVAS_SIZE) / 2;
        const offsetY = (MARIO_H - CANVAS_SIZE) / 2;
        containerRef.current.style.transform =
          `translate(${s.x + targetCameraX + offsetX}px, ${s.y + offsetY}px)`
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [collectCoin, activeWorld, setActiveWorld, setActivePopup, gameState, triggerNavigation, dismissOnboarding]);
  const SCALE = 4;
  const CANVAS_SIZE = SPRITE_SIZE * SCALE;
  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${MARIO_W}px`,
        height: `${MARIO_H}px`,
        zIndex: 1000,
        willChange: 'transform'
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ display: 'block' }}
      />
    </div>
  );
}
