import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState, SECTION_POSITIONS, SECTION_COUNT } from '../../lib/scrollState'

// How far the camera dollies forward while scrolling through the tall
// projects section. Faded out as the journey section arrives so the
// hand-off back to the main curve stays continuous.
const PROJECT_DOLLY = 10

export default function CameraRig() {
  const { camCurve, lookCurve } = useMemo(() => {
    const camPts = SECTION_POSITIONS.map(
      ([x, y, z]) => new THREE.Vector3(x * 0.65, y + 0.6, z + 9),
    )
    const lookPts = SECTION_POSITIONS.map(([x, y, z]) => new THREE.Vector3(x, y, z))
    return {
      camCurve: new THREE.CatmullRomCurve3(camPts, false, 'catmullrom', 0.4),
      lookCurve: new THREE.CatmullRomCurve3(lookPts, false, 'catmullrom', 0.4),
    }
  }, [])

  const camTarget = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3())
  const lookCurrent = useRef(new THREE.Vector3(0, 0, 0))

  useFrame(({ camera }, delta) => {
    const t = THREE.MathUtils.clamp(scrollState.sectionFloat / (SECTION_COUNT - 1), 0, 1)
    camCurve.getPoint(t, camTarget.current)
    lookCurve.getPoint(t, lookTarget.current)

    // Dolly through the projects corridor, fading as journey arrives
    const dolly =
      scrollState.projectsProgress * PROJECT_DOLLY * (1 - scrollState.transitions[3])
    camTarget.current.z -= dolly
    lookTarget.current.z -= dolly

    // Mouse parallax
    camTarget.current.x += scrollState.mouse.x * 0.55
    camTarget.current.y += -scrollState.mouse.y * 0.35

    const d = Math.min(delta, 0.05)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, camTarget.current.x, 3.2, d)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, camTarget.current.y, 3.2, d)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, camTarget.current.z, 3.2, d)

    lookCurrent.current.x = THREE.MathUtils.damp(lookCurrent.current.x, lookTarget.current.x, 3.2, d)
    lookCurrent.current.y = THREE.MathUtils.damp(lookCurrent.current.y, lookTarget.current.y, 3.2, d)
    lookCurrent.current.z = THREE.MathUtils.damp(lookCurrent.current.z, lookTarget.current.z, 3.2, d)
    camera.lookAt(lookCurrent.current)
  })

  return null
}
