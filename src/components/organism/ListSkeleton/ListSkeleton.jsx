import Skeleton from "@/components/ui/Skeleton";
import React from "react";

function ListSkeleton({ className }) {
  return (
    <>
      <div className={`p-4 space-y-4 ${className}`}>
        <Skeleton className="w-20 h-4  mb-5 rounded-md" />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className=" space-y-2">
              <Skeleton className="h-3 w-[200px]" />
            </div>
            <Skeleton className={"h-10 w-10"} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ListSkeleton;
