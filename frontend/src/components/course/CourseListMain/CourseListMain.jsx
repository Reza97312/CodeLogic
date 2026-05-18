<<<<<<< HEAD:frontend/src/components/course/CourseListMain/CourseListMain.jsx
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import CourseCardView1 from "../../common/CourseCardView1/CourseCardView1";
import CourseCardView2 from "../../common/CourseCardView2/CourseCardView2";
import SortView from "../SortView/SortView";
import { addFavCourses } from "../../../core/services/api/post/addFavCourses";
import { deleteFavCourses } from "../../../core/services/api/delete/deleteFavCourses";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CourseListMainSkeleton from "../../common/skeleton/CourseListMainSkeleton/CourseListMainSkeleton";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import { useNavigate } from "react-router-dom";
import compareManager from "../../compareManager/compareManager";

const VIEW_TYPE_LIST = "list";
const VIEW_TYPE_GRID = "grid";

const CourseListMain = ({
  coursesData,
  isLoading,
  currentPage,
  setCurrentPage,
  sortType,
  setSortType,
  pageSize,
  setPageSize,
  pageCount,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("courseViewType") || VIEW_TYPE_GRID;
  });

  const CourseCardComponent =
    currentView === VIEW_TYPE_LIST ? CourseCardView2 : CourseCardView1;

  const [comparedCourseIds, setComparedCourseIds] = useState([]);

  useEffect(() => {
    const unsubscribe = compareManager.subscribe((next) => {
      setComparedCourseIds(next);
    });
    return unsubscribe;
  }, []);

  const handleToggleCompare = (courseId) => {
    compareManager.toggle(courseId);
  };

  useEffect(() => {
    if (comparedCourseIds.length === 2) {
      const url = `/comparison?course1=${comparedCourseIds[0]}&course2=${comparedCourseIds[1]}`;
      navigate(url);
      compareManager.clear();
      setComparedCourseIds([]);
    }
  }, [comparedCourseIds, navigate]);

  const handleViewChange = (courseViewType) => {
    setCurrentView(courseViewType);
    localStorage.setItem("courseViewType", courseViewType);
  };

  const [favorites, setFavorites] = useState({});
  const handleToggleFavorite = async (courseId) => {
    const isFavorite = favorites[courseId] || false;
    if (isFavorite) {
      await deleteFavCourses(courseId);
      toast.success(t("courseCard.removeFavSuccessToast"));
    } else {
      await addFavCourses(courseId);
      toast.success(t("courseCard.addFavSuccessToast"));
    }
    setFavorites((prev) => ({
      ...prev,
      [courseId]: !isFavorite,
    }));
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && currentView === VIEW_TYPE_LIST) {
        setCurrentView(VIEW_TYPE_GRID);
        localStorage.setItem("courseViewType", VIEW_TYPE_GRID);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [currentView]);

  return (
    <div className=" flex  flex-col gap-8 w-full  ">
      <SortView
        onViewChange={handleViewChange}
        currentView={currentView}
        currentPageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        sortType={sortType}
        setSortType={setSortType}
        isLoading={isLoading}
      />

      {comparedCourseIds.length > 0 && comparedCourseIds.length < 2 && (
        <div
          className="bg-[#008c7711]  border-l-4 border-[#008C78] text-[#008C78] rounded-2xl p-4 w-[100%] sm:w-[93%]"
          role="alert"
        >
          <p>
            برای مقایسه دوره، لطفا {2 - comparedCourseIds.length} دوره دیگر را
            انتخاب کنید.
          </p>
        </div>
      )}

      {isLoading ? (
        <CourseListMainSkeleton count={pageSize} />
      ) : coursesData?.courseFilterDtos?.length > 0 ? (
        <div className="flex  justify-center flex-row w-full  flex-wrap sm:justify-center md:justify-start gap-y-8 gap-x-4 ">
          {coursesData.courseFilterDtos.map((item, index) => (
            <CourseCardComponent
              item={item}
              key={index}
              handleToggleFavorite={handleToggleFavorite}
              handleToggleCompare={handleToggleCompare}
              isCompared={comparedCourseIds.includes(item.courseId)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full mb-10">
          <Lottie
            className="w-[200px] h-[170px] my-10 mx-auto"
            animationData={empty}
            loop={true}
          />
          <p className="font-bold text-[black] text-[20px] text-center dark:text-[#848484]">
            {" "}
            دوره مورد نظر یافت نشد
          </p>
        </div>
      )}

      {!isLoading && pageCount > 1 && (
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
  );
};

export default CourseListMain;
=======
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import CourseCardView1 from "../../common/CourseCardView1/CourseCardView1";
import CourseCardView2 from "../../common/CourseCardView2/CourseCardView2";
import SortView from "../SortView/SortView";
import { addFavCourses } from "../../../core/services/api/post/addFavCourses";
import { deleteFavCourses } from "../../../core/services/api/delete/deleteFavCourses";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CourseListMainSkeleton from "../../common/skeleton/CourseListMainSkeleton/CourseListMainSkeleton";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import { useNavigate } from "react-router-dom";
import compareManager from "../../compareManager/compareManager";

const VIEW_TYPE_LIST = "list";
const VIEW_TYPE_GRID = "grid";

const CourseListMain = ({
  coursesData,
  isLoading,
  currentPage,
  setCurrentPage,
  sortType,
  setSortType,
  pageSize,
  setPageSize,
  pageCount,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem("courseViewType") || VIEW_TYPE_GRID;
  });

  const CourseCardComponent =
    currentView === VIEW_TYPE_LIST ? CourseCardView2 : CourseCardView1;

  const [comparedCourseIds, setComparedCourseIds] = useState([]);

  useEffect(() => {
    const unsubscribe = compareManager.subscribe((next) => {
      setComparedCourseIds(next);
    });
    return unsubscribe;
  }, []);

  const handleToggleCompare = (courseId) => {
    compareManager.toggle(courseId);
  };

  useEffect(() => {
    if (comparedCourseIds.length === 2) {
      const url = `/comparison?course1=${comparedCourseIds[0]}&course2=${comparedCourseIds[1]}`;
      navigate(url);
      compareManager.clear();
      setComparedCourseIds([]);
    }
  }, [comparedCourseIds, navigate]);

  const handleViewChange = (courseViewType) => {
    setCurrentView(courseViewType);
    localStorage.setItem("courseViewType", courseViewType);
  };

  const [favorites, setFavorites] = useState({});
  const handleToggleFavorite = async (courseId) => {
    const isFavorite = favorites[courseId] || false;
    if (isFavorite) {
      await deleteFavCourses(courseId);
      toast.success(t("courseCard.removeFavSuccessToast"));
    } else {
      await addFavCourses(courseId);
      toast.success(t("courseCard.addFavSuccessToast"));
    }
    setFavorites((prev) => ({
      ...prev,
      [courseId]: !isFavorite,
    }));
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && currentView === VIEW_TYPE_LIST) {
        setCurrentView(VIEW_TYPE_GRID);
        localStorage.setItem("courseViewType", VIEW_TYPE_GRID);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [currentView]);

  return (
    <div className=" flex  flex-col gap-8 w-full  ">
      <SortView
        onViewChange={handleViewChange}
        currentView={currentView}
        currentPageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        sortType={sortType}
        setSortType={setSortType}
        isLoading={isLoading}
      />

      {comparedCourseIds.length > 0 && comparedCourseIds.length < 2 && (
        <div
          className="bg-[#008c7711]  border-l-4 border-[#008C78] text-[#008C78] rounded-2xl p-4 w-[100%] sm:w-[93%]"
          role="alert"
        >
          <p>
            برای مقایسه دوره، لطفا {2 - comparedCourseIds.length} دوره دیگر را
            انتخاب کنید.
          </p>
        </div>
      )}

      {isLoading ? (
        <CourseListMainSkeleton count={pageSize} />
      ) : coursesData?.courseFilterDtos?.length > 0 ? (
        <div className="flex  justify-center flex-row w-full  flex-wrap sm:justify-center md:justify-start gap-y-8 gap-x-4 ">
          {coursesData.courseFilterDtos.map((item, index) => (
            <CourseCardComponent
              item={item}
              key={index}
              handleToggleFavorite={handleToggleFavorite}
              handleToggleCompare={handleToggleCompare}
              isCompared={comparedCourseIds.includes(item.courseId)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full mb-10">
          <Lottie
            className="w-[200px] h-[170px] my-10 mx-auto"
            animationData={empty}
            loop={true}
          />
          <p className="font-bold text-[black] text-[20px] text-center dark:text-[#848484]">
            {" "}
            دوره مورد نظر یافت نشد
          </p>
        </div>
      )}

      {!isLoading && pageCount > 1 && (
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
  );
};

export default CourseListMain;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/course/CourseListMain/CourseListMain.jsx
