import Image from "next/image";
import { Plus, Trash2, Minus } from "lucide-react";
import { IMAGE_BASE_URL } from "../../auth/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart, updateQuantity, removeFromCart } from "@/store/cartSlice";

interface Props {
  item: any;
  openModal: (item: any) => void;
  setDeleteId: (item: any) => void;
  handlePlusClick: (item: any) => void;
}

export default function ProductCard({
  item,
  openModal,
  setDeleteId,
  handlePlusClick,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const productCartItems = cartItems.filter(
    (c) => String(c.id) === String(item.id),
  );
  const totalQuantity = productCartItems.reduce((t, c) => t + c.quantity, 0);

  return (
    <div
      onClick={() => openModal(item)}
      className="group relative cursor-pointer rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex h-44 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url(/product-cart.png)",
          backgroundSize:"100% 100%"
      }}
    >
      {/* Left Content */}
      <div className="flex-[1.5] p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-[17px] font-bold text-gray-800 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-[13px] text-gray-700 line-clamp-2 mt-1">
            {item.description}
          </p>
        </div>
        <span className="text-lg font-bold text-gray-700">
          Rs. {item.base_price}
        </span>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center pr-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md">
          <Image
            src={IMAGE_BASE_URL + item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="absolute bottom-3 right-3"
        onClick={(e) => e.stopPropagation()}
      >
        {totalQuantity === 0 ? (
          <button
            onClick={() => openModal(item)}
            className="w-9 h-9 bg-[#2A2A28] text-[#FFEABF] rounded-full flex items-center justify-center shadow-lg hover:bg-[#3a3a37] transition-transform active:scale-90"
          >
            <Plus size={20} />
          </button>
        ) : totalQuantity === 1 ? (
          <div className="bg-white border border-[#2A2A28]/20 flex items-center p-1 rounded-full shadow-sm">
            <button
              onClick={() => setDeleteId(item)}
              className="w-8 h-8 bg-white border border-[#2A2A28] text-[#2A2A28] rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
            </button>
            <span className="px-3 font-bold text-sm text-gray-800">
              {totalQuantity}
            </span>
            <button
              onClick={() => handlePlusClick(item)}
              className="w-8 h-8 bg-[#2A2A28] text-white rounded-full flex items-center justify-center hover:bg-[#3a3a37]"
            >
              <Plus size={16} />
            </button>
          </div>
        ) : (
          <div className="bg-[#fdf2f2] border border-[#2A2A28]/20 flex items-center p-1 rounded-full shadow-sm">
            <button
              onClick={() => {
                const last = productCartItems[productCartItems.length - 1];
                if (last.quantity > 1) {
                  dispatch(
                    updateQuantity({
                      id: last.id,
                      optionsKey: last.optionsKey,
                      change: -1,
                    }),
                  );
                } else {
                  dispatch(
                    removeFromCart({
                      id: last.id,
                      optionsKey: last.optionsKey!,
                    }),
                  );
                }
              }}
              className="w-8 h-8 bg-white border border-[#2A2A28] text-[#2A2A28] rounded-full flex items-center justify-center hover:bg-red-50 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 font-bold text-sm text-gray-800">
              {totalQuantity}
            </span>
            <button
              onClick={() => handlePlusClick(item)}
              className="w-8 h-8 bg-[#2A2A28] text-white rounded-full flex items-center justify-center hover:bg-[#3a3a37]"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
