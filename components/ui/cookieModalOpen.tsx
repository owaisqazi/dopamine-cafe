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

        <div className="max-w-7xl relative z-20 mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-[#566b30]/20">
          <p className="text-sm font-bold text-[#0c0c0c] max-w-xl">
            This site uses cookies. Visit our cookies policy page or click the link in any footer for more information and to change your preferences.
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleCookieAccept("all")}
              className="bg-[#566b30] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#566b30c9] transition"
            >
              Accept all cookies
            </button>

            <button
              onClick={() => handleCookieAccept("essential")}
              className="bg-white border border-[#566b30] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#566b30] hover:text-white transition"
            >
              Accept only essential cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
