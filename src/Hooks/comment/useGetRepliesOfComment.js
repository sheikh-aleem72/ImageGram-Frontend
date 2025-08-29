import { getRepliesOfCommentRequest } from "@/api/comment";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetRepliesOfComment = (parentCommentId) => {
  const token = useSelector((state) => state?.auth?.token);

  return useQuery({
    queryKey: ["replies", parentCommentId],
    queryFn: ({ queryKey }) => {
      const [, commentId] = queryKey;
      return getRepliesOfCommentRequest({ token, parentCommentId: commentId });
    },
    staleTime: 10000,
    enabled: !!parentCommentId && !!token,
  });
};
