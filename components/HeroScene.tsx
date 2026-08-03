"use client";

import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function NeuralCore() {
  const group = useRef<Group>(null);
  const points = useMemo(() => {
    const values = new Float32Array(90);
    for (let i = 0; i < 30; i += 1) {
      const radius = 1.15 + (i % 4) * 0.11;
      const theta = i * 2.399;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 30);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.cos(phi);
      values[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.13;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.11;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.28}>
        <mesh>
          <icosahedronGeometry args={[0.83, 2]} />
          <meshStandardMaterial color="#ff654f" roughness={0.25} metalness={0.25} wireframe />
        </mesh>
        <mesh scale={0.63}>
          <icosahedronGeometry args={[0.83, 1]} />
          <meshStandardMaterial color="#ff8b78" roughness={0.45} emissive="#8f2c21" emissiveIntensity={0.35} />
        </mesh>
        <Points positions={points} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#fff0e9" size={0.045} sizeAttenuation depthWrite={false} />
        </Points>
        <Line points={[[-1.15, 0.2, 0.15], [0, 0.75, 0.4], [1.1, 0.1, -0.2]]} color="#ffd6cd" lineWidth={0.7} transparent opacity={0.48} />
        <Line points={[[-0.8, -0.75, -0.25], [0.2, -0.25, 0.8], [0.95, -0.55, 0.1]]} color="#ffd6cd" lineWidth={0.7} transparent opacity={0.4} />
      </Float>
      <mesh rotation={[1.1, 0.1, 0.5]}>
        <torusGeometry args={[1.42, 0.006, 8, 100]} />
        <meshBasicMaterial color="#ff9b89" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0.45, 0.5, -0.35]}>
        <torusGeometry args={[1.67, 0.004, 8, 100]} />
        <meshBasicMaterial color="#8bb7ff" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="three-canvas" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.6], fov: 43 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[3, 3, 4]} intensity={22} color="#ffb0a0" />
        <pointLight position={[-3, -2, 2]} intensity={14} color="#8bb7ff" />
        <NeuralCore />
      </Canvas>
    </div>
  );
}
