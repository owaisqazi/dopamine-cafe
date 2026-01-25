"use client";
import PageHeader from "@/components/sections/PageHeader";
import Menu from "@/components/sections/Menu";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { IMAGE_BASE_URL } from "@/components/auth/axiosInstance";
import { useGetByHomeAboutQuery } from "@/store/api/authApi";

export default function Home() {
  const { data, isLoading } = useGetByHomeAboutQuery();
  const items = data?.data || [];
  const video = IMAGE_BASE_URL + items?.video || "/manus.mp4";

  return (
    <main className="relative min-h-screen">

      {/* FIXED BACKGROUND IMAGE/VIDEO */}
      <div className="fixed inset-0 -z-10">
        {video ? (
          <video
            src={video}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[url('/main.jpeg')] bg-cover bg-center" />
        )}
      </div>

      {/* OPTIONAL OVERLAY */}
      <div className="fixed inset-0 -z-10 bg-[#fdeabf]/40" />

      <Navbar />

      <PageHeader
        isLoading={isLoading}
        title="Our Menu"
        backgroundVideo={video || "/manus.mp4"}
      />

      <Menu />
      <Footer />

      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
