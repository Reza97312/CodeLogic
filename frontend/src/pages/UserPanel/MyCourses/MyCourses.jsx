<<<<<<< HEAD:frontend/src/pages/UserPanel/MyCourses/MyCourses.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserPanelSearch from "../../../components/common/UserPanelSearch/UserPanelSearch";
import MyCourse from "../../../components/userPanel/MyCourse/MyCourse";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import GetMyCourses from "../../../core/services/api/Get/GetMyCourses";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import FavoritesSkeleton from "../../../components/common/skeleton/favorites/FavoritesSkeleton";

const MyCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const { data: myCoursesData, isLoading } = useQuery({
    queryKey: ["GETMYCOURSES", searchQuery, currentPage, coursesPerPage],
    queryFn: () =>
      GetMyCourses({
        Query: searchQuery,
        SortType: filterOption,
        RowsOfPage: coursesPerPage,
        PageNumber: currentPage,
      }),
  });

  const { t } = useTranslation();

  const allCourses = myCoursesData?.listOfMyCourses || [];
  const totalCount = myCoursesData?.totalCount || 0;

  const totalPages = Math.ceil(totalCount / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const paginatedCourses = allCourses.slice(startIndex, endIndex);
  const handlePageChange = (p) => {
    const selectedPage = p.selected + 1;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-10 h-[85%] p-8 bg-[#F3F4F6] rounded-4xl   dark:bg-[#333333]">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between items-center">
        <UserPanelSearch width={"md:w-[439px]"} handleSearch={handleSearch} />
        <div
          className="flex h-full items-center bg-[#ffff] dark:bg-[#454545] dark:text-[#ffff]
         rounded-xl border shadow p-2 md:p-1 border-[#EAEAEA] "
        >
          <span className="text-[16px] hidden md:inline ps-3">
            {t("coursesPayment.filters")}
          </span>
          <select
            value={filterOption}
            onChange={(e) => {
              setFilterOption(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl text-sm cursor-pointer  ps-2 text-gray-600   dark:bg-[#454545] dark:text-[#ffff] bg-[#ffff]"
          >
            <option value="">({t("favoriteNews.all")})</option>
            <option value="LastUpdate">
              ({t("favoriteCourses.lastUpdate")})
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[440px] p-6 bg-[#FFFFFF] rounded-2xl   dark:bg-[#454545]">
        <div className="flex flex-col gap-4 max-h-96 overflow-y-auto  ">
          <div
            className="hidden font-semibold text-base text-[#1E1E1E]    dark:text-[#CCCCCC]
            md:flex"
          >
            <div className="flex justify-start md:w-64">
              <span>{t("myCourses.title1")}</span>
            </div>
            <div className="flex justify-center md:w-50">
              <span>{t("myCourses.title2")}</span>
            </div>
            <div className="flex justify-center md:w-30">
              <span>{t("myCourses.title3")}</span>
            </div>
            <div className="flex justify-center md:w-36">
              <span>{t("myCourses.title4")}</span>
            </div>
            <div className="flex justify-center md:w-34">
              <span>{t("myCourses.title5")}</span>
            </div>
            <div className="flex justify-center md:w-32">
              <span>{t("myCourses.title6")}</span>
            </div>
          </div>
          {isLoading ? (
            [...Array(coursesPerPage)].map((_, index) => (
              <FavoritesSkeleton key={index + 2} />
            ))
          ) : totalCount > 0 ? (
            paginatedCourses.map((item, index) => {
              return <MyCourse item={item} key={index} />;
            })
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
        <div className="flex justify-between items-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            previousLabel="< "
            onPageChange={handlePageChange}
            pageCount={totalPages}
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
          <div className="flex items-center dark:bg-[#454545] dark:text-[#ffff] rounded-xl border shadow-md p-1 border-[#EAEAEA]  ">
            <span className="text-[16px] hidden md:inline">
              {t("favoriteNews.NumberShows")}
            </span>
            <select
              value={coursesPerPage}
              onChange={(e) => {
                setCoursesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className=" rounded-xl text-sm cursor-pointer px-3 py-1 dark:bg-[#454545] dark:text-[#ffff]"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
=======
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserPanelSearch from "../../../components/common/UserPanelSearch/UserPanelSearch";
import MyCourse from "../../../components/userPanel/MyCourse/MyCourse";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import GetMyCourses from "../../../core/services/api/Get/GetMyCourses";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import FavoritesSkeleton from "../../../components/common/skeleton/favorites/FavoritesSkeleton";

const MyCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const { data: myCoursesData, isLoading } = useQuery({
    queryKey: ["GETMYCOURSES", searchQuery, currentPage, coursesPerPage],
    queryFn: () =>
      GetMyCourses({
        Query: searchQuery,
        SortType: filterOption,
        RowsOfPage: coursesPerPage,
        PageNumber: currentPage,
      }),
  });

  const { t } = useTranslation();

  const allCourses = myCoursesData?.listOfMyCourses || [];
  const totalCount = myCoursesData?.totalCount || 0;

  const totalPages = Math.ceil(totalCount / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const paginatedCourses = allCourses.slice(startIndex, endIndex);
  const handlePageChange = (p) => {
    const selectedPage = p.selected + 1;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-10 h-[85%] p-8 bg-[#F3F4F6] rounded-4xl   dark:bg-[#333333]">
      <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between items-center">
        <UserPanelSearch width={"md:w-[439px]"} handleSearch={handleSearch} />
        <div
          className="flex h-full items-center bg-[#ffff] dark:bg-[#454545] dark:text-[#ffff]
         rounded-xl border shadow p-2 md:p-1 border-[#EAEAEA] "
        >
          <span className="text-[16px] hidden md:inline ps-3">
            {t("coursesPayment.filters")}
          </span>
          <select
            value={filterOption}
            onChange={(e) => {
              setFilterOption(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl text-sm cursor-pointer  ps-2 text-gray-600   dark:bg-[#454545] dark:text-[#ffff] bg-[#ffff]"
          >
            <option value="">({t("favoriteNews.all")})</option>
            <option value="LastUpdate">
              ({t("favoriteCourses.lastUpdate")})
            </option>
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-between h-[440px] p-6 bg-[#FFFFFF] rounded-2xl   dark:bg-[#454545]">
        <div className="flex flex-col gap-4 max-h-96 overflow-y-auto  ">
          <div
            className="hidden font-semibold text-base text-[#1E1E1E]    dark:text-[#CCCCCC]
            md:flex"
          >
            <div className="flex justify-start md:w-64">
              <span>{t("myCourses.title1")}</span>
            </div>
            <div className="flex justify-center md:w-50">
              <span>{t("myCourses.title2")}</span>
            </div>
            <div className="flex justify-center md:w-30">
              <span>{t("myCourses.title3")}</span>
            </div>
            <div className="flex justify-center md:w-36">
              <span>{t("myCourses.title4")}</span>
            </div>
            <div className="flex justify-center md:w-34">
              <span>{t("myCourses.title5")}</span>
            </div>
            <div className="flex justify-center md:w-32">
              <span>{t("myCourses.title6")}</span>
            </div>
          </div>
          {isLoading ? (
            [...Array(coursesPerPage)].map((_, index) => (
              <FavoritesSkeleton key={index + 2} />
            ))
          ) : totalCount > 0 ? (
            paginatedCourses.map((item, index) => {
              return <MyCourse item={item} key={index} />;
            })
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
        <div className="flex justify-between items-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            previousLabel="< "
            onPageChange={handlePageChange}
            pageCount={totalPages}
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
          <div className="flex items-center dark:bg-[#454545] dark:text-[#ffff] rounded-xl border shadow-md p-1 border-[#EAEAEA]  ">
            <span className="text-[16px] hidden md:inline">
              {t("favoriteNews.NumberShows")}
            </span>
            <select
              value={coursesPerPage}
              onChange={(e) => {
                setCoursesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className=" rounded-xl text-sm cursor-pointer px-3 py-1 dark:bg-[#454545] dark:text-[#ffff]"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/pages/UserPanel/MyCourses/MyCourses.jsx
