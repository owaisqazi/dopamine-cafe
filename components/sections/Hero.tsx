/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import SkeletonLoader from "../Skeleton/SkeletonLoader";

const slides = [
  {
    image: "/banner.jpeg",
    title: "Your Daily Dose of Join Now",
    subtitle: "The Dopamine Cafe",
  },
  {
    image: "/banner2.png",
    title: "Happiness Starts With a Cup",
    subtitle: "The Dopamine Cafe",
  },
];

const sideImages = [
  { id: 1, image: "/banner-image-hero.png" },
  { id: 2, image: "/banner-image-hero2.png" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  /* Autoplay */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 9000);

    return () => clearInterval(timer);
  }, []);

  if (loading) return <SkeletonLoader type="hero" />;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <main className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div className="w-full md:flex items-center justify-between md:mx-20 max-w-7xl mt-10 md:mt-20">
          {/* Text */}
          <div className="relative md:w-full max-w-xl min-h-[260px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === current
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <h1 className="text-4xl md:text-6xl pt-20 md:pt-0 lg:text-7xl font-bold text-white leading-tight">
                  {slide.title}
                </h1>
                <p className="mt-4 text-xl text-[#C7862F]">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Side Image (always visible now) */}
          <img
            src={sideImages[current]?.image}
            alt={`Side Image ${current + 1}`}
            className="rounded-2xl object-cover w-full max-w-md h-auto shadow-lg"
          />
        </div>
      </main>

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent((c) => (c - 1 + slides.length) % slides.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 md:block hidden bg-white/20 p-3 rounded-full z-20"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={() => setCurrent((c) => (c + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full z-20 md:block hidden"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Scroll icon */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:block hidden text-[#C7862F] animate-bounce z-20">
        <ChevronDown size={36} />
      </div>
    </section>
  );
}
