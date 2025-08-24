import { useGetPost } from "@/Hooks/post/useGetPost";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import React from "react";
import PostMenu from "../PostMenu/PostMenu";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function PostCard({ postId }) {
  const currentUser = useSelector((state) => state?.auth?.user?.id);
  const { data: post } = useGetPost(postId);
  const navigate = useNavigate();

  const isAuthor = currentUser === post?.author?._id;

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

  return (
    <div className="flex flex-col w-full bg-white mt-17">
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
        <PostMenu isAuthor={isAuthor} />
      </div>

      {/* Image */}
      <div className="flex-1 bg-black flex items-center justify-center">
        <img
          src={post?.imageUrls?.[0]}
          alt="Post"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Footer */}
      <div className="p-3 border-t">
        <div className="flex items-center gap-4 mb-2">
          <Heart className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
          <MessageCircle className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
          <Share2 className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
        </div>

        {/* Meta Info */}

        <span className="text-md text-imagegram-text mt-1 block">
          {post?.likeCount || 0} likes
        </span>
        <p className="text-gray-800 flex gap-2 items-center">
          <span className="font-semibold">{post?.author?.username}</span>
          {post?.caption}
        </p>

        <p className="text-md text-imagegram-subtext cursor-pointer hover:text-imagegram-text">
          view all {post?.commentCount} comments
        </p>

        <span className="text-xs text-imagegram-subtext">{timeAgo}</span>
      </div>
    </div>
  );
}

export default PostCard;
