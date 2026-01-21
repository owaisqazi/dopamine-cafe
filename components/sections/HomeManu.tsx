/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGetProductsQuery } from "@/store/api/authApi";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import Link from "next/link";
import SkeletonLoader from "../Skeleton/SkeletonLoader";

interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  image: string;
}

interface Category {
  category_id: number;
  category_name: string;
  items: Product[];
}

export default function HomeMenu() {
  const { data, isLoading } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const apidata: Product[] = data?.data || [];
  const [activeCat, setActiveCat] = useState<number | null>(null);

  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const headerRef = useRef<HTMLDivElement>(null);

  /** GROUP PRODUCTS BY CATEGORY NAME */
  const categories: Category[] = useMemo(() => {
    const map: Record<string, Category> = {};

    apidata.forEach((item, index) => {
      const categoryName = item.name || "Uncategorized";
      if (!map[categoryName]) {
        map[categoryName] = {
          category_name: categoryName,
          category_id: Object.keys(map).length + 1,
          items: [],
        };
      }
      map[categoryName].items.push(item);
    });

    return Object.values(map);
  }, [apidata]);

  /** SEARCH FILTER */
  const filteredCategories = useMemo(() => {
    if (!search) return categories;

    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search, categories]);

  /** SCROLL SPY */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"));
            setActiveCat(id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [filteredCategories]);

  /** SCROLL CATEGORY BUTTON INTO VIEW */
  useEffect(() => {
    if (!activeCat) return;
    const activeBtn = headerRef.current?.querySelector(
      `button[data-id='${activeCat}']`
    ) as HTMLElement;
    activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [activeCat]);

  const scrollToCategory = (id: number) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading) return <SkeletonLoader type="product" count={6} />;

  return (
    <section className="bg-[#FFF3D6] pb-16">
      {/* CATEGORY HEADER */}
      <div className="sticky top-0 z-30 bg-[#1C1C19] mb-6">
        <div className="relative flex items-center w-full mx-auto px-10 py-6">
          <button
            aria-label="Scroll left"
            onClick={() => headerRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
          >
            <ChevronLeft className="text-white" />
          </button>

          <div
            ref={headerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-2"
          >
            {filteredCategories.map((cat) => (
              <button
                key={cat.category_id}
                data-id={cat.category_id}
                onClick={() => scrollToCategory(cat.category_id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-semibold transition-colors ${
                  activeCat === cat.category_id
                    ? "bg-[#f59e0b] text-white"
                    : "bg-black text-white"
                }`}
              >
                {cat.category_name}
              </button>
            ))}
          </div>

          <button
            aria-label="Scroll right"
            onClick={() => headerRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="w-full mx-auto px-10 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for items..."
          className="w-full border rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
        />
      </div>

      {/* PRODUCTS */}
      <div className="w-full mx-auto px-10">
        {filteredCategories.map((cat) => (
          <section
            key={cat.category_id}
            ref={(el) => (sectionRefs.current[cat.category_id] = el)}
            data-id={cat.category_id}
            className="mb-6"
          >
            <h2 className="text-4xl text-center font-bold text-[#f59e0b] mb-8">
              {cat.category_name}
            </h2>

            {cat.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, idx) => (
                  <Link
                    key={item.id}
                    href={{
                      pathname: "/menu-detail",
                      query: { data: encodeURIComponent(JSON.stringify(item)) },
                    }}
                    className="group relative cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex h-44 overflow-hidden"
                    itemScope
                    itemType="https://schema.org/MenuItem"
                    data-aos="fade-down"
                    data-aos-duration="1000"
                    data-aos-delay={idx * 72}
                  >
                    {/* LEFT CONTENT */}
                    <div className="flex-[1.5] p-4 flex flex-col justify-start">
                      <h3 itemProp="name" className="text-[17px] font-bold text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p
                        itemProp="description"
                        className="text-[13px] text-gray-400 line-clamp-3 mb-2 leading-snug"
                      >
                        {item.description}
                      </p>
                      <span className="mt-auto text-lg font-medium text-gray-600">
                        Rs. {Number(item.base_price).toFixed(2)}
                      </span>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex-1 relative flex items-center justify-center pr-4">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden">
                        <Image
                          src={IMAGE_BASE_URL + item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-500"
                          itemProp="image"
                        />
                      </div>
                    </div>

                    {/* PLUS ICON */}
                    <Link
                      href={{
                        pathname: "/menu-detail",
                        query: { data: encodeURIComponent(JSON.stringify(item)) },
                      }}
                      className="absolute bottom-3 right-3 z-10"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <button className="w-9 h-9 bg-[#d97706] hover:bg-[#945003] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95">
                        <Plus className="w-6 h-6" />
                      </button>
                    </Link>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed rounded-3xl">
                <p className="text-xl text-gray-400">No products in this category</p>
              </div>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
