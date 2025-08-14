import { getAllUserRequest } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetAllUser = () => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isFetching,
    isSuccess,
    error,
    data: usersData,
  } = useQuery({
    queryFn: () => getAllUserRequest({ token }),
    queryKey: ["get-all-users"],
    staleTime: 10000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    usersData,
  };
};
