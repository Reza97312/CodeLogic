import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useTranslation } from "react-i18next";
import Arrow from "../../../assets/Icons/Arrow";

const StartEndDate = ({ handleSetStartDate, handleSetEndDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const { t } = useTranslation();

  const dateFunc = (dateObj, endOfDay = false) => {
    if (!dateObj) return null;
    const jsDate = dateObj.toDate();
    if (endOfDay) {
      jsDate.setUTCHours(23, 59, 59, 999);
    } else {
      jsDate.setUTCHours(0, 0, 0, 0);
    }
    return jsDate.toISOString();
  };

  return (
    <div className="flex flex-col w-full p-4 bg-[#FFFFFF] rounded-[15px] gap-4 dark:bg-[#454545] md:w-[100%] lg:w-[284px]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between cursor-pointer dark:text-[#DDDDDD]"
      >
        <span className="font-bold text-[18px] text-[#1E1E1E] dark:text-[#DDDDDD]">
          {t("courseListSide.startEndDate")}
        </span>
        <button className={`${isOpen ? "rotate-90" : "rotate-270"}`}>
          <Arrow />
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-regular text-base text-[#1E1E1E] dark:text-[#CCCCCC]">
              {t("courseListSide.start")}
            </span>
            <DatePicker
              value={start}
              onChange={(date) => {
                setStart(date);
                handleSetStartDate(dateFunc(date, false));
              }}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              containerClassName="w-full"
              inputClass="cursor-pointer dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#A6A6A6] text-[#848484] rounded-2xl"
              placeholder={"تاریخ شروع دوره را انتخاب کنید..."}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-regular text-base text-[#1E1E1E] dark:text-[#CCCCCC]">
              {t("courseListSide.end")}
            </span>
            <DatePicker
              value={end}
              onChange={(date) => {
                setEnd(date);
                handleSetEndDate(dateFunc(date, true));
              }}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              containerClassName="w-full"
              inputClass="cursor-pointer dark:bg-[#454545] dark:focus:ring-0 dark:border-[#848484] dark:text-[#ccc] outline-none w-full mb-1 bg-[white] focus:outline-none focus:ring-2 focus:ring-[#008C78] transition duration-400 px-5 py-2 border-1 border-[#A6A6A6] text-[#848484] rounded-2xl"
              placeholder={"تاریخ پایان دوره را انتخاب کنید..."}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StartEndDate;
