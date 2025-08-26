import { addLikeRequest } from "@/api/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useAddLike = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: addLikeMutation,
  } = useMutation({
    mutationFn: ({ targetId, type }) =>
      addLikeRequest({ token, targetId, type }),

    onMutate: async ({ targetId }) => {
      await queryClient.cancelQueries(["post", targetId]);

      const prevPost = queryClient.getQueryData(["post", targetId]);

      if (prevPost) {
        queryClient.setQueryData(["post", targetId], {
          ...prevPost,
          likeCount: (prevPost.likeCount || 0) + 1,
          isLiked: true,
        });
      }

      return { prevPost };
    },

    onError: (_err, { targetId }, ctx) => {
      if (ctx?.prevPost) {
        queryClient.setQueryData(["post", targetId], ctx.prevPost);
      }
    },

    // 🔑 No invalidate here
    onSuccess: (data, { targetId }) => {
      // If backend sends updated post, use it
      // else, just trust optimistic update
      queryClient.setQueryData(["post", targetId], (prevPost) => ({
        ...prevPost,
        ...(data || {}),
      }));
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    addLikeMutation,
  };
};
