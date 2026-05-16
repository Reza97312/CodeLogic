import React from "react";
import { useTranslation } from "react-i18next";

const ShowNumberDropDown = ({ currentPageSize, onPageSizeChange }) => {
  const { t } = useTranslation();

  const handleChange = (event) => {
    const newSize = Number(event.target.value);
    onPageSizeChange(newSize);
  };

  const options = [15, 12, 9, 6, 3, 1];

  return (
    <select
      value={currentPageSize}
      onChange={handleChange}
      className="  w-[40%] sm:w-[20%] md:w-[35%] lg:w-auto font-regular text-base text-[#848484] border 
    border-[#EAEAEA] py-1 pr-2 pl-2 rounded-[12px]   dark:text-[#CCCCCC]
    lg:py-2 lg:pr-4 lg:pl-4 lg:rounded-[15px]"
    >
      {options.map((size) => (
        <option key={size} value={size}>
          {t(size.toString())}
        </option>
      ))}
    </select>
  );
};

export default ShowNumberDropDown;
