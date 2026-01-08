// components/SkeletonLoader.tsx
"use client";

import React from "react";

interface Props {
  type: "category" | "product" | "gallery" | "about" | "hero";
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
              className="px-6 py-3 rounded-full bg-gray-200 animate-pulse"
            ></div>
          ))}
      </div>
    );
  }

  if (type === "product") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 animate-pulse"
            >
              <div className="relative h-52 bg-gray-200"></div>
              <div className="p-5">
                <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/4 mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
                <div className="h-8 bg-gray-200 w-full rounded"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (type === "gallery") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 h-[400px] md:h-[600px] bg-gray-200 animate-pulse rounded-sm"></div>
        <div className="md:col-span-2 flex flex-col gap-4">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-[200px] md:h-[292px] bg-gray-200 animate-pulse rounded-sm"
              ></div>
            ))}
        </div>
        {Array(count - 3 > 0 ? count - 3 : 0)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-[250px] bg-gray-200 animate-pulse rounded-sm"
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
                className="bg-white rounded-2xl shadow-lg p-6 animate-pulse flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === "hero") {
    return (
      <div className="relative h-[600px] md:h-screen bg-gray-200 animate-pulse flex items-center justify-center">
        {/* Left text placeholder */}
        <div className="absolute left-10 md:left-20 space-y-4 w-1/2">
          <div className="h-10 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-6 w-1/2 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Right auth form placeholder */}
        <div className="absolute right-10 md:right-20 w-80 h-96 bg-gray-300 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
