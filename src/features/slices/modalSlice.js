import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    openModal: (state, action) => {
      const { modalName, props = null } = action.payload;
      state[modalName] = { open: true, props };
    },

    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state[modalName]) {
        state[modalName].open = false;
        state[modalName].props = null;
      }
    },

    setModalProps: (state, action) => {
      const { modalName, props } = action.payload;
      state[modalName] = state[modalName] ?? { open: false, props: null };
      state[modalName].props = props;
    },
  },
});

export const { openModal, closeModal, setModalProps } = modalSlice.actions;
export default modalSlice.reducer;
