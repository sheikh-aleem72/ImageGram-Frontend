import { deletePendingRequest } from "@/api/follow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useDeletePendingRequest = () => {
  const token = useSelector((state) => state?.auth?.token);
  const userId = useSelector((state) => state?.auth?.user?.id);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deletePendingRequestMutation,
  } = useMutation({
    mutationFn: (id) => deletePendingRequest({ id, token }),

    onSuccess: () => {
      console.log("Request deleted!!");
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
    deletePendingRequestMutation,
  };
};
