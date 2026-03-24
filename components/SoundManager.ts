'use client';

// Retro 8-bit sound engine using Web Audio API
// All sounds are procedurally generated — no external audio files needed

let audioCtx: AudioContext | null = null;
let _isMuted = false;

// Lazy-init AudioContext (must be triggered by user interaction)
function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Load mute state from localStorage
if (typeof window !== 'undefined') {
  _isMuted = localStorage.getItem('mario-muted') === 'true';
}

export function isMuted(): boolean {
  return _isMuted;
}

export function toggleMute(): boolean {
  _isMuted = !_isMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('mario-muted', String(_isMuted));
  }
  return _isMuted;
}

// ─── Helper: play a tone with envelope ───────────────────────────
function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'square',
  volume: number = 0.15,
  startTime?: number
) {
  if (_isMuted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const t = startTime ?? ctx.currentTime;
  osc.start(t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.stop(t + duration + 0.01);
}

// ─── Jump: short upward blip ─────────────────────────────────────
export function playJump() {
  if (_isMuted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.13);
}

// ─── Coin: classic two-tone ding ─────────────────────────────────
export function playCoin() {
  if (_isMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;

  // First tone
  playTone(988, 0.08, 'square', 0.12, t);       // B5
  // Second tone (higher, sustained)
  playTone(1319, 0.15, 'square', 0.10, t + 0.06); // E6
}

// ─── Pipe Enter: descending sweep ────────────────────────────────
export function playPipeEnter() {
  if (_isMuted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.36);
}

// ─── Power-Up: rising arpeggio ───────────────────────────────────
export function playPowerUp() {
  if (_isMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
  notes.forEach((freq, i) => {
    playTone(freq, 0.12, 'square', 0.10, t + i * 0.08);
  });
}

// ─── Block Bump: dull thud ───────────────────────────────────────
export function playBlockBump() {
  if (_isMuted) return;
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.13);
}

// ─── UI Confirm: soft 8-bit confirm ─────────────────────────────
export function playUIConfirm() {
  if (_isMuted) return;
  const ctx = getCtx();
  const t = ctx.currentTime;
  playTone(660, 0.06, 'square', 0.08, t);
  playTone(880, 0.10, 'square', 0.08, t + 0.05);
}
