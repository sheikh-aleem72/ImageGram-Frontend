import { removeLikeRequest } from "@/api/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useRemoveLike = () => {
  const token = useSelector((state) => state?.auth?.token); // Get auth token from redux
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: removeLikeMutation,
  } = useMutation({
    // Actual API call
    mutationFn: ({ targetId, type }) =>
      removeLikeRequest({ token, targetId, type }),

    /**
     * Optimistic Update (runs before mutationFn)
     * - Immediately updates UI assuming mutation will succeed
     * - Saves rollback context in case of error
     */
    onMutate: async ({ targetId, type, postId }) => {
      if (type === "post") {
        // Cancel ongoing queries for the specific post
        await queryClient.cancelQueries(["post", targetId]);

        // Get current cached post data
        const prevPost = queryClient.getQueryData(["post", targetId]);

        // Optimistically update UI
        if (prevPost) {
          queryClient.setQueryData(["post", targetId], {
            ...prevPost,
            likeCount: Math.max((prevPost.likeCount || 1) - 1, 0),
            isLiked: false,
          });
        }

        // Return context so we can rollback on error
        return { prevPost };
      } else if (type === "comment") {
        // Cancel ongoing comment query for the post
        await queryClient.cancelQueries(["comments", postId]);

        // Get current cached comments
        const prevComments = queryClient.getQueryData(["comments", postId]);

        // Optimistically update comments list
        if (prevComments) {
          queryClient.setQueryData(["comments", postId], (old) =>
            old.map((comment) =>
              comment._id === targetId
                ? {
                    ...comment,
                    likeCount: Math.max((comment.likeCount || 1) - 1, 0),
                    isLiked: false,
                  }
                : comment
            )
          );
        }

        return { prevComments };
      }
    },

    /**
     * Rollback (if error occurs)
     * - Reverts cache to previous snapshot
     */
    onError: (_err, { targetId, type, postId }, ctx) => {
      if (type === "post" && ctx?.prevPost) {
        queryClient.setQueryData(["post", targetId], ctx.prevPost);
      }
      if (type === "comment" && ctx?.prevComments) {
        queryClient.setQueryData(["comments", postId], ctx.prevComments);
      }
    },

    /**
     * Sync with server response (on success)
     * - Ensures cache matches latest backend values
     */
    onSuccess: (data, { targetId, type, postId }) => {
      if (type === "post") {
        queryClient.setQueryData(["post", targetId], (prevPost) => ({
          ...prevPost,
          ...data, // backend returns latest post state
        }));
      } else if (type === "comment") {
        // Invalidate to fetch latest comment state
        queryClient.invalidateQueries(["comments", postId]);
      }
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    removeLikeMutation, // call this to trigger remove like
  };
};
