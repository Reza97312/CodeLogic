import React from "react";
import BigArrowLeft from "../../../assets/Icons/BigArrowLeft";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const TextImage = ({
  title1,
  titleSpan,
  title2,
  desc,
  buttonText,
  img,
  bg,
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
        mass: 0.8,
        delay: 0.1,
        staggerChildren: 0.18,
      },
    },
  };
  const childVariant = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 0.7,
      },
    },
  };
  return (
    <div
      className={`flex justify-between pr-[40px] pb-8 pl-[63px] bg-[${bg}]   dark:bg-[#1E1E1E]`}
    >
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-6 w-full pt-[97px]
      sa:items-center
      md:items-start md:pb-0"
      >
        <motion.h2
          variants={childVariant}
          className="font-bold   dark:text-[#EEEEEE]
        sa:max-w-[320px] sa:text-xl sa:text-center sa:leading-8   
        md:max-w-[480px] md:text-2xl md:text-start md:leading-10   
        lg:max-w-[585px] lg:text-4xl lg:leading-12"
        >
          {title1}
          <span className="text-[#008C78]">{titleSpan}</span>
          {title2}
        </motion.h2>
        <motion.p
          variants={childVariant}
          className="font-normal   dark:text-[#DDDDDD]
        sa:text-center sa:max-w-[400px]
        md:max-w-[480px] md:text-start md:leading-6 
        lg:max-w-[541px] lg:leading-7"
        >
          {desc}
        </motion.p>
        <motion.button
          variants={childVariant}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="flex justify-center items-center p-2 text-white bg-[#005B77] rounded-[50px] cursor-pointer   dark:text-[#EEEEEE]
        sa:gap-1 sa:h-[32px]
        sm:gap-2 sm:h-[40px]
        lg:gap-2 lg:p-4 lg:h-[46px]"
        >
          <span className="font-bold   sa:text-xs   sm:text-sm   lg:text-base">
            {buttonText}
          </span>
          <span className={`${isRtl ? "rotate-45" : "rotate-135"}`}>
            <BigArrowLeft className="sm:w-[16px] sm:h-[14px]   sm:w-[18px] sm:h-[16px]   lg:w-[20px] lg:h-[18px]" />
          </span>
        </motion.button>
      </motion.div>
      <img
        src={img}
        className="hidden   md:block md:w-[360px] md:h-[360px]   lg:w-[500px] lg:h-[500px]"
      />
    </div>
  );
};

export default TextImage;
