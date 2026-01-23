"use client"
import { Phone } from "lucide-react";
import { useState } from "react";

const ContactFloatButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923002444443"
        target="_blank"
        rel="noopener noreferrer"
        className={`w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 animate-float
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
        title="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Call Button */}
      <a
        href="tel:02137229364"
        className={`w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 animate-float
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
        title="Call Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.48 2.53.74 3.88.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21 3 13.93 3 5.5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.35.26 2.67.74 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
        </svg>
      </a>

      {/* Main Floating Icon */}
      <div
        className="bg-[#2A2A28] p-3 rounded-full shadow-lg cursor-pointer hover:bg-[#3a3a37] transition animate-float"
      >
        <Phone
                          className={"text-[#f59e0b]"}
                          size={24}
                        />
      </div>
    </div>
  );
};

export default ContactFloatButton;
