import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { scrollState } from '../../lib/scrollState'

// About scene: a wireframe globe that spins with scroll progress,
// orbited by floating low-poly "tech" shapes.
const ORBITERS = [
  { pos: [3.4, 1.2, 0], color: '#38bdf8', geo: 'box' },
  { pos: [-3.2, -0.8, 1], color: '#a78bfa', geo: 'octa' },
  { pos: [2.4, -1.8, -1], color: '#22d3ee', geo: 'tetra' },
  { pos: [-2.6, 1.8, -0.5], color: '#f472b6', geo: 'torus' },
]

function OrbiterGeo({ geo }) {
  switch (geo) {
    case 'box': return <boxGeometry args={[0.55, 0.55, 0.55]} />
    case 'octa': return <octahedronGeometry args={[0.42]} />
    case 'tetra': return <tetrahedronGeometry args={[0.45]} />
    default: return <torusGeometry args={[0.32, 0.12, 8, 20]} />
  }
}

export default function AboutGlobe({ position }) {
  const globe = useRef()

  useFrame((_, delta) => {
    if (!globe.current) return
    const d = Math.min(delta, 0.05)
    // Base spin + extra rotation driven by scroll through the about section
    globe.current.rotation.y += d * 0.12 + (scrollState.transitions[0] + scrollState.transitions[1]) * d * 1.6
  })

  return (
    <group position={position}>
      <mesh ref={globe}>
        <sphereGeometry args={[2.2, 24, 18]} />
        <meshStandardMaterial color="#1e293b" emissive="#38bdf8" emissiveIntensity={0.25} wireframe />
      </mesh>
      {ORBITERS.map((o, i) => (
        <Float key={i} speed={2 + i * 0.4} rotationIntensity={1.4} floatIntensity={1.6}>
          <mesh position={o.pos}>
            <OrbiterGeo geo={o.geo} />
            <meshStandardMaterial color={o.color} emissive={o.color} emissiveIntensity={0.5} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
