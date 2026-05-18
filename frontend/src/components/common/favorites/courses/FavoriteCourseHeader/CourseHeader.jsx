import React from "react";
import { useTranslation } from "react-i18next";

const CourseHeader = () => {
  const { t } = useTranslation();
  return (
    <div
      className=" dark:bg-[#454545] dark:text-[#ffff] w-full text-[16px] text-center font-semibold bg-[#ffff]
       rounded-t-4xl hidden md:flex items-center py-5 border-b border-[#EAEAEA] "
      style={{ direction: "rtl" }}
    >
      <div className="ps-8 flex-[1.5] text-right">
        {t("favoriteCourses.courseName")}
      </div>
      <div className=" ps-3 flex-[1.2] overflow-ellipsis text-right">
        {t("favoriteCourses.caption")}
      </div>
      <div className="px-4 flex-1">{t("favoriteCourses.meetingMode")}</div>
      <div className="px-4 flex-1">{t("favoriteCourses.lastUpdated")}</div>
      <div className="pe-8 w-[100px] text-left">
        {t("favoriteCourses.Operation")}
      </div>
    </div>
  );
};

export default CourseHeader;
