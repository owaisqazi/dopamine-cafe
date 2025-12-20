'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/sections/Hero';
import Menu from '@/components/sections/Menu';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';

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
      <Menu />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
