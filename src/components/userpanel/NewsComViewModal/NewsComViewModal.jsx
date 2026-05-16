import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PersianDateConverter } from "../../../utils/helper/dateConverter";

const textClass = "font-regular text-base text-[#1E1E1E]   dark:text-[#898989]";
const textClass1 =
  "font-regular text-base text-[#1E1E1E] break-words  dark:text-[#898989]";
const titleClass = "font-semibold text-base text-[#1E1E1E] dark:text-[#fff]";

const NewsComViewModal = ({ item, handleToggleViewModal }) => {
  const { t } = useTranslation();

  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };

  return (
    <div
      onClick={() => handleToggleViewModal(false)}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center"
    >
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center dark:bg-[#333] gap-6 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] pt-8 py-[14px] bg-[#FFFFFF] border border-[#EAEAEA] 
        rounded-xl  z-48"
      >
        <div className="flex gap-2 mt-4">
          <span className={titleClass}>{t("newsCommentModal.newsTitle")}</span>
          <span className={textClass}>آموزش ری اکت</span>
        </div>
        <div className="flex gap-2">
          <span className={titleClass}>
            {t("newsCommentModal.commentTitle")}
          </span>
          <span className={textClass1}>{item.title}</span>
        </div>
        <div className="flex gap-2">
          <span className={titleClass}>
            {t("newsCommentModal.commentText")}
          </span>
          <span className={textClass1}>{item.describe}</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className={titleClass}>{t("newsCommentModal.status")}</span>
          <span className="py-[2px] px-[12px] font-regular text-base text-[#008C78] bg-[#EEFFFC] rounded-lg">
            تایید شده
          </span>
        </div>
        <div className="flex justify-center gap-2">
          <span className={titleClass}>
            {t("newsCommentModal.commentDate")}
          </span>
          <span className={textClass}>
            {PersianDateConverter(item.inserDate)}
          </span>
        </div>
        <button
          onClick={() => {
            handleToggleViewModal(false);
          }}
          className="py-1 px-2 border rounded-lg cursor-pointer dark:text-[#898989]"
        >
          {t("reservedCourseModal.backBtn")}
        </button>
      </motion.div>
    </div>
  );
};

export default NewsComViewModal;
