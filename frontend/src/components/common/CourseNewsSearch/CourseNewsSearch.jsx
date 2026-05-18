import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import Search from "../../../assets/Icons/Search";
import { useTranslation } from "react-i18next";

const CourseNewsSearch = ({ handleSearchSubmit }) => {
  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearchSubmit(value);
    }, 700),
    [],
  );
  const handleChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div className=" relative">
      <input
        type="search"
        placeholder={t("courseListSide.searchPlaceholder")}
        onChange={handleChange}
        className="w-full h-[46px] px-4 font-regular text-base text-[#848484] bg-[#FFFFFF] rounded-[15px] outline-0
            dark:text-[#CCCCCC] dark:bg-[#454545]
          md:w-[240px] lg:w-[284px]"
      />
      <div
        className={`absolute top-[15px] ${isRtl ? "left-4" : "right-4"}
            dark:text-[#CCCCCC]`}
      >
        <Search />
      </div>
    </div>
  );
};

export default CourseNewsSearch;
