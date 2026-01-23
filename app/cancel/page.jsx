"use client";
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] px-4">
      <div className="max-w-md w-full bg-[#111] rounded-2xl shadow-xl p-8 text-center border border-red-500/30">
        
        <XCircle className="mx-auto text-red-500" size={80} />

        <h1 className="text-3xl font-bold text-white mt-6">
          Payment Cancelled 😔
        </h1>

        <p className="text-gray-400 mt-3">
          Your payment was not completed.  
          Don’t worry, you can try again anytime.
        </p>

        <div className="mt-8 space-y-3">
          <p
            className="block w-full bg-[#C7862F] text-black font-semibold py-3 rounded-xl hover:bg-[#e58e00] transition"
          >
            Try Again
          </p>

          <Link
            href="/"
            className="block w-full border border-gray-600 text-gray-300 py-3 rounded-xl hover:bg-white/5 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
