"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useUIStore } from "@/stores/ui.store";

function CodeCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useUIStore((s) => s.mousePosition);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3 + mousePosition.y * 0.5;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4 + mousePosition.x * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function TechSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePosition = useUIStore((s) => s.mousePosition);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.x = mousePosition.x * 0.5;
    meshRef.current.position.y = mousePosition.y * 0.3;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.2, 64, 64]} position={[3, -1, -2]}>
        <MeshDistortMaterial
          color="#7c3aed"
          transparent
          opacity={0.3}
          distort={0.4}
          speed={2}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);
  const mousePosition = useUIStore((s) => s.mousePosition);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02 + mousePosition.x * 0.1;
    pointsRef.current.rotation.x = mousePosition.y * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00d4ff" transparent opacity={0.6} />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[-10, -5, -5]} intensity={0.4} color="#7c3aed" />
      <CodeCube />
      <TechSphere />
      <Particles />
      <Stars radius={50} depth={50} count={1000} factor={3} fade speed={0.5} />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
