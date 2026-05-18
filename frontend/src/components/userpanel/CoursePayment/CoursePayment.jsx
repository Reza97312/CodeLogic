import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import documentIcon from "../../../assets/Icons/A/document.png";
import { useTranslation } from "react-i18next";
import { PersianDateConverter } from "../../../utils/helper/dateConverter";

const CoursePayment = ({ items, handleToggleModal }) => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);

  /// motion ///
  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };
  return (
    <>
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        style={{ direction: "rtl" }}
        className=" dark:bg-[#454545] dark:text-[#ffff] transition-all w-full text-[16px] 
            hidden md:flex text-center items-center bg-[#ffff] py-4 border-b border-[#EAEAEA] "
      >
        <div className="flex-[1.3] text-right ps-8">{items.courseId}</div>
        <div className="px-4 flex-1 truncate">
          {PersianDateConverter(items.PeymentDate)}
        </div>
        <div className=" px-4 flex-1 truncate ">
          {PersianDateConverter(items.instertDate)}
        </div>
        <div
          className={` px-1 py-1 rounded-xl flex-[0.8] text-[16px] ${
            items.accept === true
              ? "bg-[#EEFFFC] text-[#008C78] "
              : "bg-[#FFECEC] text-[#E7000B] "
          } `}
        >
          {items.accept === true ? "تایید شده" : "درانتظار تایید"}
        </div>
        <div className="px-4 flex-1"> {items.Paid.toLocaleString()}</div>
        <div
          onClick={() => handleToggleModal(items.courseId)}
          className="flex items-center justify-center w-[100px] pe-8  "
        >
          <img className="cursor-pointer" src={documentIcon} alt="" />
        </div>
      </motion.div>
      <div
        className="flex md:hidden flex-col items-center gap-5 dark:text-white dark:bg-[#333]
      w-[90%] bg-[#eee] rounded-3xl mx-auto mt-4 py-4 text-[16px]
      "
      >
        <div className="flex gap-2 text-[##008C78]">
          {t("coursesPayment.CourseGroup")}:
          <div className="text-[14px] text-[#848484] dark:text-[#848484]">
            {items.PaymentInvoiceNumber}
          </div>
        </div>
        <div className="flex gap-2 text-[##008C78]">
          {t("coursesPayment.paymentDate")}:
          <div className="text-[14px] text-[#848484] dark:text-[#848484] truncate ">
            {PersianDateConverter(items.PeymentDate)}
          </div>
        </div>
        <div className="flex gap-2 text-[##008C78] ">
          {t("coursesPayment.DateEntered")}:
          <div className="text-[14px] text-[#848484] dark:text-[#848484] truncate">
            {PersianDateConverter(items.instertDate)}
          </div>
        </div>
        <div className="flex gap-2 text-[##008C78]">
          {t("coursesPayment.PaymentStatus")}:
          <div
            className={` px-1 py-1 rounded-xl text-[14px]${
              items.accept === true
                ? "bg-[#EEFFFC] text-[#008C78] "
                : "bg-[#FFECEC] text-[#E7000B] "
            } `}
          >
            {items.accept === true ? "تایید شده" : "درانتظار تایید"}
          </div>
        </div>
        <div className="flex gap-2 text-[##008C78]">
          {t("coursesPayment.Payment")}:
          <div className="text-[14px] text-[#848484] dark:text-[#848484]">
            {items.Paid.toLocaleString()}
          </div>
        </div>
        <div className="flex gap-2">
          {t("coursesPayment.Operation")}:
          <div
            onClick={() => handleToggleModal(items.courseId)}
            className="flex items-center justify-center w-[100px] pe-8  "
          >
            <img className="cursor-pointer" src={documentIcon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePayment;
