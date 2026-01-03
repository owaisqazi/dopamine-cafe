'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/NewGallery';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import HomeManu from '@/components/sections/HomeManu';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar scrolled={scrolled} scrollToSection={scrollToSection} /> 
      <Hero scrollToSection={scrollToSection} />
      <HomeManu />
      <Gallery />
      <About />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
