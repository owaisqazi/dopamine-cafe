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
    <div className={className}>
      <PhoneInput
        value={field.value}
        onChange={handleChange}
        enableSearch
        country="pk"
        containerClass="!w-full !border-gray-300 !rounded-none !p-0 !shadow-none"
        inputClass="!w-full !border-none !outline-none !shadow-none !pl-10"
        buttonClass="!border-none"
        dropdownClass="!z-50"
        inputProps={{ name }}
        placeholder={placeholder || "Phone Number"}
      />
      {meta.touched && meta.error && (
        <p className="text-red-500 bg- text-sm mt-1">{meta.error}</p>
      )}
    </div>
  );
}

// API formatting
export const formatPhoneForApi = (phone: string) => {
  const phoneNumber = parsePhoneNumberFromString(phone);
  return phoneNumber?.number || phone;
};
