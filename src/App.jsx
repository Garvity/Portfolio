import { Suspense, lazy, useEffect, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollState } from './lib/scrollState'
import LoadingScreen from './components/ui/LoadingScreen'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Journey from './sections/Journey'
import Contact from './sections/Contact'

const MainCanvas = lazy(() => import('./components/three/MainCanvas'))

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'journey', 'contact']

export default function App() {
  const [ready, setReady] = useState(false)

  // Minimum loading-screen time so the entrance doesn't flash
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1600)
    return () => clearTimeout(t)
  }, [])

  // Mouse parallax feed for the 3D rig
  useEffect(() => {
    const onMove = (e) => {
      scrollState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      scrollState.mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  // Scroll choreography: each section's arrival at the viewport top is a
  // scrubbed 0→1 transition; their sum is the camera-path parameter.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const triggers = SECTION_IDS.slice(1).map((id, i) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
        onUpdate: (self) => {
          scrollState.transitions[i] = self.progress
          scrollState.sectionFloat = scrollState.transitions.reduce((a, b) => a + b, 0)
        },
      }),
    )

    // Local progress inside the tall projects section → camera dolly
    triggers.push(
      ScrollTrigger.create({
        trigger: '#projects',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollState.projectsProgress = self.progress
        },
      }),
    )

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <div className="relative">
      <LoadingScreen done={ready} />

      <Suspense fallback={null}>
        <MainCanvas />
      </Suspense>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Journey />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
