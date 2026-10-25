import { apiSlice } from "../../../redux/api/apiSlice";

export const countryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 1. Get All Countries
    getCountries: builder.query({
      query: () => '/country',
      providesTags: (result) => {
        const countries = result?.countries || result;
        return countries && Array.isArray(countries)
          ? [
              ...countries.map(({ _id }) => ({ type: 'Country', id: _id })),
              { type: 'Country', id: 'LIST' },
            ]
          : [{ type: 'Country', id: 'LIST' }];
      },
    }),

    // 2. Get Country by ID
    getCountryById: builder.query({
      query: (id) => `/country/${id}`,
      providesTags: (result, error, id) => [{ type: 'Country', id }],
    }),

    // 3. Create Country
    createCountry: builder.mutation({
      query: (formData) => ({
        url: '/country',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Country', id: 'LIST' }],
    }),

    // 4. Update Country
    updateCountry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/country/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Country', id },
        { type: 'Country', id: 'LIST' },
      ],
    }),

    // 5. Delete Country
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: `/country/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Country', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryByIdQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} = countryApiSlice;