'use client';

import { useEffect, useRef } from 'react';
import { useGame } from './GameContext';
import { TERRAIN_GROUND_DEPTH, WORLD_DATA } from './GameConfig';
import { playJump, playCoin, playPowerUp, playBlockBump } from './SoundManager';

const P = {
  R1: '#FF2020', // red (brighter for visibility)
  R2: '#C00000', // red shadow
  B1: '#3070E8', // blue (brighter)
  B2: '#1040A8', // blue shadow
  S1: '#FAB278', // tanned skin
  S2: '#C07848', // shadow skin
  T1: '#8C5A00', // brown
  T2: '#603800', // brown shadow
  K: '#000000',
  W: '#FFFFFF',
  _: null as string | null,
};

// Pixel outline color — slightly off-black for a crisp pixel outline
const OUTLINE = '#1A0A00';

const E = P._;

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
    [E, E, P.S1, P.R1, P.R1, P.B1, P.R1, P.R1, P.B1, P.R1, E, E],
    [E, P.S1, P.S1, P.R1, P.R1, P.B1, P.B1, P.B1, P.B1, P.R1, P.R1, E],
    [E, P.R1, P.R1, P.R1, P.B1, P.S2, P.B1, P.B1, P.S2, P.B1, P.R1, E],
    [E, E, E, P.R1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, E, E],
    [E, E, E, P.S1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, E, E],
    [E, E, E, E, P.B1, P.B1, E, E, P.B1, P.B1, E, E],
    [E, E, E, P.T1, P.T1, E, E, E, P.T1, P.T1, P.T1, E],
    [E, E, P.T1, P.T1, P.T1, E, E, E, E, P.T1, P.T1, P.T1]
  ],
  // ================= WALK 2 =================
  [
    [E, E, E, E, E, E, E, E, E, E, E, E],
    [E, E, E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, E, E],
    [E, E, E, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1, P.R1],
    [E, E, E, P.T1, P.T1, P.T1, P.S1, P.S1, P.K, P.S1, E, E],
    [E, E, P.T1, P.S1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1, P.S1],
    [E, E, P.T1, P.S1, P.T1, P.T1, P.S1, P.S1, P.S1, P.K, P.S1, P.S1],
    [E, E, E, P.T1, P.S1, P.S1, P.S1, P.S1, P.K, P.K, P.K, P.K],
    [E, E, E, E, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, P.S1, E],
    [E, E, E, P.R1, P.R1, P.B1, P.R1, P.R1, P.R1, E, E, E],
    [E, E, P.R1, P.R1, P.R1, P.B1, P.R1, P.R1, P.S1, P.R1, E, E],
    [E, P.R1, P.R1, P.R1, P.R1, P.B1, P.B1, P.B1, P.B1, P.S1, P.S1, E],
    [E, P.R1, P.R1, P.S1, P.B1, P.S2, P.B1, P.B1, P.S2, P.B1, P.R1, E],
    [E, E, P.S1, P.S1, P.B1, P.B1, P.B1, P.B1, P.B1, P.B1, E, E],
    [E, E, E, E, P.B1, P.B1, E, E, P.B1, P.B1, E, E],
    [E, E, P.T1, P.T1, P.T1, E, E, E, P.T1, P.T1, E, E],
    [P.T1, P.T1, P.T1, P.T1, E, E, E, E, P.T1, P.T1, P.T1, P.T1]
  ],
];// Mario pixel dimensions — scale 5 for cleaner world-to-character ratio
const MARIO_SCALE = 5;
const PIXEL_COLS = 12;
const PIXEL_ROWS = 16;
/** One source-pixel padding so top/bottom/side outlines are not clipped by the canvas */
const MARIO_PAD_CELLS = 1;
const MARIO_W = (PIXEL_COLS + MARIO_PAD_CELLS * 2) * MARIO_SCALE;
const MARIO_H = (PIXEL_ROWS + MARIO_PAD_CELLS * 2) * MARIO_SCALE;
const BLOCK_SIZE = 40;

