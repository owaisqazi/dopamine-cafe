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
import { TrashIcon } from "lucide-react";

/* ---------------- TYPES ---------------- */
interface User {
  id: string;
}

interface ApiProduct {
  id: number;
  name: string;
  image: string;
  pivot: {
    price: number;
    quantity: number;
  };
}

export default function ShoppingCartTabs() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"cart" | "paid">("cart");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountData, setDiscountData] = useState<any>(null);

  const { data: branchData } = useGetBybranchQuery();
  const branch = branchData?.data || [];

  const [applyPromo, { isLoading: promoLoading }] = useApplyPromoMutation();
  const { data: orderData, isLoading: orderLoading } = useGetByOrderQuery(
    user?.id || "",
    { skip: !user?.id }
  );

  /* ---------------- USER FROM COOKIE ---------------- */
  useEffect(() => {
    const userStr = Cookies.get("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  /* ---------------- UNPAID ORDERS → CART ---------------- */
  useEffect(() => {
    if (!orderData?.unpaid_orders || activeTab !== "cart") return;

    orderData.unpaid_orders.forEach((order: any) => {
      order.products?.forEach((product: ApiProduct) => {
        const exists = cartItems.find((i) => i.id === product.id);
        if (!exists) {
          dispatch(
            addToCart({
              id: product.id,
              name: product.name,
              image: product.image,
              price: Number(product.pivot.price),
              quantity: Number(product.pivot.quantity),
            })
          );
        }
      });
    });
  }, [orderData, cartItems, dispatch, activeTab]);

  /* ---------------- SPLIT CART ITEMS ---------------- */
  const unpaidProductIds = useMemo(() => {
    if (!orderData?.unpaid_orders) return [];
    return orderData.unpaid_orders.flatMap((order: any) =>
      order.products?.map((p: ApiProduct) => p.id) || []
    );
  }, [orderData]);

  const unpaidCartItems = useMemo(
    () => cartItems.filter((item) => unpaidProductIds.includes(item.id)),
    [cartItems, unpaidProductIds]
  );

  const normalCartItems = useMemo(
    () => cartItems.filter((item) => !unpaidProductIds.includes(item.id)),
    [cartItems, unpaidProductIds]
  );

  /* ---------------- PRICE CALC ---------------- */
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const delivery = subtotal > 0 ? 2.5 : 0;

  const discount = useMemo(() => {
    if (!discountData) return 0;
    return discountData.type === "percentage"
      ? (subtotal * Number(discountData.amount)) / 100
      : Number(discountData.amount);
  }, [discountData, subtotal]);

  const finalTotal =
    subtotal > 0 ? subtotal + delivery - discount : 0;

  /* ---------------- QTY HANDLER ---------------- */
  const handleQuantity = (item: any, type: "inc" | "dec") => {
    if (type === "inc") {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else {
      if (item.quantity > 1) {
        dispatch(addToCart({ ...item, quantity: -1 }));
      } else {
        dispatch(removeFromCart(item.id));
      }
    }
  };

  /* ---------------- PROMO ---------------- */
  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;
    try {
      const formData = new FormData();
      formData.append("promo_code", promoCode.trim());
      const res = await applyPromo(formData).unwrap();
      setDiscountData(res.data);
      toast.success("Promo applied!");
    } catch (err: any) {
      setDiscountData(null);
      toast.error(err?.data?.message || "Invalid promo");
    }
  };

  if (orderLoading) {
    return (
      <div className="py-16 bg-white relative z-20 text-center text-xl">
        Loading your orders...
      </div>
    );
  }

  return (
    <main className="py-16 bg-white relative z-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* -------- TABS -------- */}
        <div className="flex justify-center gap-4 mb-10">
          {["cart", "paid"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full font-semibold capitalize ${
                activeTab === tab
                  ? "bg-amber-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {tab === "cart" ? "Shopping Cart" : "Paid Orders"}
            </button>
          ))}
        </div>

        {/* -------- PAID ORDERS -------- */}
        {activeTab === "paid" && (
          <div className="space-y-6">
            {orderData?.paid_orders?.length ? (
              orderData.paid_orders.map((order: any) => (
                <article
                  key={order.id}
                  className="p-4 border rounded-2xl"
                >
                  <h3 className="font-bold mb-2">
                    Order #{order.id}
                  </h3>
                  {order.products?.map((p: ApiProduct) => (
                    <div
                      key={p.id}
                      className="flex justify-between py-2"
                    >
                      <span>{p.name}</span>
                      <span>
                        $ {(p.pivot.price * p.pivot.quantity).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  ))}
                </article>
              ))
            ) : (
              <p className="text-center text-gray-400">
                No paid orders
              </p>
            )}
          </div>
        )}

        {/* -------- CART -------- */}
        {activeTab === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* LEFT */}
            <section className="lg:col-span-2 space-y-6">

              {/* UNPAID ORDERS */}
              {unpaidCartItems.length > 0 && (
                <>
                  <h2 className="text-red-600 font-bold text-lg">
                    Unpaid Orders
                  </h2>
                  {unpaidCartItems.map((item) => (
                    <article
                      key={`unpaid-${item.id}`}
                      className="flex justify-between items-center p-4 border border-gray rounded-2xl bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={IMAGE_BASE_URL + item.image}
                          className="w-20 h-20 rounded-lg object-cover"
                          alt={item.name}
                        />
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-red-600">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold">Qty {item.quantity}</span>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 text-sm"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </article>
                  ))}
                </>
              )}

              {/* NORMAL CART ITEMS */}
              {normalCartItems.length > 0 && (
                <>
                  <h2 className="font-bold text-lg">
                    Shopping Cart
                  </h2>
                  {normalCartItems.map((item) => (
                    <article
                      key={`cart-${item.id}`}
                      className="flex justify-between items-center p-4 border rounded-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={IMAGE_BASE_URL + item.image}
                          className="w-20 h-20 rounded-lg object-cover"
                          alt={item.name}
                        />
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-amber-600">${item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border rounded-full">
                          <button
                            onClick={() => handleQuantity(item, "dec")}
                            className="px-3"
                          >
                            -
                          </button>
                          <span className="px-4 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantity(item, "inc")}
                            className="px-3"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
                </>
              )}

              {/* EMPTY */}
              {unpaidCartItems.length === 0 && normalCartItems.length === 0 && (
                <p className="text-gray-400 italic">
                  Your cart is empty
                </p>
              )}
            </section>

            {/* RIGHT */}
            <aside className="bg-gray-50 p-6 rounded-3xl h-fit">
              <h3 className="text-xl font-bold mb-4">
                Order Summary
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="w-full border p-3 rounded-xl mt-4"
              />

              <button
                onClick={applyPromoCode}
                disabled={promoLoading}
                className="w-full mt-3 py-3 bg-black text-white rounded-xl"
              >
                {promoLoading ? "Applying..." : "Apply Promo"}
              </button>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between font-bold text-xl">
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
          totalPrice={subtotal}
          finalTotal={finalTotal}
          discountData={discountData}
          branch={branch}
        />
      </div>
    </main>
  );
}
