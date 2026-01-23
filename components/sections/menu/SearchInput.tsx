// components/SearchInput.tsx
"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchInput({ search, setSearch }: Props) {
  return (
    <div className="w-full mx-auto px-10 mb-6">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for items..."
          className="w-full border rounded-full pl-5 pr-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#C7862F]"
        />
        <Search
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
    </div>
  );
}
