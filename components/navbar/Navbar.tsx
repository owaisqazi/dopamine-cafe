import Image from 'next/image'
import React from 'react'

interface NavbarProps {
  scrolled: boolean
  scrollToSection: (section: string) => void
}

const Navbar: React.FC<NavbarProps> = ({ scrolled, scrollToSection }) => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Image
            src="/dopamine_cafe.png"
            className="h-20 w-20 rounded-full"
            alt="Dopamine Cafe"
            width={100}
            height={100}
          />
        </div>

        <div className="hidden md:flex gap-8">
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar
