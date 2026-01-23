"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Cookie,
  Clock,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";
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
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-10 border-b border-gray-800 pb-10">
            {/* LEFT : Logo & Timings */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <Image
                  width={150}
                  height={150}
                  src="/dopamine_cafe.png"
                  alt="The Dopamine Cafe Logo"
                  className="w-28 h-28 rounded-full object-cover border-2 border-amber-600/20"
                />
              </div>
              {/* TIMING DISPLAY */}
              <div className="flex items-center gap-2 bg-[#2A2A28] px-4 py-2 rounded-full border border-amber-600/30">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold tracking-wide uppercase text-gray-200">
                  Open 24/7
                </span>
              </div>
              <p className="text-xs text-gray-500 italic mt-1">
                Always here to satisfy your cravings
              </p>
            </div>

            {/* RIGHT : Links + Social + Newsletter */}
            <div className="flex flex-col items-center md:items-end gap-6 w-full md:w-auto">
              {/* Links */}
              <div className="flex flex-wrap justify-center gap-6 text-gray-500 font-medium">
                <a href="/" className="hover:text-amber-500 transition">
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
              <div className="flex gap-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-amber-500 cursor-pointer transition" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-amber-500 cursor-pointer transition" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-amber-500 cursor-pointer transition" />
              </div>

              {/* Newsletter */}
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center gap-3 w-full"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Subscribe to our newsletter"
                  className="w-full sm:w-64 px-4 py-2 rounded-full bg-[#2A2A28] text-white border border-transparent focus:border-amber-500 outline-none transition"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-6 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium transition disabled:opacity-60"
                >
                  {isLoading ? "..." : "Subscribe"}
                </button>
              </form>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <a
                  href="tel:021-37229364"
                  className="hover:text-amber-500 transition text-gray-500"
                >
                  021-37229364
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-500 " />
                <a
                  href="https://wa.me/+923002444443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-500 transition text-gray-500"
                >
                  +92-300-2444443
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-center gap-2 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>
                Shop # 2 & 3, The Dopamine (Restaurant & Coffee Bar), Sindhi
                Muslim Cooperative Housing Society Block A Sindhi Muslim CHS
                (SMCHS), Karachi
              </span>
            </div>
          </div>
          {/* Bottom Copyright Section */}
          <div className="text-center pt-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-600 fill-current animate-pulse" />
                <span>by The Dopamine Cafe</span>
              </div>
              <span className="hidden md:inline">|</span>
              <span>© 2026 All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-4 left-4 z-50 bg-[#2A2A28] p-3 rounded-full shadow-lg cursor-pointer hover:bg-[#3a3a37] transition"
        onClick={() => setCookieModalOpen(true)}
      >
        <Cookie className="w-6 h-6 text-amber-500" />
      </div>
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
