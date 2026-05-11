'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import WorldTerrain from '../WorldTerrain';
import { WORLD_DATA } from '../GameConfig';
import { useGame } from '../GameContext';

const projectsContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const projectChild = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

const lockedChild = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ProjectsSection() {
  const config = WORLD_DATA['projects'];
  const { setActivePopup, worldDataEpoch } = useGame();

  const missions = useMemo(() => {
    void worldDataEpoch;
    return (config.blocks ?? []).filter((b) => b.project);
  }, [config.blocks, worldDataEpoch]);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-16 md:py-20 px-4 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A12 0%, #0E0A18 50%, #0A0A12 100%)' }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A12]/90 via-transparent to-[#0A0A12]/50 z-[2]" />
        <WorldTerrain worldId="projects" />
      </div>

      <motion.div
        variants={projectsContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 section-container max-w-[960px] mx-auto"
      >
        <motion.div variants={projectChild} className="text-center mb-10 md:mb-12">
          <span className="font-pixel text-[7px] text-[var(--mario-skin)] border border-[var(--mario-skin)] px-3 py-1.5 tracking-wider inline-block mb-4">
            WORLD 1-4 // MISSION ARCHIVE
          </span>
          <h2 className="font-pixel text-[var(--coin)] text-[clamp(14px,2.5vw,22px)] tracking-wider uppercase">
            Completed Missions
          </h2>
          <p className="font-terminal text-[var(--text-dim)] text-[15px] md:text-[16px] mt-3 max-w-[520px] mx-auto leading-relaxed">
            Jump into each <span className="text-[var(--coin)]">?</span> block in the strip below to decrypt a file. Cards here unlock only after the matching hit — terrain stays playable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {missions.map((b, idx) =>
            b.hit ? (
              <motion.div
                key={b.project!.title}
                variants={projectChild}
                className="group card cursor-pointer overflow-hidden pointer-events-auto"
                onClick={() => setActivePopup(b.project!)}
              >
                <div className="card-tab" />
                <div className="h-24 md:h-28 bg-[rgba(10,10,22,0.85)] flex items-center justify-center border-b border-[var(--border-dim)] relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: `
                      linear-gradient(rgba(255,215,0,0.12) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,215,0,0.12) 1px, transparent 1px)
                    `,
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <span
                    className="font-pixel text-[var(--coin)] text-[11px] md:text-[13px] tracking-wider relative z-[1]"
                    style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.25)' }}
                  >
                    ★ {b.project?.title}
                  </span>
                </div>
                <div className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-pixel text-[6px] text-[var(--mario-skin)] tracking-wider">{b.project?.type}</span>
                    <span className="font-pixel text-[5px] text-[var(--text-dim)] tracking-wider">MISSION {idx + 1}</span>
                  </div>
                  <p className="font-terminal text-[14px] text-[var(--text-dim)] leading-relaxed line-clamp-2 group-hover:text-[var(--text-body)] transition-colors mb-3">
                    {b.project?.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {b.project?.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-pixel text-[5px] text-[var(--text-cyan)] border border-[rgba(85,204,255,0.15)] px-1.5 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="font-pixel text-[6px] text-[var(--coin)] tracking-wider mt-3 opacity-80 group-hover:opacity-100">
                    ▶ OPEN FILE
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`locked-${b.project?.title ?? idx}`}
                variants={lockedChild}
                className="relative border-2 border-dashed border-[var(--border-dim)] bg-[rgba(8,8,14,0.55)] min-h-[160px] flex flex-col items-center justify-center gap-3 pointer-events-none select-none"
              >
                <span className="font-pixel text-[36px] text-[var(--text-dim)] leading-none">?</span>
                <span className="font-pixel text-[6px] text-[var(--text-dim)] tracking-widest text-center px-4">
                  ENCRYPTED — HIT ? IN WORLD @ X≈{b.x}
                </span>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
