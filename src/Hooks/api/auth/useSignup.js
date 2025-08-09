import { signupRequest } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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

      toast("Successfully signed up", {
        description: "You will be redirected to sign in page in few moments",
      });
    },
    onError: (error) => {
      console.log("Error in sign up!", error);

      toast("Failed to signed up", {
        description: error.message,
      });

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
