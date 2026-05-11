'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SERVICES_DATA = [
  { id: '01', name: 'WEBSITE DESIGN & DEV', desc: 'Beautiful, user-friendly websites from concept to launch using Framer and React.', category: 'dev', item: '🍄' },
  { id: '02', name: 'LANDING PAGE DESIGN', desc: 'High-conversion landing pages with strong CTAs and compelling visual storytelling.', category: 'design', item: '✿' },
  { id: '03', name: 'E-COMMERCE DESIGN', desc: 'Seamless shopping experiences with clear product showcases and optimised checkout flows.', category: 'design', item: '◆' },
  { id: '04', name: 'WEBSITE PROTOTYPING', desc: 'Interactive Framer prototypes that let you see and test your product before development.', category: 'dev', item: '?' },
  { id: '05', name: '3D ART & VISUAL', desc: 'Stunning 3D models, product visualisations and immersive environments in Blender.', category: 'creative', item: '★' },
  { id: '06', name: 'BRAND IDENTITY', desc: 'Cohesive brand systems — logos, palettes, type, style guides — across all digital platforms.', category: 'design', item: '◇' },
  { id: '07', name: 'VIDEO EDITING', desc: 'Polished, purposeful videos that blend sound, visuals and effects for lasting impact.', category: 'creative', item: '▸' },
  { id: '08', name: 'AR FILTER DESIGN', desc: 'Immersive Meta AR filters and Spark AR experiences for brands and creators.', category: 'creative', item: '✦' },
];

const categoryColors: Record<string, string> = {
  design: 'var(--accent-cyan)',
  dev: 'var(--accent-coin)',
  creative: 'var(--mario-red)',
};

const categoryRarity: Record<string, string> = {
  design: 'RARE DROP',
  dev: 'COIN ITEM',
  creative: 'STAR POWER',
};

const container = {
  animate: { transition: { staggerChildren: 0.05 } },
};

const child = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative min-h-screen py-20 md:py-28 px-4 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A10 0%, #120818 45%, #0A0A10 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,215,0,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,215,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      <motion.div
        variants={container}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 section-container"
      >
        <motion.div variants={child} className="text-center mb-12 md:mb-14">
          <span className="font-pixel text-[7px] text-[var(--coin)] border-2 border-[var(--coin)] px-3 py-1.5 tracking-wider inline-block mb-4 shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
            ITEM SHOP // POWER-UPS FOR HIRE
          </span>
          <h2 className="font-pixel text-[var(--text-primary)] text-[clamp(14px,2.5vw,22px)] tracking-wider uppercase mb-3">
            Pick Your Upgrade
          </h2>
          <p className="font-terminal text-[var(--text-dim)] text-[15px] max-w-[560px] mx-auto leading-relaxed">
            Each tile is styled like a pickup — same services as before, now framed like inventory you&apos;d collect on the way to the castle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SERVICES_DATA.map((service) => {
            const stripeColor = categoryColors[service.category] || 'var(--border-dim)';
            const rarity = categoryRarity[service.category] || 'COMMON';
            return (
              <motion.div
                key={service.id}
                variants={child}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className="group relative flex flex-col rounded-sm overflow-hidden border-2 border-black bg-[rgba(14,12,22,0.92)] shadow-[4px_4px_0_rgba(0,0,0,0.65)]"
                style={{ boxShadow: `4px 4px 0 rgba(0,0,0,0.65), 0 0 0 1px ${stripeColor}33 inset` }}
              >
                {/* Question-block style top */}
                <div
                  className="h-14 flex items-center justify-between px-3 border-b-2 border-black"
                  style={{
                    background: `linear-gradient(180deg, ${stripeColor}22 0%, rgba(0,0,0,0.2) 100%)`,
                  }}
                >
                  <span className="font-terminal text-[22px] leading-none drop-shadow-[0_2px_0_#000]">{service.item}</span>
                  <span className="font-pixel text-[5px] tracking-widest text-[var(--text-dim)]">{rarity}</span>
                </div>

                <div className="p-4 md:p-5 flex flex-col flex-1 border-l-[3px]" style={{ borderLeftColor: stripeColor }}>
                  <span className="font-pixel text-[var(--coin)] text-[16px] md:text-[18px] block mb-1 drop-shadow-[0_1px_0_#000]">
                    {service.id}
                  </span>
                  <h3 className="font-pixel text-[7px] text-[var(--text-primary)] mb-3 tracking-wide leading-relaxed">
                    {service.name}
                  </h3>
                  <p className="font-terminal text-[14px] text-[var(--text-dim)] leading-relaxed group-hover:text-[var(--text-body)] transition-colors mt-auto">
                    {service.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-pixel text-[5px] px-2 py-1 border border-[var(--border-dim)] text-[var(--text-dim)] tracking-wider">
                      +100 PTS
                    </span>
                    <span className="font-pixel text-[5px] text-[var(--coin)] tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                      EQUIP →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
