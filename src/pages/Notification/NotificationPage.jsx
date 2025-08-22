import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserStarIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementNotificationsCount,
  resetNotificationsCount,
} from "@/features/slices/notificationsCountSlice";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import NotificationRow from "@/components/molecules/NotificationRow/NotificationRow";
import { useFetchAllNotifications } from "@/Hooks/notification/useFetchAllNotifications";
import { useGetPendingFollowRequest } from "@/Hooks/follow/useGetPendingFollowRequest";

const NotificationPage = () => {
  const socket = useSelector((state) => state?.socket?.instance);
  const userId = useSelector((state) => state?.auth?.user?.id);
  const privacy = useSelector(
    (state) => state?.detail?.details?.accountPrivacy
  );
  const isPrivate = privacy === "private";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Track mobile layout
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Fetch notifications with infinite query (pagination)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchAllNotifications();

  // Fetch pending request
  const {
    isPending,
    isSuccess,
    data: requestList,
  } = useGetPendingFollowRequest();

  // Flatten paginated notifications into a single array
  const notifications = data
    ? data.pages.flatMap((page) => page.notifications) // flatMap converts the map of array into single array e.g. {notification: [1,2], notification: [3,4]} -> [1,2,3,4]
    : [];

  // Handle responsive changes (mobile/desktop)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ESC key closes modal (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleEsc = (e) => e.key === "Escape" && navigate(-1);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMobile, navigate]);

  // Listen for new notifications via socket
  useEffect(() => {
    if (!socket) return;
    const handleNew = (notification) => {
      // Prepend new notification to the flattened array
      data?.pages[0]?.notifications.unshift(notification);
    };
    socket.on("notifications", handleNew);
    return () => socket.off("notifications", handleNew);
  }, [socket, data]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("read-notifications", { userId });
    dispatch(resetNotificationsCount());
  }, []);

  // Loader function for InfiniteLoader
  const loadMoreNotifications = async () => {
    if (!isFetchingNextPage && hasNextPage) {
      await fetchNextPage();
    }
  };

  // Check if item at index is loaded
  const isItemLoaded = (index) => !hasNextPage || index < notifications.length;

  // Render notification list with infinite loader and virtualization
  const renderList = (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={hasNextPage ? notifications.length + 1 : notifications.length}
      loadMoreItems={loadMoreNotifications}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={600}
          itemSize={60}
          itemCount={
            hasNextPage ? notifications.length + 1 : notifications.length
          }
          width="100%"
          onItemsRendered={onItemsRendered}
          itemData={{
            notifications,
            isItemLoaded,
          }}
          ref={ref}
        >
          {NotificationRow}
        </List>
      )}
    </InfiniteLoader>
  );

  const requestContainer = (
    <Link to={`/notifications/requests`}>
      <div className="w-full h-[70px] flex justify-between items-center border-2 ">
        <div className="flex justify-start items-center gap-3 p-4">
          <UserStarIcon className="w-10 h-10 rounded-full border border-black p-2" />
          <div className="">
            <h1 className="text-imagegram-text text-md">Follow requests</h1>
            <h1 className="text-imagegram-subtext text-md">
              Approve or ignore requests
            </h1>
          </div>
        </div>
        <div className=" p-4">
          <span className="text-lg text-red-700">{requestList?.length}</span>
        </div>
      </div>
    </Link>
  );

  // Render mobile layout
  if (isMobile) {
    return (
      <div className="p-4 mt-[70px]">
        <h1 className="text-xl font-bold mb-2">Notifications</h1>
        {isPrivate && requestContainer}
        {renderList}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-start z-50 md:ml-[70px]">
      <div className="bg-white p-6 shadow-xl w-[400px] relative h-full">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-gray-500"
        >
          <XIcon className="cursor-pointer" />
        </button>
        <h1 className="text-lg font-bold mb-3">Notifications</h1>
        {isPrivate && requestContainer}
        {renderList}
      </div>
    </div>
  );
};

export default NotificationPage;
