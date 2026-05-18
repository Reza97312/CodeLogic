import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CourseListSkeleton = () => {
  return (
    <div className="flex flex-col items-center w-full dark:bg-[#1E1E1E]">
      <div className="flex gap-1 pt-10 font-regular text-sm">
        <Skeleton width={80} height={14} />
        <Skeleton width={10} height={14} />
        <Skeleton width={100} height={14} />
      </div>

      <div className="flex flex-col items-center gap-2 pt-4 md:flex md:flex-row">
        <Skeleton width={200} height={32} />
        <Skeleton width={100} height={16} />
      </div>

      <div className="flex flex-col items-center gap-4 w-full pt-8 px-10 md:flex md:flex-row md:items-start md:gap-8">
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <Skeleton height={50} className="rounded-xl" />

          <Skeleton height={150} className="rounded-xl" />

          <Skeleton height={200} className="rounded-xl" />

          <Skeleton height={100} className="rounded-xl" />
        </div>

        <div className="w-full md:w-3/4 h-[500px] flex flex-col gap-4"></div>
      </div>
    </div>
  );
};

export default CourseListSkeleton;
