import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://prdmgidslzpnltyozjiv.supabase.co/storage/v1/object/public/cart%20level5/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `dataproduct.json`,
    }),
    getProductById: builder.query({
      query: () => `dataproduct.json`, // Fetch all products
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
