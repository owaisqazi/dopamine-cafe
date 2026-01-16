"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useGetRatingReviewsQuery } from "@/store/api/authApi";

export default function ReviewTestimonials() {
  const { data, isLoading } = useGetRatingReviewsQuery();
    const items = data?.data || [];
  return (
    <section className="py-10 px-4">
      <div className="w-full mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          What Our Customers Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]} 
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {items?.map((review:any) => (
            <SwiperSlide key={review?.id}>
              <div className="bg-white p-6 my-3 rounded-2xl shadow-md hover:shadow-xl transition h-full flex flex-col justify-between">
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${i < review?.rating ? "text-yellow-400" : "text-gray-300"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 text-sm flex-1">{review?.review}</p>
                <span className="text-gray-400 text-xs mt-2 block">
                  {new Date(review?.created_at).toLocaleDateString()}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
