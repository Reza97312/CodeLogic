import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Heart from "../../../assets/Icons/Heart";
import Level from "../../../assets/Icons/Level";
import Star from "../../../assets/Icons/Star";
import Teacher from "../../../assets/Icons/Teacher";
import CourseCardView2Skeleton from "../skeleton/CourseCardSkeletonView2/CourseCardSkeletonView2";
import img2 from "../../../assets/Images/Rectanglee.png";
import { addFavCourses } from "../../../core/services/api/post/addFavCourses.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
const CourseCardView2 = ({ item, handleToggleFavorite, isLoading }) => {
  const { t } = useTranslation();

  const [isFavorite, setIsFavorite] = useState();
  const { mutate: addFav } = useMutation({
    mutationKey: ["ADDCOURSFAV"],
    mutationFn: () => addFavCourses(item.courseId),
    onSuccess: (data) => {
      toast.success(data.message);
      setIsFavorite(true);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  const onToggleFavorite = () => {
    handleToggleFavorite(item.courseId);
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return <CourseCardView2Skeleton />;
  }

  const startDateShamsi = new Date(item.startTime).toLocaleDateString("fa-IR");
  const endDateShamsi = new Date(item.endTime).toLocaleDateString("fa-IR");

  const description = t(`${item.describe}`);

  const descriptionslice =
    description.length > 40 ? description.slice(0, 40) + "..." : description;

  return (
    <div
      className=" hidden flex flex-shrink-0 gap-8 sm:gap-2 xl:gap-8 w-[100%] p-4 sm:p-2 xl:p-4 bg-[#FFFFFF] rounded-[20px] duration-300 relative   dark:bg-[#606060]
      hover:scale-[1.02] hover:shadow-[0px_0px_10px_1px_#008c78]
      sm:flex sm:w-[100%] sm:h-[184px]
      lg:w-[100%] lg:h-[208px]
      xl:w-[100%] 2xl:w-[1080px] xl:h-[232px]"
    >
      <img
        // src={
        //   item.imageAddress && !item.imageAddress.includes("undefined")
        //     ? item.imageAddress
        //     : img2
        // }
        src={item?.imageAddress || img2}
        onError={(e) => {
          e.target.src = img2;
        }}
        className="w-[30%] h-full rounded-xl
      sm:w-[30%]
      md:w-[30%]
      lg:w-[30%]
      xl:w-[337px]"
      />
      <Link
        to={`/courseDetail/${item.courseId}`}
        className="flex flex-col justify-between w-full h-full bg-[#FFFFFF] rounded-[20px] cursor-pointer   dark:bg-[#606060]"
      >
        <div className="flex flex-col gap-1 text-[#1E1E1E]">
          <h2 className="font-bold text-base   dark:text-[#EEEEEE]">
            {t(`${item.title}`)}
          </h2>
          <p className="font-regular text-sm   dark:text-[#DDDDDD]">
            {descriptionslice}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-md bg-[#EEEEEE] py-2 px-4 dark:bg-[#454545]">
          <div className="flex flex-col justify-between gap-2">
            <div className="flex gap-2 font-regular text-sm dark:text-[#DDDDDD]">
              <span className="sm:text-[13px]  lg:text-[16px] ">
                {t("courseCard.technologies")}
              </span>
              <span className="sm:text-[13px] lg:text-[16px] ">
                {item.technologyList.trim() !== ""
                  ? item.technologyList
                  : t("courseCard.withoutTechnology")}
              </span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
                <Teacher className="text-[#848484]" />
                <span className="text-[15px] sm:text-[13px] lg:text-[15px] text-[#848484]   dark:text-[#DDDDDD]">
                  {t(`${item.teacherName}`)}
                </span>
              </div>
              <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
                <Level className="text-[#848484]" />
                <span className="text-[15px] sm:text-[13px] lg:text-[15px] text-[#848484]   dark:text-[#DDDDDD]">
                  {t(`${item.levelName}`)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col justify-end gap-1">
              <div className="flex gap-1">
                <span className=" text-[15px] sm:text-[13px] lg:text-[15px] text-[#1E1E1E]   dark:text-[#EEEEEE]">
                  {t("courseCard.price")}
                </span>
                <span className="font-bold sm:text-[13px] lg:text-[16px] text-base text-[#008C78]">
                  {item.cost}
                  {t("courseCard.toman")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-regular text-sm text-[#F8BC24]">
                {t(`${Math.floor(item.courseRate.avg)}`)}
              </span>
              <Star />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="flex gap-2 font-semibold text-base text-[#848484] text-[15px] sm:text-[13px] md:text-[11px] lg:text-[15px] ">
                <span className="">{t("courseCard.startDate")}</span>
                {startDateShamsi}
              </p>
            </div>
            <div>
              <span className="flex gap-2 font-semibold text-base text-[#848484] text-[15px] sm:text-[13px] md:text-[11px] lg:text-[15px]">
                <span>{t("courseCard.endDate")}</span>
                {endDateShamsi}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() => addFav()}
        className={`p-2 rounded-[50px] transition absolute top-[13px] right-[14px] cursor-pointer opacity-25 text-[#EEEEEE]
            ${isFavorite ? "bg-[#FF0000]" : "bg-[#000000]"}`}
      >
        <Heart />
      </button>
    </div>
  );
};

export default CourseCardView2;
