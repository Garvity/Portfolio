# Garv — 3D Immersive Portfolio

A scroll-driven, 3D immersive single-page portfolio built with **React Three Fiber**, **GSAP ScrollTrigger**, **Framer Motion**, and **Tailwind CSS**.

The camera travels along a 3D path through six scenes — a neural-mesh hero, an orbiting globe, an instanced skill grid, a project "gate corridor" the camera dollies through, a timeline helix, and a floating terminal — all choreographed by scroll position.

## Architecture

```
src/
├── data/
│   └── content.json          ← SINGLE SOURCE OF TRUTH for all text/links.
│                               Edit this file to change any content — no
│                               component code changes needed.
├── lib/
│   └── scrollState.js        ← Shared mutable scroll state. GSAP writes it,
│                               the R3F canvas reads it every frame (zero
│                               React re-renders on scroll).
├── hooks/
│   ├── useIsMobile.js        ← Mobile fallback (lower DPR, fewer particles)
│   └── useTypewriter.js      ← Hero role typewriter
├── components/
│   ├── three/                ← All R3F scenes (lazy-loaded via React.lazy)
│   │   ├── MainCanvas.jsx    ← Canvas, lights, fog, scene registry
│   │   ├── CameraRig.jsx     ← Catmull-Rom camera path driven by scroll
│   │   ├── ParticleField.jsx ← One instanced Points cloud along the path
│   │   ├── NeuralMesh.jsx    ← Hero: node/edge network + wireframe core
│   │   ├── AboutGlobe.jsx    ← About: scroll-spinning globe + Float shapes
│   │   ├── SkillOrbs.jsx     ← Skills: instanced breathing orb grid
│   │   ├── ProjectsScene.jsx ← Projects: torus gates, camera dolly corridor
│   │   ├── JourneyScene.jsx  ← Timeline helix + energizing beam
│   │   └── ContactScene.jsx  ← Wireframe terminal + orbiting mail glyph
│   └── ui/                   ← Loading screen, navbar, headings, footer
└── sections/                 ← DOM layer (glassmorphism cards over canvas)
```

### How the scroll ↔ 3D binding works

- Each section's arrival at the viewport top is a **scrubbed GSAP ScrollTrigger** writing `0→1` progress into `scrollState.transitions[i]`.
- The sum of those transitions is a float "which section are we at" that parameterizes a **Catmull-Rom curve** the camera follows (`CameraRig.jsx`).
- The tall projects section additionally writes `projectsProgress`, which dollies the camera through the project gates.
- Mouse position feeds a parallax offset on top of the path.

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
```

> **Note:** `npm install` requires registry access. On the machine this was
> authored on, `registry.npmjs.org` was blocked by a network proxy allowlist,
> so dependencies could not be installed or the build verified there. Run the
> install on a machine with normal npm access — no other steps are needed.

### Contact form (optional)

The form works out of the box by opening the visitor's mail client. For
in-page delivery, create a free [EmailJS](https://www.emailjs.com) account and
copy `.env.example` → `.env` with your keys.

## Deploy to Vercel

```bash
npm i -g vercel && vercel        # or connect the repo in the Vercel dashboard
```

`vercel.json` is preconfigured (Vite framework, `dist` output, SPA rewrite).
Add the three `VITE_EMAILJS_*` env vars in the Vercel dashboard if you use
EmailJS.

## Performance notes

- 3D canvas is `React.lazy`-loaded behind `Suspense`; the loading screen is pure CSS.
- Particles and skill orbs are **instanced** (2 draw calls total).
- Mobile: DPR capped at 1.25, ~400 particles instead of 1400, antialias off, low-poly gate rings.
- `fog` + tight camera `far` plane keep overdraw down; geometry is all primitives (no model downloads).
- `powerPreference: 'high-performance'`, damped camera easing (`power2`-style), `useFrame` only in components that animate.

## Content editing

Everything — name, bio, skills, projects, experience, education, socials — lives in `src/data/content.json`. Two projects (**Autonomous GitHub Issue Resolver**, **LLM Evaluation CI/CD Pipeline**) are flagged `"placeholder": true` and render an "IN DEVELOPMENT" badge; replace their `description/github/demo` fields when they ship, and delete the flag.

Resume: replace `public/resume.pdf`.
