import { Outlet } from "react-router-dom";
import Menubar from "../Menubar/Menubar";
import Navbar from "../Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementNotificationsCount,
  setNotificationsCount,
} from "@/features/slices/notificationsCountSlice";

const Layout = ({}) => {
  const dispatch = useDispatch();
  // Get the socket instance from Redux store
  const socket = useSelector((state) => state?.socket?.instance);

  useEffect(() => {
    // Exit early if socket is not available
    if (!socket) return;

    // Handler for updating unread notifications count in Redux
    const handleUnreadNotifications = (count) => {
      dispatch(setNotificationsCount({ unreadNotificationsCount: count }));
    };

    const handleNewNotification = (count) => {
      dispatch(
        incrementNotificationsCount({ unreadNotificationsCount: count })
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
