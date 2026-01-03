'use client';

import { useState } from 'react';
import { Heart, Facebook, Instagram, Twitter, Cookie } from 'lucide-react';
import Image from 'next/image';
import CookieModal from '../ui/cookieModalOpen';

export default function Footer() {
  const [cookieModalOpen, setCookieModalOpen] = useState(true);

  return (
    <>
      <footer className="bg-[#1C1C1A] text-white py-12 px-4 z-20 relative" aria-label="Footer">
        <div className="container mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-10">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                width={150}
                height={150}
                src="/dopamine_cafe.png"
                alt="Dopamine Cafe Logo"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>

            {/* Navigation Links + Social */}
            <div className="flex flex-col items-center md:items-end gap-6">
              {/* Navigation Links */}
              <nav aria-label="Footer Navigation">
                <ul className="flex gap-6 text-gray-300 font-medium">
                  <li>
                    <a href="#menu" className="hover:text-amber-500 transition">Menu</a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-amber-500 transition">About</a>
                  </li>
                  <li>
                    <a href="#gallery" className="hover:text-amber-500 transition">Gallery</a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-amber-500 transition">Contact</a>
                  </li>
                </ul>
              </nav>

              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-amber-500 transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-amber-500 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-amber-500 transition">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Center Text */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-2 text-gray-400 md:text-lg text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>© 2024 Dopamine Cafe. All rights reserved.</span>
            </div>
          </div>

          {/* Cookie Preferences Button */}
          <button
            onClick={() => setCookieModalOpen(true)}
            className="fixed bottom-6 left-6 bg-amber-600 hover:bg-amber-700 p-3 rounded-full shadow-lg text-white transition transform hover:scale-110 z-50"
            aria-label="Cookie Preferences"
            title="Cookie Preferences"
          >
            <Cookie className="w-6 h-6" />
          </button>
        </div>
      </footer>

      {/* Cookie Modal */}
      {cookieModalOpen && (
        <CookieModal
          isOpen={cookieModalOpen}
          onClose={() => setCookieModalOpen(false)}
        />
      )}
    </>
  );
}
