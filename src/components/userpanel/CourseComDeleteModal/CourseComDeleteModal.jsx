import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

const CourseComDeleteModal = ({ handleToggleDeleteModal, deleteCourseCom }) => {
  const { t } = useTranslation();

  const Animate = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.35 },
    },
  };

  return (
    <div
      onClick={() => {
        handleToggleDeleteModal(false);
      }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center"
    >
      <motion.div
        variants={Animate}
        initial="hidden"
        animate="visible"
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between dark:bg-[#333] items-center gap-6 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] py-8 bg-[#FFFFFF] border border-[#EAEAEA] 
            rounded-xl  inset-0 z-48"
      >
        <h3 className="font-semibold dark:text-[#fff]">
          {t("courseComDeleteModal.title")}
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => {
              handleToggleDeleteModal(false);
            }}
            className="py-2 px-4 font-medium border rounded-lg 
                    cursor-pointer dark:text-[#898989]"
          >
            {t("courseComDeleteModal.closeModalBtn")}
          </button>
          <button
            onClick={() => {
              deleteCourseCom.mutate();
            }}
            className="py-2 px-4 font-medium text-[#FFFFFF] bg-[#EB0007] rounded-lg cursor-pointer "
          >
            {t("courseComDeleteModal.deleteBtn")}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseComDeleteModal;
