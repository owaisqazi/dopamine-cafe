"use client";

import { useState } from "react";
import {
  Flame,
  Pizza,
  Soup,
  Coffee,
  Beef,
  Utensils,
  ShoppingCart,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";
import CategoriesData from "../json/menuData.json";

/* ---------- ICON MAP ---------- */
const iconMap = {
  Flame,
  Pizza,
  Soup,
  Beef,
  Utensils,
  Coffee,
  LayoutGrid,
} as const;

type IconKey = keyof typeof iconMap;

/* ---------- TYPES ---------- */
interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface Category {
  name: string;
  icon: IconKey;
  items: MenuItem[];
}

interface CategoriesJson {
  categories: Category[];
}

const Categories = CategoriesData as CategoriesJson;

/* ---------- DATA ---------- */
const allItems = Categories.categories.flatMap((cat) => cat.items);

const categoriesWithAll: Category[] = [
  { name: "All", icon: "LayoutGrid", items: allItems },
  ...Categories.categories,
];

/* ---------- COMPONENT ---------- */
export default function HomeMenu() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="menu"
      className="relative z-20 bg-white py-20 px-4"
      aria-labelledby="menu-heading"
    >
      <div className="container mx-auto">

        {/* HEADER */}
        <header className="text-center mb-12">
          <h1
            id="menu-heading"
            className="text-5xl font-bold text-gray-800 mb-4"
          >
            Our Menu
          </h1>
          <p className="text-xl text-gray-600">
            Order your favorite dishes online
          </p>
        </header>

        {/* CATEGORY NAV */}
        <nav
          className="flex flex-wrap justify-center gap-4 mb-14"
          aria-label="Menu Categories"
        >
          {categoriesWithAll.map((category, index) => {
            const Icon = iconMap[category.icon];

            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                aria-pressed={activeCategory === index}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-amber-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:scale-105"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </nav>

        {/* MENU GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesWithAll[activeCategory].items
            ?.slice(0, 8)
            ?.map((item, index) => (
              <article
                key={index}
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
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                    itemProp="image"
                  />

                  <button
                    aria-label={`Add ${item.name} to cart`}
                    className="absolute top-3 right-3 w-10 h-10 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition hover:scale-110"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
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
                    <span
                      itemProp="price"
                      className="font-bold text-amber-600"
                    >
                      {item.price}
                    </span>
                  </div>

                  <p
                    itemProp="description"
                    className="text-sm text-gray-500 mb-4 line-clamp-2"
                  >
                    {item.description}
                  </p>

                  <button className="w-full py-2 bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-colors">
                    View Details
                  </button>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
