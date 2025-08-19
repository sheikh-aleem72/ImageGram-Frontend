import { followUserRequest, getFollowerRequest } from "@/api/follow";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetFollowers = (targetUserId) => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isPending,
    isSuccess,
    error,
    data: FollowerList,
  } = useQuery({
    queryFn: () => getFollowerRequest({ token, targetUserId }),
    queryKey: ["getFollowers", targetUserId],
    staleTime: 10000,
    enabled: !!token && !!targetUserId,
  });

  return {
    isPending,
    isSuccess,
    error,
    FollowerList,
  };
};
