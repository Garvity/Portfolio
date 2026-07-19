import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* ---- Desktop pill nav ---- */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
        className="fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 md:block"
      >
        <div className="glass flex items-center gap-1 rounded-full px-2 py-1.5">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === id ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/25 to-secondary/25 border border-primary/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{label}</span>
            </a>
          ))}
        </div>
      </motion.nav>

      {/* ---- Mobile top bar ---- */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 py-3 md:hidden"
      >
        <a href="#hero" className="glass rounded-full px-4 py-2 font-display text-sm font-bold text-white">
          G<span className="neon-text">.</span>
        </a>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="glass rounded-full p-2.5 text-slate-200"
        >
          <Menu size={20} />
        </button>
      </motion.div>

      {/* ---- Mobile full-screen menu ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex flex-col bg-void/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <span className="glass rounded-full px-4 py-2 font-display text-sm font-bold text-white">
                G<span className="neon-text">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="glass rounded-full p-2.5 text-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2">
              {LINKS.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: 'easeOut' }}
                  className={`px-8 py-3 font-display text-2xl font-semibold tracking-wide ${
                    active === id ? 'neon-text' : 'text-slate-300'
                  }`}
                >
                  <span className="mr-3 font-mono text-sm text-slate-600">
                    0{i + 1}
                  </span>
                  {label}
                </motion.a>
              ))}
            </nav>

            <p className="pb-8 text-center font-mono text-xs text-slate-600">
              scroll the world · garv
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
