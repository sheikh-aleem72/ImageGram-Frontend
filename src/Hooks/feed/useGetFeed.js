import { getFeedRequest } from "@/api/feed";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetFeed = () => {
  const token = useSelector((state) => state?.auth?.token);
  const userId = useSelector((state) => state?.auth?.user?.id);

  return useQuery({
    queryKey: ["feed", userId],
    queryFn: () => getFeedRequest({ token }),
    staleTime: 10000,
  });
};
