<<<<<<< HEAD:frontend/src/pages/CourseDetail/CourseDetail.jsx
import React, { useEffect } from "react";
import CourseDetailSide from "../../components/course/CourseDetailSide/CourseDetailSide";
import CourseDetailMain from "../../components/course/CourseDetailMain/CourseDetailMain";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getCourseById from "../../core/services/api/Get/getCourseById";
import CourseDetailSkeleton from "../../components/common/skeleton/CourseDetailSkeleton/CourseDetailSkeleton";

const CourseDetail = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { t } = useTranslation();

  const { id } = useParams();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["GETCOURSEBYID"],
    queryFn: () => getCourseById(id),
  });

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (!courseData) {
    return (
      <div className="p-10 text-center text-red-600">
        {t("دوره مورد نظر پیدا نشد.")}
      </div>
    );
  }

  const titleSlice =
    courseData.title.length > 20
      ? courseData.title.slice(0, 20) + "..."
      : courseData.title;

  return (
    <div className="flex flex-col items-center   dark:bg-[#1E1E1E] ">
      <div className="flex gap-1 text-[#008C78] pt-10 font-regular text-sm ">
        <Link to={"/"}>{t("courseDetailNav.landing")}</Link>
        {">"}
        <Link to={"/courseList"}>{t("courseDetailNav.courseList")}</Link>
        {">"}
        <span>{titleSlice}</span>
      </div>
      <div className="flex flex-col items-center pt-4 ">
        <h2 className="font-bold text-[22px] sm:text-[28px] text-[#1E1E1E]  dark:text-[#EEEEEE]">
          {titleSlice}
        </h2>
      </div>
      <div
        className="flex w-full md:justify-around lg:justify-center xl:justify-center flex-col gap-6 md:gap-0 lg:gap-12 pt-8 pb-[170px] 
      md:flex md:flex-row "
      >
        <CourseDetailSide course={courseData} />

        <CourseDetailMain courseId={id} course={courseData} />
      </div>
    </div>
  );
};

export default CourseDetail;
=======
import React, { useEffect } from "react";
import CourseDetailSide from "../../components/course/CourseDetailSide/CourseDetailSide";
import CourseDetailMain from "../../components/course/CourseDetailMain/CourseDetailMain";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getCourseById from "../../core/services/api/Get/getCourseById";
import CourseDetailSkeleton from "../../components/common/skeleton/CourseDetailSkeleton/CourseDetailSkeleton";

const CourseDetail = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { t } = useTranslation();

  const { id } = useParams();

  const { data: courseData, isLoading } = useQuery({
    queryKey: ["GETCOURSEBYID"],
    queryFn: () => getCourseById(id),
  });

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (!courseData) {
    return (
      <div className="p-10 text-center text-red-600">
        {t("دوره مورد نظر پیدا نشد.")}
      </div>
    );
  }

  const titleSlice =
    courseData.title.length > 20
      ? courseData.title.slice(0, 20) + "..."
      : courseData.title;

  return (
    <div className="flex flex-col items-center   dark:bg-[#1E1E1E] ">
      <div className="flex gap-1 text-[#008C78] pt-10 font-regular text-sm ">
        <Link to={"/"}>{t("courseDetailNav.landing")}</Link>
        {">"}
        <Link to={"/courseList"}>{t("courseDetailNav.courseList")}</Link>
        {">"}
        <span>{titleSlice}</span>
      </div>
      <div className="flex flex-col items-center pt-4 ">
        <h2 className="font-bold text-[22px] sm:text-[28px] text-[#1E1E1E]  dark:text-[#EEEEEE]">
          {titleSlice}
        </h2>
      </div>
      <div
        className="flex w-full md:justify-around lg:justify-center xl:justify-center flex-col gap-6 md:gap-0 lg:gap-12 pt-8 pb-[170px] 
      md:flex md:flex-row "
      >
        <CourseDetailSide course={courseData} />

        <CourseDetailMain courseId={id} course={courseData} />
      </div>
    </div>
  );
};

export default CourseDetail;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/pages/CourseDetail/CourseDetail.jsx
