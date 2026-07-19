import content from '../../data/content.json'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-8 text-center">
      <p className="font-mono text-xs text-slate-500">
        © {new Date().getFullYear()} {content.hero.name} — built with React Three Fiber, GSAP &
        Tailwind
      </p>
    </footer>
  )
}
