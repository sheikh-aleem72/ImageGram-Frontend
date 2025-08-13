import { getPresignedUrl } from "@/api/cloudinary";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useGetPresignedUrl = () => {
  const token = useSelector((state) => state?.auth?.token);

  const {
    isPending,
    isError,
    error,
    mutateAsync: getPreSignedUrlMutation,
  } = useMutation({
    mutationFn: () => getPresignedUrl({ token: token }),
    onSuccess: (data) => {
      console.log("Presigned url received!");
    },
    onError: (error) => {
      console.log("Error while fetching presigned url");
    },
  });

  return {
    isPending,
    isError,
    error,
    getPreSignedUrlMutation,
  };
};
