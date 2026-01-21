/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  ShoppingCart,
  Menu as MenuIcon,
  X,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
//@ts-ignore
import Cookies from "js-cookie";
import Modal from "../ui/Modal";
import OrderTypeContent from "../order-manager-city/OrderTypeContent";
import AuthForm from "../forms/AuthForm";

const Navbar = () => {
  const pathname = usePathname();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [token, setToken] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("Select Location");

  // NEW STATES FOR SCROLL LOGIC
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);
  const lastScrollY = useRef(0);

  const syncLocation = () => {
    const loc = Cookies.get("user_location");
    const parsed = JSON.parse(loc);
    console.log(parsed, "parsed==>");
    if (parsed?.area) {
      try {
        setDisplayLocation(parsed.area);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const t = Cookies.get("token");
    setToken(t);
  }, []);
  useEffect(() => {
    // initial load par bhi location read karo
    syncLocation();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsTransparent(currentScrollY <= 50);
      setIsVisible(currentScrollY <= 0);

      lastScrollY.current = currentScrollY;
    };

    // ✅ ADD event listener
    window.addEventListener("locationUpdated", syncLocation);
    window.addEventListener("scroll", handleScroll);

    return () => {
      // ✅ REMOVE properly
      window.removeEventListener("locationUpdated", syncLocation);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* HEADER WITH DYNAMIC CLASSES */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
    ${isVisible ? "translate-y-0" : "-translate-y-full"} 
    ${
      isTransparent
        ? "bg-transparent border-transparent"
        : "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
    }`}
      >
        <div className="container mx-auto px-4 h-20 flex justify-between items-center relative">
          {/* LEFT SIDE: Mobile mein Logo / Desktop mein Location */}
          <div className="flex items-center">
            {/* Mobile Logo: Sirf 'md' screen se niche nazar ayega */}
            <div className="md:hidden">
              <Link href="/">
                <Image
                  src="/dopamine_cafe.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="h-12 w-12 rounded-full object-contain"
                />
              </Link>
            </div>

            {/* Desktop Location & Contact: Sirf 'md' screen se uper nazar ayega */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-3 group"
              >
                <MapPin
                  className={isTransparent ? "text-white" : "text-[#f59e0b]"}
                  size={24}
                />
                <div
                  className={`flex flex-col text-left ${
                    isTransparent ? "text-white" : "text-black"
                  }`}
                >
                  <span className="font-bold text-sm uppercase text-[10px] lg:text-sm">
                    Change Location
                  </span>
                  <span
                    className={`text-xs ${
                      isTransparent ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {displayLocation}
                  </span>
                </div>
              </button>
              <div
                className={`h-10 w-[1px] mx-2 ${
                  isTransparent ? "bg-white/30" : "bg-gray-300"
                }`}
              ></div>
              <a
                href="https://wa.me/923002444443"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <Phone
                  className={isTransparent ? "text-white" : "text-[#f59e0b]"}
                  size={24}
                />
                <div
                  className={`flex flex-col ${
                    isTransparent ? "text-white" : "text-black"
                  }`}
                >
                  <span className="font-bold text-sm uppercase text-[10px] lg:text-sm">
                    Contact Us
                  </span>
                  <span
                    className={`text-xs ${
                      isTransparent ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    +92-300-2444-443
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* CENTER: Logo (Sirf Desktop ke liye) */}
          <div className="hidden md:flex absolute top-2 left-1/2 -translate-x-1/2 items-center justify-center">
            <Link href="/">
              <Image
                src="/dopamine_cafe.png"
                alt="Logo"
                width={100}
                height={100}
                className={`rounded-full object-contain transition-all duration-500 ease-in-out
            ${isTransparent ? "h-20 md:h-28 w-auto" : "h-10 md:h-16 w-auto"}
          `}
                priority
              />
            </Link>
          </div>

          {/* RIGHT: Icons & Menu Bar (Dono views mein right par rahega) */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative">
              <button
                onClick={() => {
                  if (token) {
                    setIsUserMenuOpen((prev) => !prev);
                  } else {
                    setShowAuthModal(true);
                  }
                }}
                className={`p-1 rounded-full transition-colors ${
                  isTransparent
                    ? "text-white hover:bg-white/10"
                    : "text-[#f59e0b] hover:bg-gray-100"
                }`}
              >
                <User size={28} className="ps-2" />
                <span className="text-[10px] font-bold uppercase hidden md:block">
                  Profile
                </span>
              </button>

              {/* ✅ USER DROPDOWN (only when logged in) */}
              {token && isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-44 bg-[#FFEABF] rounded-xl shadow-xl overflow-hidden z-50">
                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#1C1C19] hover:text-white">
                    My Profile
                  </button>

                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#1C1C19] hover:text-white">
                    My Orders
                  </button>

                  <button
                    onClick={() => {
                      Cookies.remove("token");
                      setIsUserMenuOpen(false);
                      window.location.reload();
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-[#1C1C19] hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/shopping"
              className={`relative flex flex-col items-center gap-1 group ${
                isTransparent ? "text-white" : "text-black"
              }`}
            >
              <div className="relative">
                <ShoppingCart
                  className={isTransparent ? "text-white" : "text-[#f59e0b]"}
                  size={28}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase hidden md:block">
                Cart
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-1 rounded-md transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#f59e0b] hover:bg-gray-100"
              }`}
            >
              <MenuIcon size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* RIGHT SIDE OFF-CANVAS SIDEBAR */}
      <div
        className={`fixed inset-0 z-[100] ${
          isSidebarOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[300px] bg-[#FFEABF] shadow-2xl transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold uppercase tracking-widest">
                Menu
              </h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X size={28} className="text-gray-500 hover:text-black" />
              </button>
            </div>

            <nav>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`text-lg font-medium block border-b border-transparent hover:border-[#f59e0b] transition-all ${
                        pathname === link.href
                          ? "text-[#f59e0b] font-bold"
                          : "text-gray-800"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {token && (
                  <li>
                    <button
                      onClick={() => {
                        Cookies.remove("token");
                        window.location.reload();
                      }}
                      className="text-lg font-medium text-red-600 uppercase"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Spacer removed because header is transparent and overlaying the hero section */}

      <Modal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        maxWidth="max-w-xl"
      >
        <OrderTypeContent onClose={() => setShowLocationModal(false)} />
      </Modal>
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        maxWidth="max-w-md"
      >
        <div className="relative bg-[#FFEABF] shadow-xl rounded-2xl p-8 w-full max-w-md">
          {/* ❌ Close Button */}
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          <AuthForm
            isSignup={isSignup}
            toggleSignup={() => setIsSignup(!isSignup)}
          />
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
