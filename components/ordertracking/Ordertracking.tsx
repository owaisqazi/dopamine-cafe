"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Package, Loader2, Phone, Bike } from "lucide-react";
import { useOrderTrackingMutation } from "@/store/api/authApi";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [rideProgress, setRideProgress] = useState(0);

  const [trackOrder, { isLoading }] = useOrderTrackingMutation();

  // Rider progress animation
  useEffect(() => {
    if (orderData) {
      const interval = setInterval(() => {
        setRideProgress((prev) => (prev < 100 ? prev + 0.5 : 100));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [orderData]);

  const handleTrack = async () => {
    if (!orderId) return;

    try {
      setRideProgress(0);

      const formData = new FormData();
      formData.append("search", orderId);

      const res = await trackOrder(formData).unwrap();

      setOrderData(res?.order);
    } catch (error) {
      console.error("Tracking Error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900 pb-10">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-50 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-black uppercase flex items-center gap-2 tracking-tight text-[#566b30]">
            <Package size={28} /> Tracking Order
          </h1>

          <div className="relative flex-1 max-w-md group">
            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full pl-11 pr-24 py-3 bg-gray-100 border-2 border-transparent rounded-xl focus:bg-white focus:border-[#566b30] outline-none text-sm"
            />
            <Search
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <button
              onClick={handleTrack}
              disabled={isLoading}
              className="absolute right-2 top-2 bg-[#566b30] text-white px-5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                "TRACK NOW"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {orderData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#566b30] text-white rounded-3xl p-6 flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase">Receipt Number</p>
                  <p className="font-mono text-lg">
                    #{orderData?.order_number}
                  </p>

                  <p className="text-xs mt-2">Customer</p>
                  <p className="font-bold">{orderData?.name}</p>

                  <p className="text-xs mt-2">Total</p>
                  <p className="font-bold">Rs. {orderData?.total_amount}</p>
                </div>

                <button className="p-4 bg-white rounded-2xl">
                  <Phone className="text-[#566b30]" />
                </button>
              </div>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl border h-full flex flex-col">
                <div className="p-6 flex justify-between border-b">
                  <div>
                    <p className="text-xs text-gray-400">Current Status</p>
                    <h2 className="text-2xl font-black text-[#566b30] uppercase">
                      {orderData?.status}
                    </h2>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Estimated Time</p>
                    <p className="text-xl font-black">30 - 45 MINS</p>
                  </div>
                </div>

                {/* NO MAP — CLEAN UI */}
                <div className="flex-1 flex items-center justify-center p-10 bg-slate-50">
                  <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center space-y-6">
                    {/* Rider Icon */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="flex justify-center"
                    >
                      <div className="bg-[#566b30] p-5 rounded-full text-white shadow-lg">
                        <Bike size={32} />
                      </div>
                    </motion.div>

                    {/* Status */}
                    <div>
                      <p className="text-xs uppercase text-gray-400">
                        Delivery Status
                      </p>
                      <h2 className="text-xl font-black text-[#566b30] uppercase mt-1">
                        {orderData?.status}
                      </h2>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-[#566b30]">
                          Rider is on the way
                        </span>
                        <span className="text-xs font-bold">
                          {Math.round(rideProgress)}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <motion.div
                          animate={{ width: `${rideProgress}%` }}
                          className="bg-[#566b30] h-full"
                        />
                      </div>
                    </div>

                    {/* Static Time */}
                    <div>
                      <p className="text-xs text-gray-400">Estimated Time</p>
                      <p className="text-2xl font-black text-slate-800">
                        30 - 45 MINS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-32 text-center">
            <Package size={48} className="text-gray-300" />
            <h3 className="text-2xl font-black text-gray-300">
              Ready to track?
            </h3>
          </div>
        )}
      </div>
    </main>
  );
}