// Outline offsets for pixel-perfect outline rendering
const OUTLINE_OFFSETS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function drawMarioFrame(
  ctx: CanvasRenderingContext2D,
  frame: number,
  scale: number,
  flipX: boolean
) {
  const pixels = MARIO_FRAMES[frame % MARIO_FRAMES.length];
  const rows = pixels.length;
  const cols = pixels[0].length;
  const pad = MARIO_PAD_CELLS * scale;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.save();
  ctx.translate(pad, pad);
  if (flipX) {
    ctx.translate(cols * scale, 0);
    ctx.scale(-1, 1);
  }

  // 1. Draw pixel outline (dark outline for contrast)
  ctx.fillStyle = OUTLINE;
  pixels.forEach((row, ry) => {
    row.forEach((col, rx) => {
      if (!col) return;
      OUTLINE_OFFSETS.forEach(([ox, oy]) => {
        const nr = ry + oy;
        const nc = rx + ox;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || !pixels[nr][nc]) {
          ctx.fillRect((rx + ox) * scale, (ry + oy) * scale, scale, scale);
        }
      });
    });
  });

  // 2. Draw actual pixels on top
  pixels.forEach((row, ry) => {
    row.forEach((col, rx) => {
      if (!col) return;
      ctx.fillStyle = col;
      ctx.fillRect(rx * scale, ry * scale, scale, scale);
    });
  });

  ctx.restore();
}

