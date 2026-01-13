'use client';

import React from 'react';
import Hero from '@/components/sections/Hero';
import HomeAbout from '@/components/sections/HomeAbout';
import Gallery from '@/components/sections/HomeGallery';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";
import HomeManu from '@/components/sections/HomeManu';
import ReviewTestimonials from '@/components/ui/ReviewTestimonials';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar /> 
      <Hero />
      <HomeManu />
      <Gallery />
      <HomeAbout />
      <ReviewTestimonials />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
