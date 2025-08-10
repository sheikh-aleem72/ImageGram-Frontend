import { clearSocket, setSocket } from "@/features/slices/socketSlice";
import { createSocketConnection } from "@/utils/socketManager";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth?.token);
  const socket = useSelector((state) => state.socket?.instance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(clearSocket());
      return;
    }

    // Avoid reconnecting if socket already exists
    if (!socket) {
      const newSocket = createSocketConnection(token);
      dispatch(setSocket(newSocket));
    }

    // Cleanup when unmounting
    return () => {
      dispatch(clearSocket());
    };
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};
