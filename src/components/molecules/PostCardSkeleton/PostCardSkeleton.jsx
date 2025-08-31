import React from "react";

function PostCardSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-[470px] bg-white shadow-sm border animate-pulse">
      {/* User Info */}
      <div className="flex border-b pb-3 justify-between items-center px-2 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-300" />
          <div className="h-3 w-24 bg-gray-300 rounded" />
        </div>
        <div className="h-3 w-5 bg-gray-300 rounded" />
      </div>

      {/* Image */}
      <div className="flex items-center justify-center bg-gray-300 h-[400px]" />

      {/* Footer */}
      <div className="p-3 border-t space-y-2">
        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-6 bg-gray-300 rounded" />
        </div>

        {/* Likes */}
        <div className="h-3 w-16 bg-gray-300 rounded" />

        {/* Caption */}
        <div className="flex gap-2">
          <div className="h-3 w-14 bg-gray-300 rounded" />
          <div className="h-3 w-40 bg-gray-300 rounded" />
        </div>

        {/* Comments */}
        <div className="h-3 w-28 bg-gray-300 rounded" />

        {/* Time Ago */}
        <div className="h-3 w-12 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default PostCardSkeleton;
