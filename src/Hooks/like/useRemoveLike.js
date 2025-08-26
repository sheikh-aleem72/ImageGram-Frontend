import { removeLikeRequest } from "@/api/like";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useRemoveLike = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: removeLikeMutation,
  } = useMutation({
    mutationFn: ({ targetId, type }) =>
      removeLikeRequest({ token, targetId, type }),

    onMutate: async ({ targetId }) => {
      await queryClient.cancelQueries(["post", targetId]);

      const prevPost = queryClient.getQueryData(["post", targetId]);

      if (prevPost) {
        queryClient.setQueryData(["post", targetId], {
          ...prevPost,
          likeCount: Math.max((prevPost.likeCount || 1) - 1, 0),
          isLiked: false,
        });
      }

      return { prevPost };
    },

    onError: (_err, { targetId }, ctx) => {
      if (ctx?.prevPost) {
        queryClient.setQueryData(["post", targetId], ctx.prevPost);
      }
    },

    onSuccess: (data, { targetId }) => {
      queryClient.setQueryData(["post", targetId], (prevPost) => ({
        ...prevPost,
        ...data, // because backend sends latest values
      }));
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    removeLikeMutation,
  };
};
