import { acceptPendingRequest } from "@/api/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useAcceptPendingRequest = () => {
  const token = useSelector((state) => state?.auth?.token);
  const userId = useSelector((state) => state?.auth?.user?.id);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: acceptPendingRequestMutation,
  } = useMutation({
    mutationFn: (id) => acceptPendingRequest({ id, token }),

    onSuccess: () => {
      console.log("Request accepted!!");
      queryClient.invalidateQueries(["follow-requests", userId]);
    },
    onError: (error) => {
      throw error;
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    acceptPendingRequestMutation,
  };
};
