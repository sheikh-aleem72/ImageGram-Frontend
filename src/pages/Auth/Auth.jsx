import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Layout for auth related pages
const Auth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let userObject = localStorage.getItem("user");
    if (userObject) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <div className="h-[100vh] w-full flex items-center justify-center bg-imagegram-bg">
        {children}
      </div>
    </>
  );
};

export default Auth;
