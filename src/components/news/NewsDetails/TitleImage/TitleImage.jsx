import React, { useState } from "react";
import img1 from "../../../../assets/Images/HTML5Course.png";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMutation } from "@tanstack/react-query";
import { NewsLike } from "../../../../core/services/api/post/NewsLike";
import { Newsdeslike } from "../../../../core/services/api/post/NewsDeslike";
import { toast } from "react-toastify";
import { DeleteLikeNews } from "../../../../core/services/api/Delete/DeleteLikeNews";

const TitleImage = ({ newsDetail }) => {
  const [likeCount, setLikeCount] = useState(newsDetail?._count?.newsLike);
  const [dislikeCount, setDislikeCount] = useState(
    newsDetail?._count?.newsDissLike,
  );
  const [userVote, setUserVote] = useState(
    newsDetail?.currentUserIsLike
      ? "like"
      : newsDetail?.currentUserIsDissLike
        ? "dislike"
        : null,
  );

  const likeMutation = useMutation({
    mutationFn: (id) => NewsLike(id),
    onSuccess: () => {
      toast.success("لایک شما ثبت شد ");
      if (userVote === "dislike") {
        setDislikeCount((prev) => Math.max(prev - 1, 0));
      }
      if (userVote !== "like") {
        setLikeCount((prev) => prev + 1);
      }
      setUserVote("like");
    },
    onError: (err) => {
      if (err?.response?.status === 401) return;
      toast.error("خطا در ثبت لایک ");
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: (id) => Newsdeslike(id),
    onSuccess: () => {
      toast.success("دیسلایک شما ثبت شد ");
      if (userVote === "like") {
        setLikeCount((prev) => Math.max(prev - 1, 0));
      }
      if (userVote !== "dislike") {
        setDislikeCount((prev) => prev + 1);
      }
      setUserVote("dislike");
    },
    onError: (err) => {
      if (err?.response?.status === 401) return;
      toast.error("خطا در ثبت دیسلایک ");
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: (id) => DeleteLikeNews(id),
    onSuccess: () => {
      toast.success("لایک شما با موفقیت حذف شد");
      setLikeCount((prev) => Math.max(prev - 1, 0));
      setUserVote(null);
    },
    onError: (err) => {
      if (err?.response?.status === 401) return;
      toast.error("خطا در حذف لایک ");
    },
  });

  const handleLike = () => {
    if (userVote === "like") {
      deleteLikeMutation.mutate(newsDetail?.likeId);
      return;
    }

    likeMutation.mutate(newsDetail?.id);
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      toast.error("شما  قبلا این خبر را دیسلایک کرده‌اید ");
      return;
    }
    dislikeMutation.mutate(newsDetail?.id);
  };

  // return (
  //   <div className="w-full flex flex-wrap">
  //     <img
  //       className="w-full h-[425px] rounded-4xl"
  //       src={
  //         newsDetail.currentImageAddress &&
  //         !newsDetail.currentImageAddress.includes("undefined") &&
  //         newsDetail.currentImageAddress.startsWith("http") &&
  //         !newsDetail.currentImageAddress.toLowerCase().includes("local") &&
  //         !newsDetail.currentImageAddress.toLowerCase().includes("fakepath")
  //           ? newsDetail.currentImageAddress
  //           : img1
  //       }
  //     />
  //     <div className="w-full flex items-center justify-between">
  //       <div className="px-4 py-3 flex justify-between gap-1">
  //         <p className="text-[#848484] font-[14px] rounded-3xl py-2 px-3 lg:border lg:border-[#848484]">
  //           {newsDetail?.newsCatregoryName}
  //         </p>
  //         <span className="text-[#848484] font-[16px] py-2 px-3">
  //           {newsDetail?.insertDate &&
  //             new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  //               day: "numeric",
  //               month: "long",
  //               year: "numeric",
  //             }).format(new Date(newsDetail.insertDate))}
  //         </span>
  //         <div className="py-2 px-3">
  //           <VisibilityIcon className="text-[#848484] font-[16px]" />
  //           <span className="text-[#848484] font-[16px] mr-2 ">
  //             {newsDetail?.currentView}
  //           </span>
  //         </div>
  //       </div>

  //       <div className="flex items-center justify-between px-4 py-3">
  //         <div
  //           onClick={handleDislike}
  //           className={`mr-3 flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
  //             userVote === "dislike"
  //               ? "bg-[#008C78] text-white border-[#008C78]"
  //               : "text-[#848484] bg-[#EAEAEA] dark:border-[#555] dark:bg-[#333] dark:text-[white]"
  //           }`}
  //         >
  //           <span className="ml-2">{dislikeCount}</span>
  //           <ThumbDownAltIcon />
  //         </div>

  //         <div
  //           onClick={handleLike}
  //           className={`mr-3 flex items-center justify-center px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
  //             userVote === "like"
  //               ? "bg-[#008C78] text-white border-[#008C78]"
  //               : "text-[#848484] bg-[#EAEAEA] dark:border-[#555] dark:bg-[#333] dark:text-[white]"
  //           }`}
  //         >
  //           <span className="ml-2">{likeCount}</span>
  //           <ThumbUpIcon />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="w-full flex flex-wrap">
      <img
        className="
        w-full object-cover rounded-2xl
        h-[220px]
        sm:h-[280px]
        md:h-[340px]
        lg:h-[425px]
        xl:h-[500px]
        2xl:h-[580px]
      "
        src={
          newsDetail.currentImageAddress &&
          !newsDetail.currentImageAddress.includes("undefined") &&
          newsDetail.currentImageAddress.startsWith("http") &&
          !newsDetail.currentImageAddress.toLowerCase().includes("local") &&
          !newsDetail.currentImageAddress.toLowerCase().includes("fakepath")
            ? newsDetail.currentImageAddress
            : img1
        }
      />

      <div
        className="
        w-full flex items-center justify-between  gap-4 mt-4
        sm:gap-5
        md:gap-6
        lg:flex-row lg:items-center lg:justify-between
      "
      >
        <div
          className="
          w-full flex flex-row items-center
          
          gap-2
          sm:gap-3
          md:gap-4
          lg:w-auto
        "
        >
          <p
            className="
            text-[#848484] rounded-3xl border border-[#848484]
            text-[11px] px-3 py-1.5
            sm:text-[12px] sm:px-4 sm:py-2
            md:text-[13px]
            lg:text-[14px]
          "
          >
            {newsDetail?.newsCatregoryName}
          </p>

          <span
            className="
            text-[#848484]
            text-[11px]
            sm:text-[12px]
            md:text-[14px]
            lg:text-[16px]
          "
          >
            {newsDetail?.insertDate &&
              new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(newsDetail.insertDate))}
          </span>

          <div className="flex items-center hidden sm:block">
            <VisibilityIcon
              className="
              !text-[#848484]
              !text-[16px]
              sm:!text-[18px]
              md:!text-[20px]
            "
            />

            <span
              className="
              text-[#848484] mr-2
              text-[11px]
              sm:text-[12px]
              md:text-[14px]
              lg:text-[16px]
            "
            >
              {newsDetail?.currentView}
            </span>
          </div>
        </div>

        <div
          className="
          w-full flex items-center justify-end
        
          gap-2
          sm:gap-3
          md:gap-4
          lg:w-auto
        "
        >
          <div
            onClick={handleDislike}
            className={`
            flex items-center justify-center rounded-full cursor-pointer
            transition-all duration-300

            px-3 py-1.5 text-[12px]
            sm:px-4 sm:py-2 sm:text-[13px]
            md:px-5 md:text-[14px]
            lg:text-[15px]
            xl:px-6 xl:py-2.5
            2xl:text-[16px]

            ${
              userVote === "dislike"
                ? "bg-[#008C78] text-white border-[#008C78]"
                : "text-[#848484] bg-[#EAEAEA] dark:border-[#555] dark:bg-[#333] dark:text-white"
            }
          `}
          >
            <span className="ml-2">{dislikeCount}</span>
            <ThumbDownAltIcon className="!text-[20px] sm:!text-[25px]" />
          </div>

          <div
            onClick={handleLike}
            className={`
            flex items-center justify-center rounded-full cursor-pointer
            transition-all duration-300

            px-3 py-1.5 text-[12px]
            sm:px-4 sm:py-2 sm:text-[13px]
            md:px-5 md:text-[14px]
            lg:text-[15px]
            xl:px-6 xl:py-2.5
            2xl:text-[16px]

            ${
              userVote === "like"
                ? "bg-[#008C78] text-white border-[#008C78]"
                : "text-[#848484] bg-[#EAEAEA] dark:border-[#555] dark:bg-[#333] dark:text-white"
            }
          `}
          >
            <span className="ml-2">{likeCount}</span>
            <ThumbUpIcon className="!text-[20px] sm:!text-[25px] " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleImage;
