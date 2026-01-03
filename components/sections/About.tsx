/* eslint-disable @next/next/no-img-element */
"use client";

import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    content: "123 Coffee Street, Cafe District, Mumbai - 400001",
  },
  {
    icon: Clock,
    title: "Hours",
    content: "Mon - Sun: 8:00 AM - 11:00 PM",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    content: "hello@dopaminecafe.com",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 relative z-20 bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="container mx-auto">

        {/* SECTION HEADING */}
        <header className="text-center mb-12" data-aos="flip-up">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            More than just a cafe, we are a happiness hub where every visit boosts your mood.
          </p>
        </header>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                data-aos-duration={3000}
                data-aos-easing="ease-in-out"
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ABOUT STORY */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className="order-2 md:order-1"
            data-aos="flip-right"
            data-aos-offset="300"
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2024, Dopamine Cafe was born from a simple idea: create
              a space where people can escape the daily grind and find their
              moment of joy. Named after the happiness hormone, we believe in
              serving more than just coffee.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our baristas are artists, our chefs are passionate creators, and
              our space is designed to uplift your spirits. Whether you are
              working, meeting friends, or enjoying some alone time, Dopamine
              Cafe is your happy place.
            </p>
          </div>

          <div
            className="order-1 md:order-2 overflow-hidden rounded-2xl shadow-2xl group"
            data-aos="flip-left"
            data-aos-offset="300"
          >
            <img
              src="./about.png"
              alt="Interior of Dopamine Cafe"
              className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
