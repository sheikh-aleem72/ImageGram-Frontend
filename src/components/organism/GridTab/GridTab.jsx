import { useGetAllPostOfUser } from "@/Hooks/post/useGetAllPostOfUser";
import { CameraIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const GridTab = ({}) => {
  const { userId } = useParams();
  const { data: posts } = useGetAllPostOfUser(userId);
  console.log("posts: ", posts);

  return (
    <>
      <div className="">
        {posts?.length == 0 ? (
          <div className="h-[60vh] flex justify-center items-center flex-col gap-4">
            <div className="rounded-full border-2 p-4 border-imagegram-text">
              <CameraIcon className="md:w-10 md:h-10 h-6 w-6" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Share Photos</h1>
            </div>
            <div>
              <p className="text-center">
                When you share photos, they will appear on your profile.
              </p>
            </div>
            <div className="">
              <Link
                to={"/create-post"}
                className="hover:underline text-blue-700 font-semibold"
              >
                Share your first photo
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 p-4">
            {posts?.map((post, idx) => (
              <Link to={`/post/${post?._id}`}>
                <img
                  key={idx}
                  src={post?.imageUrls[0]}
                  alt={`Post ${idx}`}
                  className="w-full h-full object-cover aspect-square border-1 border-black/10"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GridTab;
