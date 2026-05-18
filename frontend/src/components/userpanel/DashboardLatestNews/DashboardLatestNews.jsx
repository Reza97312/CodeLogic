import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DashboardLatestNews = ({ image, title, date, id }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const headerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`gap-3 sm:gap-5 md:gap-3 lg:gap-5 w-[90%] h-full md:h-[20%] py-4 sm:py-2 md:py-0 md:px-2  flex flex-col sm:flex-row justify-between items-center mb-4 mx-auto rounded-3xl shadow-[0px_0px_1px_1px_#EAEAEA] cursor-pointer duration-300  hover:shadow-[0px_0px_10px_1px_#008c78] dark:bg-[#454545] dark:shadow-[0px_0px_1px_1px_#848484]  `}
    >
      <motion.div
        variants={itemVariants}
        className={` flex items-center justify-center w-[70%] sm:w-[40%] md:w-[50%] lg:w-[70%] h-[100%] sm:mr-4 md:mr-0  ${isRtl ? "" : "sm:ml-4 md:ml-0"} `}
      >
        <motion.img
          variants={itemVariants}
          className={`  object-cover w-full h-[90%]  rounded-2xl  `}
          src={image}
        />
      </motion.div>

      <div className="w-full flex flex-wrap  ">
        <Link className="w-full" to={`/news/${id}`}>
          <motion.p
            variants={itemVariants}
            className="font-semibold text-[14px] sm:text-start text-center w-full sm:w-auto sm:text-[16px] md:text-[10px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] text-[#1E1E1E] dark:text-[white] "
          >
            {title}
          </motion.p>
        </Link>

        <motion.div
          variants={itemVariants}
          className="flex justify-center sm:justify-start items-center w-full mt-3   "
        >
          <p className="text-[#1e1e1e] text-[14px] sm:text-[16px] md:text-[10px] lg:text-[11px] xl:text-[14px] 2xl:text-[16px] dark:text-[#848484]">
            <span>{date}</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardLatestNews;
