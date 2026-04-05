'use client';

import { useGame } from './GameContext';

export default function CoinPopup() {
  const { coinPops } = useGame();

  return (
    <>
      {coinPops.map((pop) => (
        <div
          key={pop.id}
          className="fixed coin-pop"
          style={{
            left: pop.x,
            top: pop.y,
          }}
        >
          {pop.text}
        </div>
      ))}
    </>
  );
}
