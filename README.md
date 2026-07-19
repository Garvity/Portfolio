<div align="center">

# ⚡ Garv — 3D Immersive Portfolio

**Software Developer · Full Stack Developer · AI Engineer**

A scroll-driven, 3D immersive portfolio where the camera travels through a neon world —
built to show, not just tell.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&labelColor=0a0d1f)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js&logoColor=white&labelColor=0a0d1f)](https://docs.pmnd.rs/react-three-fiber)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?logo=greensock&logoColor=white&labelColor=0a0d1f)](https://gsap.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white&labelColor=0a0d1f)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white&labelColor=0a0d1f)](https://vitejs.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white&labelColor=0a0d1f)](https://vercel.com)

🔗 **[Live Demo](#)** · 📄 **[Resume](public/resume.pdf)** · 💼 **[LinkedIn](https://linkedin.com/in/garvrc)** · 🐙 **[GitHub](https://github.com/garvity)**

</div>

---

## 🎥 The Experience

This isn't a page you scroll — it's a world you travel through. A single camera flies along a
3D path across six scenes, choreographed frame-by-frame by your scroll position:

| Scene | What happens |
|---|---|
| 🧠 **Hero** | A mouse-reactive neural-network mesh with glitch typography and typewriter roles |
| 🌐 **About** | A wireframe globe that spins as you scroll, orbited by floating tech shapes |
| ⬡ **Skills** | 21 skills in an interactive hex grid over a field of breathing 3D orbs |
| 🚀 **Projects** | The camera dollies through glowing gate rings — one per project, 11 in total |
| 🛤️ **Journey** | A timeline whose spine draws itself in as a 3D helix energizes alongside |
| 📡 **Contact** | A floating wireframe terminal with an orbiting mail glyph and working contact form |

Everything runs on a dark neon aesthetic — electric blue & purple, glassmorphism cards,
smooth `power2/power3` easing, zero scroll-jank.

## 👋 About Me

Final-year **B.Tech CSE student** passionate about **AI/ML and Full Stack Development** —
building intelligent applications end-to-end, from multi-model LLM cascades and RAG
pipelines to production MERN apps.

- 🔭 Currently: **Java Full Stack Intern @ Infosys Springboard 6.0**
- 🏆 5th place — **IEEE Summer of Code** open-source hackathon
- 🌱 Deep-diving into **LLM engineering, LangChain/LangGraph, and agentic AI**
- 💬 Reach me: **garvity375@gmail.com**

## 🛠️ Engineering Highlights

Things under the hood I'm proud of:

- **Zero React re-renders on scroll.** GSAP ScrollTrigger writes progress into a shared
  mutable module; the R3F render loop reads it every frame. The DOM and canvas never
  fight over state.
- **A real 3D camera path.** Section positions thread a Catmull-Rom curve; scroll progress
  parameterizes it, mouse position adds parallax, and a damped follow keeps motion buttery.
- **Instancing everywhere.** 1,400 particles and a 28-orb grid cost 2 draw calls total.
- **Mobile-aware degradation.** Lower DPR, 400 particles, no antialiasing, low-poly rings —
  detected via `matchMedia`, no user agent sniffing.
- **Content/presentation decoupling.** Every word on the site lives in
  [`src/data/content.json`](src/data/content.json). Swap the data, keep the world.
- **Resilient loading screen.** Pure-CSS fade-out that completes even in backgrounded tabs
  (rAF-driven exit animations freeze when `document.hidden` — this one doesn't).

## 📂 Project Structure

```
src/
├── data/content.json         ← Single source of truth for ALL content
├── lib/scrollState.js        ← GSAP ↔ R3F bridge (mutable, render-loop-read)
├── hooks/                    ← useIsMobile, useTypewriter
├── components/
│   ├── three/                ← 3D scenes (lazy-loaded)
│   │   ├── MainCanvas.jsx    ← Canvas, lights, fog, scene registry
│   │   ├── CameraRig.jsx     ← Catmull-Rom camera path + mouse parallax
│   │   └── ...one file per scene
│   └── ui/                   ← Loading screen, navbar, section chrome
└── sections/                 ← DOM layer (glass cards over the canvas)
```

## 🚀 Quick Start

```bash
git clone <this-repo>
cd New-3D-portfolio
npm install
npm run dev          # → http://localhost:5173
```

Production build & preview:

```bash
npm run build && npm run preview
```

### 📬 Contact form (optional)

Works out of the box via a `mailto:` fallback. For in-page delivery, create a free
[EmailJS](https://www.emailjs.com) account, then:

```bash
cp .env.example .env    # fill in the three VITE_EMAILJS_* keys
```

## ☁️ Deploy to Vercel

One-click: import the repo at [vercel.com/new](https://vercel.com/new) — `vercel.json` is
preconfigured (Vite, `dist` output, SPA rewrites). Or from the CLI:

```bash
npm i -g vercel && vercel
```

Add the `VITE_EMAILJS_*` env vars in the Vercel dashboard if you use EmailJS.

## ✏️ Customizing Content

All text, links, skills, projects, and timeline entries live in
**`src/data/content.json`** — edit it and the site updates, no component changes needed.

- Two upcoming projects (*Autonomous GitHub Issue Resolver*, *LLM Evaluation CI/CD
  Pipeline*) are flagged `"placeholder": true` and show an amber **IN DEVELOPMENT**
  badge. Fill in their details and remove the flag when they ship.
- Replace `public/resume.pdf` with your latest resume — the download button picks it up.

## ⚡ Performance Checklist

- [x] `React.lazy` + `Suspense` around the entire 3D canvas
- [x] Instanced particles & orbs, primitive geometry only (no model downloads)
- [x] Fog + tight far-plane to cap overdraw
- [x] DPR clamping and per-device complexity scaling
- [x] Manual chunk splitting (`three` / `motion` / app) for cacheable bundles
- [x] `useFrame` only in components that actually animate

---

<div align="center">

**Built from scratch with React Three Fiber, GSAP & Tailwind — no templates.**

If you're hiring for Software Development / AI Engineering roles, let's talk:
**[garvity375@gmail.com](mailto:garvity375@gmail.com)**

</div>
