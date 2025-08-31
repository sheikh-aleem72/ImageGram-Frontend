import { useGetPost } from "@/Hooks/post/useGetPost";
import { XIcon, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import { useSelector } from "react-redux";
import PostMenu from "../PostMenu/PostMenu";
import { useRemoveLike } from "@/Hooks/like/useRemoveLike";
import { useAddLike } from "@/Hooks/like/useAddLike";
import { useDeletePost } from "@/Hooks/post/useDeletePost";
import { Input } from "@/components/ui/input";
import { useCreateComment } from "@/Hooks/comment/useCreateComment";
import CommentPage from "../CommentPage/CommentPage";

function PostPage() {
  const { postId } = useParams();
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  const commentRef = useRef(null);

  const currentUserId = useSelector((state) => state?.auth?.user?.id);

  const { data: post } = useGetPost(postId);
  const { removeLikeMutation } = useRemoveLike();
  const { addLikeMutation } = useAddLike();
  const { deletePostMutation } = useDeletePost();
  const { isSuccess, isPending, error, createCommentMutation } =
    useCreateComment();

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
    } else {
      const response = await addLikeMutation({
        type: "post",
        targetId: postId,
      });
    }
  }

  function handleCommentRef() {
    commentRef?.current?.focus();
  }

  async function onDelete() {
    await deletePostMutation(postId);
    navigate(-1);
  }

  async function onCopyLink() {
    await navigator.clipboard.writeText(window.location.href);
  }

  async function handlePostComment() {
    if (comment.trim() === "") return;
    await createCommentMutation({ postId, comment });
    setComment("");
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
              <PostMenu
                isAuthor={isAuthor}
                onDelete={onDelete}
                onCopyLink={onCopyLink}
              />
            </div>
          </div>

          {/* Caption */}
          <div className="flex-1 overflow-y-auto py-3 overflow-auto">
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
            <button onClick={handleLike} type="button">
              <Heart
                className={`w-6 h-6 cursor-pointer hover:scale-110 transition ${
                  post?.isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-imagegram-text fill-transparent"
                }`}
              />
            </button>
            <button
              type="button"
              onClick={() => navigate(`/post/${postId}/comments`)}
            >
              <MessageCircle className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            </button>
            <button type="button">
              <Share2 className="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            </button>{" "}
          </div>

          {/* Meta Info */}
          <span className="text-md text-imagegram-text mt-2 font-semibold">
            {post?.likeCount || 0} likes
          </span>
          <span className="text-xs text-gray-400">{timeAgo}</span>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

export default PostPage;
