import React from "react";
import { useTranslation } from "react-i18next";

const TranslateButton = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language || "fa";

  const toggleLanguage = () => {
    const newLang = currentLang === "fa" ? "en" : "fa";

    i18n.changeLanguage(newLang);

    document.body.classList.remove("rtl", "ltr");
    document.body.classList.add(newLang === "fa" ? "rtl" : "ltr");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="   cursor-pointer  bg-[#008c78] text-white font-bold lg:font-semibold xl:font-bold rounded-full px-4 py-2 sm:px-4 sm:py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 xl:px-6 xl:py-3   text-xs sm:text-sm md:text-sm lg:text-base transition-colors duration-300 hover:bg-[#007563] "
    >
      {currentLang === "fa" ? "English" : "فارسی"}
    </button>
  );
};

export default TranslateButton;
