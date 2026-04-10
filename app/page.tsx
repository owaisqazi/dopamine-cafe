import dynamic from "next/dynamic";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import ToastProvider from "@/components/ToastProvider";

// ✅ Lazy sections
const HomeManu = dynamic(() => import("@/components/sections/menu/HomeManu"), {
  ssr: false,
});

const Gallery = dynamic(() => import("@/components/sections/HomeGallery"), {
  ssr: false,
});

const HomeAbout = dynamic(() => import("@/components/sections/HomeAbout"), {
  ssr: false,
});

const ReviewTestimonials = dynamic(
  () => import("@/components/sections/ReviewTestimonials"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white">

      {/* ✅ FIX: remove fixed LCP killer layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/main.jpeg"
          alt="background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <Navbar />

      {/* ✅ Hero should be LCP priority */}
      <Hero />

      {/* Lazy loaded sections */}
      <HomeManu />
      <Gallery />
      <HomeAbout />
      <ReviewTestimonials />

      <Footer />
      <ToastProvider />
    </main>
  );
}