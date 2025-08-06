import { signupRequest } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      console.log("Signed up successfully!", data);
    },
    onError: (error) => {
      console.log("Error in sign up!", error);
      throw error;
    },
  });

  return {
    isPending,
    isSuccess,
    isError,
    signupMutation,
  };
};
