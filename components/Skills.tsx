'use client';

import { useGame } from './GameContext';

interface Skill {
  icon: string;
  name: string;
  description: string;
  tags: string[];
  level: number;
}

const skills: Skill[] = [
  {
    icon: '🎨',
    name: 'UI/UX DESIGN',
    description: 'Crafting beautiful, user-centred interfaces with Figma & Framer from wireframe to hi-fi prototype.',
    tags: ['Figma', 'Framer', 'Prototyping', 'UX Research'],
    level: 5,
  },
  {
    icon: '💻',
    name: 'WEB DEV',
    description: 'Building dynamic, responsive websites with semantic HTML, modern CSS and React component architecture.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    level: 4,
  },
  {
    icon: '🧊',
    name: '3D ART',
    description: 'Creating intricate, lifelike 3D models and immersive scenes with Blender for projects and exports.',
    tags: ['Blender', '3D Modeling', 'Rendering'],
    level: 3,
  },
  {
    icon: '✦',
    name: 'BRANDING',
    description: 'Developing cohesive brand identities — logos, palettes, type systems — using Adobe Creative Cloud.',
    tags: ['Illustrator', 'Photoshop', 'Brand ID'],
    level: 4,
  },
  {
    icon: '🥽',
    name: 'AR / XR',
    description: 'Designing immersive augmented reality experiences and interactive filters using Spark AR Studio.',
    tags: ['Spark AR', 'Meta Filters', 'AR Design'],
    level: 3,
  },
  {
    icon: '🎬',
    name: 'VIDEO EDITING',
    description: 'Producing polished, narrative-driven videos with After Effects, Premiere and motion graphics.',
    tags: ['After Effects', 'Premiere', 'Motion'],
    level: 3,
  },
];

export default function Skills() {
  const { collectSkill } = useGame();

  return (
    <section
      id="skills"
      style={{
        background: '#5C94FC',
        minHeight: '80vh',
        padding: '80px 40px 60px',
        borderTop: '8px solid #000',
      }}
    >
      <div className="world-header">
        <div className="world-badge">WORLD 1-3</div>
        <h2 className="world-title">POWER-UPS COLLECTED</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            onClick={() => collectSkill(skill.name, 200)}
            style={{
              background: '#000',
              border: '3px solid #FFF',
              padding: 0,
              cursor: 'pointer',
              transition: 'transform 0.1s',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              style={{
                background: 'var(--question)',
                borderBottom: '3px solid #000',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '18px' }}>{skill.icon}</span>
              <span style={{ fontSize: '9px', color: '#4A2800' }}>{skill.name}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: '7px', color: '#AAA', lineHeight: '2', marginBottom: '8px' }}>
                {skill.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: '#111',
                      border: '1px solid #444',
                      color: '#7CF',
                      fontSize: '6px',
                      padding: '4px 8px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '10px',
                      height: '10px',
                      background: i < skill.level ? 'var(--coin)' : '#222',
                      border: `1px solid ${i < skill.level ? 'var(--coin)' : '#444'}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
