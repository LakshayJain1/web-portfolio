'use client';

import { useGame } from './GameContext';

export default function CoinPopup() {
  const { coinPops } = useGame();

  return (
    <>
      {coinPops.map((pop) => (
        <div
          key={pop.id}
          style={{
            position: 'fixed',
            left: pop.x,
            top: pop.y,
          }}
          className="coin-pop"
        >
          {pop.text}
        </div>
      ))}
    </>
  );
}
