import Lottie from "lottie-react";
import React from "react";
import { useTranslation } from "react-i18next";
import load from "../../../assets/Images/Loading Dots In Yellow.json";

const Section1Card = ({ item, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div
      className="flex  justify-center items-center gap-2 w-full h-16 
    sm:px-8 
    lg:gap-4 lg:px-16 lg:h-[84px]"
    >
      <span
        className="font-bold dark:text-[#EEEEEE]  
         sm:text-base   lg:text-2xl"
      >
        {item.title}
      </span>
      <span
        className="font-bold   dark:text-[#EEEEEE]   
         sm:text-xl   lg:text-5xl"
      >
        {isLoading ? (
          <Lottie style={{ width: "104px" }} animationData={load} />
        ) : (
          item.members
        )}
      </span>
    </div>
  );
};

export default Section1Card;
