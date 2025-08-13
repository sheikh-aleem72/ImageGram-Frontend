import { Button } from "@/components/ui/button";
import { MODAL_KEYS } from "@/constants/modalKeys";
import { openModal } from "@/features/slices/modalSlice";
import { useGetUserDetails } from "@/Hooks/api/user/useGetUserDetails";
import {
  BookmarkIcon,
  CameraIcon,
  GridIcon,
  Loader2,
  PlusIcon,
  SquareUserIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useParams } from "react-router-dom";

export const ProfileLayout = () => {
  const { userId } = useParams();

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state?.auth?.user.id);

  const isCurrentUser = currentUser == userId;

  const { isFetching, isSuccess, error, userDetails } =
    useGetUserDetails(userId);

  // Implement private account logic
  /**
   * If the account of target user is public then show the profile
   * If the account is Private then,
   * Fetch following list of current user
   * Check if the current user follows target user
   * If true, then show profile to current user
   * Else, show account is private
   */

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:mt-0 mt-14">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-12">
        {/* Profile Image */}
        <button
          className="cursor-pointer"
          onClick={() => {
            if (currentUser) {
              dispatch(
                openModal({ modalName: MODAL_KEYS.CHANGE_PROFILE_PICTURE })
              );
            }
          }}
        >
          <div className="flex justify-center md:justify-start">
            {isSuccess ? (
              <img
                src={userDetails?.profilePicture}
                alt="Profile"
                loading="lazy"
                className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border border-gray-300 flex items-center justify-center">
                <Loader2 className="size-10 animate-spin" />
              </div>
            )}
          </div>
        </button>

        {/* Profile Info */}
        <div className="flex-1 mt-4 md:mt-0 px-2">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h2 className="text-xl md:text-2xl font-semibold text-center">
              {userDetails?.username ? userDetails?.username : "username"}
            </h2>
            <div className="md:flex gap-4 md:justify-normal justify-center hidden">
              <Button className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-1 text-sm cursor-pointer">
                Edit profile
              </Button>
              <Button className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-1 text-sm cursor-pointer">
                View archive
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-4">
            <div className="flex md:flex-row md:gap-4 flex-col justify-center items-center">
              <span className="font-semibold md:text-[1.5rem]">0</span>
              <p className=" text-[1.2rem]">Posts</p>
            </div>
            <div className="flex md:flex-row md:gap-4 flex-col justify-center items-center">
              <span className="font-semibold md:text-[1.5rem]">0</span>
              <button className="cursor-pointer text-[1.2rem]">
                Followers
              </button>
            </div>
            <div className="flex md:flex-row md:gap-4 flex-col justify-center items-center">
              <span className="font-semibold md:text-[1.5rem]">0</span>
              <button className="cursor-pointer text-[1.2rem]">
                Following
              </button>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            <p className="font-semibold">{userDetails?.name}</p>
            <p className="font-semibold">{userDetails?.bio}</p>

            <a href="" className="text-blue-500 hover:underline">
              {userDetails?.links}
            </a>
          </div>

          <div className="mt-4">
            <div className="flex gap-4 md:hidden">
              <Button className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-1 text-sm">
                Edit profile
              </Button>
              <Button className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-1 text-sm">
                View archive
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Highlights */}
        <div className="flex gap-6 mt-10 overflow-x-auto scrollbar-hide">
          <div className="flex flex-col items-center  ">
            <span className="text-imagegram-subtext flex justify-center items-center text-5xl bg-imagegram-bg w-15 h-15 border-2 rounded-full">
              <PlusIcon />
            </span>
            <p className="text-sm mt-1 truncate">new</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b-2 border-gray-300 mt-8 flex justify-center gap-10 md:gap-40 uppercase text-sm font-semibold text-gray-500">
          <button className="py-3 cursor-pointer">
            <NavLink to={`/${userId}`} end>
              <GridIcon className="md:w-10 md: h-6 w-6" />
            </NavLink>
          </button>
          <button className="py-3 cursor-pointer">
            <NavLink to={`/${userId}/bookmark`}>
              <BookmarkIcon className="md:w-10 md: h-6 w-6" />
            </NavLink>
          </button>
          <button className="py-3 cursor-pointer">
            <NavLink to={`/${userId}/tagged`}>
              <SquareUserIcon className="md:w-10 md: h- w-6" />
            </NavLink>
          </button>
        </div>

        <div className="h-[60vh] flex justify-center items-center flex-col gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
