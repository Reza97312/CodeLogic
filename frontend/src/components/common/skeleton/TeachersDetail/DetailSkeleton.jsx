import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const DetailSkeleton = () => {
  return (
    <div
      dir="rtl"
      className="flex flex-col flex-shrink-0 items-center w-[350px] md:basis-[calc(33.8%-1rem)] rounded-[20px] relative cursor-pointer bg-[#dddd] dark:bg-[#606060] hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
    >
      <Skeleton height={259} width="100%" borderRadius="20px 20px 0 0" />

      <div className="flex flex-col justify-between w-full h-[217px] p-4 rounded-[20px] transform -translate-y-4">
        <div className="flex flex-col gap-1">
          <Skeleton height={20} width="70%" />
          <Skeleton height={14} width="90%" count={2} />
        </div>

        <div>
          <div className="flex justify-between pt-8">
            <div className="flex items-center gap-2">
              <Skeleton circle height={20} width={20} />
              <Skeleton height={12} width={80} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton circle height={20} width={20} />
              <Skeleton height={12} width={80} />
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <div className="flex flex-col justify-end gap-1">
              <Skeleton height={12} width={40} />
              <Skeleton height={18} width={90} />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton height={16} width={20} />
              <Skeleton circle height={20} width={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[12px] right-[11px]">
        <Skeleton circle height={40} width={40} />
      </div>
    </div>
  );
};

export default DetailSkeleton;
