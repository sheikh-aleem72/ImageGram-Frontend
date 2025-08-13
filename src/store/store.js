import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import socketReducer from "../features/slices/socketSlice";
import modalSlice from "../features/slices/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
