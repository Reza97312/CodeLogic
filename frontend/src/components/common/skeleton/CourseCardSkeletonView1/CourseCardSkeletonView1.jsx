import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";



const CourseCardView1Skeleton = () => {

  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div dir="rtl" className="flex flex-col flex-shrink-0 items-center w-[240px] rounded-xl relative 
        hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        sm:w-[350px] sm:rounded-[20px]">
        <Skeleton className="w-full h-[160px] rounded-t-xl
            sm:h-[259px] sm:rounded-t-[20px]" />
        <div className="flex flex-col justify-between w-full mb-[-16px] 
            p-4 bg-[#FFFFFF] rounded-xl transform -translate-y-4 cursor-pointer   dark:bg-[#606060]
            sm:h-[217px] sm:rounded-[20px]">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-base   dark:text-[#EEEEEE]">
              <Skeleton width={180} height={24} />
            </h2>
            <p className="max-w-[317px] font-regular text-sm   dark:text-[#DDDDDD]">
              <Skeleton width={280} height={18} />
              <Skeleton width={200} height={18} />
            </p>
          </div>
          <div>
            <div className="flex justify-between pt-8">
              <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
                <Skeleton width={16} height={16} />
                <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
                  <Skeleton width={80} height={16} />
                </span>
              </div>
              <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
                <Skeleton width={16} height={16} />
                <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
                  <Skeleton width={60} height={16} />
                </span>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex flex-col justify-end gap-1">
                <span className="font-regular text-xs text-[#1E1E1E]   dark:text-[#EEEEEE]">
                  <Skeleton width={40} height={16} />
                </span>
                <div className="flex">
                  <span className="font-bold text-base text-[#008C78]">
                    <Skeleton width={100} height={24} />
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-regular text-sm text-[#F8BC24]">
                  <Skeleton width={30} height={20} />
                </span>
                <Skeleton width={16} height={16} />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 rounded-[50px] transition absolute top-[13px] right-[14px] cursor-pointer opacity-25">
          <Skeleton circle width={32} height={32} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CourseCardView1Skeleton;