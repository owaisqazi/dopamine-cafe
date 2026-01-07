/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react"; // X icon add kiya hai close ke liye
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useGetMenuByMainCategoryQuery,
  useGetByProductQuery,
} from "@/store/api/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { data } = useGetMenuByMainCategoryQuery();
  const { data: product } = useGetByProductQuery();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const items = data?.data || [];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isMenuActive = pathname.startsWith("/menu");

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Background logic: Agar scroll ho ya mobile menu open ho ya home page na ho
  const isWhiteBg = scrolled || mobileMenuOpen || pathname !== "/";

  const getLinkColor = (active: boolean) =>
    active
      ? "text-amber-600 font-semibold"
      : isWhiteBg
      ? "text-gray-700 hover:text-amber-600"
      : "text-white hover:text-amber-200";

  return (
    <nav
      className={`fixed top-0 w-full z-30 transition-all duration-300 ${
        isWhiteBg ? "bg-white shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" onClick={handleNavClick} className="flex items-center">
          <Image
            src="/dopamine_cafe.png"
            alt="Dopamine Cafe"
            width={70}
            height={70}
            className="h-14 w-14 md:h-16 md:w-16 rounded-full object-contain"
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/"
            onClick={handleNavClick}
            className={`font-medium transition ${getLinkColor(isActive("/"))}`}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <span
              className={`font-medium cursor-pointer transition ${getLinkColor(
                isMenuActive
              )}`}
            >
              Menu
            </span>
            {menuOpen && (
              <div className="absolute top-4 left-0 w-56 bg-white shadow-xl rounded-lg py-2 mt-2 border border-gray-100">
                {items.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/menu/${cat.id}?name=${cat.name}`}
                    onClick={handleNavClick}
                    className="block px-5 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/gallery"
            onClick={handleNavClick}
            className={`font-medium transition ${getLinkColor(
              isActive("/gallery")
            )}`}
          >
            Gallery
          </Link>
          <Link
            href="/about-us"
            onClick={handleNavClick}
            className={`font-medium transition ${getLinkColor(
              isActive("/about-us")
            )}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={handleNavClick}
            className={`font-medium transition ${getLinkColor(
              isActive("/contact")
            )}`}
          >
            Contact
          </Link>

          <Link href="/shoping" className="relative ml-4">
            <ShoppingCart
              className={`w-6 h-6 ${
                isWhiteBg ? "text-gray-700" : "text-white"
              }`}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE BUTTONS */}
        <div className="md:hidden flex items-center gap-5">
          <Link href="/shoping" className="relative">
            <ShoppingCart
              className={isWhiteBg ? "text-gray-700" : "text-white"}
            />
            {product?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {product.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="text-gray-700" />
            ) : (
              <MenuIcon
                className={isWhiteBg ? "text-gray-700" : "text-white"}
              />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`md:hidden absolute w-full bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-xl border-t ${
          mobileMenuOpen ? "max-h-[500px] py-8" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/"
            onClick={handleNavClick}
            className="text-gray-800 font-semibold text-lg"
          >
            Home
          </Link>

          <div className="w-full text-center">
            <p
              className="text-gray-800 font-semibold text-lg cursor-pointer flex justify-center items-center gap-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              Menu{" "}
              <span
                className={`text-xs transition-transform ${
                  menuOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </p>
            {menuOpen && (
              <div className="mt-4 bg-gray-50 py-2 w-full">
                {items.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/menu/${cat.id}?name=${cat.name}`}
                    onClick={handleNavClick}
                    className="block py-3 text-gray-600 hover:text-amber-600"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about-us"
            onClick={handleNavClick}
            className="text-gray-800 font-semibold text-lg"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={handleNavClick}
            className="text-gray-800 font-semibold text-lg"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
