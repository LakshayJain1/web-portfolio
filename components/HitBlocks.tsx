'use client';

import React, { useState } from "react";

export default function HitBlocks() {
  const [hitBlocks, setHitBlocks] = useState<Record<number, boolean>>({});

  const handleHitBlock = (i: number) => {
    if (hitBlocks[i]) return;
    setHitBlocks((prev) => ({ ...prev, [i]: true }));
    const el = document.getElementById(`qblock-${i}`);
    if (el) {
      el.classList.add("hit");
      const coin = document.createElement("div");
      coin.className = "coin-pop";
      const rect = el.getBoundingClientRect();
      coin.style.left = rect.left + "px";
      coin.style.top = rect.top + "px";
      document.body.appendChild(coin);
      setTimeout(() => coin.remove(), 700);
    }
  };

  return (
    <div className="qblock-row">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          id={`qblock-${i}`}
          className="qblock"
          onClick={() => handleHitBlock(i)}
        >
          ?
        </div>
      ))}
    </div>
  );
}
