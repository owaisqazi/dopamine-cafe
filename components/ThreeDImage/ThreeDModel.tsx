/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useState } from "react";
import Image from "next/image";

function Model({ url, onError }: { url: string; onError: () => void }) {
  try {
    const { scene } = useGLTF(url, true, undefined, () => {
      console.warn("GLB load failed (onError callback):", url);
      onError();
    });

    if (!scene) {
      onError();
      return null;
    }

    return (
      <primitive
        object={scene}
        scale={1.2} 
      />
    );
  } catch (err) {
    console.error("GLB loader caught error:", err);
    onError();
    return null;
  }
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
      <div className="relative w-full h-[400px] rounded-xl bg-gray-100">
        <Image
          src={fallback}
          alt="Fallback"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-xl bg-gray-100">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setPixelRatio(window.devicePixelRatio)}
        onPointerDown={onDragStart}
        onPointerUp={onDragEnd}
      >
        {/* Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight intensity={1} position={[5, 5, 5]} />
        <directionalLight intensity={0.5} position={[-5, 5, 5]} />

        <Suspense fallback={<div />}>
          <Model url={glbUrl} onError={() => setError(true)} />
        </Suspense>

        {/* Controls */}
        <OrbitControls enableZoom target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
