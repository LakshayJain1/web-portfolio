'use client';

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CoinPopup from '../components/CoinPopup';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import Player from '../components/Player';
import ProjectPopup from '../components/ProjectPopup';
import { useGame } from '../components/GameContext';
import { playBackgroundMusic } from '../components/SoundManager';

const WORLD_MAP: Record<string, string> = {
  hero: 'hero',
  about: 'about',
  skills: 'skills',
  projects: 'projects',
  contact: 'contact',
};

export default function Home() {
  const { setActiveWorld } = useGame();

  // ── Prevent ALL native scroll/keyboard navigation — game-driven only ──
  useEffect(() => {
    const preventScrollKeys = (e: KeyboardEvent) => {
      const blocked = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        ' ', 'PageUp', 'PageDown', 'Home', 'End',
      ];
      if (blocked.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const preventWheelScroll = (e: WheelEvent) => {
      // Allow scrolling within modals / content areas only
      const target = e.target as HTMLElement;
      const isScrollable = target.closest('.allow-scroll');
      if (!isScrollable) {
        e.preventDefault();
      }
    };

    const preventTouchScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isScrollable = target.closest('.allow-scroll');
      if (!isScrollable) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventScrollKeys, { passive: false });
    window.addEventListener('wheel', preventWheelScroll, { passive: false });
    window.addEventListener('touchmove', preventTouchScroll, { passive: false });

    return () => {
      window.removeEventListener('keydown', preventScrollKeys);
      window.removeEventListener('wheel', preventWheelScroll);
      window.removeEventListener('touchmove', preventTouchScroll);
    };
  }, []);

  // ── IntersectionObserver to detect which section Mario is in ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const worldId = entry.target.id;
            const mapped = WORLD_MAP[worldId] || 'hero';
            setActiveWorld(mapped);
            playBackgroundMusic(mapped);
          }
        });
      },
      { threshold: 0.45 }
    );

    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [setActiveWorld]);

  return (
    <div className="relative bg-[var(--bg-deep)] text-[var(--text-body)]">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Global CRT phosphor atmosphere layer */}
      <div className="crt-phosphor" aria-hidden="true" />

      <Navbar />

      <main id="main-content" className="flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Player />
      <ProjectPopup />
      <CoinPopup />
    </div>
  );
}
