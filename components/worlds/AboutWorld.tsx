'use client';

import React from 'react';
import WorldTerrain from '../WorldTerrain';
import { WORLD_DATA } from '../GameConfig';

export default function AboutWorld() {
  const config = WORLD_DATA['about'];

  return (
    <div style={{ position: 'relative', width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 2200), height: '100%', background: '#5C94FC' }}>
      <WorldTerrain 
         worldId="about"
         theme="overworld" 
      />
      {/* About Board — slides in, acts as narrative checkpoint */}
      <div className="about-board" style={{ 
          position: 'absolute', top: '12%', left: '550px', width: '850px', 
          background: 'rgba(255, 255, 255, 0.97)', border: '6px solid #000', 
          padding: '36px 40px', boxShadow: '12px 12px 0px rgba(0,0,0,0.5)', zIndex: 10
      }}>
        <div style={{ 
          background: 'var(--mario-red)', 
          display: 'inline-block', 
          padding: '6px 14px', 
          marginBottom: '20px',
          border: '3px solid #000'
        }}>
          <span style={{ fontFamily: '"Press Start 2P"', color: '#FFF', fontSize: '8px', letterSpacing: '1px' }}>
            WORLD 1-2
          </span>
        </div>
        
        <h1 style={{ fontFamily: '"Press Start 2P"', color: '#111', fontSize: '20px', marginBottom: '24px', lineHeight: '1.6'}}>
          ABOUT THE DEVELOPER
        </h1>
        
        <p style={{ fontFamily: '"Press Start 2P"', lineHeight: 2.4, fontSize: '9px', color: '#222', marginBottom: '16px'}}>
          Greetings! I'm <strong style={{color: 'var(--mario-red)'}}>Lakshay Jain</strong>: an engineer, designer, and digital storyteller bridging the gap between imagination and web reality.
        </p>
        <p style={{ fontFamily: '"Press Start 2P"', lineHeight: 2.4, fontSize: '9px', color: '#222', marginBottom: '16px'}}>
          I wield tools like <strong style={{color: '#3060C8'}}>React, Next.js, ThreeJS</strong> to turn dull web pages into living, breathing worlds. I love crafting interactive product experiences that leave users in awe.
        </p>
        
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '24px' }}>
          {[
            { num: '3+', label: 'YEARS' },
            { num: '20+', label: 'PROJECTS' },
            { num: '8+', label: 'SERVICES' },
            { num: '∞', label: 'CREATIVITY' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#111', padding: '12px', textAlign: 'center', border: '2px solid #333' }}>
              <span style={{ color: 'var(--coin)', fontSize: '16px', display: 'block', marginBottom: '4px', fontFamily: '"Press Start 2P"' }}>{stat.num}</span>
              <span style={{ color: '#888', fontSize: '6px', fontFamily: '"Press Start 2P"' }}>{stat.label}</span>
            </div>
          ))}
        </div>

        <a
          href="https://drive.google.com/file/d/19lSjaETHcUer7lcT06HqR2nW8XSeRfrE/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'var(--mario-red)',
            color: '#FFF',
            border: '3px solid #000',
            padding: '10px 20px',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            boxShadow: '4px 4px 0 #000',
            textDecoration: 'none',
            marginTop: '20px',
          }}
        >
          📄 READ CV
        </a>
        
        <p style={{ fontFamily: '"Press Start 2P"', marginTop: '20px', fontSize: '8px', color: '#3060C8'}}>
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
