import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth/auth";
import { SignupContainer } from "./components/organism/auth/SignupContainer";
import { SigninContainer } from "./components/organism/auth/SigninContainer";
import { ProtectedRoute } from "./components/molecules/ProtectedRouter/ProtectedRoute";
import { Home } from "./pages/Home/Home";
import { Menubar } from "./components/organism/Menubar/Menubar";
import { Navbar } from "./components/organism/Navbar/Navbar";
import { Layout } from "./components/organism/Layout/Layout";

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
        <Route
          path="/auth/signin"
          element={
            <Auth>
              <SigninContainer />
            </Auth>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
