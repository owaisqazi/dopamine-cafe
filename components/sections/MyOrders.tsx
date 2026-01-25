"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetByOrderQuery } from "@/store/api/authApi";
//@ts-ignore
import Cookies from "js-cookie"; // for reading cookies on client side

interface Category {
  category_id: number;
  category_name: string;
}

const categories: Category[] = [
  { category_id: 1, category_name: "Pending" },
  { category_id: 2, category_name: "Processing" },
  { category_id: 3, category_name: "Completed" },
  { category_id: 4, category_name: "Cancelled" },
];

export default function MyOrders() {
  const [activeCat, setActiveCat] = useState<number>(categories[0].category_id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState("");

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

  const { data: orders, isLoading, isError } = useGetByOrderQuery(userId || "");
  const scrollLeftCategory = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRightCategory = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  // Filter orders by category
  const filteredOrders = orders?.filter(
    (o: any) =>
      o.status ===
      categories.find((c) => c.category_id === activeCat)?.category_name,
  );

  if (!userId) return null;

  return (
    <div className="p-4 md:p-10">
      {/* Tabs */}
      <div className="relative flex items-center justify-center w-full mx-auto px-2 md:px-10 py-2">
        <button aria-label="Scroll left" onClick={scrollLeftCategory}>
          <ChevronLeft className="bg-[#FFEABF] text-black" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 mx-4"
        >
          {categories.map((cat) => (
            <button
              key={cat.category_id}
              aria-current={activeCat === cat.category_id}
              onClick={() => setActiveCat(cat.category_id)}
              className={`flex-shrink-0 my-2 px-6 py-2 rounded-full font-semibold ${
                activeCat === cat.category_id
                  ? "bg-[#1C1D18] border border-[#3d3f36] shadow-[0_0_8px_2px_rgba(61,63,54,0.9)] scale-[1.03] text-white"
                  : "bg-[#FFF3D6] text-black"
              }`}
            >
              {cat.category_name}
            </button>
          ))}
        </div>

        <button aria-label="Scroll right" onClick={scrollRightCategory}>
          <ChevronRight className="bg-[#FFEABF] text-black" />
        </button>
      </div>

      {/* Orders Content */}
      <div className="mt-6">
        {isLoading && <p>Loading orders...</p>}
        {isError && <p className="text-red-500">Error fetching orders</p>}
        {!isLoading && !isError && filteredOrders?.length === 0 && (
          <p>No orders found for this category</p>
        )}
        {!isLoading && !isError && filteredOrders?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order: any) => (
              <div
                key={order.id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition"
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
