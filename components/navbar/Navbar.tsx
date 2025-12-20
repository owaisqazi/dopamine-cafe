'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'

interface NavbarProps {
  scrolled: boolean
  scrollToSection: (section: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, scrollToSection }) => {
  const [cartOpen, setCartOpen] = useState(false)

  const cartItems = [
    { name: 'Cafe Latte', price: '$160', qty: 1 },
    { name: 'Mocha', price: '$180', qty: 2 },
  ]

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/dopamine_cafe.png"
              className="h-20 w-20 rounded-full"
              alt="Dopamine Cafe"
              width={100}
              height={100}
            />
          </div>

          {/* MENU */}
          <div className="hidden md:flex gap-8 items-center">
            {['Menu', 'About', 'Gallery', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium transition-all duration-300 hover:scale-110 ${
                  scrolled
                    ? 'text-gray-700 hover:text-amber-600'
                    : 'text-white hover:text-amber-200'
                }`}
              >
                {item}
              </button>
            ))}

            {/* CART ICON */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative ml-4"
            >
              <ShoppingCart
                className={`w-6 h-6 transition ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              />

              {/* BADGE */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* CART MODAL */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-full sm:w-96 bg-white h-full p-6 shadow-2xl animate-slide-in-right">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Your Cart
              </h3>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-800" />
              </button>
            </div>

            {/* CART ITEMS */}
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <span className="font-semibold text-amber-600">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="mt-8">
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl transition">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
