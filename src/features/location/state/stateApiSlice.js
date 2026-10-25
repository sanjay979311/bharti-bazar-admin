import { apiSlice } from "../../../redux/api/apiSlice";

export const stateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 1. Get All States
    getStates: builder.query({
      query: () => '/state',
      providesTags: (result) => {
        const states = result?.states || result;
        return states && Array.isArray(states)
          ? [
              ...states.map(({ _id }) => ({ type: 'State', id: _id })),
              { type: 'State', id: 'LIST' },
            ]
          : [{ type: 'State', id: 'LIST' }];
      },
    }),

    // 2. Get State by ID
    getStateById: builder.query({
      query: (id) => `/state/${id}`,
      providesTags: (result, error, id) => [{ type: 'State', id }],
    }),

    // 3. Get State by Country
    getStateByCountryId: builder.query({
      query: (id) => `/state/get-state-by-country/${id}`,
      providesTags: [{ type: 'State', id: 'LIST' }],
    }),

    // 4. Create State
    createState: builder.mutation({
      query: (formData) => ({
        url: '/state',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'State', id: 'LIST' }],
    }),

    // 5. Update State
    updateState: builder.mutation({
      query: ({ id, data }) => ({
        url: `/state/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'State', id },
        { type: 'State', id: 'LIST' },
      ],
    }),

    // 6. Delete State
    deleteState: builder.mutation({
      query: (id) => ({
        url: `/state/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'State', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetStatesQuery,
  useGetStateByIdQuery,
  useGetStateByCountryIdQuery,
  useCreateStateMutation,
  useUpdateStateMutation,
  useDeleteStateMutation,
} = stateApiSlice;
