"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useGetRatingReviewsQuery } from "@/store/api/authApi";
import Modal from "@/components/ui/Modal";
//@ts-ignore
import Cookies from "js-cookie";
import axiosInstance from "../auth/axiosInstance";
import toast from "react-hot-toast";

export default function ReviewTestimonials() {
  const { data } = useGetRatingReviewsQuery();
  const items = data?.data || [];

  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [ratingLoading, setRatingLoading] = useState(false);

  const handleOpenModal = () => {
    setRating(0);
    setReview("");
    setIsRatingOpen(true);
  };
  const handleRatingSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating!");
      return;
    }

    setRatingLoading(true);
    try {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("review", review);

      const user = Cookies.get("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser?.id) {
          formData.append("user_id", parsedUser.id.toString());
        }
      }
      const res = await axiosInstance.post("/user/rating-review", formData);
      if (res.data?.status) {
        toast.success(res.data.message || "Review submitted successfully!");
        setIsRatingOpen(false);
        setRating(0);
        setReview("");
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setRatingLoading(false);
    }
  };
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
          {items?.map((reviewItem: any) => (
            <SwiperSlide key={reviewItem?.id}>
              <div className="bg-[#1C1C19] p-6 my-3 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col h-full min-h-[200px]">
                {/* Stars Section */}
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < reviewItem?.rating
                          ? "text-[#C7862F]"
                          : "text-gray-100"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Text Section with 4-line limit */}
                <p title={reviewItem?.review} className="text-white text-sm flex-1 line-clamp-4 overflow-hidden text-ellipsis cursor-pointer">
                  {reviewItem?.review}
                </p>

                {/* Date Section */}
                <span className="text-gray-400 text-xs mt-4 pt-2 border-t border-gray-50 block">
                  {new Date(reviewItem?.created_at).toLocaleDateString()}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* BUTTON TO OPEN MODAL */}
        <div className="flex justify-center items-center">
          <button
            onClick={() => handleOpenModal()}
            className="mt-3 px-4 py-2 text-center bg-[#C7862F] hover:bg-[#b17323] text-white rounded-xl text-sm transition"
          >
            Rate & Review
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isRatingOpen && (
        <Modal
          isOpen={isRatingOpen}
          onClose={() => setIsRatingOpen(false)}
          maxWidth="max-w-md"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Rate Website</h2>
            {/* STARS */}
            <div className="flex justify-center gap-3 mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-10 h-10 cursor-pointer transition hover:scale-110 fill-current ${
                    star <= rating ? "text-[#C7862F]" : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>

            {/* REVIEW */}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={4}
            />

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsRatingOpen(false)}
                className="flex-1 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                disabled={ratingLoading || rating === 0}
                onClick={handleRatingSubmit}
                className={`flex-1 py-2 rounded-xl text-white transition flex justify-center items-center ${
                  ratingLoading || rating === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#C7862F] hover:bg-[#b17323]"
                }`}
              >
                {ratingLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
