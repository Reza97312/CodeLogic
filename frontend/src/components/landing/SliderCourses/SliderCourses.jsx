import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import GetAllCourses from "../../../core/services/api/Get/GetAllCourses";
import CourseCardView1 from "../../common/CourseCardView1/CourseCardView1";
import ButtonsSeeMore from "../../common/ButtonsSeeMore/ButtonsSeeMore";
import compareManager from "../../compareManager/compareManager";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addFavCourses } from "../../../core/services/api/post/addFavCourses";
import { deleteFavCourses } from "../../../core/services/api/delete/deleteFavCourses";

const SliderCourses = () => {
  const navigate = useNavigate();
  const [comparedCourseIds, setComparedCourseIds] = useState(
    compareManager.get()
  );

  useEffect(() => {
    const unsubscribe = compareManager.subscribe((next) => {
      setComparedCourseIds(next);
      if (next.length === 2) {
        const url = `/comparison?course1=${next[0]}&course2=${next[1]}`;
        navigate(url);
        compareManager.clear();
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleToggleCompare = (courseId) => {
    compareManager.toggle(courseId);
  };

  const { t } = useTranslation();

  const { data: coursesData } = useQuery({
    queryKey: ["GETALLCOURSES"],
    queryFn: GetAllCourses,
  });

  const sliderRef = useRef();

  return (
    <div className="flex flex-col items-between gap-8 w-full pt-[104px]">
      <div className="flex flex-col items-center gap-2">
        <h2
          className="font-bold text-[#008C78]   dark:text-[#EEEEEE]]
                sa:text-[24px]   sm:text-[28px]   lg:text-[32px]"
        >
          {t("sliderCourses.title")}
        </h2>
        <p
          className="font-regular   dark:text-[#DDDDDD]
                sa:text-sm   sm:text-lg   lg:text-2xl"
        >
          {t("sliderCourses.desc")}
        </p>
      </div>
      <ButtonsSeeMore
        seeAllText={t("sliderCourses.seeAllText")}
        sliderRef={sliderRef}
        to={"/courseList"}
      />
      <div
        className="flex flex-nowrap gap-8 w-full py-4 px-10 overflow-hidden scroll-smooth scrollbar-hide"
        dir="ltr"
        ref={sliderRef}
      >
        {coursesData?.courseFilterDtos?.slice(0, 5).map((item, index) => {
          return (
            <CourseCardView1
              item={item}
              key={index}
              handleToggleCompare={handleToggleCompare}
              isCompared={comparedCourseIds.includes(item.courseId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SliderCourses;
