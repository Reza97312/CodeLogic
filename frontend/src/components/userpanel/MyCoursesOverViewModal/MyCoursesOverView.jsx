import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import Eye from "../../../assets/Icons/Eye";
import AddCardIcon from "@mui/icons-material/AddCard";
import { PersianDateConverter } from "../../../utils/helper/dateConverter.js";
import img2 from "../../../assets/Images/HTML5Course.png";

const MyCoursesOverView = ({ item, handleCloseModal }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black/50 backdrop-blur flex justify-center items-center "
      onClick={() => handleCloseModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            duration: 300,
          },
        }}
        className=" bg-[#eee] rounded-3xl flex z-20
          flex-col  mt-3 gap-6  py-4 px-6 dark:text-white dark:bg-[#333] "
      >
        <h2 className="text-[19px] text-[#008C78] dark:text-[#008C78] mx-auto font-bold">
          {item.course.title}
        </h2>
        <img
          className="rounded-2xl shadow-md max-w-[45%]  mx-auto"
          src={
            item.tumbImageAddress &&
            !item.tumbImageAddress.includes("undefined") &&
            item.tumbImageAddress.startsWith("http") &&
            !item.tumbImageAddress.toLowerCase().includes("local") &&
            !item.tumbImageAddress.toLowerCase().includes("fakepath")
              ? item.tumbImageAddress
              : img2
          }
          alt=""
        />
        <p className="text-[14px] text-[#848484] dark:text-[#848484] mt-2 mx-auto ">
          {item.course.describe}
        </p>
        <div className="mx-auto text-[#008C78]">
          {t("courseInfo.price")} :{" "}
          <span className="text-black dark:text-[#ffff]">
            {item.course.cost.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            {t("courseInfo.startDate")}:{" "}
            <span>{PersianDateConverter(item.course.startTime)}</span>
          </div>
          <div>
            {t("courseInfo.endDate")} :{" "}
            <span>{PersianDateConverter(item.course.endTime)}</span>
          </div>
        </div>
        <div className="flex mx-auto items-center">
          {t("myCourses.title3")} :
          <span
            className={`py-[2px] px-[10px] font-regular text-base 
            ${
              item.paymentStatus === "پرداخت شده"
                ? " text-[#008C78] bg-[#EEFFFC]"
                : "bg-[#FFECEC] text-[#E7000B] "
            } rounded-[8px]`}
          >
            {item.paymentStatus}
          </span>{" "}
        </div>
        <button
          onClick={() => handleCloseModal(false)}
          className=" cursor-pointer border dark:border-[#EAEAEA] mx-auto
               dark:text-white px-3 py-2 rounded-2xl hover:shadow-md inline"
        >
          {t("login.Back")}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MyCoursesOverView;
