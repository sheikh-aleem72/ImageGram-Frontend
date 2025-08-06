import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = action.payload.isLoading;
    },

    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
