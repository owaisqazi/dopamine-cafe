/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import ThreeDImage from "./ThreeDImage";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

interface Props {
  images: string[];
  alt: string;
}

export default function ThreeDImageGallery({ images, alt }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const FALLBACK_IMAGE = "./placeholder-image.jpg";

  if (!images?.length) return null;

  return (
    <div className="w-full">
      {/* MAIN IMAGE */}
      <Swiper
        onSwiper={setMainSwiper}
        spaceBetween={24}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        allowTouchMove={false} // 🔥 FIX
        simulateTouch={false}
        className="mb-6"
      >
        {images.map((img, index) => {
          const imageSrc = img ? IMAGE_BASE_URL + img : FALLBACK_IMAGE;

          return (
            <SwiperSlide key={index}>
              <ThreeDImage
                src={imageSrc}
                alt={alt}
                onDragStart={() => mainSwiper?.disable()}
                onDragEnd={() => mainSwiper?.enable()}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* THUMBNAILS */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-20 rounded-xl overflow-hidden border hover:border-amber-500">
              <Image
                src={IMAGE_BASE_URL + img}
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
