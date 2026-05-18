import React, { useState } from "react";
import Eye from "../../../assets/Icons/Eye";
import Garbage from "../../../assets/Icons/Garbage";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { deleteCoursesComments } from "../../../core/services/api/Delete/deleteCoursesComments";
import { toast } from "react-toastify";
import CourseComViewModal from "../CourseComViewModal/CourseComViewModal.jsx";
import { PersianDateConverter } from "../../../utils/helper/dateConverter.js";
import CourseComDeleteModal from "../CourseComDeleteModal/CourseComDeleteModal.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const textClass = "font-regular text-base text-[#1E1E1E]   dark:text-[#DDDDDD]";

const MyCourseComment = ({ item, type }) => {
  const { t } = useTranslation();

  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };

  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const handleToggleViewModal = (value) => {
    setIsOpenViewModal(value);
  };

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const handleToggleDeleteModal = (value) => {
    setIsOpenDeleteModal(value);
  };
  const queryClient = useQueryClient();
  const deleteCourseCom = useMutation({
    mutationKey: ["DELETECOURSECOM"],
    mutationFn: () => deleteCoursesComments(item.id),
    onSuccess: () => {
      toast.success(t("myCourseComment.successToast"));
      queryClient.invalidateQueries(["MYCOURSECOMMENTS"]);
      handleToggleDeleteModal(false);
    },
  });

  if (type === "mobile") {
    return (
      <>
        <motion.div
          variants={Animate}
          initial="hidden"
          animate="visible"
          className="rounded-2xl  border border-[#EAEAEA] bg-white p-4 shadow-sm dark:border-[#5a5a5a] dark:bg-[#454545] lg:hidden"
        >
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <span
                className={`${textClass} block truncate text-[15px] font-semibold`}
              >
                {item.course.title}
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("myCourseComments.title2")}:
              </span>
              <span className={`${textClass} truncate text-sm`}>
                {item.title}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("myCourseComments.title3")}:
              </span>
              <span className={`${textClass} truncate text-sm`}>
                {item.describe}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("myCourseComments.title4")}:
              </span>

              <span
                className={`
              rounded-lg px-1 sm:px-3 py-1 text-[12px] sm:text-sm font-medium
              ${
                item.accept
                  ? "bg-[#EEFFFC] text-[#008C78]"
                  : "bg-[#FFECEC] text-[#E7000B]"
              }
            `}
              >
                {item.accept
                  ? t("myCourseComment.accepted")
                  : t("myCourseComment.notAccepted")}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t("myCourseComments.title5")}:
              </span>
              <span className={`${textClass} truncate text-[12px] sm:text-sm`}>
                {PersianDateConverter(item.insertDate)}
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                handleToggleViewModal(true);
              }}
              className="transition-transform duration-200 hover:scale-110"
            >
              <Eye />
            </button>

            <button
              type="button"
              onClick={() => {
                handleToggleDeleteModal(true);
              }}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              <Garbage />
            </button>
          </div>
        </motion.div>

        {isOpenViewModal && (
          <CourseComViewModal
            item={item}
            handleToggleViewModal={handleToggleViewModal}
          />
        )}

        {isOpenDeleteModal && (
          <CourseComDeleteModal
            handleToggleDeleteModal={handleToggleDeleteModal}
            deleteCourseCom={deleteCourseCom}
          />
        )}
      </>
    );
  }

  return (
    <>
      <motion.tr
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="hidden bg-white transition-colors duration-200 hover:bg-[#FAFAFA] dark:bg-[#454545] dark:hover:bg-[#505050] lg:table-row"
      >
        <td className="border-b border-[#EAEAEA] px-3 py-4 lg:py-3.5 xl:px-4 xl:py-[11px] 2xl:py-7.5 dark:border-[#5a5a5a]">
          <span
            className={`
            ${textClass}
            block truncate
            text-[12px] font-semibold text-[#1E1E1E]
            dark:text-[#DDDDDD]
            xl:text-[13px] 2xl:text-[14px]
          `}
          >
            {item.course.title}
          </span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="block truncate">{item.title}</span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="block  truncate">{item.describe}</span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center dark:border-[#5a5a5a]">
          <span
            className={`
              lg:w-[50px]
              xl:w-auto
            inline-flex items-center justify-center
            rounded-lg px-3 py-1
            whitespace-nowrap
            text-[11px] font-semibold
            xl:text-[12px] 2xl:text-[13px]
            ${
              item.accept
                ? "bg-[#EEFFFC] text-[#008C78]"
                : "bg-[#FFECEC] text-[#E7000B]"
            }
          `}
          >
            {item.accept
              ? t("myCourseComment.accepted")
              : t("myCourseComment.notAccepted")}
          </span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium whitespace-nowrap text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="inline lg:hidden">
            {PersianDateConverter(item.insertDate)}
          </span>

          <span className="hidden lg:inline xl:hidden">
            {PersianDateConverter(item.insertDate).slice(0, 9)}...
          </span>

          <span className="hidden xl:inline 2xl:hidden">
            {PersianDateConverter(item.insertDate).slice(0, 13)}...
          </span>

          <span className="hidden 2xl:inline">
            {PersianDateConverter(item.insertDate).slice(0, 16)}...
          </span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 dark:border-[#5a5a5a]">
          <div className="flex items-center justify-center gap-4 lg:gap-2 2xl:gap-4">
            <span
              onClick={() => {
                handleToggleViewModal(true);
              }}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              <Eye />
            </span>

            <span
              onClick={() => {
                handleToggleDeleteModal(true);
              }}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            >
              <Garbage />
            </span>
          </div>
        </td>
      </motion.tr>

      {isOpenViewModal && (
        <CourseComViewModal
          item={item}
          handleToggleViewModal={handleToggleViewModal}
        />
      )}

      {isOpenDeleteModal && (
        <CourseComDeleteModal
          handleToggleDeleteModal={handleToggleDeleteModal}
          deleteCourseCom={deleteCourseCom}
        />
      )}
    </>
  );
};

export default MyCourseComment;
