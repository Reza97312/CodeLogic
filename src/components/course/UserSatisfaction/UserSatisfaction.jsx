import React from "react";
import { useTranslation } from "react-i18next";
import StarsRating from "../StarsRating/StarsRating";

const UserSatisfaction = ({ course }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div
      className="flex flex-col gap-4 w-[85%] md:w-full  p-4 bg-[#FFFFFF] rounded-[25px] shadow-[0_0_10px_rgba(0,0,0,0.15)]
    dark:bg-[#393939]
    lg:gap-[20px] 2xl:w-[380px]"
    >
      <h3 className="font-bold text-lg text-[#1E1E1E]   dark:text-[#FFFFFF]">
        {t("userSatisfaction.title")}
      </h3>
      <div className="flex justify-between">
        <StarsRating course={course} />
        <div
          className={`flex gap-1 font-regular text-base text-[#848484]   dark:text-[#CCCCCC] ${isRtl ? "rtl" : "ltr"}`}
        >
          <span>{Math.floor(course.courseRate)}</span>
          <span>{t("userSatisfaction.score")}</span>
        </div>
      </div>
    </div>
  );
};

export default UserSatisfaction;
