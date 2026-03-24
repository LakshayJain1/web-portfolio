'use client';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        borderTop: '3px solid var(--coin)',
        textAlign: 'center',
        padding: '24px',
        fontSize: '7px',
        color: '#666',
      }}
    >
      <p>
        © 2025 <span style={{ color: 'var(--coin)' }}>DEV LAKSHAY</span>
      </p>
    </footer>
  );
}
