"use client";
import React, { useEffect, useState } from "react";
//@ts-ignore
import Cookies from "js-cookie";
import Hero from "@/components/sections/Hero";
import HomeAbout from "@/components/sections/HomeAbout";
import Gallery from "@/components/sections/HomeGallery";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import HomeManu from "@/components/sections/HomeManu";
import ReviewTestimonials from "@/components/sections/ReviewTestimonials";

import Modal from "@/components/ui/Modal";
import OrderTypeContent from "@/components/order-manager-city/OrderTypeContent";

export default function Home() {
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const locationCookie = Cookies.get("user_location");
    const sessionActive = sessionStorage.getItem("location_session");
    if (!locationCookie || !sessionActive) {
      setShowLocationModal(true);
    } else {
      setShowLocationModal(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Modal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        maxWidth="max-w-xl"
      >
        {[
          <OrderTypeContent
            key="location"
            onClose={() => setShowLocationModal(false)}
          />
        ]}
      </Modal>
      <>
        <Navbar />
        <Hero />
        <HomeManu />
        <Gallery />
        <HomeAbout />
        <ReviewTestimonials />
        <Toaster position="top-right" />
        {!showLocationModal && <Footer />}
      </>
    </main>
  );
}
