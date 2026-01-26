"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Calendar, CreditCard, Tag, X } from "lucide-react";
import Image from "next/image";
import { useGetByOrderQuery } from "@/store/api/authApi";
// @ts-ignore
import Cookies from "js-cookie";
import SkeletonLoader from "../Skeleton/SkeletonLoader";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

export default function MyOrders() {
  const [activeCat, setActiveCat] = useState(1);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  // State for date filter
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setUserId(user.id);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const { data: orders = {}, isLoading } = useGetByOrderQuery(userId || "");

  // API categories logic same as before...
  const categoryKeyMap: any = {
    1: "unpaid_orders",
    2: "order_in_process",
    3: "completed_order",
    4: "order_cencelled",
  };
  const activeOrders: any[] = orders[categoryKeyMap[activeCat]] || [];

  const filteredOrders = activeOrders
    .filter((o) => o.order_number.toLowerCase().includes(search.toLowerCase()))
    .filter((o) => {
      if (!filterDate) return true;
      const orderDate = new Date(o.created_at).toISOString().split("T")[0];
      return orderDate === filterDate;
    });

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen">
      {/* ================= CATEGORY TABS ================= */}
      <div className="relative flex items-center justify-center w-full mx-auto px-2 md:px-10 py-2">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2 mx-1">
          {[
            { id: 1, label: "Unpaid Orders" },
            { id: 2, label: "In Process" },
            { id: 3, label: "Completed" },
            { id: 4, label: "Cancelled" },
          ].map((cat) => (
            <button
              key={cat?.id}
              onClick={() => setActiveCat(cat?.id)}
              className={`flex-shrink-0 my-2 px-6 py-2 rounded-full font-semibold transition-all ${
                activeCat === cat?.id
                  ? "bg-[#1C1D18] border border-[#3d3f36] shadow-[0_0_8px_2px_rgba(61,63,54,0.9)] scale-[1.03] text-white"
                  : "bg-[#FFF3D6] text-black"
              }`}
            >
              {cat?.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 max-w-md mx-auto">
        {/* Search input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search order number..."
            className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FFEABF] outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Date filter */}
        <div className="relative w-full md:w-auto">
          <input
            type="date"
            className="w-full md:w-auto pl-4 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#FFEABF] outline-none shadow-sm"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <SkeletonLoader type="orders" />
        ) : filteredOrders?.length > 0 ? (
          filteredOrders.map((order) => {
            const firstProduct = order?.products?.[0];
            return (
              <div
                key={order?.id}
                onClick={() => setSelectedOrder(order)}
                className="group relative cursor-pointer rounded-2xl shadow-sm hover:shadow-md overflow-hidden flex h-44"
              >
                {/* BACKGROUND IMAGE + OVERLAY */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src={"/product-cart.png"}
                    alt="background"
                    fill
                    className="object-cover"
                  />
                  {/* optional overlay for readability */}
                </div>

                {/* Left Content */}
                <div className="flex-[1.5] p-4 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-800 line-clamp-1 uppercase">
                      #{order?.order_number}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          order?.status === "pending"
                            ? "bg-yellow-500"
                            : order?.status === "cancelled"
                            ? "bg-red-500"
                            : order?.status === "In-process"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      />
                      <p className="text-[12px] font-semibold text-gray-500 capitalize">
                        {order?.status} • {order?.payment_method}
                      </p>
                    </div>

                    <p
                      title={order?.name}
                      className="text-[12px] font-bold text-gray-600 mt-2 line-clamp-1"
                    >
                      Ordered by: {order?.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-black text-[#1C1D18]">
                      Rs. {parseFloat(order?.total_amount).toLocaleString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="px-4 py-1 bg-[#FFEABF] text-gray-800 font-semibold rounded-lg hover:bg-[#d4c3a2] transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>

                {/* Product Image Section */}
                <div className="flex-1 relative flex items-center justify-center pr-4 z-10">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white">
                    <Image
                      src={IMAGE_BASE_URL + firstProduct?.image}
                      alt="order"
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  {/* Quantity Badge if multiple products */}
                  {order?.products.length > 1 && (
                    <div className="absolute top-8 right-2 bg-black text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                      +{order?.products.length - 1}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No orders found.
          </p>
        )}
      </div>

      {/* ================= ORDER DETAILS MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
            {/* BACKGROUND IMAGE + OVERLAY */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/main.jpeg"
                alt="background"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#fdeabf]/40" />
            </div>

            {/* HEADER */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-[#2A2A28] text-lg sm:text-2xl font-bold">
                  Order Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-widest">
                  #{selectedOrder?.order_number}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-[#2A2A28] hover:bg-[#3a3a37] text-white rounded-full p-1 hover:rotate-90 transition-transform"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
              {/* Customer & Address Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-3">
                  <MapPin className="text-[#2A2A28] mt-1" size={18} />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Delivery Address
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {selectedOrder?.address}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-3">
                  <Calendar className="text-[#2A2A28] mt-1" size={18} />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Order Date
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {new Date(selectedOrder?.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                  Items Ordered{" "}
                  <span className="bg-gray-100 text-[12px] px-2 py-0.5 rounded-md">
                    {selectedOrder?.products.length}
                  </span>
                </h4>
                <div className="space-y-4">
                  {selectedOrder?.products.map((prod: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-2xl"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={IMAGE_BASE_URL + prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-800">{prod.name}</h5>
                        <p className="text-xs text-gray-400">
                          Qty: {prod.pivot?.quantity || 1}
                        </p>
                        {prod.options && prod.options.length > 0 && (
                          <div className="mt-2 text-xs text-gray-500 italic space-y-1">
                            {prod.options.map((opt: any) => (
                              <div
                                key={opt.id}
                                className="flex justify-between"
                              >
                                <span>+ {opt.name}</span>
                                <span>
                                  {opt.price_modifier > 0
                                    ? `Rs. ${opt.price_modifier}`
                                    : "Free"}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right font-bold text-gray-800">
                        Rs. {prod.pivot?.price || prod.base_price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-[#2A2A28] text-white p-6 rounded-[24px]">
                <div className="space-y-2 border-b border-white/10 pb-4 mb-4">
                  <div className="flex justify-between text-sm opacity-80">
                    <span>Subtotal</span>
                    <span>Rs. {selectedOrder?.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm opacity-80">
                    <span>Delivery Charges</span>
                    <span>Rs. {selectedOrder?.delivery_charges}</span>
                  </div>
                  <div className="flex justify-between text-sm text-red-400">
                    <span>Discount</span>
                    <span>- Rs. {selectedOrder?.discount}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-[#FFEABF]">
                    Rs. {selectedOrder?.total_amount}
                  </span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-4 sm:p-6 flex flex-col-reverse sm:flex-row justify-end gap-3 border-t">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full sm:w-auto px-6 py-3 bg-[#FFEABF] text-gray-700 hover:bg-[#d4c3a2] font-bold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
