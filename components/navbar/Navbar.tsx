/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ShoppingCart, X, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axiosInstance from "../auth/axiosInstance";

interface NavbarProps {
  scrolled: boolean;
  scrollToSection: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const pathname = usePathname();

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const cartItems = [
    { name: "Cafe Latte", price: "$160", qty: 1 },
    { name: "Mocha", price: "$180", qty: 2 },
  ];

  // 🔹 Main Category API
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axiosInstance.get("/user/main-category");
        setCategories(res.data?.data || []);
        console.log("Category API res:", res);
      } catch (error) {
        console.log("Category API Error:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || pathname !== "/"
            ? "bg-white/95 backdrop-blur-md shadow-lg py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/dopamine_cafe.png"
              alt="Dopamine Cafe"
              width={80}
              height={80}
              className="h-16 w-16 md:h-20 md:w-20 rounded-full"
            />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/"
              className={`font-medium transition hover:scale-110 ${
                scrolled || pathname !== "/"
                  ? "text-gray-700 hover:text-amber-600"
                  : "text-white hover:text-amber-200"
              }`}
            >
              Home
            </Link>

            {/* MENU DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <span
                className={`cursor-pointer font-medium transition hover:scale-110 ${
                  scrolled || pathname !== "/"
                    ? "text-gray-700 hover:text-amber-600"
                    : "text-white hover:text-amber-200"
                }`}
              >
                Menu
              </span>

              {menuOpen && (
                <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-xl rounded-xl overflow-hidden">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/menu/${cat.id}`}
                      className="block px-5 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about-us"
              className={`font-medium transition hover:scale-110 ${
                scrolled || pathname !== "/"
                  ? "text-gray-700 hover:text-amber-600"
                  : "text-white hover:text-amber-200"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition hover:scale-110 ${
                scrolled || pathname !== "/"
                  ? "text-gray-700 hover:text-amber-600"
                  : "text-white hover:text-amber-200"
              }`}
            >
              Contact
            </Link>

            <Link href="/shoping" className="relative ml-4">
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
            </Link>
          </div>

          {/* ================= MOBILE BUTTONS ================= */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/shoping">
              <ShoppingCart
                className={
                  scrolled || pathname !== "/" ? "text-gray-700" : "text-white"
                }
              />
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <MenuIcon
                className={
                  scrolled || pathname !== "/" ? "text-gray-700" : "text-white"
                }
              />
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full top-full left-0 border-t">
            <div className="flex flex-col items-center py-6 gap-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>

              <div className="w-full px-6">
                <p className="font-semibold text-gray-800 mb-2">Menu</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/menu/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-gray-700"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <Link href="/about-us" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ================= CART SIDEBAR ================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex justify-end">
          <div className="w-full sm:w-96 bg-white h-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Your Cart</h3>
              <button onClick={() => setCartOpen(false)}>
                <X />
              </button>
            </div>

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
