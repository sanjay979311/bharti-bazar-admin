import { apiSlice } from "../../../redux/api/apiSlice";

export const cityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 1. Get All Cities
    getCities: builder.query({
      query: () => '/city',
      providesTags: (result) => {
        const cities = result?.cities || result;
        return cities && Array.isArray(cities)
          ? [
              ...cities.map(({ _id }) => ({ type: 'City', id: _id })),
              { type: 'City', id: 'LIST' },
            ]
          : [{ type: 'City', id: 'LIST' }];
      },
    }),

    // 2. Get City by ID
    getCityById: builder.query({
      query: (id) => `/city/${id}`,
      providesTags: (result, error, id) => [{ type: 'City', id }],
    }),

    // 3. Get City by Country
    getCityByCountryId: builder.query({
      query: (id) => `/city/get-city-by-country/${id}`,
      providesTags: [{ type: 'City', id: 'LIST' }],
    }),

    // 4. Get City by State
    getCityByStateId: builder.query({
      query: (id) => `/city/get-city-by-state/${id}`,
      providesTags: [{ type: 'City', id: 'LIST' }],
    }),

    // 5. Create City
    createCity: builder.mutation({
      query: (formData) => ({
        url: '/city',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'City', id: 'LIST' }],
    }),

    // 6. Update City
    updateCity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/city/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'City', id },
        { type: 'City', id: 'LIST' },
      ],
    }),

    // 7. Toggle Top City
    updateTopCityStatus: builder.mutation({
      query: ({ id, isTopCity }) => ({
        url: `/city/topcity/${id}`,
        method: 'PATCH', // better for partial update
        body: { isTopCity },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'City', id },
        { type: 'City', id: 'LIST' },
      ],
    }),

    // 8. Delete City
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `/city/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'City', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetCitiesQuery,
  useGetCityByIdQuery,
  useGetCityByCountryIdQuery,
  useGetCityByStateIdQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useUpdateTopCityStatusMutation,
  useDeleteCityMutation,
} = cityApiSlice;