'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coffee, Cake, Sandwich, IceCream } from 'lucide-react';

const categories = [
  {
    name: 'Coffee',
    icon: Coffee,
    items: [
      { name: 'Cappuccino', price: '₹150', description: 'Classic Italian espresso with steamed milk' },
      { name: 'Latte', price: '₹160', description: 'Smooth espresso with velvety milk foam' },
      { name: 'Cold Brew', price: '₹180', description: 'Smooth, less acidic cold-steeped coffee' },
      { name: 'Espresso', price: '₹120', description: 'Rich and bold shot of pure coffee' },
    ],
  },
  {
    name: 'Desserts',
    icon: Cake,
    items: [
      { name: 'Chocolate Cake', price: '₹200', description: 'Decadent layers of chocolate goodness' },
      { name: 'Cheesecake', price: '₹220', description: 'Creamy New York style cheesecake' },
      { name: 'Tiramisu', price: '₹240', description: 'Classic Italian coffee-flavored dessert' },
      { name: 'Brownie', price: '₹150', description: 'Warm, fudgy chocolate brownie' },
    ],
  },
  {
    name: 'Snacks',
    icon: Sandwich,
    items: [
      { name: 'Club Sandwich', price: '₹250', description: 'Triple-decker with chicken and veggies' },
      { name: 'Veg Burger', price: '₹180', description: 'Grilled veggie patty with fresh toppings' },
      { name: 'Pasta', price: '₹220', description: 'Creamy alfredo or tangy marinara' },
      { name: 'Nachos', price: '₹200', description: 'Crispy chips with cheese and salsa' },
    ],
  },
  {
    name: 'Shakes',
    icon: IceCream,
    items: [
      { name: 'Chocolate Shake', price: '₹180', description: 'Rich chocolate blended perfection' },
      { name: 'Strawberry Shake', price: '₹180', description: 'Fresh strawberries with cream' },
      { name: 'Vanilla Shake', price: '₹170', description: 'Classic vanilla ice cream shake' },
      { name: 'Oreo Shake', price: '₹200', description: 'Cookies and cream delight' },
    ],
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="menu" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600">Handcrafted with love, served with passion</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-amber-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:scale-105'
                }`}
              >
                <Icon className="w-5 h-5" />
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories[activeCategory].items.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-amber-600">{item.price}</span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
