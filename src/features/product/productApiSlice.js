import { apiSlice } from "../../redux/api/apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get All Products (List with search & filter support)
    getProducts: builder.query({
      query: (params) => ({
        url: "/product/list",
        params, 
      }),
      providesTags: (result) => {
        const products = result?.products || result?.data || result;

        return Array.isArray(products)
          ? [
              ...products.map(({ _id }) => ({
                type: "Product",
                id: _id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }];
      },
    }),

    // 2. Get Single Product by ID
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: (result, error, id) => [
        { type: "Product", id },
      ],
    }),

    // 3. Create Single Product (Supports files/FormData)
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data, 
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // 4. Bulk Create Products
    bulkCreateProducts: builder.mutation({
      query: (data) => ({
        url: "/product/bulk-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // 5. Update Product
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),


    // 6. Update Product Status / Verification Flags
updateProductStatus: builder.mutation({
  query: ({ id, statusData }) => ({
    url: `/product/status/${id}`,
    method: "PATCH",
    body: statusData, // e.g. { is_active: true/false }
  }),
  invalidatesTags: (result, error, { id }) => [
    { type: "Product", id },
    { type: "Product", id: "LIST" },
  ],
}),
    // 7. Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useBulkCreateProductsMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
} = productApiSlice;