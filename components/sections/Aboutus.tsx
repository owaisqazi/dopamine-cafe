/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetByHomeAboutQuery } from "@/store/api/authApi";

export default function AboutUs() {
  const { data, isLoading } = useGetByHomeAboutQuery();
      const items = data?.data || [];
      console.log(items, "About Us Data===>");
  return (
    <section
      id="about"
      className="py-20 relative z-20 px-4 bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">

          {/* TEXT */}
          <div
            className="md:col-span-2 col-span-1"
            data-aos="flip-right"
            data-aos-offset="300"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About Us
            </h2>
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

          {/* IMAGE */}
          <div
            className="md:col-span-3 col-span-1 overflow-hidden rounded-2xl shadow-2xl group"
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
