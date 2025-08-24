import { getPostRequest } from "@/api/post";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetPost = (postId) => {
  const token = useSelector((state) => state?.auth?.token);

  return useQuery({
    queryKey: ["get-post", postId],
    queryFn: () => getPostRequest({ token, id: postId }),
    staleTime: 10000,
  });
};
