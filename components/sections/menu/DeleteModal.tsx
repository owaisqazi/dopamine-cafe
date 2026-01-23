"use client";
import { Trash2, X } from "lucide-react";
import { AppDispatch } from "@/store/store";
import { removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

interface DeleteModalProps {
  productId: number;
  optionsKey?: string;
  cartItems: any[];
  onClose: () => void;
}

export default function DeleteModal({ productId, cartItems, onClose }: DeleteModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = () => {
    cartItems
      .filter((c) => String(c.id) === String(productId))
      .forEach((itemToRemove) =>
        dispatch(removeFromCart({ id: itemToRemove.id, optionsKey: itemToRemove.optionsKey! })),
      );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[250] flex items-center justify-center p-2 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex items-center gap-2">
            <Trash2 className="text-[#d97706]" size={20} />
            <h3 className="text-lg font-bold text-gray-800">Confirm Deletion</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="py-2 px-4 text-start">
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Are you sure you want to remove this product from the cart?
          </p>
        </div>

        <div className="p-4 flex gap-3 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[#9E9E9E] text-white rounded-xl font-bold text-sm hover:bg-gray-500 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            className="flex-1 py-3 bg-[#d97706] text-white rounded-xl font-bold text-sm hover:bg-[#b45309] transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Trash2 size={16} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
