


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from '../../features/auth/authSlice';



const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: 'include', // Allows cookies to be sent/received
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If a request fails with 401, it means the Access Token is expired
  if (result?.error?.status === 401) {
    // Attempt to get a new Access Token using the Refresh Token cookie
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Refresh succeeded! Retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed (Session expired), log user out
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'Category', 'User', 'Attendance'],
  endpoints: (builder) => ({}),
});