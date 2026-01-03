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
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import CategoriesData from "../json/menuData.json";

/* ---------------- ICON MAP ---------------- */
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

/* ---------------- TYPES ---------------- */
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

/* ---------------- DATA ---------------- */
const Categories = CategoriesData as CategoriesJson;

const mainSections = [
  { id: "starters", label: "Dopamine Starters" },
  { id: "main", label: "Dopamine" },
] as const;

/* ---------------- COMPONENT ---------------- */
export default function Menu() {
  const [activeMain, setActiveMain] = useState<(typeof mainSections)[number]["id"]>("starters");
  const [activeCat, setActiveCat] = useState(0);
  const [open, setOpen] = useState(false);

  const currentCategories = Categories.categories.filter((cat) =>
    activeMain === "starters"
      ? ["Starters", "Soups & Salads"].includes(cat.name)
      : ["Pizza", "Burgers & Sandwiches", "Main Course & Steaks", "Breakfast & Coffee"].includes(cat.name)
  );

  const categories: Category[] = [
    {
      name: "All",
      icon: "LayoutGrid",
      items: currentCategories.flatMap((c) => c.items),
    },
    ...currentCategories,
  ];

  return (
    <section id="menu" className="relative z-20 bg-white py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <header>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Our <span className="text-amber-600">Dopamine</span> Menu
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Discover chef-crafted flavors designed to boost your dopamine levels.
            </p>

            {/* CUSTOM DROPDOWN */}
            <div className="relative max-w-sm">
              <button
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center bg-amber-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:bg-amber-700 transition"
              >
                {mainSections.find((s) => s.id === activeMain)?.label}
                <ChevronDown className={`w-5 h-5 transition ${open ? "rotate-180" : ""}`} />
              </button>

              {open && (
                <ul
                  role="listbox"
                  className="absolute mt-3 w-full bg-white rounded-2xl shadow-xl overflow-hidden z-30"
                >
                  {mainSections.map((s) => (
                    <li
                      key={s.id}
                      role="option"
                      aria-selected={activeMain === s.id}
                      onClick={() => {
                        setActiveMain(s.id);
                        setActiveCat(0);
                        setOpen(false);
                      }}
                      className={`px-6 py-4 cursor-pointer font-semibold transition ${
                        activeMain === s.id
                          ? "bg-amber-600 text-white"
                          : "hover:bg-amber-100 text-gray-700"
                      }`}
                    >
                      {s.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>

          {/* RIGHT */}
          <main className="lg:col-span-2">

            {/* CATEGORY TABS */}
            <nav className="flex flex-wrap gap-3 mb-10" aria-label="Menu Categories">
              {categories.map((cat, i) => {
                const Icon = iconMap[cat.icon];
                return (
                  <button
                    key={i}
                    onClick={() => setActiveCat(i)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                      activeCat === i
                        ? "bg-amber-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-amber-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </nav>

            {/* MENU GRID */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {categories[activeCat]?.items.map((item, i) => (
                <article
                  key={i}
                  itemScope
                  itemType="https://schema.org/MenuItem"
                  className="bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      itemProp="image"
                    />
                    <button
                      aria-label="Add to cart"
                      className="absolute top-3 right-3 bg-amber-600 text-white p-2 rounded-full"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h2 itemProp="name" className="font-bold text-gray-800">
                      {item.name}
                    </h2>
                    <p itemProp="description" className="text-sm text-gray-500 my-2">
                      {item.description}
                    </p>
                    <span itemProp="price" className="text-amber-600 font-bold text-sm">
                      {item.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </main>

        </div>
      </div>
    </section>
  );
}
