import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei'
import { scrollState } from '../../lib/scrollState'
import content from '../../data/content.json'

// Journey scene: a helix of glowing nodes (one per experience +
// education entry) around a central axis line that "energizes" on scroll.
export default function JourneyScene({ position }) {
  const group = useRef()
  const beam = useRef()
  const nodeCount = content.experience.length + content.education.length

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const d = Math.min(delta, 0.05)
    group.current.rotation.y += d * 0.2
    if (beam.current) {
      const p = scrollState.transitions[3] // journey arriving
      beam.current.material.emissiveIntensity = 0.3 + p * 1.4 + Math.sin(t * 2.4) * 0.15
    }
  })

  return (
    <group position={position}>
      <mesh ref={beam}>
        <cylinderGeometry args={[0.03, 0.03, 7.5, 8]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} />
      </mesh>
      <group ref={group}>
        {Array.from({ length: nodeCount }, (_, i) => {
          const angle = (i / nodeCount) * Math.PI * 2
          const y = 3 - (i / Math.max(nodeCount - 1, 1)) * 6
          return (
            <Float key={i} speed={1.6} rotationIntensity={0.8} floatIntensity={0.7}>
              <mesh position={[Math.cos(angle) * 2.1, y, Math.sin(angle) * 2.1]}>
                <octahedronGeometry args={[0.34]} />
                <meshStandardMaterial
                  color={i < content.experience.length ? '#38bdf8' : '#22d3ee'}
                  emissive={i < content.experience.length ? '#38bdf8' : '#22d3ee'}
                  emissiveIntensity={0.8}
                  wireframe
                />
              </mesh>
            </Float>
          )
        })}
      </group>
    </group>
  )
}
