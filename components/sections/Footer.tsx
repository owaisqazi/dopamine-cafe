"use client";

import { useEffect, useState } from "react";
import { Heart, Facebook, Instagram, Twitter, Cookie } from "lucide-react";
import Image from "next/image";
import CookieModal from "../ui/cookieModalOpen";
import { useNewsletterMutation } from "@/store/api/authApi";
import { toast } from "react-hot-toast";

// ✅ Footer accepts props to control cookie modal externally if needed
interface FooterProps {
  cookieModalOpen?: boolean; // optional, if controlled externally
  onCloseCookieModal?: () => void; // optional callback
}

export default function Footer({
  cookieModalOpen: externalCookieOpen,
  onCloseCookieModal: externalOnClose,
}: FooterProps) {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [email, setEmail] = useState<string>("");

  const [newsletter, { isLoading }] = useNewsletterMutation();

  useEffect(() => {
    // If parent controls modal, use external value
    if (externalCookieOpen !== undefined) {
      setCookieModalOpen(externalCookieOpen);
      return;
    }

    // Show modal only once per session
    const cookieClosed = sessionStorage.getItem("cookieClosed");
    if (!cookieClosed) {
      setCookieModalOpen(true);
    }
  }, [externalCookieOpen]);

  const handleCloseCookieModal = () => {
    setCookieModalOpen(false);
    sessionStorage.setItem("cookieClosed", "true");

    // Call external handler if provided
    if (externalOnClose) externalOnClose();
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);

      await newsletter(formData).unwrap();
      toast.success("Subscribed successfully 🎉");
      setEmail("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <footer className="bg-[#1C1C1A] text-white py-12 px-4 z-20 relative">
        <div className="container mx-auto">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-10">
            {/* LEFT : Logo */}
            <div className="flex items-center gap-3">
              <Image
                width={150}
                height={150}
                src="/dopamine_cafe.png"
                alt="Dopamine Cafe Logo"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>

            {/* RIGHT : Links + Social + Newsletter */}
            <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
              {/* Links */}
              <div className="flex gap-6 text-gray-300 font-medium">
                <a href="/gallery" className="hover:text-amber-500 transition">
                  Home
                </a>
                <a href="/gallery" className="hover:text-amber-500 transition">
                  Gallery
                </a>
                <a href="/blog" className="hover:text-amber-500 transition">
                  Blog
                </a>
                <a href="/about" className="hover:text-amber-500 transition">
                  About
                </a>
                <a href="/contact" className="hover:text-amber-500 transition">
                  Contact
                </a>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 mt-2">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-amber-500 transition" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-amber-500 transition" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-amber-500 transition" />
              </div>

              {/* Newsletter */}
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 w-full mt-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full sm:w-64 px-4 py-2 rounded-full bg-[#2A2A28] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-full bg-amber-600 hover:bg-amber-700 transition text-white font-medium disabled:opacity-60"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Center Text */}
          <div className="text-center">
            <div className="flex md:text-lg text-sm justify-center items-center gap-2 text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>© 2024 Dopamine Cafe. All rights reserved.</span>
            </div>
          </div>

          {/* Cookie Button */}
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
          onClose={handleCloseCookieModal}
        />
      )}
    </>
  );
}
