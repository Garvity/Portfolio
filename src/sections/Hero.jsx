import { motion } from 'framer-motion'
import { Github, Linkedin, FileText, ArrowDown } from 'lucide-react'
import { useTypewriter } from '../hooks/useTypewriter'
import content from '../data/content.json'

const socialIcon = { GitHub: Github, LinkedIn: Linkedin }

export default function Hero() {
  const { hero, contact, resume } = content
  const typed = useTypewriter(hero.roles)

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center">
      <div className="section-shell flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glass mb-8 rounded-full px-5 py-2 font-mono text-xs tracking-[0.3em] text-neon"
        >
          ● {hero.status}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
          data-text={hero.name.toUpperCase()}
          className="glitch font-display text-6xl font-bold text-white sm:text-7xl md:text-8xl"
        >
          {hero.name.toUpperCase()}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-6 min-h-[2.5rem] font-mono text-xl text-slate-300 sm:text-2xl"
        >
          <span className="text-slate-500">&gt; </span>
          <span className="neon-text font-semibold">{typed}</span>
          <span className="animate-pulse text-primary">▌</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          {hero.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 font-medium text-void transition-transform hover:scale-105"
          >
            {hero.cta}
          </a>
          {contact.socials
            .filter((s) => socialIcon[s.platform])
            .map((s) => {
              const Icon = socialIcon[s.platform]
              return (
                <motion.a
                  key={s.platform}
                  whileHover={{ scale: 1.12, y: -2 }}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.platform}
                  className="glass glass-hover rounded-full p-3 text-slate-300 hover:text-primary"
                >
                  <Icon size={22} />
                </motion.a>
              )
            })}
          <motion.a
            whileHover={{ scale: 1.12, y: -2 }}
            href={`/${resume.filename}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
            title="View Resume"
            className="glass glass-hover rounded-full p-3 text-slate-300 hover:text-primary"
          >
            <FileText size={22} />
          </motion.a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-slate-500"
        aria-label="Scroll down"
      >
        <div className="scroll-indicator" />
        <ArrowDown size={14} className="animate-bounce" />
      </motion.a>
    </section>
  )
}
