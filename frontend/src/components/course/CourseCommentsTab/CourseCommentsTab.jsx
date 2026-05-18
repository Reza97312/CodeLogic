import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CourseCommentsTab = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex justify-center md:justify-start gap-2 pt-10  ">
      <button
        onClick={() => setActiveTab("detail")}
        className={`py-[9px] px-4 rounded-[48px] cursor-pointer   
      dark:text-[#DDDDDD]
      ${activeTab === "detail" ? "text-[#FFFFFF] bg-[#008C78]" : ""}`}
      >
        {t("courseCommentsTab.courseSpecifications")}
      </button>
      <button
        onClick={() => {
          setActiveTab("comment");
        }}
        className={`py-[9px] px-4 rounded-[48px] cursor-pointer
      dark:text-[#DDDDDD]
      ${activeTab === "comment" ? "text-[#FFFFFF] bg-[#008C78]" : ""}`}
      >
        {t("courseCommentsTab.userComments")}
      </button>
    </div>
  );
};

export default CourseCommentsTab;
