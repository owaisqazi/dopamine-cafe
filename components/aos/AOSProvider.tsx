"use client";

import { useEffect, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  children: ReactNode;
}

export default function AOSProvider({ children }: Props) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return <>{children}</>;
}
