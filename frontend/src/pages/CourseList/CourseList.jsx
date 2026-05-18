import React, { useEffect, useState } from "react";
import CourseListSide from "../../components/course/CourseListSide/CourseListSide";
import CourseListMain from "../../components/course/CourseListMain/CourseListMain";
import GetAllCourses from "../../core/services/api/Get/GetAllCourses";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const CourseList = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchSubmit = (searchTerm) => {
    setSearchQuery(searchTerm);
    setCurrentPage(0);
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleSetStartDate = (startDate) => {
    setStartDate(startDate);
    setCurrentPage(0);
  };
  const handleSetEndDate = (endDate) => {
    setEndDate(endDate);
    setCurrentPage(0);
  };

  const [courseLevel, setCourseLevel] = useState();
  const handleSetCourseLevel = (courseLevel) => {
    setCourseLevel(courseLevel);
    setCurrentPage(0);
  };

  const [teachers, setTeachers] = useState("");
  const handleSetTeachers = (teachers) => {
    setTeachers(teachers);
    setCurrentPage(0);
  };

  const [technologies, setTechnologies] = useState("");
  const handleSetTechnologies = (technologies) => {
    setTechnologies(technologies);
    setCurrentPage(0);
  };

  const [price, setPrice] = useState([0, 10000000]);
  const handleSetPrice = (price) => {
    setPrice(price);
    setCurrentPage(0);
  };

  const [sortType, setSortType] = useState("ASC");

  const { data: coursesData, isLoading } = useQuery({
    queryKey: [
      "GETALLCOURSES",
      searchQuery,
      sortType,
      courseLevel,
      teachers,
      price,
      startDate,
      endDate,
    ],
    queryFn: () =>
      GetAllCourses({
        RowsOfPage: 10000,
        PageNumber: 1,
        Query: searchQuery,
        SortingCol: "startTime",
        SortType: "DESC",
        StartDate: startDate,
        EndDate: endDate,
        courseLevelId: courseLevel,
        teacherName: teachers,
        technologyList: "",
        CostDown: price[0],
        CostUp: price[1],
      }),
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    setSearchQuery(search);
  }, [location.search]);

  const filteredCourses =
    coursesData?.courseFilterDtos?.filter((course) => {
      let dateCondition = true;
      if (startDate && endDate) {
        const courseStartDateStr = course.startTime.slice(0, 10);
        const courseEndDateStr = course.endTime.slice(0, 10);
        const userStartDateStr = startDate.slice(0, 10);
        const userEndDateStr = endDate.slice(0, 10);

        dateCondition =
          courseStartDateStr <= userStartDateStr &&
          courseEndDateStr >= userEndDateStr;
      }

      let techCondition = true;
      if (technologies && technologies.length > 0) {
        const selectedTechs = technologies.split(",");
        const courseTechsStr = (course.technologyList || "").toLowerCase();

        techCondition = selectedTechs.every((tech) =>
          courseTechsStr.includes(tech.toLowerCase()),
        );
      }

      return dateCondition && techCondition;
    }) || [];

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    const dateA = new Date(a.startTime);
    const dateB = new Date(b.startTime);

    if (sortType === "DESC") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const itemOffset = currentPage * pageSize;
  const endOffset = itemOffset + pageSize;
  const currentItems = sortedCourses.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sortedCourses.length / pageSize);

  let result = sortedCourses.length;

  return (
    <div className="flex flex-col items-center w-full dark:bg-[#1E1E1E] ">
      {isLoading ? (
        <>
          <div className="flex gap-1 pt-10 font-regular text-sm">
            <Skeleton width={80} height={14} />
            <Skeleton width={100} height={14} />
          </div>
          <div className="flex flex-col items-center gap-2 pt-4 md:flex md:flex-row">
            <Skeleton width={200} height={32} />
            <Skeleton width={100} height={16} />
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-1 text-[#008C78] pt-10 font-regular text-sm ">
            <Link to={"/"}>{t("courseListNav.landing")}</Link>
            {">"}
            <span to={"/courseList"}>{t("courseListNav.courseList")}</span>
          </div>
          <div className="flex flex-col items-center gap-2 pt-4 md:flex md:flex-row">
            <h2 className="font-bold text-[32px] text-[#1E1E1E] dark:text-[#EEEEEE]">
              {t("courseList.title")}
            </h2>
            <span className="font-regular text-base text-[#848484] dark:text-[#DDDDDD]">
              {`${result} ${t("courseList.result")}`}
            </span>
          </div>
        </>
      )}

      <div className="flex flex-col items-center gap-4 w-full pt-8 px-10 md:flex md:flex-row md:items-start md:gap-8 ">
        <CourseListSide
          handleSearchSubmit={handleSearchSubmit}
          handleSetStartDate={handleSetStartDate}
          handleSetEndDate={handleSetEndDate}
          handleSetCourseLevel={handleSetCourseLevel}
          handleSetTeachers={handleSetTeachers}
          handleSetTechnologies={handleSetTechnologies}
          handleSetPrice={handleSetPrice}
          isLoading={isLoading}
        />

        <CourseListMain
          coursesData={{ ...coursesData, courseFilterDtos: currentItems }}
          isLoading={isLoading}
          searchQuery={searchQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sortType={sortType}
          setSortType={setSortType}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default CourseList;
