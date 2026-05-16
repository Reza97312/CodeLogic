import React from "react";
import callIcon from "../../assets/Icons/A/call.png";
import ourEmail from "../../assets/Icons/A/ourEmail.png";
import { useTranslation } from "react-i18next";
const ContactUsSide = () => {
  const { t } = useTranslation();
  return (
    <div className="  w-full flex flex-col gap-3 md:pe-10">
      <h2 className=" text-md sm:text-2xl md:text-xl lg:text-2xl  mb-5 sm:mb-0 md:mb-2 lg:mb-0 font-bold dark:text-[#ffff] ">
        {t("contactUs.p1")}
        <span className="text-[#008C78] px-2 dark:text-[#008C78]">
          {t("contactUs.p2")}
        </span>
      </h2>
      <p className="text-[#1E1E1E] dark:text-[#dddd] text-sm sm:text-[16px] pe-0 sm:pe-8 ">
        {t("contactUs.p3")}
      </p>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex gap-4 items-center">
          <img
            src={callIcon}
            alt=""
            className=" bg-[#008C78] p-2 rounded-full  "
          />
          <h3 className="font-bold text-md sm:text-[18px] dark:text-[#dddd] ">
            011-123-45-678
          </h3>
        </div>
        <div className="flex gap-4 items-center">
          <img
            src={ourEmail}
            alt=""
            className=" bg-[#008C78] p-2 rounded-full  "
          />
          <h3 className="font-bold text-md sm:text-[18px] dark:text-[#dddd] ">
            CodeLogic@gmail.com
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSide;
