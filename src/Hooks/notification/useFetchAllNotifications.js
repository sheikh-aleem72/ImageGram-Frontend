import { fetchAllNotificationsRequest } from "@/api/notification";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useFetchAllNotifications = () => {
  const token = useSelector((state) => state?.auth?.token);
  const userId = useSelector((state) => state?.auth?.user?.id);

  return useInfiniteQuery({
    queryKey: ["notifications", userId],
    queryFn: ({ pageParam = null }) =>
      fetchAllNotificationsRequest({
        token,
        receiverId: userId,
        beforeCursor: pageParam, // pass cursor here
      }),
    getNextPageParam: (lastPage) => {
      // your backend should return something like { nextCursor: "123" }
      return lastPage?.nextCursor ?? null;
    },
    staleTime: 10000,
  });
};
