/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ShoppingCart, X, Menu as MenuIcon } from "lucide-react"; // Menu icon import kiya
import Link from "next/link"; // Link import kiya navigation ke liye
import { usePathname } from "next/navigation"; // Current page check karne ke liye

interface NavbarProps {
  scrolled: boolean;
  scrollToSection: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled ,scrollToSection}) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Ye batayega aap kis page par hain

  const cartItems = [
    { name: "Cafe Latte", price: "$160", qty: 1 },
    { name: "Mocha", price: "$180", qty: 2 },
  ];

  // Nav Links Array
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || pathname !== "/" // Home ke ilawa baaki pages par hamesha white background
            ? "bg-white/95 backdrop-blur-md shadow-lg py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/dopamine_cafe.png"
              className="h-16 w-16 md:h-20 md:w-20 rounded-full"
              alt="Dopamine Cafe"
              width={80}
              height={80}
            />
          </Link>

          {/* DESKTOP MENU - Link Tags Added */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-all duration-300 hover:scale-110 ${
                  scrolled || pathname !== "/"
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-200"
                } ${pathname === link.href ? "text-amber-600 font-bold" : ""}`}
              >
                {link.name}
              </Link>
            ))}

            {/* CART TRIGGER */}
            <button onClick={() => setCartOpen(true)} className="relative ml-4">
              <ShoppingCart
                className={`w-6 h-6 ${
                  scrolled || pathname !== "/" ? "text-gray-700" : "text-white"
                }`}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className={scrolled || pathname !== "/" ? "text-gray-700" : "text-white"} />
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon className={scrolled || pathname !== "/" ? "text-gray-700" : "text-white"} />
            </button>
          </div>
        </div>

        {/* MOBILE MENU - Links added */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full top-full left-0 border-t">
            <div className="flex flex-col items-center py-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium ${pathname === link.href ? "text-amber-600" : "text-gray-700"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* CART SIDEBAR (Wahi rahega jo aapka pehle tha) */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex justify-end">
          <div className="w-full sm:w-96 bg-white h-full p-6 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Your Cart</h3>
              <button onClick={() => setCartOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            {/* ... Cart items mapping code ... */}
            <button className="w-full mt-8 bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition">
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;