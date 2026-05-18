import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const TeachersSkeleton = () => {
  return (
    <div
      className="flex flex-col flex-shrink-0 items-center w-[350px] h-[346px] p-4 bg-[#dddd] rounded-[20px] md:basis-[calc(25%-1rem)]  dark:bg-[#606060]
    hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <Skeleton height={183} width={313} borderRadius={20} />
      <Skeleton height={24} width="70%" />
      <Skeleton height={16} width="50%" />
      <div className="flex justify-around w-full pt-4">
        <Skeleton height={40} width={98} />
        <Skeleton height={40} width={98} />
      </div>
    </div>
  );
};

export default TeachersSkeleton;
