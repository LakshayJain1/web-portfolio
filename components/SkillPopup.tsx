'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from './GameContext';

// --- INTERACTIVE SKILL COMPONENTS ---

function N8NFlow() {
  return (
    <div className="w-full h-full bg-[#0A0A0F] p-6 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#55CCFF 1px, transparent 1px), linear-gradient(90deg, #55CCFF 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
      <div className="mb-4 flex items-center justify-between z-10">
        <span className="font-pixel text-[5px] text-[var(--accent-coin)] opacity-80 uppercase tracking-widest">Workflow: Enterprise Automation</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] font-mono text-green-500/80">RUNNING</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-6 relative z-10">
        {/* Top Branch */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-900/40 border border-blue-400/50 rounded-lg flex flex-col items-center justify-center gap-1 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div className="w-4 h-4 bg-blue-400 rounded-sm" />
            <span className="text-[6px] font-mono text-blue-200">Webhook</span>
          </div>
          <div className="w-8 h-[1px] bg-blue-400/30 relative">
            <motion.div animate={{ x: [0, 32] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-1 bg-blue-400 rounded-full absolute -top-[1.5px]" />
          </div>
          <div className="w-14 h-14 bg-purple-900/40 border border-purple-400/50 rounded-lg flex flex-col items-center justify-center gap-1">
            <div className="w-4 h-4 bg-purple-400 rotate-45" />
            <span className="text-[6px] font-mono text-purple-200">Logic</span>
          </div>
        </div>

        {/* Connections */}
        <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-blue-400/30 to-emerald-400/30" />

        {/* Main Flow */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900/40 border border-emerald-400/50 rounded-lg flex flex-col items-center justify-center gap-1 shadow-[0_0_20px_rgba(16,185,129,0.15)] relative">
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            <div className="w-5 h-5 border-2 border-emerald-400 rounded-full flex items-center justify-center text-[10px] text-emerald-400">AI</div>
            <span className="text-[6px] font-mono text-emerald-100">Claude-3.5</span>
          </div>
          <div className="w-12 h-[1px] bg-emerald-400/30 relative">
            <motion.div animate={{ x: [0, 48] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-1 bg-emerald-400 rounded-full absolute -top-[1.5px]" />
          </div>
          <div className="w-16 h-16 bg-amber-900/40 border border-amber-400/50 rounded-lg flex flex-col items-center justify-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <div className="w-5 h-2 bg-amber-400 rounded-full" />
            <span className="text-[6px] font-mono text-amber-100">Database</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-2 bg-black/40 border border-white/5 rounded font-mono text-[8px] text-blue-300/60 leading-tight">
        [system] payload validated. executing node: ai_inference...
      </div>
    </div>
  );
}

function UXProcess() {
  return (
    <div className="w-full h-full bg-[#F8F9FA] p-6 flex flex-col gap-6 overflow-hidden">
      {/* Design System Tokens */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div className="space-y-2">
          <span className="text-[8px] font-bold text-gray-400 tracking-tighter block uppercase">Typography System</span>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 leading-none">Aa</h3>
            <p className="text-[10px] text-gray-600 font-medium tracking-tight">Inter / Medium / 24px</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded bg-[#0A0A0F]" />
          <div className="w-6 h-6 rounded bg-[#55CCFF]" />
          <div className="w-6 h-6 rounded bg-[#FF4F5E]" />
          <div className="w-6 h-6 rounded border border-gray-200 bg-white" />
        </div>
      </div>

      {/* Interactive Wireframe */}
      <div className="flex-1 flex gap-4">
        <div className="w-1/3 bg-gray-50 border border-gray-200 rounded-lg p-3 flex flex-col gap-2 relative shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="w-full h-1.5 bg-gray-200 rounded-full" />
          <div className="w-2/3 h-1.5 bg-gray-100 rounded-full" />
          <div className="mt-auto pt-2 border-t border-gray-100 flex justify-between">
            <div className="w-6 h-3 bg-blue-100 rounded" />
            <div className="w-6 h-3 bg-gray-100 rounded" />
          </div>
          <span className="absolute top-2 right-2 text-[6px] text-blue-500 font-bold bg-blue-50 px-1 rounded">MOBILE</span>
        </div>
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-md flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
          <div className="w-full h-8 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center">
            <span className="text-[8px] text-gray-400">Hero Section Container</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-gray-50 border border-gray-100 rounded" />
            <div className="aspect-square bg-gray-50 border border-gray-100 rounded" />
            <div className="aspect-square bg-gray-50 border border-gray-100 rounded" />
          </div>
          <div className="w-full h-1.5 bg-blue-500 rounded-full opacity-20" />
          <div className="w-3/4 h-1.5 bg-blue-500 rounded-full opacity-20" />
          <span className="mt-auto text-[7px] text-gray-400 font-mono italic">DESKTOP_VIEW_PROTO_v4</span>
        </div>
      </div>
    </div>
  );
}

function WebDevLogic() {
  return (
    <div className="w-full h-full bg-[#0D0D11] p-6 font-mono text-[11px] leading-relaxed relative flex flex-col">
      {/* VS Code like header */}
      <div className="flex items-center gap-3 mb-4 bg-white/5 p-2 rounded-t-md -mt-2 -mx-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="text-[9px] text-white/40 italic">api/v1/auth/middleware.ts</span>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">1</span>
          <p><span className="text-[#C586C0]">export async function</span> <span className="text-[#DCDCAA]">withAuth</span>(req: <span className="text-[#4EC9B0]">NextRequest</span>) &#123;</p>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">2</span>
          <p className="pl-4"><span className="text-[#C586C0]">const</span> <span className="text-[#9CDCFE]">session</span> = <span className="text-[#C586C0]">await</span> <span className="text-[#DCDCAA]">getSession</span>(req);</p>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">3</span>
          <p />
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">4</span>
          <p className="pl-4"><span className="text-[#C586C0]">if</span> (!session) &#123;</p>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">5</span>
          <p className="pl-8"><span className="text-[#C586C0]">return</span> <span className="text-[#4EC9B0]">NextResponse</span>.<span className="text-[#DCDCAA]">json</span>(&#123; <span className="text-[#9CDCFE]">err</span>: <span className="text-[#CE9178]">"Unauthorized"</span> &#125;, &#123; <span className="text-[#9CDCFE]">status</span>: <span className="text-[#B5CEA8]">401</span> &#125;);</p>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">6</span>
          <p className="pl-4">&#125;</p>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">7</span>
          <p />
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">8</span>
          <p className="pl-4"><span className="text-[#C586C0]">return</span> <span className="text-[#DCDCAA]">handleSecureRequest</span>(req, session);</p>
        </div>
        <div className="flex gap-4">
          <span className="text-white/20 select-none text-right w-4">9</span>
          <p>&#125;</p>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div className="w-full h-full bg-[#05050A] p-6 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(85, 204, 255, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="mb-4 text-center">
        <span className="font-pixel text-[6px] text-blue-400 tracking-[3px] uppercase">Nexus-OS System Architecture</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between py-2 z-10">
        {/* Layer 1: UI & Overlay */}
        <div className="w-full flex justify-around items-center">
          <div className="px-4 py-2 bg-white/5 border border-white/20 rounded flex flex-col items-center shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="text-[7px] font-pixel text-white/90 uppercase">UI Overlay</span>
            <div className="flex gap-1 mt-1">
              <div className="w-1 h-1 bg-white/20" />
              <div className="w-1 h-1 bg-white/20" />
            </div>
          </div>
        </div>

        {/* State Bridge */}
        <div className="flex flex-col items-center gap-1 relative">
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-blue-400/50" />
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/40 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-[6px] font-mono text-blue-400 font-bold tracking-widest uppercase">State Bridge (Context)</span>
          </div>
          <div className="w-[1px] h-8 bg-gradient-to-b from-blue-400/50 to-purple-400/50" />

          {/* Lateral Signal */}
          <motion.div
            animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1/2 left-full ml-4 whitespace-nowrap text-[5px] font-mono text-purple-400 uppercase"
          >
            Pause_Signal
          </motion.div>
        </div>

        {/* Core Engine */}
        <div className="w-5/6 py-3 bg-purple-900/10 border-2 border-purple-500/30 rounded-lg flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-shimmer" />
          <span className="text-[7px] font-pixel text-purple-200 uppercase tracking-widest">Core Game Engine</span>
          <div className="flex gap-4 mt-2">
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 bg-purple-500/40 border border-purple-400 rounded-sm mb-1" />
              <span className="text-[5px] font-mono text-purple-300/60 uppercase">Physics</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 bg-purple-500/40 border border-purple-400 rounded-sm mb-1" />
              <span className="text-[5px] font-mono text-purple-300/60 uppercase">Collision</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-1.5 h-1.5 bg-purple-500/40 border border-purple-400 rounded-sm mb-1" />
              <span className="text-[5px] font-mono text-purple-300/60 uppercase">Canvas API</span>
            </div>
          </div>
        </div>

        {/* Persistence */}
        <div className="w-full flex justify-center mt-2">
          <div className="px-6 py-2 bg-amber-900/10 border border-amber-500/20 rounded flex items-center gap-3">
            <div className="w-4 h-5 border-2 border-amber-500/40 rounded flex flex-col gap-0.5 p-0.5">
              <div className="w-full h-0.5 bg-amber-500/20" />
              <div className="w-full h-0.5 bg-amber-500/20" />
            </div>
            <div className="flex flex-col">
              <span className="text-[6px] font-pixel text-amber-200 uppercase">Persistence Layer</span>
              <span className="text-[5px] font-mono text-amber-500/60">LocalStorage / Config</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN POPUP ---

export default function SkillPopup() {
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
    <AnimatePresence>
      {activeSkill && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="fixed inset-0 z-[6000] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveSkill(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-[#0F0F1A] border-4 border-[var(--accent-coin)] shadow-[12px_12px_0_rgba(0,0,0,0.8)] flex flex-col md:flex-row overflow-hidden min-h-[500px]"
          >
            {/* Left side: Interactive Preview */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto h-[400px] md:h-auto border-b-4 md:border-b-0 md:border-r-4 border-[var(--accent-coin)] bg-black overflow-hidden">
              {renderSkillContent(activeSkill.id)}
            </div>

            {/* Right side: Info */}
            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-pixel text-[6px] text-[var(--accent-coin)] block mb-2">{activeSkill.type}</span>
                  <h2 className="font-pixel text-[var(--text-primary)] text-[24px] tracking-tight">{activeSkill.title}</h2>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="w-10 h-10 border-2 border-[var(--accent-coin)] flex items-center justify-center hover:bg-[var(--accent-coin)] hover:text-black transition-colors"
                >
                  <span className="font-bold text-xl">×</span>
                </button>
              </div>

              <p className="font-terminal text-[18px] text-[var(--text-dim)] leading-relaxed mb-10 flex-1">
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
                className="mt-12 w-full py-5 bg-[var(--accent-coin)] text-black font-pixel text-[7px] hover:brightness-110 active:translate-y-1 transition-all shadow-[0_4px_0_#B88A00]"
              >
                CONTINUE JOURNEY (RESUME)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
