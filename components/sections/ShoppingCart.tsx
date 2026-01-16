/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart, removeFromCart, CartItem } from "@/store/cartSlice";
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

interface User {
  id: string;
}

interface CartItemProps {
  item: CartItem | any;
  handleQuantity?: (item: CartItem, type: "inc" | "dec") => void;
  readOnly?: boolean;
  isUnpaid?: boolean;
}

function CartItemCard({
  item,
  handleQuantity,
  readOnly,
  isUnpaid,
}: CartItemProps) {
  console.log(item, "unpaid===?");
  return (
    <article className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
      {/* LEFT: Image */}
      <div className="sm:col-span-2 w-full">
        <img
          src={IMAGE_BASE_URL + (item?.image || item?.product?.image)}
          alt={item?.name || item?.product?.name || "Product"}
          className="w-full h-24 sm:h-24 rounded-xl object-cover"
        />
      </div>

      {/* CENTER: Name + Price */}
      <div className="sm:col-span-6 flex flex-col justify-center">
        <h3 className="font-bold text-gray-800 text-lg">
          {item?.name || item?.product?.name}
        </h3>
        <p className="text-amber-600 font-semibold mt-1">
          Rs.{(item?.price * item?.quantity).toFixed(2)}
        </p>
      </div>

      {/* RIGHT: Quantity + Remove */}
      {!readOnly && handleQuantity && (
        <div className="sm:col-span-4 flex items-center justify-end gap-4">
          <div className="flex items-center justify-end border rounded-full overflow-hidden">
            <button
              onClick={() => handleQuantity(item, "dec")}
              className="px-3 py-1 hover:bg-gray-200 transition"
            >
              −
            </button>
            <span className="px-4 font-semibold">{item?.quantity}</span>
            <button
              onClick={() => handleQuantity(item, "inc")}
              className="px-3 py-1 hover:bg-gray-200 transition"
            >
              +
            </button>
          </div>
          <button
            //@ts-ignore
            onClick={() => handleQuantity(item, "remove")}
            className="text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Quantity display only for readOnly */}
      {readOnly && (
        <div className="sm:col-span-4 flex items-center justify-end gap-4">
          <span className="px-4 font-semibold">{item?.quantity}</span>
        </div>
      )}

      {/* Options */}
      {item?.options?.length > 0 && (
        <div className="sm:col-span-12 mt-4 grid grid-cols-1 gap-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
          {item?.options.map((opt: any, index: number) => (
            <div
              key={index}
              className="flex justify-between text-gray-700 text-sm"
            >
              <span>{opt.name}</span>
              <span className="font-semibold">
                Rs.{Number(opt.price_modifier)}
              </span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function ShoppingCartTabs() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<"cart" | "unpaid" | "paid">(
    "cart"
  );
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

  // Get user from cookie
  useEffect(() => {
    const userStr = Cookies.get("user");
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  // Load unpaid orders into cart
  useEffect(() => {
    if (!orderData?.unpaid_orders || activeTab !== "cart") return;
    orderData.unpaid_orders.forEach((order: any) => {
      order?.items?.forEach((item: any) => {
        const exists = cartItems.find((i) => String(i.id) === String(item.id));
        if (!exists) {
          dispatch(
            addToCart({
              id: item.id,
              name: item?.product?.name || item?.name || order?.name,
              image: item?.product?.image || item?.image,
              description:
                item?.description || item?.product?.description || "",
              price: Number(item.price),
              quantity: Number(item.quantity),
              options: item.options || [],
            })
          );
        }
      });
    });
  }, [orderData, activeTab]);

  // Split cart items
  const unpaidProductIds = useMemo(() => {
    if (!orderData?.unpaid_orders) return [];
    return orderData.unpaid_orders.flatMap((order: any) =>
      order?.items?.map((item: any) => item.id)
    );
  }, [orderData]);

  const unpaidCartItems = useMemo(
    () => cartItems.filter((item) => unpaidProductIds.includes(item?.id)),
    [cartItems, unpaidProductIds]
  );

  const normalCartItems = useMemo(
    () => cartItems.filter((item) => !unpaidProductIds.includes(item?.id)),
    [cartItems, unpaidProductIds]
  );

  // Price calculations
  const subtotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        const optionsTotal = item?.options?.reduce(
          (sum: number, opt: any) => sum + Number(opt.price_modifier),
          0
        );
        return acc + item?.price * item?.quantity + optionsTotal;
      }, 0),
    [cartItems]
  );

  const delivery = subtotal > 0 ? 200 : 0;
  const discount = useMemo(() => {
    if (!discountData) return 0;
    return discountData.type === "percentage"
      ? (subtotal * Number(discountData.amount)) / 100
      : Number(discountData.amount);
  }, [discountData, subtotal]);

  const finalTotal = subtotal + delivery - discount;

  // Quantity handler
  const handleQuantity = (item: CartItem, type: "inc" | "dec" | "remove") => {
    if (type === "inc") {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else if (type === "dec") {
      if (item.quantity > 1) {
        dispatch(addToCart({ ...item, quantity: -1 }));
      } else {
        dispatch(removeFromCart(item.id));
      }
    } else if (type === "remove") {
      dispatch(removeFromCart(item.id));
    }
  };

  // Promo
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
      <div className="py-16 bg-white text-center text-xl">
        Loading your orders...
      </div>
    );
  }

  return (
    <main className="py-16 bg-white relative z-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {["cart", "unpaid", "paid"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 rounded-full font-semibold capitalize ${
                activeTab === tab ? "bg-amber-600 text-white" : "bg-gray-100"
              }`}
            >
              {tab === "cart"
                ? "Shopping Cart"
                : tab === "unpaid"
                ? "Unpaid Orders"
                : "Paid Orders"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT: Items */}
          <section className="lg:col-span-2 space-y-6">
            {/* Cart */}
            {activeTab === "cart" &&
              (normalCartItems.length > 0 ? (
                normalCartItems.map((item) => (
                  <CartItemCard
                    key={`cart-${item.id}`}
                    item={item}
                    handleQuantity={handleQuantity}
                  />
                ))
              ) : (
                <p className="text-gray-400 italic">Your cart is empty</p>
              ))}

            {/* Unpaid Orders */}
            {activeTab === "unpaid" &&
              (orderData?.unpaid_orders?.length > 0 ? (
                orderData.unpaid_orders.map((order: any) => (
                  <div key={order?.id} className="space-y-4">
                    <h2 className="text-amber-600 font-bold text-xl mb-4">
                      Order Number:{order?.order_number}
                    </h2>
                    {order?.products.map((product: any) => {
                      // Find the matching item to get options
                      const item = order?.items.find(
                        (i: any) => i.product_id === product?.id
                      );
                      return (
                        <CartItemCard
                          key={product?.id}
                          item={{
                            ...product,
                            quantity: item?.quantity || 1,
                            price: Number(item?.price || product?.base_price),
                            options: item?.options || [],
                          }}
                          handleQuantity={handleQuantity}
                        />
                      );
                    })}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No unpaid orders</p>
              ))}

            {/* Paid Orders */}
            {activeTab === "paid" &&
              (orderData?.paid_orders?.length > 0 ? (
                orderData.paid_orders.map((order: any) => (
                  <div key={order?.id} className="space-y-4">
                    <h2 className="text-green-600 font-bold text-xl mb-4">
                      Paid Order Number:{order?.order_number}
                    </h2>
                    {order?.products.map((product: any) => {
                      const item = order?.items.find(
                        (i: any) => i?.product_id === product?.id
                      );
                      return (
                        <CartItemCard
                          key={product?.id}
                          item={{
                            ...product,
                            quantity: item?.quantity || 1,
                            price: Number(item?.price || product?.base_price),
                            options: item?.options || [],
                          }}
                          readOnly
                        />
                      );
                    })}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No paid orders</p>
              ))}
          </section>

          {/* RIGHT: Summary */}
          <aside className="bg-gray-50 p-6 rounded-3xl h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Rs.{delivery.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>- Rs.{discount.toFixed(2)}</span>
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
                <span>Rs.{finalTotal.toFixed(2)}</span>
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

        {/* Order Modal */}
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
