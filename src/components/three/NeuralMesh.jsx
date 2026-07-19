import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../../lib/scrollState'

// Hero centerpiece: a wireframe icosahedron "neural core" wrapped in a
// node/edge network, tilting toward the mouse.
export default function NeuralMesh({ position = [0, 0, 0], detail = 90 }) {
  const group = useRef()
  const core = useRef()

  const { nodes, edges } = useMemo(() => {
    const nodeArr = new Float32Array(detail * 3)
    const pts = []
    for (let i = 0; i < detail; i++) {
      // Fibonacci sphere for even node spread
      const phi = Math.acos(1 - (2 * (i + 0.5)) / detail)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 2.6 + Math.sin(i * 12.9898) * 0.35
      const v = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )
      pts.push(v)
      nodeArr.set([v.x, v.y, v.z], i * 3)
    }
    // Connect each node to its 2 nearest neighbours
    const edgeVerts = []
    for (let i = 0; i < pts.length; i++) {
      const dists = pts
        .map((p, j) => ({ j, d: i === j ? Infinity : pts[i].distanceToSquared(p) }))
        .sort((a, b) => a.d - b.d)
      for (let k = 0; k < 2; k++) {
        const p = pts[dists[k].j]
        edgeVerts.push(pts[i].x, pts[i].y, pts[i].z, p.x, p.y, p.z)
      }
    }
    return { nodes: nodeArr, edges: new Float32Array(edgeVerts) }
  }, [detail])

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    const d = Math.min(delta, 0.05)
    group.current.rotation.y += d * 0.15
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x, scrollState.mouse.y * 0.4, 2.5, d)
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z, -scrollState.mouse.x * 0.3, 2.5, d)
    if (core.current) {
      const s = 1 + Math.sin(t * 1.6) * 0.045
      core.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={group} position={position}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#38bdf8"
          emissiveIntensity={0.7}
          wireframe
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.09} color="#22d3ee" transparent opacity={0.9} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}
