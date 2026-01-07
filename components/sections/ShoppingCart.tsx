/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import axiosInstance, { IMAGE_BASE_URL } from "../auth/axiosInstance";
import OrderModal from "../../components/ui/OrderModal";
import { useGetBybranchQuery } from "@/store/api/authApi";
import toast from "react-hot-toast";

export default function ShoppingCart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useGetBybranchQuery();
  const branch = data?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountData, setDiscountData] = useState<any>(null);
  const [loadingPromo, setLoadingPromo] = useState(false);

  // Memoized Calculations for Performance
  const { totalPrice, finalTotal, safeDiscount } = useMemo(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discount = discountData?.amount || 0;
    const delivery = 2.5;
    return {
      totalPrice: total,
      safeDiscount: discount,
      finalTotal: total > 0 ? total + delivery - discount : 0,
    };
  }, [cartItems, discountData]);

  const handleQuantity = (id: number | string, type: "increment" | "decrement") => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (type === "increment") {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else {
      if (item.quantity > 1) dispatch(addToCart({ ...item, quantity: -1 }));
      else dispatch(removeFromCart(id));
    }
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    setLoadingPromo(true);
    try {
      const res = await axiosInstance.post("/user/promo-code", { promo_code: promoCode });
      if (res?.data?.data) {
        setDiscountData(res.data.data);
        toast.success("Promo code applied!");
      }
    } catch (err) {
      toast.error("Invalid promo code");
      setDiscountData(null);
    } finally {
      setLoadingPromo(false);
    }
  };

  return (
    <main className="py-8 md:py-16 relative z-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Review Your Cart
          </h1>
          <p className="text-gray-500 mt-2">You have {cartItems.length} items in your coffee bag.</p>
        </header>

        {cartItems.length === 0 ? (
          <section className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-xl text-gray-400">Your cart feels lonely. Add some coffee!</p>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Left: Product List */}
            <section className="lg:col-span-2 space-y-6" aria-label="Cart Items">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow bg-white gap-6"
                >
                  <div className="flex items-center space-x-6 w-full sm:w-auto">
                    <img
                      src={IMAGE_BASE_URL + item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-sm"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 capitalize">{item.name}</h2>
                      <p className="text-amber-600 font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto space-x-8">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-50 rounded-full px-3 py-1 border border-gray-200">
                      <button
                        onClick={() => handleQuantity(item.id, "decrement")}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-bold px-4 text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item.id, "increment")}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-amber-500 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xl font-black text-gray-900 min-w-[90px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </article>
              ))}
            </section>

            {/* Right: Sticky Summary */}
            <aside className="lg:sticky lg:top-24 bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Delivery Fee</span>
                  <span className="text-gray-900 font-bold">$2.50</span>
                </div>
                {safeDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount Applied</span>
                    <span className="font-bold">-${safeDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Promo Section */}
              <div className="pt-4">
                <label htmlFor="promo" className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Have a Coupon?
                </label>
                <div className="flex group">
                  <input
                    id="promo"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Code"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={loadingPromo}
                    className="px-6 bg-white border border-l-0 border-gray-200 rounded-r-xl text-amber-500 font-bold hover:bg-amber-50 transition disabled:opacity-50"
                  >
                    {loadingPromo ? "..." : "Apply"}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-gray-800">Grand Total</span>
                  <span className="text-3xl font-black text-amber-600 leading-none">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber-100 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Proceed to Checkout
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