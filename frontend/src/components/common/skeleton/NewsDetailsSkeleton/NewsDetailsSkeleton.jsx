import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewsSideBar from "../../../news/NewsDetails/NewsSideBar/NewsSideBar";
import NewsCard from "../../../news/NewsCard/NewsCard";

const NewsDetailsSkeleton = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const renderSideBarSkeleton = () => (
    <div className="w-full flex flex-wrap rounded-3xl shadow-md bg-[white] py-5 dark:bg-[#333]">
      <div className="w-full text-[#1E1E1E] font-[18px] font-bold px-4 dark:text-[white] ">
        <Skeleton height={20} width="60%" />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <NewsSideBar key={index} isLoading />
      ))}
    </div>
  );

  const renderNewsCardSkeleton = (key) => (
    <div
      key={key}
      className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
    >
      <NewsCard isLoading viewType="grid" />
    </div>
  );

  return (
    <SkeletonTheme
      baseColor={isDarkMode ? "#454545" : "#e6e6e6"}
      highlightColor={isDarkMode ? "#5a5a5a" : "#f5f5f5"}
    >
      <div className="flex flex-wrap">
        <div className="bg-[#F3F4F6] dark:bg-[#1e1e1e] w-full">
          <div className="pt-10 flex flex-col justify-center items-center px-4">
            <div className="font-bold mb-5 text-[#008C78] dark:text-[#ccc]">
              <Skeleton width={200} height={18} />
            </div>
            <p className="font-bold text-xl sm:text-2xl md:text-3xl text-[#1E1E1E] dark:text-[#fff] text-center">
              <Skeleton width={300} height={30} />
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="ml-5 w-full flex flex-wrap gap-10 sm:w-1/4 lg:w-[29%] relative mb-6 sm:mb-0">
              <div className="flex flex-col w-full gap-2 items-center justify-center bg-[white] shadow-md rounded-3xl py-5 dark:bg-[#333]">
                <Skeleton circle height={60} width={60} />
                <span className="font-[16px] text-[#848484] ">
                  <Skeleton width={80} />
                </span>
                <span className="font-[18px] font-bold text-[#1E1E1E] dark:text-[white] ">
                  <Skeleton width={120} />
                </span>
              </div>

              <div className="w-full flex flex-wrap rounded-3xl shadow-md bg-[white] py-5 dark:bg-[#333]">
                <span className="font-bold w-full text-[#1E1E1E] font-[18px] px-4 dark:text-[white] ">
                  <Skeleton height={20} width="70%" />
                </span>
                <div className="flex items-center w-full mt-7 justify-start lg:justify-between px-4">
                  <span className="font-[16px] text-[#848484] hidden lg:block">
                    <Skeleton width={80} />
                  </span>
                </div>
              </div>

              {renderSideBarSkeleton()}
            </div>

            <div className="w-full flex flex-wrap sm:w-3/4 lg:w-[69%] sm:ml-6">
              <div className="w-full mb-8">
                <Skeleton height={400} className="rounded-3xl" />
                <div className="mt-4 px-4">
                  <Skeleton height={20} width="40%" />
                  <Skeleton height={14} width="20%" className="mt-1" />
                </div>
              </div>

              <div className="w-full bg-white dark:bg-[#333] shadow-md rounded-3xl p-6 mb-8">
                <Skeleton count={10} />
                <Skeleton width="60%" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-wrap bg-[#F3F4F6] dark:bg-[#1e1e1e] ">
          <div className="w-full flex items-center justify-between py-2 px-15">
            <p className="font-bold text-[#008C78] text-[24px]">
              <Skeleton width={150} height={24} />
            </p>
            <div className="flex justify-between gap-5">
              <Skeleton circle width={34} height={34} />
              <Skeleton circle width={34} height={34} />
            </div>
          </div>

          <div className="w-full flex flex-row-reverse gap-4 md:gap-6 lg:gap-8 overflow-x-hidden scroll-smooth px-4 sm:px-6 md:px-8 lg:px-10 mb-20">
            {Array.from({ length: 3 }).map((_, index) =>
              renderNewsCardSkeleton(index)
            )}
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default NewsDetailsSkeleton;
