"use client";

import dynamic from "next/dynamic";
import { useField } from "formik";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "react-phone-input-2/lib/style.css";

// Dynamic import for Next.js SSR
const PhoneInput = dynamic(() => import("react-phone-input-2"), { ssr: false });

interface PhoneFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
}

export default function PhoneField({
  name,
  placeholder,
  className,
}: PhoneFieldProps) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (phone: string) => {
    helpers.setValue(phone.startsWith("+") ? phone : `+${phone}`);
  };

  return (
    <div className={`w-full ${className}`}>
      <PhoneInput
        value={field.value}
        onChange={handleChange}
        enableSearch
        country="pk"
        containerClass="!w-full !border-none !bg-transparent"
        
        // !text-black ya !text-gray-800 use karein taake +92 nazar aaye
        inputClass="!w-full !border-none !outline-none !shadow-none !pl-12 !bg-transparent !text-black !text-base"
        
        buttonClass="!border-none !bg-transparent hover:!bg-transparent"
        dropdownClass="!z-50 !text-black"
        inputProps={{ 
          name,
          required: true,
        }}
        placeholder={placeholder || "Phone Number"}
      />
      
      <style jsx global>{`
        /* Placeholder ko light rakhein taake input feel aaye */
        .react-tel-input .form-control::placeholder {
          color: #9ca3af !important; /* light gray placeholder */
        }
        /* Country code (+92) ka color control karne ke liye */
        .react-tel-input .selected-flag .dial-code {
          color: black !important;
          font-weight: 500;
        }
        .react-tel-input .selected-flag {
          background: transparent !important;
        }
      `}</style>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
}

// API formatting
export const formatPhoneForApi = (phone: string) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber?.number || phone;
};
