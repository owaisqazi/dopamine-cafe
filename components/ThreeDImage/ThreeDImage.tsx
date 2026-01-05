/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";

interface ThreeDImageProps {
  src: string;
  alt?: string;
  size?: number;
}

export default function ThreeDImage({
  src,
  alt = "",
  size = 520,
}: ThreeDImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastPos.current.x;
    const deltaY = e.clientY - lastPos.current.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
    }));

    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center perspective-[1400px]"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="cursor-grab active:cursor-grabbing select-none transition-transform duration-100 ease-out drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
        style={{
          width: size,
          transform: `
            rotateX(${rotation.x}deg)
            rotateY(${rotation.y}deg)
            translateZ(60px)
          `,
        }}
      />
    </div>
  );
}
