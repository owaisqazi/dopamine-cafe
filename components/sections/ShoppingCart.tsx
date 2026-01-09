/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import OrderModal from "../../components/ui/OrderModal";
import {
  useGetBybranchQuery,
  useApplyPromoMutation,
} from "@/store/api/authApi";
import toast from "react-hot-toast";

export default function ShoppingCart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  // RTK Query
  const [applyPromo, { isLoading }] = useApplyPromoMutation();
  const { data } = useGetBybranchQuery();
  const branch = data?.data || [];

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountData, setDiscountData] = useState<any>(null);

  // ===============================
  // Price Calculations (SAFE)
  // ===============================
  const { totalPrice, finalTotal, safeDiscount } = useMemo(() => {
    const total =
      cartItems?.reduce(
        (acc, item) => acc + item?.price * item?.quantity,
        0
      ) || 0;

    const delivery = 2.5;
    let discount = 0;

    if (discountData) {
      if (discountData?.type === "percentage") {
        discount = (total * Number(discountData?.amount)) / 100;
      } else {
        discount = Number(discountData?.amount);
      }
    }

    return {
      totalPrice: total,
      safeDiscount: discount,
      finalTotal: total > 0 ? total + delivery - discount : 0,
    };
  }, [cartItems, discountData]);

  // ===============================
  // Quantity Handler
  // ===============================
  const handleQuantity = (
    id: number | string,
    type: "increment" | "decrement"
  ) => {
    const item = cartItems?.find((i) => i.id === id);
    if (!item) return;

    if (type === "increment") {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else {
      if (item?.quantity > 1) {
        dispatch(addToCart({ ...item, quantity: -1 }));
      } else {
        dispatch(removeFromCart(id));
      }
    }
  };

  // ===============================
  // Apply Promo Code (VERCEL SAFE)
  // ===============================
  const applyPromoCode = async () => {
     if (!promoCode.trim()) return;
    const formData = new FormData();
    formData.append("promo_code", promoCode?.trim());
    try {
      const res = await applyPromo(formData).unwrap();

      setDiscountData(res?.data);
      toast.success(res?.message || "Promo code applied!");
    } catch (err: any) {
      console.error("Promo Error:", err);
      setDiscountData(null);
      toast.error(err?.data?.message || "Invalid promo code");
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <main className="py-8 md:py-16 relative z-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Review Your Cart
          </h1>
          <p className="text-gray-500 mt-2">
            You have {cartItems?.length} items in your coffee bag.
          </p>
        </header>

        {cartItems?.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl">
            <p className="text-xl text-gray-400">
              Your cart feels lonely. Add some coffee!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* LEFT */}
            <section className="lg:col-span-2 space-y-6">
              {cartItems?.map((item) => (
                <article
                  key={item?.id}
                  className="flex justify-between items-center p-4 border rounded-2xl"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={IMAGE_BASE_URL + item?.image}
                      className="w-24 h-24 rounded-xl object-cover"
                      alt={item?.name}
                    />
                    <div>
                      <h2 className="font-bold capitalize">{item?.name}</h2>
                      <p className="text-amber-600 font-semibold">
                        ${item?.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() =>
                          handleQuantity(item?.id, "decrement")
                        }
                        className="px-3"
                      >
                        -
                      </button>
                      <span className="px-4 font-bold">
                        {item?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantity(item?.id, "increment")
                        }
                        className="px-3"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-black">
                      ${(item?.price * item?.quantity).toFixed(2)}
                    </span>
                  </div>
                </article>
              ))}
            </section>

            {/* RIGHT */}
            <aside className="bg-gray-50 p-6 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold border-b pb-4">
                Order Summary
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice?.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>$2.50</span>
                </div>

                {safeDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount
                      {discountData?.type === "percentage"
                        ? ` (${discountData?.amount}%)`
                        : ""}
                    </span>
                    <span>- ${safeDiscount?.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Promo */}
              <div>
                <input
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="w-full border px-4 py-3 rounded-xl"
                />
                <button
                  onClick={applyPromoCode}
                  disabled={isLoading}
                  className="w-full mt-3 py-3 bg-amber-500 text-white rounded-xl font-bold"
                >
                  {isLoading ? "Applying..." : "Apply Promo"}
                </button>
              </div>

              <div className="border-t pt-6">
                <div className="flex justify-between text-xl font-black">
                  <span>Total</span>
                  <span className="text-amber-600">
                    ${finalTotal?.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 py-4 bg-amber-600 text-white rounded-2xl font-black"
                >
                  Checkout
                </button>
              </div>
            </aside>
          </div>
        )}

        <OrderModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          cartItems={cartItems}
          totalPrice={totalPrice}
          finalTotal={finalTotal}
          discountData={discountData}
          branch={branch}
        />
      </div>
    </main>
  );
}
