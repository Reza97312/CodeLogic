import React from "react";
import Skeleton from "react-loading-skeleton";

const CoursesPaymentsSkeleton = () => {
  return (
    <>
      <div
        className="hidden md:flex items-center py-5 border-b border-[#EAEAEA] w-full bg-white dark:bg-[#454545] dark:text-white rounded-t-4xl text-[16px] font-semibold"
        style={{ direction: "rtl" }}
      >
        <div className="ps-8 flex items-center justify-start gap-4 flex-[1.5] text-right">
          <Skeleton height={20} width="60%" />
        </div>

        <div className="ps-3 flex-[1.2] text-right">
          <Skeleton height={16} width="90%" />
        </div>

        <div className="px-4 flex-1">
          <Skeleton height={16} width="50%" />
        </div>

        <div className="px-4 flex-1">
          <Skeleton height={16} width="60%" />
        </div>

        <div className="pe-8 w-[100px] text-left flex items-center justify-end gap-4">
          <Skeleton circle height={20} width={20} />
        </div>
      </div>

      <div
        className="flex md:hidden flex-col items-center gap-4 w-[60%] bg-[#eee] dark:bg-[#333] dark:text-white rounded-3xl mx-auto mt-4 py-4"
        dir="rtl"
      >
        <Skeleton height={24} width="70%" />
        <Skeleton height={150} width="55%" borderRadius={16} />
        <Skeleton height={16} width="80%" />
        <div className="flex flex-col items-center text-[14px]">
          <Skeleton height={14} width="50%" />
          <Skeleton height={14} width="40%" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton circle height={20} width={20} />
        </div>
      </div>
    </>
  );
};

export default CoursesPaymentsSkeleton;
