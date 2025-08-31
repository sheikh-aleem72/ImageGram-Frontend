import React from "react";

function CommentPageSkeleton() {
  return (
    <div className="flex flex-col w-full max-w-[470px] mx-auto bg-white shadow-sm border animate-pulse">
      {/* Comments */}
      <div className="flex flex-col p-3 space-y-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-28 bg-gray-300 rounded" />
              <div className="h-3 w-48 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 p-3 border-t">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <div className="flex-1 h-8 bg-gray-300 rounded" />
        <div className="h-3 w-8 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default CommentPageSkeleton;
