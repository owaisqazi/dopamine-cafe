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

export default function HomePage() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  useEffect(() => {
    const locationCookie = Cookies.get("user_location");
    const locationSession = sessionStorage.getItem("location_session");

    if (!locationCookie && !locationSession) {
      setShowLocationModal(true);
    }
    const cookieSession = sessionStorage.getItem("cookie_modal_closed");
    if (!cookieSession) {
      setCookieModalOpen(true);
    }
  }, []);

  const handleCloseLocationModal = () => {
    setShowLocationModal(false);
    sessionStorage.setItem("location_session", "true");
  };

  const handleCloseCookieModal = () => {
    setCookieModalOpen(false);
    sessionStorage.setItem("cookie_modal_closed", "true");
  };
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Location Modal */}
      <Modal
        isOpen={showLocationModal}
        onClose={handleCloseLocationModal}
        maxWidth="max-w-xl"
      >
        <OrderTypeContent onClose={handleCloseLocationModal} />
      </Modal>

      {/* Navbar */}
      <Navbar onLocationClick={() => setShowLocationModal(true)} />

      {/* Main Sections */}
      <Hero />
      <HomeManu />
      <Gallery />
      <HomeAbout />
      <ReviewTestimonials />
      <Toaster position="top-right" />

      {/* Footer with cookie modal */}
      <Footer
        cookieModalOpen={cookieModalOpen}
        onCloseCookieModal={handleCloseCookieModal}
      />
    </main>
  );
}
