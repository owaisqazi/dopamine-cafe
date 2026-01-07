/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState } from "react";

interface ThreeDImageProps {
  src: string;
  alt?: string;
  size?: number;

  // ✅ FIX: add these
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export default function ThreeDImage({
  src,
  alt = "",
  size = 520,
  onDragStart,
  onDragEnd,
}: ThreeDImageProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1); // 🔥 ZOOM STATE

  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    onDragStart?.(); // 🔥 disable swiper
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;

    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;

    setRotation((r) => ({
      x: r.x + dy * 0.5,
      y: r.y + dx * 0.5,
    }));

    last.current = { x: e.clientX, y: e.clientY };
  };

  const stop = () => {
    dragging.current = false;
    onDragEnd?.(); // 🔥 enable swiper
  };

  // 🔥 ZOOM HANDLER
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) =>
      Math.min(2.2, Math.max(0.8, s - e.deltaY * 0.001))
    );
  };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stop}
      onMouseLeave={stop}
      onWheel={onWheel}
      className="flex justify-center items-center perspective-[1400px]"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="cursor-grab active:cursor-grabbing select-none transition-transform duration-75 ease-out drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
        style={{
          width: size,
          transform: `
            scale(${scale})
            rotateX(${rotation.x}deg)
            rotateY(${rotation.y}deg)
            translateZ(70px)
          `,
        }}
      />
    </div>
  );
}
