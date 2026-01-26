// components/SkeletonLoader.tsx
"use client";

import React from "react";

interface Props {
  type:
    | "category"
    | "product"
    | "gallery"
    | "about"
    | "hero"
    | "blog"
    | "orders";
  count?: number;
}

const SkeletonLoader: React.FC<Props> = ({ type, count = 6 }) => {
  if (type === "category") {
    return (
      <div className="flex flex-wrap justify-center gap-4 mb-14">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="px-6 py-3 rounded-full bg-[#1C1C19] animate-pulse"
            ></div>
          ))}
      </div>
    );
  }

  if (type === "blog") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-[#1C1C19] rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
            >
              {/* Image placeholder */}
              <div className="relative h-52 bg-[#1C1C19]"></div>

              {/* Content placeholder */}
              <div className="p-5 space-y-2">
                <div className="h-6 bg-[#1C1C19] w-3/4 rounded"></div>
                <div className="h-4 bg-[#1C1C19] w-full rounded"></div>
                <div className="h-4 bg-[#1C1C19] w-full rounded"></div>
                <div className="h-8 bg-[#1C1C19] w-full rounded mt-2"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }
  if (type === "product") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="group relative bg-[#1C1C19] rounded-xl border border-gray-200 shadow-sm flex h-44 overflow-hidden animate-pulse"
            >
              {/* LEFT CONTENT AREA */}
              <div className="flex-[1.5] p-4 flex flex-col justify-start">
                <div className="h-6 w-3/4 bg-[#1C1C19] rounded mb-2"></div>
                <div className="h-4 w-full bg-[#1C1C19] rounded mb-1"></div>
                <div className="h-4 w-full bg-[#1C1C19] rounded mb-1"></div>
                <div className="mt-auto h-6 w-16 bg-[#1C1C19] rounded"></div>
              </div>

              {/* RIGHT IMAGE AREA */}
              <div className="flex-1 relative flex items-center justify-center pr-4">
                <div className="relative w-28 h-28 rounded-full bg-[#1C1C19]"></div>
              </div>

              {/* PLUS ICON PLACEHOLDER */}
              <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#1C1C19]"></div>
            </div>
          ))}
      </div>
    );
  }

  if (type === "orders") {
    return (
      <>
        {Array(count || 6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              // Yahan 'w-full' lazmi add karein
              className="group relative rounded-2xl shadow-sm overflow-hidden flex h-44 animate-pulse bg-[#1C1C19] w-full"
            >
              {/* Left Content */}
              <div className="flex-[1.5] p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-[#2A2A28] rounded"></div>
                  <div className="h-4 w-full bg-[#2A2A28] rounded"></div>
                </div>
              </div>
              {/* Right Image */}
              <div className="flex-1 relative flex items-center justify-center pr-4">
                <div className="w-20 h-20 rounded-full bg-[#2A2A28]"></div>
              </div>
            </div>
          ))}
      </>
    );
  }

  if (type === "gallery") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 h-[400px] md:h-[600px] bg-[#1C1C19] animate-pulse rounded-sm"></div>
        <div className="md:col-span-2 flex flex-col gap-4">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-[200px] md:h-[292px] bg-[#1C1C19] animate-pulse rounded-sm"
              ></div>
            ))}
        </div>
        {Array(count - 3 > 0 ? count - 3 : 0)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-[250px] bg-[#1C1C19] animate-pulse rounded-sm"
            ></div>
          ))}
      </div>
    );
  }

  if (type === "about") {
    return (
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-[#1C1C19] rounded-2xl shadow-lg p-6 animate-pulse flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#1C1C19]"></div>
                <div className="h-6 w-1/3 bg-[#1C1C19] rounded"></div>
                <div className="h-4 w-1/2 bg-[#1C1C19] rounded"></div>
              </div>
            ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-8 w-1/2 bg-[#1C1C19] rounded animate-pulse"></div>
            <div className="h-4 w-full bg-[#1C1C19] rounded animate-pulse"></div>
            <div className="h-4 w-full bg-[#1C1C19] rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-[#1C1C19] rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-[#1C1C19] rounded animate-pulse"></div>
          </div>
          <div className="h-96 bg-[#1C1C19] rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === "hero") {
    return (
      <div className="relative h-[600px] md:h-screen bg-[#1C1C19] animate-pulse flex items-center justify-center">
        <div className="absolute left-10 md:left-20 space-y-4 w-1/2">
          <div className="h-10 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="absolute right-10 md:right-20 w-80 h-96 bg-gray-300 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
