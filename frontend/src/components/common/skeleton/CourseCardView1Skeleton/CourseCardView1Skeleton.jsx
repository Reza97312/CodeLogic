import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CourseCardView1Skeleton = () => {
  return (
    <div className="flex flex-col flex-shrink-0 items-center w-[240px] rounded-xl relative sm:w-[350px] sm:rounded-[20px]">
      <div className="w-full h-[160px] sm:h-[259px]">
        <Skeleton height="100%" className="rounded-t-xl sm:rounded-t-[20px]" />
      </div>

      <div className="flex flex-col justify-between w-full mb-[-16px] p-4 bg-[#FFFFFF] rounded-xl transform -translate-y-4 dark:bg-[#606060] sm:h-[217px] sm:rounded-[20px] shadow-sm">
        <div className="flex flex-col gap-2">
          <Skeleton height={24} width="70%" />

          <Skeleton count={2} height={15} />
        </div>

        <div>
          <div className="flex flex-col justify-between gap-2 mt-4">
            <div className="flex gap-2">
              <Skeleton width={80} height={15} />
              <Skeleton width={100} height={15} />
            </div>

            <div className="flex justify-between mt-2">
              <div className="flex items-center gap-1">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={60} height={15} />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton circle width={20} height={20} />
                <Skeleton width={60} height={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardView1Skeleton;
