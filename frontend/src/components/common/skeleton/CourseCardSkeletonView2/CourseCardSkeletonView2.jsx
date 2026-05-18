import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CourseCardView2Skeleton = () => {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="hidden flex flex-shrink-0 gap-8 w-[640px] p-4 bg-[#FFFFFF] rounded-[20px] relative   dark:bg-[#606060]
        sm:flex sm:w-[520px] sm:h-[184px] 
        lg:w-[720px] lg:h-[208px]
        xl:w-[1044px] xl:h-[232px]">
        <Skeleton className="w-[304px] h-full rounded-xl
            sm:w-[304px]
            md:w-[320px]
            lg:w-[337px]" />
        <div className="flex flex-col justify-between w-full h-full 
            bg-[#FFFFFF] rounded-[20px] cursor-pointer   dark:bg-[#606060]">
          <div className="flex flex-col gap-1 text-[#1E1E1E]">
            <h2 className="font-bold text-base">
              <Skeleton width={240} height={24} />
            </h2>
            <p className="font-regular text-sm">
              <Skeleton width={320} height={18} />
              <Skeleton width={280} height={18} />
            </p>
          </div>
          <div>
            <div className="flex justify-between pt-8">
              <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
                <Skeleton width={16} height={16} />
                <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
                  <Skeleton width={90} height={16} />
                </span>
              </div>
              <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
                <Skeleton width={16} height={16} />
                <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
                  <Skeleton width={70} height={16} />
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
                    <Skeleton width={110} height={24} />
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

export default CourseCardView2Skeleton;