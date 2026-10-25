


import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    isInitialized: false 
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isInitialized = true; 
    },
    logOut: (state) => {
      state.user = null;
      state.isInitialized = true; 
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    }
  },
});

export const { setCredentials, logOut, setInitialized } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsInitialized = (state) => state.auth.isInitialized;