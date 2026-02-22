# habib.dev Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a dark-themed, animated static landing page at habib.dev that acts as a hub linking to projects across platforms.

**Architecture:** Single-page React app with a hero section and a responsive card grid. All project data lives in a TypeScript config file. Favicons auto-fetched from Google's favicon service. CSS-driven animations for scroll reveal and hover effects. Static build deployed to GitHub Pages.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS v4, Google Fonts (Inter)

---

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/index.css`
- Create: `public/CNAME`
- Create: `.gitignore`

**Step 1: Scaffold with Vite**

Run:
```bash
npm create vite@latest . -- --template react-ts
```

If prompted about non-empty directory, confirm.

**Step 2: Install Tailwind CSS v4**

Run:
```bash
npm install && npm install -D @tailwindcss/vite tailwindcss
```

**Step 3: Configure Tailwind with Vite**

Update `vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
});
```

Replace contents of `src/index.css` with:
```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", sans-serif;
  --color-surface: #1a1a1a;
  --color-border: #2a2a2a;
  --color-accent-pink: #f472b6;
  --color-accent-purple: #a78bfa;
  --color-accent-orange: #fb923c;
}
```

**Step 4: Add Inter font to `index.html`**

Add inside `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

**Step 5: Set up CNAME and base HTML styling**

Create `public/CNAME`:
```
habib.dev
```

Update the `<body>` class in `index.html`:
```html
<body class="bg-[#0a0a0a] text-[#e5e5e5] font-sans antialiased">
```

**Step 6: Minimal App.tsx**

Replace `src/App.tsx`:
```tsx
function App() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">habib.dev</h1>
    </main>
  );
}

export default App;
```

**Step 7: Clean up scaffolded files**

