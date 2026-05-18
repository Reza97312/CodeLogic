import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import GetAllTeachers from "../../../core/services/api/Get/GetAllTeachers";
import ButtonsSeeMore from "../../common/ButtonsSeeMore/ButtonsSeeMore";
import SliderTeacher from "../SliderTeacher/SliderTeacher";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
const SliderTeachers = () => {
  const { t } = useTranslation();

  const { data: teachersData } = useQuery({
    queryKey: ["GETALLTEACHERS"],
    queryFn: () => GetAllTeachers(),
  });

  const sliderRef = useRef();

  return (
    <div className="flex flex-col items-between gap-8 w-full  ">
      <div className="flex flex-col items-center gap-2 pt-[163px]  ">
        <h2
          className="font-bold text-[#008C78]
        sa:text-[24px]   sm:text-[28px]   lg:text-[32px]"
        >
          {t("sliderTeachers.title")}
        </h2>
        <p
          className="font-regular   dark:text-[#DDDDDD]
        sa:text-sm   sm:text-lg   lg:text-2xl"
        >
          {t("sliderTeachers.desc")}
        </p>
      </div>
      <ButtonsSeeMore
        seeAllText={t("sliderTeachers.seeAllText")}
        sliderRef={sliderRef}
        to={"teachers"}
      />
      <div
        className="flex flex-nowrap gap-5 overflow-hidden w-full pt-5 pb-5 px-10 scroll-smooth scrollbar-hide "
        dir="ltr"
        ref={sliderRef}
      >
        {teachersData?.map((item, index) => {
          return (
            <Tilt>
              <SliderTeacher item={item} key={index} />
            </Tilt>
          );
        })}
      </div>
    </div>
  );
};

export default SliderTeachers;
