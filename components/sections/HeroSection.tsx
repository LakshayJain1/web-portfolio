'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorldTerrain from '../WorldTerrain';
import { useGame } from '../GameContext';

export default function HeroSection() {
  const hasBootedSession = () => (
    typeof window !== 'undefined' && sessionStorage.getItem('nexus-booted') === 'true'
  );
  const {
    onboardingDismissed,
    dismissOnboarding,
    gameInteractionStarted,
    markGameInteractionStarted
  } = useGame();
  const [bootComplete, setBootComplete] = useState(hasBootedSession);
  const [bootProgress, setBootProgress] = useState(() => hasBootedSession() ? 100 : 0);
  const [showTitle, setShowTitle] = useState(hasBootedSession);
  const [showCtas, setShowCtas] = useState(hasBootedSession);
  const [showHint, setShowHint] = useState(hasBootedSession);

  useEffect(() => {
    if (bootComplete) return;

    // Boot sequence
    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setBootProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setBootComplete(true);
        sessionStorage.setItem('nexus-booted', 'true');
      }
    }, 16);

    return () => clearInterval(interval);
  }, [bootComplete]);

  useEffect(() => {
    if (bootComplete) {
      const t1 = setTimeout(() => setShowTitle(true), 200);
      const t2 = setTimeout(() => setShowCtas(true), 600);
      const t3 = setTimeout(() => setShowHint(true), 1200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [bootComplete]);

  const bootLines = [
    'NEXUS-OS v2.4.1 // INITIALIZING...',
    'LOADING KERNEL MODULES...',
    'CALIBRATING DISPLAY...',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #07070E 0%, #0A0A14 35%, #0C0C18 55%, #090910 78%, #07070E 100%)',
      }}
    >
      {/* Terrain at bottom with fade-up */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070E] via-transparent to-transparent z-[2]" />
        <WorldTerrain worldId="hero" />
      </div>

      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0A16]"
          >
            <div className="w-[320px] max-w-[80vw]">
              {bootLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: bootProgress > i * 33 ? 1 : 0 }}
                  className="font-terminal text-[var(--text-cyan)] text-[16px] mb-1"
                >
                  &gt; {line}
                </motion.p>
              ))}
              <div className="mt-6 w-full h-[3px] bg-[var(--border-dim)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--coin)]"
                  style={{ width: `${bootProgress}%`, boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)' }}
                />
              </div>
              <p className="font-pixel text-[7px] text-[var(--text-dim)] mt-3 tracking-wider">
                {Math.round(bootProgress)}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showTitle && !gameInteractionStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -96 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-pixel text-[var(--coin)] text-[clamp(20px,4vw,36px)] tracking-wider text-center px-4"
              style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.3), 3px 3px 0 rgba(0, 0, 0, 0.6)' }}
            >
              LAKSHAY JAIN
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-terminal text-[var(--text-cyan)] text-[clamp(18px,2.5vw,24px)] mt-3 text-center px-4"
              style={{ textShadow: '0 0 10px rgba(85, 204, 255, 0.3)' }}
            >
              Product Designer &amp; Creative Developer
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="font-pixel text-[var(--text-dim)] text-[clamp(6px,0.8vw,8px)] mt-4 tracking-[3px] text-center px-4 uppercase"
            >
              UI/UX  •  Frontend  •  3D Art  •  Branding
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTAs */}
      <AnimatePresence>
        {showCtas && !gameInteractionStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -96 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-[35%] left-1/2 -translate-x-1/2 z-10 flex gap-4 pointer-events-auto"
          >
            <a
              href="#projects"
              onClick={markGameInteractionStarted}
              className="retro-btn bg-[var(--mario-red)] text-white border-2 border-black shadow-[3px_3px_0_#000] hover:translate-y-[-2px] hover:shadow-[3px_5px_0_#000] active:translate-y-0 active:shadow-none"
              style={{ boxShadow: '0 0 15px rgba(229, 32, 32, 0.15), 3px 3px 0 #000' }}
            >
              ▶ START EXPLORING
            </a>
            <a
              href="#contact"
              onClick={markGameInteractionStarted}
              className="retro-btn bg-transparent text-[var(--coin)] border-2 border-[var(--coin)] hover:bg-[var(--coin)] hover:text-black transition-all"
            >
              ◇ CONTACT
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation hint (replaces onboarding overlay) */}
      <AnimatePresence>
        {showHint && !onboardingDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <div
              className="bg-[rgba(10,10,15,0.85)] border border-[var(--border-dim)] px-6 py-3 text-center cursor-pointer pointer-events-auto"
              onClick={() => dismissOnboarding()}
            >
              <p className="font-pixel text-[6px] text-[var(--text-dim)] tracking-wider">
                ↑ ↓ → ← MOVE  •  ↑ JUMP  •  ↓ ON PIPES  •  HIT ? BLOCKS
              </p>
              <p className="font-pixel text-[5px] text-[var(--text-dim)] mt-1 opacity-60">
                CLICK TO DISMISS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
