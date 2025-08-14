import { UserCard } from "@/components/molecules/UserCard/UserCard";
import { useGetAllUser } from "@/Hooks/api/user/useGetAllUser";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = ({}) => {
  const socket = useSelector((state) => state.socket.instance);
  setTimeout(() => {
    console.log("Connection has been built: ", socket);
  }, 3000);

  const { usersData } = useGetAllUser();
  return (
    <>
      <div className="bg-imagegram-bg h-[100vh] w-auto flex items-center justify-center text-2xl">
        <div className="w-[468px] h-[50vh] p-4 flex flex-col bg-imagegram-accent gap-2 overflow-auto">
          {usersData?.data?.map((user) => {
            return (
              <Link to={`/${user?._id}`}>
                <UserCard
                  key={user?._id}
                  userId={user?._id}
                  username={user?.username}
                  profilePicture={user?.profilePicture}
                  name={user?.name}
                  position={"vertical"}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
