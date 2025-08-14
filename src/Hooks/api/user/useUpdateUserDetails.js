import { updateUserDetailsRequest } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export const useUpdateUserDetails = () => {
  const token = useSelector((state) => state?.auth?.token);
  const queryClient = useQueryClient();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateUserDetailsMutation,
  } = useMutation({
    mutationFn: (data) => updateUserDetailsRequest({ token, data }),

    onSuccess: (data) => {
      toast("Details updated successfully!!");
      queryClient.invalidateQueries([`getUserDetails-${data?.data?._id}`]);
    },
    onError: (error) => {
      throw error;
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateUserDetailsMutation,
  };
};
