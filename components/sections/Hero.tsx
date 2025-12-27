'use client';

import { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Mail,
  Lock,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const bannerImages = [
  {
    url: './banner.jpeg',
    title: 'Your Daily Dose of Happiness',
    subtitle: 'Dopamine Cafe',
  },
  {
    url: './banner2.png',
    title: 'Happiness Starts With a Cup',
    subtitle: 'Dopamine Cafe',
  },
];


export default function Hero({ scrollToSection }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <section className="relative md:h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container md:py-0 py-8 mx-auto h-full flex items-center px-6">
        <div className="grid  grid-cols-1 md:py-0 py-20 lg:grid-cols-2 gap-16 w-full items-center">

          {/* LEFT : TEXT */}
          <div className="text-left max-w-xl " data-aos="fade-up">
            {bannerImages.map((image, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === current
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6 absolute'
                }`}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {image.title}
                </h1>

                <p className="mt-4 text-xl text-amber-200">
                  {image.subtitle}
                </p>
              </div>
            ))}

            <div className="mt-10 flex gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('menu')}
                className="bg-amber-600 hover:bg-amber-700 px-8 py-6 text-lg cursor-pointer"
              >
                Explore Menu
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-white cursor-pointer hover:bg-slate-200 text-[#666] px-8 py-6 text-lg"
              >
                Visit Us
              </Button>
            </div>
          </div>

          {/* RIGHT : LOGIN / SIGNUP */}
          <div data-aos="fade-up" className="bg-[#fff]  rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h3>

            <form className="space-y-5">
              {isSignup && (
                <div className="flex items-center gap-3 border-b pb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    autoComplete='off'
                    className="w-full outline-none"
                  />
                </div>
              )}

              <div className="flex items-center gap-3 border-b pb-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email Address"
                  autoComplete='off'
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center gap-3 border-b pb-2">
                <Lock className="w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete='off'
                  className="w-full outline-none"
                />
              </div>

              <Button className="w-full bg-amber-600 hover:bg-amber-700 mt-4">
                {isSignup ? 'Sign Up' : 'Login'}
              </Button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-6">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-amber-600 ml-1 font-medium"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* SLIDER CONTROLS */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
        }
        className="absolute  left-6 top-1/2 -translate-y-1/2 text-white bg-white/20 p-3 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % bannerImages.length)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white bg-white/20 p-3 rounded-full"
      >
        <ChevronRight />
      </button>

      <button
        onClick={() => scrollToSection('menu')}
        className="absolute bottom-8 md:left-1/2 left-[48%] -translate-x-1/2 text-amber-400 animate-bounce"
      >
        <ChevronDown size={36} />
      </button>
    </section>
  );
}
