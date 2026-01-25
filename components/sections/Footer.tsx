"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Facebook,
  Instagram,
  Cookie,
  MessageCircle,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";
import Image from "next/image";
import CookieModal from "../ui/cookieModalOpen";
import { useNewsletterMutation } from "@/store/api/authApi";
import { toast } from "react-hot-toast";
import Link from "next/link";

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
        <div className="container mx-auto px-4">
          {/* TOP GRID SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-800 pb-4 mb-4">
            {/* COLUMN 1 : LOGO */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Image
                width={150}
                height={150}
                src="/dopamine_cafe.png"
                alt="The Dopamine Cafe Logo"
                className="w-28 h-28 rounded-full object-cover border-2 border-[#FFEABF]/20"
              />
              <div className="flex justify-center text-gray-500 text-sm">
                <div className="flex items-start gap-2 text-start w-full">
                  <MapPin className="w-10 h-10 text-[#FFEABF] mt-1" />
                  <span>
                    Shop # 2 & 3, Dopamine (Restaurant & Coffee Bar), Sindhi
                    Muslim Cooperative Housing Society Block A, Karachi
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                {/* FACEBOOK */}
                <a
                  href="https://www.facebook.com/share/1GUe2cv7Y2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-[#FFEABF] hover:text-[#d4c3a2] cursor-pointer transition" />
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/accounts/login/?next=%2Fthedopaminecafe_&source=omni_redirect"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-[#FFEABF] hover:text-[#d4c3a2] cursor-pointer transition" />
                </a>

                {/* TIKTOK */}
                <a
                  href="https://www.tiktok.com/@thedopaminecafe?_r=1&_t=ZS-93JsmAenl6W"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-5 h-5 text-[#FFEABF] hover:text-[#d4c3a2] cursor-pointer transition fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.15 2h2.1c.15 1.2.75 2.4 1.8 3.3 1.05.9 2.25 1.35 3.45 1.5v2.1c-1.5 0-3-.45-4.35-1.35v6.9c0 3.45-2.85 6.3-6.3 6.3S2.7 18 2.7 14.55c0-3.3 2.55-6 5.85-6.3v2.25c-1.8.3-3.15 1.8-3.15 3.75 0 2.1 1.65 3.75 3.75 3.75s3.75-1.65 3.75-3.75V2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* COLUMN 2 : OPENING HOURS */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#FFEABF]">
                Opening Hours
              </h4>

              <div className="w-full space-y-2 text-sm text-[#FFEABF]">
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Monday</span>
                  <span>8:00 AM – 3:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Tuesday</span>
                  <span>8:00 AM – 3:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Wednesday</span>
                  <span>8:00 AM – 3:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Thursday</span>
                  <span>8:00 AM – 3:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Friday</span>
                  <span>8:00 AM – 3:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1">
                  <span>Saturday</span>
                  <span>8:00 AM – 3:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>8:00 AM – 3:00 AM</span>
                </div>
              </div>
            </div>

            {/* COLUMN 3 : LINKS + NEWSLETTER + CONTACT */}
            <div className="flex flex-col items-center md:items-end gap-6">
              {/* LINKS */}
              <div className="flex flex-wrap justify-center md:justify-end gap-5 text-gray-500 font-medium">
                <Link href="/" className="hover:text-[#d4c3a2] transition">
                  Home
                </Link>
                <Link
                  href="/gallery"
                  className="hover:text-[#d4c3a2] transition"
                >
                  Gallery
                </Link>
                <Link href="/blog" className="hover:text-[#d4c3a2] transition">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-[#d4c3a2] transition">
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-[#d4c3a2] transition"
                >
                  Contact
                </Link>
              </div>

              {/* NEWSLETTER */}
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full sm:w-60 px-4 py-2 rounded-full bg-[#2A2A28] text-white border border-transparent focus:border-[#FFEABF] outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-full bg-[#FFEABF] hover:bg-[#d4c3a2] text-[#2A2A28] transition disabled:opacity-60"
                >
                  {isLoading ? "..." : "Subscribe"}
                </button>
              </form>
              {/* CONTACT */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-4 text-center md:text-left">
                {/* BARCODE */}
                <Image
                  width={150}
                  height={150}
                  src="/barcode.jpeg"
                  alt="The Dopamine Cafe Barcode"
                  className="w-36 h-36 md:w-40 md:h-40 object-contain rounded-lg"
                />

                {/* RIGHT INFO */}
                <div className="flex flex-col gap-3 text-gray-400 text-sm">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-4 h-4 text-[#FFEABF]" />
                    <a
                      href="tel:021-37229364"
                      className="hover:text-[#d4c3a2] transition"
                    >
                      021-37229364
                    </a>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MessageCircle className="w-4 h-4 text-[#FFEABF]" />
                    <a
                      href="https://wa.me/923002444443"
                      target="_blank"
                      className="hover:text-[#d4c3a2] transition"
                    >
                      +92-300-2444443
                    </a>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4 text-[#FFEABF]" />
                    <a
                      href="mailto:info@thedopaminecafe.com"
                      className="hover:text-[#d4c3a2] transition break-all"
                    >
                      info@thedopaminecafe.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* COPYRIGHT */}
          <div className="text-center text-gray-500 text-sm">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-600 fill-current animate-pulse" />
              <span>by The Dopamine Cafe</span>
              <span className="hidden md:inline">|</span>
              <span>© 2026 All rights reserved.</span>
            </div>
          </div>

          {/* LEGAL */}
          <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm text-gray-500">
            <Link
              href="/refund-policy"
              className="hover:text-[#d4c3a2] hover:underline"
            >
              Refund Policy
            </Link>
            <span className="opacity-40">|</span>
            <Link
              href="/privacy-policy"
              className="hover:text-[#d4c3a2] hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="opacity-40">|</span>
            <Link
              href="/terms"
              className="hover:text-[#d4c3a2] hover:underline"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-4 left-4 z-50 bg-[#2A2A28] p-3 rounded-full shadow-lg cursor-pointer hover:bg-[#3a3a37] transition"
        onClick={() => setCookieModalOpen(true)}
      >
        <Cookie className="w-6 h-6 text-[#FFEABF]" />
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
