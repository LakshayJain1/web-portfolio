'use client';

import { useGame } from './GameContext';
import { toggleMute } from './SoundManager';

export default function Navbar() {
  const { score, coins, activeWorld, isMuted, toggleMute: ctxToggle } = useGame();

  const handleMuteToggle = () => {
    toggleMute();
    ctxToggle();
  };

  const worldNames: Record<string, string> = {
    hero: 'WORLD 1-1',
    about: 'WORLD 1-2',
    projects: 'WORLD 1-4',
    contact: 'WORLD 2-1',
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.92)',
        borderBottom: '3px solid var(--coin)',
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 24px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ color: 'var(--coin)', fontSize: '10px', letterSpacing: '1px' }}>
          ★ DEV LAKSHAY
        </div>
        <div style={{ 
          color: '#5CF', 
          fontSize: '8px', 
          background: 'rgba(85,204,255,0.1)', 
          border: '1px solid rgba(85,204,255,0.3)',
          padding: '4px 10px',
          letterSpacing: '1px'
        }}>
          {worldNames[activeWorld] || 'WORLD 1-1'}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span style={{ color: 'var(--coin)', fontSize: '10px' }}>
            {String(score).padStart(6, '0')}
          </span>
          <span style={{ fontSize: '7px', color: '#888' }}>SCORE</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <span style={{ color: 'var(--coin)', fontSize: '10px' }}>
            ×{String(coins).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '7px', color: '#888' }}>COINS</span>
        </div>
        <button 
          className="mute-btn"
          onClick={handleMuteToggle}
          title={isMuted ? 'Unmute' : 'Mute'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            padding: '0',
            position: 'relative',
            border: '2px solid #333',
            background: '#111',
            borderRadius: '2px'
          }}
        >
          {/* Retro Speaker Icon */}
          <div style={{
            width: '16px',
            height: '14px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            {/* Speaker body */}
            <div style={{
              width: '6px',
              height: '6px',
              background: isMuted ? '#666' : 'var(--coin)',
              position: 'relative',
              zIndex: 2
            }} />
            {/* Speaker cone */}
            <div style={{
              width: '0',
              height: '0',
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent',
              borderRight: `10px solid ${isMuted ? '#666' : 'var(--coin)'}`,
              marginLeft: '-2px'
            }} />
            {/* Sound waves (if not muted) */}
            {!isMuted && (
              <div style={{
                position: 'absolute',
                right: '-4px',
                width: '6px',
                height: '10px',
                borderRight: '2px solid var(--coin)',
                borderRadius: '50% 0 0 50%',
                transform: 'rotate(180deg)'
              }} />
            )}
            {/* Mute slash */}
            {isMuted && (
              <div style={{
                position: 'absolute',
                left: '-2px',
                top: '6px',
                width: '20px',
                height: '2px',
                background: '#E52020',
                transform: 'rotate(45deg)',
                zIndex: 3
              }} />
            )}
          </div>
        </button>
      </div>
    </nav>
  );
}
