import { apiSlice } from "../../../redux/api/apiSlice";

export const areaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 1. Get All Areas
    getAreas: builder.query({
      query: () => '/area',
      providesTags: (result) => {
        const areas = result?.areas || result;
        return areas && Array.isArray(areas)
          ? [
              ...areas.map(({ _id }) => ({ type: 'Area', id: _id })),
              { type: 'Area', id: 'LIST' },
            ]
          : [{ type: 'Area', id: 'LIST' }];
      },
    }),

    // 2. Get Area by ID
    getAreaById: builder.query({
      query: (id) => `/area/${id}`,
      providesTags: (result, error, id) => [{ type: 'Area', id }],
    }),

    // 3. Get Area by Country
    getAreaByCountryId: builder.query({
      query: (id) => `/area/get-Area-by-country/${id}`,
      providesTags: [{ type: 'Area', id: 'LIST' }],
    }),

    // 4. Get Area by State
    getAreaByStateId: builder.query({
      query: (id) => `/area/get-Area-by-state/${id}`,
      providesTags: [{ type: 'Area', id: 'LIST' }],
    }),

    // 5. Create Area
    createArea: builder.mutation({
      query: (formData) => ({
        url: '/area/create',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Area', id: 'LIST' }],
    }),

    // 6. Update Area
    updateArea: builder.mutation({
      query: ({ id, data }) => ({
        url: `/area/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Area', id },
        { type: 'Area', id: 'LIST' },
      ],
    }),

    // 7. Delete Area
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `/area/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Area', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetAreasQuery,
  useGetAreaByIdQuery,
  useGetAreaByCountryIdQuery,
  useGetAreaByStateIdQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = areaApiSlice;