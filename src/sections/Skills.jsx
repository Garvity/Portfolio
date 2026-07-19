import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading'
import content from '../data/content.json'

export default function Skills() {
  const { skills } = content
  const [activeTab, setActiveTab] = useState('All')
  const [hovered, setHovered] = useState(null)

  const filtered =
    activeTab === 'All' ? skills.items : skills.items.filter((s) => s.category === activeTab)

  return (
    <section id="skills" className="relative flex min-h-screen items-center py-24">
      <div className="section-shell">
        <SectionHeading kicker="02 / arsenal" title="My" accent="Skills" />

        <div className="mb-12 flex flex-wrap gap-3">
          {skills.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeTab === cat ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeTab === cat && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-full border border-primary/40 bg-gradient-to-r from-primary/20 to-secondary/20"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{cat}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHovered(skill.name)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -8, scale: 1.06 }}
                className="relative flex aspect-square flex-col items-center justify-center gap-2 border border-white/10 bg-white/[0.04] backdrop-blur-md transition-shadow duration-300 hover:border-primary/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.3)]"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  loading="lazy"
                  className="h-9 w-9 object-contain sm:h-11 sm:w-11"
                />
                <span className="px-1 text-center text-[10px] text-slate-400 sm:text-xs">
                  {skill.name}
                </span>
                <AnimatePresence>
                  {hovered === skill.name && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute bottom-1 rounded-full bg-void/90 px-2 py-0.5 font-mono text-[9px] text-neon"
                    >
                      {skill.category}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