export default function Player() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    activeWorld, collectCoin, setActivePopup,
    addScore,
    setLives,
    navigateToNextWorld,
    unlockedAbout, setUnlockedAbout,
    aboutDecrypting, setAboutDecrypting,
    unlockedSkillsTiers, setUnlockedSkillsTiers,
    markGameInteractionStarted,
    bumpWorldDataEpoch,
  } = useGame();

  const isTransitioning = useRef(false);

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
    invulnerableTimer: 0,
    knockbackTimer: 0,
    floorY: 0,
    idleBreathTimer: 0,
  });

  const keys = useRef({
    ArrowRight: false, ArrowLeft: false, ArrowUp: false, ArrowDown: false,
    KeyW: false, KeyA: false, KeyS: false, KeyD: false, Space: false,
  });

  const hasInteracted = useRef(false);
  const unlockedAboutRef = useRef(unlockedAbout);
  const aboutDecryptingRef = useRef(aboutDecrypting);
  const unlockedSkillsTiersRef = useRef(unlockedSkillsTiers);
  unlockedAboutRef.current = unlockedAbout;
  aboutDecryptingRef.current = aboutDecrypting;
  unlockedSkillsTiersRef.current = unlockedSkillsTiers;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code in keys.current) {
        keys.current[e.code as keyof typeof keys.current] = true;
      }
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        markGameInteractionStarted();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code in keys.current) {
        keys.current[e.code as keyof typeof keys.current] = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [markGameInteractionStarted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    let animationId: number;
    let lastTime = performance.now();
    let started = false;

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const s = state.current;
      const K = keys.current;

      const viewportH = window.innerHeight;
      const groundSurfaceY = viewportH - TERRAIN_GROUND_DEPTH;
      const GROUND_Y = groundSurfaceY - MARIO_H + 4;

      if (!started) {
        s.y = GROUND_Y;
        s.x = 100;
        isTransitioning.current = false;
        started = true;
      }

      const config = WORLD_DATA[activeWorld];
      if (!config) { animationId = requestAnimationFrame(loop); return; }

      const currentWorldWidth = Math.max(config.width || 0, window.innerWidth);

      if (!isTransitioning.current && s.x > currentWorldWidth - 100) {
        isTransitioning.current = true;
        navigateToNextWorld();
        setTimeout(() => {
          s.x = 100;
          s.y = GROUND_Y;
          isTransitioning.current = false;
        }, 1200);
      }

      const SPEED = isTransitioning.current ? 0 : 380; // Slightly slower for better control
      const GRAVITY = 2800;
      const JUMP_FORCE = -920;
      const MAX_FALL = 1000;

      if (s.invulnerableTimer > 0) s.invulnerableTimer -= dt;

      // Movement
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

      if (nextX < 0) nextX = 0;
      if (nextX > currentWorldWidth - MARIO_W) nextX = currentWorldWidth - MARIO_W;

      if (nextY >= GROUND_Y) {
        nextY = GROUND_Y;
        s.vy = 0;
        s.isJumping = false;
      }

      // Block Collisions
      if (s.vy < 0) {
        const blocks = [...(config.blocks || []), ...(config.powerUpBoxes || [])];
        for (const b of blocks) {
          // Align with WorldTerrain: block bottom = groundY - yOffset (40px tile above that line)
          const bBottom = groundSurfaceY - b.yOffset;
          const bLeft = b.x;
          const bRight = b.x + BLOCK_SIZE;

          if (nextX + MARIO_W > bLeft && nextX < bRight) {
            if (nextY < bBottom && s.y >= bBottom - 10) {
              nextY = bBottom;
              s.vy = 0;
              if (!b.hit) {
                b.hit = true;
                b.bounceTime = performance.now();
                playBlockBump();
                if (activeWorld === 'projects') {
                  bumpWorldDataEpoch();
                }
                
                // About profile: only secret ? blocks start decrypt; delayed reveal for suspense
                if (
                  activeWorld === 'about' &&
                  b.isEasterEgg &&
                  !unlockedAboutRef.current &&
                  !aboutDecryptingRef.current
                ) {
                  setAboutDecrypting(true);
                  window.setTimeout(() => {
                    setUnlockedAbout(true);
                    setAboutDecrypting(false);
                  }, 2400);
                }
                
                if ('project' in b && b.project) {
                  playPowerUp();
                  setTimeout(() => { setActivePopup(b.project!); }, 400);
                } else if ('powerUp' in b) {
                  playPowerUp();
                  if (activeWorld === 'skills') {
                    setUnlockedSkillsTiers((prev: number) => Math.min(prev + 1, 3));
                  } else if (b.powerUp === 'mushroom') {
                    setLives((l: number) => Math.min(l + 1, 99));
                  }
                }
              }
            }
          }
        }
      }

      // Enemy Collision
      const enemies = config.enemies || [];
      for (const e of enemies) {
        if (e.isDead) continue;
        const eY = groundSurfaceY - e.yOffset - 32;
        const eX = e.x;
        const eW = 32;
        const eH = 32;

        if (nextX + MARIO_W > eX && nextX < eX + eW &&
            nextY + MARIO_H > eY && nextY < eY + eH) {
          
          if (s.vy > 0 && s.y + MARIO_H <= eY + 15) {
            e.isDead = true;
            s.vy = -500; // Stomp bounce
            addScore(100);
          } else if (s.invulnerableTimer <= 0) {
            setLives((prev: number) => Math.max(0, prev - 1));
            s.invulnerableTimer = 1.5;
            s.knockbackTimer = 0.4;
            s.vx = s.dir === 1 ? -400 : 400;
            s.vy = -350;
          }
        }
      }

      // Coin Collection
      const coins = config.coins || [];
      for (const c of coins) {
        if (!c.collected) {
          const cY = groundSurfaceY - c.yOffset - 32;
          if (nextX + MARIO_W > c.x && nextX < c.x + 32 &&
              nextY + MARIO_H > cY && nextY < cY + 32) {
            c.collected = true;
            c.popTime = performance.now();
            playCoin();
            collectCoin(nextX, cY);
          }
        }
      }

      // Pipe Navigation
      for (const p of config.pipes) {
        if (nextX + MARIO_W > p.x && nextX < p.x + 64 && Math.abs(nextY - GROUND_Y) < 10) {
          if (K.ArrowDown || K.KeyS) {
            if (activeWorld === 'about' && unlockedAboutRef.current) {
              navigateToNextWorld();
            } else if (activeWorld === 'skills' && unlockedSkillsTiersRef.current >= 3) {
              navigateToNextWorld();
            }
          }
        }
      }

      s.x = nextX;
      s.y = nextY;

      if (s.isJumping) {
        s.animState = 'jump';
      } else if (Math.abs(s.vx) > 0) {
        s.animState = 'walk';
        s.frameTimer += dt * 10;
        if (s.frameTimer > 1) { s.walkFrame++; s.frameTimer = 0; }
      } else {
        s.animState = 'idle';
        s.idleBreathTimer += dt;
      }

      const frame = s.animState === 'jump' ? 2 : (s.animState === 'walk' ? s.walkFrame % 3 : 0);
      drawMarioFrame(ctx, frame, MARIO_SCALE, s.dir === -1);

      if (containerRef.current) {
        const breathY = (s.animState === 'idle') ? Math.sin(s.idleBreathTimer * 2.5) * 1.5 : 0;
        containerRef.current.style.transform = `translate3d(${s.x}px, ${s.y + breathY}px, 0)`;
        containerRef.current.style.opacity = s.invulnerableTimer > 0 ? (Math.floor(time / 100) % 2 ? '0.3' : '1') : '1';
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [collectCoin, activeWorld, setActivePopup, setLives, addScore, navigateToNextWorld, setUnlockedAbout, setAboutDecrypting, setUnlockedSkillsTiers, bumpWorldDataEpoch, markGameInteractionStarted]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 mario-container will-change-transform pointer-events-none"
        style={{ width: `${MARIO_W}px`, height: `${MARIO_H}px` }}
      >
        <canvas
          ref={canvasRef}
          width={MARIO_W}
          height={MARIO_H}
          className="w-full h-full block"
        />
      </div>
    </>
  );
}
