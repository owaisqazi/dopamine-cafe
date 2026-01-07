"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface ThreeDModelProps {
  src: string;
  width?: number;
  height?: number;
}

function Model({ src }: { src: string }) {
  const gltf = useGLTF(src, true);
  if (!gltf?.scene) return null; // Prevent crash
  return <primitive object={gltf.scene} />;
}


export default function ThreeDModel({ src, width = 520, height = 520 }: ThreeDModelProps) {
  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<span>Loading 3D...</span>}>
          <Model src={src} />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
}
