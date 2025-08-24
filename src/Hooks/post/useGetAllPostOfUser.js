import { getAllPostOfUserRequest } from "@/api/post";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetAllPostOfUser = (userId) => {
  const token = useSelector((state) => state?.auth?.token);

  return useQuery({
    queryKey: ["get-all-post", userId],
    queryFn: () => getAllPostOfUserRequest({ token, userId }),
    staleTime: 10000,
  });
};
