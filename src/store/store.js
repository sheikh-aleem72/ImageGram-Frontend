import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import socketReducer from "../features/slices/socketSlice";
import modalSlice from "../features/slices/modalSlice";
import detailSlice from "../features/slices/detailSlice";
import notificationsCountSlice from "../features/slices/notificationsCountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,
    modal: modalSlice,
    detail: detailSlice,
    notificationsCount: notificationsCountSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
