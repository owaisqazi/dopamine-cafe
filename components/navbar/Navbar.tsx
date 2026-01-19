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
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetMenuByMainCategoryQuery } from "@/store/api/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
//@ts-ignore
import Cookies from "js-cookie";

// INTERFACE ADD KIYA
interface NavbarProps {
  onLocationClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLocationClick }) => {
  const pathname = usePathname();
  const miniRef = useRef<HTMLDivElement>(null);
  const { data } = useGetMenuByMainCategoryQuery();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const items = data?.data || [];
  const [token, setToken] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // LOCATION STATE
  const [displayLocation, setDisplayLocation] = useState("Select Location");

  const syncLocation = () => {
    const loc = Cookies.get("user_location");
    if (loc) {
      try {
        const parsed = JSON.parse(loc);
        setDisplayLocation(parsed.area || "Select Location");
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    syncLocation();
    const t = Cookies.get("token");
    setToken(t);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // CUSTOM EVENT FOR INSTANT UPDATE
    window.addEventListener("locationUpdated", syncLocation);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("locationUpdated", syncLocation);
    };
  }, []);

  const isActive = (path: string) => pathname === path;
  const isWhiteBg = scrolled || mobileMenuOpen || pathname !== "/";

  const getLinkColor = (active: boolean) =>
    active
      ? "text-amber-600 font-semibold"
      : isWhiteBg
      ? "text-gray-700 hover:text-amber-600"
      : "text-white hover:text-amber-200";

  return (
    <>
      {/* MINI MENU HEADER (Same as yours) */}
      {items?.length > 0 && (
        <div
          className={`fixed top-0 w-full z-50 left-0 bg-amber-500 hover:bg-amber-700 py-3 text-white text-sm px-6 hidden md:flex overflow-x-auto menu-scrollbar-hide`}
        >
          <div className="flex gap-8 mx-auto">
            {items.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/menu/${cat.id}?name=${cat.name}`}
                className={`flex-shrink-0 transition-colors ${
                  pathname === `/menu/${cat.id}`
                    ? "text-gray-900 font-bold"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MOBILE MINI MENU (Same as yours) */}
      {items?.length > 0 && (
        <nav className="fixed top-0 left-0 w-full z-40 bg-amber-600 hover:bg-amber-700 py-0 flex items-center md:hidden">
          <button
            onClick={() =>
              miniRef.current?.scrollBy({ left: -100, behavior: "smooth" })
            }
            className="p-2 text-white"
          >
            <ChevronLeft />
          </button>
          <div
            ref={miniRef}
            className="flex gap-6 overflow-x-auto flex-1 px-2 scrollbar-hide"
          >
            {items.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/menu/${cat.id}?name=${cat.name}`}
                className={`flex-shrink-0 whitespace-nowrap transition-colors ${
                  pathname === `/menu/${cat.id}`
                    ? "text-gray-900 font-bold"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <button
            onClick={() =>
              miniRef.current?.scrollBy({ left: 100, behavior: "smooth" })
            }
            className="p-2 text-white"
          >
            <ChevronRight />
          </button>
        </nav>
      )}

      {/* ===== MAIN NAVBAR ===== */}
      <header>
        <nav
          className={`fixed left-0 w-full py-2 z-50 transition-all duration-300 ${
            isWhiteBg
              ? `bg-white shadow-lg ${
                  items?.length > 0 ? "md:top-[43px] top-[40px]" : "top-0"
                }`
              : `${items?.length > 0 ? "top-[48px]" : "top-0"} bg-transparent`
          }`}
        >
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* LOGO + LOCATION BOX */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/dopamine_cafe.png"
                  alt="Logo"
                  width={70}
                  height={70}
                  className="h-12 w-12 md:h-16 md:w-16 rounded-full object-contain"
                  priority
                />
              </Link>

              {/* NEW LOCATION BUTTON (IMAGE STYLE) */}
              <button
                onClick={onLocationClick}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-700 text-white px-2 py-1 md:px-4 md:py-2 rounded-xl transition-all shadow-md border border-yellow-900/20"
              >
                <div className="bg-white/20 p-1 rounded-full shrink-0">
                  <MapPin size={14} className="text-white fill-white" />
                </div>
                <div className="flex flex-col items-start leading-tight text-left overflow-hidden">
                  <span className="text-[8px] md:text-[10px] font-bold uppercase opacity-80">
                    Change Location
                  </span>
                  <span className="text-[10px] md:text-sm font-bold truncate max-w-[70px] md:max-w-[150px]">
                    {displayLocation}
                  </span>
                </div>
              </button>
            </div>

            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex gap-8 items-center">
              <li>
                <Link
                  href="/"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/"),
                  )}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/gallery"),
                  )}`}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/blog"),
                  )}`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/about-us"),
                  )}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`font-medium transition ${getLinkColor(
                    isActive("/contact"),
                  )}`}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* CART + MENU ICON */}
            <div className="flex items-center gap-4">
              <Link href="/shoping" className="relative">
                <ShoppingCart
                  className={isWhiteBg ? "text-gray-700" : "text-white"}
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? (
                  <X className="text-gray-700" />
                ) : (
                  <MenuIcon
                    className={isWhiteBg ? "text-gray-700" : "text-white"}
                  />
                )}
              </button>
              {token && (
              <button
                  onClick={() => {
                      Cookies.remove("token");
                      window.location.reload();
                    }}
                className="md:block hidden items-center gap-2 bg-amber-500 hover:bg-amber-700 text-white px-2 py-1 md:px-4 md:py-2 rounded-xl transition-all shadow-md border border-yellow-900/20"
              >
                Logout
              </button>
              )}
            </div>
          </div>

          {/* MOBILE MENU DRAWER (Same as yours) */}
          <div
            className={`md:hidden absolute w-full bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-xl ${
              mobileMenuOpen ? "max-h-[500px] py-8" : "max-h-0 py-0"
            }`}
          >
            <ul className="flex flex-col items-center gap-6">
              <li>
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 font-semibold text-lg"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-800 font-semibold text-lg"
                >
                  Contact
                </Link>
              </li>
              {token && (
                <li>
                  <button
                    onClick={() => {
                      Cookies.remove("token");
                      window.location.reload();
                    }}
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
