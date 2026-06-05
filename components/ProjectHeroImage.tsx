import React from "react";

interface ProjectHeroImageProps {
  title: string;
  type: string;
  accentColor: string;
}

export default function ProjectHeroImage({ title, type, accentColor }: ProjectHeroImageProps) {
  return (
    <div
      className="relative aspect-[4/3] w-full border-4 border-[var(--coin)] overflow-hidden shadow-[8px_8px_0_#000]"
      style={{ background: `linear-gradient(135deg, ${accentColor}22 0%, #0A0A0F 55%, #0A0A0F 100%)` }}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-1.5"
        style={{ backgroundColor: accentColor }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className="font-pixel text-[6px] text-[var(--mario-skin)] tracking-widest mb-4">
          {type}
        </span>
        <span
          className="font-pixel text-[clamp(14px,3vw,22px)] text-[var(--coin)] tracking-wider"
          style={{ textShadow: `0 0 24px ${accentColor}66` }}
        >
          ★ {title}
        </span>
      </div>
      <div
        className="absolute bottom-4 right-4 w-6 h-6 opacity-60"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}
