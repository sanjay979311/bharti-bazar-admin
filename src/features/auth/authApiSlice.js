

import { apiSlice } from "../../redux/api/apiSlice";
import { setCredentials, logOut, setInitialized } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // data matches your backend: { message, user: { id, name, email, role } }
          dispatch(setCredentials({ user: data.user }));
        } catch (err) {
          console.error("Login failed:", err);
        }
      },
    }),

    getMe: builder.query({
      query: () => '/auth/me',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // your /me returns the user object directly
          dispatch(setCredentials({ user: data }));
        } catch (err) {
          dispatch(setInitialized());
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          // Clear entire cache on logout for security
          setTimeout(() => { dispatch(apiSlice.util.resetApiState()); }, 0);
        } catch (err) {
          console.error("Logout failed:", err);
        }
      }
    })
  }),
});

export const { 
  useLoginMutation, 
  useGetMeQuery, 
  useLogoutMutation 
} = authApiSlice;
