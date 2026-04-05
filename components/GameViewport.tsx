'use client';

import { useGame } from './GameContext';
import Player from './Player';
import { useState, useEffect, useCallback } from 'react';
import { playUIConfirm } from './SoundManager';
import { motion, AnimatePresence } from 'framer-motion';
import { WORLD_DATA } from './GameConfig';

import HeroWorld from './worlds/HeroWorld';
import AboutWorld from './worlds/AboutWorld';
import ProjectsWorld from './worlds/ProjectsWorld';
import ContactWorld from './worlds/ContactWorld';

export default function GameViewport() {
  const { activeWorld, setActiveWorld, pendingWorld, activePopup, setActivePopup, gameState, setGameState } = useGame();
  const [pixelGrid, setPixelGrid] = useState<{ delay: number }[]>([]);

  // Generate pixel grid for wipe transition
  useEffect(() => {
    const cols = 20;
    const rows = 15;
    const grid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Radial delay from center
        const cx = cols / 2, cy = rows / 2;
        const dist = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2);
        const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
        grid.push({ delay: (dist / maxDist) * 0.3 });
      }
    }
    setPixelGrid(grid);
  }, []);

  // Handle world transition sequence
  useEffect(() => {
    if (gameState === 'exiting') {
      // Wait for exit animation (pixel wipe)
      const timer = setTimeout(() => {
        setGameState('transitioning');
      }, 600);
      return () => clearTimeout(timer);
    } else if (gameState === 'transitioning') {
      if (pendingWorld) {
        setActiveWorld(pendingWorld);
      }
      // Brief pause to ensure mount
      const timer = setTimeout(() => {
        setGameState('entering');
      }, 100);
      return () => clearTimeout(timer);
    } else if (gameState === 'entering') {
      const timer = setTimeout(() => {
        setGameState('idle');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [gameState, pendingWorld, setActiveWorld, setGameState]);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePopup) {
        setActivePopup(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePopup, setActivePopup]);

  // Play sound when modal opens
  useEffect(() => {
    if (activePopup) {
      playUIConfirm();
    }
  }, [activePopup]);

  const renderWorld = (worldName: string) => {
    switch (worldName) {
      case 'hero': return <HeroWorld key="hero" />;
      case 'about': return <AboutWorld key="about" />;
      case 'projects': return <ProjectsWorld key="projects" />;
      case 'contact': return <ContactWorld key="contact" />;
      default: return null;
    }
  };

  return (
    <div 
      id="viewport-wrapper"
      className="fixed inset-0 overflow-hidden z-0 transition-colors duration-500"
      style={{ 
        background: WORLD_DATA[activeWorld]?.skyColor || 'var(--sky, #5C94FC)',
      }}
    >
      <div 
        id="world-container"
        className="absolute inset-y-0 left-0 w-max will-change-transform"
      >
        <AnimatePresence mode="wait">
          {gameState !== 'transitioning' && (
            <motion.div
              key={activeWorld}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="h-full w-full"
            >
              {renderWorld(activeWorld)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Player />

      {/* ─── Pixel Wipe Transition ─────────────────── */}
      {gameState !== 'idle' && (
        <div className="pixel-transition-overlay">
          {pixelGrid.map((cell, i) => (
            <div
              key={i}
              className={`pixel-block ${gameState === 'exiting' ? 'pixel-block-out' : 'pixel-block-in'}`}
              style={{ animationDelay: `${cell.delay}s` }}
            />
          ))}
        </div>
      )}

      {/* ─── World Name Flash ──────────────────────── */}
      {gameState === 'entering' && (
        <div className="world-name-flash">
          <span className="world-name-badge">
            {activeWorld === 'hero' && 'WORLD 1-1'}
            {activeWorld === 'about' && 'WORLD 1-2'}
            {activeWorld === 'projects' && 'WORLD 1-3'}
            {activeWorld === 'contact' && 'WORLD 1-4'}
          </span>
        </div>
      )}

      {/* ─── Rich Project Modal ────────────────────── */}
      {activePopup && (
        <div className="project-modal-backdrop" onClick={() => setActivePopup(null)}>
          <div 
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="project-modal-header">
              <span className="project-type-badge">{activePopup.type}</span>
              <button 
                className="project-modal-close"
                onClick={() => setActivePopup(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Visual Preview Area */}
            <div className="project-modal-preview">
              <div className="project-preview-content">
                <span className="project-preview-icon">★</span>
                <span className="project-preview-name">{activePopup.title}</span>
              </div>
            </div>

            {/* Content */}
            <div className="project-modal-body">
              <h2 className="project-modal-title">{activePopup.title}</h2>
              <p className="project-modal-desc">{activePopup.description}</p>

              {/* Tech Stack */}
              <div className="project-tech-stack">
                {activePopup.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>

              {/* CTAs */}
              <div className="project-modal-ctas">
                <a
                  href={activePopup.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-cta-primary"
                >
                  ▶ VIEW PROJECT
                </a>
                {activePopup.caseStudy && (
                  <a
                    href={activePopup.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-cta-secondary"
                  >
                    📄 CASE STUDY
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
