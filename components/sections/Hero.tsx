'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  scrollToSection: (id: string) => void;
}

const bannerImages = [
  {
    url: './banner.jpeg',
    title: 'Premium Coffee',
    subtitle: 'Crafted to perfection',
  },
  {
    url: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Cozy Atmosphere',
    subtitle: 'Your happy place awaits',
  },
  // {
  //   url: 'https://images.pexels.com/photos/1442512/pexels-photo-1442512.jpeg?auto=compress&cs=tinysrgb&w=1920',
  //   title: 'Delicious Treats',
  //   subtitle: 'Taste the joy',
  // },
  // {
  //   url: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1920',
  //   title: 'Artisanal Brews',
  //   subtitle: 'Every cup tells a story',
  // },
];

export default function Hero({ scrollToSection }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % bannerImages.length);
    setAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setAutoPlay(false);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${image.url})`,
              }}
            >
              <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-t from-amber-900/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="overflow-hidden mb-6">
          {bannerImages.map((image, index) => (
            <h1
              key={`title-${index}`}
              className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white transition-all duration-700 transform ${
                index === current
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-full'
              }`}
            >
              {image.title}
            </h1>
          ))}
        </div>

        <div className="overflow-hidden mb-8">
          {bannerImages.map((image, index) => (
            <p
              key={`subtitle-${index}`}
              className={`text-lg md:text-2xl text-amber-100 transition-all duration-700 transform ${
                index === current
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-full'
              }`}
            >
              {image.subtitle}
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
          <Button
            size="lg"
            onClick={() => scrollToSection('menu')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Explore Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="border-2 border-white hover:text-white  text-amber-600 px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
          >
            Visit Us
          </Button>
        </div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 rounded-full transition-all duration-500 ${
              index === current
                ? 'w-8 bg-amber-500'
                : 'w-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => scrollToSection('menu')}
        onMouseEnter={() => setAutoPlay(true)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hover:text-white text-amber-500 animate-bounce cursor-pointer z-20"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </section>
  );
}
