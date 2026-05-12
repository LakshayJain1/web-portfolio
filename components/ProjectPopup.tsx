'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from './GameContext';

export default function ProjectPopup() {
  const { activePopup, setActivePopup } = useGame();

  if (!activePopup) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[4000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
        onClick={() => setActivePopup(null)}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-2xl bg-[#0A0A0F] border-4 border-[var(--coin)] p-6 md:p-10 shadow-[12px_12px_0_#000] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="font-pixel text-[6px] text-[var(--mario-skin)] block mb-2">{activePopup.type}</span>
              <h2 className="font-pixel text-[var(--coin)] text-[18px] md:text-[22px] tracking-tight">{activePopup.title}</h2>
            </div>
            <button 
              onClick={() => setActivePopup(null)}
              className="w-10 h-10 border-2 border-[var(--coin)] flex items-center justify-center hover:bg-[var(--coin)] hover:text-black transition-colors"
            >
              <span className="font-bold text-xl">×</span>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="font-terminal text-[16px] text-[var(--text-body)] leading-relaxed">
              {activePopup.description}
            </p>

            <div className="pt-4">
              <span className="font-pixel text-[5px] text-[var(--text-dim)] uppercase tracking-widest block mb-3">Technologies</span>
              <div className="flex flex-wrap gap-2">
                {activePopup.techStack.map(tech => (
                  <span key={tech} className="font-pixel text-[5px] border border-[rgba(255,215,0,0.2)] px-2 py-1 text-[var(--coin)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a 
              href={activePopup.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 py-4 bg-[var(--coin)] text-black font-pixel text-[7px] text-center hover:brightness-110 active:translate-y-1 transition-all shadow-[0_4px_0_#B88A00]"
            >
              VIEW LIVE PROJECT
            </a>
            <button 
              onClick={() => setActivePopup(null)}
              className="flex-1 py-4 border-2 border-[var(--coin)] text-[var(--coin)] font-pixel text-[7px] hover:bg-[var(--coin)]/10 transition-colors"
            >
              RESUME GAME
            </button>
          </div>

          {/* Retro Detail */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--coin)] opacity-50" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
