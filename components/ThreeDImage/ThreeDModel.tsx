"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} scale={1.2} />;
}

export default function ThreeDModel({
  url,
  onDragStart,
  onDragEnd,
}: {
  url: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}) {
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-2xl bg-gray-100">
      <Canvas
        onPointerDown={onDragStart}
        onPointerUp={onDragEnd}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />

        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>

        <OrbitControls enableZoom />
      </Canvas>
    </div>
  );
}
