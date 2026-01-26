"use client";

import Image from "next/image";
import { X, Plus, Minus, Trash2, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateQuantity } from "@/store/cartSlice";
import { IMAGE_BASE_URL } from "@/components/auth/axiosInstance";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
//@ts-ignore
import Cookies from "js-cookie";
import {
  useApplyPromoMutation,
  useGetBybranchQuery,
  useGetDeliveryAmountQuery,
} from "@/store/api/authApi";
import OrderModal from "@/components/ui/OrderModal";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDeleteRequest: (id: any, optionsKey: any) => void;
  subtotal: number;
}
interface User {
  id: string;
}

const CartDrawer = ({
  isOpen,
  onClose,
  onDeleteRequest,
  subtotal,
}: CartDrawerProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [discountData, setDiscountData] = useState<any>(null);

  const { data: branchData } = useGetBybranchQuery();
  const branch = branchData?.data || [];
  const { data: deliveryAmount } = useGetDeliveryAmountQuery();
  const [applyPromo, { isLoading: promoLoading }] = useApplyPromoMutation();
  // Get user from cookie
  useEffect(() => {
    const userStr = Cookies.get("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);
  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    try {
      const formData = new FormData();
      formData.append("promo_code", promoCode.trim());
      const res = await applyPromo(formData).unwrap();
      setDiscountData(res.data);
      setPromoCode("");
      toast.success("Promo applied!");
    } catch (err: any) {
      setDiscountData(null);
      toast.error(err?.data?.message || "Invalid promo");
    }
  };

  const delivery = deliveryAmount?.data?.delivery_charges || 0;

  const discount = useMemo(() => {
    if (!discountData) return 0;
    return discountData.type === "percentage"
      ? (subtotal * Number(discountData.amount)) / 100
      : Number(discountData.amount);
  }, [discountData, subtotal]);

  const finalTotal = subtotal + delivery - discount;

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] ${isOpen ? "visible" : "invisible"}`}
      >
        {/* BACKDROP */}
        <div
          className={`absolute inset-0 bg-black/40  transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* DRAWER */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[400px] shadow-2xl transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* 🔹 BACKGROUND IMAGE */}
          <div className="absolute inset-0 -z-10 bg-[url('/main.jpeg')] bg-cover bg-center bg-no-repeat" />

          {/* 🔹 OVERLAY */}
          <div className="absolute inset-0 -z-10 bg-[#fdeabf]/40" />

          {/* CONTENT */}
          <div className="relative flex flex-col h-full ">
            {/* HEADER */}
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button
                onClick={onClose}
                className="bg-[#2A2A28] text-white rounded-full p-1 hover:rotate-90 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* ITEMS */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-250px)]">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div key={item.id} className="border-b pb-6">
                    <div className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={IMAGE_BASE_URL + item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{item.name}</h3>

                          <div className="flex items-center gap-3 border rounded-full px-3 py-1">
                            <button
                              className="text-red-500"
                              onClick={() =>
                                item.quantity === 1
                                  ? onDeleteRequest(item.id, item.optionsKey)
                                  : dispatch(
                                      updateQuantity({
                                        id: item.id,
                                        optionsKey: item.optionsKey,
                                        change: -1,
                                      }),
                                    )
                              }
                            >
                              {item.quantity === 1 ? (
                                <Trash2 size={14} />
                              ) : (
                                <Minus size={14} />
                              )}
                            </button>

                            <span className="font-bold">{item.quantity}</span>

                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    optionsKey: item.optionsKey,
                                    change: +1,
                                  }),
                                )
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        <p className="text-[#2A2A28] font-bold">
                          Rs. {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-20">Cart is empty</p>
              )}

              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-500 hover:text-[#2A2A28]"
              >
                <Plus size={18} /> Add more items
              </button>
            </div>

            {/* FOOTER */}
            <div className="absolute bottom-0 left-0 w-full py-2 px-6 border-t ">
              <div className="flex justify-between mb-3">
                <span>Delivery Fee</span>
                <span className="font-bold">Rs. {delivery}</span>
              </div>
              {discount !== 0 && (
                <div className="flex justify-between mb-3">
                  <span>Discount</span>
                  <span className="font-bold">Rs. {discount}</span>
                </div>
              )}
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="w-full border p-3 rounded-xl"
              />
              <button
                onClick={applyPromoCode}
                disabled={promoLoading}
                className="w-full mt-3 py-3 bg-[#FFEABF] text-gray-700 border border-[#2A2A28] hover:bg-[#d4c3a2] rounded-xl mb-3"
              >
                {promoLoading ? "Applying..." : "Apply Promo"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  onClose();
                }}
                className="w-full bg-[#2A2A28] hover:bg-[#3a3a37] text-white py-4 rounded-2xl flex justify-between px-6 font-bold"
              >
                <span>Checkout</span>
                <span className="flex items-center gap-2">
                  Rs. {finalTotal?.toFixed(2)}
                  <ChevronRight size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cartItems={cartItems}
        totalPrice={subtotal}
        finalTotal={finalTotal}
        delivery={delivery}
        discountData={discountData}
        branch={branch}
      />
    </>
  );
};

export default CartDrawer;
