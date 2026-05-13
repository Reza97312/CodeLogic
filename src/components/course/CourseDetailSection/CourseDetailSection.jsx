import React from "react";
import { useTranslation } from "react-i18next";
import Users from "../../../assets/Icons/Users";
import Clock from "../../../assets/Icons/Clock";
import Level from "../../../assets/Icons/Level";
import History from "../../../assets/Icons/History";
import CourseDetailSecItem from "./CourseDetailSecItem/CourseDetailSecItem";

const CourseDetailSection = ({ course }) => {
  const endDateShamsi = new Date(course.endTime).toLocaleDateString("fa-IR");

  const { t } = useTranslation();

  const courseDetailItem = [
    {
      id: 1,
      title: "تعداد دانشجو",
      courseNumber: course.studentCount,
      icon: Users,
    },
    { id: 2, title: "مدت زمان", courseNumber: endDateShamsi, icon: Clock },
    {
      id: 3,
      title: "سطح دوره",
      courseNumber: course.courseLevelName,
      icon: Level,
    },
    {
      id: 4,
      title: "وضعیت دوره",
      courseNumber: course.statusName ?? "",
      icon: History,
    },
  ];

  return (
    <div className="flex flex-col gap-8 pt-8 ">
      <h3 className="font-bold text-[18px] text-[#1E1E1E]  w-[85%] md:w-auto mx-auto md:mx-0  dark:text-[#DDDDDD]">
        {t("courseDetailSection.title")}
      </h3>
      <div
        className="flex-col
        
            md:flex md:flex-row md:gap-6
            "
      >
        {courseDetailItem.map((item, index) => (
          <CourseDetailSecItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default CourseDetailSection;
