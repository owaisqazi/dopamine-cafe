"use client";

import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import dynamic from "next/dynamic";
const ThreeDModel = dynamic(() => import("./ThreeDModel"), { ssr: false });

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

interface Props {
  images: string[];
  alt: string;
  gl_file?: string;
}

export default function ThreeDImageGallery({ images, alt, gl_file }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const FALLBACK_IMAGE = "/placeholder-image.jpg";

  if (!images?.length && !gl_file) return null;

  const slides: { type: "3d" | "image"; src: string }[] = [];

  // ✅ Only push GLB if it exists
  if (gl_file) {
    slides.push({
      type: "3d",
      src: IMAGE_BASE_URL + gl_file,
    });
  }

  images.forEach((img) =>
    slides.push({
      type: "image",
      src: img ? IMAGE_BASE_URL + img : FALLBACK_IMAGE,
    })
  );

  return (
    <div className="w-full grid gap-4">
      {/* MAIN SLIDER */}
      <Swiper
        onSwiper={setMainSwiper}
        spaceBetween={16}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        className="mb-4 w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.type === "3d" ? (
              <ThreeDModel
                glbUrl={slide.src}
                onDragStart={() => mainSwiper?.disable()}
                onDragEnd={() => mainSwiper?.enable()}
                fallback={FALLBACK_IMAGE}
              />
            ) : (
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
                <Image
                  src={slide.src}
                  alt={alt}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAILS */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-20 w-full rounded-xl overflow-hidden border hover:border-amber-500">
              <Image
                src={slide.type === "3d" ? FALLBACK_IMAGE : slide.src}
                alt={alt}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
