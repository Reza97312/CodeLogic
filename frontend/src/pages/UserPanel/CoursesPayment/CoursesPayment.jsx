import React, { useState } from "react";
import CourseHeader from "../../../components/userPanel/CoursePayment/CourseHeader/CourseHeader";
import CoursePayment from "../../../components/userPanel/CoursePayment/CoursePayment";
import { paymentsData } from "../../../components/common/data/CoursePayments/payments";
import { AnimatePresence, motion, number } from "framer-motion";
import { useTranslation } from "react-i18next";
import pr from "../../../assets/Icons/A/pr.png";
import pl from "../../../assets/Icons/A/pl.png";
import searchIcon from "../../../assets/Icons/A/search.png";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { GetCoursesPayments } from "../../../core/services/api/Get/GetCoursesPayments";
import { useDebounce } from "use-debounce";
import CoursesPaymentsSkeleton from "../../../components/common/skeleton/CoursesPayments/CoursesPaymentsSkeleton";
import Lottie from "lottie-react";
import empty from "../../../assets/Images/empty.json";
import { PersianDateConverter } from "../../../utils/helper/dateConverter.js";
const CoursesPayment = () => {
  //// get payments ///
  const { data: PaymentsData, isPending } = useQuery({
    queryKey: ["COURSESPAYMENTS"],
    queryFn: () => GetCoursesPayments(),
  });
  const coursesPaymentsData = PaymentsData || [];
  // i18n //
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "fa";
  // pagination //
  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useDebounce(searchTerm, 700);
  const [currentPage, setcurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(2);
  const [filterStatus, setFilterStatus] = useState("همه");

  const filteredPayments = coursesPaymentsData.filter((p) => {
    const matchesSearch =
      p.courseId.trim().toLowerCase().includes(value.trim().toLowerCase()) ||
      p.PeymentDate.trim().toLowerCase().includes(value.trim().toLowerCase());
    if (filterStatus === "همه") {
      return matchesSearch;
    }
    const bool = filterStatus === "true";
    const matchesFilters = p.accept === bool;
    return matchesFilters && matchesSearch;
  });
  const startIndex = (currentPage - 1) * paymentsPerPage;
  const endIndex = startIndex + paymentsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
  const handlePageChange = (p) => {
    const selectedPage = p.selected + 1;
    setcurrentPage(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  /// toggle modal ///
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleToggleModal = (courseId) => {
    setOpenModal(true);
    setModalData(PaymentsData.find((items) => items.courseId === courseId));
  };
  /// motion framer ///
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
    <div
      className="bg-[#F3F4F6] dark:bg-[#333]  w-full p-5 flex
     max-h-[89%] h-full flex-col justify-between mx-auto mt-4 rounded-4xl "
    >
      {/* ----------- filtering  */}
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between items-center pb-5 md:p-0">
        <AnimatePresence>
          <motion.div
            variants={rightAnimate}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative [w-50%] md:max-w-[40%] md:w-full"
          >
            <input
              className=" dark:bg-[#454545] dark:text-[#ffff] dark:placeholder:text-white
                     w-full h-full shadow py-2 px-3 bg-[#ffff] rounded-[16px] focus:outline-none "
              type="text"
              placeholder={t("coursesPayment.search")}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
              className={` absolute ${
                isRTL ? "left-3" : "right-3"
              } top-[50%] translate-y-[-50%] `}
              src={searchIcon}
              alt=""
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="flex h-full items-center bg-[#ffff] dark:bg-[#454545] dark:text-[#ffff]
         rounded-xl border shadow p-2 md:p-1 border-[#EAEAEA] "
        >
          <span className="text-[16px] hidden md:inline ps-3">
            {t("coursesPayment.filters")}
          </span>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setcurrentPage(1);
            }}
            className=" rounded-xl text-sm cursor-pointer  ps-2 text-gray-600
                         dark:bg-[#454545] dark:text-[#ffff] bg-[#ffff]"
          >
            <option value="همه">({t("favoriteNews.all")})</option>
            <option value="false">
              ({t("coursesPayment.AwaitingConfirmation")})
            </option>
            <option value="true">({t("coursesPayment.confirmed")})</option>
          </select>
        </div>
      </div>
      {/* ------ payments */}
      <motion.div
        variants={fadeInUp(0)}
        initial="hidden"
        animate="visible"
        className="  dark:bg-[#454545] dark:text-[#ffff]
             h-[85%] bg-[#ffff] shadow rounded-4xl flex flex-col justify-between"
      >
        <div className="flex flex-col h-[70%] ">
          <CourseHeader />
          {isPending &&
            [...Array(paymentsPerPage)].map((_, i) => (
              <CoursesPaymentsSkeleton key={i + 4} />
            ))}
          {!isPending && (
            <div className="overflow-y-auto h-full">
              {currentPayments.length > 0 ? (
                currentPayments.map((items) => (
                  <CoursePayment
                    key={items.id}
                    items={items}
                    handleToggleModal={handleToggleModal}
                  />
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
          )}
        </div>
        {/* -------- buttons */}
        <div className="flex flex-col md:flex-row md:justify-between p-4 md:p-8">
          <div>
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
          </div>
          {/* ------------ filterCount */}
          <div
            className="flex items-center mx-auto md:m-0 dark:bg-[#454545] dark:text-[#ffff]
           rounded-xl border shadow-md p-2 md:p-0 border-[#EAEAEA] mt-6 "
          >
            <span className=" text-[16px] ps-1">
              {t("coursesPayment.NumberShows")}
            </span>
            <select
              value={paymentsPerPage}
              onChange={(e) => {
                setPaymentsPerPage(Number(e.target.value));
                setcurrentPage(1);
              }}
              className=" rounded-xl text-sm cursor-pointer px-3 md:py-1 dark:bg-[#454545] dark:text-[#ffff]"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={6}>6</option>
            </select>
          </div>
        </div>
      </motion.div>
      {/* open modal */}
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpenModal(false)}
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
            className=" w-[90%] md:w-[30%] bg-[#eee] rounded-3xl flex
                flex-col items-center mt-3 gap-6  py-4 px-6 dark:text-white dark:bg-[#333] "
          >
            <h2 className="text-[19px] text-[#008C78] dark:text-[#008C78] mx-auto font-bold">
              {modalData.courseId}
            </h2>
            <div className="flex gap-2 text-[##008C78]">
              {t("coursesPayment.paymentDate")}:
              <div className="text-[14px] text-[#848484] dark:text-[#848484] truncate ">
                {PersianDateConverter(modalData.PeymentDate)}
              </div>
            </div>
            <div className="flex gap-2 text-[##008C78] ">
              {t("coursesPayment.DateEntered")}:
              <div className="text-[14px] text-[#848484] dark:text-[#848484] truncate">
                {PersianDateConverter(modalData.instertDate)}
              </div>
            </div>
            <div className="flex gap-2 text-[##008C78]">
              {t("coursesPayment.PaymentStatus")}:
              <div
                className={` px-1 py-1 rounded-xl text-[14px]${
                  modalData.accept === true
                    ? "bg-[#EEFFFC] text-[#008C78] "
                    : "bg-[#FFECEC] text-[#E7000B] "
                } `}
              >
                {modalData.accept === true ? "تایید شده" : "درانتظار تایید"}
              </div>
            </div>
            <div className="flex gap-2 text-[##008C78]">
              {t("coursesPayment.Payment")}:
              <div className="text-[14px] text-[#848484] dark:text-[#848484]">
                {modalData.Paid.toLocaleString()}
              </div>
            </div>
            <button
              onClick={() => setOpenModal(false)}
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

export default CoursesPayment;
