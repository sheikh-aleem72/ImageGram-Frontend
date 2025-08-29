import { getAllParentCommentOfPostRequest } from "@/api/comment";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetAllParentComment = (postId) => {
  const token = useSelector((state) => state?.auth?.token);

  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getAllParentCommentOfPostRequest({ token, postId }),
    staleTime: 10000,
  });
};
