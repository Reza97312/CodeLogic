import React from "react";
import { useTranslation } from "react-i18next";
import Linkedin from "../../../assets/Icons/LinkedIn";
import { Link, useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const SliderTeacher = ({ item }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      scale={1.02}
      perspective={900}
      transitionSpeed={1500}
      tiltReverse={true}
      glareEnable={true}
      glareMaxOpacity={0.25}
      glareColor="white"
      glarePosition="all"
      reset={true}
    >
      <div
        onClick={() => navigate(`/Teacher/${item.teacherId}`)}
        className="flex flex-col flex-shrink-0 items-center w-[350px] h-[346px] p-4 bg-[#FFFFFF] rounded-[20px] md:basis-[calc(25%-1rem)]  dark:bg-[#606060]
    transition-all duration-300 hover:scale-[1.02] hover:shadow-[0px_0px_10px_1px_#008c78]  "
      >
        <img
          src={item.pictureAddress}
          className="w-[313px] h-[183px] rounded-[20px]"
        />

        <div className="flex flex-col items-center gap-2 pt-2">
          <span className="font-bold text-base text-[#1E1E1E]   dark:text-[#EEEEEE]">
            {t(`${item.fullName}`)}
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={item.linkdinProfileLink}
              className="font-regular text-xs text-[#008C78]"
            >
              {t("پروفایل لینکدین")}
            </Link>
            <Linkedin />
          </div>
          <div className="flex pt-4 divide-x divide-[#EAEAEA]">
            <div className="flex flex-col items-center w-[98px]   dark:text-[#DDDDDD]">
              <span>{t(`${item.courseCounts}`)}</span>
              <span>{t("مقالات")}</span>
            </div>
            <div className="flex flex-col items-center w-[98px]   dark:text-[#DDDDDD]">
              <span>{t(`${item.courseCounts}`)}</span>
              <span>{t("دوره ها")}</span>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default SliderTeacher;
