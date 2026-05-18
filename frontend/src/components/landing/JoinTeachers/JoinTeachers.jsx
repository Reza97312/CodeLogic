import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import TextImage from "../../common/TextImage/TextImage";
import Talking from "../../../assets/Images/talking.svg";

const JoinTeachers = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        delay: 0.3,
      }}
      className="pt-[64px]"
    >
      <TextImage
        title1={t("joinTeachers.title1")}
        titleSpan={t("joinTeachers.titleSpan")}
        title2={t("joinTeachers.title2")}
        desc={t("joinTeachers.desc")}
        buttonText={t("joinTeachers.buttonText")}
        img={Talking}
        bg={"#F3F4F6"}
      />
    </motion.div>
  );
};

export default JoinTeachers;
