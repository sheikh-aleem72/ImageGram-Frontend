import { deletePostRequest } from "@/api/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useDeletePost = () => {
  const token = useSelector((state) => state?.auth?.token);
  const userId = useSelector((state) => state?.auth?.user?.id);

  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deletePostMutation,
  } = useMutation({
    mutationFn: (postId) => deletePostRequest({ token, postId }),
    onSuccess: (response) => {
      toast("Post delete successfully!");
      queryClient.invalidateQueries(["feed", userId]);
    },
    onError: (error) => {
      toast.error("Error while deleting post!");
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    deletePostMutation,
  };
};
