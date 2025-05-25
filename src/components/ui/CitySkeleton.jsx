import React from "react";
import { Skeleton } from "./skeleton";
function CitySkeleton() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </div>
  );
}

export default CitySkeleton;
