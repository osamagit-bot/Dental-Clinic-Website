import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import type * as THREE from 'three';

function ToothModel() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.4}
          envMapIntensity={2}
          emissive="#11ccff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

export function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#11ccff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#cc11ff" />
      <ToothModel />
      <Environment preset="city" />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
    </Canvas>
  );
}
