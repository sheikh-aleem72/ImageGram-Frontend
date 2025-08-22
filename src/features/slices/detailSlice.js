import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: {
    id: null,
    username: "",
    email: "",
    profilePicture: "",
    accountPrivacy: "",
    gender: "",
    name: "",
    bio: "",
    followersCount: 0,
    followingCount: 0,
  },
};

const detailSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload.details; // Replace entire details object
    },
    updateDetails: (state, action) => {
      state.details = { ...state.details, ...action.payload }; // Merge updates
    },
    clearDetails: (state) => {
      state.details = initialState.details; // Reset to initial
    },
  },
});

export const { setDetails, updateDetails, clearDetails } = detailSlice.actions;
export default detailSlice.reducer;
