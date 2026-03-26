'use client';

import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { ProjectData } from './GameConfig';

interface CoinPop {
  id: number;
  x: number;
  y: number;
  text: string;
}

export type GameState = "idle" | "exiting" | "transitioning" | "entering";
export type PowerUpEffect = "none" | "flower";

interface GameContextType {
  coins: number;
  score: number;
  coinPops: CoinPop[];
  collectCoin: (worldX: number, worldY: number) => void;
  addScore: (pts: number) => void;
  activeWorld: string;
  setActiveWorld: (world: string) => void;
  pendingWorld: string | null;
  activePopup: ProjectData | null;
  setActivePopup: (popup: ProjectData | null) => void;
  gameState: GameState;
  setGameState: (state: GameState) => void;
  triggerNavigation: (targetWorld: string) => void;
  lives: number;
  setLives: (v: number | ((prev: number) => number)) => void;
  powerUpEffect: PowerUpEffect;
  setPowerUpEffect: (effect: PowerUpEffect) => void;
  isMuted: boolean;
  toggleMute: () => void;
  onboardingDismissed: boolean;
  dismissOnboarding: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [coinPops, setCoinPops] = useState<CoinPop[]>([]);
  const [activeWorld, setActiveWorld] = useState('hero');
  const [pendingWorld, setPendingWorld] = useState<string | null>(null);
  const [activePopup, setActivePopup] = useState<ProjectData | null>(null);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [lives, setLives] = useState(5);
  const [powerUpEffect, setPowerUpEffect] = useState<PowerUpEffect>('none');
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mario-muted') === 'true';
    }
    return false;
  });
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('mario-muted', String(next));
      }
      return next;
    });
  }, []);

  const dismissOnboarding = useCallback(() => {
    setOnboardingDismissed(true);
  }, []);

  const triggerNavigation = useCallback((targetWorld: string) => {
    setPendingWorld(targetWorld);
    setGameState('exiting');
  }, []);

  const collectCoin = useCallback((worldX: number, worldY: number) => {
    setCoins(prev => prev + 1);
    setScore(prev => prev + 10);
    
    const id = Date.now() + Math.random();

    // Position the pop at the coin's screen position
    const worldContainer = document.getElementById('world-container');
    let screenX = worldX;
    let screenY = worldY;
    if (worldContainer) {
      const transform = worldContainer.style.transform;
      const match = transform.match(/translateX\((-?[\d.]+)px\)/);
      if (match) {
        screenX = worldX + parseFloat(match[1]);
      }
    }
    
    setCoinPops(prev => [...prev, { id, x: screenX, y: screenY, text: '+10' }]);
    setTimeout(() => {
      setCoinPops(prev => prev.filter(p => p.id !== id));
    }, 900);
  }, []);

  const addScore = useCallback((pts: number) => {
    setScore(prev => prev + pts);
    
    const id = Date.now() + Math.random();
    const x = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
    const y = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;
    
    setCoinPops(prev => [...prev, { id, x, y, text: '+' + pts }]);
    setTimeout(() => {
      setCoinPops(prev => prev.filter(p => p.id !== id));
    }, 900);
  }, []);

  return (
    <GameContext.Provider value={{ 
      coins, score, coinPops, collectCoin, addScore, 
      activeWorld, setActiveWorld, pendingWorld,
      activePopup, setActivePopup, 
      gameState, setGameState, triggerNavigation,
      lives, setLives,
      powerUpEffect, setPowerUpEffect,
      isMuted, toggleMute,
      onboardingDismissed, dismissOnboarding
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
