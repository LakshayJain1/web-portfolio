'use client';

const services = [
  {
    num: '01',
    name: 'WEBSITE DESIGN & DEV',
    desc: 'Beautiful, user-friendly websites from concept to launch using Framer and React.',
  },
  {
    num: '02',
    name: 'LANDING PAGE DESIGN',
    desc: 'High-conversion landing pages with strong CTAs and compelling visual storytelling.',
  },
  {
    num: '03',
    name: 'E-COMMERCE DESIGN',
    desc: 'Seamless shopping experiences with clear product showcases and optimised checkout flows.',
  },
  {
    num: '04',
    name: 'WEBSITE PROTOTYPING',
    desc: 'Interactive Framer prototypes that let you see and test your product before development.',
  },
  {
    num: '05',
    name: '3D ART & VISUAL',
    desc: 'Stunning 3D models, product visualisations and immersive environments in Blender.',
  },
  {
    num: '06',
    name: 'BRAND IDENTITY',
    desc: 'Cohesive brand systems — logos, palettes, type, style guides — across all digital platforms.',
  },
  {
    num: '07',
    name: 'VIDEO EDITING',
    desc: 'Polished, purposeful videos that blend sound, visuals and effects for lasting impact.',
  },
  {
    num: '08',
    name: 'AR FILTER DESIGN',
    desc: 'Immersive Meta AR filters and Spark AR experiences for brands and creators.',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: '#1a4a00',
        minHeight: '70vh',
        padding: '80px 40px 60px',
        borderTop: '8px solid #000',
      }}
    >
      <div className="world-header">
        <div className="world-badge">WORLD 2-1</div>
        <h2 className="world-title">AVAILABLE QUESTS</h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {services.map((service) => (
          <div
            key={service.num}
            style={{
              background: '#000',
              border: '3px solid #0A0',
              padding: '20px',
              transition: 'border-color 0.2s, transform 0.1s',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--coin)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#0A0';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span
              style={{
                color: 'var(--coin)',
                fontSize: '20px',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              {service.num}
            </span>
            <div
              style={{
                fontSize: '9px',
                color: '#FFF',
                marginBottom: '8px',
              }}
            >
              {service.name}
            </div>
            <div
              style={{
                fontSize: '7px',
                color: '#888',
                lineHeight: '2',
              }}
            >
              {service.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
