/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetByHomeGalleryQuery } from "@/store/api/authApi";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

export default function Gallery() {
  const { data, isLoading } = useGetByHomeGalleryQuery();
  const items = data?.data || [];
  return (
    <section
      id="gallery"
      className="py-16 px-4 bg-[#ffffff]"
      style={{ backgroundAttachment: "fixed" }}
      aria-label="Gallery of Dopamine Cafe"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        {/* <header className="text-center mb-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Gallery</h2>
          <p className="text-xl text-gray-600">Moments that make us smile</p>
        </header> */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* LEFT LARGE IMAGE */}
          {items[0] && (
            <div className="md:col-span-3 relative group overflow-hidden rounded-sm cursor-pointer">
              <img
                src={IMAGE_BASE_URL + items[0].image}
                alt={items[0].caption}
                className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay — SAME AS BEFORE */}
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight md:leading-snug">
                    {items[0].caption}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT COLUMN — 2 IMAGES */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {items?.slice(1, 3).map((item: any, index: number) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-sm h-[200px] md:h-[292px] cursor-pointer"
              >
                <img
                  src={IMAGE_BASE_URL + item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay — SAME AS BEFORE */}
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-2xl md:text-3xl font-bold uppercase">
                      {item.caption}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {items?.length > 3 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items?.slice(3).map((item: any, index: number) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-sm h-[250px] cursor-pointer"
              >
                <img
                  src={IMAGE_BASE_URL + item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-2xl md:text-3xl font-bold uppercase">
                      {item.caption}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
