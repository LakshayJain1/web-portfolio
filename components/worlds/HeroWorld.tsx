'use client';

import React from 'react';
import WorldTerrain from '../WorldTerrain';
import { WORLD_DATA } from '../GameConfig';
import { useGame } from '../GameContext';

export default function HeroWorld() {
  const config = WORLD_DATA['hero'];
  const { onboardingDismissed } = useGame();

  return (
    <div
      className="relative h-full"
      style={{ width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 2200) }}
    >
      <WorldTerrain
        worldId="hero"
      />

      {/* Title Card */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,800px)] text-center px-5 z-10">
        <h1 className="font-press-start text-coin text-[clamp(20px,4vw,36px)] tracking-wider mb-2.5 [text-shadow:4px_4px_0_#B8860B,-1px_-1px_0_#000]">
          LAKSHAY JAIN
        </h1>
        <p className="font-press-start text-white mt-2.5 text-[clamp(8px,1.2vw,11px)] leading-8 [text-shadow:2px_2px_0_#000] tracking-tight">
          PRODUCT DESIGNER  ✦  INNOVATOR  ✦  STORYTELLER
        </p>
      </div>

      {/* Pipe Hint */}
      <div
        className="absolute bottom-[160px] text-center z-10 w-[160px]"
        style={{ left: `${config.pipes[0]?.x - 40}px` }}
      >
        <span className="font-press-start text-[#5CF] text-[8px] [text-shadow:1px_1px_0_#000]">
          PRESS ↓ TO<br />ENTER PIPE
        </span>
      </div>

      {/* Onboarding Overlay */}
      {!onboardingDismissed && (
        <div className="fixed bottom-[18%] left-1/2 -translate-x-1/2 z-[4000] pointer-events-none animate-onboarding-pulse">
          <div className="bg-black/90 border-4 border-coin p-20 text-center shadow-[0_0_30px_rgba(255,215,0,0.25),8px_8px_0_rgba(0,0,0,0.5)]">
            <div className="font-press-start text-[10px] text-coin mb-4 tracking-[3px]">
              HOW TO PLAY
            </div>
            <div className="flex gap-4 justify-center items-center">
              {[
                { key: '←', label: 'LEFT' },
                { key: '→', label: 'RIGHT' },
                { key: '↑', label: 'JUMP' },
                { key: '↓', label: 'PIPE' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-[45px] h-[45px] bg-[#1A1A2E] border-3 border-[#555] border-b-5 border-b-[#333] flex items-center justify-center font-press-start text-[18px] text-white inner-shadow">
                    <span
                      className="inline-block leading-none"
                      style={{ transform: item.key === '↑' || item.key === '↓' ? 'scale(1.2)' : 'none' }}
                    >
                      {item.key}
                    </span>
                  </div>
                  <span className="font-press-start text-[6px] text-[#888] tracking-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
