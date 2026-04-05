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
    <div 
      className="relative h-full overflow-hidden"
      style={{ width: Math.max(config.width, typeof window !== 'undefined' ? window.innerWidth : 2000) }}
    >
      <WorldTerrain
        worldId="contact"
      />
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-[min(90vw,700px)] z-10 bg-[#000020]/92 border-4 border-mario-skin p-8 shadow-[12px_12px_0_rgba(0,0,0,0.5)]">
        <div className="bg-mario-red inline-block px-3.5 py-1.5 mb-4 border-3 border-black">
          <span className="font-press-start text-white text-[8px] tracking-wider">
            WORLD 1-4
          </span>
        </div>
        
        <h1 className="font-press-start text-mario-skin text-[20px] mb-4 uppercase tracking-wider">Contact</h1>
        <p className="font-press-start leading-relaxed text-[9px] text-[#DDD]">
          Let's build something amazing together!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-black/60 border-3 border-mario-skin p-6 mt-6"
        >
          <div className="mb-4">
            <label className="block text-[9px] text-mario-skin mb-2 font-press-start uppercase">Player Name</label>
            <input
              type="text"
              placeholder="Your name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#111] border-2 border-[#444] text-white font-press-start text-[9px] p-3 outline-none focus:border-white transition-colors"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[9px] text-mario-skin mb-2 font-press-start uppercase">Comms Channel</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#111] border-2 border-[#444] text-white font-press-start text-[9px] p-3 outline-none focus:border-white transition-colors"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-[9px] text-mario-skin mb-2 font-press-start uppercase">Mission Brief</label>
            <textarea
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full min-h-[80px] bg-[#111] border-2 border-[#444] text-white font-press-start text-[9px] p-3 outline-none focus:border-white transition-colors resize-vertical"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-mario-red text-white border-3 border-black font-press-start text-[11px] p-3.5 cursor-pointer shadow-[4px_4px_0_#000] hover:translate-y-[-2px] transition-transform active:translate-y-0"
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
