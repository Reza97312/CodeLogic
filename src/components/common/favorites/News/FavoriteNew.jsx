import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import greenEye from "../../../../assets/Icons/A/greenEye.png";
import greenBasket from "../../../../assets/Icons/A/greenBasket.png";
import htmlImg from "../../../../assets/Images/HTML5Course.png";
import openEye from "../../../../assets/Icons/A/openEye.png";
import { useTranslation } from "react-i18next";
import reactImg from "../../../../assets/Images/A/teachersDetail/1.png";
import { PersianDateConverter } from "../../../../utils/helper/dateConverter.js";
import img2 from "../../../../assets/Images/Rectanglepc.png";
const FavoriteNew = ({ items, deleteItem, getOverViewData }) => {
  const { t } = useTranslation();
  const handleDelete = () => {
    deleteItem(items.id);
  };
  const handleOverView = () => {
    getOverViewData(items.news);
  };

  //// framer ////
  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };
  return (
    <>
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        className=" dark:bg-[#454545] dark:text-[#ffff] w-full text-[16px] text-center font-semibold
       bg-[#ffff] rounded-t-4xl hidden md:flex items-center py-5 border-b border-[#EAEAEA] "
        style={{ direction: "rtl" }}
      >
        <div className="ps-8 flex items-center justify-start gap-4 flex-[1.5] text-right">
          <img
            className="w-[28px] h-[28px] rounded-full object-cover"
            // src={
            //   !items.news.currentImageAddress
            //     ? reactImg
            //     : items.news.currentImageAddress
            // }
            src={items?.currentImageAddress || img2}
            onError={(e) => {
              e.target.src = img2;
            }}
            alt=""
          />
          {items.news.title}
        </div>
        <div className="px-4 flex-1">43</div>
        <div className="px-4 flex-1">666</div>
        <div className="px-1 flex-1">36</div>
        <div className="px-4 flex-1 truncate">
          {PersianDateConverter(items.news.updateDate)}
        </div>
        <div className="pe-8 w-[100px] text-left flex items-center justify-end gap-4 ">
          <div
            onClick={handleOverView}
            style={{ backgroundImage: `url(${greenEye})` }}
            className="w-6 h-4 cursor-pointer bg-no-repeat bg-[center_center] "
          ></div>
          <div
            onClick={handleDelete}
            style={{ backgroundImage: `url(${greenBasket})` }}
            className="w-4 h-4 cursor-pointer bg-[url(/icons/greenBasket.png)] bg-no-repeat bg-[center_center] "
          ></div>
        </div>
      </motion.div>
      <div
        className="flex md:hidden flex-col items-center gap-4 dark:text-white dark:bg-[#333]
      w-[60%] bg-[#eee] rounded-3xl mx-auto mt-4 py-4
      "
      >
        <h2 className="text-[19px] text-[#008C78] dark:text-[#008C78] mx-auto font-bold">
          {items.news.title}
        </h2>
        <img
          className="rounded-4xl shadow-md w-[55%] mx-auto"
          src={
            !items.news.currentImageAddress
              ? reactImg
              : items.news.currentImageAddress
          }
          alt=""
        />
        <div className="flex items-center gap-4 text-[14px] text-[#848484] dark:text-[#848484]">
          <div className="flex items-center gap-2 ">
            <img
              className="w-4 h-4"
              src="https://img.icons8.com/?size=100&id=11167&format=png&color=000000"
              alt=""
            />
            43
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="w-4 h-4"
              src="https://img.icons8.com/?size=100&id=85028&format=png&color=000000"
              alt=""
            />
            666
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="w-4 h-4"
              src="https://img.icons8.com/?size=100&id=82788&format=png&color=000000"
              alt=""
            />
            36
          </div>
        </div>
        <span className=" mx-auto text-[14px] text-[#848484] dark:text-[#848484]">
          {PersianDateConverter(items.news.updateDate)}
        </span>
        <div className="  flex items-center  gap-4">
          <div
            onClick={handleOverView}
            style={{ backgroundImage: `url(${greenEye})` }}
            className="w-6 h-4 cursor-pointer bg-no-repeat bg-[center_center] "
          ></div>
          <div
            onClick={handleDelete}
            style={{ backgroundImage: `url(${greenBasket})` }}
            className="w-4 h-4 cursor-pointer bg-[url(/icons/greenBasket.png)] bg-no-repeat bg-[center_center] "
          ></div>
        </div>
      </div>
    </>
  );
};

export default FavoriteNew;
