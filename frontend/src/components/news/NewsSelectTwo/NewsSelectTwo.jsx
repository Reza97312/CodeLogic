<<<<<<< HEAD:frontend/src/components/news/NewsSelectTwo/NewsSelectTwo.jsx
import React, { useMemo } from "react";
import Select from "react-select";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";

const NewsSelectTwo = ({ value, onChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t, i18n } = useTranslation();

  const options = useMemo(
    () => [
      { value: "none", label: t("NewsSelectTwo.dataone"), isDisabled: true },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "6", label: "6" },
      { value: "12", label: "12" },
    ],
    [i18n.language, t],
  );

  const defaultOption = useMemo(() => options[0], [options]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: "1px solid #EAEAEA",
      boxShadow: state.isFocused ? "0 0 0 1px #008C78" : "none",
      "&:hover": { borderColor: "#EAEAEA" },
      borderRadius: "0.75rem",
      backgroundColor: isDark ? "#333" : "white",
      minHeight: "40px",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "white" : "#848484",
      fontSize: "0.875rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      boxShadow: "0 0 6px rgba(0,0,0,0.05)",
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#F3F4F6"
        : state.isFocused
          ? "#008c7792"
          : "white",
      color: "#000000ff",
      cursor: "pointer",
      fontSize: "0.875rem",
    }),
    dropdownIndicator: (base) => ({ ...base, color: "#848484" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div className="w-[45%] sm:w-[47%] md:w-[45%] lg:w-40 flex-shrink-0">
      <Select
        key={i18n.language}
        options={options}
        styles={customStyles}
        value={options.find((opt) => opt.value === value)}
        onChange={(option) => onChange(option.value)}
        classNamePrefix="react-select"
        isSearchable={false}
        defaultValue={defaultOption}
      />
    </div>
  );
};

export default NewsSelectTwo;
=======
import React, { useMemo } from "react";
import Select from "react-select";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { useTranslation } from "react-i18next";

const NewsSelectTwo = ({ value, onChange }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { t, i18n } = useTranslation();

  const options = useMemo(
    () => [
      { value: "none", label: t("NewsSelectTwo.dataone"), isDisabled: true },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "6", label: "6" },
      { value: "12", label: "12" },
    ],
    [i18n.language, t],
  );

  const defaultOption = useMemo(() => options[0], [options]);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: "1px solid #EAEAEA",
      boxShadow: state.isFocused ? "0 0 0 1px #008C78" : "none",
      "&:hover": { borderColor: "#EAEAEA" },
      borderRadius: "0.75rem",
      backgroundColor: isDark ? "#333" : "white",
      minHeight: "40px",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "white" : "#848484",
      fontSize: "0.875rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      boxShadow: "0 0 6px rgba(0,0,0,0.05)",
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#F3F4F6"
        : state.isFocused
          ? "#008c7792"
          : "white",
      color: "#000000ff",
      cursor: "pointer",
      fontSize: "0.875rem",
    }),
    dropdownIndicator: (base) => ({ ...base, color: "#848484" }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div className="w-[45%] sm:w-[47%] md:w-[45%] lg:w-40 flex-shrink-0">
      <Select
        key={i18n.language}
        options={options}
        styles={customStyles}
        value={options.find((opt) => opt.value === value)}
        onChange={(option) => onChange(option.value)}
        classNamePrefix="react-select"
        isSearchable={false}
        defaultValue={defaultOption}
      />
    </div>
  );
};

export default NewsSelectTwo;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/news/NewsSelectTwo/NewsSelectTwo.jsx
