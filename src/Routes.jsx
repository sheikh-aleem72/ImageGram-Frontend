import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Layout from "./components/organism/Layout/Layout";
import ProtectedRoute from "./components/molecules/ProtectedRouter/ProtectedRoute";
import ListSkeleton from "./components/organism/ListSkeleton/ListSkeleton";

// ✅ Lazy load pages
const Auth = lazy(() => import("./pages/Auth/auth"));
const SignupContainer = lazy(() =>
  import("./components/organism/auth/SignupContainer")
);
const SigninContainer = lazy(() =>
  import("./components/organism/auth/SigninContainer")
);
const Home = lazy(() => import("./pages/Home/Home"));
const ProfileLayout = lazy(() => import("./pages/Profile/Profile"));
const BookmarkTab = lazy(() =>
  import("./components/organism/BookmarkTab/BookmarkTab")
);
const TagTab = lazy(() => import("./components/organism/TagTab/TagTab"));
const GridTab = lazy(() => import("./components/organism/GridTab/GridTab"));
const EditProfile = lazy(() =>
  import("./components/organism/EditProfile/EditProfile")
);
const NotFound = lazy(() => import("./components/organism/NotFound/NotFound"));
const FollowersPage = lazy(() =>
  import("./components/organism/FollowersPage/FollowersPage")
);
const FollowingPage = lazy(() =>
  import("./components/organism/FollowingPage/FollowingPage")
);
const ResponsiveModalRoute = lazy(() =>
  import("./components/organism/ResponsiveModalRoute/ResponsiveModalRoute")
);
const NotificationPage = lazy(() =>
  import("./pages/Notification/NotificationPage")
);

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center flex-col items-center h-screen">
          <Loader2 className="animate-spin" />
          Loading
        </div>
      }
    >
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/auth/signin" />} />

        {/* Auth routes */}
        <Route path="/auth">
          <Route
            path="signup"
            element={
              <Auth>
                <SignupContainer />
              </Auth>
            }
          />
          <Route
            path="signin"
            element={
              <Auth>
                <SigninContainer />
              </Auth>
            }
          />
        </Route>

        {/* Protected routes with Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Home */}
          <Route path="home" element={<Home />} />

          {/* Profile layout */}
          <Route path=":userId" element={<ProfileLayout />}>
            <Route index element={<GridTab />} />
            <Route path="bookmark" element={<BookmarkTab />} />
            <Route path="tagged" element={<TagTab />} />
          </Route>

          {/* Followers / Following — use responsive modal route */}
          <Route
            path=":userId/followers"
            element={<ResponsiveModalRoute element={FollowersPage} />}
          />
          <Route
            path=":userId/following"
            element={<ResponsiveModalRoute element={FollowingPage} />}
          />

          {/* Edit profile */}
          <Route path=":userId/accounts/edit" element={<EditProfile />} />

          {/* Notification - use responsive modal route */}
          <Route
            path="notifications"
            element={
              <Suspense
                fallback={
                  <ListSkeleton className={"md:ml-[70px] mt-[70px] md:mt-0"} />
                }
              >
                <NotificationPage />
              </Suspense>
            }
          />
          {/* Route for testing and adjusting components */}
          <Route path="/testing" element={<input />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
