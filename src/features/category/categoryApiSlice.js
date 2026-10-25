


import { apiSlice } from "../../redux/api/apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get All Categories
    getCategories: builder.query({
      query: () => '/category/list',
      providesTags: (result) => {
        const categories = result?.categories || result;
        return categories && Array.isArray(categories)
          ? [
              ...categories.map(({ _id }) => ({ type: 'Category', id: _id })),
              { type: 'Category', id: 'LIST' },
            ]
          : [{ type: 'Category', id: 'LIST' }];
      },
    }),

    // 2. Get Single Category by ID
    getCategoryById: builder.query({
      query: (id) => `/category/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),

    // 3. Create Category (Multipart/Form-Data)
    createCategory: builder.mutation({
      query: (formData) => ({
        url: '/category/create',
        method: 'POST',
        body: formData, // Passing FormData directly
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    // 4. Update Category (Multipart/Form-Data)
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/update/${id}`,
        method: 'PUT',
        body: data, // Passing FormData directly
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    // 5. Toggle Active/Inactive Status
    toggleCategoryStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/category/status/${id}`,
        method: 'PATCH',
        body: { isActive }, 
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Category', id },
        { type: 'Category', id: 'LIST' },
      ],
    }),

    // 6. Delete Category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/remove/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery, // Match the name used in the Edit Component
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useToggleCategoryStatusMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;