'use client';

import React from 'react';
import WorldTerrain from '../WorldTerrain';
import { WORLD_DATA } from '../GameConfig';

export default function AboutWorld() {
  const config = WORLD_DATA['about'];

  return (
    <div 
      className="relative h-full overflow-hidden"
      style={{ width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 2200) }}
    >
      <WorldTerrain 
         worldId="about"
      />
      {/* About Board — slides in, acts as narrative checkpoint */}
      <div className="about-board absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,850px)] bg-white/97 border-[6px] border-black p-9 px-10 shadow-[12px_12px_0_rgba(0,0,0,0.5)] z-10">
        <div className="bg-mario-red inline-block px-3.5 py-1.5 mb-5 border-3 border-black">
          <span className="font-press-start text-white text-[8px] tracking-wider">
            WORLD 1-2
          </span>
        </div>
        
        <h1 className="font-press-start text-[#111] text-[20px] mb-6 leading-relaxed">
          ABOUT THE DESIGNER
        </h1>
        
        <p className="font-press-start leading-[2.4] text-[9px] text-[#222] mb-4">
          Greetings! I'm <strong className="text-mario-red">Lakshay Jain</strong>: a product designer, UX/UI innovator, and digital storyteller bridging the gap between imagination and user reality.
        </p>
        <p className="font-press-start leading-[2.4] text-[9px] text-[#222] mb-4">
          I wield tools like <strong className="text-mario-blue">Figma, Adobe CC, Framer</strong> to turn complex problems into intuitive, breathing product experiences. I love crafting interactive journeys that leave users in awe.
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2.5 mt-6">
          {[
            { num: '3+', label: 'YEARS' },
            { num: '20+', label: 'PROJECTS' },
            { num: '8+', label: 'SERVICES' },
            { num: '∞', label: 'CREATIVITY' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#111] p-3 text-center border-2 border-[#333]">
              <span className="text-coin text-[16px] block mb-1 font-press-start">{stat.num}</span>
              <span className="text-[#888] text-[6px] font-press-start">{stat.label}</span>
            </div>
          ))}
        </div>

        <a
          href="https://drive.google.com/file/d/19lSjaETHcUer7lcT06HqR2nW8XSeRfrE/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-mario-red text-white border-3 border-black px-5 py-2.5 font-press-start text-[9px] shadow-[4px_4px_0_#000] no-underline mt-5 hover:translate-y-[-2px] transition-transform active:translate-y-0"
        >
          📄 READ CV
        </a>
        
        <p className="font-press-start mt-5 text-[8px] text-mario-blue animate-pulse">
          Keep moving Right to explore! ➜
        </p>
      </div>

      {/* Pipe hint */}
      <div style={{
          position: 'absolute',
          bottom: '160px',
          left: `${config.pipes[0]?.x - 40}px`,
          textAlign: 'center',
          zIndex: 10,
          width: '160px',
      }}>
          <span style={{fontFamily:'"Press Start 2P"', color:'#5CF', fontSize:'8px', textShadow: '1px 1px 0 #000'}}>
            PRESS ↓ TO<br/>ENTER PIPE
          </span>
      </div>
    </div>
  );
}
