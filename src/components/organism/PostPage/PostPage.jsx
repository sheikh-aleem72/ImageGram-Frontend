import { useGetPost } from "@/Hooks/post/useGetPost";
import { XIcon, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import { useSelector } from "react-redux";
import PostMenu from "../PostMenu/PostMenu";
import { useRemoveLike } from "@/Hooks/like/useRemoveLike";
import { useAddLike } from "@/Hooks/like/useAddLike";

function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state?.auth?.user?.id);

  const { data: post } = useGetPost(postId);
  const { removeLikeMutation } = useRemoveLike();
  const { addLikeMutation } = useAddLike();

  const isAuthor = currentUserId === post?.author?._id;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!post) return null;

  const timeAgo = (() => {
    const now = Date.now();
    const createdAt = new Date(post?.createdAt).getTime();
    const diffMs = now - createdAt;
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d ago`;
  })();

  async function handleLike() {
    if (post?.isLiked) {
      const response = await removeLikeMutation({
        type: "post",
        targetId: postId,
      });
      console.log("like removed: ", response);
    } else {
      const response = await addLikeMutation({
        type: "post",
        targetId: postId,
      });
      console.log("post liked: ", response);
    }
  }

  // ---------- Mobile Layout ----------
  const MobileLayout = () => (
    <div className=" pb-16">
      <PostCard postId={postId} />
    </div>
  );

  // ---------- Desktop Layout ----------
  const DesktopLayout = () => (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 md:ml-[70px]">
      <div className="bg-white shadow-xl w-[90%] h-[90%] relative flex rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10 cursor-pointer"
        >
          <XIcon className="w-6 h-6" />
        </button>

        {/* Left: Image */}
        <div
          className="flex-1 bg-black flex items-center justify-center"
          onDoubleClick={handleLike}
        >
          <img
            src={post?.imageUrls?.[0]}
            alt="Post"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Right: Post Details */}
        <div className="flex-1 flex flex-col p-4">
          {/* Header */}
          <div className="flex  border-b pb-3 justify-between items-center">
            <div className="flex items-center gap-3 ">
              <img
                src={post?.author?.profilePicture}
                alt={post?.author?.username}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{post?.author?.username}</span>
            </div>
            <div className="mr-15">
              <PostMenu isAuthor={isAuthor} />
            </div>
          </div>

          {/* Caption */}
          <div className="flex-1 overflow-y-auto py-3">
            <p className="text-gray-800 flex gap-2 items-center">
              <img
                src={post?.author?.profilePicture}
                className="w-7 h-7 rounded-full"
              />
              <span className="font-semibold">{post?.author?.username}</span>
              {post?.caption}
            </p>
          </div>

          {/* Actions */}
          <div className="border-t pt-3 flex items-center gap-4">
            <button onClick={handleLike}>
              <Heart
                className={`w-6 h-6 cursor-pointer hover:scale-110 transition ${
                  post?.isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-imagegram-text fill-transparent"
                }`}
              />
            </button>
            <button>
              <MessageCircle className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            </button>
            <button>
              <Share2 className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            </button>{" "}
          </div>

          {/* Meta Info */}
          <span className="text-md text-imagegram-text mt-2 font-semibold">
            {post?.likeCount || 0} likes
          </span>
          <span className="text-xs text-gray-400">{timeAgo}</span>

          <div className="items-center mt-2 justify-between md:flex hidden">
            <input type="text" placeholder="Add a comment" />
            <button className="text-imagegram-accent font-semibold">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

export default PostPage;
