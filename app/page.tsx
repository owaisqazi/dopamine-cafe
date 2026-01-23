"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import HomeAbout from "@/components/sections/HomeAbout";
import Gallery from "@/components/sections/HomeGallery";
import Footer from "@/components/sections/Footer";
import HomeManu from "@/components/sections/menu/HomeManu";
import ReviewTestimonials from "@/components/sections/ReviewTestimonials";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar/Navbar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* FIXED BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-[url('/main.jpeg')] bg-cover bg-center bg-no-repeat" />

      {/* OPTIONAL DARK OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-[#fdeabf]/40" />

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
