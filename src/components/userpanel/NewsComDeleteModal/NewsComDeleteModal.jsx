import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

const NewsComDeleteModal = ({ handleToggleDeleteModal, deleteNewsCom }) => {
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
        className="flex flex-col items-center dark:bg-[#333] gap-6 w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] pt-8 py-[14px] bg-[#FFFFFF] border border-[#EAEAEA] 
        rounded-xl  z-48"
      >
        <h3 className="font-semibold dark:text-[#fff]">
          {t("courseComDeleteModal.title")}
        </h3>
        <div className="flex gap-2">
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
              deleteNewsCom.mutate();
            }}
            className="py-2 px-4 font-medium text-[#FFFFFF] bg-[#EB0007] rounded-lg cursor-pointer"
          >
            {t("courseComDeleteModal.deleteBtn")}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsComDeleteModal;
