"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { useGetByOrderQuery } from "@/store/api/authApi";
// @ts-ignore
import Cookies from "js-cookie";

interface Category {
  category_id: number;
  category_name: string;
}

interface Order {
  id: number;
  status: string;
  total: number;
  created_at: string;
}

const categories: Category[] = [
  { category_id: 1, category_name: "Pending" },
  { category_id: 2, category_name: "Processing" },
  { category_id: 3, category_name: "Completed" },
  { category_id: 4, category_name: "Cancelled" },
];

// API key mapping
const categoryKeyMap: Record<number, string> = {
  1: "unpaid_orders",
  2: "order_in_process",
  3: "completed_order",
  4: "order_cencelled",
};

export default function MyOrders() {
  const [activeCat, setActiveCat] = useState<number>(categories[0].category_id);
  const [search, setSearch] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState("");

  // Get user from cookie
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setUserId(user.id);
      } catch (e) {
        console.error("Cookie parse error", e);
      }
    }
  }, []);

  const {
    data: orders = {},
    isLoading,
    isError,
  } = useGetByOrderQuery(userId || "");

  // Orders by active tab
  const activeOrders: Order[] =
    orders && categoryKeyMap[activeCat]
      ? orders[categoryKeyMap[activeCat]] || []
      : [];

  // 🔍 Search filter
  const filteredOrders = activeOrders.filter((order) => {
    const q = search.toLowerCase();
    return (
      order.id.toString().includes(q) ||
      order.status.toLowerCase().includes(q) ||
      new Date(order.created_at).toLocaleDateString().includes(q)
    );
  });

  if (!userId) return null;

  return (
    <div className="p-4 md:p-10">
      {/* ================= TABS ================= */}
      <div className="relative flex items-center justify-center w-full mx-auto px-2 md:px-10 py-2">
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 mx-4"
        >
          {categories.map((cat) => (
            <button
              key={cat.category_id}
              onClick={() => setActiveCat(cat.category_id)}
              className={`flex-shrink-0 my-2 px-6 py-2 rounded-full font-semibold transition-all ${
                activeCat === cat.category_id
                  ? "bg-[#1C1D18] border border-[#3d3f36] shadow-[0_0_8px_2px_rgba(61,63,54,0.9)] scale-[1.03] text-white"
                  : "bg-[#FFF3D6] text-black"
              }`}
            >
              {cat.category_name}
            </button>
          ))}
        </div>
      </div>
      {/* ================= SEARCH ================= */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full md:w-full">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-3 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2A2A28]"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>
      {/* ================= CONTENT ================= */}
      <div className="mt-6">
        {isLoading && <p>Loading orders...</p>}
        {!isLoading && !isError && filteredOrders.length === 0 && (
          <p className="text-gray-600 text-center">No orders found</p>
        )}

        {!isLoading && !isError && filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition bg-white"
              >
                <p className="font-semibold">Order ID: {order.id}</p>
                <p>Status: {order.status}</p>
                <p>Total: ${order.total}</p>
                <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
