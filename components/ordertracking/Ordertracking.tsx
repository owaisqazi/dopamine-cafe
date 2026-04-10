"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Animation ke liye
import {
  Search,
  MapPin,
  Package,
  CheckCircle2,
  Circle,
  ArrowRight,
  Loader2,
  Phone,
  Bike, // Rider icon ke liye
} from "lucide-react";

type OrderDataType = {
  status: string;
  orderNumber: string;
  steps: {
    title: string;
    description: string;
    done: boolean;
    active: boolean;
  }[];
  location: {
    lat: number;
    lng: number;
  };
};

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderDataType | null>(null);
  const [rideProgress, setRideProgress] = useState(0);

  // Rider ki movement ko simulate karne ke liye
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
    setLoading(true);
    setRideProgress(0); // Reset progress

    const data: OrderDataType = {
      status: "On the way",
      orderNumber: orderId,
      steps: [
        { title: "Order Confirmed", description: "Your order has been received", done: true, active: false },
        { title: "Preparing", description: "The kitchen is preparing your food", done: true, active: false },
        { title: "On the way", description: "Rider is heading to your location", done: false, active: true },
        { title: "Delivered", description: "Enjoy your meal!", done: false, active: false },
      ],
      location: { lat: 24.8637454, lng: 67.0550295 },
    };

    setTimeout(() => {
      setOrderData(data);
      setLoading(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] font-sans text-slate-900 pb-10">
      {/* Header Search Bar */}
      <div className="bg-white border-b sticky top-0 z-50 px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-black flex items-center gap-2 tracking-tight text-[#566b30]">
            <Package size={28} /> DASH TRACK
          </h1>

          <div className="relative flex-1 max-w-md group">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. FP-9921)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full pl-11 pr-24 py-3 bg-gray-100 border-2 border-transparent rounded-xl focus:bg-white focus:border-[#566b30] transition-all outline-none text-sm"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#566b30]" size={18} />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="absolute right-2 top-2 bg-[#566b30] hover:bg-[#455626] text-white px-5 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-[#566b30]/20"
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : "TRACK NOW"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {orderData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in zoom-in-95 duration-500">
            {/* LEFT COLUMN: Delivery Progress */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-gray-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-black text-xl tracking-tight">Delivery Progress</h3>
                  <span className="bg-[#566b30]/10 text-[#566b30] px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    LIVE UPDATE
                  </span>
                </div>

                <div className="relative space-y-10">
                  {orderData.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-6 relative">
                      {idx !== orderData.steps.length - 1 && (
                        <div className={`absolute left-[15px] top-8 w-[3px] h-[calc(100%+12px)] rounded-full ${step.done ? "bg-[#566b30]" : "bg-gray-100"}`} />
                      )}
                      <div className="relative z-10">
                        {step.done ? (
                          <div className="bg-[#566b30] p-1 rounded-full shadow-md shadow-[#566b30]/30 text-white">
                            <CheckCircle2 size={22} />
                          </div>
                        ) : step.active ? (
                          <div className="h-8 w-8 rounded-full border-4 border-[#566b30] bg-white flex items-center justify-center">
                            <div className="h-2 w-2 bg-[#566b30] rounded-full animate-ping" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full border-4 border-gray-100 bg-white flex items-center justify-center text-gray-200">
                            <Circle size={18} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-base font-bold leading-none ${step.done || step.active ? "text-slate-900" : "text-gray-400"}`}>
                          {step.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Info Card */}
              <div className="bg-[#566b30] hover:bg-[#455626] text-white rounded-3xl p-6 flex justify-between items-center shadow-2xl">
                <div>
                  <p className="text-gray-100 text-[10px] uppercase font-bold tracking-widest mb-1">Receipt Number</p>
                  <p className="font-mono text-lg font-bold tracking-wider text-white">#{orderData.orderNumber.toUpperCase()}</p>
                </div>
                <button className="p-4 bg-white hover:bg-gray-300 rounded-2xl transition-all group shadow-lg">
                  <Phone size={20} className="text-[#566b30] group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Current Status & Map */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-gray-100 h-full flex flex-col">
                <div className="p-6 flex justify-between items-center bg-white border-b">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Current Status</p>
                    <h2 className="text-2xl font-black text-[#566b30] uppercase italic tracking-tighter">
                      {orderData.status}
                    </h2>
                  </div>
                  {/* Floating Time Estimate */}
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Estimated Time</p>
                    <p className="text-xl font-black text-slate-800">12-15 MINS</p>
                  </div>
                </div>

                {/* --- MODERN MAP UI STARTS HERE --- */}
                <div className="flex-1 relative bg-slate-50 min-h-[500px]">
                  
                  {/* 1. MAP BACKGROUND */}
                  <iframe
                    src="http://googleusercontent.com/maps.google.com/6"
                    className="w-full h-full absolute inset-0 grayscale-[20%]"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>

                  {/* 2. TOP PROGRESS BAR OVERLAY */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[85%] z-10">
                    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-[#566b30] uppercase tracking-widest">Rider is on the way</span>
                        <span className="text-[10px] font-mono font-bold text-slate-50">{Math.round(rideProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${rideProgress}%` }}
                          className="bg-[#566b30] h-full shadow-[0_0_10px_rgba(86,107,48,0.5)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. ANIMATED RIDER (BIKE) */}
                  <motion.div 
                    className="absolute z-20"
                    initial={{ top: "65%", left: "15%" }}
                    animate={{ 
                      top: `${65 - (rideProgress * 0.35)}%`, 
                      left: `${15 + (rideProgress * 0.5)}%` 
                    }}
                    transition={{ type: "tween", ease: "linear" }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="bg-white text-[9px] font-bold px-2 py-1 rounded-full shadow-md border border-[#566b30] mb-2 animate-bounce">
                        Your Food is Here!
                      </div>
                      <div className="bg-[#566b30] p-3 rounded-full shadow-2xl border-2 border-white text-white">
                        <Bike size={24} />
                      </div>
                    </div>
                  </motion.div>

                  {/* 4. DESTINATION PIN */}
                  <div className="absolute top-[30%] right-[35%] z-10">
                     <div className="relative">
                        <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping" />
                        <MapPin className="text-red-600 fill-red-600" size={32} />
                     </div>
                  </div>

                  {/* 5. VIEW LARGER MAP BUTTON */}
                  {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-6">
                    <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2 hover:bg-black transition-all text-sm group">
                      View Live Location <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div> */}

                </div>
                {/* --- MODERN MAP UI ENDS HERE --- */}
              </div>
            </div>
          </div>
        ) : (
          /* Landing State */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-[#566b30]/5 rounded-full flex items-center justify-center mb-6"
            >
              <Package size={48} className="text-[#566b30]/20" />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-300 tracking-tighter uppercase">Ready to track?</h3>
            <p className="text-gray-400 mt-2 max-w-xs mx-auto text-sm">
              Enter your order identifier in the top bar to see real-time delivery status.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}