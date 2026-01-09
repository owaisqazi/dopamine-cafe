/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ThreeDImageGallery from "../ThreeDImage/ThreeDImageGallery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  image: string;
  images: string[] | string;
  base_price: string;
  branch_price: number;
  gl_file?: string;
}

export default function Detail() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const item: MenuItem | null = useMemo(() => {
    if (!dataParam) return null;
    try {
      return JSON.parse(decodeURIComponent(dataParam));
    } catch {
      return null;
    }
  }, [dataParam]);

  if (!item) return <p className="text-center py-20">No item found</p>;

  const price = Number(item?.branch_price || item?.base_price);

  const parsedImages: string[] = useMemo(() => {
    if (!item) return [];

    if (Array.isArray(item?.images) && item?.images.length) return item?.images;

    try {
      const parsed = item?.images ? JSON.parse(item?.images as any) : [];
      return parsed.length ? parsed : [item?.image];
    } catch {
      return item?.image ? [item?.image] : [];
    }
  }, [item]);

  const handleAddToCart = () => {
    if (!item) return;

    dispatch(
      addToCart({
        id: item?.id,
        name: item?.name,
        price: price,
        quantity: quantity,
        image: parsedImages[0] || item?.image,
      })
    );

    toast.success(`${item?.name} added to cart! 🎉`);
  };

  return (
    <section className="min-h-screen bg-[#ffffff] px-4 md:px-6 py-12 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        {/* IMAGE / GALLERY */}
        <div className="w-full">
          <ThreeDImageGallery
            images={parsedImages}
            alt={item?.name}
            gl_file={IMAGE_BASE_URL + item?.gl_file}
          />
        </div>

        {/* CONTENT */}
        <div className="w-full bg-white rounded-3xl p-6 md:p-10 shadow-md hover:shadow-2xl">
          <span className="inline-block mb-4 text-xs font-semibold tracking-widest uppercase bg-amber-50 text-amber-700 px-4 py-1 rounded-full">
            Signature Item
          </span>

          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 md:mb-6">
            {item?.name}
          </h1>

          <p className="text-gray-600 text-sm md:text-lg mb-8 leading-relaxed">
            {item?.description}
          </p>

          {/* PRICE + QUANTITY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 items-center">
            <div>
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <span className="text-2xl md:text-4xl font-black text-gray-900">
                $ {price * quantity}
              </span>
            </div>

            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 md:px-5 md:py-3 justify-center">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="text-lg md:text-2xl font-bold px-3 text-gray-600 hover:text-black"
              >
                −
              </button>
              <span className="px-4 md:px-6 font-bold text-lg md:text-xl">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-lg md:text-2xl font-bold px-3 text-gray-600 hover:text-black"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-3 md:py-5 bg-black text-white text-sm md:text-base font-semibold uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all"
          >
            Add to Cart
          </button>

          <p className="text-xs text-gray-400 text-center mt-6">
            Freshly prepared • Best quality guaranteed
          </p>
        </div>
      </div>
    </section>
  );
}
