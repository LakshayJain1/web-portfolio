'use client';

import { useState } from 'react';
import { useGame } from './GameContext';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { collectSkill, addScore } = useGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    collectSkill('MISSION COMPLETE', 1000);
    addScore(1000);
    alert('MISSION ACCEPTED!\nLakshay will be in touch soon! ★');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      style={{
        background: '#111',
        minHeight: '80vh',
        padding: '80px 40px 60px',
        borderTop: '8px solid var(--coin)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div className="world-header">
        <div className="world-badge">FINAL WORLD</div>
        <h2 className="world-title">INSERT COIN TO CONTINUE</h2>
      </div>
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <p
          style={{
            textAlign: 'center',
            fontSize: '8px',
            color: '#888',
            lineHeight: '2',
            marginBottom: '8px',
          }}
        >
          Got a project in mind? Let&apos;s build something amazing together.
          <br />
          <span style={{ color: 'var(--coin)' }}>
            Every great adventure starts with a single message.
          </span>
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '24px',
          }}
        >
          <div style={{ fontSize: '8px', color: '#888', display: 'flex', alignItems: 'center', gap: '10px' }}>
            📞{' '}
            <a href="tel:+916378146202" style={{ color: '#5CF', textDecoration: 'none' }}>
              +91 63781 46202
            </a>
          </div>
          <div style={{ fontSize: '8px', color: '#888', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ✉{' '}
            <a href="mailto:lakshayjain326@gmail.com" style={{ color: '#5CF', textDecoration: 'none' }}>
              lakshayjain326@gmail.com
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: '#000',
            border: '3px solid var(--coin)',
            padding: '32px',
            marginTop: '32px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '8px',
                color: 'var(--coin)',
                marginBottom: '8px',
              }}
            >
              PLAYER NAME
            </label>
            <input
              type="text"
              placeholder="Your name..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                background: '#111',
                border: '2px solid #444',
                color: '#FFF',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                padding: '12px',
                outline: 'none',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '8px',
                color: 'var(--coin)',
                marginBottom: '8px',
              }}
            >
              COMMUNICATION CHANNEL
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                background: '#111',
                border: '2px solid #444',
                color: '#FFF',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                padding: '12px',
                outline: 'none',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '8px',
                color: 'var(--coin)',
                marginBottom: '8px',
              }}
            >
              MISSION BRIEF
            </label>
            <textarea
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                minHeight: '100px',
                background: '#111',
                border: '2px solid #444',
                color: '#FFF',
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                padding: '12px',
                outline: 'none',
                resize: 'vertical',
              }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'var(--mario-red)',
              color: '#FFF',
              border: '3px solid #000',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              padding: '14px',
              cursor: 'pointer',
              boxShadow: '4px 4px 0 #000',
              letterSpacing: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '6px 6px 0 #000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '4px 4px 0 #000';
            }}
          >
            ▶ START MISSION
          </button>
        </form>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '28px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'INSTAGRAM', url: 'https://www.instagram.com/lakshayjain986/' },
            { label: 'DRIBBBLE', url: 'https://dribbble.com/Lakshay123X' },
            { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/lakshay-jain-723152319/' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                textDecoration: 'none',
                border: '3px solid var(--coin)',
                color: 'var(--coin)',
                fontSize: '8px',
                padding: '10px 16px',
                boxShadow: '3px 3px 0 var(--coin)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0 var(--coin)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '3px 3px 0 var(--coin)';
              }}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
