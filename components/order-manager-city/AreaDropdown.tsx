import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";

interface Area {
  _id?: string;
  id?: string;
  area: string;
}

interface AreaDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: Area[];
  loading?: boolean;
  accentColor: string;
}

const AreaDropdown = ({
  value,
  onChange,
  options,
  loading = false,
  accentColor,
}: AreaDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Selected */}
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-4 border-2 rounded-lg bg-white font-semibold"
        style={{ borderColor: accentColor }}
        onClick={() => setOpen((p) => !p)}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {loading ? "Fetching Areas..." : value || "Please select your area"}
        </span>

        {loading ? (
          <Loader2 size={18} className="animate-spin" color={accentColor} />
        ) : (
          <ChevronDown size={18} color={accentColor} />
        )}
      </button>

      {/* Dropdown */}
      {open && !loading && options.length > 0 && (
        <ul className="absolute left-0 right-0 mt-0 bg-white border rounded-lg shadow-xl z-30 h-[90px] overflow-y-auto">
          {options?.map((item) => (
            <li
              key={item?._id || item?.id}
              onClick={() => {
                onChange(item?.area || "");
                setOpen(false);
              }}
              className="px-4 py-2 text-start text-sm leading-tight cursor-pointer hover:bg-amber-50 hover:text-amber-600 transition"
            >
              {item?.area}
            </li>
          ))}
        </ul>
      )}

      {/* Empty */}
      {open && !loading && options.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg p-4 text-sm text-gray-400 shadow">
          No areas available
        </div>
      )}
    </div>
  );
};

export default AreaDropdown;
