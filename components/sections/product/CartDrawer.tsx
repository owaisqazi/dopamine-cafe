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
      ? (Number(subtotal) * Number(discountData.amount)) / 100
      : Number(discountData.amount);
  }, [discountData, subtotal]);

  const finalTotal = Number(subtotal) + Number(delivery) - Number(discount);

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
          <div className="absolute inset-0 -z-10 bg-[#e2e2e2a6]/40" />

          {/* CONTENT */}
          <div className="relative flex flex-col h-full ">
            {/* HEADER */}
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button
                onClick={onClose}
                className="bg-[#566b30] text-white rounded-full p-1 hover:rotate-90 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* ITEMS */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] m-1">
              {cartItems.length ? (
                cartItems.map((item) => {
                  const options = item?.options || [];

                  const basePrice = Number(item?.price ?? 0);
                  const quantity = Number(item?.quantity ?? 1);

                  const optionsTotal = options.reduce(
                    (sum: number, opt: any) =>
                      sum + Number(opt?.price_modifier ?? 0),
                    0,
                  );

                  const singleItemTotal = basePrice + optionsTotal;
                  const finalItemTotal = singleItemTotal * quantity;

                  return (
                    <div
                      key={item?.id + item?.optionsKey}
                      className="border-b pb-6"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          <Image
                            src={IMAGE_BASE_URL + item?.image}
                            alt={item?.name || "product image"}
                            fill
                            sizes="(max-width: 768px) 100px, 120px"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="/blur.png"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-bold">{item?.name}</h3>

                            <div className="flex items-center gap-3 border rounded-full px-3 py-1">
                              <button
                                className="text-red-500"
                                onClick={() =>
                                  quantity === 1
                                    ? onDeleteRequest(
                                        item?.id,
                                        item?.optionsKey,
                                      )
                                    : dispatch(
                                        updateQuantity({
                                          id: item?.id,
                                          optionsKey: item?.optionsKey,
                                          change: -1,
                                        }),
                                      )
                                }
                              >
                                {quantity === 1 ? (
                                  <Trash2 size={14} />
                                ) : (
                                  <Minus size={14} />
                                )}
                              </button>

                              <span className="font-bold">{quantity}</span>

                              <button
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item?.id,
                                      optionsKey: item?.optionsKey,
                                      change: +1,
                                    }),
                                  )
                                }
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>

                          {/* ✅ Base Price */}
                          <div className="flex justify-between text-sm font-bold text-[#566b30] mt-2">
                            <span>Price</span>
                            <span>Rs. {basePrice.toFixed(2)}</span>
                          </div>

                          {/* ✅ Extras Label */}
                          {options.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs font-bold text-[#566b30]">
                                Extra:
                              </p>

                              <div className="space-y-1 mt-1">
                                {options.map((opt: any) => {
                                  const optionPrice = Number(
                                    opt?.price_modifier ?? 0,
                                  );

                                  return (
                                    <div
                                      key={opt.id}
                                      className="flex justify-between text-xs font-bold text-[#566b30]"
                                    >
                                      <span>+ {opt.name}</span>
                                      <span>Rs. {optionPrice.toFixed(2)}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* ✅ Final Total */}
                          <div className="flex justify-between font-bold text-[#566b30] mt-3">
                            <span>Total</span>
                            <span>Rs. {finalItemTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-400 py-20">Cart is empty</p>
              )}

              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-500 hover:text-[#566b30]"
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
                className="w-full mt-3 py-3 bg-[#566b306b] text-white border border-[#566b30] hover:bg-[#000000c9] rounded-xl mb-3"
              >
                {promoLoading ? "Applying..." : "Apply Promo"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  onClose();
                }}
                className="w-full bg-[#566b30] hover:bg-[#566b30c9] text-white py-4 rounded-2xl flex justify-between px-6 font-bold"
              >
                <span>Checkout</span>
                <span className="flex items-center gap-2">
                  Rs. {Number(finalTotal)?.toFixed(2)}
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
