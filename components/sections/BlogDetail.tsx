/* eslint-disable @next/next/no-img-element */
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IMAGE_BASE_URL } from '@/components/auth/axiosInstance';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

interface BlogData {
  id: number;
  title: string;
  description: string;
  images: string[];
}

export default function BlogDetail() {
  const searchParams = useSearchParams();
  const data = searchParams?.get('data'); // ✅ get query param safely

  const [blog, setBlog] = useState<BlogData | null>(null);

  useEffect(() => {
    if (!data) return;
    try {
      const parsed: BlogData = JSON.parse(decodeURIComponent(data));
      setBlog(parsed);
    } catch (err) {
      console.error('Invalid blog data', err);
    }
  }, [data]);

  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading blog details...
      </div>
    );
  }

  return (
    <main className="py-16 px-4 max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{blog.title}</h1>

      {/* Carousel */}
      {blog.images.length > 0 && (
        <div className="relative mb-8">
          <Carousel>
            <CarouselContent className="flex gap-4">
              {blog.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-96 rounded-2xl overflow-hidden">
                    <img
                      src={IMAGE_BASE_URL + img}
                      alt={`${blog.title} image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
        {blog.description}
      </p>
    </main>
  );
}
