/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import {
  ShoppingCart,
  Menu as MenuIcon,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"; // X icon add kiya hai close ke liye
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetMenuByMainCategoryQuery } from "@/store/api/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
//@ts-ignore
import Cookies from "js-cookie";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const miniRef = useRef<HTMLDivElement>(null);
  const { data } = useGetMenuByMainCategoryQuery();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const items = data?.data || [];
  const [token, setToken] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = Cookies.get("token");
    setToken(t);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isMenuActive = pathname.startsWith("/menu");

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/";
  };

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
    <>
      {/* ===== MINI MENU HEADER ===== */}
      {items?.length > 0 && (
        <div
          className={`fixed top-0 w-full z-50 left-0 bg-[#d97706] py-3 text-white text-sm px-6 hidden md:flex overflow-x-auto menu-scrollbar-hide`}
        >
          <div className="flex gap-8 mx-auto">
            {items.map((cat: any) => {
              const isActiveCat = pathname === `/menu/${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={`/menu/${cat.id}?name=${cat.name}`}
                  className={`flex-shrink-0 transition-colors ${
                    isActiveCat
                      ? "text-gray-900 font-bold"
                      : "text-white hover:text-amber-200"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile: arrow scroll */}
      {items?.length > 0 && (
        <nav
          aria-label="Menu categories"
          className="fixed top-0 left-0 w-full z-40 bg-[#d97706] py-0 flex items-center md:hidden"
        >
          <button
            onClick={() =>
              miniRef.current?.scrollBy({ left: -100, behavior: "smooth" })
            }
            className="p-2 text-white"
            aria-label="Scroll categories left"
          >
            <ChevronLeft />
          </button>
          <div
            ref={miniRef}
            className="flex gap-6 overflow-x-auto flex-1 px-2 scrollbar-hide"
          >
            {items.map((cat: any) => {
              const isActiveCat = pathname === `/menu/${cat.id}`;
              return (
                <Link
                  key={cat.id}
                  href={`/menu/${cat.id}?name=${cat.name}`}
                  className={`flex-shrink-0 whitespace-nowrap transition-colors ${
                    isActiveCat
                      ? "text-gray-900 font-bold"
                      : "text-white hover:text-amber-200"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
          <button
            onClick={() =>
              miniRef.current?.scrollBy({ left: 100, behavior: "smooth" })
            }
            className="p-2 text-white"
            aria-label="Scroll categories right"
          >
            <ChevronRight />
          </button>
        </nav>
      )}

      {/* ===== MAIN NAVBAR ===== */}
      <header>
        {" "}
        {/* pt-12 to avoid mini-menu overlap */}
        <nav
          className={`fixed left-0 w-full py-2 z-50 transition-all duration-300 ${
            isWhiteBg
              ? `bg-white shadow-lg ${
                  items?.length > 0 ? "md:top-[43px] top-[40px]" : "top-0"
                }`
              : `${items?.length > 0 ? "top-[48px]" : "top-0"} bg-transparent`
          }`}
          aria-label="Main site navigation"
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* LOGO */}
            <Link
              href="/"
              onClick={handleNavClick}
              className="flex items-center"
              aria-label="Dopamine Cafe Home"
            >
              <Image
                src="/dopamine_cafe.png"
                alt="Dopamine Cafe Logo"
                width={70}
                height={70}
                className="h-14 w-14 md:h-20 md:w-20 rounded-full object-contain"
                priority
              />
            </Link>

            {/* DESKTOP MENU */}
            <ul className="hidden md:flex gap-8 items-center">
              <li>
                <Link
                  href="/"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/")
                  )}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/gallery")
                  )}`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/blog")
                  )}`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/about-us")
                  )}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/contact")
                  )}`}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* CART + LOGOUT */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/shoping" className="relative" aria-label="View cart">
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
              {token && (
                <button
                  onClick={handleLogout}
                  className="bg-amber-400 hover:bg-amber-500 text-white p-2 rounded-md font-medium transition"
                >
                  Logout
                </button>
              )}
            </div>

            {/* MOBILE BUTTONS */}
            <div className="md:hidden flex items-center gap-5">
              <Link href="/shoping" className="relative" aria-label="View cart">
                <ShoppingCart
                  className={isWhiteBg ? "text-gray-700" : "text-white"}
                />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="focus:outline-none"
                aria-label={
                  mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
                }
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
            className={`md:hidden absolute w-full bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-xl ${
              mobileMenuOpen ? "max-h-[500px] py-8" : "max-h-0 py-0"
            }`}
          >
            <ul className="flex flex-col items-center gap-6">
              <li>
                <Link
                  href="/"
                  onClick={handleNavClick}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  onClick={handleNavClick}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  onClick={handleNavClick}
                  className="text-gray-800 font-semibold text-lg"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={handleNavClick}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={handleNavClick}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Contact
                </Link>
              </li>
              {token && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 font-semibold text-lg"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
