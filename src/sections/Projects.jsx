import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Github, ExternalLink, Construction } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import content from '../data/content.json'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const root = useRef()
  const projects = content.projects

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 90, rotateX: 8, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              end: 'top 45%',
              scrub: true,
            },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={root} className="relative py-24">
      <div className="section-shell">
        <SectionHeading kicker="03 / builds" title="Featured" accent="Projects" />
      </div>

      {projects.map((project, i) => (
        <article
          key={project.title}
          className="flex min-h-screen items-center py-12"
          style={{ perspective: '1200px' }}
        >
          <div className="section-shell">
            <div
              className={`project-card glass glass-hover max-w-xl p-8 ${
                i % 2 === 1 ? 'ml-auto' : ''
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500">
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                {project.placeholder && (
                  <span className="flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[10px] tracking-wider text-amber-300">
                    <Construction size={12} /> IN DEVELOPMENT
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.problem}</p>
              <p className="mt-2 text-sm leading-relaxed text-primary/90">{project.impact}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.slice(0, 8).map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 8 && (
                  <span className="px-2 py-1 font-mono text-[11px] text-slate-500">
                    +{project.tech.length - 8} more
                  </span>
                )}
              </div>

              <div className="mt-7 flex gap-5">
                {project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-primary"
                  >
                    <Github size={16} /> Code
                  </a>
                )}
                {project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-200 transition-colors hover:text-primary"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
