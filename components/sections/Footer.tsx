'use client';

import { Coffee, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-4 group">
            <Coffee className="w-8 h-8 text-amber-500 group-hover:rotate-12 transition-transform" />
            <span className="text-2xl font-bold">Dopamine Cafe</span>
          </div>
          <p className="text-gray-400 mb-6 max-w-md">
            Your daily dose of happiness, served with love and crafted with care.
          </p>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>© 2024 Dopamine Cafe. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
