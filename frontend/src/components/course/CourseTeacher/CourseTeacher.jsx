import React from "react";
import CourseTeacherIMG from "../../../assets/Images/courseteacher.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CourseTeacher = ({ course }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col items-center gap-8 w-[85%] md:w-full  p-4 bg-[#FFFFFF] rounded-[25px] 
        shadow-[0_0_10px_rgba(0,0,0,0.15)] 
        dark:bg-[#393939]
        lg:gap-12 2xl:w-[380px]"
    >
      <div className="flex flex-col gap-2 items-center">
        <img
          src={CourseTeacherIMG}
          className="w-[120px] h-[120px]
                lg:w-[168px] lg:h-[168px]"
        />
        <div className="flex flex-col items-center">
          <span className="font-regular text-base text-[#848484]   dark:text-[#CCCCCC]">
            {t("courseTeacher.courseTeacher")}
          </span>
          <h3 className="font-bold text-[18px] text-[#1E1E1E]   dark:text-[#DDDDDD]">
            {course.teacherName}
          </h3>
        </div>
      </div>
      <Link
        to={`/teacher/${course.teacherId}`}
        className="py-2 px-6  font-regular text-base text-[#FFFFFF] bg-[#000000] rounded-[48px] cursor-pointer
            2xl:py-[9px] 2xl:px-24"
      >
        {t("courseTeacher.buttonText")}
      </Link>
    </div>
  );
};

export default CourseTeacher;
