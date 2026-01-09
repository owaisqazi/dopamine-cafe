"use client";

import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import Image from "next/image";
import dynamic from "next/dynamic";
import axiosInstance, { IMAGE_BASE_URL } from "../auth/axiosInstance";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ThreeDModel = dynamic(() => import("./ThreeDModel"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
      Loading...
    </div>
  ),
});

interface Props {
  images: string[];
  alt: string;
  gl_file?: string;
}

export default function ThreeDImageGallery({ images, alt, gl_file }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [proxiedGlbUrl, setProxiedGlbUrl] = useState<string | null>(null);

  const FALLBACK_IMAGE = "/placeholder-image.jpg";
  let currentUrl: string | null = null;
  const loadModel = async () => {
    try {
      const res = await axiosInstance.get(`/user/proxy-glb?url=${gl_file}`, {
        responseType: "blob",
      });
      currentUrl = URL.createObjectURL(res.data);
      setProxiedGlbUrl(currentUrl);
    } catch (err) {
      console.error("Proxy Load Error:", err);
    }
  };
  useEffect(() => {
    loadModel();
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl_file]);
  const allSlides = useMemo(() => {
    const list = [];
    if (proxiedGlbUrl) list?.push({ type: "3d", src: proxiedGlbUrl });

    const imageSlides =
      images?.map((img) => ({
        type: "image",
        src: img ? IMAGE_BASE_URL + img : FALLBACK_IMAGE,
      })) || [];

    return [...list, ...imageSlides];
  }, [proxiedGlbUrl, images]);

  if (!allSlides?.length) return null;

  return (
    <div className="w-full space-y-4">
      <Swiper
        key={allSlides?.length}
        spaceBetween={10}
        thumbs={{
          swiper:
            thumbsSwiper && !thumbsSwiper?.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="sm:h-80 md:h-[450px] w-full rounded-2xl border bg-white overflow-hidden shadow-sm"
      >
        {allSlides?.map((slide, i) => (
          <SwiperSlide key={i}>
            {slide?.type === "3d" ? (
              <ThreeDModel glbUrl={slide?.src} fallback={FALLBACK_IMAGE} />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={slide?.src}
                  alt={alt}
                  fill
                  className="object-contain p-4"
                  priority={i === 0}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className="h-20 w-full"
      >
        {allSlides?.map((slide, i) => (
          <SwiperSlide key={i} className="cursor-pointer">
            <div className="relative h-full w-full rounded-xl border-2 overflow-hidden transition-all [.swiper-slide-thumb-active_&]:border-amber-500">
              <Image
                src={slide?.type === "3d" ? FALLBACK_IMAGE : slide?.src}
                alt="thumb"
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
