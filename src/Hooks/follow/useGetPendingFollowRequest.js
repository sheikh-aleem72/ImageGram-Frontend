import { getPendingFollowRequest } from "@/api/follow";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetPendingFollowRequest = () => {
  const token = useSelector((state) => state?.auth?.token);
  const userId = useSelector((state) => state?.auth?.user?.id);

  return useQuery({
    queryKey: ["follow-requests", userId],
    queryFn: () => getPendingFollowRequest({ token }),
    staleTime: 10000,
  });
};
