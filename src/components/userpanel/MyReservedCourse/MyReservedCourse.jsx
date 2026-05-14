import React, { useState } from "react";
import Eye from "../../../assets/Icons/Eye";
import Receipt from "../../../assets/Icons/Receipt";
import { motion } from "framer-motion";
import { t } from "i18next";
import ReservedCoursesModal from "../ReservedCourseModal/ReservedCourseModal";
import AddCardIcon from "@mui/icons-material/AddCard";
import PaymentModal from "../PaymentModal/PaymentModal";
import { PersianDateConverter } from "../../../utils/helper/dateConverter.js";
import img2 from "../../../assets/Images/Rectanglee.png";

const MyReservedCourse = ({ item }) => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const textClass =
    "font-regular text-base text-[#1E1E1E]  dark:text-[#DDDDDD]";

  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };

  const handleToggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClosePayment = (value) => {
    setOpenPaymentModal(value);
  };

  return (
    <>
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="rounded-2xl border border-[#EAEAEA] bg-white p-4 shadow-sm dark:border-[#5a5a5a] dark:bg-[#454545] lg:hidden"
      >
        <div className="flex items-center gap-4">
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
            alt={item.courseName}
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />

          <div className="min-w-0 flex-1">
            <span
              className={`${textClass} block truncate text-[15px] font-semibold`}
            >
              {item.courseName.length > 30
                ? item.courseName.slice(0, 30) + "..."
                : item.courseName}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              مدرس:
            </span>
            <span className={`${textClass} truncate text-sm`}>
              {item.teacher}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              وضعیت:
            </span>
            <span
              className={`
              rounded-lg px-1 sm:px-3 py-1 text-sm font-medium
              ${
                item.accept
                  ? "bg-[#EEFFFC] text-[#008C78]"
                  : "bg-[#FFECEC] text-[#E7000B]"
              }
            `}
            >
              {item.accept
                ? t("myReservedCourse.reserved")
                : t("myReservedCourse.await")}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              تاریخ:
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
              handleToggleModal(true);
            }}
            className="transition-transform duration-200 hover:scale-110"
          >
            <Eye />
          </button>

          {item.accept && (
            <button
              type="button"
              onClick={() => setOpenPaymentModal(true)}
              className="transition-transform duration-200 hover:scale-110"
            >
              <AddCardIcon className="text-[#008C78]" />
            </button>
          )}
        </div>
      </motion.div>

      <motion.tr
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="hidden bg-white  transition-colors duration-200 hover:bg-[#FAFAFA] dark:bg-[#454545] dark:hover:bg-[#505050] lg:table-row"
      >
        <td className="border-b border-[#EAEAEA] px-3 py-4 lg:py-3.5 xl:py-[11px] 2xl:py-4 dark:border-[#5a5a5a] xl:px-4">
          <div className="flex min-w-0  items-center gap-3 xl:gap-4">
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
              alt={item.courseName}
              className="h-11 w-11 shrink-0 rounded-full object-cover xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
            />

            <span
              className={`
              ${textClass}
              min-w-0 truncate
              text-[12px] font-semibold text-[#1E1E1E]
              dark:text-[#DDDDDD]
              xl:text-[13px] 2xl:text-[14px]
            `}
            >
              {item.courseName.length > 30
                ? item.courseName.slice(0, 30) + "..."
                : item.courseName}
            </span>
          </div>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="block truncate">{item.teacher}</span>
        </td>

        <td className="border-b border-[#EAEAEA]  px-3 py-4 text-center dark:border-[#5a5a5a]">
          <span
            className={`
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
              ? t("myReservedCourse.reserved")
              : t("myReservedCourse.await")}
          </span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 text-center text-[12px] font-medium whitespace-nowrap text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[13px] 2xl:text-[14px]">
          <span className="inline lg:hidden">
            {PersianDateConverter(item.insertDate)}
          </span>

          <span className="hidden lg:inline xl:hidden">
            {PersianDateConverter(item.insertDate).slice(0, 16)}...
          </span>

          <span className="hidden xl:inline 2xl:hidden">
            {PersianDateConverter(item.insertDate).slice(0, 22)}...
          </span>

          <span className="hidden 2xl:inline">
            {PersianDateConverter(item.insertDate)}
          </span>
        </td>

        <td className="border-b border-[#EAEAEA] px-3 py-4 dark:border-[#5a5a5a]">
          <div className="flex items-center justify-center gap-4 lg:gap-2 2xl:gap-4">
            <button
              type="button"
              onClick={() => {
                handleToggleModal(true);
              }}
              className="transition-transform duration-200 hover:scale-110"
            >
              <Eye />
            </button>

            {item.accept && (
              <button
                type="button"
                onClick={() => setOpenPaymentModal(true)}
                className="transition-transform duration-200 hover:scale-110"
              >
                <AddCardIcon className="text-[#008C78]" />
              </button>
            )}
          </div>
        </td>
      </motion.tr>

      {isOpen && (
        <ReservedCoursesModal
          item={item}
          handleToggleModal={handleToggleModal}
        />
      )}

      {openPaymentModal && (
        <PaymentModal item={item} handleClosePayment={handleClosePayment} />
      )}
    </>
  );
};

export default MyReservedCourse;
