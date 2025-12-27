"use client";

import { useState } from "react";

const COOKIE_CATEGORIES = [
  {
    name: "Strictly Necessary Cookies",
    description:
      "These cookies are essential for the website to function properly. They are always active.",
    alwaysActive: true,
  },
  {
    name: "Performance Cookies",
    description:
      "These cookies help us understand how visitors interact with the site by collecting anonymous data.",
  },
  {
    name: "Functional Cookies",
    description:
      "These cookies enable enhanced functionality and personalization.",
  },
  {
    name: "Targeting Cookies",
    description:
      "These cookies are used to deliver relevant advertisements to you and measure campaign effectiveness.",
  },
];

interface CookieCategoryProps {
  category: (typeof COOKIE_CATEGORIES)[0];
  isOpen: boolean;
  onToggle: () => void;
  selectedOption: string;
  onChange: (value: string) => void;
}

function CookieCategory({
  category,
  isOpen,
  onToggle,
  selectedOption,
  onChange,
}: CookieCategoryProps) {
  return (
    <li className="border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900">{category.name}</span>
        <svg
          className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="bg-white p-4 border-t text-gray-700 text-sm leading-relaxed">
          <p className="mb-3">{category.description}</p>
          {!category.alwaysActive && (
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={category.name}
                  value="enabled"
                  checked={selectedOption === "enabled"}
                  onChange={() => onChange("enabled")}
                  className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                />
                <span>Enabled</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={category.name}
                  value="disabled"
                  checked={selectedOption === "disabled"}
                  onChange={() => onChange("disabled")}
                  className="w-5 h-5 text-amber-600 focus:ring-amber-500"
                />
                <span>Disabled</span>
              </label>
            </div>
          )}
          {category.alwaysActive && (
            <p className="italic text-amber-600 font-semibold">Always Active</p>
          )}
        </div>
      )}
    </li>
  );
}

export default function CookieModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // open first category by default
  const [preferences, setPreferences] = useState<Record<string, string>>({
    "Performance Cookies": "enabled",
    "Functional Cookies": "enabled",
    "Targeting Cookies": "enabled",
  });

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handlePreferenceChange = (categoryName: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [categoryName]: value }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-20 pb-12 px-4 z-50"
      role="dialog"
      aria-modal="true"
      data-aos="flip-left"
      data-aos-duration="500"
      data-aos-easing="ease-out-cubic"
      data-aos-anchor-placement="top-bottom"
      aria-labelledby="cookie-modal-title"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border-b-2 py-4 px-8 relative flex flex-col md:h-auto md:overflow-y-hidden h-[450px] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold focus:outline-none"
          aria-label="Close cookie preferences"
        >
          &times;
        </button>

        <h2
          id="cookie-modal-title"
          className="text-2xl font-bold mb-6 text-amber-700 tracking-wide"
        >
          Privacy Preference Center
        </h2>

        <p className="text-gray-700 mb-6 text-sm leading-relaxed">
          When you visit any website, it may store or retrieve information on
          your browser, mostly in the form of cookies. This information might be
          about you, your preferences, or your device and is mostly used to make
          the site work as you expect it to. The information does not usually
          identify you directly, but can give you a more personalized
          experience.
        </p>

        <h3 className="font-semibold text-gray-900 mb-4 text-lg tracking-wide">
          Manage Consent Preferences
        </h3>

        <ul className="space-y-3 md:h-[200px] md:overflow-y-auto mb-8">
          {COOKIE_CATEGORIES.map((cat, idx) => (
            <CookieCategory
              key={cat.name}
              category={cat}
              isOpen={openIndex === idx}
              onToggle={() => toggleOpen(idx)}
              selectedOption={preferences[cat.name] || "enabled"}
              onChange={(val) => handlePreferenceChange(cat.name, val)}
            />
          ))}
        </ul>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              // Reset all to disabled except necessary
              setPreferences({
                "Performance Cookies": "disabled",
                "Functional Cookies": "disabled",
                "Targeting Cookies": "disabled",
              });
              onClose();
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            Reject All
          </button>
          <button
            onClick={() => onClose()}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            Confirm My Choices
          </button>
        </div>
      </div>
    </div>
  );
}
