"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ThreeDImage from "../ThreeDImage/ThreeDImage";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  image: string;
  base_price: string;
  branch_price: number;
}

export default function Detail() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const [quantity, setQuantity] = useState(1);

  const item: MenuItem | null = useMemo(() => {
    if (!dataParam) return null;
    try {
      return JSON.parse(decodeURIComponent(dataParam));
    } catch {
      return null;
    }
  }, [dataParam]);

  if (!item) {
    return <p className="text-center py-20">No item found</p>;
  }

  const price = Number(item.branch_price || item.base_price);

  return (
    <section className="min-h-screen bg-[#ffffff] px-6 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* IMAGE SIDE */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-full h-full rounded-3xl -z-10" />
          <ThreeDImage
            src={IMAGE_BASE_URL + item.image}
            alt={item.name}
          />
        </div>

        {/* CONTENT CARD */}
        <div className="bg-white rounded-3xl hover:shadow-2xl p-10 relative">

          {/* TAG */}
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase bg-amber-50 text-amber-700 px-4 py-1 rounded-full">
            Signature Item
          </span>

          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-6">
            {item.name}
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {item.description}
          </p>

          {/* PRICE ROW */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <span className="text-4xl font-black text-gray-900">
                Rs. {price * quantity}
              </span>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center bg-gray-100 rounded-full px-5 py-3">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="text-2xl font-bold px-3 text-gray-600 hover:text-black"
              >
                −
              </button>
              <span className="px-6 font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-2xl font-bold px-3 text-gray-600 hover:text-black"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full py-5 bg-black text-white text-sm font-semibold uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all">
            Add to Cart
          </button>

          {/* FOOTER INFO */}
          <p className="text-xs text-gray-400 text-center mt-6">
            Freshly prepared • Best quality guaranteed
          </p>
        </div>
      </div>
    </section>
  );
}
