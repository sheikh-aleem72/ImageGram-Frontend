import { Outlet } from "react-router-dom";
import Menubar from "../Menubar/Menubar";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementNotificationsCount,
  setNotificationsCount,
} from "@/features/slices/notificationsCountSlice";
import { useGetUserDetails } from "@/Hooks/api/user/useGetUserDetails";
import { setDetails } from "@/features/slices/detailSlice";

const Layout = ({}) => {
  const dispatch = useDispatch();
  // Get the socket instance from Redux store
  const socket = useSelector((state) => state?.socket?.instance);
  const userId = useSelector((state) => state?.auth?.user?.id);

  const { isSuccess, userDetails } = useGetUserDetails(userId);

  useEffect(() => {
    // Exit early if socket is not available
    if (!socket) return;

    // Handler for updating unread notifications count in Redux
    const handleUnreadNotifications = (count) => {
      dispatch(setNotificationsCount({ unreadNotificationsCount: count }));
    };

    const handleNewNotification = (data) => {
      dispatch(
        incrementNotificationsCount({ unreadNotificationsCount: data.count })
      );
    };

    // Listen for "unread-notifications" event from the socket
    socket.on("unread-notifications", handleUnreadNotifications);

    // Listen for 'new-notification' event
    socket.on("new-notification", handleNewNotification);

    // Cleanup listener when socket changes or component unmounts
    return () => {
      socket.off("unread-notifications", handleUnreadNotifications);
      socket.off("new-notification", handleNewNotification);
    };
  }, [socket]);

  useEffect(() => {
    if (isSuccess && userDetails) {
      dispatch(setDetails({ details: userDetails }));
    }
  }, [isSuccess, userDetails]);

  return (
    <>
      <div className="h-[100vh]">
        <Navbar />
        <Outlet />
        <Menubar />
      </div>
    </>
  );
};

export default Layout;
