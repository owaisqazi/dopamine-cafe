"use client";

import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ThankYou() {
  const searchParams = useSearchParams();
  const orderDetailParam = searchParams.get("orderDetail");

  const orderDetail = orderDetailParam
    ? JSON.parse(decodeURIComponent(orderDetailParam))
    : null;
  const orderNumber = orderDetail?.order?.order_number || "N/A";
  // console.log(orderDetail?.order, "orderDetail===?");
  return (
    <div className="min-h-screen flex items-center justify-center bg-black pt-20 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-[#566b30] w-16 h-16" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Order Confirmed 🎉
        </h1>

        {orderNumber && (
          <p className="text-sm text-gray-500 mb-2">Order ID: #{orderNumber}</p>
        )}

        <p className="text-gray-600 mb-6">
          Thank you for your order! Your order has been placed successfully.
        </p>

        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-6">
          ⏰ Delivery usually takes 30–45 minutes
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <button
            // onClick={() => router.push("/")}
            className="px-6 py-2 rounded-lg bg-[#566b30] text-white"
          >
            Back to Home
          </button>

          <button
            // onClick={() => router.push("/shopping")}
            className="px-6 py-2 rounded-lg border"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}
