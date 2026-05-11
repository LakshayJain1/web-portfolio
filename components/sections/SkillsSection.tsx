'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../GameContext';
import WorldTerrain from '../WorldTerrain';

interface PowerUpSkill {
  icon: string;
  name: string;
  desc: string;
  tags: string[];
  mastery: number;
  rarity: 'common' | 'rare' | 'legendary';
}

interface PowerUpTier {
  level: number;
  label: string;
  sublabel: string;
  color: string;
  glowColor: string;
  borderStyle: string;
  unlockedBy: string;
  skills: PowerUpSkill[];
}

const RARITY_COLORS: Record<string, string> = {
  common: 'var(--text-dim)',
  rare: 'var(--accent-cyan)',
  legendary: 'var(--accent-coin)',
};

const RARITY_LABELS: Record<string, string> = {
  common: '◆ EQUIPPED',
  rare: '◇ RARE',
  legendary: '★ LEGENDARY',
};

const POWER_UP_DATA: PowerUpTier[] = [
  {
    level: 1,
    label: 'CORE ENGINE',
    sublabel: 'STARTING ABILITY',
    color: 'var(--accent-coin)',
    glowColor: 'rgba(255, 215, 0, 0.2)',
    borderStyle: '2px solid rgba(255,215,0,0.5)',
    unlockedBy: '🎮 BASE LOADOUT',
    skills: [
      {
        icon: '⚙',
        name: 'WEB DEVELOPMENT',
        desc: 'Building dynamic, responsive web applications with modern frameworks and clean architecture.',
        tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS'],
        mastery: 5,
        rarity: 'legendary',
      },
    ],
  },
  {
    level: 2,
    label: 'AI ENHANCEMENTS',
    sublabel: 'UNLOCKED ABILITIES',
    color: 'var(--accent-cyan)',
    glowColor: 'rgba(85, 204, 255, 0.18)',
    borderStyle: '2px solid rgba(85,204,255,0.4)',
    unlockedBy: '🍄 SUPER MUSHROOM',
    skills: [
      {
        icon: '◈',
        name: 'AGENTIC AI',
        desc: 'Designing autonomous AI agents capable of complex multi-step reasoning and task execution.',
        tags: ['LangChain', 'AutoGPT', 'AI Agents', 'RAG', 'OpenAI'],
        mastery: 4,
        rarity: 'rare',
      },
      {
        icon: '◇',
        name: 'AI AUTOMATIONS',
        desc: 'Building intelligent workflow automations that leverage LLMs for real-world business impact.',
        tags: ['Claude API', 'Zapier', 'n8n', 'Make.com', 'Webhooks'],
        mastery: 3,
        rarity: 'rare',
      },
    ],
  },
  {
    level: 3,
    label: 'CREATIVE SUITE',
    sublabel: 'FINAL FORM ABILITIES',
    color: 'var(--mario-red)',
    glowColor: 'rgba(229, 32, 32, 0.18)',
    borderStyle: '2px solid rgba(229,32,32,0.4)',
    unlockedBy: '🌸 FIRE FLOWER',
    skills: [
      {
        icon: '◆',
        name: 'UI/UX DESIGN',
        desc: 'Crafting beautiful, user-centred interfaces from wireframe to high-fidelity prototype.',
        tags: ['Figma', 'Framer', 'Prototyping', 'UX Research'],
        mastery: 5,
        rarity: 'legendary',
      },
      {
        icon: '✦',
        name: 'VISUAL DESIGN',
        desc: 'Creating stunning visual compositions with meticulous attention to detail and colour theory.',
        tags: ['Photoshop', 'Illustrator', 'Color Theory', 'Typography'],
        mastery: 4,
        rarity: 'rare',
      },
      {
        icon: '★',
        name: 'BRAND DESIGN',
        desc: 'Developing cohesive brand identities — logos, palettes, type systems, and style guides.',
        tags: ['Brand ID', 'Style Guides', 'Logo Design', 'Identity'],
        mastery: 4,
        rarity: 'rare',
      },
      {
        icon: '◈',
        name: '3D ART',
        desc: 'Creating detailed 3D models and immersive scenes with advanced lighting and rendering.',
        tags: ['Blender', 'Maya', '3D Modeling', 'Texturing'],
        mastery: 3,
        rarity: 'common',
      },
      {
        icon: '◆',
        name: 'BLENDER',
        desc: 'Professional 3D modelling, sculpting, texturing, and rendering in Blender.',
        tags: ['Sculpting', 'UV Unwrap', 'Shaders', 'EEVEE', 'Cycles'],
        mastery: 3,
        rarity: 'common',
      },
      {
        icon: '◇',
        name: 'MAYA',
        desc: 'Advanced 3D animation and character modelling using industry-standard Maya pipelines.',
        tags: ['Animation', 'Rigging', 'Poly Modelling', 'Dynamics'],
        mastery: 2,
        rarity: 'common',
      },
      {
        icon: '▸',
        name: 'CREATIVE SYSTEMS',
        desc: 'Building generative creative tools, interactive art systems, and visual experiments.',
        tags: ['Generative Art', 'Creative Code', 'Interactive', 'Canvas API'],
        mastery: 3,
        rarity: 'rare',
      },
    ],
  },
];

const tierVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

function MasteryBar({ mastery, color }: { mastery: number; color: string }) {
  return (
    <div className="flex gap-1.5 mt-auto pt-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-2 flex-1 border transition-all duration-300 mastery-bar-active"
          style={{
            background: i < mastery ? color : 'transparent',
            borderColor: i < mastery ? color : 'var(--border-dim)',
            boxShadow: i < mastery ? `0 0 6px ${color}50` : 'none',
          }}
        />
      ))}
    </div>
  );
}

function SkillCard({ skill, tierColor, animDelay = 0 }: { skill: PowerUpSkill; tierColor: string; animDelay?: number }) {
  const [hovered, setHovered] = useState(false);
  const { addScore } = useGame();
  const rarityColor = RARITY_COLORS[skill.rarity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: animDelay, ease: [0.16, 1, 0.3, 1] }}
      className="group card cursor-pointer flex flex-col"
      style={{
        '--card-hover-color': tierColor,
        '--card-hover-shadow': `0 0 20px ${tierColor}20`,
        minHeight: '200px',
      } as React.CSSProperties}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => addScore(200)}
      whileTap={{ scale: 0.97 }}
    >
      {/* Card header */}
      <div className="card-header flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="text-[20px] transition-transform duration-300"
            style={{
              color: tierColor,
              filter: hovered ? `drop-shadow(0 0 8px ${tierColor})` : 'none',
              transform: hovered ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            {skill.icon}
          </span>
          <span className="font-pixel text-[7px] text-[var(--text-primary)] tracking-wide leading-relaxed">
            {skill.name}
          </span>
        </div>
        {/* Rarity badge */}
        <span
          className="font-pixel text-[5px] tracking-wider shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
          style={{ color: rarityColor }}
        >
          {RARITY_LABELS[skill.rarity]}
        </span>
      </div>

      {/* Card body */}
      <div className="card-body flex flex-col flex-1">
        <p className="font-terminal text-[15px] text-[var(--text-dim)] leading-relaxed mb-3 group-hover:text-[var(--text-body)] transition-colors">
          {skill.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="font-pixel text-[5px] text-[var(--text-cyan)] border border-[rgba(85,204,255,0.18)] px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <MasteryBar mastery={skill.mastery} color={tierColor} />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { unlockedSkillsTiers } = useGame();

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0C0C18 0%, #0F0F22 50%, #0C0C18 100%)' }}
    >
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <WorldTerrain worldId="skills" />
      </div>
      
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 section-container">
        {/* Header — whileInView once is fine here */}
        <motion.div
          variants={tierVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-20"
        >
          <span className="font-pixel text-[7px] text-[var(--accent-coin)] border border-[var(--accent-coin)] px-3 py-1.5 tracking-wider inline-block mb-6">
            WORLD 1-3 // POWER-UP TREE
          </span>
          <h2 className="font-pixel text-[var(--text-primary)] text-[clamp(14px,2.5vw,22px)] tracking-wider uppercase mb-4">
            Ability Evolution Path
          </h2>
          <p className="font-terminal text-[var(--text-dim)] text-[17px] max-w-[560px] mx-auto leading-relaxed">
            Hit [?] blocks in this world to discover and unlock hidden disciplines.
          </p>
        </motion.div>

        {/* Tiered progression — each tier animates in when unlocked (not gated by parent whileInView once) */}
        <div className="space-y-16 md:space-y-20">
          {POWER_UP_DATA.filter(tier => tier.level <= unlockedSkillsTiers).map((tier, tierIdx) => (
            <motion.div
              key={tier.level}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: tierIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={tierIdx > 0 ? 'tier-connector' : ''}
            >

              {/* Tier header — power-up unlock badge */}
              <div className="flex flex-col items-center gap-3 mb-8 text-center">
                {/* Evolution arrow from previous tier */}
                {tierIdx > 0 && (
                  <div
                    className="font-pixel text-[18px] mb-1"
                    style={{ color: tier.color, filter: `drop-shadow(0 0 8px ${tier.color})` }}
                  >
                    ▼
                  </div>
                )}

                <div
                  className="inline-flex items-center gap-4 px-6 py-3 border"
                  style={{
                    borderColor: tier.color,
                    background: `${tier.glowColor}`,
                    boxShadow: `0 0 20px ${tier.glowColor}, inset 0 0 20px ${tier.glowColor}`,
                  }}
                >
                  {/* Power-up item icon */}
                  <span className="font-terminal text-[22px]">{tier.unlockedBy}</span>
                  <div>
                    <div
                      className="font-pixel text-[9px] tracking-widest"
                      style={{ color: tier.color }}
                    >
                      LV.{tier.level} UNLOCKED — {tier.label}
                    </div>
                    <div className="font-pixel text-[6px] text-[var(--text-dim)] tracking-wider mt-1">
                      {tier.sublabel}
                    </div>
                  </div>
                </div>

                {/* Divider line */}
                <div
                  className="w-full max-w-[600px] h-px mt-2"
                  style={{ background: `linear-gradient(90deg, transparent, ${tier.color}50, transparent)` }}
                />
              </div>

              {/* Skills grid */}
              <div
                className={`grid gap-4 md:gap-5 ${
                  tier.level === 1
                    ? 'grid-cols-1 max-w-[480px] mx-auto'
                    : tier.level === 2
                    ? 'grid-cols-1 md:grid-cols-2 max-w-[900px] mx-auto'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {tier.skills.map((skill, si) => (
                  <SkillCard key={skill.name} skill={skill} tierColor={tier.color} animDelay={si * 0.05} />
                ))}
              </div>
            </motion.div>
          ))}
          
          {/* Locked tiers preview */}
          {POWER_UP_DATA.length > unlockedSkillsTiers && (
             <motion.div
               initial={{ opacity: 0, y: 16 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.45 }}
               className="opacity-40 grayscale flex flex-col items-center py-10 border-2 border-dashed border-[var(--border-dim)] bg-[rgba(255,255,255,0.02)]"
             >
                <span className="font-terminal text-[32px] mb-4">🔒</span>
                <span className="font-pixel text-[8px] text-[var(--text-dim)]">TIER {unlockedSkillsTiers + 1} ENCRYPTED</span>
                <span className="font-pixel text-[5px] text-[var(--text-dim)] mt-2">ACCESS VIA GAMEPLAY TRIGGERS</span>
             </motion.div>
          )}
        </div>

        {/* Footer — evolution complete */}
        {unlockedSkillsTiers >= POWER_UP_DATA.length && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-20 text-center"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--accent-coin)] bg-[rgba(255,215,0,0.04)]"
            >
              <span className="font-terminal text-[22px]">👑</span>
              <div>
                <div className="font-pixel text-[8px] text-[var(--accent-coin)] tracking-wider">FINAL FORM ACHIEVED</div>
                <div className="font-pixel text-[5px] text-[var(--text-dim)] tracking-wider mt-1">ALL ABILITIES UNLOCKED</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
