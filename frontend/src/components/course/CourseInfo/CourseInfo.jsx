import React from "react";
import Calendar from "../../../assets/Icons/Calendar";
import Clock from "../../../assets/Icons/Clock";
import Users from "../../../assets/Icons/Users";
import { useTranslation } from "react-i18next";
import { reserveCourses } from "../../../core/services/api/post/reserveCourses";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CourseInfo = ({ course }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const queryClient = useQueryClient();

  const isReserve = course.isCourseReseve;
  const courseId = course.courseId;

  const reserveMutation = useMutation({
    mutationFn: () => reserveCourses(courseId),
    onSuccess: () => {
      toast.success(t("courseInfo.reserveSuccessToast"));
      queryClient.invalidateQueries({ queryKey: ["GETCOURSEBYID"] });
    },
    onError: (error) => {
      if (error?.response?.status === 401) return;
    },
  });

  const onReserveCourses = () => {
    if (isReserve) {
      toast.info(t("courseInfo.reservedInfoToast"));
      return;
    }

    reserveMutation.mutate();
  };

  const discountedPrice = course.cost * 0.5;

  const startDateShamsi = new Date(course.startTime).toLocaleDateString(
    "fa-IR",
  );
  const endDateShamsi = new Date(course.endTime).toLocaleDateString("fa-IR");

  const PersianNumber = (num) => {
    return num.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };

  const titleSlice =
    course.title.length > 24 ? course.title.slice(0, 24) + "..." : course.title;

  return (
    <div
      className="flex  flex-col gap-12 w-[85%] sm:w-[85%] md:w-full p-4 bg-[#FFFFFF] rounded-[25px] shadow-[0_0_10px_rgba(0,0,0,0.15)]
      dark:bg-[#393939]
      lg:gap-16  2xl:w-[380px]"
    >
      <h3 className="font-bold text-lg sm:text-xl text-[#1E1E1E] dark:text-[#DDDDDD]">
        {titleSlice}
      </h3>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-[#BBBBBB]">
                <Calendar />
              </span>
              <span className="font-regular text-base text-[#1E1E1E] dark:text-[#CCCCCC]">
                {t("courseInfo.startDate")}
              </span>
            </div>
            <span className="font-regular text-sm text-[#848484]">
              {startDateShamsi}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-[#BBBBBB]">
                <Clock />
              </span>
              <span className="font-regular text-base text-[#1E1E1E] dark:text-[#CCCCCC]">
                {t("courseInfo.startTime")}
              </span>
            </div>
            <span className="font-regular text-sm text-[#848484]">
              {PersianNumber(course.startTime.slice(11, 16))}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-[#BBBBBB]">
                <Clock />
              </span>
              <span className="font-regular text-base text-[#1E1E1E] dark:text-[#CCCCCC]">
                {t("courseInfo.endDate")}
              </span>
            </div>
            <span className="font-regular text-sm text-[#848484]">
              {endDateShamsi}
            </span>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-[#BBBBBB]">
                <Users />
              </span>
              <span className="font-regular text-base text-[#1E1E1E] dark:text-[#CCCCCC]">
                {t("courseInfo.courseCapacity")}
              </span>
            </div>
            <span className="font-regular text-sm text-[#848484]">
              {course.capacity} {t("courseInfo.person")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center justify-center py-[1px] sm:py-[10px] px-2 sm:px-4 font-bold text-[13px] lg:text-base text-[#FFFFFF] bg-[#EF5350] rounded-[15px]">
              {`50%`} {t("courseInfo.off")}
            </span>

            <div className="flex flex-col">
              <div className="flex gap-8">
                <span className="font-regular text-sm text-[#1E1E1E] dark:text-[#CCCCCC]">
                  {t("courseInfo.price")}
                </span>
                <span className="font-regular text-sm text-[#848484] line-through">
                  {course.cost}
                </span>
              </div>

              <div
                className={`flex gap-1 font-bold text-[18px] text-[#008C78] ${
                  isRtl ? "rtl" : "ltr"
                }`}
              >
                <span>{t("courseInfo.toman")}</span>
                <span>{discountedPrice}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onReserveCourses}
          className={`py-4  font-regular text-[18px] rounded-[20px] cursor-pointer
            ${
              isReserve
                ? "text-[#008C78] bg-[#eeeeeead] font-semibold dark:bg-[#454545]"
                : "text-[#FFFFFF] bg-[#24D0B7] "
            }`}
        >
          {isReserve ? t("courseInfo.reserved") : t("courseInfo.reserveBtn")}
        </button>
      </div>
    </div>
  );
};

export default CourseInfo;
