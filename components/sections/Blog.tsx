/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetByBlogQuery } from "@/store/api/authApi";
import SkeletonLoader from "@/components/Skeleton/SkeletonLoader";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";

export default function Blog() {
  const { data, isLoading } = useGetByBlogQuery();
  const items = data?.data || [];

  if (isLoading) return <SkeletonLoader type="blog" count={4} />;

  return (
    <section id="blog" className="py-20 px-4 relative z-20 bg-[#FFEABF]">
      <div className="container mx-auto">
        {/* SECTION HEADING */}
        <header className="text-center mb-12" data-aos="flip-up">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Blogs</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest news and articles.
          </p>
        </header>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items?.map((item:any, index:number) => (
            <article
              key={item?.id}
              data-aos="fade-down"
              data-aos-duration="1000"
              data-aos-delay={index * 72}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-gray-100"
            >
              {/* IMAGE */}
              <div className="relative h-52 overflow-hidden">
                {item?.images?.[0] && (
                  <Image
                    src={`${IMAGE_BASE_URL+item?.images[0]}`}
                    alt={item?.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                )}

                {/* VIEW DETAILS BUTTON */}
                <Link
                  href={{
                    pathname: "/blog-detail",
                    query: { data: encodeURIComponent(JSON.stringify(item)) },
                  }}
                >
                  <button
                    aria-label={`View ${item?.title} details`}
                    className="absolute top-3 right-3 w-10 h-10 bg-[#2A2A28] hover:bg-[#3a3a37] text-white rounded-full flex items-center justify-center shadow-lg transition hover:scale-110"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </Link>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-800 mb-2">{item?.title}</h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {item?.description}
                </p>

                <Link
                  href={{
                    pathname: "/blog-detail",
                    query: { data: encodeURIComponent(JSON.stringify(item)) },
                  }}
                >
                  <button className="w-full py-2 bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg hover:bg-[#3a3a37] hover:text-white transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
