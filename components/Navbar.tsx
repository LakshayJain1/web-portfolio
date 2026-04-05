'use client';

import { useGame } from './GameContext';
import { toggleMute } from './SoundManager';

export default function Navbar() {
  const { score, coins, lives, activeWorld, isMuted, toggleMute: ctxToggle } = useGame();

  const handleMuteToggle = () => {
    toggleMute();
    ctxToggle();
  };

  const worldNames: Record<string, string> = {
    hero: 'WORLD 1-1',
    about: 'WORLD 1-2',
    projects: 'WORLD 1-3',
    contact: 'WORLD 1-4',
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/92 border-b-3 border-coin z-[3000] flex items-center justify-between px-12 py-48 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="text-coin text-[10px] tracking-wider uppercase">
          ★ DEV LAKSHAY
        </div>
        <div className="text-[#5CF] text-[8px] bg-[#55ccff1a] border border-[#55ccff4d] px-2.5 py-1 tracking-wider font-press-start">
          {worldNames[activeWorld] || 'WORLD 1-1'}
        </div>
      </div>

      <div className="flex items-center gap-5 text-[8px]">
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-coin text-[10px] font-press-start">
            {String(score).padStart(6, '0')}
          </span>
          <span className="text-[7px] text-[#888] font-press-start uppercase">Score</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-mario-red text-[10px] font-press-start">
            ×{String(lives).padStart(2, '0')}
          </span>
          <span className="text-[7px] text-[#888] font-press-start uppercase">Lives</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-coin text-[10px] font-press-start">
            ×{String(coins).padStart(2, '0')}
          </span>
          <span className="text-[7px] text-[#888] font-press-start uppercase">Coins</span>
        </div>
        <button
          className="flex items-center justify-center w-8 h-8 p-0 relative border-2 border-[#333] bg-[#111] rounded-[2px] transition-colors hover:border-coin"
          onClick={handleMuteToggle}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {/* Retro Speaker Icon */}
          <div className="w-4 h-3.5 relative flex items-center">
            {/* Speaker body */}
            <div className={`w-1.5 h-1.5 relative z-10 ${isMuted ? 'bg-[#666]' : 'bg-coin'}`} />
            {/* Speaker cone */}
            <div
              className={`w-0 h-0 border-y-[7px] border-y-transparent border-r-[10px] -ml-0.5 ${isMuted ? 'border-r-[#666]' : 'border-r-coin'}`}
            />
            {/* Sound waves (if not muted) */}
            {!isMuted && (
              <div className="absolute -right-1 w-1.5 h-2.5 border-r-2 border-coin rounded-l-full rotate-180" />
            )}
            {/* Mute slash */}
            {isMuted && (
              <div className="absolute -left-0.5 top-1.5 w-5 h-0.5 bg-mario-red rotate-45 z-20" />
            )}
          </div>
        </button>
      </div>
    </nav>
  );
}
