import React from "react";

function ProfilePageSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto animate-pulse">
      {/* Header Section */}
      <div className="flex items-center gap-8 p-4">
        {/* Profile Picture */}
        <div className="w-24 h-24 rounded-full bg-gray-300" />

        {/* Stats + Info */}
        <div className="flex-1">
          {/* Username */}
          <div className="h-4 w-32 bg-gray-300 rounded mb-4" />

          {/* Stats */}
          <div className="flex gap-8 mb-4">
            <div className="h-3 w-12 bg-gray-300 rounded" />
            <div className="h-3 w-16 bg-gray-300 rounded" />
            <div className="h-3 w-20 bg-gray-300 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-gray-300 rounded" />
            <div className="h-8 w-24 bg-gray-300 rounded" />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-4 space-y-2 mb-6">
        <div className="h-3 w-40 bg-gray-300 rounded" />
        <div className="h-3 w-64 bg-gray-300 rounded" />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-full aspect-square bg-gray-300" />
        ))}
      </div>
    </div>
  );
}

export default ProfilePageSkeleton;
