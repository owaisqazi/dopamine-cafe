import React from 'react';
import PageHeader from '@/components/sections/PageHeader';
import About from '@/components/sections/About';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
     <Navbar />
      <PageHeader title={"About Us"} backgroundVideo = {"/about.mp4"}/>
      <About />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
