import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Briefcase, Trophy, GraduationCap } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import content from '../data/content.json'

gsap.registerPlugin(ScrollTrigger)

function entryIcon(entry) {
  if (entry.type === 'education') return GraduationCap
  if (/hackathon/i.test(`${entry.role} ${entry.company}`)) return Trophy
  return Briefcase
}

export default function Journey() {
  const root = useRef()

  const entries = [
    ...content.experience.map((e) => ({ ...e, type: 'work' })),
    ...content.education.map((e) => ({
      role: e.degree,
      company: e.school,
      period: e.year,
      description: e.description,
      type: 'education',
    })),
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 55%',
            end: 'bottom 80%',
            scrub: true,
          },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={root} className="relative min-h-screen py-24">
      <div className="section-shell">
        <SectionHeading kicker="04 / the path" title="My" accent="Journey" />

        <div className="relative">
          {/* Animated spine */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2">
            <div className="timeline-line h-full w-full origin-top bg-gradient-to-b from-primary via-secondary to-neon shadow-[0_0_12px_rgba(167,139,250,0.7)]" />
          </div>

          <div className="space-y-14">
            {entries.map((entry, i) => {
              const Icon = entryIcon(entry)
              const left = i % 2 === 0
              return (
                <motion.div
                  key={`${entry.role}-${i}`}
                  initial={{ opacity: 0, x: left ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className={`relative flex ${left ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  {/* Node */}
                  <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-void shadow-[0_0_18px_rgba(56,189,248,0.45)]">
                      <Icon size={16} className={entry.type === 'education' ? 'text-neon' : 'text-primary'} />
                    </div>
                  </div>

                  <div className={`glass glass-hover ml-14 w-full p-6 md:ml-0 md:w-[calc(50%-3.5rem)]`}>
                    <span className="font-mono text-xs text-slate-500">{entry.period}</span>
                    <h3 className="mt-1 font-display text-lg font-bold text-white">{entry.role}</h3>
                    <h4 className="text-sm text-secondary">{entry.company}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{entry.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
