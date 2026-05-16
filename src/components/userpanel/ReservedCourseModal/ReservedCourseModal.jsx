import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PersianDateConverter } from "../../../utils/helper/dateConverter";
import img2 from "../../../assets/Images/Rectanglee.png";

const ReservedCoursesModal = ({ item, handleToggleModal }) => {
  const { t } = useTranslation();

  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };

  const textClass =
    "font-regular sm:text-base text-[#1E1E1E]  text-[12px] dark:text-[#DDDDDD]";

  const textClass1 =
    "font-regular sm:text-base text-[#1E1E1E]  break-words dark:text-[#DDDDDD]";

  return (
    <div
      onClick={() => handleToggleModal(false)}
      className=" flex items-center justify-center fixed inset-0 bg-black/40 backdrop-blur-sm  z-40"
    >
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-3 w-[80%]  shadow-2xl h-[55%] sm:h-[60%] md:w-144 md:h-95 pt-8 
        bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl  mx-auto  md:m-0 inset-0 z-48 dark:bg-[#333]"
      >
        <div className="flex flex-col items-center gap-4 h-[40%] w-[50%]  ">
          <img
            src={
              item.image &&
              !item.image.includes("undefined") &&
              item.image.startsWith("http") &&
              !item.image.toLowerCase().includes("local") &&
              !item.image.toLowerCase().includes("fakepath")
                ? item.image
                : img2
            }
            className="w-full h-[100%] rounded-2xl "
          />
        </div>
        <div>
          <span className={textClass1}>{item.courseName}</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-semibold text-base text-[#1E1E1E] dark:text-[#DDDDDD]">
            {t("reservedCourseModal.student")}
          </span>
          <span className={textClass}>{item.teacher}</span>
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-semibold text-base text-[#1E1E1E] dark:text-[#DDDDDD]">
            {t("reservedCourseModal.status")}
          </span>
          <span
            className={`py-[2px] px-[10px] font-regular text-[13px] sm:text-base rounded-[8px] 
          ${
            item.accept
              ? "text-[#008C78] bg-[#EEFFFC]"
              : "text-[#E7000B] bg-[#FFECEC]"
          }`}
          >
            {item.accept
              ? t("myReservedCourse.reserved")
              : t("myReservedCourse.await")}
          </span>
        </div>
        <div className="flex justify-center gap-2">
          <span className="font-semibold text-[14px] sm:text-base text-[#1E1E1E] dark:text-[#DDDDDD]">
            {t("reservedCourseModal.reservationDate")}
          </span>
          <span className={textClass}>
            {PersianDateConverter(item.insertDate)}
          </span>
        </div>
        <button
          onClick={() => {
            handleToggleModal(false);
          }}
          className="py-1 px-2 border dark:border-[#EAEAEA] dark:text-[#EAEAEA] rounded-lg cursor-pointer"
        >
          {t("reservedCourseModal.backBtn")}
        </button>
      </motion.div>
    </div>
  );
};

export default ReservedCoursesModal;
