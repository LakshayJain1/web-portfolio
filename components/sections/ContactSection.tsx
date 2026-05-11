'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WorldTerrain from '../WorldTerrain';
import { useGame } from '../GameContext';

export default function ContactSection() {
  const { addScore } = useGame();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addScore(1000);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #06060C 0%, #0A0A16 50%, #06060C 100%)' }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060C] via-transparent to-[#06060C]/60 z-[2]" />
        <WorldTerrain worldId="contact" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-4 md:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[600px] mx-auto w-full"
        >
          {/* World badge */}
          <div className="mb-6 text-center">
            <span className="font-pixel text-[7px] text-[var(--mario-skin)] border border-[var(--mario-skin)] px-3 py-1.5 tracking-wider inline-block">
              FINAL WORLD // COMMS TERMINAL
            </span>
          </div>

          {/* Terminal Window */}
          <div
            className="border border-[var(--coin)] bg-[rgba(10,10,22,0.9)] backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: '0 0 30px rgba(255, 215, 0, 0.06), 4px 4px 0 rgba(0, 0, 0, 0.4)' }}
          >
            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-dim)] bg-[rgba(0,0,0,0.3)]">
              <span className="font-pixel text-[6px] text-[var(--text-dim)] tracking-wider">
                COMMS.EXE — ENCRYPTED TRANSMISSION
              </span>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--mario-red)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-coin)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-pipe)]" />
              </div>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="font-pixel text-[var(--accent-pipe)] text-[16px] mb-4">
                    ✓ MESSAGE TRANSMITTED
                  </div>
                  <p className="font-terminal text-[var(--text-body)] text-[18px]">
                    Transmission acknowledged. Lakshay will respond within 24-48 hours.
                  </p>
                  <div className="mt-6 font-pixel text-[6px] text-[var(--text-dim)] animate-boot-pulse">
                    SIGNAL: STRONG • ENCRYPTION: ACTIVE
                  </div>
                </motion.div>
              ) : (
                <>
                  <h2 className="font-pixel text-[var(--coin)] text-[clamp(16px,3vw,22px)] mb-4 text-center tracking-wider">
                    SEND TRANSMISSION
                  </h2>
                  <p className="font-terminal text-[var(--text-dim)] text-[16px] text-center mb-8">
                    Got a mission? Let&apos;s build something legendary together.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="font-pixel text-[7px] text-[var(--text-cyan)] mb-2 block tracking-wider uppercase">
                        &gt; SENDER_ID
                      </label>
                      <input
                        type="text"
                        placeholder="Your name..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[rgba(0,0,0,0.4)] border border-[var(--border-dim)] text-[var(--text-primary)] font-terminal text-[16px] p-3 outline-none transition-colors focus:border-[var(--coin)]"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-pixel text-[7px] text-[var(--text-cyan)] mb-2 block tracking-wider uppercase">
                        &gt; COMMS_CHANNEL
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[rgba(0,0,0,0.4)] border border-[var(--border-dim)] text-[var(--text-primary)] font-terminal text-[16px] p-3 outline-none transition-colors focus:border-[var(--coin)]"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-pixel text-[7px] text-[var(--text-cyan)] mb-2 block tracking-wider uppercase">
                        &gt; MISSION_BRIEF
                      </label>
                      <textarea
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full min-h-[100px] bg-[rgba(0,0,0,0.4)] border border-[var(--border-dim)] text-[var(--text-primary)] font-terminal text-[16px] p-3 outline-none transition-colors focus:border-[var(--coin)] resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full retro-btn bg-[var(--mario-red)] text-white border-2 border-black justify-center shadow-[3px_3px_0_#000] hover:translate-y-[-2px] hover:shadow-[3px_5px_0_#000] active:translate-y-0 active:shadow-none"
                    >
                      ▶ TRANSMIT MESSAGE
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {[
              { label: 'INSTAGRAM', href: 'https://www.instagram.com/lakshayjain986/' },
              { label: 'DRIBBBLE', href: 'https://dribbble.com/Lakshay123X' },
              { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/lakshay-jain-723152319/' },
              { label: 'GITHUB', href: '#' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-pixel text-[6px] text-[var(--text-dim)] border border-[var(--border-dim)] px-3 py-2 hover:text-[var(--coin)] hover:border-[var(--coin)] transition-colors tracking-wider"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center border-t border-[var(--border-dim)] pt-8">
            <p className="font-pixel text-[6px] text-[var(--text-dim)] tracking-wider">
              © 2025 <span className="text-[var(--coin)]">DEV LAKSHAY</span>
            </p>
            <p className="font-terminal text-[14px] text-[var(--text-dim)] mt-2 opacity-60">
              Designed with pixel precision and arcade soul.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
