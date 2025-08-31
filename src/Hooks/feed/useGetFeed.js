import { getFeedRequest } from "@/api/feed";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetFeed = () => {
  const token = useSelector((state) => state?.auth?.token);

  return useQuery({
    queryKey: ["feed"],
    queryFn: () => getFeedRequest({ token }),
    staleTime: 10000,
  });
};
