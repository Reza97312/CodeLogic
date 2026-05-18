import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewsCard from "../../../news/NewsCard/NewsCard";

const NewsPageSkeleton = ({ selectedView, isDarkMode }) => {
  const getCardWidthClass = () =>
    selectedView === "list" ? "w-full" : "w-full sm:w-[calc(33.333%-10.66px)]";

  const renderSkeletonSidebar = () => (
    <div className="ml-5 w-full sm:w-1/4 lg:w-[19%] relative mb-6 sm:mb-0 sm:mt-17.5">
      <Skeleton height={45} borderRadius={12} />
      <div className="mt-5 space-y-3">
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
        <Skeleton height={20} />
      </div>
    </div>
  );

  const renderSkeletonTopBar = () => (
    <div className="bg-[#fff] dark:bg-[#333] mb-5 mt-5 shadow-md rounded-xl px-4 py-3 sm:px-10 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
      <div className="flex flex-wrap justify-center sm:justify-start items-center !gap-4">
        <Skeleton height={20} width={90} />
        <Skeleton height={36} width={120} />
        <Skeleton height={36} width={80} />
      </div>
      <div className="!gap-3 flex justify-center items-center">
        <Skeleton circle height={40} width={40} />
        <Skeleton circle height={40} width={40} />
      </div>
    </div>
  );

  const renderSkeletonPagination = () => (
    <div className="flex justify-center my-10">
      <div className="flex flex-wrap justify-center gap-2">
        <Skeleton height={36} width={60} />
        <Skeleton height={36} width={36} />
        <Skeleton height={36} width={36} />
        <Skeleton height={36} width={36} />
        <Skeleton height={36} width={60} />
      </div>
    </div>
  );

  return (
    <SkeletonTheme
      baseColor={isDarkMode ? "#454545" : "#e6e6e6"}
      highlightColor={isDarkMode ? "#5a5a5a" : "#f5f5f5"}
    >
      <div className="bg-[#F3F4F6] dark:bg-[#1e1e1e] min-h-screen">
        <div className="pt-10 flex flex-col justify-center items-center px-4">
          <Skeleton width={220} height={30} />
          <Skeleton width={160} height={25} />
        </div>

        <div className="flex flex-col sm:flex-row items-start justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {renderSkeletonSidebar()}

          <div className="w-full sm:w-3/4 lg:w-[79%] sm:ml-6">
            {renderSkeletonTopBar()}

            <div
              className={`flex flex-wrap gap-4 justify-center sm:justify-start ${
                selectedView === "list" ? "flex-col" : "flex-row"
              }`}
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className={getCardWidthClass()}>
                  <NewsCard isLoading viewType={selectedView} />
                </div>
              ))}
            </div>

            {renderSkeletonPagination()}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default NewsPageSkeleton;
