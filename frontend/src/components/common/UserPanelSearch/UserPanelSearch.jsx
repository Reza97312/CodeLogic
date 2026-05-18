<<<<<<< HEAD:frontend/src/components/common/UserPanelSearch/UserPanelSearch.jsx
import React, { useCallback } from "react";
import Search from "../../../assets/Icons/Search";
import debounce from "lodash.debounce";
import { AnimatePresence, motion, number } from "framer-motion";
import { useTranslation } from "react-i18next";

const UserPanelSearch = ({ width, handleSearch }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 750),
    [],
  );
  const handleChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const rightAnimate = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 250, duration: 0.35 },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.35, type: "spring", stiffness: 250 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div className="flex w-full md:w-auto items-center relative">
        <motion.input
          type="search"
          variants={rightAnimate}
          initial="hidden"
          animate="visible"
          exit="exit"
          placeholder={t("userPanelSearch.placeholder")}
          onChange={handleChange}
          className={` w-full md:w-auto md:w-48 h-12 indent-[16px] font-regular text-base text-[#848484] bg-[#FFFFFF] border border-[#EAEAEA] 
                rounded-2xl outline-0   dark:text-[#CCCCCC] dark:bg-[#454545]
                ${width}`}
        />
        <span
          className={`text-[#848484] absolute top-4 ${
            isRtl ? "left-4" : "right-4"
          }   dark:text-[#CCCCCC]`}
        >
          <Search />
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserPanelSearch;
=======
import React, { useCallback } from "react";
import Search from "../../../assets/Icons/Search";
import debounce from "lodash.debounce";
import { AnimatePresence, motion, number } from "framer-motion";
import { useTranslation } from "react-i18next";

const UserPanelSearch = ({ width, handleSearch }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const debouncedSearch = useCallback(
    debounce((value) => {
      handleSearch(value);
    }, 750),
    [],
  );
  const handleChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const rightAnimate = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 250, duration: 0.35 },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.35, type: "spring", stiffness: 250 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div className="flex w-full md:w-auto items-center relative">
        <motion.input
          type="search"
          variants={rightAnimate}
          initial="hidden"
          animate="visible"
          exit="exit"
          placeholder={t("userPanelSearch.placeholder")}
          onChange={handleChange}
          className={` w-full md:w-auto md:w-48 h-12 indent-[16px] font-regular text-base text-[#848484] bg-[#FFFFFF] border border-[#EAEAEA] 
                rounded-2xl outline-0   dark:text-[#CCCCCC] dark:bg-[#454545]
                ${width}`}
        />
        <span
          className={`text-[#848484] absolute top-4 ${
            isRtl ? "left-4" : "right-4"
          }   dark:text-[#CCCCCC]`}
        >
          <Search />
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserPanelSearch;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/common/UserPanelSearch/UserPanelSearch.jsx
