'use client';

import React, { useState } from 'react';
import WorldTerrain from '../WorldTerrain';
import { useGame } from '../GameContext';
import { WORLD_DATA } from '../GameConfig';

export default function ContactWorld() {
  const config = WORLD_DATA['contact'];
  const { addScore } = useGame();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addScore(1000);
    alert('MISSION ACCEPTED!\nLakshay will be in touch soon! ★');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ position: 'relative', width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 2000), height: '100%', background: '#000020' }}>
      <WorldTerrain
        worldId="contact"
        theme="underground"
      />
      <div style={{
        position: 'absolute', top: '8%', left: 300, color: '#FFF', width: '700px', zIndex: 10,
        background: 'rgba(0,0,32,0.92)', border: '4px solid #FAB278',
        padding: '32px', boxShadow: '12px 12px 0px rgba(0,0,0,0.5)'
      }}>
        <div style={{ 
          background: 'var(--mario-red)', 
          display: 'inline-block', 
          padding: '6px 14px', 
          marginBottom: '16px',
          border: '3px solid #000'
        }}>
          <span style={{ fontFamily: '"Press Start 2P"', color: '#FFF', fontSize: '8px', letterSpacing: '1px' }}>
            WORLD 2-1
          </span>
        </div>
        
        <h1 style={{ fontFamily: '"Press Start 2P"', color: '#FAB278', fontSize: '20px', marginBottom: '16px' }}>CONTACT</h1>
        <p style={{ fontFamily: '"Press Start 2P"', lineHeight: 2, fontSize: '9px', color: '#DDD' }}>
          Let's build something amazing together!
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ background: 'rgba(0,0,0,0.6)', border: '3px solid #FAB278', padding: '24px', marginTop: '24px' }}
        >
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '9px', color: '#FAB278', marginBottom: '8px', fontFamily: '"Press Start 2P"' }}>PLAYER NAME</label>
            <input
              type="text"
              placeholder="Your name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', background: '#111', border: '2px solid #444', color: '#FFF', fontFamily: '"Press Start 2P"', fontSize: '9px', padding: '12px', outline: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '9px', color: '#FAB278', marginBottom: '8px', fontFamily: '"Press Start 2P"' }}>COMMS CHANNEL</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', background: '#111', border: '2px solid #444', color: '#FFF', fontFamily: '"Press Start 2P"', fontSize: '9px', padding: '12px', outline: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '9px', color: '#FAB278', marginBottom: '8px', fontFamily: '"Press Start 2P"' }}>MISSION BRIEF</label>
            <textarea
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ width: '100%', minHeight: '80px', background: '#111', border: '2px solid #444', color: '#FFF', fontFamily: '"Press Start 2P"', fontSize: '9px', padding: '12px', outline: 'none', resize: 'vertical' }}
              required
            />
          </div>
          <button
            type="submit"
            style={{ width: '100%', background: '#E52020', color: '#FFF', border: '3px solid #000', fontFamily: '"Press Start 2P"', fontSize: '11px', padding: '14px', cursor: 'pointer', boxShadow: '4px 4px 0 #000' }}
          >
            ▶ START MISSION
          </button>
        </form>
      </div>

      {/* Castle at the end */}
      <div style={{ position: 'absolute', bottom: '0px', left: `${config.width - 400}px`, zIndex: 10 }}>
        <div style={{ position: 'relative', width: '192px', height: '160px' }}>
          <div style={{ position: 'absolute', bottom: 64, left: '32px', width: '128px', height: '96px', background: '#606060', border: '4px solid #000', borderBottom: 'none' }} />
          <div style={{ position: 'absolute', bottom: 64, left: '48px', width: '96px', height: '96px', background: '#707070', border: '4px solid #000', borderBottom: 'none' }} />
          <div style={{ position: 'absolute', bottom: '160px', left: '16px', width: '32px', height: '64px', background: '#606060', border: '4px solid #000', borderBottom: 'none' }} />
          <div style={{ position: 'absolute', bottom: '160px', left: '144px', width: '32px', height: '64px', background: '#606060', border: '4px solid #000', borderBottom: 'none' }} />
          <div style={{ position: 'absolute', bottom: '192px', left: '32px', width: '32px', height: '32px', background: '#505050', border: '4px solid #000' }} />
          <div style={{ position: 'absolute', bottom: '192px', left: '80px', width: '32px', height: '32px', background: '#505050', border: '4px solid #000' }} />
          <div style={{ position: 'absolute', bottom: '192px', left: '128px', width: '32px', height: '32px', background: '#505050', border: '4px solid #000' }} />
          <span style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', color: '#FFF', fontSize: '8px', fontFamily: '"Press Start 2P"', whiteSpace: 'nowrap', textShadow: '2px 2px 0 #000' }}>THE END!</span>
        </div>
      </div>
    </div>
  );
}
