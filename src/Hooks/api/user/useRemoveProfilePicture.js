import { removeProfilePictureRequest } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useRemoveProfilePicture = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isError,
    isPending,
    error,
    mutateAsync: removeprofilepictureMutation,
  } = useMutation({
    mutationFn: () => removeProfilePictureRequest({ token }),
    onSuccess: (response) => {
      toast("Profile photo removed successfully!");
      queryClient.invalidateQueries([`getUserDetails-${response?.data._id}`]);
    },
    onError: (error) => {
      throw error;
    },
  });

  return {
    isError,
    isPending,
    error,
    removeprofilepictureMutation,
  };
};
