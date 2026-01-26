/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetProductsQuery } from "@/store/api/authApi";
import SkeletonLoader from "../../Skeleton/SkeletonLoader";
import ProductDetailModal from "../product/ProductDetailModal";
import SearchInput from "./SearchInput";
import CategoryHeader from "./CategoryHeader";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart, updateQuantity } from "@/store/cartSlice";
import ProductCard from "./ProductCard";
import DeleteModal from "./DeleteModal";
import RepeatModal from "./RepeatModal";

interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  image: string;
  optionsKey?: string;
}

interface Category {
  category_id: number;
  category_name: string;
  products: Product[];
}

export default function HomeMenu() {
  const { data, isLoading } = useGetProductsQuery();
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [repeatModalItem, setRepeatModalItem] = useState<Product | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<Product | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  /** DATA TRANSFORMING */
  const categories: Category[] = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((cat: any) => ({
      category_id: cat?.id,
      category_name: cat?.name,
      products: cat?.products.map((p: any) => ({
        ...p,
        optionsKey: "no-options",
      })),
    }));
  }, [data]);

  /** SEARCH FILTER */
  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        products: cat?.products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
      .filter((cat) => cat?.products.length > 0);
  }, [search, categories]);

  /** SCROLL SPY */
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 650);
      let newActiveCat = activeCat;
      for (const cat of filteredCategories) {
        const el = document.getElementById(`cat-${cat?.category_id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            newActiveCat = cat?.category_id;
            break;
          }
        }
      }
      setActiveCat(newActiveCat);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredCategories, activeCat]);

  /** HANDLERS */
  const openModal = (item: Product) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  const handlePlusClick = (item: Product) => {
    // Check if any customized version of this product exists in cart
    const customizedItem = cartItems.find(
      (c) => c.id === item?.id && c.options && c.options.length > 0,
    );

    if (customizedItem) {
      // Show Repeat Modal if customization exists
      setRepeatModalItem(item);
    } else {
      // Check if it's already in cart as a simple item
      const existingSimpleItem = cartItems.find(
        (c) => c.id === item?.id && c.optionsKey === "no-options",
      );

      if (existingSimpleItem) {
        dispatch(
          updateQuantity({ id: item?.id, optionsKey: "no-options", change: 1 }),
        );
      } else {
        dispatch(
          addToCart({
            id: item?.id,
            name: item?.name,
            description: item?.description,
            image: item?.image,
            price: item?.base_price,
            quantity: 1,
            options: [],
            optionsKey: "no-options",
          }),
        );
      }
    }
  };

  if (isLoading) return <SkeletonLoader type="product" count={6} />;

  return (
    <section className="pb-16 bg-gray-50/30" id="menu-item">
      <CategoryHeader
        filteredCategories={filteredCategories}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
        scrollToCategory={(id) =>
          document
            .getElementById(`cat-${id}`)
            ?.scrollIntoView({ behavior: "smooth" })
        }
        isSticky={isSticky}
      />

      <SearchInput search={search} setSearch={setSearch} />

      <div className="w-full mx-auto px-4 md:px-10 mt-10">
        {filteredCategories.map((cat) => (
          <section
            key={cat?.category_id}
            id={`cat-${cat?.category_id}`}
            className="mb-12"
          >
            <h2
              className="text-center font-extrabold mb-8 text-4xl md:text-[50px] uppercase tracking-tighter
             bg-cover bg-center bg-no-repeat 
             bg-clip-text text-transparent"
              style={{ backgroundImage: "url('/banner-image-hero.png')" }} 
            >
              {cat?.category_name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat?.products.map((item) => (
                <ProductCard
                  key={item?.id}
                  item={item}
                  openModal={openModal}
                  setDeleteId={setDeleteId}
                  handlePlusClick={handlePlusClick}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {deleteId && (
        <DeleteModal
          productId={deleteId.id}
          cartItems={cartItems}
          onClose={() => setDeleteId(null)}
        />
      )}

      {repeatModalItem && (
        <RepeatModal
          item={repeatModalItem}
          cartItems={cartItems}
          onClose={() => setRepeatModalItem(null)}
          onChooseAgain={(newItem) => setSelectedItem(newItem)}
        />
      )}

      {/* PRODUCT DETAIL MODAL */}
      {selectedItem && (
        <ProductDetailModal
          item={selectedItem}
          isOpen={true}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
