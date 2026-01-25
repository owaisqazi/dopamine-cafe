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
  ChevronRight,
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
import { useDispatch } from "react-redux";
import { updateQuantity } from "@/store/cartSlice";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import { selectCartSubtotal } from "@/store/cartSelectors";
import DeleteModal from "../sections/menu/DeleteModal";
import CartDrawer from "../sections/product/CartDrawer";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const subtotal = useSelector(selectCartSubtotal);
  const [deleteId, setDeleteId] = useState<any | null>(null);
  const [optionsKeyData, setOptionsKeyData] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("Select Location");

  // NEW STATES FOR SCROLL LOGIC
  const [isVisible, setIsVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    // Agar location already selected nahi hai
    const hasSession = sessionStorage.getItem("location_session");
    const hasCookie = Cookies.get("user_location");

    if (!hasSession && !hasCookie) {
      setShowLocationModal(true);
    }
  }, []);

  const syncLocation = () => {
    const loc = Cookies.get("user_location");
    const parsed = loc ? JSON.parse(loc) : {};
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
    { name: "Special Menu", href: "/#menu-item", isScroll: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Pehle check karein ke hum Home page par hain ya nahi
    if (window.location.pathname === "/") {
      e.preventDefault();
      const target = document.getElementById("menu-item");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out
    ${isVisible ? "translate-y-0" : "-translate-y-full"} 
    ${
      isTransparent
        ? "bg-transparent border-transparent"
        : "bg-transparent backdrop-blur-sm border-b border-gray-100 shadow-sm"
    }`}
      >
        <div className="flex items-center md:hidden justify-between px-4 py-2 text-sm font-semibold">
          <button
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-1"
          >
            <MapPin size={16} className="text-[#FFEABF]" />
            <span className="truncate max-w-[140px] text-[#FFEABF]">
              {displayLocation}
            </span>
          </button>

          <Link
            href="/#menu-item"
            onClick={handleScroll}
            className="bg-[#2A2A28] hover:bg-[#3a3a37] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase"
          >
            Order Now
          </Link>
        </div>
        <div className="container mx-auto px-4 md:h-20 h-18 flex justify-between items-center relative">
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

            {/* Desktop Location & Contact: visible only on md+ screens */}
            <div className="hidden md:flex items-center gap-6">
              {/* Change Location Button */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-3 group"
              >
                <MapPin
                  className={isTransparent ? "text-white" : "text-[#FFEABF]"}
                  size={24}
                />
                <div
                  className={`flex flex-col text-left ${
                    isTransparent ? "text-white" : "text-black"
                  }`}
                >
                  <span className="font-bold text-[10px] lg:text-sm uppercase">
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

              {/* Vertical Divider */}
              <div
                className={`h-10 w-[1px] ${
                  isTransparent ? "bg-white/30" : "bg-gray-300"
                }`}
              ></div>

              {/* Contact Section */}
              <div className="flex items-center gap-4">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923002444443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Phone
                    className={isTransparent ? "text-white" : "text-[#25D366]"}
                    size={20}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`font-bold text-[10px] lg:text-sm uppercase ${
                        isTransparent ? "text-white" : "text-black"
                      }`}
                    >
                      WhatsApp
                    </span>
                    <span
                      className={`text-xs ${
                        isTransparent ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      +92-300-2444443
                    </span>
                  </div>
                </a>

                {/* Call */}
                <a
                  href="tel:02137229364"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Phone
                    className={isTransparent ? "text-white" : "text-blue-500"}
                    size={20}
                  />
                  <div className="flex flex-col">
                    <span
                      className={`font-bold text-[10px] lg:text-sm uppercase ${
                        isTransparent ? "text-white" : "text-black"
                      }`}
                    >
                      Call Us
                    </span>
                    <span
                      className={`text-xs ${
                        isTransparent ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      021-37229364
                    </span>
                  </div>
                </a>
              </div>
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
            {/* ORDER NOW DESKTOP */}
            <Link
              href="/#menu-item"
              onClick={handleScroll}
              scroll={true}
              className={`hidden md:flex px-5 py-2 rounded-full font-bold uppercase text-sm
              ${
                isTransparent
                  ? "bg-[#2A2A28] hover:bg-[#3a3a37] text-white"
                  : "bg-[#2A2A28] hover:bg-[#3a3a37] text-white"
              }`}
            >
              Order Now
            </Link>
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
                    : "text-[#FFEABF] hover:bg-gray-100"
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

                  <Link href="/my-orders">
                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#1C1C19] hover:text-white">
                    My Orders
                  </button>
                  </Link>

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

            <button
              onClick={() => setIsCartOpen(true)}
              type="button"
              className={`relative flex flex-col items-center gap-1 group ${
                isTransparent ? "text-white" : "text-black"
              }`}
            >
              <div className="relative">
                <ShoppingCart
                  className={isTransparent ? "text-white" : "text-[#FFEABF]"}
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
            </button>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-1 rounded-md transition-colors ${
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-[#FFEABF] hover:bg-gray-100"
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
                      className={`text-lg font-medium block border-b border-transparent hover:border-[rgb(42,42,40)] transition-all ${
                        pathname === link.href
                          ? "text-[#2A2A28] border-b border-transparent border-[rgb(42,42,40)] font-bold"
                          : "text-gray-700"
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
      {/* FLOATING BOTTOM CART BAR */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            className="bg-[#2A2A28] hover:bg-[#3a3a37] w-full text-white flex items-center justify-between px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition-all active:scale-95 group"
          >
            <div className="flex items-center gap-4">
              {/* Item Count Circle */}
              <div className="w-8 h-8 bg-white text-[#2A2A28] rounded-full flex items-center justify-center font-bold text-sm">
                {cartItems.length}
              </div>
              <span className="font-bold text-lg tracking-wide uppercase">
                View Cart
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">
                Rs. {subtotal.toFixed(2)}
              </span>
              <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          </button>
        </div>
      )}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        subtotal={subtotal}
        onDeleteRequest={(id, optionsKey) => {
          setDeleteId(id);
          setOptionsKeyData(optionsKey);
        }}
      />

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
      {deleteId && (
        <DeleteModal
          productId={deleteId} // Navbar mein aap 'item.id' bhej rahe hain
          optionsKeyData={optionsKeyData}
          type={"cart"}
          onClose={() => setDeleteId(null)}
        />
      )}
    </>
  );
};

export default Navbar;
