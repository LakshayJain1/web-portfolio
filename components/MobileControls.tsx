'use client';

import React, { useCallback, useRef } from 'react';

/**
 * MobileControls renders a NES-style D-Pad and Action buttons 
 * that simulate keyboard events for the existing Player logic.
 */
export default function MobileControls() {
  const activeKeys = useRef<Set<string>>(new Set());

  const handlePress = useCallback((key: string) => {
    if (!activeKeys.current.has(key)) {
      activeKeys.current.add(key);
      window.dispatchEvent(new KeyboardEvent('keydown', { code: key, bubbles: true }));
    }
  }, []);

  const handleRelease = useCallback((key: string) => {
    if (activeKeys.current.has(key)) {
      activeKeys.current.delete(key);
      window.dispatchEvent(new KeyboardEvent('keyup', { code: key, bubbles: true }));
    }
  }, []);

  // Map user-friendly names to KeyboardEvent.code
  const CONTROLS = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp',
    SPACE: 'Space'
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] pointer-events-none select-none p-6 md:hidden flex justify-between items-end pb-10 landscape:pb-6">
      {/* ─── Movement D-Pad (Bottom Left) ───────────── */}
      <div className="flex flex-col items-center gap-2 pointer-events-auto">
        <div className="flex gap-4 items-center">
          {/* Left */}
          <button
            className="w-16 h-16 bg-black/40 border-4 border-white/60 active:bg-white/40 active:scale-95 flex items-center justify-center rounded-xl backdrop-blur-sm transition-all"
            onPointerDown={() => handlePress(CONTROLS.LEFT)}
            onPointerUp={() => handleRelease(CONTROLS.LEFT)}
            onPointerLeave={() => handleRelease(CONTROLS.LEFT)}
            aria-label="Left"
          >
            <span className="text-white text-2xl">←</span>
          </button>

          {/* Down (Pipe) */}
          <button
            className="w-16 h-16 bg-black/40 border-4 border-white/60 active:bg-white/40 active:scale-95 flex items-center justify-center rounded-xl backdrop-blur-sm transition-all"
            onPointerDown={() => handlePress(CONTROLS.DOWN)}
            onPointerUp={() => handleRelease(CONTROLS.DOWN)}
            onPointerLeave={() => handleRelease(CONTROLS.DOWN)}
            aria-label="Down"
          >
            <span className="text-white text-2xl">↓</span>
          </button>

          {/* Right */}
          <button
            className="w-16 h-16 bg-black/40 border-4 border-white/60 active:bg-white/40 active:scale-95 flex items-center justify-center rounded-xl backdrop-blur-sm transition-all"
            onPointerDown={() => handlePress(CONTROLS.RIGHT)}
            onPointerUp={() => handleRelease(CONTROLS.RIGHT)}
            onPointerLeave={() => handleRelease(CONTROLS.RIGHT)}
            aria-label="Right"
          >
            <span className="text-white text-2xl">→</span>
          </button>
        </div>
      </div>

      {/* ─── Jump Button (Bottom Right) ────────────── */}
      <div className="pointer-events-auto">
        <button
          className="w-24 h-24 bg-mario-red/60 border-4 border-white/80 active:bg-mario-red/80 active:scale-90 flex items-center justify-center rounded-full backdrop-blur-sm shadow-xl transition-all"
          onPointerDown={() => handlePress(CONTROLS.UP)}
          onPointerUp={() => handleRelease(CONTROLS.UP)}
          onPointerLeave={() => handleRelease(CONTROLS.UP)}
          aria-label="Jump"
        >
          <span className="font-press-start text-white text-[10px] drop-shadow-md">JUMP</span>
        </button>
      </div>
    </div>
  );
}
