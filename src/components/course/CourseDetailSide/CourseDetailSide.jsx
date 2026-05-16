import React from "react";
import CourseInfo from "../CourseInfo/CourseInfo";
import UserSatisfaction from "../UserSatisfaction/UserSatisfaction";
import CourseTeacher from "../CourseTeacher/CourseTeacher";

const CourseDetailSide = ({ course }) => {
  return (
    <div
      className="flex flex-col  w-[100%] md:w-[35%] xl:w-[25%]  items-center md:items-start gap-4 
    lg:gap-12"
    >
      <CourseInfo course={course} />
      <UserSatisfaction course={course} />
      <CourseTeacher course={course} />
    </div>
  );
};

export default CourseDetailSide;
