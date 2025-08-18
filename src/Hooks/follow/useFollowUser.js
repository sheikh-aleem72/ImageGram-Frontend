import { followUserRequest } from "@/api/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useFollowUser = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isSuccess,
    isPending,
    error,
    mutateAsync: followUserMutation,
  } = useMutation({
    mutationFn: (targetUserId) => {
      if (!targetUserId) return;
      return followUserRequest({ targetUserId, token });
    },

    onSuccess: (response) => {
      queryClient.invalidateQueries([
        `getUserDetails-${response?.followingUser}`,
      ]);
    },
    onError: (error) => {
      console.log("error while following user: ", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    followUserMutation,
  };
};
