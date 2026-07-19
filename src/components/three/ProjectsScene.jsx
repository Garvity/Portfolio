import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../../lib/scrollState'
import content from '../../data/content.json'

// Projects corridor: one glowing wireframe "gate" ring per project,
// spaced along -z. The camera dollies through them as the user scrolls
// the tall projects section (see CameraRig / projectsProgress).
const GATE_SPACING = 3.2
const COLORS = ['#38bdf8', '#a78bfa', '#22d3ee']

export default function ProjectsScene({ position, lowPoly = false }) {
  const group = useRef()
  const count = content.projects.length

  const gates = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        z: -i * GATE_SPACING,
        color: COLORS[i % COLORS.length],
        offset: i * 1.7,
      })),
    [count],
  )

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.children.forEach((gate, i) => {
      gate.rotation.z = t * 0.25 * (i % 2 === 0 ? 1 : -1) + gates[i].offset
      // Highlight the gate nearest the current dolly position
      const active = Math.abs(scrollState.projectsProgress * (count - 1) - i)
      const target = active < 0.5 ? 1.15 : 0.85
      const s = THREE.MathUtils.lerp(gate.scale.x, target, 0.08)
      gate.scale.setScalar(s)
    })
  })

  const segments = lowPoly ? 24 : 48

  return (
    <group position={position}>
      <group ref={group}>
        {gates.map((g, i) => (
          <group key={i} position={[0, 0, g.z]}>
            <mesh>
              <torusGeometry args={[2.3, 0.045, 8, segments]} />
              <meshStandardMaterial color={g.color} emissive={g.color} emissiveIntensity={0.9} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[2.55, 0.02, 6, segments]} />
              <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.3} transparent opacity={0.35} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  )
}
