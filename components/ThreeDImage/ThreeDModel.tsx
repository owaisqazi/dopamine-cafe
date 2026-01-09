/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import Image from "next/image";

function Model({ url, onError }: { url: string; onError: () => void }) {
  const { scene } = useGLTF(url, true);

  useEffect(() => {
    if (!scene) {
      console.error("GLB load failed");
      onError();
    }
  }, [scene, onError]);

  if (!scene) return null;

  return <primitive object={scene} scale={1.5} />;
}

export default function ThreeDModel({
  glbUrl,
  fallback = "/placeholder-image.jpg",
  onDragStart,
  onDragEnd,
}: {
  glbUrl: string;
  fallback?: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}) {
  const [error, setError] = useState(false);

  if (!glbUrl || error) {
    return (
      <div className="relative w-full h-[500px] rounded-xl bg-gray-100 flex items-center justify-center">
        <Image src={fallback} alt="Fallback" fill className="object-contain" />
        <div className="absolute bg-white/80 p-2 rounded text-xs text-red-500">
          Model Load Failed
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl bg-gray-200 shadow-inner">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        onPointerDown={onDragStart}
        onPointerUp={onDragEnd}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* ✅ Skeleton Loader */}
        <Suspense fallback={null}>
          <Model url={glbUrl} onError={() => setError(true)} />
        </Suspense>

        <OrbitControls enableZoom minDistance={2} maxDistance={100} />
      </Canvas>
    </div>
  );
}
