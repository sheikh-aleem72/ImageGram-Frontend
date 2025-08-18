import { getRelationshipStatusRequest } from "@/api/follow";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetRelationshipStatus = (targetUserId) => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isPending,
    isSuccess,
    error,
    refetch,
    data: relationshipStatus,
  } = useQuery({
    queryKey: ["relationship", targetUserId],
    queryFn: () => getRelationshipStatusRequest({ token, targetUserId }),
    enabled: !!targetUserId && !!token, // prevents firing when undefined
    staleTime: 10000,
  });

  return {
    isPending,
    isSuccess,
    error,
    relationshipStatus,
    refetch,
  };
};
