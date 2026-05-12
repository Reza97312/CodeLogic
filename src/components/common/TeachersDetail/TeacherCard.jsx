import React from "react";
import { useTranslation } from "react-i18next";
import Linkedin from "../../../assets/Icons/Linkedin";
import Tilt from "react-parallax-tilt";
import img1 from "../../../assets/Images/Ellipsee.png";
const TeacherCard = ({ item }) => {
  const { t } = useTranslation();
  return (
    <Tilt
      className="flex flex-col  items-center dark:border dark:border-[#EAEAEA] dark:bg-[#1E1E1E] dark:text-[#fff]  p-4 bg-[#FFFFFF] rounded-[20px] 
    transition-all duration-300 hover:scale-[1.02] hover:shadow-[0px_0px_10px_1px_#008c78]"
    >
      <img
        src={item?.pictureAddress || img1}
        className="w-[180px] h-[180px] object-cover rounded-full border-1"
      />

      <div className="flex flex-col items-center gap-2 pt-2">
        <span className="font-bold text-base text-[#1E1E1E]   dark:text-[#EEEEEE]">
          {t(`${item.fullName}`)}
        </span>
        <div className="flex items-center gap-2">
          <span className="font-regular text-xs dark:text-[#008C78] text-[#008C78]">
            {t("پروفایل لینکدین")}
          </span>
          <Linkedin />
        </div>
        <div className="flex pt-4 divide-x divide-[#EAEAEA]">
          <div className="flex flex-col items-center w-[98px]   dark:text-[#DDDDDD]">
            <span className="md:text-[14px] lg:text-[16px] ">
              {t(`${item.courseCounts}`)}
            </span>
            <span>{t("مقالات")}</span>
          </div>
          <div className="flex flex-col items-center w-[98px]   dark:text-[#DDDDDD]">
            <span className="md:text-[14px] lg:text-[16px] ">
              {t(`${item.courseCounts}`)}
            </span>
            <span>{t("دوره ها")}</span>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default TeacherCard;
