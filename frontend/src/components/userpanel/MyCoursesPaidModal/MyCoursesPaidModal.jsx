import Lottie from "lottie-react";
import React from "react";
import success from "../../../assets/Images/Success.json";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const MyCoursesPaidModal = ({ handleClosePaidModal }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className=" fixed inset-0 bg-black/50 backdrop-blur flex justify-center items-center  "
      onClick={() => handleClosePaidModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            duration: 300,
          },
        }}
        className=" bg-[#eee] rounded-3xl flex z-20
          flex-col  mt-3 gap-6  py-4 px-6 dark:text-white dark:bg-[#333] "
      >
        <div>
          <Lottie
            className="mx-auto w-[200px] h-[170px]"
            animationData={success}
          />
        </div>
        <h2 className="md:text-[19px] text-[#008C78] dark:text-[#008C78] mx-auto font-bold">
          شما با موفقیت هزینه این دوره را پرداخت کرده اید
        </h2>

        <button
          onClick={() => handleClosePaidModal(false)}
          className=" cursor-pointer border dark:border-[#EAEAEA] mx-auto
               dark:text-white px-3 py-2 rounded-2xl hover:shadow-md inline"
        >
          {t("login.Back")}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default MyCoursesPaidModal;
