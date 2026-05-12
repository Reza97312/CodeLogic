import { motion } from "framer-motion";
import React, { useState } from "react";
import image2 from "../../../../assets/Images/A/blogs/3.png";
import heartIcon from "../../../../assets/Icons/A/heart.png";
import openEye from "../../../../assets/Icons/A/openEye.png";
import starIcon from "../../../../assets/Icons/A/star.png";
import cursorIcon from "../../../../assets/Icons/A/cursor.png";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PostFavoriteNews } from "../../../../core/services/api/post/PostFavoriteNews";
import { toast } from "react-toastify";
const NewsSectionBottom = ({ card }) => {
  const [isAdded, setIsAdded] = useState(false);

  const navigate = useNavigate();
  const { mutate: postFavoriteBottom } = useMutation({
    mutationKey: ["POSTBUTTOM"],
    mutationFn: (value) => PostFavoriteNews(value),
    onSuccess: (data) => {
      toast.success(data.message);
      setIsAdded(true);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        delay: 0.3,
      }}
      viewport={{ once: true, amount: 0.5 }}
      className=" w-[85%] md:w-[30%] relative rounded-3xl overflow-hidden shadow-lg "
    >
      <img src={image2} alt="" className="w-full h-full  " />
      <div
        className=" group absolute inset-0 bg-[#00000080] hover:bg-[#0000006a] transition-all duration-600 
      w-full h-full flex flex-col justify-between p-4   "
      >
        <div
          onClick={() => {
            postFavoriteBottom(card.id);
            console.log(card.id);
          }}
          style={{
            backgroundImage: `url(${heartIcon})`,
            cursor: `url(${cursorIcon}),pointer`,
          }}
          className={` ${
            isAdded ? "bg-red-600/30" : "bg-white/20"
          }  bg-no-repeat bg-[center_center]  p-5 backdrop-blur-md rounded-full
             w-[24px] h-[20.799999237060547px] transition duration-300 `}
        ></div>
        <div
          onClick={() => navigate(`/news/${card.id}`)}
          style={{ cursor: `url(${cursorIcon}),pointer` }}
          className="flex flex-col gap-2 group-hover:mb-1 transition-all duration-500"
        >
          <div className="mb-2">
            <span
              className="text-[#008C78] inline text-[14px] text-center border-[2px] font-bold
           border-[#008C78] rounded-full px-2 py-1 "
            >
              {card.newsCatregoryName}
            </span>
          </div>
          <h2 className="text-[16px] font-bold text-[#FFFFFF] ">
            {card.googleTitle}
          </h2>
          <p className=" text-[14px] text-[#FFFFFF] ">{card.googleDescribe}</p>
          <div className=" flex flex-row justify-between items-center ">
            <div
              style={{ backgroundImage: `url(${openEye})` }}
              className=" text-[14px] text-[#848484] bg-no-repeat bg-[right_center] pr-6 "
            >
              {card.currentView}
            </div>
            <div
              style={{ backgroundImage: `url(${starIcon})` }}
              className=" text-[14px] text-[#F8BC24] bg-no-repeat bg-[left_center] pl-6 "
            >
              {card.newsRate.count}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsSectionBottom;
