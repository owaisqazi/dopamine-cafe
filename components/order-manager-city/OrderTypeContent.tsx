import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
//@ts-ignore
import Cookies from "js-cookie";
import { useGetAreaQuery, useGetCityQuery } from "@/store/api/authApi";
import AreaDropdown from "./AreaDropdown";

interface ContentProps {
  onClose: () => void;
}

const ACCENT = "#C7862F";

const CITY_ICONS: Record<string, string[]> = {
  karachi: ["🏛️"],
  lahore: ["🕌"],
  islamabad: ["🏞️"],
  multan: ["🌾"],
  peshawar: ["⛰️"],
};

const OrderTypeContent = ({ onClose }: ContentProps) => {
  const [type, setType] = useState<"delivery" | "pickup">("delivery");
  const [city, setCity] = useState("karachi");
  const [area, setArea] = useState("");

  // Load cities and areas
  const { data: citydata, isLoading: cityIsLoading } = useGetCityQuery("pakistan");
  const cities = Array.isArray(citydata) ? citydata : citydata?.data || [];

  const { data, isLoading } = useGetAreaQuery(city, { skip: !city });
  const areaOptions = Array.isArray(data?.data) ? data.data : [];

  // ✅ Load previous selection from sessionStorage or Cookies
  useEffect(() => {
    const saved = sessionStorage.getItem("location_session_data") || Cookies.get("user_location");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.city) setCity(parsed.city);
        if (parsed.area) setArea(parsed.area);
        if (parsed.type) setType(parsed.type);
      } catch (err) {
        console.error("Failed to parse previous location:", err);
      }
    }
  }, []);

  const handleFinalSelection = () => {
    if (!area) {
      alert("Please select your area");
      return;
    }

    const orderData = { type, city, area };
    Cookies.set("user_location", JSON.stringify(orderData), { expires: 7 });
    sessionStorage.setItem("location_session", "true");
    sessionStorage.setItem("location_session_data", JSON.stringify(orderData));

    // Navbar ko update karne ke liye custom event
    window.dispatchEvent(new Event("locationUpdated"));

    onClose();
  };

  return (
    <div className="p-4 text-center bg-[#FFEABF]e">
      <p className="text-sm text-gray-500 mb-4 font-medium">Please select your location</p>

      <button
        className="flex items-center gap-2 px-6 py-2 rounded-full mx-auto mb-4 text-sm font-bold text-white"
        style={{ backgroundColor: ACCENT }}
      >
        <MapPin size={16} /> Use Current Location
      </button>

      <div className="flex justify-center gap-6 mb-4 overflow-x-auto py-2">
        {cityIsLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center min-w-[80px] animate-pulse">
                <div className="w-24 h-24 border-2 rounded-2xl bg-gray-200 mb-1" />
                <div className="h-4 w-16 bg-gray-200 rounded text-center" />
              </div>
            ))
          : cities?.map((item: any, index: number) => {
              const cityName = item?.city;
              const cityKey = cityName.toLowerCase();
              const icons = CITY_ICONS[cityKey] || ["📍"];
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCity(cityKey);
                    setArea(""); // reset area when changing city
                  }}
                  className="cursor-pointer flex flex-col items-center min-w-[80px]"
                >
                  <div
                    className={`w-24 h-24 border-2 rounded-2xl flex items-center justify-center gap-1 mb-1 transition ${
                      city === cityKey ? "shadow-md" : "opacity-60"
                    }`}
                    style={{ borderColor: city === cityKey ? ACCENT : "#eee" }}
                  >
                    {icons?.map((icon, i) => (
                      <span key={i} className="text-2xl">
                        {icon}
                      </span>
                    ))}
                  </div>
                  <p
                    className="text-xs font-bold uppercase text-center"
                    style={{ color: city === cityKey ? ACCENT : "#9ca3af" }}
                  >
                    {cityName}
                  </p>
                </div>
              );
            })}
      </div>

      <div className="max-w-sm mx-auto mb-4">
        <AreaDropdown value={area} onChange={setArea} options={areaOptions} loading={isLoading} accentColor={ACCENT} />
      </div>

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
