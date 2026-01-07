/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetMenuByCategoryQuery,
  useGetByProductQuery,
} from "@/store/api/authApi";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import { ShoppingCart } from "lucide-react";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Category {
  id: string | number;
  name: string;
}

export default function HomeMenu() {
  const categoryId = "";
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetMenuByCategoryQuery(categoryId);
  const categories: Category[] = categoriesData?.data || [];

  const [activeCategory, setActiveCategory] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: "All",
  });
  const activeCategoryId = activeCategory.id || undefined;
  const { data: productsData, isLoading: productsLoading } =
    useGetByProductQuery(activeCategoryId, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });

  const products = productsData?.data || [];

  if (categoriesLoading)
    return <p className="text-center py-20">Loading categories...</p>;
  if (productsLoading)
    return <p className="text-center py-20">Loading products...</p>;

  if (categoriesLoading)
    return <p className="text-center py-20">Loading categories...</p>;
  if (productsLoading)
    return <p className="text-center py-20">Loading products...</p>;

  return (
    <section
      id="menu"
      className="relative z-20 bg-white md:py-20 px-4"
      aria-labelledby="menu-heading"
    >
      <div className="container mx-auto py-20">
        <header className="text-center mb-8">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600">Take a look at our menu and explore a variety of delicious dishes prepared fresh every day.</p>
        </header>
        {/* CATEGORY TABS */}
        <nav className="flex flex-wrap justify-center gap-4 mb-14">
          {/* All tab */}
          {/* <button
            onClick={() => setActiveCategory({ id: "", name: "All" })}
            aria-pressed={activeCategory.id === ""}
            className={`px-6 py-3 rounded-full uppercase font-semibold transition-all duration-300 ${
              activeCategory.id === ""
                ? "bg-amber-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:scale-105"
            }`}
          >
            All
          </button> */}

          {/* Dynamic category buttons */}
          {categories?.slice(0, 8)?.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory.id === cat.id}
              className={`px-6 py-3 uppercase rounded-full font-semibold transition-all duration-300 ${
                activeCategory.id === cat.id
                  ? "bg-amber-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:scale-105"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.slice(0, 8)?.map((item: MenuItem, index: number) => (
            <article
              key={item.id}
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
                  src={IMAGE_BASE_URL + item.image} // or prepend your base URL
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-110 transition duration-500"
                  itemProp="image"
                />
                <Link
                  href={{
                    pathname: "/menu-detail",
                    query: {
                      data: encodeURIComponent(JSON.stringify(item)),
                    },
                  }}
                >
                  <button
                    aria-label={`Add ${item.name} to cart`}
                    className="absolute top-3 right-3 w-10 h-10 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition hover:scale-110"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </Link>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2
                    itemProp="name"
                    className="text-lg font-bold text-gray-800"
                  >
                    {item.name}
                  </h2>
                  <span itemProp="price" className="font-bold text-amber-600">
                    {item.price}
                  </span>
                </div>

                <p
                  itemProp="description"
                  className="text-sm text-gray-500 mb-4 line-clamp-2"
                >
                  {item.description}
                </p>
                <Link
                  href={{
                    pathname: "/menu-detail",
                    query: {
                      data: encodeURIComponent(JSON.stringify(item)),
                    },
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
      </div>
    </section>
  );
}
