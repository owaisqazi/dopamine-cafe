  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://practice.devssh.xyz/api",
      prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
      },
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
      getMenuByMainCategory: builder.query<any, void>({
      query: () => `/user/main-category`,
      }),
      getMenuByCategory: builder.query<any, string>({
      query: (id) => `/user/category?id=${id}`,
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
      getByProduct: builder.query<any, string | void>({
      query: (categoryId) =>
      categoryId ? `/user/product?id=${categoryId}` : `/user/product`,
      }),
      getByHomeImage: builder.query<any, void>({
      query: () => `/user/image`,
      }),
    }),
  });

  export const { useLoginMutation, useRegisterMutation,useContactMutation,useNewsletterMutation, useGetMenuByMainCategoryQuery,useGetMenuByCategoryQuery,useGetByHomeGalleryQuery,useGetByHomeAboutQuery,useGetByHomeSliderQuery,useGetByHomeImageQuery,useGetByProductQuery} = authApi;