import { useSelector } from "react-redux";

export const Home = ({}) => {
  const socket = useSelector((state) => state.socket.instance);
  setTimeout(() => {
    console.log("Connection has been built: ", socket);
  }, 3000);
  return (
    <>
      <div className="bg-imagegram-bg h-screen w-auto flex items-center justify-center text-2xl">
        Hey, Welcome Home!
      </div>
    </>
  );
};
