// import React from "react";
// import CourseLevelFilter from "../CourseLevelFilter/CourseLevelFilter";
// import CourseTechFilter from "../CourseTechFilter/CourseTechFilter";
// import PriceFilter from "../PriceFilter/PriceFilter";
// import { useTranslation } from "react-i18next";
// import CourseNewsSearch from "../../common/CourseNewsSearch/CourseNewsSearch";
// import StartEndDate from "../StartEndDate/StartEndDate";

// const CourseListSide = ({
//   handleSearchSubmit,
//   handleSetStartDate,
//   handleSetEndDate,
//   handleSetCourseLevel,
//   handleSetTechnologies,
//   handleSetPrice,
// }) => {
//   const { t } = useTranslation();

//   return (
//     <div
//       className="w-full flex flex-col gap-4
//     md:w-[284px] "
//     >
//       <CourseNewsSearch handleSearchSubmit={handleSearchSubmit} />
//       <StartEndDate
//         handleSetStartDate={handleSetStartDate}
//         handleSetEndDate={handleSetEndDate}
//       />
//       <CourseLevelFilter handleSetCourseLevel={handleSetCourseLevel} />
//       <CourseTechFilter handleSetTechnologies={handleSetTechnologies} />
//       <PriceFilter handleSetPrice={handleSetPrice} />
//     </div>
//   );
// };

// export default CourseListSide;
import React from "react";
import CourseLevelFilter from "../CourseLevelFilter/CourseLevelFilter";
import CourseTechFilter from "../CourseTechFilter/CourseTechFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import CourseNewsSearch from "../../common/CourseNewsSearch/CourseNewsSearch";
import StartEndDate from "../StartEndDate/StartEndDate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CourseListSide = ({
  handleSearchSubmit,
  handleSetStartDate,
  handleSetEndDate,
  handleSetCourseLevel,
  handleSetTechnologies,
  handleSetPrice,
}) => {
  return (
    <div className="  w-full flex flex-col gap-4 md:w-[240px] lg:w-[284px]">
      <>
        <CourseNewsSearch handleSearchSubmit={handleSearchSubmit} />
        <StartEndDate
          handleSetStartDate={handleSetStartDate}
          handleSetEndDate={handleSetEndDate}
        />
        <CourseLevelFilter handleSetCourseLevel={handleSetCourseLevel} />
        <CourseTechFilter handleSetTechnologies={handleSetTechnologies} />
        <PriceFilter handleSetPrice={handleSetPrice} />
      </>
    </div>
  );
};

export default CourseListSide;
