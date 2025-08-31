import React, { useRef, useCallback, useMemo } from "react";

import UserCard from "@/components/molecules/UserCard/UserCard";
import PostCard from "@/components/organism/PostCard/PostCard";

import { useGetAllUser } from "@/Hooks/api/user/useGetAllUser";
import { useGetFeed } from "@/Hooks/feed/useGetFeed";
import { useSelector } from "react-redux";

export default function Home() {
  const socket = useSelector((state) => state.socket.instance);
  const currentUserId = useSelector((state) => state?.auth?.user?.id);

  const { data: feed } = useGetFeed();
  const { usersData } = useGetAllUser();

  return (
    <div
      className="
        bg-imagegram-bg
        flex items-center justify-center
         text-2xl
        h-screen w-full
        md:h-auto md:min-h-screen md:w-[600px] md:mx-auto md:mt-10
      "
    >
      {feed?.length < 1 ? (
        <div className="w-full h-auto p-4 flex gap-3 overflow-auto md:ml-20">
          {usersData?.data
            ?.filter((user) => user?._id !== currentUserId)
            .map((user) => (
              <UserCard
                key={user?._1d}
                userId={user?._id}
                username={user?.username}
                profilePicture={user?.profilePicture}
                name={user?.name}
                position={"vertical"}
              />
            ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col ">
          {feed?.map((post) => {
            return <PostCard postId={post?._id} />;
          })}
        </div>
      )}
    </div>
  );
}
