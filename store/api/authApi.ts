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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
