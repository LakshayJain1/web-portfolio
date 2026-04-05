'use client';

import React from 'react';
import WorldTerrain from '../WorldTerrain';
import { WORLD_DATA } from '../GameConfig';

export default function ProjectsWorld() {
  const config = WORLD_DATA['projects'];

  return (
    <div 
      className="relative h-full overflow-hidden"
      style={{ width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 3500) }}
    >
      <WorldTerrain 
         worldId="projects"
      />
      
      {/* Title */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 z-10 w-[min(90vw,800px)] text-center">
        <div className="bg-black/80 border-4 border-coin p-6 px-8 inline-block shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
          <h1 className="font-press-start text-mario-skin text-[20px] mb-4">
            WORLD 1-3: PROJECTS
          </h1>
          <p className="font-press-start leading-[2.2] text-[9px] text-[#DDD]">
            Jump and hit the <span className="text-coin">?</span> blocks from below to reveal projects!
          </p>
        </div>
      </div>

      {/* Project labels below blocks */}
      {config.blocks?.filter(b => b.project).map((b) => (
        <div key={b.x} 
          className="absolute bottom-[40%] text-center z-10 w-[100px]"
          style={{ left: `${b.x - 30}px` }}
        >
          <span className={`font-press-start text-[7px] [text-shadow:1px_1px_0_#000] opacity-70 ${b.hit ? 'text-[#666]' : 'text-coin'}`}>
            {b.project?.title}
          </span>
        </div>
      ))}

      {/* Pipe hint */}
      <div 
        className="absolute bottom-[160px] text-center z-10 w-[160px]"
        style={{ left: `${config.pipes[0]?.x - 40}px` }}
      >
        <span className="font-press-start text-white text-[8px] [text-shadow:1px_1px_0_#000]">
          TO CONTACT ⬇
        </span>
      </div>
    </div>
  );
}
