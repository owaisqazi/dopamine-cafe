// components/CategoryHeader.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface Category {
  category_id: number;
  category_name: string;
}

interface Props {
  filteredCategories: Category[];
  activeCat: number | null;
  setActiveCat: (id: number) => void;
  scrollToCategory: (id: number) => void;
  isSticky: boolean;
}

export default function CategoryHeader({
  filteredCategories,
  activeCat,
  setActiveCat,
  scrollToCategory,
  isSticky,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categoryIds = filteredCategories.map((cat) => cat.category_id);

  const scrollLeftCategory = () => {
    if (!activeCat) return;
    const currentIndex = categoryIds.indexOf(activeCat);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    const prevCatId = categoryIds[prevIndex];
    scrollToCategory(prevCatId);
  };

  const scrollRightCategory = () => {
    if (!activeCat) return;
    const currentIndex = categoryIds.indexOf(activeCat);
    const nextIndex =
      currentIndex < categoryIds.length - 1
        ? currentIndex + 1
        : categoryIds.length - 1;
    const nextCatId = categoryIds[nextIndex];
    scrollToCategory(nextCatId);
  };

  return (
    <div
      className={`sticky top-0 z-30 mb-6 transition-colors duration-300 ${
        isSticky ? "bg-[#1C1D18] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="relative flex items-center justify-center w-full mx-auto px-2 md:px-10 py-2">
        <button aria-label="Scroll left" onClick={scrollLeftCategory}>
          <ChevronLeft
            className={isSticky ? "text-white" : "bg-[#FFEABF] text-black"}
          />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide px-2 mx-4"
        >
          {filteredCategories.map((cat) => (
            <button
              key={cat.category_id}
              aria-current={activeCat === cat.category_id}
              onClick={() => scrollToCategory(cat.category_id)}
              className={`flex-shrink-0 my-2 px-6 py-2 rounded-full font-semibold ${
                activeCat === cat.category_id
                  ? "bg-[#1C1D18] border border-[#3d3f36] shadow-[0_0_8px_2px_rgba(61,63,54,0.9)] scale-[1.03] text-white"
                  : "bg-[#FFF3D6] text-black"
              }`}
            >
              {cat.category_name}
            </button>
          ))}
        </div>

        <button aria-label="Scroll right" onClick={scrollRightCategory}>
          <ChevronRight
            className={isSticky ? "text-white" : "bg-[#FFEABF] text-black"}
          />
        </button>
      </div>
    </div>
  );
}
