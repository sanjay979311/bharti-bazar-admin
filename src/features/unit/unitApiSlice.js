
import { apiSlice } from "../../redux/api/apiSlice";

export const unitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get All Units
    getUnits: builder.query({
      query: () => "/unit/list",
      providesTags: (result) => {
        const units = result?.units || result;

        return Array.isArray(units)
          ? [
              ...units.map(({ _id }) => ({
                type: "Unit",
                id: _id,
              })),
              { type: "Unit", id: "LIST" },
            ]
          : [{ type: "Unit", id: "LIST" }];
      },
    }),

    // 2. Get Single Unit by ID
    getUnitById: builder.query({
      query: (id) => `/unit/${id}`,
      providesTags: (result, error, id) => [
        { type: "Unit", id },
      ],
    }),

    // 3. Create Unit
    createUnit: builder.mutation({
      query: (data) => ({
        url: "/unit/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Unit", id: "LIST" }],
    }),

    // 4. Update Unit
    updateUnit: builder.mutation({
      query: ({ id, data }) => ({
        url: `/unit/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Unit", id },
        { type: "Unit", id: "LIST" },
      ],
    }),

    // 5. Toggle Unit Status
    toggleUnitStatus: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/unit/status/${id}`,
        method: "PATCH",
        body: { isActive },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Unit", id },
        { type: "Unit", id: "LIST" },
      ],
    }),

    // 6. Delete Unit
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `/unit/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Unit", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useGetUnitByIdQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useToggleUnitStatusMutation,
  useDeleteUnitMutation,
} = unitApiSlice;
