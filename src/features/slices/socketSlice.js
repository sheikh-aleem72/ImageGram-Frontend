import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instance: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,

  reducers: {
    setSocket: (state, action) => {
      state.instance = action.payload;
    },

    clearSocket: (state, action) => {
      if (state.instance) {
        state.instance.disconnect();
      }

      state.instance = null;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
