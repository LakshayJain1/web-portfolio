'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { ProjectData, resetAllWorlds } from './GameConfig';

interface CoinPop {
  id: number;
  x: number;
  y: number;
  text: string;
}

export type GameState = "idle" | "exiting" | "transitioning" | "entering";
export type PowerUpEffect = "none" | "flower";

export const ORDERED_WORLDS = ['hero', 'about', 'skills', 'projects', 'services', 'contact'];

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
  gameInteractionStarted: boolean;
  markGameInteractionStarted: () => void;
  fullReset: () => void;
  navigateToNextWorld: () => void;
  unlockedAbout: boolean;
  setUnlockedAbout: (v: boolean) => void;
  /** About profile: terminal-style decrypt in progress after hitting a secret ? block */
  aboutDecrypting: boolean;
  setAboutDecrypting: (v: boolean) => void;
  unlockedSkillsTiers: number;
  setUnlockedSkillsTiers: (v: number | ((prev: number) => number)) => void;
  /** Bumped when in-game blocks mutate so UI can re-read WORLD_DATA (e.g. project ? hits). */
  worldDataEpoch: number;
  bumpWorldDataEpoch: () => void;
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
  const [gameInteractionStarted, setGameInteractionStarted] = useState(false);
  const [unlockedAbout, setUnlockedAbout] = useState(false);
  const [aboutDecrypting, setAboutDecrypting] = useState(false);
  const [unlockedSkillsTiers, setUnlockedSkillsTiers] = useState(1);
  const [worldDataEpoch, setWorldDataEpoch] = useState(0);

  const bumpWorldDataEpoch = useCallback(() => {
    setWorldDataEpoch((n) => n + 1);
  }, []);

  const navigateToNextWorld = useCallback(() => {
    const currentIndex = ORDERED_WORLDS.indexOf(activeWorld);
    if (currentIndex !== -1 && currentIndex < ORDERED_WORLDS.length - 1) {
      const nextWorld = ORDERED_WORLDS[currentIndex + 1];
      const element = document.getElementById(nextWorld);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Set a small delay before updating activeWorld to allow scroll to start
        setTimeout(() => setActiveWorld(nextWorld), 300);
      }
    }
  }, [activeWorld]);

  const fullReset = useCallback(() => {
    resetAllWorlds();
    setCoins(0);
    setScore(0);
    setLives(5);
    setPowerUpEffect('none');
    setUnlockedAbout(false);
    setAboutDecrypting(false);
    setUnlockedSkillsTiers(1);
    setGameInteractionStarted(false);
    setActiveWorld('hero');
    setWorldDataEpoch((n) => n + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const markGameInteractionStarted = useCallback(() => {
    setGameInteractionStarted(true);
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
    const screenY = worldY;
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

  const contextValue = useMemo<GameContextType>(
    () => ({
      coins,
      score,
      coinPops,
      collectCoin,
      addScore,
      activeWorld,
      setActiveWorld,
      pendingWorld: null,
      activePopup,
      setActivePopup,
      gameState,
      setGameState,
      triggerNavigation,
      lives,
      setLives,
      powerUpEffect,
      setPowerUpEffect,
      isMuted,
      toggleMute,
      onboardingDismissed,
      dismissOnboarding,
      gameInteractionStarted,
      markGameInteractionStarted,
      fullReset,
      navigateToNextWorld,
      unlockedAbout,
      setUnlockedAbout,
      aboutDecrypting,
      setAboutDecrypting,
      unlockedSkillsTiers,
      setUnlockedSkillsTiers,
      worldDataEpoch,
      bumpWorldDataEpoch,
    }),
    [
      coins,
      score,
      coinPops,
      collectCoin,
      addScore,
      activeWorld,
      activePopup,
      gameState,
      lives,
      powerUpEffect,
      isMuted,
      onboardingDismissed,
      gameInteractionStarted,
      unlockedAbout,
      aboutDecrypting,
      unlockedSkillsTiers,
      worldDataEpoch,
      bumpWorldDataEpoch,
      navigateToNextWorld,
      fullReset,
      toggleMute,
      dismissOnboarding,
      markGameInteractionStarted,
    ]
  );

  return (
    <GameContext.Provider value={contextValue}>
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
