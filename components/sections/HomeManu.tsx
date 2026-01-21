/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGetProductsQuery } from "@/store/api/authApi";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import SkeletonLoader from "../Skeleton/SkeletonLoader";
import ProductDetailModal from "./ProductDetailModal";

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
  products: Product[];
}

export default function HomeMenu() {
  const { data, isLoading } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const headerRef = useRef<HTMLDivElement>(null);

  /** DATA TRANSFORMING */
  const categories: Category[] = useMemo(() => {
    if (!data?.data) return [];
    // Data mapping based on your shared object
    return data.data.map((cat: any) => ({
      category_id: cat.id,
      category_name: cat.name,
      products: cat.products || [],
    }));
  }, [data]);

  /** SEARCH FILTER */
  const filteredCategories = useMemo(() => {
    if (!search) return categories;

    return categories
      .map((cat) => ({
        ...cat,
        products: cat.products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [search, categories]);

  /** SCROLL SPY & OTHER LOGIC (REMAINS SAME) **/
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
      { rootMargin: "-40% 0px -40% 0px" },
    );

    Object.values(sectionRefs.current).forEach(
      (el) => el && observer.observe(el),
    );
    return () => observer.disconnect();
  }, [filteredCategories]);
  const openModal = (item: any) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);
  const scrollToCategory = (id: number) => {
    const element = sectionRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 650); // adjust threshold
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (isLoading) return <SkeletonLoader type="product" count={6} />;

  return (
    <section className="pb-16">
      {/* CATEGORY HEADER */}
      <div
        className={`sticky top-0 z-30 mb-6 transition-colors duration-300 ${
          isSticky ? "bg-[#1C1D18] shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="relative flex items-center justify-center w-full mx-auto px-10 py-6">
          <button
            aria-label="Scroll left"
            onClick={() =>
              headerRef.current?.scrollBy({ left: -200, behavior: "smooth" })
            }
          >
            <ChevronLeft
              className={isSticky ? "text-white" : "bg-[#FFEABF] text-black"}
            />
          </button>

          <div
            ref={headerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-2"
          >
            {filteredCategories.map((cat) => (
              <button
                key={cat?.category_id}
                data-id={cat?.category_id}
                onClick={() => scrollToCategory(cat?.category_id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-semibold transition-colors ${
                  activeCat === cat?.category_id
                    ? "bg-[#f59e0b] text-white"
                    : "bg-[#FFF3D6] text-black"
                }`}
              >
                {cat?.category_name}
              </button>
            ))}
          </div>

          <button
            aria-label="Scroll right"
            onClick={() =>
              headerRef.current?.scrollBy({ left: 200, behavior: "smooth" })
            }
          >
            <ChevronRight
              className={isSticky ? "text-white" : "bg-[#FFEABF] text-black"}
            />
          </button>
        </div>
      </div>

      <div className="w-full mx-auto px-10 mb-6">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for items..."
            className="w-full border rounded-full pl-5 pr-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="w-full mx-auto px-10">
        {filteredCategories?.map((cat: any) => (
          <section key={cat?.category_id} className="mb-6">
            <h2 className="text-center font-bold mb-8 text-[40px] text-[#f59e0b]">
              {cat?.category_name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat?.products?.map((item: any) => (
                <div
                  key={item?.id}
                  onClick={() => openModal(item)}
                  className="group relative cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex h-44 overflow-hidden"
                >
                  <div className="flex-[1.5] p-4 flex flex-col justify-start">
                    <h3 className="text-[17px] font-bold text-gray-800">
                      {item?.name}
                    </h3>
                    <p className="text-[13px] text-gray-400 line-clamp-2 mt-1">
                      {item?.description}
                    </p>
                    <span className="mt-auto text-lg font-bold text-gray-700">
                      Rs. {item?.base_price}
                    </span>
                  </div>
                  <div className="flex-1 relative flex items-center justify-center pr-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-inner">
                      <Image
                        src={IMAGE_BASE_URL + item?.image}
                        alt={item?.name}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  </div>
                  {/* PLUS BUTTON (Triggers Modal) */}
                  <div className="absolute bottom-3 right-3">
                    <div className="w-9 h-9 bg-[#d97706] text-white rounded-full flex items-center justify-center shadow-lg">
                      <Plus className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* MODAL RENDER */}
      {selectedItem && (
        <ProductDetailModal
          item={selectedItem}
          isOpen={true} // <--- Yeh add karein
          onClose={closeModal}
        />
      )}
    </section>
  );
}
