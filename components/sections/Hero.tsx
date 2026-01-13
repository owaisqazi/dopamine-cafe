/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import AuthForm from "../forms/AuthForm";
import SkeletonLoader from "../Skeleton/SkeletonLoader";
//@ts-ignore
import Cookies from "js-cookie"; 

const slides = [
  {
    image: "/banner.jpeg",
    title: "Your Daily Dose of Join Now",
    subtitle: "Dopamine Cafe",
  },
  {
    image: "/banner2.png",
    title: "Happiness Starts With a Cup",
    subtitle: "Dopamine Cafe",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = Cookies.get("token");
    setToken(t);
    setLoading(false);
  }, []);

  /* Autoplay */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides?.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <SkeletonLoader type="hero" />;

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        {slides?.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${slide?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <main className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <div
          className={`w-full md:flex items-center ${
            token ? "justify-center" : "justify-between md:mx-20 max-w-7xl"
          }`}
        >
          {/* Text */}
          <div
            className={`relative ${
              token ? "text-center w-full" : "md:w-full max-w-xl min-h-[260px]"
            }`}
          >
            {slides?.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === current
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <h1 className="text-4xl md:text-6xl md:pt-0 pt-20 lg:text-7xl font-bold text-white leading-tight">
                  {slide?.title}
                </h1>
                <p className="mt-4 text-xl text-amber-300">
                  {slide?.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Auth Form */}
          {!token && (
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-center mb-6">
                {isSignup ? "Create Account" : "Welcome Back"}
              </h2>
              <AuthForm
                isSignup={isSignup}
                toggleSignup={() => setIsSignup(!isSignup)}
              />
            </div>
          )}
        </div>
      </main>

      {/* Controls */}
      <button
        onClick={() =>
          setCurrent((c) => (c - 1 + slides?.length) % slides?.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full z-20"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={() => setCurrent((c) => (c + 1) % slides?.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full z-20"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Scroll icon */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce z-20">
        <ChevronDown size={36} />
      </div>
    </section>
  );
}
