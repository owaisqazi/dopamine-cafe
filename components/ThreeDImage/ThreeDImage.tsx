/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

interface ThreeDImageProps {
  src: string;
  alt?: string;
  size?: number;
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
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const lastDistance = useRef<number | null>(null);

  /* 🔍 detect mobile only once */
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  /* ---------------- DESKTOP (UNCHANGED) ---------------- */
  const onMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    onDragStart?.();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !dragging.current) return;
    rotate(e.clientX, e.clientY);
  };

  const stopMouse = () => {
    if (isMobile) return;
    dragging.current = false;
    onDragEnd?.();
  };

  const onWheel = (e: React.WheelEvent) => {
    if (isMobile) return;
    e.preventDefault();
    zoom(-e.deltaY * 0.001);
  };

  /* ---------------- MOBILE ONLY ---------------- */
  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;

    if (e.touches.length === 1) {
      dragging.current = true;
      last.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      onDragStart?.();
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;

    // rotate
    if (e.touches.length === 1 && dragging.current) {
      rotate(e.touches[0].clientX, e.touches[0].clientY);
    }

    // pinch zoom
    if (e.touches.length === 2) {
      const d = distance(e.touches);
      if (lastDistance.current) {
        zoom((d - lastDistance.current) * 0.005);
      }
      lastDistance.current = d;
    }
  };

  const onTouchEnd = () => {
    if (!isMobile) return;
    lastDistance.current = null;
    dragging.current = false;
    onDragEnd?.();
  };

  /* ---------------- HELPERS ---------------- */
  const rotate = (x: number, y: number) => {
    const dx = x - last.current.x;
    const dy = y - last.current.y;

    setRotation((r) => ({
      x: r.x + dy * 0.5,
      y: r.y + dx * 0.5,
    }));

    last.current = { x, y };
  };

  const zoom = (delta: number) => {
    setScale((s) => Math.min(2.2, Math.max(0.8, s + delta)));
  };

  const distance = (t: React.TouchList) => {
    const dx = t[0].clientX - t[1].clientX;
    const dy = t[0].clientY - t[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div
      className="flex justify-center items-center perspective-[1400px] md:touch-auto touch-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopMouse}
      onMouseLeave={stopMouse}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
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
