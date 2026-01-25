"use client";
import { Trash2, X } from "lucide-react";
import { AppDispatch, RootState } from "@/store/store";
import { removeFromCart } from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

interface DeleteModalProps {
  productId: number;
  onClose: () => void;
  cartItems?: any[];      // "?" lagane se Navbar ka error khatam ho jayega
  optionsKeyData?: string; 
  type?: string;
  optionsKey?: string;    // TypeScript error fix karne ke liye
}

export default function DeleteModal({
  productId,
  cartItems: propCartItems,
  type,
  optionsKeyData,
  onClose,
}: DeleteModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  // Agar props se cartItems nahi mile, to Redux se le lo
  const reduxCartItems = useSelector((state: RootState) => state.cart.items);
  const itemsToFilter = propCartItems || reduxCartItems;

  const handleRemove = () => {
    if (type === "cart" && optionsKeyData) {
      // Navbar/Cart Drawer wala case: Specific customization remove karein
      dispatch(
        removeFromCart({
          id: productId,
          optionsKey: optionsKeyData,
        }),
      );
    } else {
      // HomeMenu wala case: Us product ke saare variations delete karein
      itemsToFilter
        .filter((c) => String(c.id) === String(productId))
        .forEach((itemToRemove) =>
          dispatch(
            removeFromCart({
              id: itemToRemove.id,
              optionsKey: itemToRemove.optionsKey!,
            }),
          ),
        );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[250] flex items-center justify-center p-2 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-2 border-b">
          <div className="flex items-center gap-2">
            <Trash2 className="text-[#2A2A28]" size={20} />
            <h3 className="text-lg font-bold text-[#2A2A28]">Confirm Deletion</h3>
          </div>
          <button onClick={onClose} className="text-[#2A2A28]">
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
            className="flex-1 py-3 hover:bg-[#d4c3a2] text-gray-700 rounded-xl font-bold text-sm bg-[#FFEABF] transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleRemove}
            className="flex-1 py-3 bg-[#2A2A28] text-white rounded-xl font-bold text-sm hover:bg-[#b17323] transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Trash2 size={16} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}