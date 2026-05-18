import React from "react";
import { useTranslation } from "react-i18next";

const CourseDesc = ({ course }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2 pt-10  w-[85%] md:w-auto mx-auto md:mx-0 ">
      <h3 className="font-bold text-[18px] text-[#1E1E1E]   dark:text-[#DDDDDD]">
        {t("courseDesc.description")}
      </h3>
      <p className="font-regular text-base text-[#848484] break-words  dark:text-[#CCCCCC]">
        {course.describe}
      </p>
    </div>
  );
};

export default CourseDesc;
