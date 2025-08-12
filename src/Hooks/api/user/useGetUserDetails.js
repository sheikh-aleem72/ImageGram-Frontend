import { getUserDetailsRequest } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetUserDetails = (userId) => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isFetching,
    isSuccess,
    error,
    data: userDetails,
  } = useQuery({
    queryFn: () => getUserDetailsRequest({ userId, token }),
    queryKey: [`getUserDetails-${userId}`],
    staleTime: 10000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    userDetails,
  };
};
