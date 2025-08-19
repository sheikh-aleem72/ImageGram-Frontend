import { useEffect, useState } from "react";
import SigninCard from "./SigninCard";
import { useSignin } from "@/Hooks/api/auth/useSignin";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const SigninContainer = ({}) => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [validationError, setValidationError] = useState(null);

  const { isPending, isSuccess, error, signinMutation } = useSignin();

  async function onSignInFormSubmit(e) {
    e.preventDefault();

    if (!signinForm.email || !signinForm.password) {
      console.log("All fields are required");
      setValidationError({ message: "All fields are required" });
      return;
    }

    setValidationError(null);

    await signinMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  }

  useEffect(() => {
    if (error) {
      if (error.status === 403) {
        navigate("/auth/signin");
      }
    }
    if (isSuccess) {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  }, [isSuccess, navigate, error]);

  return (
    <>
      <SigninCard
        isPending={isPending}
        isSuccess={isSuccess}
        error={error}
        signinForm={signinForm}
        setSigninForm={setSigninForm}
        validationError={validationError}
        onSigninFormSubmit={onSignInFormSubmit}
      />
    </>
  );
};

export default SigninContainer;
