import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { PersianDateConverter } from "../../../utils/helper/dateConverter";

const textClass = "font-regular text-base text-[#1E1E1E]   dark:text-[#898989]";
const titleClass = "font-semibold text-base text-[#1E1E1E] dark:text-[#fff]  ";
const textClass1 =
  "font-semibold text-base text-[#1E1E1E] break-words dark:text-[#fff]  ";

const CourseComViewModal = ({ item, handleToggleViewModal }) => {
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
        <div className="flex gap-2">
          <span className={titleClass}>
            {t("courseComViewModal.courseTitle")}
          </span>
          <span className={textClass1}>{item.course.title}</span>
        </div>
        <div className="flex gap-2">
          <span className={titleClass}>
            {t("courseComViewModal.commentTitle")}
          </span>
          <span className={textClass1}>{item.title}</span>
        </div>
        <div className="flex gap-2">
          <span className={titleClass}>
            {t("courseComViewModal.commentText")}
          </span>
          <span className={textClass1}>{item.describe}</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className={titleClass}>{t("courseComViewModal.status")}</span>
          <span
            className={`py-[2px] px-[12px] font-regular text-base rounded-lg
          ${
            item.accept
              ? "text-[#008C78] bg-[#EEFFFC]"
              : "text-[#E7000B] bg-[#FFECEC]"
          }`}
          >
            {item.accept
              ? t("courseComViewModal.accepted")
              : t("courseComViewModal.notAccepted")}
          </span>
        </div>
        <div className="flex justify-center gap-2">
          <span className={titleClass}>
            {t("courseComViewModal.commentDate")}
          </span>
          <span className={textClass}>
            {PersianDateConverter(item.insertDate)}
          </span>
        </div>
        <button
          onClick={() => {
            handleToggleViewModal(false);
          }}
          className="py-1 px-2 border rounded-lg cursor-pointer dark:text-[#898989]"
        >
          {t("courseComViewModal.closeModalBtn")}
        </button>
      </motion.div>
    </div>
  );
};

export default CourseComViewModal;
