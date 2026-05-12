import React, { useState } from "react";
import Teacher from "../../../assets/Icons/Teacher";
import Level from "../../../assets/Icons/Level";
import Star from "../../../assets/Icons/Star";
import Heart from "../../../assets/Icons/Heart";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";
import heartIcon from "../../../assets/Icons/A/heart.png";
import { useMutation } from "@tanstack/react-query";
import { addFavCourses } from "../../../core/services/api/post/addFavCourses";
import { toast } from "react-toastify";
import reactImg from "../../../assets/Images/A/teachersDetail/1.png";
import Tilt from "react-parallax-tilt";
import imgg1 from "../../../assets/Images/Rectanglee.png";
const DetailCard = ({ item }) => {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: postFavDetail } = useMutation({
    mutationKey: ["POSTFAVDETAIL"],
    mutationFn: (id) => addFavCourses(id),
    onSuccess: (data) => {
      setIsAdded(true);
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "این دوره قبلا به علاقه مندی اضافه شده است",
      );
    },
  });
  return (
    <Tilt
      dir="rtl"
      className="  flex flex-col flex-shrink-0 items-center w-[250px] sm:w-[350px] md:w-[48%] lg:w-[31%] 2xl:w-[350px]   rounded-[20px] relative cursor-pointer  
        transition-all duration-300 hover:scale-[1.02] hover:shadow-[0px_0px_10px_1px_#008c78] "
    >
      <img
        src={item?.imageAddress || imgg1}
        onError={(e) => {
          e.target.src = imgg1;
        }}
        className="w-full h-[259px] rounded-t-[20px]"
      />
      <div
        onClick={() => navigate(`/courseDetail/${item.courseId}`)}
        className="flex flex-col justify-between w-full h-[217px] mb-[-16px] p-4 bg-[#FFFFFF] rounded-[20px] transform -translate-y-4   
            dark:bg-[#606060]"
      >
        <div className="flex flex-col gap-1 ">
          <h2 className="font-bold text-base   dark:text-[#EEEEEE]">
            {item.title}
          </h2>
          <p className="max-w-[317px] font-regular text-sm  dark:text-[#DDDDDD] truncate ">
            {item.describe}
          </p>
        </div>
        <div>
          <div className="flex justify-between pt-6">
            <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
              <Teacher className="text-[#848484]" />
              <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
                {t(`${item.teacherName}`)}
              </span>
            </div>
            <div className="flex items-center gap-1   dark:text-[#DDDDDD]">
              <Level className="text-[#848484]" />
              <span className="font-regular text-xs text-[#848484]   dark:text-[#DDDDDD]">
                {t(`${item.levelName}`)}
              </span>
            </div>
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex flex-col justify-end gap-1">
              <span className="font-regular text-xs text-[#1E1E1E]   dark:text-[#EEEEEE]">
                {t("قیمت")}
              </span>
              <div className="flex">
                <span className="font-bold text-base text-[#008C78]">
                  {t(`${item.cost} تومان`)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-regular text-sm text-[#F8BC24]">
                {t(`${item.likeCount}`)}
              </span>
              <Star />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => postFavDetail(item.courseId)}
        style={{
          backgroundImage: `url(${heartIcon})`,
        }}
        className={`p-5 ${
          isAdded ? "bg-red-600/30" : "bg-white/20"
        } transition duration-300 backdrop-blur-md 
        rounded-[50px] cursor-pointer absolute top-[12px] right-[11px] bg-no-repeat bg-[center_center]`}
      ></button>
    </Tilt>
  );
};

export default DetailCard;
