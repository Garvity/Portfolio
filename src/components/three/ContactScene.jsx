import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '../../lib/scrollState'

// Contact scene: a floating wireframe "terminal" slab with an orbiting
// mail glyph built from primitives.
export default function ContactScene({ position }) {
  const orbit = useRef()
  const terminal = useRef()

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime()
    const d = Math.min(delta, 0.05)
    if (orbit.current) orbit.current.rotation.y = t * 0.5
    if (terminal.current) {
      terminal.current.rotation.y = THREE.MathUtils.damp(
        terminal.current.rotation.y, scrollState.mouse.x * 0.5, 2.5, d)
      terminal.current.rotation.x = THREE.MathUtils.damp(
        terminal.current.rotation.x, -0.18 + scrollState.mouse.y * 0.3, 2.5, d)
    }
  })

  return (
    <group position={position}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
        <group ref={terminal}>
          {/* Terminal slab */}
          <mesh>
            <boxGeometry args={[3.6, 2.3, 0.16]} />
            <meshStandardMaterial color="#0f172a" emissive="#38bdf8" emissiveIntensity={0.14} wireframe />
          </mesh>
          {/* Screen glow */}
          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[3.2, 1.9]} />
            <meshBasicMaterial color="#0ea5e9" transparent opacity={0.08} />
          </mesh>
          {/* Prompt lines */}
          {[0.6, 0.25, -0.1].map((y, i) => (
            <mesh key={i} position={[-0.5 + i * 0.15, y, 0.12]}>
              <planeGeometry args={[1.8 - i * 0.5, 0.07]} />
              <meshBasicMaterial color={i === 0 ? '#22d3ee' : '#64748b'} transparent opacity={0.85} />
            </mesh>
          ))}
        </group>
      </Float>
      {/* Orbiting mail glyph */}
      <group ref={orbit}>
        <group position={[3.1, 0.9, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.55, 0.06]} />
            <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.7} wireframe />
          </mesh>
          <mesh position={[0, 0.06, 0.02]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
