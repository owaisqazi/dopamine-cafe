/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import OrderModal from "../../components/ui/OrderModal";
import {
  useGetBybranchQuery,
  useApplyPromoMutation,
  useGetByOrderQuery,
} from "@/store/api/authApi";
import toast from "react-hot-toast";
//@ts-ignore
import Cookies from "js-cookie";

interface User {
  id: string;
  name?: string;
  email?: string;
}

export default function ShoppingCartTabs() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [user, setUser] = useState<User | null>(null);
  const { data: branchData } = useGetBybranchQuery();
  const branch = branchData?.data || [];

  const [applyPromo, { isLoading: promoLoading }] = useApplyPromoMutation();
  const { data: orderData, isLoading: orderLoading } = useGetByOrderQuery(user?.id || "");

  const [activeTab, setActiveTab] = useState<"shoping cart" | "unpaid" | "paid">("shoping cart");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountData, setDiscountData] = useState<any>(null);

  // Get user from cookie
  useEffect(() => {
    const userStr = Cookies.get("user");
    const user = userStr ? JSON.parse(userStr) : null;
    setUser(user);
  }, []);

  // -------------------------
  // DATA PER TAB
  // -------------------------
  const displayedOrders = useMemo(() => {
    if (activeTab === "shoping cart") return cartItems;
    if (!orderData?.status) return [];
    return activeTab === "unpaid"
      ? orderData.unpaid_orders
      : orderData.paid_orders;
  }, [activeTab, cartItems, orderData]);

  // -------------------------
  // PRICE CALCULATION
  // -------------------------
  const { totalPrice, finalTotal, safeDiscount } = useMemo(() => {
    let total = 0;

    if (activeTab === "shoping cart") {
      total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
    } else {
      total = displayedOrders.reduce((acc: number, item: any) => {
        const price = Number(item.price || item.products?.[0]?.pivot?.price);
        const qty = item.quantity || item.products?.[0]?.pivot?.quantity || 1;
        return acc + price * qty;
      }, 0);
    }

    const delivery = 2.5;

    let discount = 0;
    if (discountData) {
      discount =
        discountData.type === "percentage"
          ? (total * Number(discountData.amount)) / 100
          : Number(discountData.amount);
    }

    return {
      totalPrice: total,
      safeDiscount: discount,
      finalTotal: total > 0 ? total + delivery - discount : 0,
    };
  }, [cartItems, displayedOrders, discountData, activeTab]);

  // -------------------------
  // QUANTITY HANDLER
  // -------------------------
  const handleQuantity = (id: number | string, type: "inc" | "dec") => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    if (type === "inc") {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else {
      if (item.quantity > 1) {
        dispatch(addToCart({ ...item, quantity: -1 }));
      } else {
        dispatch(removeFromCart(id));
      }
    }
  };

  // -------------------------
  // APPLY PROMO
  // -------------------------
  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    const formData = new FormData();
    formData.append("promo_code", promoCode.trim());
    try {
      const res = await applyPromo(formData).unwrap();
      setDiscountData(res?.data);
      toast.success(res?.message || "Promo applied!");
    } catch (err: any) {
      setDiscountData(null);
      toast.error(err?.data?.message || "Invalid promo code");
    }
  };

  if (orderLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-xl">Loading your orders...</p>
      </div>
    );
  }

  return (
    <main className="py-16 relative z-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* TABS */}
        <div className="flex justify-center gap-4 mb-10">
          {["shoping cart", "unpaid", "paid"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full font-semibold capitalize ${
                activeTab === tab
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-amber-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* NO DATA */}
        {displayedOrders.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl">
            <p className="text-xl text-gray-400">No Data Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* LEFT SECTION */}
            <section className="lg:col-span-2 space-y-6">
              {displayedOrders.map((item: any) => {
                const name = item.name || item.product_name || item.products?.[0]?.name;
                const price = item.price || item.products?.[0]?.pivot?.price;
                const quantity = item.quantity || item.products?.[0]?.pivot?.quantity || 1;
                const image = item.image || item.products?.[0]?.image;

                return (
                  <article
                    key={item.id}
                    className="flex justify-between items-center p-4 border rounded-2xl"
                  >
                    <div className="flex items-center gap-6">
                      <img
                        src={IMAGE_BASE_URL + (image || "")}
                        className="w-24 h-24 rounded-xl object-cover"
                        alt={name}
                      />
                      <div>
                        <h2 className="font-bold">{name}</h2>
                        <p className="text-amber-600 font-semibold">
                          ${Number(price).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {activeTab === "shoping cart" && (
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border rounded-full">
                          <button
                            onClick={() => handleQuantity(item.id, "dec")}
                            className="px-3"
                          >
                            -
                          </button>
                          <span className="px-4 font-bold">{quantity}</span>
                          <button
                            onClick={() => handleQuantity(item.id, "inc")}
                            className="px-3"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-black">
                          ${(Number(price) * quantity).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </section>

            {/* RIGHT SUMMARY SECTION (Always Visible) */}
            <aside className="bg-gray-50 p-6 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold">Order Summary</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>$2.50</span>
                </div>
                {safeDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ${safeDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code"
                className="w-full border px-4 py-3 rounded-xl"
              />

              <button
                onClick={applyPromoCode}
                disabled={promoLoading}
                className="w-full py-3 bg-amber-600 text-white rounded-xl"
              >
                {promoLoading ? "Applying..." : "Apply Promo"}
              </button>

              <div className="border-t pt-4">
                <div className="flex justify-between font-black text-xl">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 py-4 bg-amber-600 text-white rounded-xl"
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
