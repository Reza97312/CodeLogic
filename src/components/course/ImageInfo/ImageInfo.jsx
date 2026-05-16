import React, { useState, useEffect } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import img2 from "../../../assets/Images/Rectanglee.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { disLikeCourses } from "../../../core/services/api/post/disLikeCourses";
import { DeleteLikeCourse } from "../../../core/services/api/Delete/DeleteLikeCourse";
import { likeCourses } from "../../../core/services/api/post/likeCourses";

const COURSE_QUERY_KEY = ["GETCOURSEBYID"];

const ImageInfo = ({ course }) => {
  const queryClient = useQueryClient();

  const [likeInfo, setLikeInfo] = useState({
    userIsLiked: course?.userIsLiked || false,
    userIsDissLike: course?.userIsDissLike || false,
    likeCount: course?.likeCount || 0,
    dissLikeCount: course?.dissLikeCount || 0,
    userLikeId: course?.userLikeId || null,
  });

  useEffect(() => {
    setLikeInfo({
      userIsLiked: course?.userIsLiked || false,
      userIsDissLike: course?.userIsDissLike || false,
      likeCount: course?.likeCount || 0,
      dissLikeCount: course?.dissLikeCount || 0,
      userLikeId: course?.userLikeId || null,
    });
  }, [
    course?.userIsLiked,
    course?.userIsDissLike,
    course?.likeCount,
    course?.dissLikeCount,
    course?.userLikeId,
  ]);

  const techs = course?.technologyList
    ?.trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  const onSuccess = (message) => {
    toast.success(message);
    queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY });
  };

  const likeMutation = useMutation({
    mutationFn: likeCourses,
    onSuccess: () => {
      setLikeInfo((prev) => ({
        ...prev,
        userIsLiked: true,
        userIsDissLike: false,
        likeCount: prev.likeCount + 1,
        dissLikeCount: prev.userIsDissLike
          ? Math.max(0, prev.dissLikeCount - 1)
          : prev.dissLikeCount,
      }));
      onSuccess("دوره با موفقیت لایک شد");
    },
    onError: (error) => {
      if (error?.response?.status === 401) return;
    },
  });

  const disLikeMutation = useMutation({
    mutationFn: disLikeCourses,
    onSuccess: () => {
      setLikeInfo((prev) => ({
        ...prev,
        userIsDissLike: true,
        userIsLiked: false,
        dissLikeCount: prev.dissLikeCount + 1,
        likeCount: prev.userIsLiked
          ? Math.max(0, prev.likeCount - 1)
          : prev.likeCount,
        userLikeId: prev.userIsLiked ? null : prev.userLikeId,
      }));
      onSuccess("دوره با موفقیت دیسلایک شد");
    },
    onError: (error) => {
      if (error?.response?.status === 401) return;
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: DeleteLikeCourse,
    onSuccess: () => {
      setLikeInfo((prev) => ({
        ...prev,
        userIsLiked: false,
        likeCount: Math.max(0, prev.likeCount - 1),
        userLikeId: null,
      }));
      onSuccess("لایک با موفقیت حذف شد");
    },
    onError: (error) => {
      if (error?.response?.status === 401) return;
    },
  });

  const isLiking = likeMutation.isLoading || deleteLikeMutation.isLoading;
  const isDisLiking = disLikeMutation.isLoading;

  const handleLike = async () => {
    if (isLiking || isDisLiking) return;

    if (likeInfo.userIsLiked) {
      if (likeInfo.userLikeId) {
        deleteLikeMutation.mutate(likeInfo.userLikeId);
      } else {
        toast.warn("لطفا بعد از چند لحظه دوباره امتحان کنید");
        queryClient.invalidateQueries({ queryKey: COURSE_QUERY_KEY });
      }
    } else {
      likeMutation.mutate(course.courseId);
    }
  };

  const handleDisLike = async () => {
    if (isLiking || isDisLiking) return;

    if (!likeInfo.userIsDissLike) {
      disLikeMutation.mutate(course.courseId);
    } else {
      toast.warn("دیسلایک شما قبلا ثبت شده است");
    }
  };

  console.log("technologyList:", course.technologyList);
  console.log("techs:", techs);

  return (
    <div className="flex flex-col gap-4 ">
      <img
        // src={
        //   course?.imageAddress && !course.imageAddress.includes("undefined")
        //     ? course.imageAddress
        //     : img2
        // }
        src={course?.imageAddress || img2}
        onError={(e) => {
          e.target.src = img2;
        }}
        className="w-[85%] md:w-full mx-auto h-[200px] sm:h-[250px] rounded-xl
            md:h-[240px] md:rounded-2xl
            lg:h-[350px] xl:h-[434px] lg:rounded-[25px]"
      />
      <div className="flex justify-between w-[85%] mx-auto md:mx-0 md:w-auto ">
        <div className="border-5">
          {techs &&
            techs.length > 0 &&
            techs.map((tech, index) => (
              <span
                key={index}
                className="py-[1px] px-[11px] font-regular text-sm text-[#848484] border border-[#848484] rounded-[48px] mr-2"
              >
                {tech}
              </span>
            ))}
        </div>
        <div className="flex gap-2 ">
          <div
            className={`flex items-center justify-center gap-2 py-1 px-2 md:py-2 md:px-3 ${
              likeInfo.userIsDissLike
                ? "text-white bg-[#008C78] "
                : "text-[#848484] bg-[#EAEAEA] dark:bg-[#393939]"
            } rounded-[48px] cursor-pointer transition-opacity duration-300`}
            onClick={handleDisLike}
            style={{ opacity: isDisLiking || isLiking ? 0.6 : 1 }}
          >
            <span className="font-regular text-base">
              {likeInfo.dissLikeCount}
            </span>
            <ThumbDownAltIcon className="!text-[20px] sm:!text-[25px]" />
          </div>

          <div
            className={`flex items-center justify-center gap-2 py-1 px-2 md:py-2 md:px-3 ${
              likeInfo.userIsLiked
                ? "text-white bg-[#008C78] "
                : "text-[#848484] bg-[#EAEAEA] dark:bg-[#393939]"
            } rounded-[48px] cursor-pointer transition-opacity duration-300`}
            onClick={handleLike}
            style={{ opacity: isLiking || isDisLiking ? 0.6 : 1 }}
          >
            <span className="font-regular text-base">{likeInfo.likeCount}</span>
            <ThumbUpIcon className="!text-[20px] sm:!text-[25px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
