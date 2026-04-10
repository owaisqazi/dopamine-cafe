import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/sections/Footer";

// ✅ Hero SSR (important for LCP)
import Hero from "@/components/sections/Hero";
import ToastProvider from "@/components/ToastProvider";

// ✅ Lazy load heavy sections
const HomeManu = dynamic(() => import("@/components/sections/menu/HomeManu"), {
  loading: () => <p className="text-center py-10">Loading...</p>,
});

const Gallery = dynamic(() => import("@/components/sections/HomeGallery"), {
  loading: () => <p className="text-center py-10">Loading...</p>,
});

const HomeAbout = dynamic(() => import("@/components/sections/HomeAbout"), {
  loading: () => <p className="text-center py-10">Loading...</p>,
});

const ReviewTestimonials = dynamic(
  () => import("@/components/sections/ReviewTestimonials"),
  {
    loading: () => <p className="text-center py-10">Loading...</p>,
  },
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ✅ Optimized Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/main.jpeg"
          alt="background"
          fill
          priority
          quality={70}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#e2e2e2a6]/40" />
      </div>

      {/* Content */}
      <Navbar />
      <Hero />

      {/* Lazy sections */}
      <HomeManu />
      <Gallery />
      <HomeAbout />
      <ReviewTestimonials />

      <Footer />
      <ToastProvider />
    </main>
  );
}
