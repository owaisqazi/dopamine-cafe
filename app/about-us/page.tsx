"use client";
import React from "react";
import PageHeader from "@/components/sections/PageHeader";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { IMAGE_BASE_URL } from "@/components/auth/axiosInstance";
import { useGetByHomeAboutQuery } from "@/store/api/authApi";

export default function Home() {
  const { data, isLoading } = useGetByHomeAboutQuery();
  const items = data?.data || [];
  const video = (IMAGE_BASE_URL + items?.video) || "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      <PageHeader
        isLoading={isLoading}
        title={"About Us"}
        backgroundVideo={video || "/about.mp4"}
      />
      <About />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
