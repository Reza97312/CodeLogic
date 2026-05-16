import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const TeacherSkeleton = () => {
  return (
    <div
      className="flex flex-col flex-shrink-0 items-center w-[210px] md:w-[180px] lg:w-[250px] xl:w-[300px] 2xl:w-[350px] h-[346px] md:h-[300px] p-4 bg-[#dddd] rounded-[20px] md:basis-[calc(25%-1rem)]  dark:bg-[#606060]
        hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <Skeleton height={110} width={110} borderRadius="100%" />
      <Skeleton height={24} width="70%" />
      <Skeleton height={16} width="50%" />
      <div className="flex justify-around w-full pt-4">
        <Skeleton height={40} width={70} />
        <Skeleton height={40} width={70} />
      </div>
    </div>
  );
};

export default TeacherSkeleton;
