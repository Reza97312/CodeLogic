import React, { useState } from "react";
import Eye from "../../../assets/Icons/Eye";
import Garbage from "../../../assets/Icons/Garbage";
import { motion } from "framer-motion";
import { deleteNewsComments } from "../../../core/services/api/delete/deleteNewsComments";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import NewsComViewModal from "../NewsComViewModal/NewsComViewModal.jsx";
import { PersianDateConverter } from "../../../utils/helper/dateConverter.js";
import NewsComDeleteModal from "../NewsComDeleteModal/NewsComDeleteModal.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const textClass = "font-regular text-base text-[#1E1E1E]   dark:text-[#DDDDDD]";

const MyNewsComment = ({ item }) => {
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
  const deleteNewsCom = useMutation({
    mutationKey: ["DELETENEWSCOM"],
    mutationFn: () => deleteNewsComments(item.id),
    onSuccess: () => {
      toast.success(t("myNewsComment.successToast"));
      queryClient.invalidateQueries(["MYNEWSCOMMENTS"]);
      handleToggleDeleteModal(false);
    },
  });

  return (
    <>
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="rounded-2xl border border-[#EAEAEA] bg-white p-4 shadow-sm dark:border-[#5a5a5a] dark:bg-[#454545] lg:hidden"
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <span
              className={`${textClass} block truncate text-[15px] font-semibold`}
            >
              آموزش ری اکت
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("myNewsComments.title2")}:
            </span>

            <span className={`${textClass} truncate text-sm`}>
              {item.title}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("myNewsComments.title3")}:
            </span>

            <span className={`${textClass} truncate text-sm`}>
              {item.describe}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("myNewsComments.title4")}:
            </span>

            <span className={`${textClass} truncate text-[12px] sm:text-sm`}>
              {PersianDateConverter(item.inserDate)}
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
            className="transition-transform duration-200 hover:scale-110"
          >
            <Garbage />
          </button>
        </div>
      </motion.div>

      <motion.tr
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="hidden bg-white transition-colors duration-200 hover:bg-[#FAFAFA] dark:bg-[#454545] dark:hover:bg-[#505050] lg:table-row"
      >
        <td className="border-b border-[#EAEAEA] px-3 py-4 lg:py-5 xl:px-4 xl:py-[11px] 2xl:py-7.5 dark:border-[#5a5a5a]">
          <span
            className={`
            ${textClass}
            block truncate
            text-[12px] font-semibold text-[#1E1E1E]
            dark:text-[#DDDDDD]
            xl:text-[13px]
            2xl:text-[14px]
          `}
          >
            آموزش ری اکت
          </span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="block truncate">{item.title}</span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="block truncate">{item.describe}</span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center whitespace-nowrap text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="inline lg:hidden">
            {PersianDateConverter(item.inserDate)}
          </span>

          <span className="hidden lg:inline xl:hidden">
            {PersianDateConverter(item.inserDate).slice(0, 14)}...
          </span>

          <span className="hidden xl:inline 2xl:hidden">
            {PersianDateConverter(item.inserDate).slice(0, 19)}...
          </span>

          <span className="hidden 2xl:inline">
            {PersianDateConverter(item.inserDate).slice(0, 22)}...
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
        <NewsComViewModal
          item={item}
          handleToggleViewModal={handleToggleViewModal}
        />
      )}

      {isOpenDeleteModal && (
        <NewsComDeleteModal
          handleToggleDeleteModal={handleToggleDeleteModal}
          deleteNewsCom={deleteNewsCom}
        />
      )}
    </>
  );
};

export default MyNewsComment;
