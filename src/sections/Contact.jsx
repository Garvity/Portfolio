import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionHeading from '../components/ui/SectionHeading'
import content from '../data/content.json'

const socialIcon = { GitHub: Github, LinkedIn: Linkedin, Email: Mail }

export default function Contact() {
  const { contact, resume } = content
  const form = useRef()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const hasEmailJs =
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(form.current)

    if (!hasEmailJs) {
      // No EmailJS configured — fall back to the visitor's mail client
      const subject = encodeURIComponent(data.get('subject') || 'Hello from your portfolio')
      const body = encodeURIComponent(
        `From: ${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`,
      )
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
      .then(() => {
        setStatus('sent')
        form.current?.reset()
        setTimeout(() => setStatus('idle'), 5000)
      })
      .catch(() => {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      })
  }

  return (
    <section id="contact" className="relative flex min-h-screen items-center py-24">
      <div className="section-shell">
        <SectionHeading kicker="05 / transmission" title="Get In" accent="Touch" />

        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-slate-300">{contact.message}</p>

            <div className="space-y-4">
              {contact.socials.map((s) => {
                const Icon = socialIcon[s.platform] ?? Mail
                return (
                  <motion.a
                    key={s.platform}
                    whileHover={{ x: 6 }}
                    href={s.url}
                    target={s.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="glass glass-hover flex items-center gap-4 p-4"
                  >
                    <span className="rounded-full bg-primary/10 p-3 text-primary">
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block font-display text-sm font-semibold text-white">
                        {s.platform}
                      </span>
                      <span className="text-xs text-slate-400">{s.label}</span>
                    </span>
                  </motion.a>
                )
              })}
            </div>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={`/${resume.filename}`}
              download
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Download size={16} /> Download Resume
            </motion.a>
          </motion.div>

          <motion.form
            ref={form}
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass space-y-5 p-8 font-mono text-sm"
          >
            <p className="text-xs text-slate-500">
              <span className="text-neon">garv@portfolio</span>:~$ ./send_message.sh
            </p>
            {[
              { name: 'name', type: 'text', placeholder: 'your name' },
              { name: 'email', type: 'email', placeholder: 'your@email.com' },
              { name: 'subject', type: 'text', placeholder: 'subject' },
            ].map((f) => (
              <input
                key={f.name}
                name={f.name}
                type={f.type}
                required
                placeholder={`> ${f.placeholder}`}
                className="w-full rounded-lg border border-white/10 bg-void/70 px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-primary focus:outline-none"
              />
            ))}
            <textarea
              name="message"
              required
              rows={4}
              placeholder="> your message..."
              className="w-full rounded-lg border border-white/10 bg-void/70 px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-secondary py-3 font-semibold text-void transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === 'sending' && (<><Loader2 size={16} className="animate-spin" /> Sending…</>)}
              {status === 'sent' && (<><CheckCircle size={16} /> Sent!</>)}
              {status === 'error' && (<><AlertCircle size={16} /> Failed — try again</>)}
              {status === 'idle' && (<><Send size={16} /> Execute Send</>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
