import { useGetPost } from "@/Hooks/post/useGetPost";
import { ChevronLeftIcon, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useRef, useState } from "react";
import PostMenu from "../PostMenu/PostMenu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDeletePost } from "@/Hooks/post/useDeletePost";
import { useRemoveLike } from "@/Hooks/like/useRemoveLike";
import { useAddLike } from "@/Hooks/like/useAddLike";
import PostCardSkeleton from "@/components/molecules/PostCardSkeleton/PostCardSkeleton";

function PostCard({ postId }) {
  const currentUser = useSelector((state) => state?.auth?.user?.id);
  const navigate = useNavigate();
  const [showFullCaption, setShowFullCaption] = useState(false);

  const { data: post, isPending } = useGetPost(postId);
  const { deletePostMutation } = useDeletePost();
  const { removeLikeMutation } = useRemoveLike();
  const { addLikeMutation } = useAddLike();

  const isAuthor = currentUser === post?.author?._id;

  const timeAgo = (() => {
    const now = Date.now();
    const createdAt = new Date(post?.createdAt).getTime();
    const diffSec = Math.floor((now - createdAt) / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return `${Math.floor(diffHr / 24)}d ago`;
  })();

  async function onDelete() {
    if (!postId) return;
    await deletePostMutation(postId);
    navigate(-1);
  }

  async function onCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
  }

  async function handleLike() {
    if (post?.isLiked) {
      await removeLikeMutation({ type: "post", targetId: postId });
    } else {
      await addLikeMutation({ type: "post", targetId: postId });
    }
  }

  if (isPending) {
    return <PostCardSkeleton />;
  }

  return (
    <div className="flex flex-col md:max-w-[600px] w-full bg-white shadow-sm border">
      {/* User Info */}
      <div className="flex border-b pb-3 justify-between items-center px-2 pt-2">
        <div className="flex items-center gap-3">
          <img
            src={post?.author?.profilePicture}
            alt={post?.author?.username}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold text-[1.4rem]">
            {post?.author?.username}
          </span>
        </div>
        <PostMenu
          isAuthor={isAuthor}
          onDelete={onDelete}
          onCopyLink={onCopyLink}
        />
      </div>

      {/* Image */}
      <div
        className="flex items-center justify-center bg-black"
        onDoubleClick={handleLike}
      >
        <img
          src={post?.imageUrls?.[0]}
          alt="Post"
          className="max-h-[600px] w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Footer */}
      <div className="p-3 border-t">
        <div className="flex items-center gap-4 mb-2">
          <button onClick={handleLike}>
            <Heart
              className={`w-7 h-7 cursor-pointer hover:scale-110 transition ${
                post?.isLiked
                  ? "text-red-500 fill-red-500"
                  : "text-imagegram-text fill-transparent"
              }`}
            />
          </button>
          <button onClick={() => navigate(`/post/${postId}/comments`)}>
            <MessageCircle className="w-7 h-7 cursor-pointer hover:scale-110 transition" />
          </button>
          <button>
            <Share2 className="w-7 h-7 cursor-pointer hover:scale-110 transition" />
          </button>
        </div>

        {/* Meta Info */}
        <span className="text-[1.5rem] font-semibold text-imagegram-text mt-1 block">
          {post?.likeCount || 0} likes
        </span>
        {/* Caption */}
        <p className="text-gray-800 text-[1.3rem]">
          <span className="font-semibold">{post?.author?.username} </span>
          <span
            className={`${
              showFullCaption ? "line-clamp-none" : "line-clamp-2"
            } break-words`}
          >
            {post?.caption}
          </span>
          {post?.caption?.length > 100 && !showFullCaption ? (
            <button
              className=" text-gray-500 hover:text-gray-700 text-[1.2rem] cursor-pointer"
              onClick={() => setShowFullCaption(true)}
            >
              more
            </button>
          ) : (
            <button
              className=" text-gray-500 hover:text-gray-700 text-[1.2rem] cursor-pointer"
              onClick={() => setShowFullCaption(false)}
            >
              hide
            </button>
          )}
        </p>

        <p
          className="text-[1.3rem] text-imagegram-subtext cursor-pointer hover:text-imagegram-text"
          onClick={() => navigate(`/post/${postId}/comments`)}
        >
          view all {post?.commentCount} comments
        </p>
        <span className="text-[1rem] text-imagegram-subtext">{timeAgo}</span>
      </div>
    </div>
  );
}

export default PostCard;
