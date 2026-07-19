import { motion } from 'framer-motion'

export default function SectionHeading({ kicker, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mb-14"
    >
      <p className="mb-3 font-mono text-xs tracking-[0.4em] text-primary/80 uppercase">
        {kicker}
      </p>
      <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
        {title} <span className="neon-text">{accent}</span>
      </h2>
    </motion.div>
  )
}
