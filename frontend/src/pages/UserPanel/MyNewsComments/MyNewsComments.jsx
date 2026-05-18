import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserPanelSearch from "../../../components/common/UserPanelSearch/UserPanelSearch";
import UserPanelTitle from "../../../components/common/UserPanelTitle/UserPanelTitle";
import MyNewsComment from "../../../components/userpanel/MyNewsComment/MyNewsComment";
import myNewsComments from "../../../core/services/api/get/myNewsComments";
import ReactPaginate from "react-paginate";
import { t } from "i18next";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import FavoritesSkeleton from "../../../components/common/skeleton/favorites/FavoritesSkeleton";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";
import searchIcon from "../../../assets/Icons/A/search.png";
import { useTranslation } from "react-i18next";
const MyNewsComments = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [query] = useDebounce(searchQuery, 600);
  const [filterOption, setFilterOption] = useState("all");

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const { data: myNewsCommentsData, isLoading } = useQuery({
    queryKey: ["MYNEWSCOMMENTS"],
    queryFn: () => myNewsComments(),
  });

  const allComments = myNewsCommentsData?.myNewsCommetDtos || [];
  const normalizedQuery = query.trim().toLowerCase();

  const filteredComments = allComments
    .filter((comment) => {
      const describe = comment?.describe?.toLowerCase() || "";
      const title = comment?.title?.toLowerCase() || "";

      const matchesSearch =
        !normalizedQuery ||
        describe.includes(normalizedQuery) ||
        title.includes(normalizedQuery);

      return matchesSearch;
    })
    .sort((a, b) => {
      if (filterOption === "جدید ترین ها") {
        return new Date(b.inserDate) - new Date(a.inserDate);
      }

      if (filterOption === "اولین بروزرسانی") {
        return new Date(a.inserDate) - new Date(b.inserDate);
      }

      return 0;
    });

  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const currentComments = filteredComments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

  const handlePageChange = (p) => {
    const selectedPage = p.selected + 1;
    setCurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const rightAnimate = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 250, duration: 0.35 },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.35, type: "spring", stiffness: 250 },
    },
  };
  return (
    <div className="flex flex-col gap-10 lg:gap-5 2xl:gap-0  h-[84%] w-full mt-4 p-8 bg-[#F3F4F6] rounded-4xl dark:bg-[#333333]">
      <div className="flex flex-col  gap-4 md:gap-0  w-[90%] mx-auto   md:w-[92%] xl:w-[93%] xl:w-[95%] md:mx-auto   md:flex-row md:justify-between items-center">
        <motion.div
          variants={rightAnimate}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-[100%]    md:w-[35%] lg:w-[30%]"
        >
          <input
            className="border border-[#EAEAEA]  dark:bg-[#454545] dark:text-[#ffff] dark:placeholder:text-white
                     w-[100%] md:w-[100%]  h-full shadow py-2 px-3 bg-[#ffff] rounded-[16px] focus:outline-none "
            value={searchQuery}
            type="text"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={t("favoriteNews.search")}
          />
          <img
            className={` absolute ${
              isRTL ? "left-3" : "right-3"
            } top-[50%] translate-y-[-50%] `}
            src={searchIcon}
            alt=""
          />
        </motion.div>
        <div className=" flex flex-row justify-between sm:gap-5  w-full md:w-auto ">
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
              <option value="all">({t("favoriteCourses.all")})</option>
              <option value="جدید ترین ها">
                ({t("favoriteCourses.lastUpdate")})
              </option>
              <option value="اولین بروزرسانی">
                ({t("favoriteCourses.firstUpdate")})
              </option>
            </select>
          </div>
          <div className="flex items-center dark:bg-[#454545] dark:text-[#ffff] rounded-xl border shadow-md p-1 border-[#EAEAEA] ">
            <span className="text-[16px] hidden lg:inline">
              {t("favoriteNews.NumberShows")}
            </span>
            <select
              value={commentsPerPage}
              onChange={(e) => {
                setCommentsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="cursor-pointer rounded-xl px-3 py-1 text-sm dark:bg-[#454545] dark:text-[#ffff]"
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-[#f3f4f6] p-3 dark:bg-[#333] sm:p-4 md:overflow-y-auto md:p-5 lg:overflow-y-hidden lg:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 pr-1 lg:hidden">
            {isLoading ? (
              [...Array(commentsPerPage)].map((_, index) => (
                <FavoritesSkeleton key={index + 2} />
              ))
            ) : currentComments.length > 0 ? (
              currentComments.map((item, index) => {
                return <MyNewsComment type="mobile" item={item} key={index} />;
              })
            ) : (
              <div className="w-full py-6">
                <Lottie
                  className="mx-auto h-[140px] w-[170px] sm:h-[160px] sm:w-[190px]"
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
                    <th className="w-[25%] border-b border-[#EAEAEA] px-4 py-4 text-right text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-5 xl:text-[14px] 2xl:text-[15px]">
                      {t("myNewsComments.title1")}
                    </th>

                    <th className="w-[23%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("myNewsComments.title2")}
                    </th>

                    <th className="w-[22%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("myNewsComments.title3")}
                    </th>

                    <th className="w-[15%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("myNewsComments.title4")}
                    </th>

                    <th className="w-[15%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("myNewsComments.title5")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    [...Array(commentsPerPage)].map((_, index) => (
                      <tr key={index} className="bg-white dark:bg-[#454545]">
                        <td
                          colSpan={5}
                          className="border-b border-[#EAEAEA] px-4 py-4 dark:border-[#5a5a5a]"
                        >
                          <div className="grid grid-cols-[1.3fr_1.2fr_1.2fr_0.9fr_0.9fr] items-center gap-3">
                            <div className="h-4 w-full rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="h-4 w-full rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="h-4 w-full rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="mx-auto h-8 w-24 rounded-lg bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="mx-auto h-4 w-24 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : currentComments.length > 0 ? (
                    currentComments.map((item, index) => {
                      return (
                        <MyNewsComment type="table" item={item} key={index} />
                      );
                    })
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
        </div>

        <div className="mt-5 flex flex-col gap-3 lg:mt-7 lg:flex-row lg:items-center lg:justify-start xl:mt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel="›"
            previousLabel="‹"
            onPageChange={handlePageChange}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            forcePage={currentPage - 1}
            containerClassName="flex flex-wrap justify-center gap-1 sm:gap-2 cursor-pointer"
            pageClassName="list-none"
            pageLinkClassName="flex h-[38px] min-w-[38px] items-center justify-center rounded-xl bg-[#EAEAEA] px-3 text-sm font-bold text-black transition-all duration-200 hover:scale-105 dark:bg-[#555] dark:text-white sm:h-[42px] sm:min-w-[42px] sm:text-base"
            activeLinkClassName="!bg-[#008C78] !text-white"
            previousClassName="list-none"
            nextClassName="list-none"
            previousLinkClassName="flex h-[38px] min-w-[38px] items-center justify-center rounded-xl bg-[#EAEAEA] text-xl font-bold text-black dark:bg-[#555] dark:text-white sm:h-[42px] sm:min-w-[42px]"
            nextLinkClassName="flex h-[38px] min-w-[38px] items-center justify-center rounded-xl bg-[#EAEAEA] text-xl font-bold text-black dark:bg-[#555] dark:text-white sm:h-[42px] sm:min-w-[42px]"
          />
        </div>
      </div>
    </div>
  );
};

export default MyNewsComments;
