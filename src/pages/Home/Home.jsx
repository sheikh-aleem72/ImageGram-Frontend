import UserCard from "@/components/molecules/UserCard/UserCard";
import { useGetAllUser } from "@/Hooks/api/user/useGetAllUser";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = ({}) => {
  const socket = useSelector((state) => state.socket.instance);
  const currentUserId = useSelector((state) => state?.auth?.user?.id);
  setTimeout(() => {
    console.log("Connection has been built: ", socket);
  }, 3000);

  const { usersData } = useGetAllUser();
  return (
    <>
      <div className="bg-imagegram-bg h-[100vh] w-auto flex items-center justify-center text-2xl px-8">
        <div className="w-full h-auto p-4 flex gap-3 overflow-auto md:ml-20">
          {usersData?.data
            ?.filter((user) => {
              if (user?._id != currentUserId) {
                return user;
              }
            })
            .map((user) => {
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

export default Home;
