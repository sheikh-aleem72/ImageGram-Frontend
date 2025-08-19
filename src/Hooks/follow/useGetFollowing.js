import { getFollowingRequest } from "@/api/follow";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetFollowing = (targetUserId) => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isPending,
    isSuccess,
    error,
    data: FollowingList,
  } = useQuery({
    queryFn: () => getFollowingRequest({ token, targetUserId }),
    queryKey: ["getFollowing", targetUserId],
    staleTime: 10000,
    enabled: !!token && !!targetUserId,
  });

  return {
    isPending,
    isSuccess,
    error,
    FollowingList,
  };
};
