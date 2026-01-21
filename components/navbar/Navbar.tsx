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
  Plus,
  Trash2,
  Minus,
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
import { updateQuantity, removeFromCart } from "@/store/cartSlice";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  console.log(cartItems, "cartItems==>");
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
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      //@ts-ignore
      const itemBasePrice = Number(item.price || item.base_price || 0);
      const optionsPrice =
        item.options?.reduce((optTotal: number, opt: any) => {
          return optTotal + Number(opt.price_modifier || 0);
        }, 0) || 0;
      return total + (itemBasePrice + optionsPrice) * (item.quantity || 1);
    }, 0);
  };

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

            <button
              onClick={() => setIsCartOpen(true)}
              type="button"
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
            </button>
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
      {/* FLOATING BOTTOM CART BAR */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            className="bg-[#f59e0b] hover:bg-[#d97706] w-full text-white flex items-center justify-between px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition-all active:scale-95 group"
          >
            <div className="flex items-center gap-4">
              {/* Item Count Circle */}
              <div className="w-8 h-8 bg-white text-[#f59e0b] rounded-full flex items-center justify-center font-bold text-sm">
                {cartItems.length}
              </div>
              <span className="font-bold text-lg tracking-wide uppercase">
                View Cart
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">
                Rs. {calculateTotal().toFixed(2)}
              </span>
              <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </div>
          </button>
        </div>
      )}
      {/* Spacer removed because header is transparent and overlaying the hero section */}
      {/* cart  */}
      {/* CART DRAWER OVERLAY */}
      <div
        className={`fixed inset-0 z-[100] ${
          isCartOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop shadow */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isCartOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsCartOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="bg-[#d97706] text-white rounded-full p-1 hover:rotate-90 transition-transform"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[calc(100vh-250px)]">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const optionsTotal =
                  item.options?.reduce(
                    (acc: number, opt: any) => acc + Number(opt.price_modifier),
                    0,
                  ) || 0;
                const itemTotal =
                  (Number(item.price) + optionsTotal) * item.quantity;

                return (
                  <div key={item.id} className="border-b pb-6 last:border-0">
                    <div className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border">
                        <Image
                          src={IMAGE_BASE_URL + item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-800">
                            {item.name}
                          </h3>
                          {/* Quantity Selector inside cart */}
                          <div className="flex items-center gap-3 border rounded-full px-3 py-1 text-[#d97706]">
                            {/* MINUS / DELETE BUTTON */}
                            <button
                              className="text-red-500"
                              onClick={() => {
                                if (item.quantity === 1) {
                                  dispatch(removeFromCart(item.id));
                                } else {
                                  dispatch(
                                    updateQuantity({ id: item.id, change: -1 }),
                                  );
                                }
                              }}
                            >
                              {item.quantity === 1 ? (
                                <Trash2 size={14} />
                              ) : (
                                <Minus size={14} />
                              )}
                            </button>

                            <span className="font-bold text-sm text-black">
                              {item.quantity}
                            </span>

                            {/* PLUS BUTTON */}
                            <button
                              className="text-[#d97706]"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({ id: item.id, change: 1 }),
                                )
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="font-bold text-[#d97706]">
                          Rs. {Number(item.price).toFixed(1)}
                        </p>

                        {/* Options List */}
                        {item.options?.map((opt: any) => (
                          <div
                            key={opt.id}
                            className="text-xs text-gray-500 flex justify-between mt-1"
                          >
                            <span>+ {opt.name}</span>
                            {Number(opt.price_modifier) > 0 && (
                              <span>Rs. {opt.price_modifier}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 text-gray-400">
                Cart is empty
              </div>
            )}

            {/* Add more items link */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex items-center gap-2 text-gray-500 font-medium hover:text-[#d97706]"
            >
              <Plus size={18} /> Add more items
            </button>
          </div>

          {/* Footer Section */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t space-y-4">
            <div className="flex justify-between items-center text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-bold">Rs. 250.0</span>
            </div>

            <button className="w-full bg-[#d97706] hover:bg-[#b96404] text-white py-4 rounded-2xl flex justify-between items-center px-6 font-bold transition-all shadow-lg">
              <span className="text-lg">Checkout</span>
              <div className="flex items-center gap-2">
                <span>Rs. {(calculateTotal() + 250).toFixed(1)}</span>
                <ChevronRight size={20} />
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* CART DRAWER OVERLAY */}
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
