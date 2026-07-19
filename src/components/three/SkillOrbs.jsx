import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Skills scene: an instanced hex-grid of orbs gently breathing — the
// actual per-skill hexagons live in the DOM layer for crisp text.
const COLORS = ['#38bdf8', '#a78bfa', '#22d3ee', '#818cf8']

export default function SkillOrbs({ position, rows = 4, cols = 7 }) {
  const inst = useRef()
  const count = rows * cols
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const cells = useMemo(() => {
    const arr = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({
          x: (c - (cols - 1) / 2) * 1.5 + (r % 2) * 0.75,
          y: (r - (rows - 1) / 2) * 1.35,
          z: Math.sin(r * 3.1 + c * 1.7) * 0.9,
          phase: r * 1.3 + c * 0.7,
        })
      }
    }
    return arr
  }, [rows, cols])

  // Per-instance colors via the InstancedMesh color API
  useEffect(() => {
    if (!inst.current) return
    const color = new THREE.Color()
    cells.forEach((_, i) => {
      inst.current.setColorAt(i, color.set(COLORS[i % COLORS.length]))
    })
    inst.current.instanceColor.needsUpdate = true
  }, [cells])

  useFrame(({ clock }) => {
    if (!inst.current) return
    const t = clock.getElapsedTime()
    cells.forEach((cell, i) => {
      dummy.position.set(
        cell.x,
        cell.y + Math.sin(t * 1.1 + cell.phase) * 0.18,
        cell.z + Math.cos(t * 0.8 + cell.phase) * 0.25,
      )
      const s = 0.85 + Math.sin(t * 1.4 + cell.phase) * 0.12
      dummy.scale.setScalar(s)
      dummy.updateMatrix()
      inst.current.setMatrixAt(i, dummy.matrix)
    })
    inst.current.instanceMatrix.needsUpdate = true
    inst.current.rotation.y = Math.sin(t * 0.2) * 0.25
  })

  return (
    <group position={position}>
      <instancedMesh ref={inst} args={[null, null, count]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial wireframe emissive="#38bdf8" emissiveIntensity={0.35} />
      </instancedMesh>
    </group>
  )
}
