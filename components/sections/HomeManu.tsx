/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  useGetMenuByCategoryQuery,
  useGetByProductQuery,
} from "@/store/api/authApi";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import { Plus } from "lucide-react";
import SkeletonLoader from "@/components/Skeleton/SkeletonLoader";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  base_price: string;
  image: string;
  average_rating: string | number;
  reviews: string[];
}

interface Category {
  id: string | number;
  name: string;
}

export default function HomeMenu() {
  const categoryId = ""; // main_category_id
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetMenuByCategoryQuery(categoryId);
  const categories: Category[] = categoriesData?.data || [];

  const [activeCategory, setActiveCategory] = useState<{
    id: string | number;
    name: string;
  }>({ id: categories[0]?.id || "", name: categories[0]?.name || "All" });

  const activeCategoryId = activeCategory?.id || undefined;

  const { data: productsData, isLoading: productsLoading } =
    useGetByProductQuery(
      //@ts-ignore
      { main_category_id: categoryId, category_id: activeCategoryId },
      { skip: false, refetchOnMountOrArgChange: true }
    );

  const [products, setProducts] = useState<MenuItem[]>([]);
  useEffect(() => {
    if (productsData?.data) {
      setProducts(productsData.data);
    } else {
      setProducts([]);
    }
  }, [productsData]);

  useEffect(() => {
    setProducts([]);
  }, [activeCategory]);

  return (
    <section
      id="menu"
      className="relative z-20 bg-white md:py-20 px-4"
      aria-labelledby="menu-heading"
    >
      <div className="container mx-auto">
        {/* HEADER */}
        <header className="text-center my-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600">
            Take a look at our menu and explore a variety of delicious dishes
            prepared fresh every day.
          </p>
        </header>

        {/* CATEGORY TABS */}
        {categoriesLoading ? (
          <SkeletonLoader type="category" count={6} />
        ) : (
          <nav className="flex flex-wrap justify-center gap-4 mb-10">
            {categories?.slice(0, 8)?.map((cat: any) => (
              <button
                key={cat?.id}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory?.id === cat?.id}
                className={`px-6 py-3 uppercase rounded-full font-semibold transition-all duration-300 ${
                  activeCategory?.id === cat?.id
                    ? "bg-amber-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:scale-105"
                }`}
              >
                {cat?.name}
              </button>
            ))}
          </nav>
        )}

        {/* PRODUCTS GRID */}
        {productsLoading ? (
          <SkeletonLoader type="product" count={8} />
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {products?.slice(0, 8)?.map((item, index) => (
              <Link
              href={{
                    pathname: "/menu-detail",
                    query: { data: encodeURIComponent(JSON.stringify(item)) },
                  }}
                key={item?.id}
                itemScope
                itemType="https://schema.org/MenuItem"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay={index * 72}
                className="group relative cursor-pointer bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex h-44 overflow-hidden"
              >
                {/* LEFT CONTENT AREA */}
                <div className="flex-[1.5] p-4 flex flex-col justify-start">
                  <h2
                    itemProp="name"
                    className="text-[17px] font-bold text-gray-800 leading-tight mb-1"
                  >
                    {item?.name}
                  </h2>

                  <p
                    itemProp="description"
                    className="text-[13px] text-gray-400 line-clamp-3 mb-2 leading-snug"
                  >
                    {item?.description}
                  </p>

                  <div className="mt-auto">
                    <span className="text-lg font-medium text-gray-600">
                      <span>
                        Rs.
                        {Number(item?.base_price ?? 0) % 1 === 0
                          ? Number(item?.base_price ?? 0)
                          : Number(item?.base_price ?? 0).toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>

                {/* RIGHT IMAGE AREA */}
                <div className="flex-1 relative flex items-center justify-center pr-4">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden">
                    <Image
                      src={IMAGE_BASE_URL + item?.image}
                      alt={item?.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                      itemProp="image"
                    />
                  </div>
                </div>

                {/* PLUS ICON */}
                <Link
                  className="absolute bottom-3 right-3 z-10"
                  href={{
                    pathname: "/menu-detail",
                    query: { data: encodeURIComponent(JSON.stringify(item)) },
                  }}
                >
                  <button
                    aria-label={`Add ${item?.name} to cart`}
                    className="w-9 h-9 bg-[#d97706] hover:bg-[#945003] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
                  >
                    <Plus className="w-6 h-6 font-bold" />
                  </button>
                </Link>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl">
            <p className="text-xl text-gray-400">No Data Found</p>
          </div>
        )}
      </div>
    </section>
  );
}
