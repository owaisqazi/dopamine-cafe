/* eslint-disable react/jsx-key */
"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { AppDispatch } from "@/store/store";
import { updateQuantity } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from "@/components/auth/axiosInstance";

interface RepeatModalProps {
  item: any;
  cartItems: any[];
  onClose: () => void;
  onChooseAgain: (newItem: any) => void;
}

export default function RepeatModal({ item, cartItems, onClose, onChooseAgain }: RepeatModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleRepeatOrder = () => {
    const last = [...cartItems].reverse().find((c) => String(c.id) === String(item.id));
    if (last) {
      dispatch(updateQuantity({ id: last.id, optionsKey: last.optionsKey, change: 1 }));
      onClose();
      toast.success("Added to cart!");
    }
  };

  const handleChooseAgain = () => {
    const newItem = { ...item, optionsKey: `no-options-${Date.now()}` };
    onChooseAgain(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-2 sm:p-4 backdrop-blur-sm">
  <div className="relative rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
    
    {/* BACKGROUND IMAGE + OVERLAY */}
    <div className="absolute inset-0 -z-10">
      <Image
        src="/main.jpeg" // apni background image ka path
        alt="background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#fdeabf]/40" /> {/* overlay for readability */}
    </div>

    {/* HEADER */}
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-[#2A2A28] text-lg sm:text-2xl font-bold">
        Repeat Previous Customization?
      </h2>
      <button
        onClick={onClose}
        className="bg-[#2A2A28] hover:bg-[#3a3a37] text-white rounded-full p-1 hover:rotate-90 transition-transform"
      >
        <X size={18} />
      </button>
    </div>

    {/* CONTENT */}
    <div className="p-4 sm:p-6 overflow-y-auto flex-1">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="w-full md:flex-1">
          <div className="relative w-40 h-40 sm:w-64 sm:h-64 mx-auto shadow-lg rounded-full overflow-hidden border-4">
            <Image
              src={IMAGE_BASE_URL + item.image}
              alt="product"
              fill
              className="object-contain rounded-full border-[12px] border-blue-50 shadow-xl"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-3 text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
          <p className="text-lg font-bold text-[#2A2A28]">Rs. {item.base_price}</p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{item.description}</p>

          {/* Previous Add-ons */}
          <div className="pt-2 bg-orange-50/50 p-3 rounded-xl border border-orange-100">
            <p className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wider">Previous Add-ons</p>
            {cartItems
              .filter((c) => String(c.id) === String(item.id))
              .slice(-1)
              .map((last: any) =>
                last.options && last.options.length > 0 ? (
                  last.options.map((opt: any) => (
                    <div key={opt.id} className="flex justify-between items-center italic text-sm text-gray-600">
                      <span>+ {opt.name}</span>
                      <span className="font-semibold">{opt.price_modifier > 0 ? `Rs. ${opt.price_modifier}` : "Free"}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No add-ons selected</p>
                ),
              )}
          </div>
        </div>
      </div>
    </div>

    {/* FOOTER */}
    <div className="p-4 sm:p-6 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t ">
      <button
        onClick={handleChooseAgain}
        className="w-full sm:w-auto px-6 py-3 bg-[#FFEABF] text-gray-700 hover:bg-[#d4c3a2] font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <X size={16} /> I&lsquo;ll Choose Again
      </button>
      <button
        onClick={handleRepeatOrder}
        className="w-full sm:w-auto px-8 py-3 bg-[#2A2A28] hover:bg-[#3a3a37] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
      >
        Repeat Order ↻
      </button>
    </div>
  </div>
</div>

  );
}
