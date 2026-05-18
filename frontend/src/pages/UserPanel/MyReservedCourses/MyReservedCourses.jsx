import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserPanelSearch from "../../../components/common/UserPanelSearch/UserPanelSearch";
import MyReservedCourse from "../../../components/userPanel/MyReservedCourse/MyReservedCourse";
import GetMyReservedCourses from "../../../core/services/api/get/GetMyReservedCourses";
import ReactPaginate from "react-paginate";
import { t } from "i18next";
import FavoritesSkeleton from "../../../components/common/skeleton/favorites/FavoritesSkeleton";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";

const MyReservedCourses = () => {
  const { data: myReservedCoursesData, isPending } = useQuery({
    queryKey: ["GETMYRESERVEDCOURSES"],
    queryFn: () =>
      GetMyReservedCourses({
        Query: searchQuery,
        SortType: "accept",
      }),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage, setCoursesPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("همه");

  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const reservedData = myReservedCoursesData || [];

  const filteredCourses = reservedData
    .filter((courses) => {
      const matchesTitle = courses.courseName
        .toLowerCase()
        .trim()
        .includes(searchQuery.trim().toLowerCase());

      return matchesTitle;
    })
    .sort((a, b) => {
      if (filterOption === "جدید ترین ها") {
        return new Date(b.insertDate) - new Date(a.insertDate);
      }
      return 0;
    });

  const currentCourses = filteredCourses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const handlePageChange = (p) => {
    const selectedPage = p.selected + 1;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  return (
    <div className="flex  flex-col gap-5 md:gap-10 lg:gap-0 h-[85%]   mt-5 md:mt-0 p-5 bg-[#F3F4F6] rounded-4xl  w-full sm:w-auto dark:bg-[#333333]">
      <div className="flex  flex-col gap-4 md:gap-0 md:flex-row md:justify-between items-center  w-full md:w-auto lg:w-[95%] lg:mx-auto">
        <UserPanelSearch width={"  md:w-[439px]"} handleSearch={handleSearch} />
        <div className=" flex flex-row justify-between sm:gap-5  w-full md:w-auto">
          <div
            className="flex h-full w-[60%] md:w-auto items-center bg-[#ffff] dark:bg-[#454545]  dark:text-[#ffff]
         rounded-xl border shadow p-2 md:p-1 border-[#EAEAEA] "
          >
            <span className="text-[16px] hidden lg:inline ps-3">
              {t("coursesPayment.filters")}
            </span>
            <select
              value={filterOption}
              onChange={(e) => {
                setFilterOption(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl text-sm cursor-pointer  w-[100%] md:w-auto  px-3 py-1  text-gray-600   
              dark:bg-[#454545] dark:text-[#ffff] bg-[#ffff]"
            >
              <option value="همه">({t("favoriteNews.all")})</option>

              <option value="جدید ترین ها">
                ({t("favoriteCourses.lastUpdate")})
              </option>
            </select>
          </div>
          <div className="flex items-center dark:bg-[#454545] dark:text-[#ffff] rounded-xl border shadow-md p-1 border-[#EAEAEA] ">
            <span className="text-[16px] hidden lg:inline">
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
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-[#f3f4f6]  p-3 md:overflow-y-auto lg:overflow-y-hidden  dark:bg-[#333] sm:p-4 md:p-5 lg:p-6">
        <div className="flex flex-col gap-4 lg:hidden ">
          {isPending ? (
            [...Array(coursesPerPage)].map((_, index) => (
              <FavoritesSkeleton key={index + 2} />
            ))
          ) : currentCourses.length > 0 ? (
            currentCourses.map((item, index) => (
              <MyReservedCourse type="mobile" item={item} key={index} />
            ))
          ) : (
            <div className="flex w-full flex-col items-center justify-center py-6">
              <Lottie
                className="h-[140px] w-[170px] sm:h-[160px] sm:w-[190px]"
                animationData={empty}
                loop={true}
              />
              <p className="text-center text-[16px] font-semibold text-black dark:text-[#848484] sm:text-[18px]">
                {t("navbar.notfound")}
              </p>
            </div>
          )}
        </div>

        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-[#EAEAEA] dark:border-[#5a5a5a]">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-[#FAFAFA] dark:bg-[#4B4B4B]">
                <tr>
                  <th className="w-[36%] border-b border-[#EAEAEA] px-4 py-4 text-right text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-5 xl:text-[14px] 2xl:text-[15px]">
                    {t("myReservedCourses.title1")}
                  </th>
                  <th className="w-[18%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                    {t("myReservedCourses.title2")}
                  </th>
                  <th className="w-[16%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                    {t("myReservedCourses.title3")}
                  </th>
                  <th className="w-[20%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                    {t("myReservedCourses.title4")}
                  </th>
                  <th className="w-[10%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:text-[14px] 2xl:text-[15px]">
                    {t("myReservedCourses.title5")}
                  </th>
                </tr>
              </thead>

              <tbody>
                {isPending ? (
                  [...Array(coursesPerPage)].map((_, index) => (
                    <tr key={index} className="bg-white dark:bg-[#454545]">
                      <td
                        colSpan={5}
                        className="border-b border-[#EAEAEA] px-4 py-4 dark:border-[#5a5a5a]"
                      >
                        <div className="grid grid-cols-[1.2fr_1fr_0.9fr_1fr_0.5fr] items-center gap-3 ">
                          <div className="h-14 rounded-full bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                          <div className="h-4 w-4/5 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                          <div className="mx-auto h-8 w-24 rounded-lg bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                          <div className="mx-auto h-4 w-28 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                          <div className="mx-auto h-8 w-16 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : currentCourses.length > 0 ? (
                  currentCourses.map((item, index) => (
                    <MyReservedCourse type="table" item={item} key={index} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex flex-col items-center justify-center py-10">
                        <Lottie
                          className="h-[180px] w-[220px]"
                          animationData={empty}
                          loop={true}
                        />
                        <p className="text-center text-[20px] font-semibold text-black dark:text-[#848484]">
                          {t("navbar.notfound")}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-5 lg:mt-2 xl:mt-5 flex justify-center lg:justify-start">
            <ReactPaginate
              breakLabel="..."
              nextLabel="›"
              previousLabel="‹"
              onPageChange={handlePageChange}
              pageCount={totalPages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              forcePage={currentPage - 1}
              containerClassName="flex flex-wrap items-center gap-2 cursor-pointer "
              pageClassName="list-none"
              pageLinkClassName="flex h-[38px] min-w-[38px] items-center justify-center rounded-xl bg-[#EAEAEA] px-3 text-sm font-bold text-black transition-all duration-200 hover:scale-105 dark:bg-[#555] dark:text-white sm:h-[42px] sm:min-w-[42px]  sm:text-base"
              activeLinkClassName="!bg-[#008C78] !text-white"
              previousClassName="list-none"
              nextClassName="list-none"
              previousLinkClassName="flex h-[38px] min-w-[38px] items-center justify-center rounded-xl bg-[#EAEAEA] text-xl font-bold text-black dark:bg-[#555] dark:text-white sm:h-[42px] sm:min-w-[42px]"
              nextLinkClassName="flex h-[38px] min-w-[38px] items-center justify-center rounded-xl bg-[#EAEAEA] text-xl font-bold text-black dark:bg-[#555] dark:text-white sm:h-[42px] sm:min-w-[42px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservedCourses;
