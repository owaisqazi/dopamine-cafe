"use client";

import React from "react";

interface CookieModalProps {
  isOpen: boolean;
  handleCookieAccept: (type: "all" | "essential") => void;
}

export default function CookieModal({
  isOpen,
  handleCookieAccept,
}: CookieModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40">
      <div className="relative">
        {/* Background image */}
        <div className="absolute inset-0 -z-10 bg-[url('/main.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-[#fdeabf]/90 backdrop-blur" />

        <div className="max-w-7xl relative z-20 mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[#2A2A28]/20">
          <p className="text-sm font-bold text-[#0c0c0c] max-w-xl">
            This site uses cookies. Visit our cookies policy page or click the link in any footer for more information and to change your preferences.
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleCookieAccept("all")}
              className="bg-[#2A2A28] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#3a3a37] transition"
            >
              Accept all cookies
            </button>

            <button
              onClick={() => handleCookieAccept("essential")}
              className="bg-white border border-[#2A2A28] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#2A2A28] hover:text-white transition"
            >
              Accept only essential cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
