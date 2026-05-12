'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../GameContext';
import WorldTerrain from '../WorldTerrain';
import { SkillData } from '../GameConfig';

// --- INTERACTIVE SKILL COMPONENTS ---

function N8NFlow() {
  return (
    <div className="w-full h-full bg-[#0F0F1A] p-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(#55CCFF 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
      <div className="flex items-center gap-8 z-10">
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="w-12 h-12 bg-[#FF4F5E] rounded-lg flex items-center justify-center border-2 border-white/20 shadow-lg"
        >
          <span className="text-white text-xs font-bold">Start</span>
        </motion.div>
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#FF4F5E] to-[#55CCFF] relative">
          <motion.div 
            animate={{ x: [0, 60] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-2 h-2 bg-white rounded-full absolute -top-[3px]" 
          />
        </div>
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
          className="w-12 h-12 bg-[#55CCFF] rounded-lg flex items-center justify-center border-2 border-white/20 shadow-lg"
        >
          <span className="text-black text-[8px] font-bold text-center">Claude<br/>API</span>
        </motion.div>
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#55CCFF] to-[#FFD700] relative">
          <motion.div 
            animate={{ x: [0, 60] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
            className="w-2 h-2 bg-white rounded-full absolute -top-[3px]" 
          />
        </div>
        <motion.div 
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }}
          className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center border-2 border-white/20 shadow-lg"
        >
          <span className="text-black text-[8px] font-bold text-center">Slack<br/>Alert</span>
        </motion.div>
      </div>
    </div>
  );
}

function UXProcess() {
  return (
    <div className="w-full h-full bg-white p-4 flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="w-1/3 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded flex flex-col p-2 gap-1">
          <div className="w-8 h-8 bg-gray-300 rounded-full mb-1" />
          <div className="w-full h-2 bg-gray-300" />
          <div className="w-2/3 h-2 bg-gray-200" />
          <span className="text-[6px] text-gray-400 mt-auto">PERSONA A</span>
        </div>
        <div className="w-2/3 h-24 bg-gray-50 border border-gray-200 rounded p-2 flex flex-col gap-2">
          <div className="w-full h-4 bg-gray-200 rounded" />
          <div className="flex gap-2 flex-1">
            <div className="flex-1 bg-gray-100 rounded" />
            <div className="flex-1 bg-gray-100 rounded" />
          </div>
          <span className="text-[6px] text-gray-400">WIREFRAME v0.1</span>
        </div>
      </div>
      <div className="flex-1 bg-blue-50 border border-blue-200 rounded p-2 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-400 flex items-center justify-center">
          <span className="text-blue-500 text-lg font-bold">★</span>
        </div>
        <span className="text-[8px] text-blue-600 mt-2 font-bold">USER FLOW OPTIMIZED</span>
      </div>
    </div>
  );
}

function WebDevLogic() {
  return (
    <div className="w-full h-full bg-[#1A1A1A] p-4 font-mono text-[10px] text-[#D4D4D4] relative">
      <div className="flex gap-1 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>
      <div className="space-y-1">
        <p className="text-[#569CD6]">function <span className="text-[#DCDCAA]">handleRequest</span>(data) &#123;</p>
        <p className="pl-4 text-[#C586C0]">const <span className="text-[#9CDCFE]">processed</span> = data.<span className="text-[#DCDCAA]">map</span>(v =&gt; v * 2);</p>
        <p className="pl-4 text-[#C586C0]">return <span className="text-[#CE9178]">`Success: $&#123;processed&#125;`</span>;</p>
        <p className="text-[#569CD6]">&#125;</p>
        <p className="mt-4 text-green-400 opacity-50">// Output: Success: [2, 4, 6, 8]</p>
      </div>
      <motion.div 
        animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-2 h-4 bg-[#569CD6] absolute bottom-4 right-4" 
      />
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="w-full h-full bg-[#0A0A0A] p-4 flex flex-col items-center justify-center gap-6">
      <div className="w-32 h-12 bg-[#2563EB] rounded border-2 border-white/10 flex items-center justify-center">
        <span className="text-white text-[8px] font-bold">FRONTEND (NEXT.JS)</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="w-[2px] h-4 bg-white/20" />
        <div className="w-24 h-10 bg-[#7C3AED] rounded border-2 border-white/10 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">API GATEWAY</span>
        </div>
        <div className="w-[2px] h-4 bg-white/20" />
      </div>
      <div className="flex gap-4">
        <div className="w-16 h-12 bg-[#059669] rounded border-2 border-white/10 flex items-center justify-center">
          <span className="text-white text-[7px] font-bold text-center">AUTH<br/>SERVICE</span>
        </div>
        <div className="w-16 h-12 bg-[#DB2777] rounded border-2 border-white/10 flex items-center justify-center">
          <span className="text-white text-[7px] font-bold text-center">DATABASE<br/>(REDIS)</span>
        </div>
      </div>
    </div>
  );
}

// --- MAIN SECTION ---

export default function SkillsSection() {
  const { activeSkill, setActiveSkill } = useGame();

  const renderSkillContent = (id: string) => {
    switch (id) {
      case 'web_dev': return <WebDevLogic />;
      case 'ui_ux': return <UXProcess />;
      case 'ai_automation': return <N8NFlow />;
      case 'system_design': return <ArchitectureDiagram />;
      default: return null;
    }
  };

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
              <br/><br/>
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

        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveSkill(null)}
            >
              <motion.div 
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl bg-[#0F0F1A] border-4 border-[var(--accent-coin)] shadow-[12px_12px_0_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden"
              >
                {/* Left side: Interactive Preview */}
                <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-[300px] md:h-auto border-b-4 md:border-b-0 md:border-r-4 border-[var(--accent-coin)] bg-black overflow-hidden">
                  {renderSkillContent(activeSkill.id)}
                </div>

                {/* Right side: Info */}
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-pixel text-[6px] text-[var(--accent-coin)] block mb-2">{activeSkill.type}</span>
                      <h2 className="font-pixel text-[var(--text-primary)] text-[18px] tracking-tight">{activeSkill.title}</h2>
                    </div>
                    <button 
                      onClick={() => setActiveSkill(null)}
                      className="w-10 h-10 border-2 border-[var(--accent-coin)] flex items-center justify-center hover:bg-[var(--accent-coin)] hover:text-black transition-colors"
                    >
                      <span className="font-bold text-xl">×</span>
                    </button>
                  </div>

                  <p className="font-terminal text-[16px] text-[var(--text-dim)] leading-relaxed mb-8 flex-1">
                    {activeSkill.description}
                  </p>

                  <div className="space-y-4">
                    <span className="font-pixel text-[5px] text-[var(--text-dim)] uppercase tracking-widest">Equipped Stack</span>
                    <div className="flex flex-wrap gap-2">
                      {activeSkill.techStack.map(tag => (
                        <span key={tag} className="font-pixel text-[5px] border border-white/20 px-2 py-1 text-[var(--text-primary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveSkill(null)}
                    className="mt-10 w-full py-4 bg-[var(--accent-coin)] text-black font-pixel text-[7px] hover:brightness-110 active:translate-y-1 transition-all shadow-[0_4px_0_#B88A00]"
                  >
                    CONTINUE JOURNEY (RESUME)
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
