"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
});

interface Props {
  images: string[];
  alt: string;
  gl_file?: string;
}

export default function ThreeDImageGallery({ images, alt, gl_file }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [proxiedGlbUrl, setProxiedGlbUrl] = useState<string | null>(null);
  const [isGlbLoading, setIsGlbLoading] = useState(false);

  const objectUrlRef = useRef<string | null>(null);

  const FALLBACK_IMAGE = "/placeholder-image.jpg";

  useEffect(() => {
    if (!gl_file) return;

    const loadModel = async () => {
      try {
        setIsGlbLoading(true);

        const res = await axiosInstance.get(`/user/proxy-glb?url=${gl_file}`, {
          responseType: "blob",
        });

        const url = URL.createObjectURL(res.data);
        objectUrlRef.current = url;
        setProxiedGlbUrl(url);
      } catch (err) {
        console.error("GLB Load Error:", err);
      } finally {
        setIsGlbLoading(false);
      }
    };

    loadModel();

    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [gl_file]);

  const allSlides = useMemo(() => {
    const list: any[] = [];

    if (proxiedGlbUrl) {
      list.push({ type: "3d", src: proxiedGlbUrl });
    }

    const imageSlides =
      images?.map((img) => ({
        type: "image",
        src: img ? IMAGE_BASE_URL + img : FALLBACK_IMAGE,
      })) || [];

    return [...list, ...imageSlides];
  }, [proxiedGlbUrl, images]);

  if (isGlbLoading) {
    return (
      <div className="relative h-[450px] w-full flex flex-col items-center justify-center gap-2 rounded-2xl border bg-gray-100 animate-pulse">
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!allSlides.length) return null;

  return (
    <div className="w-full space-y-4">
      {/* MAIN SLIDER */}
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        className="sm:h-80 md:h-[450px] w-full rounded-2xl border bg-white overflow-hidden shadow-sm"
      >
        {allSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            {slide.type === "3d" ? (
              <ThreeDModel glbUrl={slide.src} fallback={FALLBACK_IMAGE} />
            ) : (
              <div className="relative w-full h-full min-h-[320px]">
                <Image
                  src={slide.src}
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

      {/* THUMB SLIDER */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className="h-20 w-full"
      >
        {allSlides.map((slide, i) => (
          <SwiperSlide key={i} className="cursor-pointer">
            <div className="relative h-full w-full rounded-xl border-2 overflow-hidden transition-all [.swiper-slide-thumb-active_&]:border-amber-500">
              <Image
                src={slide.type === "3d" ? FALLBACK_IMAGE : slide.src}
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
