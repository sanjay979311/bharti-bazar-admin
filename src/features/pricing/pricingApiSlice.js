import { apiSlice } from "../../redux/api/apiSlice";

export const pricingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Get All Pricing Plans
    getPricingPlans: builder.query({
      query: () => '/pricing-plan/list',
      providesTags: (result) => {
        // Handle result structure whether it's an object or direct array
        const plans = result?.data || result;
        return plans && Array.isArray(plans)
          ? [
              ...plans.map(({ _id }) => ({ type: 'PricingPlan', id: _id })),
              { type: 'PricingPlan', id: 'LIST' },
            ]
          : [{ type: 'PricingPlan', id: 'LIST' }];
      },
    }),

    // 2. Get Single Pricing Plan
    getPricingPlanById: builder.query({
      query: (id) => `/pricing-plan/${id}`,
      providesTags: (result, error, id) => [{ type: 'PricingPlan', id }],
    }),

    // 3. Create Pricing Plan
    createPricingPlan: builder.mutation({
      query: (newPlan) => ({
        url: '/pricing-plan/create',
        method: 'POST',
        body: newPlan,
      }),
      invalidatesTags: [{ type: 'PricingPlan', id: 'LIST' }],
    }),

    // 4. Update Pricing Plan
    updatePricingPlan: builder.mutation({
      query: ({ id, ...updatedPlan }) => ({
        url: `/pricing-plan/update/${id}`,
        method: 'PUT',
        body: updatedPlan,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PricingPlan', id },
        { type: 'PricingPlan', id: 'LIST' },
      ],
    }),

    // 5. Update Status Only
    updatePricingStatus: builder.mutation({
      query: ({ id, statusData }) => ({
        url: `/pricing-plan/status/${id}`,
        method: 'PATCH',
        body: statusData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PricingPlan', id },
        { type: 'PricingPlan', id: 'LIST' },
      ],
    }),

    // 6. Delete Pricing Plan
    deletePricingPlan: builder.mutation({
      query: (id) => ({
        url: `/pricing-plan/remove/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'PricingPlan', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPricingPlansQuery,
  useGetPricingPlanByIdQuery,
  useCreatePricingPlanMutation,
  useUpdatePricingPlanMutation,
  useUpdatePricingStatusMutation,
  useDeletePricingPlanMutation,
} = pricingApiSlice;
