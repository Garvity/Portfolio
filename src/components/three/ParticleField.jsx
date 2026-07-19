import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// One Points draw call for the whole journey — particles are scattered
// in a corridor along the camera path; fog hides the far ones.
export default function ParticleField({ count = 1200 }) {
  const points = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 55
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30
      arr[i * 3 + 2] = 18 - Math.random() * 160
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!points.current) return
    const t = clock.getElapsedTime()
    points.current.rotation.z = Math.sin(t * 0.05) * 0.06
    points.current.position.y = Math.sin(t * 0.18) * 0.5
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#7dd3fc"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={2}
      />
    </points>
  )
}
