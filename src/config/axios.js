import { logout } from "@/features/slices/authSlice";
import { store } from "@/store/store";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.log("Auth token expired!");

      // Clear local storage & redux
      store.dispatch(logout());
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect
      window.location.href = "/auth/signin";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
