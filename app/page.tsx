'use client';

import Navbar from '@/components/Navbar';
import GameViewport from '@/components/GameViewport';
import CoinPopup from '@/components/CoinPopup';

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '0',
          background: '#FFD700',
          color: '#000',
          padding: '8px 16px',
          zIndex: 10000,
          transition: 'top 0.3s',
        }}
        onFocus={(e) => (e.currentTarget.style.top = '0')}
        onBlur={(e) => (e.currentTarget.style.top = '-40px')}
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <GameViewport />
      </main>

      <CoinPopup />
    </>
  );
}
