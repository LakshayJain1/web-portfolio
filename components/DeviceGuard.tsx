'use client';

import React, { useState, useEffect } from 'react';
import MobileControls from './MobileControls';

export default function DeviceGuard({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [bypass, setBypass] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  if (isMobile && !bypass) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#000068] flex flex-col items-center justify-center p-8 text-center font-press-start text-white overflow-hidden">
        {/* Animated Warp Pipe */}
        <div className="w-[120px] h-[160px] relative mb-10 animate-pixel-bob">
          {/* Pipe Top */}
          <div className="w-[120px] h-10 bg-[#00A800] border-4 border-black absolute top-0" />
          {/* Pipe Body */}
          <div className="w-[100px] h-[120px] bg-[#00A800] border-4 border-black border-t-0 absolute top-10 left-2.5" />
          {/* Pipe Shine */}
          <div className="w-2.5 h-[110px] bg-[#40FF40] absolute top-11 left-5 opacity-50" />
        </div>

        <h1 className="text-[18px] text-coin mb-6 leading-[1.8]">
          WARP PIPE BLOCKED!
        </h1>

        <p className="text-[10px] text-white mb-10 leading-[2.5] max-w-[400px]">
          THIS WORLD IS BEST EXPERIENCED ON A <span className="text-coin">LAPTOP OR DESKTOP</span>.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-[280px]">
          <button
            onClick={() => setBypass(true)}
            className="p-4 bg-mario-red text-white border-4 border-black text-[10px] cursor-pointer shadow-[6px_6px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            ▶ TRY MOBILE EXPERIENCE
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied! Open it on your laptop.');
            }}
            className="p-4 bg-[#3060C8] text-white border-4 border-black text-[10px] cursor-pointer shadow-[6px_6px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            COPY LINK FOR DESKTOP
          </button>
        </div>
      </div>
    );
  }

  // If mobile bypass is active but device is in portrait, show rotate prompt
  if (isMobile && bypass && !isLandscape) {
    return (
      <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-8 text-center font-press-start text-white">
        <div className="w-24 h-40 border-4 border-white rounded-xl mb-10 flex items-center justify-center animate-bounce-horizontal">
          <span className="text-white text-2xl rotate-90">⟳</span>
        </div>
        <h2 className="text-[16px] text-mario-skin mb-4">PLEASE ROTATE DEVICE</h2>
        <p className="text-[8px] leading-relaxed text-gray-400">LANDSCAPE MODE REQUIRED FOR WORLD EXPLORATION</p>
      </div>
    );
  }

  return (
    <>
      {children}
      {isMobile && bypass && <MobileControls />}
    </>
  );
}

