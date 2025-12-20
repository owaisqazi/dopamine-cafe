"use client";

import { useState } from "react";
import { Coffee, Cake, Sandwich, IceCream, ShoppingCart } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    name: "Coffee",
    icon: Coffee,
    items: [
      {
        name: "Cafe Latte",
        price: "$160",
        description: "Fresh brewed coffee and steamed milk",
        image:
          "./manu1.png",
      },
      {
        name: "Mocha",
        price: "$180",
        description: "Coffee with chocolate flavor",
        image:
          "./manu2.png",
      },
      {
        name: "Ice Coffee",
        price: "$140",
        description: "Chilled brewed coffee",
        image:
          "./manu3.png",
      },
      {
        name: "Espresso",
        price: "$120",
        description: "Strong and bold coffee shot",
        image:
          "./manu4.png",
      },
    ],
  },
  {
    name: "Desserts",
    icon: Cake,
    items: [
      {
        name: "Chocolate Cake",
        price: "$200",
        description: "Rich chocolate layered cake",
        image:
          "./manu5.png",
      },
      {
        name: "Cheesecake",
        price: "$220",
        description: "Creamy New York cheesecake",
        image:
          "./manu6.png",
      },
    ],
  },
  {
    name: "Snacks",
    icon: Sandwich,
    items: [
      {
        name: "Veg Burger",
        price: "$180",
        description: "Grilled veggie patty burger",
        image:
          "./manu7.png",
      },
      {
        name: "Pasta",
        price: "$220",
        description: "Creamy white sauce pasta",
        image:
          "./manu8.png",
      },
    ],
  },
  {
    name: "Shakes",
    icon: IceCream,
    items: [
      {
        name: "Chocolate Shake",
        price: "$180",
        description: "Thick chocolate shake",
        image:
          "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80",
      },
      {
        name: "Oreo Shake",
        price: "$200",
        description: "Cookies and cream shake",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1bDK2oaEb1Q-v7BGR5IBrTSHrt9gOCna8pw&s",
      },
    ],
  },
];

const allItems = categories.flatMap((cat) => cat.items);
const categoriesWithAll = [
  { name: "All", icon: Coffee, items: allItems },
  ...categories,
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
            const Icon = category.icon;
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
                <Icon className="w-5 h-5" />
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
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden relative"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Small Cart Button (Top-Right Corner) */}
                <button className="absolute top-3 right-3 w-10 h-10 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="font-bold text-amber-600">{item.price}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
