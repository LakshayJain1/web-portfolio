'use client';

import React from 'react';
import WorldTerrain from '../WorldTerrain';
import { WORLD_DATA } from '../GameConfig';

export default function ProjectsWorld() {
  const config = WORLD_DATA['projects'];

  return (
    <div style={{ position: 'relative', width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 3500), height: '100%', background: '#1A0E00' }}>
      <WorldTerrain 
         worldId="projects"
         theme="night" 
      />
      
      {/* Title */}
      <div style={{ position: 'absolute', top: '12%', left: 300, color: '#FFF', width: '800px', zIndex: 10}}>
        <div style={{ 
          background: 'rgba(0,0,0,0.8)', 
          border: '4px solid var(--coin)', 
          padding: '24px 32px',
          display: 'inline-block',
          boxShadow: '8px 8px 0 rgba(0,0,0,0.5)'
        }}>
          <h1 style={{ fontFamily: '"Press Start 2P"', color: '#FAB278', fontSize: '20px', marginBottom: '16px'}}>
            WORLD 1-4: PROJECTS
          </h1>
          <p style={{ fontFamily: '"Press Start 2P"', lineHeight: 2.2, fontSize: '9px', color: '#DDD'}}>
            Jump and hit the <span style={{color:'var(--coin)'}}>?</span> blocks from below to reveal projects!
          </p>
        </div>
      </div>

      {/* Project labels below blocks */}
      {config.blocks?.filter(b => b.project).map((b) => (
        <div key={b.x} style={{
          position: 'absolute',
          bottom: '40%',
          left: `${b.x - 30}px`,
          textAlign: 'center',
          zIndex: 10,
          width: '100px',
        }}>
          <span style={{
            fontFamily: '"Press Start 2P"', 
            color: b.hit ? '#666' : 'var(--coin)', 
            fontSize: '7px', 
            textShadow: '1px 1px 0 #000',
            opacity: 0.7
          }}>
            {b.project?.title}
          </span>
        </div>
      ))}

      {/* Pipe hint */}
      <div style={{
          position: 'absolute',
          bottom: '160px',
          left: `${config.pipes[0]?.x - 40}px`,
          textAlign: 'center',
          zIndex: 10,
          width: '160px',
      }}>
          <span style={{fontFamily:'"Press Start 2P"', color:'white', fontSize:'8px', textShadow: '1px 1px 0 #000'}}>
            TO CONTACT ⬇
          </span>
      </div>
    </div>
  );
}
