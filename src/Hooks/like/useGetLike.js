import { getLikeRequest } from "@/api/like";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetLike = (targetId, type) => {
  const token = useSelector((state) => state?.auth?.token);

  return useQuery({
    queryKey: ["like", targetId],
    queryFn: () => getLikeRequest({ token, type, targetId }),
    staleTime: 10000, // 10 seconds
  });
};
