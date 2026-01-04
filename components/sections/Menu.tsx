/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function CoffeeCart() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Cappuccino",
      image: "/images/coffee1.jpg",
      price: 4.5,
      quantity: 2,
    },
    {
      id: 2,
      name: "Espresso",
      image: "/images/coffee2.jpg",
      price: 3.0,
      quantity: 1,
    },
    {
      id: 3,
      name: "Latte",
      image: "/images/coffee3.jpg",
      price: 5.25,
      quantity: 1,
    },
  ]);

  const handleQuantity = (id: number, type: "increment" | "decrement") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increment"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="py-16 bg-white relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-gray-50 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Your Coffee Cart</h2>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantity(item.id, "decrement")}
                    className="px-2 py-1 border rounded hover:text-amber-500 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantity(item.id, "increment")}
                    className="px-2 py-1 border rounded hover:text-amber-500 transition"
                  >
                    +
                  </button>
                  <span className="ml-4 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <button className="mt-4 text-amber-500 hover:text-amber-600 transition">
              + Continue Shopping
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl shadow flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <p className="flex justify-between text-gray-600">
              Items <span>{cart.length}</span>
            </p>
            <p className="flex justify-between text-gray-600">
              Standard Delivery <span>$2.50</span>
            </p>
            <div>
              <label className="block text-gray-700 mb-2">Promo Code</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter your code"
                  className="flex-1 px-3 py-2 border rounded-l"
                />
                <button className="px-4 rounded-r text-amber-500 hover:text-amber-600 transition">
                  Apply
                </button>
              </div>
            </div>
            <p className="flex justify-between font-bold text-gray-800 text-lg">
              Total Cost <span>${(totalPrice + 2.5).toFixed(2)}</span>
            </p>
            <button className="py-3 rounded text-amber-500 hover:text-amber-600 transition border border-gray-300">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
