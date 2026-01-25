/* eslint-disable @next/next/no-img-element */
"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetByHomeAboutQuery } from "@/store/api/authApi";
import SkeletonLoader from "@/components/Skeleton/SkeletonLoader";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

export default function HomeAbout() {
  const { data, isLoading } = useGetByHomeAboutQuery();
  const items = data?.data || [];

  // Contact info
  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: items?.address || "—",
    },
    {
      icon: Phone,
      title: "Phone",
      content: items?.phone || "—",
    },
    {
      icon: Mail,
      title: "Email",
      content: items?.email || "—",
    },
  ];

  if (isLoading) return <SkeletonLoader type="about" count={3} />;

  return (
    <section id="about" className="py-20 px-4 relative z-20">
      <div className="container mx-auto">
        {/* SECTION HEADING */}
        <header className="text-center mb-12" data-aos="flip-up">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            More than just a cafe, we are a happiness hub where every visit
            boosts your mood.
          </p>
        </header>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                data-aos-duration={3000}
                data-aos-easing="ease-in-out"
                className="group bg-[#1C1C19] hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1C19] text-[#FFEABF] border-[#FFEABF] mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-white text-sm">{info.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ABOUT STORY */}
        <div className="grid md:grid-cols-2 py-8 gap-12 items-center">
          <div
            className="order-2 md:order-1"
            data-aos="flip-right"
            data-aos-offset="300"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {items?.name}
            </h3>
            <p className="text-gray-900 mb-4 leading-relaxed">
              {items?.description}
            </p>
          </div>

          <div
            className="order-1 md:order-2 overflow-hidden rounded-2xl shadow-2xl group"
            data-aos="flip-left"
            data-aos-offset="300"
          >
            <img
              src={IMAGE_BASE_URL + items?.image || "/about.png"}
              alt={items?.name || "About Image"}
              className="w-full h-96 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
