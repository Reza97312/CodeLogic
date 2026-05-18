<<<<<<< HEAD:frontend/src/components/userpanel/MyCourse/MyCourse.jsx
import React, { useState } from "react";
import Eye from "../../../assets/Icons/Eye";
import Receipt from "../../../assets/Icons/Receipt";
import ReactCourseImg from "../../../assets/Images/A/courses/2.png";
import { motion } from "framer-motion";
import AddCardIcon from "@mui/icons-material/AddCard";
import MyCoursesOverView from "../MyCoursesOverViewModal/MyCoursesOverView";
import MyCoursesPaidModal from "../../userpanel/MyCoursesPaidModal/MyCoursesPaidModal";
import imgg from "../../../assets/Images/A/teachersDetail/2.png";
import { PersianDateConverter } from "../../../utils/helper/dateConverter";
import img2 from "../../../assets/Images/HTML5Course.png";

const textClass =
  "font-regular text-base text-[#1E1E1E] truncate  dark:text-[#DDDDDD]";

const MyCourse = ({ item }) => {
  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };
  const [openOverViewModal, setOpenOverViewModal] = useState(false);
  const handleCloseOverViewModal = (value) => {
    setOpenOverViewModal(value);
  };
  const [openPaidModal, setOpenPaidModal] = useState(false);
  const handleClosePaidModal = (value) => {
    setOpenPaidModal(value);
  };

  return (
    <>
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="hidden items-center py-[14px] border-t border-b border-[#EAEAEA]
        md:flex"
      >
        <div className="flex items-center gap-4 w-64">
          <img
            className="w-[28px] h-[28px] rounded-full object-cover"
            src={
              item.tumbImageAddress &&
              !item.tumbImageAddress.includes("undefined") &&
              item.tumbImageAddress.startsWith("http") &&
              !item.tumbImageAddress.toLowerCase().includes("local") &&
              !item.tumbImageAddress.toLowerCase().includes("fakepath")
                ? item.tumbImageAddress
                : img2
            }
          />
          <div>
            <span className={textClass}>{item.course.title}</span>
          </div>
        </div>
        <div className="flex justify-center w-50">
          <span
            className={textClass}
          >{`${item.course.teacher.fName}  ${item.course.teacher.lName}`}</span>
        </div>
        <div className="flex justify-center w-30">
          <span
            className={`py-[2px] px-[10px] font-regular text-base
            ${
              item.paymentStatus === "پرداخت شده"
                ? " text-[#008C78] bg-[#EEFFFC]"
                : "bg-[#FFECEC] text-[#E7000B] "
            } rounded-[8px]`}
          >
            {item.paymentStatus}
          </span>
        </div>
        <div className="flex justify-center w-36">
          <span className={textClass}>{item.cost.toLocaleString()}</span>
        </div>
        <div className="flex justify-center w-34 ">
          <span className={textClass}>
            {PersianDateConverter(item.lastUpdate)}
          </span>
        </div>
        <div className="flex justify-center items-center gap-4 w-32 ">
          <div onClick={() => setOpenOverViewModal(true)}>
            <Eye />
          </div>
          {item.paymentStatus === "پرداخت نشده" ? (
            ""
          ) : (
            <div onClick={() => setOpenPaidModal(true)}>
              <Receipt />
            </div>
          )}
        </div>
      </motion.div>
      <div
        className="flex md:hidden flex-col items-center gap-4 dark:text-white dark:bg-[#333]
          w-[80%] bg-[#eee] rounded-3xl mx-auto mt-4 py-4
          "
      >
        <h2 className="text-[19px] text-[#008C78] dark:text-[#008C78] mx-auto font-bold">
          {item.course.title}
        </h2>
        <img
          className="rounded-4xl shadow-md w-[55%] mx-auto"
          src={
            item.tumbImageAddress.slice(0, 4) === "http"
              ? item.tumbImageAddress
              : imgg
          }
          alt=""
        />
        <div className="flex justify-center">
          <span
            className={textClass}
          >{`${item.course.teacher.fName}  ${item.course.teacher.lName}`}</span>
        </div>
        <div className="flex justify-center">
          <span
            className={`py-[2px] px-[10px] font-regular text-base
            ${
              item.paymentStatus === "پرداخت شده"
                ? " text-[#008C78] bg-[#EEFFFC]"
                : "bg-[#FFECEC] text-[#E7000B] "
            } rounded-[8px]`}
          >
            {item.paymentStatus}
          </span>
        </div>
        <div className="flex justify-center w-36">
          <span className={textClass}>{item.cost.toLocaleString()}</span>
        </div>
        <span className=" mx-auto text-[14px] text-[#848484] dark:text-[#848484] truncate ">
          {PersianDateConverter(item.lastUpdate)}
        </span>
        <div className="  flex items-center  gap-4">
          <div onClick={() => setOpenOverViewModal(true)}>
            <Eye />
          </div>
          {item.paymentStatus === "پرداخت نشده" ? (
            <div>
              <AddCardIcon className="text-[#008C78] cursor-pointer" />
            </div>
          ) : (
            <div>
              <Receipt />
            </div>
          )}
        </div>
      </div>
      {openOverViewModal && (
        <MyCoursesOverView
          item={item}
          handleCloseModal={handleCloseOverViewModal}
        />
      )}
      {openPaidModal && (
        <MyCoursesPaidModal handleClosePaidModal={handleClosePaidModal} />
      )}
    </>
  );
};

