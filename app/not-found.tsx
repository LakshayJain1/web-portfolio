import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--text-body)] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="font-pixel text-[7px] text-[var(--mario-skin)] border border-[var(--mario-skin)] px-3 py-1.5 tracking-wider inline-block mb-6">
          ERROR 404 // LEVEL NOT FOUND
        </span>
        <h1 className="font-pixel text-[var(--coin)] text-[20px] mb-4">WARP PIPE BROKEN</h1>
        <p className="font-terminal text-[var(--text-dim)] text-[16px] mb-8 leading-relaxed">
          This mission file doesn&apos;t exist. Return to base and try another route.
        </p>
        <Link
          href="/"
          className="font-pixel text-[7px] text-black bg-[var(--coin)] px-6 py-3 inline-block shadow-[0_4px_0_#B88A00] hover:brightness-110 transition-all"
        >
          ← RETURN TO BASE
        </Link>
      </div>
    </div>
  );
}
