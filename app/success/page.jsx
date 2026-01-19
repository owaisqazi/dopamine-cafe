"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="max-w-md w-full bg-[#111] rounded-2xl shadow-xl p-8 text-center border border-[#f59e0b]/30">
        
        <CheckCircle className="mx-auto text-[#f59e0b]" size={80} />

        <h1 className="text-3xl font-bold text-white mt-6">
          Order Successful 🎉
        </h1>

        <p className="text-gray-400 mt-3">
          Thank you for choosing <span className="text-[#f59e0b]">The Dopamine Cafe</span>.  
          Your order has been placed successfully.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/"
            className="block w-full bg-[#f59e0b] text-black font-semibold py-3 rounded-xl hover:bg-[#e58e00] transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
