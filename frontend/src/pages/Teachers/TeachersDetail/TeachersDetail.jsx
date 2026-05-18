<<<<<<< HEAD:frontend/src/pages/Teachers/TeachersDetail/TeachersDetail.jsx
import { Link, useParams } from "react-router-dom";
import TeacherCard from "../../../components/common/TeachersDetail/TeacherCard";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SliderButtons from "../../../components/common/sliders/buttons/sliderButtons";
import DetailCard from "../../../components/common/TeachersDetail/DetailCard";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import GetAllCourses from "../../../core/services/api/Get/GetAllCourses";
import searchIcon from "../../../assets/Icons/A/search.png";
import { getDetail } from "../../../core/services/api/Get/GetTeachersDetail";
import GetCoursesPaginate from "../../../core/services/api/Get/GetCoursesByPaginatio";
import TeacherSkeleton from "../../../components/common/skeleton/TeachersDetail/TeacherSkeleton";
import DetailSkeleton from "../../../components/common/skeleton/TeachersDetail/DetailSkeleton";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import Tilt from "react-parallax-tilt";
const TeachersDetail = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { id } = useParams();
  const teacherId = parseInt(id);
  //// get teacherDetail by id ////
  const { data: teacher = {}, isPending: isTeacherLoading } = useQuery({
    queryKey: ["GETTEACHERDETAIL", teacherId],
    queryFn: () => getDetail(teacherId),
  });

  const [tempSearch, setTempSearch] = useState("");
  const [tempCount, setTempCount] = useState();

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(12);
  //// get courses ////
  const { data: coursesData = {}, isPending: isCoursesLoading } = useQuery({
    queryKey: [
      "COURSESDATAPAGINATE",
      teacherId,
      currentPage,
      coursesPerPage,
      query,
    ],
    queryFn: () =>
      GetCoursesPaginate({ currentPage, coursesPerPage, query, teacherId }),
  });
  //// pagination ////
  const courses = coursesData?.courseFilterDtos || [];
  const totalPage = Math.ceil(courses.length / coursesPerPage);
  const handlePageChange = (p) => {
    const selectedPage = p.selected + 1;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const applyFilter = () => {
    setCurrentPage(1);
    setQuery(tempSearch);
    setCoursesPerPage(tempCount);
  };

  const fadeInUp = (delay) => ({
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  });

  const sliderRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <motion.div
        variants={fadeInUp(0.35)}
        initial="hidden"
        animate="visible"
        className="flex flex-col p-[16px] items-center justify-center gap-8  dark:bg-[#1E1E1E]"
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex gap-4 text-[#008C78] text-[14px] ">
            <Link
              to={"/"}
              className="hover:text-blue-500 transition duration-300"
            >
              {t("teachersPage.titles.HomePage")}
            </Link>
            <span>&gt;</span>
            <Link
              to={"/Teachers"}
              className="hover:text-blue-500 transition duration-300"
            >
              {t("teachersPage.titles.Teachers")}
            </Link>
            <span>&gt;</span>
            {isCoursesLoading && isTeacherLoading ? (
              <Skeleton width={80} height={40} />
            ) : (
              <Link className="hover:text-blue-500 transition duration-300">
                {teacher.fullName}
              </Link>
            )}
          </div>
          {isCoursesLoading && isTeacherLoading ? (
            <Skeleton width={128} height={40} />
          ) : (
            <h2 className="text-[#1E1E1E] text-[32px] font-bold dark:text-white ">
              {teacher.fullName}
            </h2>
          )}
        </div>
        <div className=" flex flex-col md:flex-row md:flex-nowrap gap-10 w-full  justify-between pt-4 pb-20 ">
          {isTeacherLoading ? (
            <div className="w-[80%] flex items-center justify-center md:block md:w-[23%] mx-auto md:mx-0 ">
              <TeacherSkeleton />
            </div>
          ) : (
            <div className="w-[80%] md:w-[23%] mx-auto md:mx-0 ">
              <TeacherCard item={teacher} />
            </div>
          )}
          <div className="w-[100%]  md:w-[80%] flex flex-col justify-center mx-auto md:mx-0">
            <div
              className=" flex flex-col md:flex-row dark:text-[#EEEEEE] dark:border dark:border-[#EAEAEA]   dark:bg-[#1E1E1E]
                             bg-[#ffff] md:h-[72px] w-[80%] md:w-full shadow-md  rounded-[15px]
                              items-center md:justify-between md:px-5 py-3 mx-auto md:mx-0 "
            >
              {/* ///// filtering //// */}
              <div className="flex flex-col md:flex-row gap-4 md:w-[60%] h-full items-center md:justify-between ">
                <div className=" md:w-[100%] lg:w-[78%] h-full flex justify-center   ">
                  <motion.input
                    whileFocus={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    transition={{ duration: 0.3 }}
                    className={` px-3 py-2 md:py-0 w-[90%] md:w-full  h-full dark:placeholder:text-[#EEEE] outline-none border-[#EAEAEA] border-[1px]
                                             ${
                                               isRTL
                                                 ? "bg-[left_15px_center]"
                                                 : "bg-[right_15px_center]"
                                             }  bg-no-repeat rounded-2xl `}
                    style={{ backgroundImage: `url(${searchIcon})` }}
                    placeholder={t("teachersPage.filters.Search")}
                    type="text"
                    onChange={(e) => {
                      setTempSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && applyFilter();
                    }}
                    value={tempSearch}
                  />
                </div>
                <div className=" flex md:w-[100%] lg:w-[40%] xl:w-[24%] items-center h-full dark:bg-[#1E1E1E] dark:text-[#ffff] rounded-xl border shadow p-1  border-[#EAEAEA] ">
                  <span className="text-[16px] ps-1 ">
                    {t("teachersPage.filters.ShowMore")}
                  </span>
                  <select
                    value={tempCount}
                    onChange={(e) => {
                      setTempCount(Number(e.target.value));
                    }}
                    className=" rounded-xl text-sm cursor-pointer px-2 py-1 dark:bg-[#1E1E1E] dark:text-[#ffff]"
                  >
                    <option value={16}>16</option>
                    <option value={22}>22</option>
                    <option value={28}>28</option>
                  </select>
                </div>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={applyFilter}
                className="text-center text-[14px] text-[#ffff] h-full md:w-[11%] px-4 py-2 md:p-0 mt-3 md:m-0 rounded-2xl bg-[#008C78] "
              >
                {t("teachersPage.filters.search")}
              </motion.button>
            </div>
            {/* //// responsive //// */}
            <div className="block md:hidden">
              <SliderButtons sliderRef={sliderRef} />
            </div>
            {/* //// cards //// */}
            <div
              ref={sliderRef}
              className="w-full flex flex-nowrap justify-items-start my-3 md:my-0 md:mt-4 md:flex-wrap  overflow-y-hidden
                               px-3  overflow-x-auto scroll-smooth pt-5 pb-6 gap-4 "
              style={{ direction: "ltr" }}
            >
              {isCoursesLoading &&
                [...Array(coursesPerPage)].map((item, index) => (
                  <DetailSkeleton key={index + 2} />
                ))}
              {!isCoursesLoading && courses.length > 0 ? (
                courses.map((item, index) => (
                  <DetailCard item={item} key={index} />
                ))
              ) : (
                <div className="w-full">
                  <Lottie
                    className="w-[200px] h-[170px] my-4 mx-auto"
                    animationData={empty}
                    loop={true}
                  />
                  <p className="font-semibold text-[black] text-[20px] text-center dark:text-[#848484]">
                    {t("navbar.notfound")}
                  </p>
                </div>
              )}
            </div>
            {/* //// buttons //// */}
            <div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                previousLabel="< "
                onPageChange={handlePageChange}
                pageCount={totalPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                forcePage={currentPage - 1}
                containerClassName="flex flex-wrap justify-center gap-1 sm:gap-2"
                pageClassName="px-3 py-2 sm:px-5 sm:py-3 rounded-[15px] font-semibold shadow-md cursor-pointer text-sm sm:text-xl bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                activeClassName="!bg-[#008C78] text-white rounded-2xl shadow-md"
                previousClassName="px-2 py-1 sm:px-3 sm:py-1 rounded-2xl shadow-md cursor-pointer text-sm bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                nextClassName="px-2 py-1 sm:px-3 sm:py-1 rounded-2xl shadow-md cursor-pointer text-sm bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                previousLinkClassName="font-bold text-lg sm:text-2xl px-1 sm:px-2 py-1 flex items-center justify-center h-full w-full"
                nextLinkClassName="font-bold text-lg sm:text-2xl px-1 sm:px-2 py-1 flex items-center justify-center h-full w-full"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeachersDetail;
=======
import { Link, useParams } from "react-router-dom";
import TeacherCard from "../../../components/common/TeachersDetail/TeacherCard";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SliderButtons from "../../../components/common/sliders/buttons/sliderButtons";
import DetailCard from "../../../components/common/TeachersDetail/DetailCard";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import GetAllCourses from "../../../core/services/api/Get/GetAllCourses";
import searchIcon from "../../../assets/Icons/A/search.png";
import { getDetail } from "../../../core/services/api/Get/GetTeachersDetail";
import GetCoursesPaginate from "../../../core/services/api/Get/GetCoursesByPaginatio";
import TeacherSkeleton from "../../../components/common/skeleton/TeachersDetail/TeacherSkeleton";
import DetailSkeleton from "../../../components/common/skeleton/TeachersDetail/DetailSkeleton";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import Tilt from "react-parallax-tilt";
const TeachersDetail = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { id } = useParams();
  const teacherId = parseInt(id);
  //// get teacherDetail by id ////
  const { data: teacher = {}, isPending: isTeacherLoading } = useQuery({
    queryKey: ["GETTEACHERDETAIL", teacherId],
    queryFn: () => getDetail(teacherId),
  });

  const [tempSearch, setTempSearch] = useState("");
  const [tempCount, setTempCount] = useState();

  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(12);
  //// get courses ////
  const { data: coursesData = {}, isPending: isCoursesLoading } = useQuery({
    queryKey: [
      "COURSESDATAPAGINATE",
      teacherId,
      currentPage,
      coursesPerPage,
      query,
    ],
    queryFn: () =>
      GetCoursesPaginate({ currentPage, coursesPerPage, query, teacherId }),
  });
  //// pagination ////
  const courses = coursesData?.courseFilterDtos || [];
  const totalPage = Math.ceil(courses.length / coursesPerPage);
  const handlePageChange = (p) => {
    const selectedPage = p.selected + 1;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const applyFilter = () => {
    setCurrentPage(1);
    setQuery(tempSearch);
    setCoursesPerPage(tempCount);
  };

  const fadeInUp = (delay) => ({
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  });

  const sliderRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <motion.div
        variants={fadeInUp(0.35)}
        initial="hidden"
        animate="visible"
        className="flex flex-col p-[16px] items-center justify-center gap-8  dark:bg-[#1E1E1E]"
      >
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex gap-4 text-[#008C78] text-[14px] ">
            <Link
              to={"/"}
              className="hover:text-blue-500 transition duration-300"
            >
              {t("teachersPage.titles.HomePage")}
            </Link>
            <span>&gt;</span>
            <Link
              to={"/Teachers"}
              className="hover:text-blue-500 transition duration-300"
            >
              {t("teachersPage.titles.Teachers")}
            </Link>
            <span>&gt;</span>
            {isCoursesLoading && isTeacherLoading ? (
              <Skeleton width={80} height={40} />
            ) : (
              <Link className="hover:text-blue-500 transition duration-300">
                {teacher.fullName}
              </Link>
            )}
          </div>
          {isCoursesLoading && isTeacherLoading ? (
            <Skeleton width={128} height={40} />
          ) : (
            <h2 className="text-[#1E1E1E] text-[32px] font-bold dark:text-white ">
              {teacher.fullName}
            </h2>
          )}
        </div>
        <div className=" flex flex-col md:flex-row md:flex-nowrap gap-10 w-full  justify-between pt-4 pb-20 ">
          {isTeacherLoading ? (
            <div className="w-[80%] flex items-center justify-center md:block md:w-[23%] mx-auto md:mx-0 ">
              <TeacherSkeleton />
            </div>
          ) : (
            <div className="w-[80%] md:w-[23%] mx-auto md:mx-0 ">
              <TeacherCard item={teacher} />
            </div>
          )}
          <div className="w-[100%]  md:w-[80%] flex flex-col justify-center mx-auto md:mx-0">
            <div
              className=" flex flex-col md:flex-row dark:text-[#EEEEEE] dark:border dark:border-[#EAEAEA]   dark:bg-[#1E1E1E]
                             bg-[#ffff] md:h-[72px] w-[80%] md:w-full shadow-md  rounded-[15px]
                              items-center md:justify-between md:px-5 py-3 mx-auto md:mx-0 "
            >
              {/* ///// filtering //// */}
              <div className="flex flex-col md:flex-row gap-4 md:w-[60%] h-full items-center md:justify-between ">
                <div className=" md:w-[100%] lg:w-[78%] h-full flex justify-center   ">
                  <motion.input
                    whileFocus={{
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    }}
                    transition={{ duration: 0.3 }}
                    className={` px-3 py-2 md:py-0 w-[90%] md:w-full  h-full dark:placeholder:text-[#EEEE] outline-none border-[#EAEAEA] border-[1px]
                                             ${
                                               isRTL
                                                 ? "bg-[left_15px_center]"
                                                 : "bg-[right_15px_center]"
                                             }  bg-no-repeat rounded-2xl `}
                    style={{ backgroundImage: `url(${searchIcon})` }}
                    placeholder={t("teachersPage.filters.Search")}
                    type="text"
                    onChange={(e) => {
                      setTempSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && applyFilter();
                    }}
                    value={tempSearch}
                  />
                </div>
                <div className=" flex md:w-[100%] lg:w-[40%] xl:w-[24%] items-center h-full dark:bg-[#1E1E1E] dark:text-[#ffff] rounded-xl border shadow p-1  border-[#EAEAEA] ">
                  <span className="text-[16px] ps-1 ">
                    {t("teachersPage.filters.ShowMore")}
                  </span>
                  <select
                    value={tempCount}
                    onChange={(e) => {
                      setTempCount(Number(e.target.value));
                    }}
                    className=" rounded-xl text-sm cursor-pointer px-2 py-1 dark:bg-[#1E1E1E] dark:text-[#ffff]"
                  >
                    <option value={16}>16</option>
                    <option value={22}>22</option>
                    <option value={28}>28</option>
                  </select>
                </div>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={applyFilter}
                className="text-center text-[14px] text-[#ffff] h-full md:w-[11%] px-4 py-2 md:p-0 mt-3 md:m-0 rounded-2xl bg-[#008C78] "
              >
                {t("teachersPage.filters.search")}
              </motion.button>
            </div>
            {/* //// responsive //// */}
            <div className="block md:hidden">
              <SliderButtons sliderRef={sliderRef} />
            </div>
            {/* //// cards //// */}
            <div
              ref={sliderRef}
              className="w-full flex flex-nowrap justify-items-start my-3 md:my-0 md:mt-4 md:flex-wrap  overflow-y-hidden
                               px-3  overflow-x-auto scroll-smooth pt-5 pb-6 gap-4 "
              style={{ direction: "ltr" }}
            >
              {isCoursesLoading &&
                [...Array(coursesPerPage)].map((item, index) => (
                  <DetailSkeleton key={index + 2} />
                ))}
              {!isCoursesLoading && courses.length > 0 ? (
                courses.map((item, index) => (
                  <DetailCard item={item} key={index} />
                ))
              ) : (
                <div className="w-full">
                  <Lottie
                    className="w-[200px] h-[170px] my-4 mx-auto"
                    animationData={empty}
                    loop={true}
                  />
                  <p className="font-semibold text-[black] text-[20px] text-center dark:text-[#848484]">
                    {t("navbar.notfound")}
                  </p>
                </div>
              )}
            </div>
            {/* //// buttons //// */}
            <div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                previousLabel="< "
                onPageChange={handlePageChange}
                pageCount={totalPage}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                forcePage={currentPage - 1}
                containerClassName="flex flex-wrap justify-center gap-1 sm:gap-2"
                pageClassName="px-3 py-2 sm:px-5 sm:py-3 rounded-[15px] font-semibold shadow-md cursor-pointer text-sm sm:text-xl bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                activeClassName="!bg-[#008C78] text-white rounded-2xl shadow-md"
                previousClassName="px-2 py-1 sm:px-3 sm:py-1 rounded-2xl shadow-md cursor-pointer text-sm bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                nextClassName="px-2 py-1 sm:px-3 sm:py-1 rounded-2xl shadow-md cursor-pointer text-sm bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                previousLinkClassName="font-bold text-lg sm:text-2xl px-1 sm:px-2 py-1 flex items-center justify-center h-full w-full"
                nextLinkClassName="font-bold text-lg sm:text-2xl px-1 sm:px-2 py-1 flex items-center justify-center h-full w-full"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeachersDetail;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/pages/Teachers/TeachersDetail/TeachersDetail.jsx
