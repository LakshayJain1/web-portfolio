'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../GameContext';
import WorldTerrain from '../WorldTerrain';

export default function SkillsSection() {
  const { activeSkill } = useGame();

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(180deg, #0C0C18 0%, #0F0F22 50%, #0C0C18 100%)' }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <WorldTerrain worldId="skills" />
      </div>

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 section-container flex-1 flex flex-col items-center justify-center">
        {!activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center bg-[rgba(15,15,30,0.8)] border-2 border-[var(--accent-coin)] p-8 md:p-12 shadow-[8px_8px_0_rgba(0,0,0,0.5)] max-w-xl"
          >
            <span className="font-pixel text-[7px] text-[var(--accent-coin)] block mb-6">WORLD 1-3</span>
            <h2 className="font-pixel text-[var(--text-primary)] text-[22px] mb-6">THE ARSENAL</h2>
            <p className="font-terminal text-[16px] text-[var(--text-dim)] leading-relaxed mb-8">
              Mario's journey requires more than just jumping.
              <br /><br />
              Hit the <span className="text-[var(--accent-coin)]">[?]</span> blocks above to inspect my core technical abilities.
              Each block reveals a different interactive skill module.
            </p>
            <div className="flex justify-center gap-4 animate-bounce">
              <span className="text-[24px]">↑</span>
              <span className="text-[24px]">↑</span>
              <span className="text-[24px]">↑</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
