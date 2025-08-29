import { createCommentRequest } from "@/api/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useCreateComment = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: createCommentMutation,
  } = useMutation({
    mutationFn: (data) =>
      createCommentRequest({
        token,
        content: data.content,
        postId: data.postId,
        parentCommentId: data?.parentCommentId,
      }),
    onSuccess: (response, postId) => {
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (error) => {
      toast.error("Error while creating comment!");
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    createCommentMutation,
  };
};
