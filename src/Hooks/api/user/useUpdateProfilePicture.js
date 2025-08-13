import { updateProfilePictureRequest } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useUpdateProfilePicture = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateprofilepictureMutation,
  } = useMutation({
    mutationFn: (imageURL) => updateProfilePictureRequest({ token, imageURL }),
    onSuccess: (data) => {
      toast("Profile photo updated!");
      queryClient.invalidateQueries([`getUserDetails-${data?.data?._id}`]);
    },
    onError: (error) => {
      console.log("Error while updating profile picture!!", error);
      throw error?.response.data;
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateprofilepictureMutation,
  };
};
