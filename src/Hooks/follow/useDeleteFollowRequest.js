import { deleteFollowRequest } from "@/api/follow";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useDeleteFollowRequest = () => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deleteFollowRequestMutation,
  } = useMutation({
    mutationFn: (requestId) => {
      if (!requestId) return;
      return deleteFollowRequest({ token, requestId });
    },
    onSuccess: (response) => {
      console.log("Request deleted", response);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    deleteFollowRequestMutation,
  };
};
