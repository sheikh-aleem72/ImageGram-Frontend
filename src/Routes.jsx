import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/Auth/auth";
import { SignupContainer } from "./components/organism/auth/SignupContainer";
import { SigninContainer } from "./components/organism/auth/SigninContainer";
import { ProtectedRoute } from "./components/molecules/ProtectedRouter/ProtectedRoute";
import { Home } from "./pages/Home/Home";
import { Layout } from "./components/organism/Layout/Layout";
import { ProfileLayout } from "./pages/Profile/Profile";
import BookmarkTab from "./components/organism/BookmarkTab/BookmarkTab";
import TagTab from "./components/organism/TagTab/TagTab";
import { GridTab } from "./components/organism/GridTab/GridTab";
import { EditProfile } from "./components/organism/EditProfile/EditProfile";
import NotFound from "./components/organism/NotFound/NotFound";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/auth/signin"} />} />
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

        <Route
          path="/:userId"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfileLayout />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<GridTab />} />
          <Route path="/:userId/bookmark" element={<BookmarkTab />} />
          <Route path="/:userId/tagged" element={<TagTab />} />
        </Route>

        <Route
          path="/:userId/accounts/edit"
          element={
            <ProtectedRoute>
              <Layout>
                <EditProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
