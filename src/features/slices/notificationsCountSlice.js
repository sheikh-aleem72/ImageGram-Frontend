import { createSlice } from "@reduxjs/toolkit";

const notificationsCountSlice = createSlice({
  name: "notifications-slice",
  initialState: {
    unreadNotificationsCount: 0,
  },

  reducers: {
    setNotificationsCount: (state, action) => {
      state.unreadNotificationsCount = action.payload.unreadNotificationsCount;
    },

    resetNotificationsCount: (state) => {
      state.unreadNotificationsCount = 0;
    },

    incrementNotificationsCount: (state, action) => {
      state.unreadNotificationsCount += action.payload.unreadNotificationsCount; // optional extra reducer
    },
  },
});

export const {
  setNotificationsCount,
  resetNotificationsCount,
  incrementNotificationsCount,
} = notificationsCountSlice.actions;

export default notificationsCountSlice.reducer;
