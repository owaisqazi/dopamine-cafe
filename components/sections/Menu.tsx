/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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

export default function Menu() {
  const { id } = useParams();
  const categoryId = Array.isArray(id) ? id[0] : id;

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
  } = useGetMenuByCategoryQuery(categoryId, { skip: !categoryId });

  const categories: Category[] = categoriesData?.data || [];

  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "All" });

  const [products, setProducts] = useState<MenuItem[]>([]);
  const activeCategoryId = activeCategory?.id || undefined;
  const {
    data: productsData,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetByProductQuery(
    { main_category_id: categoryId, category_id: activeCategoryId },
    { skip: false, refetchOnMountOrArgChange: true }
  );
  const productsIsLoading = productsLoading || productsFetching;
  const categoriesIsLoading = categoriesLoading || categoriesFetching;
  useEffect(() => {
    setProducts([]);
  }, [activeCategory]);

  useEffect(() => {
    if (productsData?.data) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  return (
    <section
      id="menu"
      className="relative z-20 bg-white md:py-20 px-4"
      aria-labelledby="menu-heading"
    >
      <div className="container mx-auto py-20">
        {/* CATEGORY TABS */}
        {categoriesIsLoading ? (
          <SkeletonLoader type="category" count={6} />
        ) : categories?.length > 0 ? (
          <nav className="flex flex-wrap justify-center gap-4 mb-14">
            {/* ALL tab */}
            <button
              onClick={() => setActiveCategory({ id: "", name: "All" })}
              aria-pressed={activeCategory?.id === ""}
              className={`px-6 py-3 rounded-full uppercase font-semibold transition-all duration-300 ${
                activeCategory?.id === ""
                  ? "bg-amber-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:scale-105"
              }`}
            >
              All
            </button>

            {/* Dynamic category buttons */}
            {categories?.map((cat: any) => (
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
        ) : (
          <div className="text-center py-10 border-2 border-dashed rounded-3xl mb-14">
            <p className="text-xl text-gray-400">No Categories Found</p>
          </div>
        )}

        {/* PRODUCTS GRID */}
        {productsLoading || products?.length === 0 ? (
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
