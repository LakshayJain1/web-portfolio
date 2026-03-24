'use client';

import { useGame } from './GameContext';
import Player from './Player';
import { useState, useEffect, useCallback } from 'react';
import { playUIConfirm } from './SoundManager';

import HeroWorld from './worlds/HeroWorld';
import AboutWorld from './worlds/AboutWorld';
import ProjectsWorld from './worlds/ProjectsWorld';
import ContactWorld from './worlds/ContactWorld';

export default function GameViewport() {
  const { activeWorld, activePopup, setActivePopup, isTransitioning } = useGame();
  const [transitionState, setTransitionState] = useState<'idle' | 'out' | 'in'>('idle');
  const [worldKey, setWorldKey] = useState(0);
  const [prevWorld, setPrevWorld] = useState(activeWorld);
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
    if (activeWorld !== prevWorld) {
      setTransitionState('out');
      
      const timerOut = setTimeout(() => {
        setWorldKey(k => k + 1);
        setPrevWorld(activeWorld);
        setTransitionState('in');
        
        const timerIn = setTimeout(() => {
          setTransitionState('idle');
        }, 600);
        
        return () => clearTimeout(timerIn);
      }, 600);
      
      return () => {
        clearTimeout(timerOut);
      };
    }
  }, [activeWorld, prevWorld]);

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

  return (
    <div 
      id="viewport-wrapper"
      style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden', 
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'var(--sky, #5C94FC)'
      }}
    >
      <div 
        id="world-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {/* Render previous world during exit transition to avoid sudden black screen */}
        {(transitionState === 'out' ? prevWorld : activeWorld) === 'hero' && <HeroWorld key={worldKey + (transitionState === 'out' ? '_prev' : '')} />}
        {(transitionState === 'out' ? prevWorld : activeWorld) === 'about' && <AboutWorld key={worldKey + (transitionState === 'out' ? '_prev' : '')} />}
        {(transitionState === 'out' ? prevWorld : activeWorld) === 'projects' && <ProjectsWorld key={worldKey + (transitionState === 'out' ? '_prev' : '')} />}
        {(transitionState === 'out' ? prevWorld : activeWorld) === 'contact' && <ContactWorld key={worldKey + (transitionState === 'out' ? '_prev' : '')} />}
      </div>

      <Player />

      {/* ─── Pixel Wipe Transition ─────────────────── */}
      {transitionState !== 'idle' && (
        <div className="pixel-transition-overlay">
          {pixelGrid.map((cell, i) => (
            <div
              key={i}
              className={`pixel-block ${transitionState === 'out' ? 'pixel-block-out' : 'pixel-block-in'}`}
              style={{ animationDelay: `${cell.delay}s` }}
            />
          ))}
        </div>
      )}

      {/* ─── World Name Flash ──────────────────────── */}
      {transitionState === 'in' && (
        <div className="world-name-flash">
          <span className="world-name-badge">
            {activeWorld === 'hero' && 'WORLD 1-1'}
            {activeWorld === 'about' && 'WORLD 1-2'}
            {activeWorld === 'projects' && 'WORLD 1-4'}
            {activeWorld === 'contact' && 'WORLD 2-1'}
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
