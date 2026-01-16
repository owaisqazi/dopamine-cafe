import React, { useState } from "react";
import { MapPin } from "lucide-react";
//@ts-ignore
import Cookies from "js-cookie";
import { useGetAreaQuery } from "@/store/api/authApi";
import AreaDropdown from "./AreaDropdown";

interface ContentProps {
  onClose: () => void;
}

const ACCENT = "#f59e0b";

const OrderTypeContent = ({ onClose }: ContentProps) => {
  const [type, setType] = useState<"delivery" | "pickup">("delivery");
  const [city, setCity] = useState("Karachi");
  const [area, setArea] = useState("");

  const { data, isLoading } = useGetAreaQuery(city, { skip: !city });

  const areaOptions = Array.isArray(data?.data) ? data.data : [];
  console.log("Areas Data:", city, area);

  const handleFinalSelection = () => {
    if (!area) {
      alert("Please select your area");
      return;
    }
    const orderData = { type, city, area };
    Cookies.set("user_location", JSON.stringify(orderData), { expires: 7 });
    sessionStorage.setItem("location_session", "true");

    onClose();
  };

  return (
    <div className="p-4 text-center bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Select your order type
      </h2>

      {/* Toggle */}
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 p-1 rounded-full flex w-48 border">
          {["delivery", "pickup"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as any)}
              className={`flex-1 py-2 rounded-full text-[10px] font-black transition ${
                type === t ? "text-white" : "text-gray-400"
              }`}
              style={{
                backgroundColor: type === t ? ACCENT : "transparent",
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4 font-medium">
        Please select your location
      </p>

      <button
        className="flex items-center gap-2 px-6 py-2 rounded-full mx-auto mb-4 text-sm font-bold text-white"
        style={{ backgroundColor: ACCENT }}
      >
        <MapPin size={16} /> Use Current Location
      </button>

      {/* Cities */}
      <div className="flex justify-center gap-6 mb-4">
        {["Karachi", "Islamabad"].map((c) => (
          <div
            key={c}
            onClick={() => {
              setCity(c);
              setArea("");
            }}
            className="cursor-pointer"
          >
            <div
              className={`w-24 h-24 border-2 rounded-2xl flex items-center justify-center mb-1 ${
                city === c ? "shadow-md" : "opacity-60"
              }`}
              style={{ borderColor: city === c ? ACCENT : "#eee" }}
            >
              <span className="text-3xl">{c === "Karachi" ? "🏛️" : "🕌"}</span>
            </div>
            <p
              className="text-xs font-bold uppercase"
              style={{ color: city === c ? ACCENT : "#9ca3af" }}
            >
              {c}
            </p>
          </div>
        ))}
      </div>

      {/* Area Dropdown */}
      <div className="max-w-sm mx-auto mb-4">
        <AreaDropdown
          value={area}
          onChange={setArea}
          options={areaOptions}
          loading={isLoading}
          accentColor={ACCENT}
        />
      </div>

      {/* Final */}
      <button
        onClick={handleFinalSelection}
        className="w-full max-w-sm py-4 rounded-xl font-black text-lg text-white shadow-lg"
        style={{ backgroundColor: ACCENT }}
      >
        Select
      </button>
    </div>
  );
};

export default OrderTypeContent;
