import { CameraIcon } from "lucide-react";

const GridTab = ({ userId }) => {
  let posts = [];

  return (
    <>
      {posts.length == 0 ? (
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
            <a href="" className="hover:underline text-blue-700 font-semibold">
              Share your first photo
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 mt-4">
          {posts?.map((post, idx) => (
            <img
              key={idx}
              src={post}
              alt={`Post ${idx}`}
              className="w-full h-full object-cover aspect-square"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default GridTab;
