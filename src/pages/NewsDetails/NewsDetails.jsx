import React, { useEffect, useMemo, useRef, useState } from "react";
import NewsSideBar from "../../components/news/NewsDetails/NewsSideBar/NewsSideBar";
import TitleImage from "../../components/news/NewsDetails/TitleImage/TitleImage";
import NewsComment from "../../components/news/NewsDetails/NewsComment/NewsComment";
import NewsCard from "../../components/news/NewsCard/NewsCard";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import getAllNews from "../../core/services/api/Get/News";
import getNewsDetails from "../../core/services/api/Get/NewsDetails";
import { Link, useParams } from "react-router-dom";
import NewsDetailsSkeleton from "../../components/common/skeleton/NewsDetailsSkeleton/NewsDetailsSkeleton";
import { toast } from "react-toastify";
import { NewsRate } from "../../core/services/api/post/NewsRate";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import img1 from "../../assets/Images/Ellipsee.png";
import img2 from "../../assets/Images/HTML5Course.png";
import Lottie from "lottie-react";
import empty from "../../assets/Images/empty.json";

const NewsDetails = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { data } = useQuery({
    queryKey: "getallnews",
    queryFn: getAllNews,
  });

  const { id } = useParams();

  console.log(id);

  const { data: response, isLoading } = useQuery({
    queryKey: ["getnewsdetail", id],

    queryFn: () => getNewsDetails(id),
  });

  const newsDetail = response?.detailsNewsDto;

  console.log(" newsdetail", response);

  const sortedNews = useMemo(() => {
    if (!data?.news) return [];
    return [...data.news]
      .sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate))
      .slice(0, 6);
  }, [data]);

  const categoryNews = useMemo(() => {
    if (!data?.news || !newsDetail?.newsCatregoryName) return [];

    const filtered = data.news.filter(
      (item) =>
        item.newsCatregoryName === newsDetail.newsCatregoryName &&
        item.id !== newsDetail.id,
    );

    return filtered
      .sort((a, b) => new Date(b.insertDate) - new Date(a.insertDate))
      .slice(0, 6);
  }, [data, newsDetail]);

  const { t } = useTranslation();
  const sliderRef = useRef(null);

  const scrollHandler = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.scrollWidth * 0.07;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    if (direction === "right") {
      const newPosition = Math.min(
        container.scrollLeft + scrollAmount,
        maxScrollLeft,
      );
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    } else if (direction === "left") {
      const newPosition = Math.max(container.scrollLeft - scrollAmount, 0);
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const StarRating = ({ newsId, initialRating }) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(null);

    useEffect(() => {
      setRating(initialRating);
    }, [initialRating]);

    const rateMutation = useMutation({
      mutationFn: ({ id, rate }) => NewsRate(id, rate),
      onSuccess: (data, variables) => {
        setRating(variables.rate);
        toast.success("امتیاز شما با موفقیت ثبت شد ");
      },
      onError: (error) => {
        if (error?.response?.status === 401) return;
        if (error.response && error.response.status === 400) {
          toast.info("شما قبلا امتیاز خود را ثبت کرده اید");
        } else {
          toast.error("خطا در ثبت امتیاز");
        }
      },
    });

    const handleRate = (value) => {
      rateMutation.mutate({ id: newsId, rate: value });
    };

    const displayRating = hover || rating;

    return (
      <div className="flex items-center gap-2 w-full justify-between ">
        <div className="">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer transition-transform transform hover:scale-110"
            >
              {star <= displayRating ? (
                <StarIcon className="text-yellow-400 text-[28px]" />
              ) : (
                <StarBorderIcon className="text-yellow-400 text-[28px]" />
              )}
            </span>
          ))}
        </div>

        <span className="font-[16px] text-[#848484]   ">
          {rating.toFixed(1)}
          <span className="mr-1">امتیاز</span>
        </span>
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return <NewsDetailsSkeleton />;
  }

  return (
    <motion.div
      className="flex flex-wrap"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="bg-[#F3F4F6] dark:bg-[#1e1e1e] w-full">
        {" "}
        <div className="pt-10 flex flex-col justify-center items-center px-4 ">
          <motion.span
            className="font-bold mb-5 text-[#008C78] dark:text-[#ccc]  text-center "
            variants={itemVariants}
          >
            <Link to="/">
              <span className="cursor-pointer">
                {t("NewsDetails.breadcrumbs1")}{" "}
              </span>
            </Link>
            <Link to="/news">
              <span className="cursor-pointer ">
                {t("NewsDetails.breadcrumbs2")}{" "}
              </span>
            </Link>

            <span>{newsDetail?.title}</span>
          </motion.span>

          <motion.p
            className="font-bold text-xl sm:text-2xl md:text-3xl text-[#1E1E1E] dark:text-[#fff] text-center"
            variants={itemVariants}
          >
            {newsDetail?.title}
          </motion.p>
        </div>
        <div className="flex flex-col lg:flex-row items-start justify-between max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <motion.div
            className="ml-5 w-full flex flex-wrap gap-10 lg:w-1/4 lg:w-[29%] relative mb-6 lg:mb-0"
            variants={containerVariants}
          >
            <motion.div
              className="flex flex-col w-full gap-2 items-center justify-center bg-[white] shadow-md rounded-3xl py-5 dark:bg-[#333]"
              variants={itemVariants}
            >
              <img
                className="rounded-full w-[50%]  h-[75%] "
                src={
                  newsDetail.addUserProfileImage
                    ? newsDetail.addUserProfileImage
                    : img1
                }
              />
              <span className="font-[16px] text-[#848484] ">
                {" "}
                {t("NewsDetails.authorLabel")}
              </span>
              <span className="font-[18px] font-bold text-[#1E1E1E] dark:text-[white] ">
                {" "}
                {newsDetail?.addUserFullName}
              </span>
            </motion.div>

            <motion.div
              className="w-full flex flex-wrap rounded-3xl shadow-md bg-[white] py-5 dark:bg-[#333]"
              variants={itemVariants}
            >
              <span className="font-bold w-full text-[#1E1E1E] font-[18px] px-4 dark:text-[white]  ">
                {t("NewsDetails.userSatisfaction")}
              </span>

              <div className="flex items-center w-full mt-7 justify-start lg:justify-between px-4  ">
                <StarRating
                  newsId={newsDetail?.id}
                  initialRating={newsDetail?.newsRate?.avg || 0}
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full flex flex-wrap rounded-3xl shadow-md bg-[white] py-5 dark:bg-[#333]"
              variants={itemVariants}
            >
              <span className="text-[#1E1E1E] font-[18px] font-bold px-4 dark:text-[white] ">
                {t("NewsDetails.latestNews")}
              </span>

              {sortedNews.map((news) => (
                <NewsSideBar
                  key={news.id}
                  image={
                    news.currentImageAddress &&
                    !news.currentImageAddress.includes("undefined") &&
                    news.currentImageAddress.startsWith("http") &&
                    !news.currentImageAddress.toLowerCase().includes("local") &&
                    !news.currentImageAddress.toLowerCase().includes("fakepath")
                      ? news.currentImageAddress
                      : img2
                  }
                  title={news.title}
                  name={news.addUserFullName}
                  id={news.id}
                  date={new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(news.insertDate))}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full flex flex-wrap lg:w-3/4 lg:w-[69%] md:ml-6 "
            variants={itemVariants}
          >
            <TitleImage newsDetail={newsDetail} />
            <NewsComment newsId={id} />
          </motion.div>
        </div>
      </div>

      <div className="w-full flex flex-wrap bg-[#F3F4F6] dark:bg-[#1e1e1e] ">
        <div className="w-full flex items-center justify-between py-2 px-15">
          <p className="font-bold text-[#008C78] text-[16px] sm:text-[24px] ">
            {" "}
            {t("NewsDetails.relatedNews")}
          </p>
          <div className="flex justify-between gap-5 hidden lg:flex">
            <div
              onClick={() => scrollHandler("right")}
              className="cursor-pointer text-[#008C78] rounded-full p-1 hover:bg-[#008C78] hover:text-white transition-all duration-300"
            >
              <EastIcon className=" !text-[25px] sm:!text-[34px] font-bold" />
            </div>
            <div
              onClick={() => scrollHandler("left")}
              className="cursor-pointer text-[#008C78] rounded-full p-1 hover:bg-[#008C78] hover:text-white transition-all duration-300"
            >
              <WestIcon className=" !text-[25px] sm:!text-[34px] font-bold" />
            </div>
          </div>
        </div>

        <motion.div
          ref={sliderRef}
          className=" w-full flex flex-row-reverse gap-4 md:gap-6 lg:gap-8 overflow-x-visible lg:overflow-x-hidden overflow-y-hidden scroll-smooth px-4 sm:px-6 md:px-8 lg:px-10 mb-20 lg:scrollbar-hide"
          variants={containerVariants}
        >
          {categoryNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center w-full">
              <Lottie
                style={{ width: "200px", height: "200px" }}
                animationData={empty}
              />
              <p className="text-center w-full py-8 text-[black] dark:text-[#898989]">
                اخبار مرتبطی یافت نشد
              </p>
            </div>
          ) : (
            categoryNews.map((news, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <NewsCard
                  id={news.id}
                  image={
                    news.currentImageAddress &&
                    !news.currentImageAddress.includes("undefined") &&
                    news.currentImageAddress.startsWith("http") &&
                    !news.currentImageAddress.toLowerCase().includes("local") &&
                    !news.currentImageAddress.toLowerCase().includes("fakepath")
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
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewsDetails;
