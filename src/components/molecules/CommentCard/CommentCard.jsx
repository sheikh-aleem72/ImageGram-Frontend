import { HeartIcon } from "lucide-react";
import React from "react";

function CommentCard({
  profilePicture,
  username,
  content,
  time,
  commentId,
  onReply,
  parentUsername,
}) {
  const timeAgo = (() => {
    const now = Date.now();
    const createdAt = new Date(time).getTime();
    const diffSec = Math.floor((now - createdAt) / 1000);
    if (diffSec < 60) return `${diffSec}s`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h`;
    return `${Math.floor(diffHr / 24)}d`;
  })();

  return (
    <div className="flex items-start space-x-3 mb-4">
      <img src={profilePicture} alt="user" className="w-10 h-10 rounded-full" />
      <div className="flex-1 flex flex-col">
        <span className="text-sm">
          <span className="font-semibold mr-2">{username}</span>
          {parentUsername && (
            <span className="font-semibold mr-2">@{parentUsername}</span>
          )}
          {content}
        </span>
        <div className="flex mt-1 gap-4">
          <span className="text-sm text-gray-500 ">{timeAgo}</span>
          <span className="text-sm text-gray-500 ">like</span>
          <span
            className="text-sm text-gray-500"
            onClick={() => onReply(commentId, username)}
          >
            Reply
          </span>
        </div>
      </div>
      <HeartIcon className="w-4 h-4 text-imagegram-subtext" />
    </div>
  );
}

export default CommentCard;
