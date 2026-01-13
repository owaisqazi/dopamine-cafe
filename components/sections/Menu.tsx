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
import { ShoppingCart } from "lucide-react";
import SkeletonLoader from "@/components/Skeleton/SkeletonLoader";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  price: string;
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
  console.log("Products Data:", productsData, products);
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
        {productsIsLoading ? (
          <SkeletonLoader type="product" count={8} />
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.slice(0, 8)?.map((item, index) => (
              <article
                key={item?.id}
                itemScope
                itemType="https://schema.org/MenuItem"
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay={index * 72}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-gray-100"
              >
                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={IMAGE_BASE_URL + item?.image}
                    alt={item?.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                    itemProp="image"
                  />
                  <Link
                    href={{
                      pathname: "/menu-detail",
                      query: { data: encodeURIComponent(JSON.stringify(item)) },
                    }}
                  >
                    <button
                      aria-label={`Add ${item?.name} to cart`}
                      className="absolute top-3 right-3 w-10 h-10 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition hover:scale-110"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h2
                      itemProp="name"
                      className="text-lg font-bold text-gray-800"
                    >
                      {item?.name}
                    </h2>

                    {/* Foodpanda style rating */}
                    {item?.average_rating !== 0 && (
                      <div className="flex items-center gap-1 px-2 py-1 text-sm font-semibold text-gray-700">
                        <svg
                          className={`w-4 h-4 fill-current ${
                            Number(item?.average_rating || 0) > 0
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                        </svg>
                        <span>
                          {Number(item?.average_rating || 0).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>

                  <p
                    itemProp="description"
                    className="text-sm text-gray-500 mb-4 line-clamp-2"
                  >
                    {item?.description}
                  </p>

                  <Link
                    href={{
                      pathname: "/menu-detail",
                      query: { data: encodeURIComponent(JSON.stringify(item)) },
                    }}
                  >
                    <button className="w-full py-2 bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-colors">
                      View Details
                    </button>
                  </Link>
                </div>
              </article>
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
