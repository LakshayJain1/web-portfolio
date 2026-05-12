'use client';

import { useGame } from './GameContext';
import { toggleMute } from './SoundManager';
import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const { score, coins, activeWorld, isMuted, toggleMute: ctxToggle, addScore } = useGame();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [easterToast, setEasterToast] = useState(false);
  /** Rapid logo taps (easter egg). More ideas: Konami w/ focus trap off, #warp hash, 99 coins + pipe combo, hidden key on contact form. */
  const brandBurstRef = useRef({ count: 0, t: 0 });

  // Track scroll progress for the HUD bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Game-driven navigation: smoothly scroll to section, updating world state
  const navigateTo = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const onBrandClick = () => {
    navigateTo('hero');
    const now = Date.now();
    if (now - brandBurstRef.current.t > 3200) brandBurstRef.current.count = 0;
    brandBurstRef.current.t = now;
    brandBurstRef.current.count += 1;
    if (brandBurstRef.current.count >= 8) {
      brandBurstRef.current.count = 0;
      addScore(5000);
      setEasterToast(true);
      window.setTimeout(() => setEasterToast(false), 4800);
    }
  };

  const handleMuteToggle = () => {
    toggleMute();
    ctxToggle();
  };

  const sections = [
    { id: 'hero', label: 'WORLD 1-1' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[3000]">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--border-dim)]">
        <div
          className="h-full bg-[var(--coin)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%`, boxShadow: '0 0 8px rgba(255, 215, 0, 0.4)' }}
        />
      </div>

      <div className="bg-[rgba(10,10,15,0.92)] border-b border-[var(--border-dim)] backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-8 h-12">
          {/* Left: Brand */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onBrandClick}
              className="text-[var(--coin)] text-[9px] font-pixel tracking-wider hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
            >
              ★ DEV LAKSHAY
            </button>
            <div className="hidden md:flex items-center gap-4">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => navigateTo(s.id)}
                  className={`text-[7px] font-pixel tracking-wide transition-all duration-200 bg-transparent border-none cursor-pointer ${
                    activeWorld === s.id
                      ? 'text-[var(--coin)]'
                      : 'text-[var(--text-dim)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: HUD */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-[var(--coin)] text-[9px] font-pixel leading-none">{String(score).padStart(6, '0')}</span>
                <span className="text-[6px] font-pixel text-[var(--text-dim)] uppercase leading-none mt-1">SCORE</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[var(--coin)] text-[9px] font-pixel leading-none">×{String(coins).padStart(2, '0')}</span>
                <span className="text-[6px] font-pixel text-[var(--text-dim)] uppercase leading-none mt-1">COINS</span>
              </div>
            </div>

            <button
              className="flex items-center justify-center w-7 h-7 border border-[var(--border-dim)] bg-[var(--bg-surface)] hover:border-[var(--coin)] transition-colors"
              onClick={handleMuteToggle}
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isMuted ? 'var(--text-dim)' : 'var(--coin)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMuted ? (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                ) : (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {easterToast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-14 left-1/2 z-[4000] -translate-x-1/2 max-w-[min(92vw,420px)] px-4 py-3 border-2 border-[var(--coin)] bg-[rgba(10,8,18,0.96)] shadow-[4px_4px_0_#000] text-center pointer-events-none"
          >
            <p className="font-pixel text-[6px] text-[var(--coin)] tracking-wider">WARP ZONE</p>
            <p className="font-terminal text-[13px] text-[var(--text-body)] mt-1 leading-snug">
              You found the rapid-tap secret. +5000 bonus score. Try a Konami sequence (when not moving Mario), a URL hash, or a hidden combo on the contact form next.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
