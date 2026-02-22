# habib.dev — Landing Page Design

## Purpose

A static landing page at habib.dev that acts as a hub for all projects across platforms (GitHub Pages, YouTube, iOS apps, etc.). The name "habib" means "beloved" in Arabic — the warmth of that meaning lives as a subtle undercurrent in the design, not stated explicitly.

## Tech Stack

- Vite + React + TypeScript + Tailwind CSS
- Static build, deployed to GitHub Pages via GitHub Actions
- Custom domain: habib.dev (CNAME in `public/`)

## Layout

### Hero

- Name displayed large with a warm gradient text treatment (pink → purple → soft orange)
- Short tagline underneath (e.g., "software & things") — understated, no fanfare
- Subtle, slow-moving gradient shimmer animation on the name

### Project Grid

- Responsive card grid: 2-3 columns on desktop, single column on mobile
- Each card displays:
  - Auto-fetched favicon via `https://www.google.com/s2/favicons?domain={domain}&sz=32`
  - Fallback: generic link icon if favicon fails to load
  - Project title
  - One-line description
- Cards fade/slide up on scroll via intersection observer
- Gentle lift + shadow increase on hover

### Footer

- Minimal — row of social icons

## Visual Design

### Color Palette (Dark Theme)

- Background: deep charcoal (`#0a0a0a` or `#111111`)
- Text: soft white (`#e5e5e5`)
- Accent gradients: warm pink → purple → soft orange
- Card surface: slightly lighter (`#1a1a1a`) with subtle border (`#2a2a2a`)

### Typography

- Clean geometric sans-serif (Inter or similar)
- Name: large, bold, gradient
- Body: clean, understated

### Animations

- Gradient shimmer on hero name (subtle, slow)
- Cards fade/slide up on scroll (intersection observer)
- Gentle lift + increased shadow on card hover
- Nothing loud — warmth expressed through softness of motion

### Inspiration

- lovable.dev — warm palette, generous whitespace, gradient accents, polished-but-approachable feel

## Data Model

All project links defined in a single `src/data/projects.ts` file:

```ts
type Project = {
  title: string;
  description: string; // one-liner
  url: string;
  tags?: string[];     // optional categorization
};
```

- Order controlled by array position
- Favicon auto-derived from URL domain
- No filtering UI to start — just a clean grid

## Deployment

- GitHub Actions workflow: on push to `main`, runs `npm run build`, deploys `dist/` to GitHub Pages
- `public/CNAME` contains `habib.dev`
- Vite config: `base: '/'` (custom domain, not subpath)
