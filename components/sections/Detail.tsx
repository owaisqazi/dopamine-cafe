"use client";

import { useState } from "react";
import ThreeDImage from "../ThreeDImage/ThreeDImage";

export default function MenuDetailPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen bg-[#faf7f2] py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT — REAL 3D IMAGE */}
        <ThreeDImage
          src="/manu/BBQ Wing's.jpeg"
          alt="BBQ Wings"
        />

        {/* RIGHT CONTENT */}
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
            Signature Dish
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BBQ Wings
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
            Juicy BBQ wings with smoky flavor and crispy texture.
          </p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center border rounded-full px-4 py-2">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="text-lg px-2"
              >
                −
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-lg px-2"
              >
                +
              </button>
            </div>

            <span className="text-2xl font-bold">
              Rs. {360 * quantity}
            </span>
          </div>

          <button className="px-10 py-4 bg-black text-white uppercase tracking-widest">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
