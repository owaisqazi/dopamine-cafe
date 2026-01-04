'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/sections/PageHeader';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import ShoppingCart from '@/components/sections/ShoppingCart';

export default function page() {
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
    <main className="min-h-screen bg-white">
     <Navbar scrolled={scrolled} scrollToSection={scrollToSection} /> 
      <PageHeader title={"shoping Cart"} backgroundVideo = {"/about.mp4"}/>
      <ShoppingCart />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
