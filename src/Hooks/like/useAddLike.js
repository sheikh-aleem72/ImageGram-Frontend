import { addLikeRequest } from "@/api/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

/**
 * Custom hook to handle "Like" actions for both posts and comments.
 * - Supports optimistic UI updates for posts.
 * - Invalidates relevant queries for comments.
 * - Restores previous state if mutation fails.
 */
export const useAddLike = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: addLikeMutation,
  } = useMutation({
    // API call to backend
    mutationFn: ({ targetId, type }) =>
      addLikeRequest({ token, targetId, type }),

    // Optimistic update before mutation is sent
    onMutate: async ({ targetId, type, postId }) => {
      if (type === "post") {
        // Stop ongoing queries for this post
        await queryClient.cancelQueries(["post", targetId]);

        // Snapshot previous post state
        const prevPost = queryClient.getQueryData(["post", targetId]);

        // Optimistically update post like count + status
        if (prevPost) {
          queryClient.setQueryData(["post", targetId], {
            ...prevPost,
            likeCount: (prevPost.likeCount || 0) + 1,
            isLiked: true,
          });
        }

        // Return snapshot for rollback if needed
        return { prevPost };
      } else if (type === "comment") {
        // Instead of manual update, just refetch comments
        await queryClient.cancelQueries(["comments", postId]);
      }
    },

    // Rollback if mutation fails
    onError: (_err, { targetId, type }, ctx) => {
      if (type === "post" && ctx?.prevPost) {
        queryClient.setQueryData(["post", targetId], ctx.prevPost);
      }
    },

    // Success handling
    onSuccess: (data, { targetId, type, postId }) => {
      if (type === "post") {
        // Merge backend response with optimistic state
        queryClient.setQueryData(["post", targetId], (prevPost) => ({
          ...prevPost,
          ...(data || {}),
        }));
      } else if (type === "comment") {
        // Ensure comments refetch after success
        queryClient.invalidateQueries(["comments", postId]);
      }
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    addLikeMutation, // Call this to trigger mutation
  };
};
