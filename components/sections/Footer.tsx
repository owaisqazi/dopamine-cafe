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
import {
  useGetTrackingQuery,
  useNewsletterMutation,
  useGetTimingQuery,
  useGetByHomeAboutQuery,
} from "@/store/api/authApi";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
// import UnderConstruction from "../ui/UnderConstruction";

interface FooterProps {
  cookieModalOpen?: boolean;
  onCloseCookieModal?: () => void;
}

export default function Footer({
  cookieModalOpen: externalCookieOpen,
  onCloseCookieModal: externalOnClose,
}: FooterProps) {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const { data: trackingData } = useGetTrackingQuery();
  const { data: timingData } = useGetTimingQuery();
  const { data } = useGetByHomeAboutQuery();
  const items = data?.data || [];
  const [email, setEmail] = useState<string>("");
  console.log("timingData", timingData?.data);
  const [newsletter, { isLoading }] = useNewsletterMutation();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setCookieModalOpen(true);
    }
  }, []);

  // Accept buttons ke liye
  const handleCookieAccept = (type: "all" | "essential") => {
    localStorage.setItem("cookie-consent", type);
    setCookieModalOpen(false);
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
      <footer className="bg-[#566b30] text-white py-12 px-4 z-20 relative">
        <div className="container mx-auto px-4">
          {/* TOP GRID SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white pb-4 mb-4">
            {/* COLUMN 1 : LOGO */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Image
                width={150}
                height={150}
                src={
                  items?.logo !== null
                    ? IMAGE_BASE_URL + items?.logo
                    : "/dopamine_cafe.png"
                }
                alt="The Dopamine Cafe Logo"
                className="w-28 h-28 rounded-full object-cover border-2 border-[#ffffff]"
              />
              <div className="flex justify-center text-white text-sm">
                <div className="flex items-start gap-2 text-start w-full">
                  <MapPin className="w-10 h-10 text-[#ffffff] mt-1" />
                  <span>
                    {items?.address || "123 Main Street, Karachi, Pakistan"}
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
                  <Facebook className="w-5 h-5 text-[#ffffff] hover:text-[#fff] cursor-pointer transition" />
                </a>

                {/* INSTAGRAM */}
                <a
                  href="https://www.instagram.com/accounts/login/?next=%2Fthedopaminecafe_&source=omni_redirect"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-[#ffffff] hover:text-[#fff] cursor-pointer transition" />
                </a>

                {/* TIKTOK */}
                <a
                  href="https://www.tiktok.com/@thedopaminecafe?_r=1&_t=ZS-93JsmAenl6W"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-5 h-5 text-[#ffffff] hover:text-[#fff] cursor-pointer transition fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.15 2h2.1c.15 1.2.75 2.4 1.8 3.3 1.05.9 2.25 1.35 3.45 1.5v2.1c-1.5 0-3-.45-4.35-1.35v6.9c0 3.45-2.85 6.3-6.3 6.3S2.7 18 2.7 14.55c0-3.3 2.55-6 5.85-6.3v2.25c-1.8.3-3.15 1.8-3.15 3.75 0 2.1 1.65 3.75 3.75 3.75s3.75-1.65 3.75-3.75V2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* COLUMN 2 : OPENING HOURS */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#ffffff]">
                Opening Hours
              </h4>

              <div className="w-full space-y-2 text-sm text-[#ffffff]">
                <div className="w-full space-y-2 text-sm text-[#ffffff]">
                  {timingData?.data?.length ? (
                    timingData?.data?.map((item: any, index: number) => (
                      <div
                        key={item?.id}
                        className={`flex justify-between ${
                          index !== timingData.data.length - 1
                            ? "border-b border-white pb-1"
                            : ""
                        }`}
                      >
                        <span>{item?.day}</span>
                        <span>
                          {new Date(
                            `1970-01-01T${item?.start_time}`,
                          ).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}{" "}
                          –{" "}
                          {new Date(
                            `1970-01-01T${item?.end_time}`,
                          ).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-white">
                      No timing available
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="flex justify-between w-full border-b border-white pb-1">
                <span>All Days</span>
                <span>24/7</span>
              </div> */}
            </div>

            {/* COLUMN 3 : LINKS + NEWSLETTER + CONTACT */}
            <div className="flex flex-col items-center md:items-end gap-6">
              {/* LINKS */}
              <div className="flex flex-wrap justify-center md:justify-end gap-5 text-white font-medium">
                <Link href="/" className="hover:text-[#fff] transition"></Link>
                <Link
                  href="#menu-item"
                  className="hover:text-[#fff] transition"
                >
                  Special Menu
                </Link>
                <Link href="/gallery" className="hover:text-[#fff] transition">
                  Gallery
                </Link>
                <Link href="/blog" className="hover:text-[#fff] transition">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-[#fff] transition">
                  About Us
                </Link>
                <Link href="/contact" className="hover:text-[#fff] transition">
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
                  className="w-full sm:w-60 px-4 py-2 rounded-full bg-[#ffffff] text-black border border-transparent focus:border-[#000] outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 rounded-full bg-[#ffffff] hover:bg-[#e0e0e0] text-[#566b30] transition disabled:opacity-60"
                >
                  {isLoading ? "..." : "Subscribe"}
                </button>
              </form>
              {/* CONTACT */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-4 text-center md:text-left">
                {/* BARCODE */}
                <Image
                  src="/barcode.jpeg"
                  alt="The Dopamine Cafe Barcode"
                  width={150}
                  height={150}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/blur.png"
                  className="w-36 h-36 md:w-40 md:h-40 object-contain rounded-lg"
                />

                {/* RIGHT INFO */}
                <div className="flex flex-col gap-3 text-white text-sm">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-4 h-4 text-[#ffffff]" />
                    <a
                      href="tel:021-37229364"
                      className="hover:text-[#fff] transition"
                    >
                      021-37229364
                    </a>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MessageCircle className="w-4 h-4 text-[#ffffff]" />
                    <a
                      href="https://wa.me/923002444443"
                      target="_blank"
                      className="hover:text-[#fff] transition"
                    >
                      +92-300-2444443
                    </a>
                  </div>

                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4 text-[#ffffff]" />
                    <a
                      href="mailto:info@thedopaminecafe.com"
                      className="hover:text-[#fff] transition break-all"
                    >
                      info@thedopaminecafe.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* COPYRIGHT */}
          <div className="text-center text-white text-sm">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-600 fill-current animate-pulse" />
              <span>by The Dopamine Cafe</span>
              <span className="hidden md:inline">|</span>
              <span>© 2026 All rights reserved.</span>
            </div>
          </div>

          {/* LEGAL */}
          <div className="flex justify-center flex-wrap gap-4 mt-4 text-sm text-white">
            <Link
              href="/refund-policy"
              className="hover:text-[#fff] hover:underline"
            >
              Refund Policy
            </Link>
            <span className="opacity-40">|</span>
            <Link
              href="/privacy-policy"
              className="hover:text-[#fff] hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/terms" className="hover:text-[#fff] hover:underline">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-4 left-4 z-30 bg-[#566b30] p-3 rounded-full shadow-lg cursor-pointer hover:bg-[#566b30c9] transition"
        onClick={() => setCookieModalOpen(true)}
      >
        <Cookie className="w-6 h-6 text-[#ffffff]" />
      </div>
      {/* <UnderConstruction /> */}

      {/* Cookie Modal */}
      <CookieModal
        isOpen={cookieModalOpen}
        handleCookieAccept={handleCookieAccept}
      />
    </>
  );
}