export default MyCourse;
=======
import React, { useState } from "react";
import Eye from "../../../assets/Icons/Eye";
import Receipt from "../../../assets/Icons/Receipt";
import ReactCourseImg from "../../../assets/Images/A/courses/2.png";
import { motion } from "framer-motion";
import AddCardIcon from "@mui/icons-material/AddCard";
import MyCoursesOverView from "../MyCoursesOverViewModal/MyCoursesOverView";
import MyCoursesPaidModal from "../../userpanel/MyCoursesPaidModal/MyCoursesPaidModal";
import imgg from "../../../assets/Images/A/teachersDetail/2.png";
import { PersianDateConverter } from "../../../utils/helper/dateConverter";
import img2 from "../../../assets/Images/HTML5Course.png";

const textClass =
  "font-regular text-base text-[#1E1E1E] truncate  dark:text-[#DDDDDD]";

const MyCourse = ({ item }) => {
  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };
  const [openOverViewModal, setOpenOverViewModal] = useState(false);
  const handleCloseOverViewModal = (value) => {
    setOpenOverViewModal(value);
  };
  const [openPaidModal, setOpenPaidModal] = useState(false);
  const handleClosePaidModal = (value) => {
    setOpenPaidModal(value);
  };

  return (
    <>
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className="hidden items-center py-[14px] border-t border-b border-[#EAEAEA]
        md:flex"
      >
        <div className="flex items-center gap-4 w-64">
          <img
            className="w-[28px] h-[28px] rounded-full object-cover"
            src={
              item.tumbImageAddress &&
              !item.tumbImageAddress.includes("undefined") &&
              item.tumbImageAddress.startsWith("http") &&
              !item.tumbImageAddress.toLowerCase().includes("local") &&
              !item.tumbImageAddress.toLowerCase().includes("fakepath")
                ? item.tumbImageAddress
                : img2
            }
          />
          <div>
            <span className={textClass}>{item.course.title}</span>
          </div>
        </div>
        <div className="flex justify-center w-50">
          <span
            className={textClass}
          >{`${item.course.teacher.fName}  ${item.course.teacher.lName}`}</span>
        </div>
        <div className="flex justify-center w-30">
          <span
            className={`py-[2px] px-[10px] font-regular text-base
            ${
              item.paymentStatus === "پرداخت شده"
                ? " text-[#008C78] bg-[#EEFFFC]"
                : "bg-[#FFECEC] text-[#E7000B] "
            } rounded-[8px]`}
          >
            {item.paymentStatus}
          </span>
        </div>
        <div className="flex justify-center w-36">
          <span className={textClass}>{item.cost.toLocaleString()}</span>
        </div>
        <div className="flex justify-center w-34 ">
          <span className={textClass}>
            {PersianDateConverter(item.lastUpdate)}
          </span>
        </div>
        <div className="flex justify-center items-center gap-4 w-32 ">
          <div onClick={() => setOpenOverViewModal(true)}>
            <Eye />
          </div>
          {item.paymentStatus === "پرداخت نشده" ? (
            ""
          ) : (
            <div onClick={() => setOpenPaidModal(true)}>
              <Receipt />
            </div>
          )}
        </div>
      </motion.div>
      <div
        className="flex md:hidden flex-col items-center gap-4 dark:text-white dark:bg-[#333]
          w-[80%] bg-[#eee] rounded-3xl mx-auto mt-4 py-4
          "
      >
        <h2 className="text-[19px] text-[#008C78] dark:text-[#008C78] mx-auto font-bold">
          {item.course.title}
        </h2>
        <img
          className="rounded-4xl shadow-md w-[55%] mx-auto"
          src={
            item.tumbImageAddress.slice(0, 4) === "http"
              ? item.tumbImageAddress
              : imgg
          }
          alt=""
        />
        <div className="flex justify-center">
          <span
            className={textClass}
          >{`${item.course.teacher.fName}  ${item.course.teacher.lName}`}</span>
        </div>
        <div className="flex justify-center">
          <span
            className={`py-[2px] px-[10px] font-regular text-base
            ${
              item.paymentStatus === "پرداخت شده"
                ? " text-[#008C78] bg-[#EEFFFC]"
                : "bg-[#FFECEC] text-[#E7000B] "
            } rounded-[8px]`}
          >
            {item.paymentStatus}
          </span>
        </div>
        <div className="flex justify-center w-36">
          <span className={textClass}>{item.cost.toLocaleString()}</span>
        </div>
        <span className=" mx-auto text-[14px] text-[#848484] dark:text-[#848484] truncate ">
          {PersianDateConverter(item.lastUpdate)}
        </span>
        <div className="  flex items-center  gap-4">
          <div onClick={() => setOpenOverViewModal(true)}>
            <Eye />
          </div>
          {item.paymentStatus === "پرداخت نشده" ? (
            <div>
              <AddCardIcon className="text-[#008C78] cursor-pointer" />
            </div>
          ) : (
            <div>
              <Receipt />
            </div>
          )}
        </div>
      </div>
      {openOverViewModal && (
        <MyCoursesOverView
          item={item}
          handleCloseModal={handleCloseOverViewModal}
        />
      )}
      {openPaidModal && (
        <MyCoursesPaidModal handleClosePaidModal={handleClosePaidModal} />
      )}
    </>
  );
};

export default MyCourse;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/userpanel/MyCourse/MyCourse.jsx
