/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from "../../auth/axiosInstance";
import {
  X,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  image: string;
  images: string[] | string;
  base_price: string;
  branch_price: number;
  optionsKey: string;
  options: {
    id: number;
    name: string;
    price_modifier: string;
  }[];
}

interface ModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  item,
  isOpen,
  onClose,
}: ModalProps) {
  if (!item || !isOpen) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [showShare, setShowShare] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const parsedImages = useMemo(() => {
    if (Array.isArray(item.images) && item.images.length) return item.images;
    try {
      const parsed = item.images ? JSON.parse(item.images as any) : [];
      return parsed.length ? parsed : [item.image];
    } catch {
      return [item.image];
    }
  }, [item]);

  const handleOptionToggle = (optionId: number) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const totalPrice = useMemo(() => {
    const base = Number(item.branch_price || item.base_price);
    const optionsTotal =
      item.options
        ?.filter((opt) => selectedOptions.includes(opt?.id))
        .reduce((acc, curr) => acc + Number(curr.price_modifier), 0) || 0;
    return (base + optionsTotal) * quantity;
  }, [item, selectedOptions, quantity]);

  const handleAddToCart = () => {
    // Generate a unique optionsKey so every add creates a new object
    const optionsKey =
      selectedOptions.length > 0
        ? selectedOptions.sort().join("-") + `-${Date.now()}`
        : `no-options-${Date.now()}`;

    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: Number(item.branch_price || item.base_price),
        quantity,
        image: parsedImages[0],
        //@ts-ignore
        options: item.options.filter((o) => selectedOptions.includes(o.id)),
        optionsKey, // <-- unique for every click
      }),
    );

    toast.success("Added to cart!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 bg-[#d97706] text-white rounded-full p-1 hover:bg-[#bb6605] transition-colors"
        >
          <X size={24} />
        </button>

        {/* LEFT: IMAGE SECTION */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 relative">
          <div className="relative w-full aspect-square max-w-[400px]">
            <Image
              src={IMAGE_BASE_URL + (parsedImages[0] || item.image)}
              alt={item.name}
              fill
              className="object-contain rounded-full border-[12px] border-blue-50 shadow-xl"
            />
          </div>
        </div>

        {/* RIGHT: CONTENT SECTION */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          {/* HEADER & SHARE */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                {item.name}
              </h2>
              <p className="text-xl font-bold text-gray-700 mt-1">
                Rs. {item.base_price}
              </p>
            </div>

            {/* SHARE BUTTON & POPUP */}
            <div className="relative">
              <button
                onClick={() => setShowShare(!showShare)}
                className="bg-[#d97706] text-white p-2 rounded-full hover:bg-[#bb6605]"
              >
                <Share2 size={20} />
              </button>

              {showShare && (
                <div className="absolute top-12 right-0 flex flex-col gap-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button className="p-2 bg-blue-500 text-white rounded-md shadow-lg hover:scale-110 transition">
                    <LinkIcon size={18} />
                  </button>
                  <button className="p-2 bg-blue-600 text-white rounded-md shadow-lg hover:scale-110 transition">
                    <Facebook size={18} />
                  </button>
                  <button className="p-2 bg-[#d97706] text-white rounded-md shadow-lg hover:scale-110 transition">
                    <ShoppingCart size={18} />
                  </button>
                  <button className="p-2 bg-sky-500 text-white rounded-md shadow-lg hover:scale-110 transition">
                    <Twitter size={18} />
                  </button>
                  <button className="p-2 bg-blue-700 text-white rounded-md shadow-lg hover:scale-110 transition">
                    <Linkedin size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            {item.description}
          </p>

          <hr className="mb-6" />

          {/* BREAD TYPE / OPTIONS SECTION */}
          <div className="flex-grow">
            {/* EXTRAS */}
            {item.options.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Extras</h3>
                <div className="space-y-4 mb-6">
                  {item.options.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(opt.id)}
                          onChange={() => handleOptionToggle(opt.id)}
                          className="w-5 h-5 rounded border-gray-300 
             accent-[#f59e0b] focus:ring-[#f59e0b]"
                        />

                        <div>
                          <p className="text-gray-800 font-medium leading-none">
                            {opt.name}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-600 font-semibold">
                        Rs. {opt.price_modifier}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* FOOTER: QUANTITY AND ADD TO CART */}
          <div className="mt-auto pt-6 border-t flex flex-col md:flex-row items-center gap-4">
            {/* QUANTITY CONTROL */}
            <div className="flex items-center w-full md:w-auto bg-gray-100 rounded-lg p-1 justify-center">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 flex items-center justify-center text-[#bb6605] hover:text-[#bb6605] rounded-lg"
              >
                <Minus size={18} />
              </button>
              <span className="w-8 text-center font-bold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#bb6605] hover:text-[#bb6605] rounded-lg"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* ADD TO CART BUTTON */}
            <button
              onClick={handleAddToCart}
              className="flex-1 w-full md:w-auto bg-[#bb6605] text-white py-4 px-6 rounded-xl flex justify-between items-center font-bold text-sm hover:bg-[#a35c04] transition-all transform active:scale-[0.98]"
            >
              <span>Rs. {totalPrice.toFixed(1)}</span>
              <span className="flex items-center gap-2">
                Add to Cart <ChevronRight size={20} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Chota helper component for arrow icon
function ChevronRight({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
