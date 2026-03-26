'use client';

import React from 'react';
import WorldTerrain from '../WorldTerrain';
import { WORLD_DATA } from '../GameConfig';
import { useGame } from '../GameContext';

export default function HeroWorld() {
  const config = WORLD_DATA['hero'];
  const { onboardingDismissed } = useGame();

  return (
    <div style={{ position: 'relative', width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 2000), height: '100%' }}>
      <WorldTerrain 
         worldId="hero"
      />
      
      {/* Title Card */}
      <div style={{
          position: 'absolute',
          top: '18%',
          left: '300px',
          width: '600px',
          textAlign: 'center',
          zIndex: 10
      }}>
         <h1 style={{ 
           fontFamily: '"Press Start 2P"', 
           color: '#FFD700', 
           textShadow: '4px 4px 0px #B8860B, -1px -1px 0px #000', 
           fontSize: '32px',
           letterSpacing: '2px'
         }}>
           DEV LAKSHAY
         </h1>
         <p style={{ 
           fontFamily: '"Press Start 2P"', 
           color: 'white', 
           marginTop: '20px', 
           fontSize: '11px', 
           lineHeight: '2.2',
           textShadow: '2px 2px 0 #000'
         }}>
            DESIGNER  ✦  DEVELOPER  ✦  STORYTELLER
         </p>
      </div>

      {/* Pipe Hint */}
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

      {/* Onboarding Overlay */}
      {!onboardingDismissed && (
        <div style={{
          position: 'fixed',
          bottom: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4000,
          pointerEvents: 'none',
          animation: 'onboardingPulse 2s ease-in-out infinite',
        }}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.9)',
            border: '4px solid #FFD700',
            padding: '20px 36px',
            textAlign: 'center',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.25), 8px 8px 0 rgba(0,0,0,0.5)',
          }}>
            <div style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '10px',
              color: '#FFD700',
              marginBottom: '16px',
              letterSpacing: '3px',
            }}>
              HOW TO PLAY
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
              {[
                { key: '←', label: 'LEFT' },
                { key: '→', label: 'RIGHT' },
                { key: '↑', label: 'JUMP' },
                { key: '↓', label: 'PIPE' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: '#1A1A2E',
                    border: '3px solid #555',
                    borderBottom: '4px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '16px',
                    color: '#FFF',
                  }}>
                    {item.key}
                  </div>
                  <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '6px',
                    color: '#888',
                    letterSpacing: '1px',
                  }}>
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
