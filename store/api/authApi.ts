  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
  //@ts-ignore
  import Cookies from "js-cookie";
  export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://practice.devssh.xyz/api",
      prepareHeaders: (headers) => {
        const token = Cookies.get("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
      }
    }),
    endpoints: (builder) => ({
      login: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/user/login",
          method: "POST",
          body: formData,
        }),
      }),

      register: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/user/register",
          method: "POST",
          body: formData,
        }),
      }),
      contact: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/user/contactus",
          method: "POST",
          body: formData,
        }),
      }),
      newsletter: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/user/newsletter",
          method: "POST",
          body: formData,
        }),
      }),
     order: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/user/order",
          method: "POST",
          body: formData,
        }),
      }),
     applyPromo: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/user/promo-code",
          method: "POST",
          body: formData,
        }),
      }),
      getMenuByMainCategory: builder.query<any, void>({
      query: () => `/user/main-category`,
      }),
      getMenuByCategory: builder.query<any, string>({
      query: (id) => `/user/category`,
      }),
      getByHomeSlider: builder.query<any, void>({
      query: () => `/user/slider`,
      }),
      getByHomeAbout: builder.query<any, void>({
      query: () => `/user/about`,
      }),
      getByHomeGallery: builder.query<any, void>({
      query: () => `/user/gallery`,
      }),
      // getByProduct: builder.query<any, { main_category_id?: string; category_id?: string } | void>({
      // query: (ids) => {
      //   if (ids?.main_category_id || ids?.category_id) {
      //     const params = new URLSearchParams();
      //     if (ids.main_category_id) params.append("main_category_id", ids.main_category_id);
      //     if (ids.category_id) params.append("category_id", ids.category_id);
      //     return `/user/product?${params.toString()}`;
      //   }
      //   return `/user/product`;
      // },
      // }),
      getByHomeImage: builder.query<any, void>({
      query: () => `/user/image`,
      }),
      getProducts: builder.query<any, string|void>({
      query: () => "user/product",
    }),
      getBybranch: builder.query<any, void>({
      query: () => `/user/branch`,
      }),
      getByBlog: builder.query<any, void>({
      query: () => `/user/blogs`,
      }),
      getByOrder: builder.query<any, string|void>({
      query: (id) => `/user/order?user_id=${id}`,
      }),
      ratingReview: builder.mutation<any, FormData>({
        query: (formData) => ({
          url: "/user/product/rating-review",
          method: "POST",
          body: formData,
        }),
      }),
      getRatingReviews: builder.query<any, void>({
        query: (id) => `/user/rating-review?user_id=${id}`,
      }),
      getCity: builder.query({
        query: (country) => `/user/cities?country=${country}`,
      }),
      getArea: builder.query({
        query: (cityName) => `/user/areas?city=${cityName}`,
      }),
    }),
  });
  export const { useLoginMutation, useRegisterMutation,useContactMutation,useOrderMutation,useNewsletterMutation,useApplyPromoMutation,useRatingReviewMutation, useGetMenuByMainCategoryQuery,useGetMenuByCategoryQuery,useGetByHomeGalleryQuery,useGetByHomeAboutQuery,useGetByBlogQuery,useGetByHomeSliderQuery,useGetByHomeImageQuery,useGetProductsQuery,useGetBybranchQuery,useGetByOrderQuery,useGetRatingReviewsQuery,useGetCityQuery,useGetAreaQuery} = authApi;