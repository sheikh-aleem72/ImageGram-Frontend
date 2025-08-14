import { FollowButton } from "@/components/atoms/FollowButton/FollowButton";
import { Button } from "@/components/ui/button";

export const UserCard = ({
  position,
  username,
  name,
  profilePicture,
  userId,
}) => {
  return (
    <>
      <div
        className={`flex justify-between items-center bg-imagegram-bg p-2 cursor-pointer rounded-sm`}
      >
        <div className={`flex items-start gap-2`}>
          <img
            src={profilePicture}
            className={`rounded-full w-[50px] h-[50px]`}
          />
          <div className="flex flex-col ">
            <p className="text-imagegram-text font-semibold text-xl">
              {username}
            </p>
            <p className="text-imagegram-subtext font-semibold text-sm">
              {name}
            </p>
          </div>
        </div>

        <FollowButton userId={userId} />
      </div>
    </>
  );
};
