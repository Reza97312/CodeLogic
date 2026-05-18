<<<<<<< HEAD:frontend/src/components/layouts/Header/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SelectComp from "../../SelectComp/SelectComp";
import TranslateButton from "../../TranslateButton/TranslateButton";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { getItem } from "../../../utils/helper/storage.services";
import getAllNews from "../../../core/services/api/Get/News";
import GetAllCourses from "../../../core/services/api/Get/GetAllCourses";
import img2 from "../../../assets/Images/HTML5Course.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [searchType, setSearchType] = useState("news");
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const [newsResults, setNewsResults] = useState([]);
  const [courseResults, setCourseResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
    if (searchType === "news") {
      navigate(`/news?search=${encodeURIComponent(searchValue)}`);
    } else if (searchType === "courses") {
      navigate(`/courseList?search=${encodeURIComponent(searchValue)}`);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchValue.trim().length < 2) {
        setNewsResults([]);
        setCourseResults([]);
        setIsDropdownVisible(false);
        return;
      }

      try {
        if (searchType === "news") {
          const res = await getAllNews();
          const filtered = res.news.filter((n) =>
            n.title.toLowerCase().includes(searchValue.toLowerCase()),
          );
          setNewsResults(filtered.slice(0, 5));
          setCourseResults([]);
          setIsDropdownVisible(true);
        } else if (searchType === "courses") {
          const res = await GetAllCourses({
            RowsOfPage: 10,
            PageNumber: 1,
            Query: searchValue,
          });
          const filteredCourses = res.courseFilterDtos || [];
          setCourseResults(filteredCourses.slice(0, 5));
          setNewsResults([]);
          setIsDropdownVisible(true);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    clearTimeout(typingTimeout);
    const timeout = setTimeout(fetchResults, 500);
    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchValue, searchType]);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const [mobileMenu, setMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const isLogin = getItem("token");

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenu]);

  const slideFromRight = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <nav
      className={`  flex items-center justify-between p-4 sm:p-3 md:px-6 lg:justify-around   lg:px-7 transition-all duration-300 relative
        ${isDark ? "bg-[#1e1e1e]" : "bg-[#eefffc]"}`}
    >
      {/* <div
        className="block lg:hidden cursor-pointer"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <MenuIcon sx={{ color: isDark ? "white" : "black", fontSize: 28 }} />
      </div> */}
      <div
        className="block lg:hidden cursor-pointer"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <MenuIcon sx={{ color: isDark ? "white" : "black", fontSize: 28 }} />
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileMenu(false)}
          />
        )}
      </AnimatePresence>

      <ul className="  hidden sm:hidden lg:flex flex-row items-center gap-6 ">
        <li
          className={`  cursor-pointer text-sm md:text-base lg:text-base xl:text-lg font-bold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.academy")}
        </li>
        <Link
          to={"/"}
          className={` cursor-pointer text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.home")}
        </Link>
        <Link
          to={"/courseList"}
          className={` cursor-pointer  text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.courses")}
        </Link>
        <Link
          to={"/news"}
          className={` cursor-pointer text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.news")}
        </Link>
      </ul>

      <div className="flex items-center gap-2 relative">
        <div
          className={`hidden lg:flex relative items-center bg-white dark:bg-[#2a2a2a] rounded-[28px] transition-shadow duration-300 ${
            isRtl ? "flex-row-reverse" : "flex-row-reverse"
          }`}
        >
          <SelectComp
            placeholder={t("navbar.select_placeholder")}
            isRtl={isRtl}
            onChange={(val) => setSearchType(val)}
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              if (
                (searchType === "news" && newsResults.length > 0) ||
                (searchType === "courses" && courseResults.length > 0)
              )
                setIsDropdownVisible(true);
            }}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="  font-medium text-[#7e7e7e] dark:text-white bg-transparent rounded-[28px] px-4 py-1 outline-none w-[150px]"
            placeholder={t("navbar.search_placeholder")}
          />

          <button
            onClick={handleSearch}
            className="absolute top-1/2 transform -translate-y-1/2 left-1 dark:bg-[#008c78] bg-[#008c78] p-2 rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#007563]"
            style={{
              [isRtl ? "left" : "right"]: "1px",
              [isRtl ? "right" : "left"]: "auto",
            }}
          >
            <SearchIcon sx={{ color: "white", fontSize: 24 }} />
          </button>
        </div>

        {isDropdownVisible &&
          searchType === "news" &&
          newsResults.length > 0 && (
            <ul className="absolute top-[50px] right-0 w-[60%] bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg z-50 border border-[#008c78]/30 max-h-60 overflow-y-auto">
              {newsResults.map((news) => {
                const formattedDate = new Intl.DateTimeFormat(
                  "fa-IR-u-ca-persian",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                ).format(new Date(news.insertDate));

                return (
                  <li
                    key={news.id}
                    onClick={() => {
                      navigate(`/news/${news.id}`);
                      setIsDropdownVisible(false);
                      setSearchValue("");
                    }}
                    className="flex items-center justify-between gap-3 px-3 py-2 cursor-pointer hover:bg-[#008c7822] dark:hover:bg-[#008c7844] transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          news.currentImageAddressTumb &&
                          !news.currentImageAddressTumb.includes("undefined") &&
                          news.currentImageAddressTumb.startsWith("http") &&
                          !news.currentImageAddressTumb
                            .toLowerCase()
                            .includes("local") &&
                          !news.currentImageAddressTumb
                            .toLowerCase()
                            .includes("fakepath")
                            ? news.currentImageAddressTumb
                            : img2
                        }
                        alt={news.title}
                        className="w-10 h-10 rounded-lg object-cover border border-[#ddd] dark:border-[#444]"
                      />

                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-[#222] dark:text-white">
                          {news.title.length > 35
                            ? news.title.slice(0, 35) + "..."
                            : news.title}
                        </span>
                        <span className="text-[#777] dark:text-[#ccc] text-xs mt-1">
                          {news.addUserFullName}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#666] dark:text-[#aaa] whitespace-nowrap">
                      {formattedDate}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

        {isDropdownVisible &&
          searchType === "courses" &&
          courseResults.length > 0 && (
            <ul className="absolute top-[50px] right-0 w-[60%] bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg z-50 border border-[#008c78]/30 max-h-60 overflow-y-auto">
              {courseResults.map((course) => {
                const formattedDate = new Intl.DateTimeFormat(
                  "fa-IR-u-ca-persian",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                ).format(new Date(course.startTime));

                return (
                  <li
                    key={course.courseId}
                    onClick={() => {
                      navigate(`/courseDetail/${course.courseId}`);
                      setIsDropdownVisible(false);
                      setSearchValue("");
                    }}
                    className="  flex items-center justify-between gap-3 px-3 py-2 cursor-pointer hover:bg-[#008c7822] dark:hover:bg-[#008c7844] transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          course.tumbImageAddress &&
                          !course.tumbImageAddress.includes("undefined") &&
                          course.tumbImageAddress.startsWith("http") &&
                          !course.tumbImageAddress
                            .toLowerCase()
                            .includes("local") &&
                          !course.tumbImageAddress
                            .toLowerCase()
                            .includes("fakepath")
                            ? course.tumbImageAddress
                            : img2
                        }
                        alt={course.title}
                        className="w-10 h-10 rounded-lg object-cover border border-[#ddd] dark:border-[#444]"
                      />

                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-[#222] dark:text-white">
                          {course.title.length > 35
                            ? course.title.slice(0, 35) + "..."
                            : course.title}
                        </span>
                        <span className="text-[#777] dark:text-[#ccc] text-xs mt-1">
                          {course.teacherName || "بدون مدرس"}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#666] dark:text-[#aaa] whitespace-nowrap">
                      {formattedDate}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

        {isDropdownVisible &&
          ((searchType === "news" && newsResults.length === 0) ||
            (searchType === "courses" && courseResults.length === 0)) &&
          searchValue.length > 1 && (
            <div className="absolute top-[50px] right-0 w-[60%] bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg z-50 border border-[#008c78]/30 text-center text-sm p-2 text-[#777]">
              {t("navbar.notfound")}
            </div>
          )}

        <button
          onClick={toggleTheme}
          className={` cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300
            ${
              isDark ? "bg-[#333] text-[#ffe600]" : "bg-[#008c78] text-white"
            } hover:scale-105 hover:bg-[#007563]`}
          aria-pressed={isDark}
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <TranslateButton />

        <Link to={isLogin ? "/UserPanel" : "/Login"}>
          <button className="   cursor-pointer  bg-[#008c78] text-white font-bold lg:font-semibold xl:font-bold rounded-full px-4 py-2 sm:px-4 sm:py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 xl:px-6 xl:py-3   text-xs sm:text-sm md:text-sm lg:text-base transition-colors duration-300 hover:bg-[#007563] ">
            {isLogin ? t("navbar.userpanel") : t("navbar.login")}{" "}
          </button>
        </Link>
      </div>
      <AnimatePresence>
        {mobileMenu && (
          <motion.ul
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-2/3 sm:w-1/2 md:w-2/5 bg-white dark:bg-[#1e1e1e] shadow-lg p-4 flex flex-col gap-4 z-50"
          >
            <div
              className={`relative flex items-center bg-white dark:bg-[#2a2a2a] rounded-[28px] transition-shadow duration-300 mt-2 ${
                isRtl ? "flex-row-reverse" : "flex-row-reverse"
              }`}
            >
              <input
                type="text"
                className={`font-medium text-[#7e7e7e] border-1 border-[#ccc] dark:text-white bg-transparent rounded-[28px] px-2 py-3 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm md:text-base outline-none flex-grow transition-all duration-300`}
                placeholder={t("navbar.search_placeholder")}
              />

              <button
                className="absolute top-1/2 transform -translate-y-1/2 dark:bg-[#008c78] bg-[#008c78] p-2 rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#007563]"
                style={{
                  [isRtl ? "left" : "right"]: "0.5px",
                  [isRtl ? "right" : "left"]: "auto",
                }}
              >
                <SearchIcon sx={{ color: "white", fontSize: 24 }} />
              </button>
            </div>

            <li
              className={` mb-2 text-sm text-[#008c78] font-bold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-[#008c78] hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.academy")}
            </li>
            <Link
              to={"/"}
              onClick={() => setMobileMenu(false)}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-white hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.home")}
            </Link>
            <Link
              onClick={() => setMobileMenu(false)}
              to={"/courselist"}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-white hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.courses")}
            </Link>
            <Link
              onClick={() => setMobileMenu(false)}
              to={"/news"}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-white hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.news")}
            </Link>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-2xl bg-[#008c78] text-white mt-8 p-1 cursor-pointer"
            >
              بازگشت
            </button>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
=======
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SelectComp from "../../SelectComp/SelectComp";
import TranslateButton from "../../TranslateButton/TranslateButton";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { getItem } from "../../../utils/helper/storage.services";
import getAllNews from "../../../core/services/api/Get/News";
import GetAllCourses from "../../../core/services/api/Get/GetAllCourses";
import img2 from "../../../assets/Images/HTML5Course.png";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [searchType, setSearchType] = useState("news");
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const [newsResults, setNewsResults] = useState([]);
  const [courseResults, setCourseResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
    if (searchType === "news") {
      navigate(`/news?search=${encodeURIComponent(searchValue)}`);
    } else if (searchType === "courses") {
      navigate(`/courseList?search=${encodeURIComponent(searchValue)}`);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (searchValue.trim().length < 2) {
        setNewsResults([]);
        setCourseResults([]);
        setIsDropdownVisible(false);
        return;
      }

      try {
        if (searchType === "news") {
          const res = await getAllNews();
          const filtered = res.news.filter((n) =>
            n.title.toLowerCase().includes(searchValue.toLowerCase()),
          );
          setNewsResults(filtered.slice(0, 5));
          setCourseResults([]);
          setIsDropdownVisible(true);
        } else if (searchType === "courses") {
          const res = await GetAllCourses({
            RowsOfPage: 10,
            PageNumber: 1,
            Query: searchValue,
          });
          const filteredCourses = res.courseFilterDtos || [];
          setCourseResults(filteredCourses.slice(0, 5));
          setNewsResults([]);
          setIsDropdownVisible(true);
        }
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    clearTimeout(typingTimeout);
    const timeout = setTimeout(fetchResults, 500);
    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [searchValue, searchType]);

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const [mobileMenu, setMobileMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const isLogin = getItem("token");

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenu]);

  const slideFromRight = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return (
    <nav
      className={`  flex items-center justify-between p-4 sm:p-3 md:px-6 lg:justify-around   lg:px-7 transition-all duration-300 relative
        ${isDark ? "bg-[#1e1e1e]" : "bg-[#eefffc]"}`}
    >
      {/* <div
        className="block lg:hidden cursor-pointer"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <MenuIcon sx={{ color: isDark ? "white" : "black", fontSize: 28 }} />
      </div> */}
      <div
        className="block lg:hidden cursor-pointer"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <MenuIcon sx={{ color: isDark ? "white" : "black", fontSize: 28 }} />
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setMobileMenu(false)}
          />
        )}
      </AnimatePresence>

      <ul className="  hidden sm:hidden lg:flex flex-row items-center gap-6 ">
        <li
          className={`  cursor-pointer text-sm md:text-base lg:text-base xl:text-lg font-bold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.academy")}
        </li>
        <Link
          to={"/"}
          className={` cursor-pointer text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.home")}
        </Link>
        <Link
          to={"/courseList"}
          className={` cursor-pointer  text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.courses")}
        </Link>
        <Link
          to={"/news"}
          className={` cursor-pointer text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-colors duration-200 hover:text-[#008c78] ${
            isDark ? "text-white hover:text-[#00bfa5]" : ""
          }`}
        >
          {t("navbar.news")}
        </Link>
      </ul>

      <div className="flex items-center gap-2 relative">
        <div
          className={`hidden lg:flex relative items-center bg-white dark:bg-[#2a2a2a] rounded-[28px] transition-shadow duration-300 ${
            isRtl ? "flex-row-reverse" : "flex-row-reverse"
          }`}
        >
          <SelectComp
            placeholder={t("navbar.select_placeholder")}
            isRtl={isRtl}
            onChange={(val) => setSearchType(val)}
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => {
              if (
                (searchType === "news" && newsResults.length > 0) ||
                (searchType === "courses" && courseResults.length > 0)
              )
                setIsDropdownVisible(true);
            }}
            onBlur={() => setTimeout(() => setIsDropdownVisible(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="  font-medium text-[#7e7e7e] dark:text-white bg-transparent rounded-[28px] px-4 py-1 outline-none w-[150px]"
            placeholder={t("navbar.search_placeholder")}
          />

          <button
            onClick={handleSearch}
            className="absolute top-1/2 transform -translate-y-1/2 left-1 dark:bg-[#008c78] bg-[#008c78] p-2 rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#007563]"
            style={{
              [isRtl ? "left" : "right"]: "1px",
              [isRtl ? "right" : "left"]: "auto",
            }}
          >
            <SearchIcon sx={{ color: "white", fontSize: 24 }} />
          </button>
        </div>

        {isDropdownVisible &&
          searchType === "news" &&
          newsResults.length > 0 && (
            <ul className="absolute top-[50px] right-0 w-[60%] bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg z-50 border border-[#008c78]/30 max-h-60 overflow-y-auto">
              {newsResults.map((news) => {
                const formattedDate = new Intl.DateTimeFormat(
                  "fa-IR-u-ca-persian",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                ).format(new Date(news.insertDate));

                return (
                  <li
                    key={news.id}
                    onClick={() => {
                      navigate(`/news/${news.id}`);
                      setIsDropdownVisible(false);
                      setSearchValue("");
                    }}
                    className="flex items-center justify-between gap-3 px-3 py-2 cursor-pointer hover:bg-[#008c7822] dark:hover:bg-[#008c7844] transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          news.currentImageAddressTumb &&
                          !news.currentImageAddressTumb.includes("undefined") &&
                          news.currentImageAddressTumb.startsWith("http") &&
                          !news.currentImageAddressTumb
                            .toLowerCase()
                            .includes("local") &&
                          !news.currentImageAddressTumb
                            .toLowerCase()
                            .includes("fakepath")
                            ? news.currentImageAddressTumb
                            : img2
                        }
                        alt={news.title}
                        className="w-10 h-10 rounded-lg object-cover border border-[#ddd] dark:border-[#444]"
                      />

                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-[#222] dark:text-white">
                          {news.title.length > 35
                            ? news.title.slice(0, 35) + "..."
                            : news.title}
                        </span>
                        <span className="text-[#777] dark:text-[#ccc] text-xs mt-1">
                          {news.addUserFullName}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#666] dark:text-[#aaa] whitespace-nowrap">
                      {formattedDate}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

        {isDropdownVisible &&
          searchType === "courses" &&
          courseResults.length > 0 && (
            <ul className="absolute top-[50px] right-0 w-[60%] bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg z-50 border border-[#008c78]/30 max-h-60 overflow-y-auto">
              {courseResults.map((course) => {
                const formattedDate = new Intl.DateTimeFormat(
                  "fa-IR-u-ca-persian",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                ).format(new Date(course.startTime));

                return (
                  <li
                    key={course.courseId}
                    onClick={() => {
                      navigate(`/courseDetail/${course.courseId}`);
                      setIsDropdownVisible(false);
                      setSearchValue("");
                    }}
                    className="  flex items-center justify-between gap-3 px-3 py-2 cursor-pointer hover:bg-[#008c7822] dark:hover:bg-[#008c7844] transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          course.tumbImageAddress &&
                          !course.tumbImageAddress.includes("undefined") &&
                          course.tumbImageAddress.startsWith("http") &&
                          !course.tumbImageAddress
                            .toLowerCase()
                            .includes("local") &&
                          !course.tumbImageAddress
                            .toLowerCase()
                            .includes("fakepath")
                            ? course.tumbImageAddress
                            : img2
                        }
                        alt={course.title}
                        className="w-10 h-10 rounded-lg object-cover border border-[#ddd] dark:border-[#444]"
                      />

                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-[#222] dark:text-white">
                          {course.title.length > 35
                            ? course.title.slice(0, 35) + "..."
                            : course.title}
                        </span>
                        <span className="text-[#777] dark:text-[#ccc] text-xs mt-1">
                          {course.teacherName || "بدون مدرس"}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#666] dark:text-[#aaa] whitespace-nowrap">
                      {formattedDate}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

        {isDropdownVisible &&
          ((searchType === "news" && newsResults.length === 0) ||
            (searchType === "courses" && courseResults.length === 0)) &&
          searchValue.length > 1 && (
            <div className="absolute top-[50px] right-0 w-[60%] bg-white dark:bg-[#2a2a2a] rounded-lg shadow-lg z-50 border border-[#008c78]/30 text-center text-sm p-2 text-[#777]">
              {t("navbar.notfound")}
            </div>
          )}

        <button
          onClick={toggleTheme}
          className={` cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300
            ${
              isDark ? "bg-[#333] text-[#ffe600]" : "bg-[#008c78] text-white"
            } hover:scale-105 hover:bg-[#007563]`}
          aria-pressed={isDark}
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <TranslateButton />

        <Link to={isLogin ? "/UserPanel" : "/Login"}>
          <button className="   cursor-pointer  bg-[#008c78] text-white font-bold lg:font-semibold xl:font-bold rounded-full px-4 py-2 sm:px-4 sm:py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 xl:px-6 xl:py-3   text-xs sm:text-sm md:text-sm lg:text-base transition-colors duration-300 hover:bg-[#007563] ">
            {isLogin ? t("navbar.userpanel") : t("navbar.login")}{" "}
          </button>
        </Link>
      </div>
      <AnimatePresence>
        {mobileMenu && (
          <motion.ul
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-2/3 sm:w-1/2 md:w-2/5 bg-white dark:bg-[#1e1e1e] shadow-lg p-4 flex flex-col gap-4 z-50"
          >
            <div
              className={`relative flex items-center bg-white dark:bg-[#2a2a2a] rounded-[28px] transition-shadow duration-300 mt-2 ${
                isRtl ? "flex-row-reverse" : "flex-row-reverse"
              }`}
            >
              <input
                type="text"
                className={`font-medium text-[#7e7e7e] border-1 border-[#ccc] dark:text-white bg-transparent rounded-[28px] px-2 py-3 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm md:text-base outline-none flex-grow transition-all duration-300`}
                placeholder={t("navbar.search_placeholder")}
              />

              <button
                className="absolute top-1/2 transform -translate-y-1/2 dark:bg-[#008c78] bg-[#008c78] p-2 rounded-full cursor-pointer transition-colors duration-300 hover:bg-[#007563]"
                style={{
                  [isRtl ? "left" : "right"]: "0.5px",
                  [isRtl ? "right" : "left"]: "auto",
                }}
              >
                <SearchIcon sx={{ color: "white", fontSize: 24 }} />
              </button>
            </div>

            <li
              className={` mb-2 text-sm text-[#008c78] font-bold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-[#008c78] hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.academy")}
            </li>
            <Link
              to={"/"}
              onClick={() => setMobileMenu(false)}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-white hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.home")}
            </Link>
            <Link
              onClick={() => setMobileMenu(false)}
              to={"/courselist"}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-white hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.courses")}
            </Link>
            <Link
              onClick={() => setMobileMenu(false)}
              to={"/news"}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#008c78] ${
                isDark ? "text-white hover:text-[#00bfa5]" : ""
              }`}
            >
              {t("navbar.news")}
            </Link>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-2xl bg-[#008c78] text-white mt-8 p-1 cursor-pointer"
            >
              بازگشت
            </button>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/layouts/Header/Header.jsx
