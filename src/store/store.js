import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import socketReducer from "../features/slices/socketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
