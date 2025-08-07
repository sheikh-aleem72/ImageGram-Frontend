import { signinRequest } from "@/api/auth";
import { setAuth } from "@/features/slices/authSlice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

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
      console.log("User has been signed in successfully!", response?.data);

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
