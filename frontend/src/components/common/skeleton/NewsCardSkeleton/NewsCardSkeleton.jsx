import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

const NewsCardSkeleton = ({ viewType }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const isList = viewType === "list";

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const HandleDark = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    HandleDark.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => HandleDark.disconnect();
  }, []);

  return (
    <SkeletonTheme
      baseColor={isDarkMode ? "#454545" : "#e6e6e6"}
      highlightColor={isDarkMode ? "#5a5a5a" : "#f5f5f5"}
    >
      <div
        className={`bg-transparent rounded-2xl overflow-hidden shadow-[0px_0px_1px_1px_#ccc] transition-all duration-300
          ${
            isList
              ? "flex w-full h-[150px] md:h-[180px] lg:h-[200px]"
              : "w-full mt-3 mb-3"
          }
        `}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div
          className={`relative flex items-center justify-center bg-transparent dark:bg-[#282828]
            ${
              isList
                ? "w-2/5 md:w-[35%] lg:w-[30%] flex-shrink-0"
                : "w-full h-40 sm:h-52 md:h-60"
            }
          `}
        >
          <Skeleton
            className={`${
              isList
                ? "w-[80%] h-[80%] rounded-xl"
                : "w-full h-full rounded-t-2xl"
            }`}
          />
        </div>

        <div
          className={`bg-white dark:bg-[#333] rounded-2xl shadow-sm px-4 pt-4 pb-3 relative z-10 flex flex-col justify-between
            ${
              isList
                ? "w-3/5 md:w-[65%] lg:w-[70%]  rounded-l-none"
                : "-mt-4 min-h-[160px] "
            }
          `}
        >
          <div className={isRtl ? "text-right" : "text-left"}>
            <Skeleton height={18} width="80%" />
            <Skeleton height={14} width="95%" className="mt-2" count={2} />
          </div>

          <div
            className={`flex justify-between items-center mt-3 text-gray-500 text-xs border-t border-gray-100 pt-2 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <Skeleton height={14} width={60} />
            <Skeleton height={14} width={40} />
          </div>

          <div
            className={`flex justify-between items-center mt-2 text-[11px] sm:text-[12px] text-gray-500 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <Skeleton height={14} width={80} />
            <Skeleton height={14} width={30} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default NewsCardSkeleton;
