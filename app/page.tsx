"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import HomeAbout from "@/components/sections/HomeAbout";
import Gallery from "@/components/sections/HomeGallery";
import Footer from "@/components/sections/Footer";
import HomeManu from "@/components/sections/HomeManu";
import ReviewTestimonials from "@/components/sections/ReviewTestimonials";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdeabf]">
      <Navbar />
      <Hero />
      <HomeManu />
      <Gallery />
      <HomeAbout />
      <ReviewTestimonials />
      <Toaster position="top-right" />
      <Footer />
    </main>
  );
}
