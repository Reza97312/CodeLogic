<<<<<<< HEAD:frontend/src/components/course/CourseDetailSection/CourseDetailSecItem/CourseDetailSecItem.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const CourseDetailSecItem = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex  flex-col  justify-center items-center gap-2 w-[85%] mx-auto md:mx-0 h-[81px] mt-4 bg-[#FFFFFF] rounded-[20px]
    dark:bg-[#393939]
    md:w-[160px]
    lg:w-[186px]
    xl:w-[250px]
    "
    >
      <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
        {t(`${item.title}`)}
      </span>
      <div className="flex flex-col items-center">
        <span className="dark:text-[#BBBBBB]">
          <item.icon />
        </span>
        <span className="dark:text-[#898989]">{item.courseNumber}</span>
      </div>
    </div>
  );
};

export default CourseDetailSecItem;
=======
import React from "react";
import { useTranslation } from "react-i18next";

const CourseDetailSecItem = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex  flex-col  justify-center items-center gap-2 w-[85%] mx-auto md:mx-0 h-[81px] mt-4 bg-[#FFFFFF] rounded-[20px]
    dark:bg-[#393939]
    md:w-[160px]
    lg:w-[186px]
    xl:w-[250px]
    "
    >
      <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
        {t(`${item.title}`)}
      </span>
      <div className="flex flex-col items-center">
        <span className="dark:text-[#BBBBBB]">
          <item.icon />
        </span>
        <span className="dark:text-[#898989]">{item.courseNumber}</span>
      </div>
    </div>
  );
};

export default CourseDetailSecItem;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/course/CourseDetailSection/CourseDetailSecItem/CourseDetailSecItem.jsx
