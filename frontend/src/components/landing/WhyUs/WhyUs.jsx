import React from "react";
import WhyUsItem from "./WhyUsItem/WhyUsItem";
import ReadingBook from "../../../assets/Images/readingbook.svg";
import { useTranslation } from "react-i18next";

const WhyUs = () => {
  const { t } = useTranslation();

  const whyUsItemsData = [
    { id: 1, title: t("whyUs.cardTitle1"), desc: t("whyUs.cardDesc1") },
    { id: 2, title: t("whyUs.cardTitle2"), desc: t("whyUs.cardDesc2") },
    { id: 3, title: t("whyUs.cardTitle3"), desc: t("whyUs.cardDesc3") },
    { id: 4, title: t("whyUs.cardTitle4"), desc: t("whyUs.cardDesc4") },
  ];

  return (
    <div className="flex  pt-[100px] px-16">
      <img
        src={ReadingBook}
        className="hidden   md:block md:w-[360px] md:h-[320px]   lg:w-[600px] lg:h-[544px]"
      />
      <div className="pt-8">
        <div className="flex flex-col  gap-4">
          <h2
            className="font-bold flex items-center justify-center   w-[100%] text-[#1E1E1E]
          sa:text-lg   sm:text-2xl   lg:text-4xl"
          >
            {t("whyUs.title1")}
            <span className="text-[#008C78]  w-[100%]  text-center ">
              {t("whyUs.titleSpan")}
            </span>
            {t("whyUs.title2")}
          </h2>
          <p
            className="font-regular text-[#848484]   dark:text-[#DDDDDD]
          text-sm   lg:text-base"
          >
            {t("whyUs.desc")}
          </p>
        </div>
        <div>
          {whyUsItemsData.map((item, index) => {
            return <WhyUsItem item={item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
