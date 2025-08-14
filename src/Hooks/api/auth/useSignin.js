import { signinRequest } from "@/api/auth";
import { setAuth } from "@/features/slices/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useSignin = () => {
  const dispatch = useDispatch();

  const {
    isPending,
    error,
    isSuccess,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signinRequest,
    onSuccess: (response) => {
      const userObject = JSON.stringify(response.data);
      const token = JSON.stringify(response.data.token);

      dispatch(
        setAuth({
          user: response.data,
          token: response.data.token,
          isLoading: false,
        })
      );

      localStorage.setItem("user", userObject);
      localStorage.setItem("token", token);

      toast("Signed in successfully!", {
        description: "You will be redirected to home page in a moment",
      });
    },

    onError: (error) => {
      console.log("Failed to signed in!", error);
    },
  });

  return {
    isPending,
    error,
    isSuccess,
    signinMutation,
  };
};
