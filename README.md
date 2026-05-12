# 🍄 Mario Portfolio Next

A modern, gamified portfolio experience built with **Next.js 15**, inspired by the classic retro platformer aesthetics. This isn't just a website; it's a world where you navigate through my professional journey as a player.

![Mario Portfolio Preview](https://img.shields.io/badge/Status-Interactive-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-blue)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC)

## 🎮 The Experience

The portfolio is designed as a continuous horizontal/vertical world where a retro-styled **Player (Mario)** character follows your navigation. As you move between sections, the "Active World" shifts, changing the atmosphere, background music, and interactive elements.

### Key Features
- **Interactive Player**: A fully functional platformer character that reacts to navigation and section changes.
- **Dynamic World States**: Using `GameContext`, the site tracks which "World" (Section) you are in to trigger specific music and visual effects.
- **CRT Atmosphere**: A custom CSS-driven CRT phosphor effect for that authentic retro feel.
- **Gamified Sections**:
  - **Hero**: The starting point of the adventure.
  - **About**: Meet the developer in a pixel-perfect avatar setting.
  - **Skills**: Interactive skill blocks inspired by mystery boxes.
  - **Projects**: Explore work through a themed gallery.
  - **Services**: Professional offerings presented as quest options.
  - **Contact**: Reach out at the end of the level.
- **Sound System**: Managed audio triggers for jump sounds, coin pickups, and world-specific background music.
- **Mobile Responsive**: Custom mobile controls and `DeviceGuard` to ensure the experience works on all screens.

## 🛠️ Technology Stack

- **Core**: [Next.js 15](https://nextjs.org/) (App Router)
- **Logic**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid, game-like transitions.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom design tokens for retro aesthetics.
- **State Management**: React Context API (`GameContext`) for global game state (coins, world, player status).

## 📂 Project Structure

```text
mario-portfolio-next/
├── app/                  # Next.js App Router (Pages & Layout)
├── components/           # UI & Game Components
│   ├── sections/         # Individual Portfolio Sections (Hero, About, etc.)
│   ├── Player.tsx        # The main character controller
│   ├── GameContext.tsx   # Global state for coins, worlds, and unlocks
│   ├── SoundManager.ts   # Audio engine for SFX and Music
│   └── WorldTerrain.tsx  # Dynamic background/environment rendering
├── hooks/                # Custom React hooks
├── public/               # Assets (Sprites, Audio, Images)
└── GameConfig.ts         # Central configuration for physics and world data
```

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start the adventure!

## 🕹️ Game Mechanics

- **Physics**: Implemented in `Player.tsx` using Framer Motion and custom gravity logic.
- **Section Detection**: Uses `IntersectionObserver` in `page.tsx` to detect which section the player is currently exploring.
- **Audio Triggers**: Integrated with `SoundManager.ts` to provide immersive feedback for every action.

---

*Made with ❤️ and a lot of 🍄*

