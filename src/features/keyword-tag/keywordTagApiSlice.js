import { apiSlice } from "../../redux/api/apiSlice";

export const keywordTagApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get All Keyword Tags
    getKeywordTags: builder.query({
      query: () => "/keyword-tag/list",
      providesTags: (result) => {
        const tags = result?.keywordTags || result?.tags || result;

        return Array.isArray(tags)
          ? [
              ...tags.map(({ _id }) => ({
                type: "KeywordTag",
                id: _id,
              })),
              { type: "KeywordTag", id: "LIST" },
            ]
          : [{ type: "KeywordTag", id: "LIST" }];
      },
    }),

    // 2. Get Single Keyword Tag by ID
    getKeywordTagById: builder.query({
      query: (id) => `/keyword-tag/${id}`,
      providesTags: (result, error, id) => [
        { type: "KeywordTag", id },
      ],
    }),

    // 3. Create Keyword Tag
    createKeywordTag: builder.mutation({
      query: (data) => ({
        url: "/keyword-tag/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "KeywordTag", id: "LIST" }],
    }),

    // 4. Update Keyword Tag
    // updateKeywordTag: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/keyword-tag/update/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [
    //     { type: "KeywordTag", id },
    //     { type: "KeywordTag", id: "LIST" },
    //   ],
    // }),
    // keywordTagApiSlice.js
updateKeywordTag: builder.mutation({
  query: ({ id, ...patchData }) => ({
    url: `/keyword-tag/update/${id}`,
    method: "PUT",
    body: patchData,
  }),
  invalidatesTags: (result, error, { id }) => [
    { type: "KeywordTag", id },
    { type: "KeywordTag", id: "LIST" },
  ],
}),

    // 5. Delete Keyword Tag
    deleteKeywordTag: builder.mutation({
      query: (id) => ({
        url: `/keyword-tag/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "KeywordTag", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetKeywordTagsQuery,
  useGetKeywordTagByIdQuery,
  useCreateKeywordTagMutation,
  useUpdateKeywordTagMutation,
  useDeleteKeywordTagMutation,
} = keywordTagApiSlice;