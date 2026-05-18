<<<<<<< HEAD:frontend/src/components/course/PriceFilter/PriceFilter.jsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Arrow from "../../../assets/Icons/Arrow";
import { useTranslation } from "react-i18next";

const PriceFilter = ({ handleSetPrice }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState();

  const [value, setValue] = useState([0, 10000]);
  const priceChange = (event, newValue) => {
    handleSetPrice(newValue);
    setValue(newValue);
  };

  return (
    <div
      className="  flex flex-col gap-6 w-full p-4 bg-[#FFFFFF] rounded-[15px] cursor-pointer   dark:bg-[#454545]
        md:w-[100%] lg:w-[284px]"
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="  flex justify-between items-center w-full
          dark:text-[#DDDDDD]"
      >
        <span className="  font-bold text-[18px] text-[#1E1E1E]   dark:text-[#DDDDDD]">
          {t("priceFilter.title")}
        </span>
        <button className={`${isOpen ? "rotate-90" : "rotate-270"}`}>
          <Arrow />
        </button>
      </div>
      {isOpen && (
        <div className="  flex flex-col justify-center items-stretch px-4 ">
          <Box sx={{ color: "bg-[#008C78]" }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={priceChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={1000}
              sx={{
                color: "#008C78",
                "& .MuiSlider-thumb": {
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(0, 140, 120, 0.16)",
                    backgroundColor: "#008C78",
                  },
                  "&.Mui-active": {
                    boxShadow: "0 0 0 14px rgba(0, 140, 120, 0.16)",
                    backgroundColor: "#008C78",
                  },
                },
              }}
            />
          </Box>
          <div className="flex justify-between text-[#008C78]">
            <span>{value[1]}</span>
            <span>{value[0]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
=======
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Arrow from "../../../assets/Icons/Arrow";
import { useTranslation } from "react-i18next";

const PriceFilter = ({ handleSetPrice }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState();

  const [value, setValue] = useState([0, 10000]);
  const priceChange = (event, newValue) => {
    handleSetPrice(newValue);
    setValue(newValue);
  };

  return (
    <div
      className="  flex flex-col gap-6 w-full p-4 bg-[#FFFFFF] rounded-[15px] cursor-pointer   dark:bg-[#454545]
        md:w-[100%] lg:w-[284px]"
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="  flex justify-between items-center w-full
          dark:text-[#DDDDDD]"
      >
        <span className="  font-bold text-[18px] text-[#1E1E1E]   dark:text-[#DDDDDD]">
          {t("priceFilter.title")}
        </span>
        <button className={`${isOpen ? "rotate-90" : "rotate-270"}`}>
          <Arrow />
        </button>
      </div>
      {isOpen && (
        <div className="  flex flex-col justify-center items-stretch px-4 ">
          <Box sx={{ color: "bg-[#008C78]" }}>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={priceChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={1000}
              sx={{
                color: "#008C78",
                "& .MuiSlider-thumb": {
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(0, 140, 120, 0.16)",
                    backgroundColor: "#008C78",
                  },
                  "&.Mui-active": {
                    boxShadow: "0 0 0 14px rgba(0, 140, 120, 0.16)",
                    backgroundColor: "#008C78",
                  },
                },
              }}
            />
          </Box>
          <div className="flex justify-between text-[#008C78]">
            <span>{value[1]}</span>
            <span>{value[0]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/course/PriceFilter/PriceFilter.jsx
