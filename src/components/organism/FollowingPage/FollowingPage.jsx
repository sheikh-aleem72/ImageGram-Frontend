import UserCard from "@/components/molecules/UserCard/UserCard";
import { useGetFollowing } from "@/Hooks/follow/useGetFollowing";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const FollowingPage = ({ isModal, onClose }) => {
  const { userId } = useParams();
  const { isSuccess, isPending, FollowingList } = useGetFollowing(userId);

  if (isPending) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="text-lg font-semibold">Following</h2>
        {isModal && (
          <button
            onClick={onClose}
            className="text-sm text-red-500 hover:underline cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      {FollowingList && FollowingList?.length === 0 ? (
        <h1 className="p-2 text-lg">You will see people you follow here.</h1>
      ) : (
        <ul className="mt-4 space-y-2">
          {FollowingList?.filter(
            (user) => userId !== user?.followingUser?._id
          ).map((user) => (
            <li
              key={user?.followingUser?._id}
              className="p-2 border rounded-lg"
            >
              <UserCard
                username={user?.followingUser?.username}
                profilePicture={user?.followingUser?.profilePicture}
                userId={user?.followingUser?._id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowingPage;
