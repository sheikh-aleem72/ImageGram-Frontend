import CommentCard from "@/components/molecules/CommentCard/CommentCard";
import CommentPageSkeleton from "@/components/molecules/CommentPageSkeleton/CommentPageSkeleton";
import { useCreateComment } from "@/Hooks/comment/useCreateComment";
import { useGetAllParentComment } from "@/Hooks/comment/useGetAllParentComment";
import { useGetRepliesOfComment } from "@/Hooks/comment/useGetRepliesOfComment";
import { useAddLike } from "@/Hooks/like/useAddLike";
import { useRemoveLike } from "@/Hooks/like/useRemoveLike";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function CommentPage() {
  const { postId } = useParams(); // Get postId from URL
  const profilePicture = useSelector(
    (state) => state?.auth?.user?.profilePicture
  );
  const navigate = useNavigate();

  // Local states for comment input and reply handling
  const [comment, setComment] = useState(""); // comment box input
  const [commentId, setCommentId] = useState(null); // currently selected comment for viewing replies
  const [replyTo, setReplyTo] = useState(null); // parent comment id when replying
  const [replyToUser, setReplyToUser] = useState(null); // username of comment being replied to
  const [expandedReplies, setExpandedReplies] = useState({});

  // Hook to create new comment/reply
  const { createCommentMutation } = useCreateComment();

  // Hook to create like
  const { addLikeMutation } = useAddLike();
  // Hook to remove like
  const { removeLikeMutation } = useRemoveLike();

  // Fetch all parent-level comments of this post
  const { data: commentList, isPending } = useGetAllParentComment(postId);

  // Fetch replies of the corresponding comment
  const { data: repliesList, refetch } = useGetRepliesOfComment(commentId);

  // Handle posting a new comment or reply
  async function handleComment() {
    await createCommentMutation({
      content: comment,
      postId: postId,
      parentCommentId: replyTo || null, // null → it's a top-level comment
    });

    // Reset input and reply state after posting
    setComment("");
    setReplyTo(null);
    setReplyToUser(null);
  }

  // Trigger reply mode for a comment
  function handleReply(commentId, username) {
    setReplyTo(commentId);
    setReplyToUser(username);
  }

  // When user wants to view replies of a comment
  async function onViewReplies(comment_Id) {
    setCommentId(comment_Id); // this sets state
    const { data } = await refetch(); // this will automatically use ["replies", commentId]
    setExpandedReplies((prev) => ({
      ...prev,
      [comment_Id]: data,
    }));
  }

  async function onLike(commentId, isLiked) {
    if (isLiked) {
      await removeLikeMutation({
        type: "comment",
        targetId: commentId,
        postId,
      });
    } else {
      await addLikeMutation({
        type: "comment",
        targetId: commentId,
        postId,
      });
    }
  }

  if (isPending) {
    return <CommentPageSkeleton />;
  }

  return (
    <div className="flex flex-col h-screen w-full md:w-[100vh] md:mx-auto justify-center bg-white pb-15">
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between p-3 fixed top-0 w-full md:w-[100vh] border-b bg-white z-10">
        <ChevronLeftIcon
          className="w-7 h-7 cursor-pointer"
          onClick={() => navigate(-1)} // navigate back
        />
        <p className="text-imagegram-text font-semibold text-lg">Comments</p>
        <div className="w-7 h-7" /> {/* Spacer for layout balance */}
      </div>

      {/* ---------- Comments List ---------- */}
      <div className="flex-1 overflow-y-auto mt-15 px-3 flex flex-col gap-2 pb-20 ">
        {commentList?.length > 0 &&
          commentList.map((comment) => (
            <div key={comment._id}>
              <CommentCard
                profilePicture={comment?.author?.profilePicture}
                username={comment?.author?.username}
                content={comment?.content}
                time={comment?.createdAt}
                commentId={comment?._id}
                onReply={handleReply}
                like={comment?.likeCount}
                isLiked={comment?.isLiked}
                onLike={onLike}
              />

              {/* Replies section lives here, not inside CommentCard */}
              {expandedReplies[comment._id]
                ? expandedReplies[comment._id].map((reply) => (
                    <div className="ml-12" key={reply._id}>
                      <CommentCard
                        profilePicture={reply?.author?.profilePicture}
                        username={reply?.author?.username}
                        content={reply?.content}
                        time={reply?.createdAt}
                        commentId={reply?._id}
                        onReply={handleReply}
                        parentUsername={reply?.parentComment?.author?.username}
                        like={reply?.likeCount}
                        isLiked={reply?.isLiked}
                        onLike={onLike}
                      />
                    </div>
                  ))
                : comment.replyCount > 0 && (
                    <button
                      className="text-sm text-gray-500 ml-12 cursor-pointer"
                      onClick={() => onViewReplies(comment._id)}
                    >
                      ── View all replies
                    </button>
                  )}
            </div>
          ))}
      </div>

      {/* ---------- Comment Input Box ---------- */}
      <div className="bottom-12 md:bottom-0 w-full bg-white border-t p-2 flex items-center space-x-2 relative pt-6">
        {/* User Profile */}
        <img
          src={profilePicture}
          alt="profile"
          className="w-9 h-9 rounded-full"
        />

        <div className="flex-1 relative">
          {/* Reply Indicator (when replying to someone) */}
          {replyTo && (
            <div className="absolute -top-6 left-2 text-sm text-gray-500 flex items-center">
              Replying to{" "}
              <span className="ml-1 font-medium">@{replyToUser}</span>
              <button
                className="ml-2 text-red-400 text-xs"
                onClick={() => {
                  setReplyTo(null);
                  setReplyToUser(null); // cancel reply mode
                }}
              >
                <XIcon />
              </button>
            </div>
          )}

          {/* Comment Input */}
          <textarea
            rows={1}
            className="w-full resize-none rounded-xl border p-2 text-sm outline-none focus:ring-1 focus:ring-gray-300 max-h-24"
            placeholder={
              replyTo ? `Reply to @${replyToUser}...` : "Add a comment..."
            }
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Post Button */}
        <button
          type="submit"
          disabled={!comment.trim()}
          className={`text-blue-500 text-sm font-semibold cursor-pointer ${
            !comment.trim() && "opacity-50"
          }`}
          onClick={handleComment}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CommentPage;
