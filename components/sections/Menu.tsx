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
import Categories from "../json/menuData.json";
const iconMap = {
  Flame: Flame,
  Pizza: Pizza,
  Soup: Soup,
  Beef: Beef,
  Utensils: Utensils,
  Coffee: Coffee,
};

const allItems = Categories.categories.flatMap((cat) => cat.items);
const categoriesWithAll = [
  { name: "All", icon: "LayoutGrid", items: allItems },
  ...Categories.categories,
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="menu" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600">Order your favorites online</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-14">
          {categoriesWithAll.map((category, index) => {
            const iconName = category?.icon as keyof typeof iconMap;
            const IconComponent = iconMap[iconName] || LayoutGrid;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === index
                    ? "bg-amber-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-amber-100 hover:scale-105"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoriesWithAll[activeCategory].items.map((item, index) => (
            <div
              key={index}
              data-aos="fade-down"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="1000"
              data-aos-delay={index * 72}
              data-aos-anchor-placement="top-bottom"
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden relative border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />

                <button className="absolute top-3 right-3 w-10 h-10 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    {item.name}
                  </h3>
                  <span className="font-bold text-amber-600 whitespace-nowrap ml-2">
                    {item.price}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <button className="w-full py-2 bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
