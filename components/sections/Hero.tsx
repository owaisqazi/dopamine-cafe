/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import AuthForm from "../forms/AuthForm";
import { useGetByHomeImageQuery } from "@/store/api/authApi";

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const bannerImages = [
  {
    url: "/banner.jpeg",
    title: "Your Daily Dose of Join Now",
    subtitle: "Dopamine Cafe",
  },
  {
    url: "/banner2.png",
    title: "Happiness Starts With a Cup",
    subtitle: "Dopamine Cafe",
  },
];

export default function Hero({ scrollToSection }: HeroProps) {
   const { data, isLoading } = useGetByHomeImageQuery();
      const items = data?.data || [];
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  console.log(items, "Hero Image Data===>");
  /* AUTOPLAY */
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % bannerImages.length),
      9000
    );
    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <section
      id="home"
      className="relative md:h-screen overflow-hidden"
      aria-label="Hero Section"
    >
      {/* SEO IMAGES (hidden but indexable) */}
      <div className="sr-only">
        {bannerImages.map((img, i) => (
          <img key={i} src={img.url} alt={`${img.subtitle} banner`} />
        ))}
      </div>

      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <main className="relative z-10 container mx-auto h-full flex items-center px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center py-20">

          {/* TEXT */}
          <header className="max-w-xl">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === current
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 absolute"
                }`}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  {image.title}
                </h1>
                <p className="mt-4 text-xl text-amber-200">
                  {image.subtitle}
                </p>
              </div>
            ))}
          </header>

          {/* AUTH FORM */}
          <aside className="bg-white shadow-[0px_-3px_14px_4px_gray] rounded-2xl p-8 max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>
            <AuthForm
              isSignup={isSignup}
              toggleSignup={() => setIsSignup(!isSignup)}
            />
          </aside>
        </div>
      </main>

      {/* SLIDER CONTROLS */}
      <button
        aria-label="Previous banner"
        onClick={() =>
          setCurrent((c) => (c - 1 + bannerImages.length) % bannerImages.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        aria-label="Next banner"
        onClick={() =>
          setCurrent((c) => (c + 1) % bannerImages.length)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* SCROLL CTA */}
      <button
        aria-label="Scroll to menu"
        onClick={() => scrollToSection("menu")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce"
      >
        <ChevronDown size={36} />
      </button>
    </section>
  );
}
