'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorldTerrain from '../WorldTerrain';
import { useGame } from '../GameContext';

const easeOut = [0.16, 1, 0.3, 1] as const;

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.08 } } },
  child: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  },
};

const PixelAvatar = () => (
  <div className="w-24 h-24 md:w-32 md:h-32 bg-[var(--bg-surface)] border-2 border-[var(--border-active)] flex items-center justify-center relative overflow-hidden">
    <div className="grid grid-cols-8 grid-rows-8 gap-[2px]">
      {[
        [0,0,0,1,1,1,0,0],
        [0,0,1,1,1,1,1,0],
        [0,1,1,0,0,0,1,1],
        [0,1,1,0,0,0,1,1],
        [0,0,0,1,0,1,0,0],
        [0,0,0,1,0,1,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,1,1,1,1,0,0],
      ].map((row, ry) =>
        row.map((pixel, rx) => (
          <div
            key={`${ry}-${rx}`}
            className="w-[4px] h-[4px]"
            style={{
              background: pixel
                ? ry < 4
                  ? '#FAB278'
                  : ry < 6
                    ? '#000'
                    : '#E52020'
                : 'transparent',
            }}
          />
        ))
      )}
    </div>
  </div>
);

export default function AboutSection() {
  const { unlockedAbout, aboutDecrypting } = useGame();
  const [decryptLines, setDecryptLines] = useState(0);

  useEffect(() => {
    if (!aboutDecrypting) {
      setDecryptLines(0);
      return;
    }
    const id = window.setInterval(() => {
      setDecryptLines((n) => (n < 5 ? n + 1 : n));
    }, 420);
    return () => window.clearInterval(id);
  }, [aboutDecrypting]);

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'linear-gradient(180deg, #08080F 0%, #0A0A18 50%, #08080F 100%)' }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080F] via-transparent to-[#08080F]/60 z-[2]" />
        <WorldTerrain worldId="about" />
      </div>

      <div className="relative z-10 w-full max-w-[900px] mx-auto px-4 md:px-8 py-24 md:py-32">
        <AnimatePresence mode="wait">
          {aboutDecrypting ? (
            <motion.div
              key="decrypt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center max-w-lg mx-auto border border-[var(--border-cyan)] bg-[rgba(8,12,20,0.92)] p-8 md:p-10"
              style={{ boxShadow: '0 0 24px rgba(85, 204, 255, 0.12)' }}
            >
              <p className="font-pixel text-[7px] text-[var(--border-cyan)] tracking-[0.35em] mb-6">
                SECURE CHANNEL // DECRYPT
              </p>
              <div className="w-full text-left font-terminal text-[var(--text-cyan)] text-[14px] md:text-[15px] space-y-2 min-h-[140px]">
                {decryptLines >= 1 && <p className="opacity-90">&gt; handshake OK</p>}
                {decryptLines >= 2 && <p className="opacity-90">&gt; loading PLAYER.DAT...</p>}
                {decryptLines >= 3 && <p className="opacity-90">&gt; XOR layer 1... OK</p>}
                {decryptLines >= 4 && <p className="opacity-90">&gt; verifying checksum...</p>}
                {decryptLines >= 5 && <p className="text-[var(--coin)]">&gt; PROFILE STREAM READY</p>}
              </div>
              <div className="mt-6 w-full h-2 bg-[var(--border-dim)] overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--border-cyan)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.35, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          ) : !unlockedAbout ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center"
          >
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="w-24 h-24 mb-6 border-4 border-[var(--border-dim)] bg-[rgba(24,24,42,0.85)] flex items-center justify-center"
             >
                <span className="font-pixel text-[24px] text-[var(--text-dim)]">?</span>
             </motion.div>
             <h2 className="font-pixel text-[var(--text-dim)] text-[12px] tracking-widest uppercase">
               Profile Data Encrypted
             </h2>
             <p className="font-terminal text-[var(--text-dim)] text-[14px] mt-4 max-w-[400px]">
               Find a <span className="text-[var(--coin)]">secret ? block</span> in this world (not the power-up crate) to start decryption.
             </p>
          </motion.div>
          ) : (
          <motion.div
            key="unlocked"
            variants={stagger.container}
            initial="initial"
            animate="animate"
            className="w-full"
          >
            <motion.div variants={stagger.child} className="mb-6">
              <span className="font-pixel text-[7px] text-[var(--border-cyan)] border border-[var(--border-cyan)] px-3 py-1.5 tracking-wider inline-block">
                WORLD 1-2 // PLAYER PROFILE UNLOCKED
              </span>
            </motion.div>

            <motion.div
              variants={stagger.child}
              className="border border-[var(--border-active)] bg-[rgba(24,24,42,0.85)] backdrop-blur-sm p-6 md:p-10"
              style={{ boxShadow: '0 0 30px rgba(255, 215, 0, 0.1), 4px 4px 0 rgba(0, 0, 0, 0.4)' }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <PixelAvatar />
                  <span className="font-pixel text-[6px] text-[var(--text-dim)] tracking-wider">LV.8 DESIGNER</span>
                </div>

                <div className="flex-1">
                  <h2 className="font-pixel text-[var(--coin)] text-[clamp(14px,2vw,20px)] mb-4 tracking-wider">
                    LAKSHAY JAIN
                  </h2>
                  <p className="font-terminal text-[var(--text-body)] text-[16px] md:text-[18px] leading-relaxed mb-4">
                    I build immersive digital worlds where code meets artistry. Every pixel, every transition, every interaction is intentional.
                  </p>
                  <p className="font-terminal text-[var(--text-dim)] text-[15px] md:text-[16px] leading-relaxed">
                    Tools of choice: <span className="text-[var(--text-cyan)]">Figma</span>,{' '}
                    <span className="text-[var(--text-cyan)]">React</span>,{' '}
                    <span className="text-[var(--text-cyan)]">Framer</span>,{' '}
                    <span className="text-[var(--text-cyan)]">Blender</span>,{' '}
                    <span className="text-[var(--text-cyan)]">Adobe CC</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                {[
                  { num: '1.5–2+', label: 'YRS EXP', color: 'var(--coin)', numClass: 'text-[11px] md:text-[14px]' },
                  { num: '10–12', label: 'PROJECTS DELIVERED', color: 'var(--accent-cyan)', numClass: 'text-[14px] md:text-[18px]' },
                  { num: '8', label: 'SERVICES', color: 'var(--mario-red)', numClass: 'text-[16px] md:text-[20px]' },
                  { num: '∞', label: 'CREATIVITY', color: 'var(--accent-pipe)', numClass: 'text-[16px] md:text-[20px]' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-[var(--border-dim)] bg-[rgba(10,10,15,0.5)] p-3 md:p-4 text-center flex flex-col justify-center min-h-[88px]"
                  >
                    <div className={`font-pixel ${stat.numClass ?? 'text-[16px] md:text-[20px]'}`} style={{ color: stat.color }}>
                      {stat.num}
                    </div>
                    <div className="font-pixel text-[5px] md:text-[6px] text-[var(--text-dim)] uppercase mt-2 tracking-wider leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center w-full">
                <a
                  href="https://drive.google.com/file/d/19lSjaETHcUer7lcT06HqR2nW8XSeRfrE/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn bg-[var(--mario-red)] text-white border-2 border-black shadow-[3px_3px_0_#000] hover:translate-y-[-2px] hover:shadow-[3px_5px_0_#000] active:translate-y-0 active:shadow-none"
                >
                  📄 EXTRACT BIO DATA
                </a>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
