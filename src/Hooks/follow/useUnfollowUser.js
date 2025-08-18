import { unfollowUserRequest } from "@/api/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useUnfollowUser = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: unFollowUserMutation,
  } = useMutation({
    mutationFn: (targetUserId) => {
      if (!targetUserId) return;
      return unfollowUserRequest({ token, targetUserId });
    },
    onSuccess: (_, targetUserId) => {
      queryClient.invalidateQueries([`getUserDetails-${targetUserId}`]);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    unFollowUserMutation,
  };
};
