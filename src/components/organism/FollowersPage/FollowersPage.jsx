import UserCard from "@/components/molecules/UserCard/UserCard";
import { useGetFollowers } from "@/Hooks/follow/useGetFollowers";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const FollowersPage = ({ isModal, onClose }) => {
  const { userId } = useParams();
  const { isSuccess, isPending, FollowerList } = useGetFollowers(userId);

  useEffect(() => {
    if (isSuccess) {
      console.log("followerList", FollowerList);
    }
  }, [isSuccess, FollowerList]);

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
        <h2 className="text-lg font-semibold">Followers</h2>
        {isModal && (
          <button
            onClick={onClose}
            className="text-sm text-red-500 hover:underline cursor-pointer"
          >
            Close
          </button>
        )}
      </div>

      {FollowerList && FollowerList?.length === 0 ? (
        <h1 className="p-2 text-lg">
          You will see people who follows you here.
        </h1>
      ) : (
        <ul className="mt-4 space-y-2">
          {FollowerList?.filter(
            (user) => userId !== user?.followerUser?._id
          ).map((user) => (
            <li key={user?.followerUser?._id} className="p-2 border rounded-lg">
              <UserCard
                username={user?.followerUser?.username}
                profilePicture={user?.followerUser?.profilePicture}
                userId={user?.followerUser?._id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowersPage;
