import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// The fade-out is pure CSS (no rAF) so it completes even when the tab is
// backgrounded — rAF-driven exit animations freeze in hidden tabs and can
// leave the overlay stuck over the page.
export default function LoadingScreen({ done }) {
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setGone(true), 800)
    return () => clearTimeout(t)
  }, [done])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-void transition-opacity duration-700 ease-in-out ${
        done ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="cube-scene">
        <div className="cube">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="cube-face" />
          ))}
        </div>
      </div>
      <div className="font-mono text-sm tracking-[0.35em] text-slate-400">
        <span className="text-primary">&gt;</span> INITIALIZING WORLD
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.1 }}>
          _
        </motion.span>
      </div>
    </div>
  )
}
