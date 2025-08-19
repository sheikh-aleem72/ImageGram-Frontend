import FollowButton from "@/components/atoms/FollowButton/FollowButton";
import { Link } from "react-router-dom";

const UserCard = ({
  position = "horizontal", // default
  username,
  name,
  profilePicture,
  userId,
}) => {
  if (position === "vertical") {
    // 🔹 Vertical card (like grid view on Instagram)
    return (
      <div className="flex flex-col items-center gap-2 p-3 rounded-md bg-white w-[150px]">
        <Link to={`/${userId}`} className="flex flex-col items-center gap-2">
          <img
            src={profilePicture}
            alt={`${username}'s profile`}
            className="rounded-full w-[70px] h-[70px] object-cover"
          />
          <div className="text-center">
            <p className="text-imagegram-text font-semibold text-base">
              {username}
            </p>
          </div>
        </Link>
        <FollowButton userId={userId} />
      </div>
    );
  }

  // 🔹 Horizontal card (default, like your current one)
  return (
    <Link to={`/${userId}`}>
      <div className="flex justify-between items-center bg-imagegram-bg p-2 cursor-pointer rounded-sm">
        <div className="flex items-start gap-2">
          <img
            src={profilePicture}
            alt={`${username}'s profile`}
            className="rounded-full w-[50px] h-[50px] object-cover"
          />
          <div className="flex flex-col">
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
    </Link>
  );
};

export default UserCard;
