import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PersianDateConverter } from "../../../../utils/helper/dateConverter.js";
import img2 from "../../../../assets/Images/Rectanglepc.png";
import Eye from "../../../../assets/Icons/Eye.jsx";
import Garbage from "../../../../assets/Icons/Garbage.jsx";
const FavoriteNew = ({ items, deleteItem, getOverViewData, type }) => {
  const { t } = useTranslation();
  const handleDelete = () => {
    deleteItem(items.id);
  };
  const handleOverView = () => {
    getOverViewData(items.news);
  };

  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };

  if (type === "mobile") {
    return (
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="rounded-2xl border border-[#EAEAEA] bg-white p-4 shadow-sm dark:border-[#5a5a5a] dark:bg-[#454545] lg:hidden"
      >
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 shrink-0 rounded-full object-cover"
            src={
              items?.news?.currentImageAddress &&
              !items.news.currentImageAddress.includes("undefined") &&
              items.news.currentImageAddress.startsWith("http") &&
              !items.news.currentImageAddress.toLowerCase().includes("local") &&
              !items.news.currentImageAddress.toLowerCase().includes("fakepath")
                ? items.news.currentImageAddress
                : img2
            }
            alt={items.news?.title || ""}
          />

          <div className="min-w-0 flex-1">
            <span
              className={` block truncate text-[15px] font-semibold text-[#1E1E1E] dark:text-[#DDDDDD]`}
            >
              {items.news.title}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#1E1E1E] dark:text-[#DDDDDD]">
              {t("favoriteNews.commentsCount")}:
            </span>

            <span className="truncate text-sm text-[#1E1E1E] dark:text-[#DDDDDD]">
              {items.news.commentsCount ?? 43}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#1E1E1E] dark:text-[#DDDDDD]">
              {t("favoriteNews.viewsCount")}:
            </span>

            <span className="truncate text-sm text-[#1E1E1E] dark:text-[#DDDDDD]">
              {items.news.viewsCount ?? 666}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#1E1E1E] dark:text-[#DDDDDD]">
              {t("favoriteNews.likesCount")}:
            </span>

            <span className="truncate text-sm text-[#1E1E1E] dark:text-[#DDDDDD]">
              {items.news.likesCount ?? 36}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#1E1E1E] dark:text-[#DDDDDD]">
              {t("favoriteNews.lastUpdated")}:
            </span>

            <span className="truncate text-[12px] text-[#1E1E1E] dark:text-[#DDDDDD] sm:text-sm">
              {PersianDateConverter(items.news.updateDate)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={handleOverView}
            className="transition-transform duration-200 hover:scale-110"
          >
            <Eye />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="transition-transform duration-200 hover:scale-110"
          >
            <Garbage />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.tr
      variants={Animate}
      initial="hidden"
      animate="visible"
      className="hidden bg-white transition-colors duration-200 hover:bg-[#FAFAFA] dark:bg-[#454545] dark:hover:bg-[#505050] lg:table-row"
    >
      <td className="border-b border-[#EAEAEA] px-3 py-4 lg:py-3.5 xl:px-4 xl:py-[11px] 2xl:py-4 dark:border-[#5a5a5a]">
        <div className="flex min-w-0 items-center gap-3 xl:gap-4">
          <img
            className="h-11 w-11 shrink-0 rounded-full object-cover xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
            src={
              items?.news?.currentImageAddress &&
              !items.news.currentImageAddress.includes("undefined") &&
              items.news.currentImageAddress.startsWith("http") &&
              !items.news.currentImageAddress.toLowerCase().includes("local") &&
              !items.news.currentImageAddress.toLowerCase().includes("fakepath")
                ? items.news.currentImageAddress
                : img2
            }
            alt={items.news?.title || ""}
          />

          <span
            className={`
           
            min-w-0 truncate
            text-[12px] font-semibold text-[#1E1E1E]
            dark:text-[#DDDDDD]
            xl:text-[13px] 2xl:text-[14px]
          `}
          >
            {items.news.title}
          </span>
        </div>
      </td>

      <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
        {items.news.commentsCount ?? 43}
      </td>

      <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
        {items.news.viewsCount ?? 666}
      </td>

      <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
        {items.news.likesCount ?? 36}
      </td>

      <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium whitespace-nowrap text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
        <span className="inline lg:hidden">
          {PersianDateConverter(items.news.updateDate)}
        </span>

        <span className="hidden lg:inline xl:hidden">
          {PersianDateConverter(items.news.updateDate).slice(0, 15)}...
        </span>

        <span className="hidden xl:inline 2xl:hidden">
          {PersianDateConverter(items.news.updateDate).slice(0, 19)}...
        </span>

        <span className="hidden 2xl:inline">
          {PersianDateConverter(items.news.updateDate).slice(0, 23)}...
        </span>
      </td>

      <td className="border-b border-[#EAEAEA] px-3 py-4 dark:border-[#5a5a5a]">
        <div className="flex items-center justify-center gap-4 lg:gap-2 2xl:gap-4">
          <button
            type="button"
            onClick={handleOverView}
            className="transition-transform duration-200 hover:scale-110"
          >
            <Eye />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="transition-transform duration-200 hover:scale-110"
          >
            <Garbage />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default FavoriteNew;
