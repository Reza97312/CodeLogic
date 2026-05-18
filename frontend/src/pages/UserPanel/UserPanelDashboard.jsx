<<<<<<< HEAD:frontend/src/pages/UserPanel/UserPanelDashboard.jsx
import React, { useMemo } from "react";
import DashboardCourseReserve from "../../components/userpanel/DashboardCourseReserve/DashboardCourseReserve";
import DashboardLatestNews from "../../components/userpanel/DashboardLatestNews/DashboardLatestNews";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import getAllNews from "../../core/services/api/Get/News";
import img2 from "../../assets/Images/HTML5Course.png";
import img3 from "../../assets/Images/Rectanglee.png";
import { Link } from "react-router-dom";
import GetProfileInfo from "../../core/services/api/Get/GetProfileInfo";
import GetReservedDashboard from "../../core/services/api/Get/GetReservedDashboard";
import GetMyCourses from "../../core/services/api/Get/GetMyCourses";

const headerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const UserPanelDashboard = () => {
  const { data: resCourses } = useQuery({
    queryKey: ["resCourses"],
    queryFn: GetReservedDashboard,
  });

  const latestCourses = useMemo(() => {
    if (!resCourses) return [];
    return [...resCourses]
      .sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate))
      .slice(0, 3);
  }, [resCourses]);

  const { data: myCourses } = useQuery({
    queryKey: ["myCourses"],
    queryFn: GetMyCourses,
  });

  const unpaidCount =
    myCourses?.listOfMyCourses?.filter((c) => c.paymentStatus === "پرداخت نشده")
      .length ?? 0;

  const { data } = useQuery({
    queryKey: "getallnews",
    queryFn: getAllNews,
  });

  const sortedNews = useMemo(() => {
    if (!data?.news) return [];
    return [...data.news]
      .sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate))
      .slice(0, 3);
  }, [data]);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const { data: profileData } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: () => GetProfileInfo(),
  });

  const profileFields = [
    profileData?.fName,
    profileData?.lName,
    profileData?.nationalCode,
    profileData?.gender,
    profileData?.birthDay,
    profileData?.phoneNumber,
    profileData?.userAbout,
    profileData?.homeAdderess,
    profileData?.latitude,
    profileData?.longitude,
    profileData?.linkdinProfile,
    profileData?.telegramLink,
    profileData?.email,
    profileData?.currentPictureAddress,
  ];

  const filledFieldsCount = profileFields.filter(
    (field) => field !== undefined && field !== null && field !== "",
  ).length;

  const percentage = Math.round(
    (filledFieldsCount / profileFields.length) * 100,
  );

  return (
    <div className="  w-full bg-[#F3F4F6] mt-5 md:m-0 md:h-[85%] flex items-center rounded-4xl p-5 dark:bg-[#333] ">
      <div className="  w-full h-full flex flex-col justify-between ">
        <div className="  w-full h-[25%] flex flex-col gap-5 md:flex-row md:justify-between">
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className="  h-full md:w-[30%] rounded-3xl bg-white dark:bg-[#454545]  "
          >
            <motion.div
              variants={itemVariants}
              className={`  flex items-center gap-2 py-4 pr-6 md:py-3 md:pr-3 lg:py-0 lg:mt-5 lg:pr-6 ${
                isRtl ? "" : "pl-6 md:pl-3 lg:pl-6"
              }`}
            >
              <p className=" text-[20px] sm:text-[20px] md:text-[13px] lg:text-[16px] xl:text-[20px] text-[#1e1e1e] dark:text-[#848484] ">
                {t("paneldashboard.my_courses_title")}
              </p>
              <div className="p-1 md:px-1 md:py-0.5 sm:p-1 lg:p-0.5 xl:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer ">
                <Link to={"/userPanel/myCourses"}>
                  <NorthWestIcon className=" !text-[24px] md:!text-[16px] lg:!text-[24px]  text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white] duration-300 " />
                </Link>
              </div>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className={`  text-[#008C78] text-[48px] sm:text-[48px] md:text-[40px] lg:text-[48px] pr-6 ${
                isRtl ? "" : "pl-6"
              } `}
            >
              {myCourses?.listOfMyCourses?.length ?? 0}
            </motion.span>
          </motion.div>
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className="  h-full  md:w-[30%] rounded-3xl bg-white dark:bg-[#454545] "
          >
            <motion.div
              variants={itemVariants}
              className={`  flex items-center  px-2 sm:px-0 md:px-2 lg:px-0 gap-2 py-4 pr-6 md:py-3 md:pr-3 lg:py-0 lg:mt-5 lg:pr-2 xl:pr-6 ${
                isRtl ? "" : "pl-6 md:pl-3 lg:pl-2 xl:pl-6"
              }`}
            >
              <p className="text-[20px] sm:text-[20px] md:text-[12px] lg:text-[16px] xl:text-[20px] text-[#1e1e1e] dark:text-[#848484] ">
                {t("paneldashboard.unpaid_periods")}
              </p>
              <div className="p-1 md:px-1 md:py-0.5 sm:p-1 lg:p-0.5 xl:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer ">
                <Link to={"/userPanel/myReservedCourses"}>
                  <NorthWestIcon className="  !text-[24px] md:!text-[16px] lg:!text-[24px] text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white] duration-300 " />
                </Link>
              </div>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className={` text-[#008C78] text-[48px] sm:text-[48px] md:text-[40px] lg:text-[48px] pr-6 ${
                isRtl ? "" : "pl-6"
              } `}
            >
              {unpaidCount}
            </motion.span>
          </motion.div>

          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className="  h-full md:w-[35%] py-4 rounded-3xl bg-white dark:bg-[#454545] 
             relative flex flex-col md:block p-4"
          >
            <motion.div
              variants={headerVariants}
              className="  flex flex-row items-center gap-2  z-10"
            >
              <p className="text-[20px] sm:text-[20px] md:text-[12px] lg:text-[16px] xl:text-[20px] text-[#1e1e1e] dark:text-[#848484] whitespace-nowrap">
                {t("paneldashboard.profile_completed")}
              </p>
              <div className=" p-1 md:px-1 md:py-0.5 sm:p-1 lg:p-0.5 xl:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484]">
                <NorthWestIcon className="text-[#1e1e1e] !text-[24px] md:!text-[16px] lg:!text-[24px]  dark:text-[#848484]" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`  relative w-26 h-26 md:absolute md:top-10 md:w-14 md:h-14 
                lg:w-[21%] lg:h-[54%]
                flex items-center justify-center rounded-full mt-4 md:mt-4 lg:mt-3 xl:mt-3
                ${isRtl ? "2xl:mr-65" : "2xl:ml-65"}`}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                className="rotate-[-90deg]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#e5e5e5"
                  strokeWidth="7"
                  fill="transparent"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#008c78"
                  strokeWidth="7"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 46}
                  strokeDashoffset={2 * Math.PI * 46 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 46 * (1 - percentage / 100),
                  }}
                  transition={{ duration: 0.5 }}
                />
              </svg>

              <p className="absolute text-[#008c78] font-bold">{percentage}%</p>
            </motion.div>
          </motion.div>
        </div>
        <div className=" w-full md:h-[70%]  flex flex-col md:flex-row md:justify-between">
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className=" h-full mt-5 py-4 md:m-0 md:p-0 md:w-[49%] bg-[white]  rounded-3xl dark:bg-[#454545]  "
          >
            <motion.div
              variants={itemVariants}
              className={`  flex justify-start gap-3 sm:gap-5 sm:justify-start items-center   md:w-[100%] px-6 py-4 md:pr-6 ${
                isRtl ? "" : "md:pl-6 md:w-[65%]"
              }`}
            >
              <p
                className={` text-[18px] sm:text-[20px] md:text-[16px] lg:text-[20px] text-[#1e1e1e] dark:text-[#848484] ${
                  isRtl ? "" : "w-[100%]   "
                } `}
              >
                {t("paneldashboard.reserved_courses")}
              </p>
              <Link
                to={"/userPanel/myReservedCourses"}
                className={` hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer p-0.5 sm:p-1 md:p-0.5 lg:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] dark:text-[#848484]   ${
                  isRtl ? "" : "mr-20"
                } `}
              >
                <NorthWestIcon className="text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white]" />
              </Link>
            </motion.div>

            {latestCourses.map((item) => {
              const shortTitle =
                item.courseName.length > 31
                  ? item.courseName.slice(0, 31) + "…"
                  : item.courseName;

              const statusBg = item.accept ? "#D7FFE8" : "#FFD7D7";
              const statusColor = item.accept ? "#0FA958" : "#D93F3F";

              return (
                <DashboardCourseReserve
                  key={item.id}
                  image={
                    item.currentImageAddress &&
                    !item.currentImageAddress.includes("undefined") &&
                    !item.currentImageAddress.toLowerCase().includes("local") &&
                    !item.currentImageAddress.toLowerCase().includes("fakepath")
                      ? item.currentImageAddress
                      : img3
                  }
                  title={shortTitle}
                  status={
                    <span
                      className="px-[10px] py-[1px] rounded-[8px] text-[14px] md:text-[10px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px]"
                      style={{
                        color: statusColor,
                        backgroundColor: statusBg,
                      }}
                    >
                      {item.accept ? "تایید شده" : "تایید نشده"}
                    </span>
                  }
                />
              );
            })}
            <Link to="/userPanel/myReservedCourses">
              <motion.p
                variants={itemVariants}
                className="text-[16px] md:text-[14px] lg:text-[16px] text-[#848484] text-center cursor-pointer  "
              >
                {t("paneldashboard.view_all")}
              </motion.p>
            </Link>
          </motion.div>
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className=" h-full mt-5 py-4 md:m-0 md:p-0 md:w-[49%] bg-[white] rounded-3xl dark:bg-[#454545] "
          >
            <motion.div
              variants={itemVariants}
              className={` flex justify-start gap-3 md:gap-5  items-center   md:w-[100%] py-4 pr-6 ${
                isRtl ? "" : "pl-6 md:w-[65%]"
              }`}
            >
              <p
                className={` text-[18px] sm:text-[20px] md:text-[16px] lg:text-[20px] text-[#1e1e1e] dark:text-[#848484] ${
                  isRtl ? "" : "md:w-[40%]   "
                } `}
              >
                {t("paneldashboard.latest_news")}
              </p>
              <Link
                to={"/news"}
                className={` hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer p-0.5 sm:p-1 md:p-0.5 lg:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] ${
                  isRtl ? "ml-5" : "mr-30"
                } `}
              >
                <NorthWestIcon className="text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white]" />
              </Link>
            </motion.div>

            {sortedNews.map((item) => {
              const shortTitle =
                item.title.length > 29
                  ? item.title.slice(0, 29) + "…"
                  : item.title;

              return (
                <DashboardLatestNews
                  id={item.id}
                  image={
                    item.currentImageAddress &&
                    !item.currentImageAddress.includes("undefined") &&
                    item.currentImageAddress.startsWith("http") &&
                    !item.currentImageAddress.toLowerCase().includes("local") &&
                    !item.currentImageAddress.toLowerCase().includes("fakepath")
                      ? item.currentImageAddress
                      : img2
                  }
                  title={shortTitle}
                  date={new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(item.insertDate))}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelDashboard;
=======
import React, { useMemo } from "react";
import DashboardCourseReserve from "../../components/userpanel/DashboardCourseReserve/DashboardCourseReserve";
import DashboardLatestNews from "../../components/userpanel/DashboardLatestNews/DashboardLatestNews";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import getAllNews from "../../core/services/api/Get/News";
import img2 from "../../assets/Images/HTML5Course.png";
import img3 from "../../assets/Images/Rectanglee.png";
import { Link } from "react-router-dom";
import GetProfileInfo from "../../core/services/api/Get/GetProfileInfo";
import GetReservedDashboard from "../../core/services/api/Get/GetReservedDashboard";
import GetMyCourses from "../../core/services/api/Get/GetMyCourses";

const headerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const UserPanelDashboard = () => {
  const { data: resCourses } = useQuery({
    queryKey: ["resCourses"],
    queryFn: GetReservedDashboard,
  });

  const latestCourses = useMemo(() => {
    if (!resCourses) return [];
    return [...resCourses]
      .sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate))
      .slice(0, 3);
  }, [resCourses]);

  const { data: myCourses } = useQuery({
    queryKey: ["myCourses"],
    queryFn: GetMyCourses,
  });

  const unpaidCount =
    myCourses?.listOfMyCourses?.filter((c) => c.paymentStatus === "پرداخت نشده")
      .length ?? 0;

  const { data } = useQuery({
    queryKey: "getallnews",
    queryFn: getAllNews,
  });

  const sortedNews = useMemo(() => {
    if (!data?.news) return [];
    return [...data.news]
      .sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate))
      .slice(0, 3);
  }, [data]);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const { data: profileData } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: () => GetProfileInfo(),
  });

  const profileFields = [
    profileData?.fName,
    profileData?.lName,
    profileData?.nationalCode,
    profileData?.gender,
    profileData?.birthDay,
    profileData?.phoneNumber,
    profileData?.userAbout,
    profileData?.homeAdderess,
    profileData?.latitude,
    profileData?.longitude,
    profileData?.linkdinProfile,
    profileData?.telegramLink,
    profileData?.email,
    profileData?.currentPictureAddress,
  ];

  const filledFieldsCount = profileFields.filter(
    (field) => field !== undefined && field !== null && field !== "",
  ).length;

  const percentage = Math.round(
    (filledFieldsCount / profileFields.length) * 100,
  );

  return (
    <div className="  w-full bg-[#F3F4F6] mt-5 md:m-0 md:h-[85%] flex items-center rounded-4xl p-5 dark:bg-[#333] ">
      <div className="  w-full h-full flex flex-col justify-between ">
        <div className="  w-full h-[25%] flex flex-col gap-5 md:flex-row md:justify-between">
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className="  h-full md:w-[30%] rounded-3xl bg-white dark:bg-[#454545]  "
          >
            <motion.div
              variants={itemVariants}
              className={`  flex items-center gap-2 py-4 pr-6 md:py-3 md:pr-3 lg:py-0 lg:mt-5 lg:pr-6 ${
                isRtl ? "" : "pl-6 md:pl-3 lg:pl-6"
              }`}
            >
              <p className=" text-[20px] sm:text-[20px] md:text-[13px] lg:text-[16px] xl:text-[20px] text-[#1e1e1e] dark:text-[#848484] ">
                {t("paneldashboard.my_courses_title")}
              </p>
              <div className="p-1 md:px-1 md:py-0.5 sm:p-1 lg:p-0.5 xl:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer ">
                <Link to={"/userPanel/myCourses"}>
                  <NorthWestIcon className=" !text-[24px] md:!text-[16px] lg:!text-[24px]  text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white] duration-300 " />
                </Link>
              </div>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className={`  text-[#008C78] text-[48px] sm:text-[48px] md:text-[40px] lg:text-[48px] pr-6 ${
                isRtl ? "" : "pl-6"
              } `}
            >
              {myCourses?.listOfMyCourses?.length ?? 0}
            </motion.span>
          </motion.div>
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className="  h-full  md:w-[30%] rounded-3xl bg-white dark:bg-[#454545] "
          >
            <motion.div
              variants={itemVariants}
              className={`  flex items-center  px-2 sm:px-0 md:px-2 lg:px-0 gap-2 py-4 pr-6 md:py-3 md:pr-3 lg:py-0 lg:mt-5 lg:pr-2 xl:pr-6 ${
                isRtl ? "" : "pl-6 md:pl-3 lg:pl-2 xl:pl-6"
              }`}
            >
              <p className="text-[20px] sm:text-[20px] md:text-[12px] lg:text-[16px] xl:text-[20px] text-[#1e1e1e] dark:text-[#848484] ">
                {t("paneldashboard.unpaid_periods")}
              </p>
              <div className="p-1 md:px-1 md:py-0.5 sm:p-1 lg:p-0.5 xl:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer ">
                <Link to={"/userPanel/myReservedCourses"}>
                  <NorthWestIcon className="  !text-[24px] md:!text-[16px] lg:!text-[24px] text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white] duration-300 " />
                </Link>
              </div>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className={` text-[#008C78] text-[48px] sm:text-[48px] md:text-[40px] lg:text-[48px] pr-6 ${
                isRtl ? "" : "pl-6"
              } `}
            >
              {unpaidCount}
            </motion.span>
          </motion.div>

          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className="  h-full md:w-[35%] py-4 rounded-3xl bg-white dark:bg-[#454545] 
             relative flex flex-col md:block p-4"
          >
            <motion.div
              variants={headerVariants}
              className="  flex flex-row items-center gap-2  z-10"
            >
              <p className="text-[20px] sm:text-[20px] md:text-[12px] lg:text-[16px] xl:text-[20px] text-[#1e1e1e] dark:text-[#848484] whitespace-nowrap">
                {t("paneldashboard.profile_completed")}
              </p>
              <div className=" p-1 md:px-1 md:py-0.5 sm:p-1 lg:p-0.5 xl:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484]">
                <NorthWestIcon className="text-[#1e1e1e] !text-[24px] md:!text-[16px] lg:!text-[24px]  dark:text-[#848484]" />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`  relative w-26 h-26 md:absolute md:top-10 md:w-14 md:h-14 
                lg:w-[21%] lg:h-[54%]
                flex items-center justify-center rounded-full mt-4 md:mt-4 lg:mt-3 xl:mt-3
                ${isRtl ? "2xl:mr-65" : "2xl:ml-65"}`}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                className="rotate-[-90deg]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#e5e5e5"
                  strokeWidth="7"
                  fill="transparent"
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="#008c78"
                  strokeWidth="7"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 46}
                  strokeDashoffset={2 * Math.PI * 46 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 46 * (1 - percentage / 100),
                  }}
                  transition={{ duration: 0.5 }}
                />
              </svg>

              <p className="absolute text-[#008c78] font-bold">{percentage}%</p>
            </motion.div>
          </motion.div>
        </div>
        <div className=" w-full md:h-[70%]  flex flex-col md:flex-row md:justify-between">
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className=" h-full mt-5 py-4 md:m-0 md:p-0 md:w-[49%] bg-[white]  rounded-3xl dark:bg-[#454545]  "
          >
            <motion.div
              variants={itemVariants}
              className={`  flex justify-start gap-3 sm:gap-5 sm:justify-start items-center   md:w-[100%] px-6 py-4 md:pr-6 ${
                isRtl ? "" : "md:pl-6 md:w-[65%]"
              }`}
            >
              <p
                className={` text-[18px] sm:text-[20px] md:text-[16px] lg:text-[20px] text-[#1e1e1e] dark:text-[#848484] ${
                  isRtl ? "" : "w-[100%]   "
                } `}
              >
                {t("paneldashboard.reserved_courses")}
              </p>
              <Link
                to={"/userPanel/myReservedCourses"}
                className={` hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer p-0.5 sm:p-1 md:p-0.5 lg:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] dark:text-[#848484]   ${
                  isRtl ? "" : "mr-20"
                } `}
              >
                <NorthWestIcon className="text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white]" />
              </Link>
            </motion.div>

            {latestCourses.map((item) => {
              const shortTitle =
                item.courseName.length > 31
                  ? item.courseName.slice(0, 31) + "…"
                  : item.courseName;

              const statusBg = item.accept ? "#D7FFE8" : "#FFD7D7";
              const statusColor = item.accept ? "#0FA958" : "#D93F3F";

              return (
                <DashboardCourseReserve
                  key={item.id}
                  image={
                    item.currentImageAddress &&
                    !item.currentImageAddress.includes("undefined") &&
                    !item.currentImageAddress.toLowerCase().includes("local") &&
                    !item.currentImageAddress.toLowerCase().includes("fakepath")
                      ? item.currentImageAddress
                      : img3
                  }
                  title={shortTitle}
                  status={
                    <span
                      className="px-[10px] py-[1px] rounded-[8px] text-[14px] md:text-[10px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px]"
                      style={{
                        color: statusColor,
                        backgroundColor: statusBg,
                      }}
                    >
                      {item.accept ? "تایید شده" : "تایید نشده"}
                    </span>
                  }
                />
              );
            })}
            <Link to="/userPanel/myReservedCourses">
              <motion.p
                variants={itemVariants}
                className="text-[16px] md:text-[14px] lg:text-[16px] text-[#848484] text-center cursor-pointer  "
              >
                {t("paneldashboard.view_all")}
              </motion.p>
            </Link>
          </motion.div>
          <motion.div
            variants={headerVariants}
            initial="initial"
            animate="animate"
            className=" h-full mt-5 py-4 md:m-0 md:p-0 md:w-[49%] bg-[white] rounded-3xl dark:bg-[#454545] "
          >
            <motion.div
              variants={itemVariants}
              className={` flex justify-start gap-3 md:gap-5  items-center   md:w-[100%] py-4 pr-6 ${
                isRtl ? "" : "pl-6 md:w-[65%]"
              }`}
            >
              <p
                className={` text-[18px] sm:text-[20px] md:text-[16px] lg:text-[20px] text-[#1e1e1e] dark:text-[#848484] ${
                  isRtl ? "" : "md:w-[40%]   "
                } `}
              >
                {t("paneldashboard.latest_news")}
              </p>
              <Link
                to={"/news"}
                className={` hover:bg-[#008C78] hover:border-[#008C78] duration-300 cursor-pointer p-0.5 sm:p-1 md:p-0.5 lg:p-1 border-2 border-[#1E1E1E] rounded-full dark:border-[#848484] ${
                  isRtl ? "ml-5" : "mr-30"
                } `}
              >
                <NorthWestIcon className="text-[#1e1e1e] dark:text-[#848484] dark:hover:text-[white]" />
              </Link>
            </motion.div>

            {sortedNews.map((item) => {
              const shortTitle =
                item.title.length > 29
                  ? item.title.slice(0, 29) + "…"
                  : item.title;

              return (
                <DashboardLatestNews
                  id={item.id}
                  image={
                    item.currentImageAddress &&
                    !item.currentImageAddress.includes("undefined") &&
                    item.currentImageAddress.startsWith("http") &&
                    !item.currentImageAddress.toLowerCase().includes("local") &&
                    !item.currentImageAddress.toLowerCase().includes("fakepath")
                      ? item.currentImageAddress
                      : img2
                  }
                  title={shortTitle}
                  date={new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(item.insertDate))}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserPanelDashboard;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/pages/UserPanel/UserPanelDashboard.jsx
