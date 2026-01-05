/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useGetMenuByMainCategoryQuery,
  useGetByProductQuery,
} from "@/store/api/authApi";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const { data } = useGetMenuByMainCategoryQuery();
  const { data: product } = useGetByProductQuery();

  const items = data?.data || [];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- HELPERS ---------------- */
  const isActive = (path: string) => pathname === path;
  const isMenuActive = pathname.startsWith("/menu");

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkBaseStyle =
    "font-medium transition hover:scale-110 duration-300";

  const getLinkColor = (active: boolean) =>
    active
      ? "text-amber-600 font-semibold"
      : scrolled || pathname !== "/"
      ? "text-gray-700 hover:text-amber-600"
      : "text-white hover:text-amber-200";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || pathname !== "/"
          ? "bg-white/95 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" onClick={handleNavClick} className="flex items-center">
          <Image
            src="/dopamine_cafe.png"
            alt="Dopamine Cafe"
            width={80}
            height={80}
            className="h-16 w-16 md:h-20 md:w-20 rounded-full"
            priority
          />
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/"
            scroll
            onClick={handleNavClick}
            className={`${linkBaseStyle} ${getLinkColor(isActive("/"))}`}
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
              className={`${linkBaseStyle} cursor-pointer ${getLinkColor(
                isMenuActive
              )}`}
            >
              Menu
            </span>

            {menuOpen && (
              <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl overflow-hidden">
                {items.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/menu/${cat.id}`}
                    scroll
                    onClick={handleNavClick}
                    className={`block px-5 py-3 transition ${
                      pathname === `/menu/${cat.id}`
                        ? "bg-amber-50 text-amber-600 font-semibold"
                        : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/gallery"
            scroll
            onClick={handleNavClick}
            className={`${linkBaseStyle} ${getLinkColor(
              isActive("/gallery")
            )}`}
          >
            Gallery
          </Link>

          <Link
            href="/about-us"
            scroll
            onClick={handleNavClick}
            className={`${linkBaseStyle} ${getLinkColor(
              isActive("/about-us")
            )}`}
          >
            About
          </Link>

          <Link
            href="/contact"
            scroll
            onClick={handleNavClick}
            className={`${linkBaseStyle} ${getLinkColor(
              isActive("/contact")
            )}`}
          >
            Contact
          </Link>

          {/* CART */}
          <Link href="/shoping" scroll onClick={handleNavClick} className="relative ml-4">
            <ShoppingCart
              className={`w-6 h-6 ${
                scrolled || pathname !== "/" ? "text-gray-700" : "text-white"
              }`}
            />
            {product?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {product.length}
              </span>
            )}
          </Link>
        </div>

        {/* ================= MOBILE BUTTONS ================= */}
        <div className="md:hidden flex items-center gap-4">
          <Link href="/shoping" scroll onClick={handleNavClick}>
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
            <Link href="/" scroll onClick={handleNavClick}>
              Home
            </Link>

            <div className="w-full px-6">
              <p className="font-semibold text-gray-800 mb-2">Menu</p>
              {items.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/menu/${cat.id}`}
                  scroll
                  onClick={handleNavClick}
                  className={`block py-2 ${
                    pathname === `/menu/${cat.id}`
                      ? "text-amber-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <Link href="/about-us" scroll onClick={handleNavClick}>
              About
            </Link>
            <Link href="/contact" scroll onClick={handleNavClick}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
