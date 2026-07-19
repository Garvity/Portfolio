import { motion } from 'framer-motion'
import { Code2, Brain, Users, Lightbulb } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import content from '../data/content.json'

const ICONS = { Code2, Brain, Users, Lightbulb }
const ICON_COLORS = ['text-primary', 'text-secondary', 'text-neon', 'text-emerald-400']

export default function About() {
  const { about } = content

  return (
    <section id="about" className="relative flex min-h-screen items-center py-24">
      <div className="section-shell">
        <SectionHeading kicker="01 / who i am" title="About" accent="Me" />

        <div className="grid gap-10 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="md:col-span-3 space-y-6 text-lg leading-relaxed text-slate-300"
          >
            <p className="glass glass-hover p-6">{about.content}</p>
            <p className="glass glass-hover p-6">{about.details}</p>
          </motion.div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {about.interests.map((item, i) => {
              const Icon = ICONS[item.icon] ?? Lightbulb
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass glass-hover flex flex-col justify-between p-5"
                >
                  <Icon size={28} className={`${ICON_COLORS[i % 4]} mb-4`} />
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.description}</p>
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
