import React, { useRef } from "react";
import BeWithUsCard from "./BeWithUsCard/BeWithUsCard";
import LaptopDoc from "../../../assets/Icons/LaptopDoc";
import Bag from "../../../assets/Icons/Bag";
import Book from "../../../assets/Icons/Book";
import PersonTick from "../../../assets/Icons/PersonTick";
import BigArrowRight from "../../../assets/Icons/BigArrowRight";
import BigArrowLeft from "../../../assets/Icons/BigArrowLeft";
import { useTranslation } from "react-i18next";

const BeWithUs = () => {
  const { t } = useTranslation();

  const beWithUsData = [
    {
      id: 1,
      icon: LaptopDoc,
      title: t("beWithUs.title1"),
      desc: t("beWithUs.desc1"),
    },
    {
      id: 2,
      icon: Bag,
      title: t("beWithUs.title2"),
      desc: t("beWithUs.desc2"),
    },
    {
      id: 3,
      icon: Book,
      title: t("beWithUs.title3"),
      desc: t("beWithUs.desc3"),
    },
    {
      id: 4,
      icon: PersonTick,
      title: t("beWithUs.title4"),
      desc: t("beWithUs.desc4"),
    },
  ];

  const scrollRef = useRef(null);
  const scrollAmount = 300;
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 pt-[97px]">
      <h2
        className="font-bold text-[#008C78]
        sa:text-[24px]   sm:text-[28px]   lg:text-[32px]"
      >
        {t("beWithUs.title")}
      </h2>
      <p
        className="font-regular   dark:text-[#DDDDDD]  
        sa:text-sm   sm:text-lg   lg:text-2xl"
      >
        {t("beWithUs.desc")}
      </p>
      <div className="overflow-hidden w-full px-4 relative">
        <button
          onClick={scrollRight}
          className="absolute top-[144px] right-0 z-48   lg:hidden"
        ></button>
        <div
          ref={scrollRef}
          className="flex gap-6 w-full overflow-x-auto snap-x snap-mandatory pt-8   
          lg:justify-center lg:overflow-x-hidden lg:pb-4"
        >
          {beWithUsData.map((item, index) => {
            return <BeWithUsCard item={item} key={index} />;
          })}
        </div>
        <button
          onClick={scrollLeft}
          className="text-[#088C78] absolute top-[144px] left-0 z-48   lg:hidden"
        ></button>
      </div>
    </div>
  );
};

export default BeWithUs;
