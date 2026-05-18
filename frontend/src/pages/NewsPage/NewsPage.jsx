import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Formik, Form, Field } from "formik";
import debounce from "lodash.debounce";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import NewsCard from "../../components/news/NewsCard/NewsCard";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NewsSelectOne from "../../components/news/NewsSelectOne/NewsSelectOne";
import NewsSelectTwo from "../../components/news/NewsSelectTwo/NewsSelectTwo";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import getAllNews from "../../core/services/api/Get/News";
import { Link, useLocation } from "react-router-dom";
import NewsPageSkeleton from "../../components/common/skeleton/NewsPageSkeleton/NewsPageSkeleton";
import Lottie from "lottie-react";
import empty from "../../assets/Images/empty.json";
import img2 from "../../assets/Images/HTML5Course.png";

const NewsPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: getAllNews,
  });

  const location = useLocation();

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(0);
    }, 700),
    [],
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    setSearchQuery(search);
  }, [location.search]);

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const HandleDark = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    HandleDark.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => HandleDark.disconnect();
  }, []);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const [selectedView, setSelectedView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const itemsPerPage = cardsPerPage;

  const filteredNews = useMemo(() => {
    if (!data?.news) return [];
    let result = [...data.news];

    if (selectedCategory)
      result = result.filter(
        (news) => news.newsCatregoryName === selectedCategory,
      );

    if (searchQuery?.trim())
      result = result.filter((news) =>
        news.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    if (sortOption === "newest")
      result.sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate));
    else if (sortOption === "oldest")
      result.sort((a, b) => new Date(a.insertDate) - new Date(b.insertDate));

    return result;
  }, [data, searchQuery, sortOption, selectedCategory]);

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredNews.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredNews.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(0);
  };

  const fadeInOnly = (delay) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  });

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const getCardWidthClass = () =>
    selectedView === "list"
      ? "w-full"
      : "w-full sm:w-[48%] lg:w-[31%] xl:w-[calc(33.333%-10.66px)]";

  if (isLoading) {
    return (
      <NewsPageSkeleton selectedView={selectedView} isDarkMode={isDarkMode} />
    );
  }

  return (
    <div className="bg-[#F3F4F6] dark:bg-[#1e1e1e] min-h-screen">
      <motion.div
        variants={fadeInOnly(0.3)}
        initial="hidden"
        animate="visible"
        className="pt-10 flex flex-col justify-center items-center px-4"
      >
        <span className="font-bold mb-5 text-[#008C78] dark:text-[#ccc]">
          <Link to="/">{t("newsPage.breadcrumb1")}</Link>
          {t("newsPage.breadcrumb2")}
        </span>

        <p className="font-bold text-xl sm:text-2xl md:text-3xl text-[#1E1E1E] dark:text-[#fff] text-center">
          {t("newsPage.headerTitle")}
          <span className="text-sm !ml-2 text-[#848484] dark:text-[#ccc] mr-2">
            ( {data?.news?.length} {t("newsPage.results")} )
          </span>
        </p>
      </motion.div>

      <motion.div className="  flex flex-col sm:flex-row items-start justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          variants={fadeInOnly(0.3)}
          initial="hidden"
          animate="visible"
          className=" sm:ml-5 w-full sm:w-1/4 lg:w-[19%] relative mb-6 sm:mb-0 sm:mt-17.5"
        >
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
              setSearchQuery(values.search);
              setCurrentPage(0);
            }}
          >
            {() => (
              <Form className="relative mb-5 w-full">
                <Field name="search">
                  {({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder={t("newsPage.searchPlaceholder")}
                      onChange={(e) => {
                        field.onChange(e);
                        handleSearchChange(e);
                      }}
                      className="  shadow-md font-medium text-[#848484] dark:text-[#ccc] bg-[#fff] dark:bg-[#333] rounded-xl px-4 py-3 text-sm outline-none w-full transition-all duration-300 pr-10 sm:pr-3 md:pr-5 lg:pr-5 xl:pr-10"
                    />
                  )}
                </Field>
                <button
                  type="submit"
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isRtl ? "left-3" : "right-3"
                  }`}
                >
                  <SearchIcon
                    sx={{ color: "#848484" }}
                    className="dark:text-[#ccc]"
                  />
                </button>
              </Form>
            )}
          </Formik>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        <div className="  w-full sm:w-3/4 lg:w-[79%] sm:ml-6">
          <motion.div
            variants={fadeInOnly(0.3)}
            initial="hidden"
            animate="visible"
            className="  bg-[#fff] dark:bg-[#333] mb-5 mt-5 sm:mt-17 shadow-md rounded-xl px-4 py-3 sm:px-10  md:flex  md:flex-row justify-between items-center space-y-3 sm:space-y-0"
          >
            <div className="  md:w-[100%]  flex flex-wrap md:mt-5 lg:mt-0  justify-center sm:justify-start sm:mb-5 lg:mb-0 items-center !gap-4">
              <span className=" w-[100%] md:w-auto   flex md:hidden lg:flex justify-center dark:text-[#fff] text-sm">
                {t("newsPage.sortBy")}
              </span>
              <NewsSelectOne
                onChange={(val) => {
                  setSortOption(val);
                  setCurrentPage(0);
                }}
              />
              <NewsSelectTwo
                value={String(cardsPerPage)}
                onChange={(val) => {
                  const number = parseInt(val, 10);
                  if (!isNaN(number)) {
                    setCardsPerPage(number);
                    setCurrentPage(0);
                  }
                }}
              />
            </div>

            <div className=" py-2 sm:py-0   !gap-3 flex justify-center items-center">
              <div
                onClick={() => setSelectedView("list")}
                className={`mr-3 sm:mr-0 md:mr-5 flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-full border cursor-pointer ${
                  selectedView === "list"
                    ? "bg-[#008C78] text-white border-[#008C78]"
                    : "text-[#A6A6A6] border border-[#A6A6A6] dark:border-[#555]"
                }`}
              >
                <FormatListBulletedIcon className="!text-2xl sm:!text-2xl" />
              </div>
              <div
                onClick={() => setSelectedView("grid")}
                className={`flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-full border cursor-pointer ${
                  selectedView === "grid"
                    ? "bg-[#008C78] text-white border-[#008C78]"
                    : "text-[#A6A6A6] border border-[#A6A6A6] dark:border-[#555]"
                }`}
              >
                <GridViewIcon className="!text-2xl sm:!text-2xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`${currentPage}-${selectedView}-${searchQuery}-${cardsPerPage}-${sortOption}-${selectedCategory}`}
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
            className={`  flex flex-wrap gap-4 justify-center md:justify-start ${
              selectedView === "list" ? "flex-col" : "flex-row"
            }`}
          >
            {currentItems.length > 0 ? (
              currentItems.map((news, index) => (
                <motion.div
                  key={index}
                  variants={cardItemVariants}
                  className={getCardWidthClass()}
                >
                  <NewsCard
                    id={news.id}
                    image={
                      news.currentImageAddress &&
                      !news.currentImageAddress.includes("undefined") &&
                      news.currentImageAddress.startsWith("http") &&
                      !news.currentImageAddress
                        .toLowerCase()
                        .includes("local") &&
                      !news.currentImageAddress
                        .toLowerCase()
                        .includes("fakepath")
                        ? news.currentImageAddress
                        : img2
                    }
                    title={news.title}
                    description={news.miniDescribe}
                    views={news.currentView}
                    rating={news.newsRate.avg.toFixed(1)}
                    category={news.newsCatregoryName}
                    date={new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(news.insertDate))}
                    viewType={selectedView}
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full">
                <Lottie
                  className="w-[200px] h-[170px] my-10 mx-auto"
                  animationData={empty}
                  loop={true}
                />
                <p className="font-bold text-[black] text-[20px] text-center dark:text-[#848484]">
                  {" "}
                  {t("newsPage.emptyres")}{" "}
                </p>
              </div>
            )}
          </motion.div>
          {filteredNews.length > 0 && (
            <div className="flex justify-center my-10">
              <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                previousLabel="< "
                onPageChange={handlePageChange}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                forcePage={currentPage}
                containerClassName="flex flex-wrap justify-center gap-1 sm:gap-2"
                pageClassName="px-3 py-2 sm:px-5 sm:py-3 rounded-[15px] font-semibold shadow-md cursor-pointer text-sm sm:text-xl bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                activeClassName="!bg-[#008C78] text-white rounded-2xl shadow-md"
                previousClassName="px-2 py-1 sm:px-3 sm:py-1 rounded-2xl shadow-md cursor-pointer text-sm bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                nextClassName="px-2 py-1 sm:px-3 sm:py-1 rounded-2xl shadow-md cursor-pointer text-sm bg-[#EAEAEA] dark:bg-[#555] text-black dark:text-[#fff]"
                previousLinkClassName="font-bold text-lg sm:text-2xl px-1 sm:px-2 py-1 flex items-center justify-center h-full w-full"
                nextLinkClassName="font-bold text-lg sm:text-2xl px-1 sm:px-2 py-1 flex items-center justify-center h-full w-full"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NewsPage;