Remove: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`

Update `src/main.tsx` to remove any `App.css` import if present.

**Step 8: Verify dev server**

Run:
```bash
npm run dev
```

Expected: Dev server starts, page shows "habib.dev" centered on a dark background.

**Step 9: Verify build**

Run:
```bash
npm run build
```

Expected: Clean build with no errors. `dist/` folder contains `index.html` and `CNAME`.

**Step 10: Commit**

```bash
git add -A && git commit -m "feat: scaffold Vite + React + TypeScript + Tailwind project"
```

---

### Task 2: Project data model and sample data

**Files:**
- Create: `src/data/projects.ts`

**Step 1: Create the data file**

Create `src/data/projects.ts`:
```ts
export type Project = {
  title: string;
  description: string;
  url: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    title: "Example Project",
    description: "A short description of what this does",
    url: "https://github.com/ihabib/example",
    tags: ["open source"],
  },
  {
    title: "Another Project",
    description: "Another one-liner about the project",
    url: "https://youtube.com/@habib",
    tags: ["video"],
  },
  {
    title: "iOS App",
    description: "A cool app on the App Store",
    url: "https://apps.apple.com/app/example",
    tags: ["mobile"],
  },
];
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/data/projects.ts && git commit -m "feat: add project data model and sample data"
```

---

### Task 3: Hero component

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Step 1: Add gradient shimmer keyframes to `src/index.css`**

Append to `src/index.css`:
```css
@keyframes gradient-shimmer {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

**Step 2: Create the Hero component**

Create `src/components/Hero.tsx`:
```tsx
export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center pt-32 pb-20 px-6">
      <h1
        className="text-6xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-accent-pink via-accent-purple to-accent-orange bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient-shimmer_6s_ease_infinite]"
      >
        habib.dev
      </h1>
      <p className="mt-4 text-lg text-[#a0a0a0]">software & things</p>
    </section>
  );
}
```

**Step 3: Wire into App.tsx**

Replace `src/App.tsx`:
```tsx
import { Hero } from "./components/Hero";

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
    </main>
  );
}

export default App;
```

**Step 4: Verify visually**

Run: `npm run dev`

Expected: Large gradient "habib.dev" centered near top of page with subtle shimmer animation. "software & things" in muted gray below.

**Step 5: Commit**

```bash
git add src/components/Hero.tsx src/App.tsx src/index.css && git commit -m "feat: add Hero component with gradient shimmer"
```

---

### Task 4: ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.tsx`

**Step 1: Create the ProjectCard component**

Create `src/components/ProjectCard.tsx`:
```tsx
import type { Project } from "../data/projects";

function getFaviconUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return "";
  }
}

export function ProjectCard({ title, description, url, tags }: Project) {
  const faviconUrl = getFaviconUrl(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl bg-surface border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-purple/5 hover:border-accent-purple/30"
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={faviconUrl}
          alt=""
          width={20}
          height={20}
          className="rounded-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <p className="text-sm text-[#a0a0a0] leading-relaxed">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[#808080]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx && git commit -m "feat: add ProjectCard component with auto-favicon"
```

---

### Task 5: ProjectGrid with scroll animation

**Files:**
- Create: `src/components/ProjectGrid.tsx`
- Create: `src/hooks/useScrollReveal.ts`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Step 1: Add scroll reveal CSS to `src/index.css`**

Append to `src/index.css`:
```css
.scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Step 2: Create the scroll reveal hook**

Create `src/hooks/useScrollReveal.ts`:
```ts
import { useEffect, useRef } from "react";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = el.querySelectorAll(".scroll-reveal");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}
```

**Step 3: Create the ProjectGrid component**

Create `src/components/ProjectGrid.tsx`:
```tsx
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function ProjectGrid() {
  const ref = useScrollReveal();

  return (
    <section ref={ref} className="max-w-4xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <div
            key={project.url}
            className="scroll-reveal"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 4: Wire into App.tsx**

Update `src/App.tsx`:
```tsx
import { Hero } from "./components/Hero";
import { ProjectGrid } from "./components/ProjectGrid";

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectGrid />
    </main>
  );
}

export default App;
```

**Step 5: Verify visually**

Run: `npm run dev`

Expected: Hero at top, card grid below. Cards stagger-animate in on scroll. Hovering a card lifts it with a subtle purple shadow glow.

**Step 6: Commit**

```bash
git add src/components/ProjectGrid.tsx src/hooks/useScrollReveal.ts src/App.tsx src/index.css && git commit -m "feat: add ProjectGrid with scroll-reveal animations"
```

---

### Task 6: Footer component

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Step 1: Create the Footer component**

Create `src/components/Footer.tsx`:
```tsx
const socialLinks = [
  { label: "GitHub", url: "https://github.com/ihabib", icon: "github" },
];

function SocialIcon({ type }: { type: string }) {
  // Simple SVG icons inline — no icon library dependency
  switch (type) {
    case "github":
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer() {
  return (
    <footer className="flex justify-center gap-6 py-12">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="text-[#606060] hover:text-white transition-colors duration-300"
        >
          <SocialIcon type={link.icon} />
        </a>
      ))}
    </footer>
  );
}
```

**Step 2: Wire into App.tsx**

Update `src/App.tsx`:
```tsx
import { Hero } from "./components/Hero";
import { ProjectGrid } from "./components/ProjectGrid";
import { Footer } from "./components/Footer";

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectGrid />
      <Footer />
    </main>
  );
}

export default App;
```

**Step 3: Verify visually**

Run: `npm run dev`

Expected: Footer with GitHub icon at bottom of page, subtle gray that brightens on hover.

**Step 4: Commit**

```bash
git add src/components/Footer.tsx src/App.tsx && git commit -m "feat: add Footer with social links"
```

---

### Task 7: GitHub Actions deployment

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create the workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Verify build still works**

Run:
```bash
npm run build
```

Expected: Clean build, `dist/` contains `index.html` and `CNAME`.

**Step 3: Commit**

```bash
git add .github/workflows/deploy.yml && git commit -m "feat: add GitHub Actions workflow for Pages deployment"
```

---

### Task 8: Final polish and visual review

**Step 1: Run production build and preview**

Run:
```bash
npm run build && npm run preview
```

**Step 2: Visual check with Playwright**

Use Playwright to screenshot the page and verify:
- Dark background renders correctly
- Gradient text on "habib.dev" is visible with shimmer
- Cards display with favicons (or graceful fallback)
- Hover states work on cards
- Responsive layout works at mobile widths
- Footer is present

**Step 3: Fix any visual issues found**

Address anything that looks off.

**Step 4: Final commit**

```bash
git add -A && git commit -m "feat: final polish and visual adjustments"
```
