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

export default function HomeMenu() {
  const categoryId = ""; // main_category_id
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetMenuByCategoryQuery(categoryId);
  const categories: Category[] = categoriesData?.data || [];

  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "All" });

  const activeCategoryId = activeCategory?.id || undefined;

  const { data: productsData, isLoading: productsLoading } = useGetByProductQuery(
    { main_category_id: categoryId, category_id: activeCategoryId },
    { skip: false, refetchOnMountOrArgChange: true }
  );
 
  const [products, setProducts] = useState<MenuItem[]>([]);
  console.log("Products Data:", productsData,products);
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
      <div className="container mx-auto py-20">
        {/* HEADER */}
        <header className="text-center mb-8">
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
          <nav className="flex flex-wrap justify-center gap-4 mb-14">
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
