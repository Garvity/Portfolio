import { Canvas } from '@react-three/fiber'
import { useIsMobile } from '../../hooks/useIsMobile'
import { SECTION_POSITIONS } from '../../lib/scrollState'
import CameraRig from './CameraRig'
import ParticleField from './ParticleField'
import NeuralMesh from './NeuralMesh'
import AboutGlobe from './AboutGlobe'
import SkillOrbs from './SkillOrbs'
import ProjectsScene from './ProjectsScene'
import JourneyScene from './JourneyScene'
import ContactScene from './ContactScene'

export default function MainCanvas() {
  const isMobile = useIsMobile()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, isMobile ? 1.25 : 1.75]}
        camera={{ fov: 55, near: 0.1, far: 90, position: [0, 0.6, 9] }}
        gl={{ antialias: !isMobile, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#05060f']} />
        <fog attach="fog" args={['#05060f', 14, isMobile ? 42 : 55]} />

        <ambientLight intensity={0.4} />
        <pointLight position={[8, 6, 4]} intensity={40} color="#38bdf8" />
        <pointLight position={[-8, -4, -20]} intensity={30} color="#a78bfa" />

        <CameraRig />
        <ParticleField count={isMobile ? 400 : 1400} />

        <NeuralMesh position={SECTION_POSITIONS[0]} detail={isMobile ? 48 : 90} />
        <AboutGlobe position={SECTION_POSITIONS[1]} />
        <SkillOrbs position={SECTION_POSITIONS[2]} />
        <ProjectsScene position={SECTION_POSITIONS[3]} lowPoly={isMobile} />
        <JourneyScene position={SECTION_POSITIONS[4]} />
        <ContactScene position={SECTION_POSITIONS[5]} />
      </Canvas>
    </div>
  )
}
