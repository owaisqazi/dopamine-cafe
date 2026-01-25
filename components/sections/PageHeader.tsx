"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PageHeaderProps {
  customClass?: string; // Rename 'class' to 'customClass' to avoid reserved keyword error
  title: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  isLoading?: boolean;
}

const PageHeader = ({
  customClass = "", // Default empty string
  title,
  backgroundImage = "/gellery1.png",
  backgroundVideo,
  isLoading = false,
}: PageHeaderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathNodes = pathname.split("/").filter(Boolean);

  const queryName = searchParams.get("name");
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!backgroundVideo) setVideoLoaded(true);
    else setVideoLoaded(false);
  }, [backgroundVideo]);

  return (
    <header
      role="banner"
      // Fixed logic: customClass agar empty hai to h-screen apply hoga
      className={`relative ${customClass ? customClass : "h-screen"} overflow-hidden flex items-center justify-center`}
    >
      {/* BACKGROUND */}
      {backgroundVideo ? (
        <div className="fixed inset-0 z-10 overflow-hidden" aria-label="Background video">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="animate-pulse w-48 h-48 bg-white/20 rounded-full" />
            </div>
          )}
          <video
            key={backgroundVideo} // Key added to force re-render on video change
            preload="auto"
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          aria-label="Background image"
        />
      )}

      {/* CONTENT */}
      <div className="relative z-20 text-center px-6">
        <nav aria-label="Breadcrumb" className="flex justify-center items-center gap-2 text-[#d4c3a2] mb-4 text-sm md:text-base font-medium uppercase tracking-widest">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="hover:text-white uppercase transition-colors">
                Home
              </Link>
            </li>
            {pathNodes.map((node, index) => {
              const isLast = index === pathNodes.length - 1;
              const displayName = isLast && queryName ? queryName : node.replace(/-/g, " ");
              return (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-white/50">/</span>
                  <span className="text-white uppercase">{displayName}</span>
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight">
          {title}
        </h1>
        <div className="h-1.5 w-24 bg-[#FFEABF] mx-auto mt-4 rounded-full" />
      </div>
    </header>
  );
};

export default PageHeader;