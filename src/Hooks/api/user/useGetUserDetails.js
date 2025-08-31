import { getUserDetailsRequest } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetUserDetails = (userId) => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isFetching,
    isPending,
    isSuccess,
    error,
    data: userDetails,
  } = useQuery({
    queryFn: () => getUserDetailsRequest({ userId, token }),
    queryKey: [`getUserDetails-${userId}`],
    staleTime: 10000,
    enabled: !!userId && !!token,
  });

  return {
    isFetching,
    isPending,
    isSuccess,
    error,
    userDetails,
  };
};
