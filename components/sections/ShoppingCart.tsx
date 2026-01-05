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
      name: "Alfredo Pasta",
      image: "/manu/Alfredo Pasta.jpeg", // truncated
      price: 4.5,
      quantity: 2,
    },
    {
      id: 2,
      name: "Fajita Cheese",
      image: "/manu/Fajita Cheese.jpeg", // truncated
      price: 3.5,
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
    <section className="py-8 md:py-16 bg-white relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Your Coffee Cart</h2>
            
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-gray-200 last:border-b-0 gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleQuantity(item.id, "decrement")}
                        className="w-8 h-8 flex items-center justify-center border rounded-full bg-white hover:text-amber-500 transition"
                      >
                        -
                      </button>
                      <span className="font-medium min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item.id, "increment")}
                        className="w-8 h-8 flex items-center justify-center border rounded-full bg-white hover:text-amber-500 transition"
                      >
                        +
                      </button>
                    </div>
                    
                    <span className="font-bold text-gray-900 text-lg sm:min-w-[80px] text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 text-amber-500 font-medium hover:text-amber-600 transition inline-flex items-center">
              <span className="mr-1">+</span> Continue Shopping
            </button>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-fit space-y-5">
            <h2 className="text-xl md:text-2xl font-bold">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span className="font-medium text-gray-900">{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Standard Delivery</span>
                <span className="font-medium text-gray-900">$2.50</span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Code"
                  className="flex-1 min-w-0 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button className="px-4 bg-white border border-l-0 rounded-r-md text-amber-500 font-semibold hover:bg-amber-50 transition">
                  Apply
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-800">Total Cost</span>
                <span className="text-xl font-bold text-gray-900">${(totalPrice + 2.5).toFixed(2)}</span>
              </div>
              
              <button className="w-full py-3.5 bg-white border border-gray-300 rounded-lg text-amber-500 font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-white transition-all duration-300">
                Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}