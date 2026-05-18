import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllNotifications } from "../../core/services/api/Get/GetAllNotifications";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Lottie from "lottie-react";
import ReactPaginate from "react-paginate";
import notif from "../../assets/Images/Notification.json";
import empty from "../../assets/Images/empty.json";
import infinity from "../../assets/Images/Infinity Loader.json";
import { UpdateNotifications } from "../../core/services/api/put/UpdateNotifications";
import { toast } from "react-toastify";
import { GetNotificationHaventSeen } from "../../core/services/api/Get/GetNotificationHaventSeen";

const formatDate = (isoDate) => {
  if (!isoDate) return "-";
  return new Date(isoDate).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const UserPanelNotifications = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: GetAllNotifications,
  });

  const { data: dataseen, isPending } = useQuery({
    queryKey: ["notificationsseen"],
    queryFn: GetNotificationHaventSeen,
  });

  const updateMutation = useMutation({
    mutationFn: UpdateNotifications,
    onSuccess: () => {
      toast.success("عملیات با موفقیت انجام شد");
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["notificationsseen"]);
    },
    onError: () => {
      toast.error("خطا در انجام عملیات");
    },
  });

  const handleSeenClick = (notificationId) => {
    updateMutation.mutate(notificationId);
  };

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredData = useMemo(() => {
    if (selectedTab === "unread") {
      return Array.isArray(dataseen) ? dataseen : [];
    }
    return Array.isArray(data) ? data : [];
  }, [data, dataseen, selectedTab]);

  const totalPages = useMemo(() => {
    return Math.ceil((filteredData?.length || 0) / itemsPerPage);
  }, [filteredData]);

  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const displayedNotifications = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  if (isLoading || (selectedTab === "unread" && isPending)) {
    return (
      <div className=" w-full bg-[#F3F4F6] mt-5 md:m-0 md:h-[85%] flex flex-col justify-center items-center rounded-4xl p-5 dark:bg-[#333] ">
        <Lottie
          style={{ width: "250px", height: "250px" }}
          animationData={infinity}
        />
        <p className="text-[black] dark:text-[#898989] ">
          درحال بارگذاری اطلاعات...
        </p>
      </div>
    );
  }

  return (
    <div className=" font-override w-full bg-[#F3F4F6] mt-5 md:m-0 md:h-[85%] flex flex-col rounded-4xl p-5 dark:bg-[#333] ">
      <Box className="mb-4 flex-col lg:flex-row w-[96%] mx-auto flex items-center justify-between gap-5 sm:gap-3 ">
        <div className="flex  ">
          <div style={{ width: 60, height: 60 }}>
            <Lottie animationData={notif} />
          </div>
          <div>
            <Typography
              variant="h6"
              className="font-bold text-[black] dark:text-[white] "
            >
              {selectedTab === "all" ? "اعلان‌ها" : "اعلان های خوانده نشده"}
            </Typography>
            <Typography variant="body2" className="text-[#898989]">
              {selectedTab === "all"
                ? "لیست تمامی اعلان‌های حساب کاربری شما"
                : "لیست اعلان‌های خوانده نشده حساب کاربری شما"}
            </Typography>
          </div>
        </div>
        <div className="flex ">
          <p
            className={`text-[black] text-[12px] sm:text-[16px] font-semibold sm:ml-[30px] dark:text-[white] p-2 cursor-pointer
      ${selectedTab === "all" ? "border-b-3 border-[#008C78]" : ""}`}
            onClick={() => {
              setSelectedTab("all");
              setCurrentPage(1);
            }}
          >
            تمام اعلانات
          </p>

          <p
            className={`text-[black] text-[12px] sm:text-[16px] font-semibold dark:text-[white] p-2 sm:ml-[20px] cursor-pointer
      ${selectedTab === "unread" ? "border-b-3 border-[#008C78]" : ""}`}
            onClick={() => {
              setSelectedTab("unread");
              setCurrentPage(1);
            }}
          >
            اعلان های خوانده نشده
          </p>
        </div>
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        className=" w-full sm:!w-[96%] mx-auto !rounded-xl   !bg-[#F3F4F6] dark:!bg-[#333]"
      >
        <div className="hidden lg:block overflow-x-hidden">
          <Table sx={{ minWidth: 650 }} aria-label="notifications table">
            <TableHead className="bg-[#008C78] ">
              <TableRow>
                <TableCell
                  align="center"
                  className="font-bold dark:!text-[white] w-[25%]"
                >
                  وضعیت
                </TableCell>
                <TableCell
                  align="center"
                  className="font-bold dark:!text-[white] w-[32%]"
                >
                  متن پیام
                </TableCell>
                <TableCell
                  align="center"
                  className="font-bold dark:!text-[white] w-[20%]"
                >
                  تاریخ و ساعت
                </TableCell>
                <TableCell
                  align="center"
                  className="font-bold dark:!text-[white] w-[23%]"
                >
                  عملیات
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {displayedNotifications.map((row) => (
                <TableRow
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition"
                  key={row.id}
                >
                  <TableCell align="center">
                    <Chip
                      icon={row.seen ? <CheckCircleIcon /> : <ErrorIcon />}
                      label={row.seen ? "خوانده شده" : "جدید"}
                      variant="filled"
                      size="small"
                      sx={{
                        backgroundColor: row.seen ? "#008C78" : "#ffbb00ff",
                        color: row.seen ? "#fff" : "black",
                        "& .MuiChip-icon": {
                          marginLeft: "-5px",
                          marginRight: "4px",
                          color: row.seen ? "#fff" : "#fff",
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      className="text-sm font-bold text-[black] dark:text-[#898989]"
                    >
                      {row.message}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-[black] dark:text-[#898989]">
                        {formatDate(row.insertDate)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    {row.seen ? (
                      <Typography
                        variant="body2"
                        className="text-sm font-bold text-[#898989] "
                      >
                        خوانده شد
                      </Typography>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleSeenClick(row.id)}
                        disabled={updateMutation.isLoading}
                        sx={{
                          borderColor: "#008C78",
                          color: "#008C78",
                          "&:hover": {
                            borderColor: "#008C78",
                            backgroundColor: "#008C78",
                            color: "white",
                          },
                        }}
                      >
                        {updateMutation.isLoading ? "..." : "دیدم"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="block lg:hidden p-3 sm:p-4 space-y-3">
          {displayedNotifications.map((row) => (
            <div
              key={row.id}
              className="w-full rounded-xl p-3 bg-white dark:bg-[#3a3a3a] shadow-sm flex flex-col gap-2"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-start items-start sm:justify-between sm:items-center">
                <Chip
                  icon={row.seen ? <CheckCircleIcon /> : <ErrorIcon />}
                  label={row.seen ? "خوانده شده" : "جدید"}
                  variant="filled"
                  size="small"
                  sx={{
                    backgroundColor: row.seen ? "#008C78" : "#ffbb00ff",
                    color: row.seen ? "#fff" : "black",
                    "& .MuiChip-icon": {
                      marginLeft: "-5px",
                      marginRight: "4px",
                      color: row.seen ? "#fff" : "#fff",
                    },
                  }}
                />
                <span className="text-xs text-[black] dark:text-[#898989]">
                  {formatDate(row.insertDate)}
                </span>
              </div>

              <div className="text-sm text-black dark:text-white font-medium leading-6">
                {row.message}
              </div>

              <div className="flex justify-end">
                {row.seen ? (
                  <Typography
                    variant="body2"
                    className="text-sm font-bold text-[#898989] "
                  >
                    خوانده شد
                  </Typography>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleSeenClick(row.id)}
                    disabled={updateMutation.isLoading}
                    sx={{
                      borderColor: "#008C78",
                      color: "#008C78",
                      "&:hover": {
                        borderColor: "#008C78",
                        backgroundColor: "#008C78",
                        color: "white",
                      },
                    }}
                  >
                    {updateMutation.isLoading ? "..." : "دیدم"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <Box className="p-10 text-center flex flex-col items-center justify-center text-gray-400">
            <div style={{ width: 200, height: 200 }}>
              <Lottie animationData={empty} />
            </div>
            <Typography className="mt-2 text-[black] dark:text-[white]">
              هیچ اعلانی یافت نشد
            </Typography>
          </Box>
        )}
      </TableContainer>

      {totalPages > 1 && (
        <div className=" mt-5 lg:mt-14">
          {/* <ReactPaginate
            breakLabel="..."
            nextLabel="›"
            previousLabel="‹"
            onPageChange={handlePageChange}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            forcePage={currentPage - 1}
            containerClassName="flex flex-wrap gap-1 sm:gap-2 md:gap-3 items-center justify-center lg:justify-start"
            pageClassName="px-3 py-2 sm:px-4 sm:py-2  rounded-xl font-medium shadow-sm cursor-pointer text-md sm:text-sm md:text-base bg-[#EAEAEA] dark:bg-[#444] text-black dark:text-white"
            activeClassName="!bg-[#008C78] !text-white shadow-md"
            previousClassName="px-3 py-2 sm:px-4 sm:py-2  rounded-xl text-md sm:text-sm md:text-base  bg-[#EAEAEA] dark:bg-[#444] dark:text-white"
            nextClassName="px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-md sm:text-sm md:text-base  bg-[#EAEAEA] dark:bg-[#444] dark:text-white"
            previousLinkClassName="font-bold lg:px-1"
            nextLinkClassName="font-bold lg:px-1 "
          /> */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="›"
            previousLabel="‹"
            onPageChange={handlePageChange}
            pageCount={totalPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            forcePage={currentPage - 1}
            containerClassName="flex flex-wrap gap-1 sm:gap-2 md:gap-3 items-center justify-center lg:justify-start"
            pageClassName="px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium shadow-sm cursor-pointer text-md sm:text-sm md:text-base bg-[#EAEAEA] dark:bg-[#444] text-black dark:text-white"
            activeClassName="!bg-[#008C78] !text-white shadow-md"
            previousClassName="px-3 py-2 sm:px-4 sm:py-1.5 md:py-2 rounded-xl bg-[#EAEAEA] dark:bg-[#444] text-black dark:text-white flex items-center justify-center"
            nextClassName="px-3 py-2 sm:px-4 sm:py-1.5 md:py-2 rounded-xl bg-[#EAEAEA] dark:bg-[#444] text-black dark:text-white flex items-center justify-center"
            previousLinkClassName="font-black text-[24px] sm:text-[24px] leading-none"
            nextLinkClassName="font-black text-[24px] sm:text-[24px] leading-none"
            breakClassName="text-black dark:text-white"
            breakLinkClassName="text-black dark:text-white"
          />
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="font-override w-full bg-[#F3F4F6] mt-4 sm:mt-5 md:m-0 md:h-[85%] flex flex-col rounded-3xl sm:rounded-4xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 dark:bg-[#2f2f2f] transition-colors duration-300">
  //     {/* HEADER */}
  //     <Box className="mb-4 sm:mb-5 md:mb-6 w-full md:w-[96%] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
  //       {/* LEFT SIDE */}
  //       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-5">
  //         <div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px]">
  //           <Lottie animationData={notif} />
  //         </div>

  //         <div className="flex flex-col gap-1">
  //           <Typography
  //             variant="h6"
  //             className="font-extrabold tracking-tight text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-black dark:text-white"
  //           >
  //             {selectedTab === "all" ? "اعلان‌ها" : "اعلان های خوانده نشده"}
  //           </Typography>

  //           <Typography
  //             variant="body2"
  //             className="text-[#777] dark:text-[#aaa] text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]"
  //           >
  //             {selectedTab === "all"
  //               ? "لیست تمامی اعلان‌های حساب کاربری شما"
  //               : "لیست اعلان‌های خوانده نشده حساب کاربری شما"}
  //           </Typography>
  //         </div>
  //       </div>

  //       {/* RIGHT SIDE TABS */}
  //       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 lg:gap-6">
  //         <p
  //           className={`cursor-pointer px-2 py-2 text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold transition-all duration-200
  //         text-black dark:text-white
  //         ${selectedTab === "all" ? "border-b-2 border-[#008C78]" : "border-b-2 border-transparent opacity-70 hover:opacity-100"}`}
  //           onClick={() => {
  //             setSelectedTab("all");
  //             setCurrentPage(1);
  //           }}
  //         >
  //           تمام اعلانات
  //         </p>

  //         <p
  //           className={`cursor-pointer px-2 py-2 text-sm sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold transition-all duration-200
  //         text-black dark:text-white
  //         ${selectedTab === "unread" ? "border-b-2 border-[#008C78]" : "border-b-2 border-transparent opacity-70 hover:opacity-100"}`}
  //           onClick={() => {
  //             setSelectedTab("unread");
  //             setCurrentPage(1);
  //           }}
  //         >
  //           اعلان های خوانده نشده
  //         </p>
  //       </div>
  //     </Box>

  //     {/* TABLE */}
  //     <TableContainer
  //       component={Paper}
  //       elevation={0}
  //       className="!w-full sm:!w-[96%] mx-auto !rounded-2xl !bg-[#F3F4F6] dark:!bg-[#2f2f2f] overflow-x-auto"
  //     >
  //       <Table sx={{ minWidth: 650 }} aria-label="notifications table">
  //         <TableHead className="bg-[#008C78]">
  //           <TableRow>
  //             <TableCell
  //               align="center"
  //               className="font-bold text-white w-[25%] text-xs sm:text-sm md:text-base"
  //             >
  //               وضعیت
  //             </TableCell>

  //             <TableCell
  //               align="center"
  //               className="font-bold text-white w-[32%] text-xs sm:text-sm md:text-base"
  //             >
  //               متن پیام
  //             </TableCell>

  //             <TableCell
  //               align="center"
  //               className="font-bold text-white w-[20%] text-xs sm:text-sm md:text-base"
  //             >
  //               تاریخ و ساعت
  //             </TableCell>

  //             <TableCell
  //               align="center"
  //               className="font-bold text-white w-[23%] text-xs sm:text-sm md:text-base"
  //             >
  //               عملیات
  //             </TableCell>
  //           </TableRow>
  //         </TableHead>

  //         <TableBody>
  //           {displayedNotifications.map((row) => (
  //             <TableRow
  //               key={row.id}
  //               className="hover:bg-black/5 dark:hover:bg-white/5 transition"
  //             >
  //               <TableCell align="center">
  //                 <Chip
  //                   icon={row.seen ? <CheckCircleIcon /> : <ErrorIcon />}
  //                   label={row.seen ? "خوانده شده" : "جدید"}
  //                   variant="filled"
  //                   size="small"
  //                   sx={{
  //                     backgroundColor: row.seen ? "#008C78" : "#ffcc00",
  //                     color: row.seen ? "#fff" : "#111",
  //                     fontWeight: 600,
  //                     "& .MuiChip-icon": {
  //                       color: "#fff",
  //                       marginLeft: "-4px",
  //                       marginRight: "4px",
  //                     },
  //                   }}
  //                 />
  //               </TableCell>

  //               <TableCell align="right">
  //                 <Typography
  //                   variant="body1"
  //                   className="text-[12px] sm:text-sm md:text-base lg:text-[15px] font-semibold text-black dark:text-[#cfcfcf]"
  //                 >
  //                   {row.message}
  //                 </Typography>
  //               </TableCell>

  //               <TableCell align="center">
  //                 <span className="text-[11px] sm:text-sm md:text-base text-black dark:text-[#bdbdbd]">
  //                   {formatDate(row.insertDate)}
  //                 </span>
  //               </TableCell>

  //               <TableCell align="center">
  //                 {row.seen ? (
  //                   <Typography className="text-xs sm:text-sm md:text-base font-bold text-[#888]">
  //                     خوانده شد
  //                   </Typography>
  //                 ) : (
  //                   <Button
  //                     variant="outlined"
  //                     onClick={() => handleSeenClick(row.id)}
  //                     disabled={updateMutation.isLoading}
  //                     size="small"
  //                     className="text-xs sm:text-sm md:text-base"
  //                     sx={{
  //                       borderColor: "#008C78",
  //                       color: "#008C78",
  //                       fontWeight: 600,
  //                       px: { xs: 1, sm: 2, md: 3 },
  //                       py: { xs: 0.5, sm: 1 },
  //                       "&:hover": {
  //                         backgroundColor: "#008C78",
  //                         color: "white",
  //                         borderColor: "#008C78",
  //                       },
  //                     }}
  //                   >
  //                     {updateMutation.isLoading ? "..." : "دیدم"}
  //                   </Button>
  //                 )}
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>

  //       {/* EMPTY STATE */}
  //       {filteredData.length === 0 && (
  //         <Box className="p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center text-gray-400">
  //           <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px]">
  //             <Lottie animationData={empty} />
  //           </div>

  //           <Typography className="mt-3 text-black dark:text-white text-sm sm:text-base md:text-lg">
  //             هیچ اعلانی یافت نشد
  //           </Typography>
  //         </Box>
  //       )}
  //     </TableContainer>

  //     {/* PAGINATION */}
  //     {totalPages > 1 && (
  //       <div className="mt-4 sm:mt-6 md:mt-8 flex justify-start">
  //         <ReactPaginate
  //           breakLabel="..."
  //           nextLabel="›"
  //           previousLabel="‹"
  //           onPageChange={handlePageChange}
  //           pageCount={totalPages}
  //           marginPagesDisplayed={1}
  //           pageRangeDisplayed={3}
  //           forcePage={currentPage - 1}
  //           containerClassName="flex flex-wrap gap-1 sm:gap-2 md:gap-3 items-center"
  //           pageClassName="px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-xl font-medium shadow-sm cursor-pointer text-xs sm:text-sm md:text-base bg-[#EAEAEA] dark:bg-[#444] text-black dark:text-white"
  //           activeClassName="!bg-[#008C78] !text-white shadow-md"
  //           previousClassName="px-2 py-1 rounded-xl bg-[#EAEAEA] dark:bg-[#444]"
  //           nextClassName="px-2 py-1 rounded-xl bg-[#EAEAEA] dark:bg-[#444]"
  //           previousLinkClassName="font-bold px-2"
  //           nextLinkClassName="font-bold px-2"
  //         />
  //       </div>
  //     )}
  //   </div>
  // );
};

export default UserPanelNotifications;
