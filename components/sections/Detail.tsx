/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ThreeDImageGallery from "../ThreeDImage/ThreeDImageGallery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { IMAGE_BASE_URL } from "../auth/axiosInstance";
import Modal from "../ui/Modal";
import { useRatingReviewMutation } from "@/store/api/authApi";
//@ts-ignore
import Cookies from "js-cookie";

interface MenuItem {
  id: string | number;
  name: string;
  description: string;
  image: string;
  images: string[] | string;
  average_rating: string | number;
  rating: string | number;
  base_price: string;
  branch_price: number;
  reviews: any[] | string;
  created_at: string;
  gl_file?: string;
  options: {
    id: number;
    name: string;
    price_modifier: string;
  }[];
}

export default function Detail() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");
  const [ratingReview, { isLoading: ratingLoading }] =
    useRatingReviewMutation();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [customDescription, setCustomDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const item: MenuItem | null = useMemo(() => {
    if (!dataParam) return null;
    try {
      return JSON.parse(decodeURIComponent(dataParam));
    } catch {
      return null;
    }
  }, [dataParam]);

  if (!item) return <p className="text-center py-20">No item found</p>;

  // Parsed images array
  const parsedImages: string[] = useMemo(() => {
    if (!item) return [];
    if (Array.isArray(item.images) && item.images.length) return item.images;
    try {
      const parsed = item.images ? JSON.parse(item.images as any) : [];
      return parsed.length ? parsed : [item.image];
    } catch {
      return item.image ? [item.image] : [];
    }
  }, [item]);

  // Toggle option selection
  const handleOptionToggle = (optionId: number) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  // Calculate total price including selected options
  const totalPrice = useMemo(() => {
    const base = Number(item.branch_price || item.base_price);
    const optionsTotal =
      item.options
        ?.filter((opt) => selectedOptions.includes(opt?.id))
        .reduce((acc, curr) => acc + Number(curr.price_modifier), 0) || 0;
    return (base + optionsTotal) * quantity;
  }, [item, selectedOptions, quantity]);

  const handleAddToCart = () => {
    if (!item) return;

    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        description: item.description,
        image: parsedImages[0] || item.image,
        price: Number(item.branch_price || item.base_price),
        quantity,
        options: item?.options
          ?.filter((o) => selectedOptions?.includes(o.id))
          .map((o) => ({
            id: o.id,
            name: o.name,
            price_modifier: Number(o.price_modifier),
          })),
      }),
    );

    toast.success(`${item.name} added to cart! 🎉`);
  };

  const handleRatingSubmit = async () => {
    if (!item) return;

    try {
      const user = Cookies.get("user")
        ? JSON.parse(Cookies.get("user") as string)
        : null;

      const formData = new FormData();
      formData.append("product_id", String(item.id));
      formData.append("user_id", String(user?.id || ""));
      formData.append("rating", String(rating));
      formData.append("review", review);

      await ratingReview(formData).unwrap();

      toast.success("Thanks for your review ❤️");
      setIsRatingOpen(false);
      setRating(0);
      setReview("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  const avgRating = Number(item?.average_rating || 0);
  const ratingPercent = Math.min((avgRating / 5) * 100, 100);
  const reviewsArray = Array.isArray(item?.reviews) ? item?.reviews : [];
  return (
    <>
      <section className="min-h-screen bg-[#ffffff] px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* IMAGE / GALLERY */}
          <div className="w-full col-span-2 md:col-span-1">
            <ThreeDImageGallery
              images={parsedImages}
              alt={item.name}
              gl_file={IMAGE_BASE_URL + item.gl_file}
            />
          </div>

          {/* CONTENT */}
          <div className="w-full bg-white col-span-2 md:col-span-1 rounded-3xl p-6 md:p-6 shadow-md hover:shadow-2xl">
            <div className="h-[370px] overflow-y-auto">
              <span className="inline-block mb-1 text-xs font-semibold tracking-widest uppercase bg-amber-50 text-amber-700 px-4 py-1 rounded-full">
                Signature Item
              </span>
              <h1 className="text-2xl md:text-2xl font-extrabold text-gray-900">
                {item.name}
              </h1>

              <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                {item.description}
              </p>

              {/* OPTIONS */}
              {Array.isArray(item.options) && item.options.length > 0 && (
                <div className="mb-2">
                  <h3 className="font-bold text-gray-800 mb-3">Extras</h3>
                  <div className="flex flex-col gap-2">
                    {item?.options?.map((opt) => (
                      <label
                        key={opt?.id}
                        className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(opt?.id)}
                          onChange={() => handleOptionToggle(opt?.id)}
                          className="w-5 h-5 accent-amber-600"
                        />
                        <div className="flex justify-between w-full">
                          <span>{opt?.name}</span>
                          <span className="font-bold">
                            Rs.{Number(opt?.price_modifier)}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <textarea
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="Add special instructions..."
                className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                rows={3}
              />
            </div>
            {/* PRICE + QUANTITY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 items-center">
              <div>
                <p className="text-sm text-gray-400 mb-1">Price</p>
                <span className="text-2xl md:text-4xl font-black text-gray-900">
                  Rs. {totalPrice}
                </span>
              </div>

              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 md:px-5 md:py-3 justify-center">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="text-lg md:text-2xl font-bold px-3 text-gray-600 hover:text-black"
                >
                  −
                </button>
                <span className="px-4 md:px-6 font-bold text-lg md:text-xl">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-lg md:text-2xl font-bold px-3 text-gray-600 hover:text-black"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full py-3 md:py-5 bg-black text-white text-sm md:text-base font-semibold uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all"
            >
              Add to Cart - Rs.{totalPrice}
            </button>

            <p className="text-xs text-gray-400 text-center mt-6">
              Freshly prepared • Best quality guaranteed
            </p>
          </div>
          <div className="col-span-2 cursor-pointer">
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-6"
            onClick={() => setIsRatingOpen(true)}>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => {
                  const filled = index < Math.round(avgRating);
                  return (
                    <svg
                      key={index}
                      className={`w-5 h-5 transition-transform ${
                        filled ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  );
                })}
              </div>

              <span className="text-sm font-semibold text-gray-700">
                ({ratingPercent?.toFixed(0)}%) Rate & Review
              </span>
            </div>

            {/* Reviews (same as before) */}
            <div className="space-y-4">
              {reviewsArray?.length > 0 ? (
                reviewsArray?.map((review: any, index: number) => (
                  <div
                    key={review?.id || index}
                    className="bg-white border rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-400">
                        {new Date(review?.created_at).toLocaleDateString()}
                      </p>

                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                        {review?.rating} ★
                      </span>
                    </div>

                    <p className="text-gray-700 text-sm">
                      {review?.review || "No review provided."}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-400 text-center">
                  No reviews available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* RATING MODAL */}
      {/* @ts-ignore */}
      <Modal
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        maxWidth="max-w-md"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Rate {item.name || "this product"}
          </h2>

          {/* STARS */}
          <div className="flex justify-center gap-3 mb-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => setRating(star)}
                className={`w-10 h-10 cursor-pointer transition hover:scale-110 fill-current ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
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
                  : "bg-amber-600 hover:bg-amber-700"
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
    </>
  );
}
