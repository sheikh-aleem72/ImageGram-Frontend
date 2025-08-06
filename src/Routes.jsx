import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth/auth";
import { SignupContainer } from "./components/organism/auth/SignupContainer";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/auth/signup"} />} />
        <Route
          path="/auth/signup"
          element={
            <Auth>
              <SignupContainer />
            </Auth>
          }
        />
      </Routes>
    </>
  );
};
