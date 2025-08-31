function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 border-b animate-pulse">
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <div className="flex-1">
        <div className="h-3 w-28 bg-gray-300 rounded mb-2" />
        <div className="h-3 w-16 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default UserCardSkeleton;
