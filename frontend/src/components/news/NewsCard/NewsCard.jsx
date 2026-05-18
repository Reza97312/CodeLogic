import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import LayersIcon from "@mui/icons-material/Layers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PostFavoriteNews } from "../../../core/services/api/post/PostFavoriteNews";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import NewsCardSkeleton from "../../common/skeleton/NewsCardSkeleton/NewsCardSkeleton";
import Tilt from "react-parallax-tilt";

const NewsCard = ({
  image,
  title,
  description,
  views,
  rating,
  category,
  date,
  viewType,
  id,
  isLoading = false,
}) => {
  const [liked, setLiked] = useState(false);

  const { t, i18n } = useTranslation();

  const { mutate: postFavoriteTop } = useMutation({
    mutationKey: ["Postfavorite"],
    mutationFn: (value) => PostFavoriteNews(value),
    onError: (error) => {
      if (error?.response?.status === 401) return;
      setLiked(false);
      toast.error(t("newsPage.addfavotiteerr"));
    },
    onSettled: (data) => {
      if (data?.success) {
        toast.success(t("newsPage.addfavotitesuc"));
      } else if (data && !data.success) {
        toast.error(data.message);
      }
    },
  });

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const isRtl = i18n.language === "fa";
  const isList = viewType === "list";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <NewsCardSkeleton viewType={viewType} />;
  }

  return (
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      scale={1.02}
      perspective={900}
      transitionSpeed={1500}
      tiltReverse={true}
      glareEnable={true}
      glareMaxOpacity={0.25}
      glareColor="white"
      glarePosition="all"
      reset={true}
    >
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className={`  bg-transparent rounded-2xl overflow-hidden shadow-[0px_0px_1px_1px_#ccc] transition-all duration-300
        ${
          isList
            ? "flex  w-full h-[150px] md:h-[180px] lg:h-[200px]"
            : "w-full mt-3 mb-3 "
        }
      `}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div
          className={`relative flex items-center  justify-center bg-transparent dark:bg-[#282828]
          ${
            isList
              ? "w-2/5 md:w-[35%] lg:w-[30%] flex-shrink-0"
              : "w-full h-40 sm:h-52 md:h-60"
          }
        `}
        >
          <img
            src={image}
            alt={title}
            className={`${
              isList
                ? "w-[80%] h-[80%] rounded-xl object-fill"
                : "w-full h-full object-fill rounded-t-2xl"
            }`}
          />

          <div
            onClick={() => {
              if (!liked) {
                setLiked(true);
                postFavoriteTop(id);
              } else {
                setLiked(true);
                postFavoriteTop(id);
              }
            }}
            className={`absolute top-3 right-3 p-2 rounded-full cursor-pointer duration-200
            ${liked ? "bg-red-500" : "bg-black/45 backdrop-blur-sm"}
          `}
          >
            <FavoriteBorderIcon
              sx={{ color: liked ? "white" : "white", fontSize: 24 }}
            />
          </div>
        </div>{" "}
        <div
          className={`bg-white dark:bg-[#333] rounded-2xl shadow-sm px-4 pt-4 pb-3 relative z-10 flex flex-col justify-between
          ${
            isList
              ? "w-3/5 md:w-[65%] lg:w-[70%]  rounded-l-none"
              : "-mt-4 min-h-[160px]"
          }
        `}
        >
          <div className={isRtl ? "text-right" : "text-left"}>
            <h3 className="text-sm sm:text-[15px] font-bold text-gray-800 leading-snug dark:text-white line-clamp-2">
              <Link to={`/news/${id}`}>{title}</Link>
            </h3>

            <p
              className={`text-gray-600 text-xs sm:text-[13px] mt-1 leading-5 dark:text-[#ccc]
              ${isList ? "line-clamp-3 lg:line-clamp-4" : "line-clamp-2"}
            `}
            >
              {description}
            </p>
          </div>

          <div
            className={`flex justify-between items-center mt-3 text-gray-500 text-xs sm:text-[13px] border-t border-gray-100 dark:border-[#444] pt-2 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex items-center gap-1">
              <LayersIcon sx={{ fontSize: 16, color: "#777" }} />
              <span>{category}</span>
            </div>

            <div className="flex items-center gap-1">
              <VisibilityIcon sx={{ fontSize: 17, color: "#777" }} />
              <span>{views}</span>
            </div>
          </div>

          <div
            className={`flex justify-between items-center mt-2 text-[11px] sm:text-[12px] text-gray-500 ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex items-center gap-1">
              <CalendarMonthIcon sx={{ fontSize: 16, color: "#777" }} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <StarIcon sx={{ fontSize: 17, color: "#FBBF24" }} />
              <span className="text-gray-700 font-medium dark:text-[#ccc]">
                {rating}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default NewsCard;
