import { useQuery } from "@tanstack/react-query";
import { getPostRequest } from "@/api/post";
import { useSelector } from "react-redux";

export const useGetPost = (postId) => {
  const token = useSelector((state) => state?.auth?.token);

  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostRequest({ token, id: postId }),
    enabled: !!postId,
  });
};
