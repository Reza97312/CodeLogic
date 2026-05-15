import React, { useState } from "react";
import NewsHeader from "../../../components/common/favorites/News/newsHeader/NewsHeader";
import { useTranslation } from "react-i18next";
import FavoriteNew from "../../../components/common/favorites/News/FavoriteNew";
import { FavoriteNewsData } from "../../../components/common/data/Favorites/FavoriteNewsData";
import { AnimatePresence, motion, number } from "framer-motion";
import searchIcon from "../../../assets/Icons/A/search.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavoriteNews } from "../../../core/services/api/Get/GetFavoritesNews";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import { deleteFavNews } from "../../../core/services/api/Delete/DeleteFavoriteNews";
import openEye from "../../../assets/Icons/A/openEye.png";
import starIcon from "../../../assets/Icons/A/star.png";
import FavoritesSkeleton from "../../../components/common/skeleton/favorites/FavoritesSkeleton";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import { PersianDateConverter } from "../../../utils/helper/dateConverter";
import img2 from "../../../assets/Images/HTML5Course.png";
import ReactPaginate from "react-paginate";
const FavoriteNews = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  const { data: favNewsData = {}, isPending } = useQuery({
    queryKey: ["FAVNEWS"],
    queryFn: () => getFavoriteNews(),
  });

  const [openModal, setOpenModal] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const deleteItem = (itemId) => {
    setOpenModal(true);
    setSelectedId(itemId);
  };
  const queryClient = useQueryClient();
  const { mutate: deleteNews, isPending: isDeleting } = useMutation({
    mutationKey: ["DELETENEW"],
    mutationFn: (value) => deleteFavNews(value),
    onError: (err) => {
      toast.error(err.response?.data?.message);
      setOpenModal(false);
      setSelectedId(null);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["FAVNEWS"]);

      setOpenModal(false);
      setSelectedId(null);
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");
  const [query] = useDebounce(searchTerm, 350);
  const [filterOption, setFilterOption] = useState("all");

  const favNews = favNewsData?.myFavoriteNews || [];
  const filteredNews = favNews
    .filter((n) =>
      n.news.title.trim().toLowerCase().includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(a.news.updateDate);
      const dateB = new Date(b.news.updateDate);
      if (filterOption === "جدید ترین ها") {
        return dateB - dateA;
      } else if (filterOption === "اولین بروزرسانی") {
        return dateA - dateB;
      } else {
        return 0;
      }
    });

  const startIndex = (currentPage - 1) * newsPerPage;
  const endIndex = startIndex + newsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);

  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [overViewData, setOverViewData] = useState(null);

  const getOverViewData = (news) => {
    setShowOverviewModal(true);
    setOverViewData(news);
  };
  const handleCloseModal = () => {
    setShowOverviewModal(false);
    setOverViewData(null);
  };

  const fadeInUp = (delay) => ({
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut", delay },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: "easeOut", delay },
    },
  });

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
    <div className="flex  flex-col gap-5 md:gap-10 lg:gap-0 h-[85%]   mt-5 md:mt-0 p-5 bg-[#F3F4F6] rounded-4xl  w-full sm:w-auto dark:bg-[#333333]">
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
            type="text"
            onChange={(e) => {
              setSearchTerm(e.target.value);
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
          <div className="flex items-center dark:bg-[#454545] dark:text-[#ffff] rounded-xl border shadow-md p-1 border-[#EAEAEA]">
            <span className="text-[16px] hidden lg:inline">
              {t("favoriteNews.NumberShows")}
            </span>
            <select
              value={newsPerPage}
              onChange={(e) => {
                setNewsPerPage(Number(e.target.value));
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

      <motion.div
        variants={fadeInUp(0)}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-between rounded-2xl bg-[#f3f4f6] p-3 dark:bg-[#333] sm:p-4 md:overflow-y-auto md:p-5 lg:overflow-y-hidden lg:p-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 pr-1 lg:hidden">
            {isPending ? (
              [...Array(newsPerPage)].map((_, index) => (
                <FavoritesSkeleton key={index + 1} />
              ))
            ) : currentNews.length > 0 ? (
              currentNews.map((items, index) => (
                <FavoriteNew
                  type="mobile"
                  getOverViewData={getOverViewData}
                  deleteItem={deleteItem}
                  items={items}
                  key={index}
                />
              ))
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
                    <th className="w-[28%] border-b border-[#EAEAEA] px-4 py-4 text-right text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-5 xl:text-[14px] 2xl:text-[15px]">
                      {t("favoriteNews.newsTitle")}
                    </th>

                    <th className="w-[14%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("favoriteNews.commentsCount")}
                    </th>

                    <th className="w-[14%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("favoriteNews.viewsCount")}
                    </th>

                    <th className="w-[12%] border-b border-[#EAEAEA]  py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("favoriteNews.likesCount")}
                    </th>

                    <th className="w-[22%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("favoriteNews.lastUpdated")}
                    </th>

                    <th className="w-[10%] border-b border-[#EAEAEA] px-3 py-4 text-center text-[13px] font-bold text-[#1E1E1E] dark:border-[#5a5a5a] dark:text-[#DDDDDD] xl:px-4 xl:text-[14px] 2xl:text-[15px]">
                      {t("favoriteNews.Operation")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isPending ? (
                    [...Array(newsPerPage)].map((_, index) => (
                      <tr key={index} className="bg-white dark:bg-[#454545]">
                        <td
                          colSpan={6}
                          className="border-b border-[#EAEAEA] px-4 py-4 dark:border-[#5a5a5a]"
                        >
                          <div className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr_1fr_0.7fr] items-center gap-3">
                            <div className="h-4 w-full rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="mx-auto h-4 w-10 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="mx-auto h-4 w-10 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="mx-auto h-4 w-10 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="mx-auto h-4 w-28 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                            <div className="mx-auto h-8 w-16 rounded-xl bg-[#ECECEC] dark:bg-[#5b5b5b]" />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : currentNews.length > 0 ? (
                    currentNews.map((items, index) => (
                      <FavoriteNew
                        type="table"
                        getOverViewData={getOverViewData}
                        deleteItem={deleteItem}
                        items={items}
                        key={index}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>
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

        <div className="mt-5 flex flex-col gap-3 lg:mt-4 lg:flex-row lg:items-center lg:justify-start xl:mt-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel="›"
            previousLabel="‹"
            onPageChange={({ selected }) => {
              setCurrentPage(selected + 1);
            }}
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
      </motion.div>

      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            setOpenModal(false);
            setSelectedId(null);
          }}
          className=" fixed inset-0 bg-black/50 backdrop-blur flex justify-center items-center "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -100 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 220,
                damping: 18,
                mass: 0.8,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              y: 40,
              transition: {
                type: "spring",
                stiffness: 180,
                damping: 20,
              },
            }}
            className="flex flex-col items-center dark:bg-[#333] gap-6 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] pt-8 py-[14px] bg-[#FFFFFF] border border-[#EAEAEA] 
        rounded-xl  z-48"
          >
            <h3 className="font-semibold dark:text-[#fff]">
              {t("deleteModal.title")}
            </h3>
            <div className="flex items-center gap-5 justify-between">
              <button
                className="py-2 px-4 font-medium border rounded-lg 
                    cursor-pointer dark:text-[#898989]"
              >
                {t("deleteModal.cancel")}
              </button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                whileTap={{ scale: 0.98 }}
                disabled={isDeleting}
                onClick={() => {
                  deleteNews(selectedId);
                }}
                className="py-2 px-4 font-medium text-[#FFFFFF] bg-[#EB0007] rounded-lg cursor-pointer"
              >
                {isDeleting
                  ? `${t("deleteModal.Deleting")}`
                  : `${t("deleteModal.ConfirmDeletion")}`}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showOverviewModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => handleCloseModal()}
          className=" fixed inset-0 bg-black/50 backdrop-blur flex justify-center items-center "
        >
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                duration: 300,
              },
            }}
            className="flex flex-col items-center dark:bg-[#333] gap-6 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] pt-8 py-[14px] bg-[#FFFFFF] border border-[#EAEAEA] 
        rounded-xl  z-48"
          >
            <h2 className=" text-[16px] sm:text-[19px] text-center text-[#008C78] dark:text-[#008C78] mx-auto font-bold">
              {overViewData.title}
            </h2>
            <img
              className="rounded-4xl shadow-md w-[60%] mx-auto "
              src={overViewData?.currentImageAddress || img2}
              onError={(e) => {
                e.target.src = img2;
              }}
              alt=""
            />
            <p className="text-[14px] text-[#848484] dark:text-[white] mt-2 mx-auto ">
              {overViewData.miniDescribe}
            </p>
            <div className=" flex flex-row  justify-evenly   items-center w-full  mx-auto ">
              <div
                style={{ backgroundImage: `url(${openEye})` }}
                className=" text-[14px] text-[#848484] bg-no-repeat bg-[right_center] pr-6 "
              >
                666
              </div>
              <div
                style={{ backgroundImage: `url(${starIcon})` }}
                className=" text-[14px] text-[#F8BC24] bg-no-repeat bg-[left_center] pl-6 "
              >
                34
              </div>
            </div>
            <div className="mx-auto">
              <span className="text-[12px] sm:text-[16px] dark:text-white">
                {t("favoriteNews.lastUpdated")} :
              </span>
              <span className="ms-1 dark:text-white text-[12px] sm:text-[16px]">
                {PersianDateConverter(overViewData.updateDate)}
              </span>
            </div>
            <button
              onClick={() => handleCloseModal()}
              className=" cursor-pointer border dark:border-[#EAEAEA] mx-auto
               dark:text-white px-3 py-2 rounded-2xl hover:shadow-md inline"
            >
              {t("login.Back")}
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FavoriteNews;
