<<<<<<< HEAD:frontend/src/components/course/TimeDropDown/TimeDropDown.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const TimeDropDown = ({ sortType, setSortType }) => {
  const { t } = useTranslation();

  return (
    <select
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
      className="  w-[60%] sm:w-[40%] md:w-[65%] lg:w-auto font-regular text-base text-[#848484] border border-[#EAEAEA] outline-0 py-1 pr-2 pl-2 rounded-[12px]   dark:text-[#CCCCCC]
    lg:py-2 lg:pr-4 lg:pl-4 lg:rounded-[15px]"
    >
      <option value="DESC">{t("timeDropDown.option1")}</option>
      <option value="ASC">{t("timeDropDown.option2")}</option>
    </select>
  );
};

export default TimeDropDown;
=======
import React from "react";
import { useTranslation } from "react-i18next";

const TimeDropDown = ({ sortType, setSortType }) => {
  const { t } = useTranslation();

  return (
    <select
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
      className="  w-[60%] sm:w-[40%] md:w-[65%] lg:w-auto font-regular text-base text-[#848484] border border-[#EAEAEA] outline-0 py-1 pr-2 pl-2 rounded-[12px]   dark:text-[#CCCCCC]
    lg:py-2 lg:pr-4 lg:pl-4 lg:rounded-[15px]"
    >
      <option value="DESC">{t("timeDropDown.option1")}</option>
      <option value="ASC">{t("timeDropDown.option2")}</option>
    </select>
  );
};

export default TimeDropDown;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/course/TimeDropDown/TimeDropDown.jsx
