import { createPostRequest } from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useCreatePost = () => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: createPostMutation,
  } = useMutation({
    mutationFn: (data) => createPostRequest({ token, data }),
    onSuccess: (response) => {
      toast("Post created successfully!");
    },
    onError: (error) => {
      console.log("Error while posting: ", error);
      toast.error("Image upload failed. Please try again.");
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    createPostMutation,
  };
};
