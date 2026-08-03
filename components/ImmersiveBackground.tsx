"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points as ThreePoints } from "three";

function DotField({ dark }: { dark: boolean }) {
  const pointsRef = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const count = 780;
    const data = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = 4 + Math.random() * 11;
      const angle = index * 2.39996;
      data[index * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2.2;
      data[index * 3 + 1] = (Math.random() - 0.5) * 18;
      data[index * 3 + 2] = Math.sin(angle) * radius - 4 - Math.random() * 7;
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.012;
    pointsRef.current.rotation.x += (state.pointer.y * 0.035 - pointsRef.current.rotation.x) * 0.018;
    pointsRef.current.position.x += (state.pointer.x * 0.65 - pointsRef.current.position.x) * 0.018;
    pointsRef.current.position.y += (state.pointer.y * 0.35 - pointsRef.current.position.y) * 0.018;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={dark ? "#ff8a78" : "#df4e3b"}
        size={dark ? 0.028 : 0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={dark ? 0.54 : 0.25}
      />
    </Points>
  );
}

export default function ImmersiveBackground({ dark }: { dark: boolean }) {
  return (
    <div className="ambient-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 8], fov: 62 }} gl={{ alpha: true, antialias: false }}>
        <fog attach="fog" args={[dark ? "#121314" : "#f2f0eb", 7, 24]} />
        <DotField dark={dark} />
      </Canvas>
    </div>
  );
}
