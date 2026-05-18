import React from "react";
import { useTranslation } from "react-i18next";

const NewsHeader = () => {
  const { t } = useTranslation();
  return (
    <div
      className=" dark:bg-[#454545] dark:text-[#ffff] w-full text-[16px] text-center font-semibold
             bg-[#ffff] rounded-t-4xl hidden md:flex items-center py-5 border-b border-[#EAEAEA] "
      style={{ direction: "rtl" }}
    >
      <div className="ps-8 flex-[1.5] text-right">
        {t("favoriteNews.newsTitle")}
      </div>
      <div className="px-4 flex-1">{t("favoriteNews.commentsCount")}</div>
      <div className="px-4 flex-1">{t("favoriteNews.viewsCount")}</div>
      <div className="px-1 flex-1">{t("favoriteNews.likesCount")}</div>
      <div className="px-4 flex-1">{t("favoriteNews.lastUpdated")}</div>
      <div className="pe-8 w-[100px] text-left">
        {t("favoriteNews.Operation")}
      </div>
    </div>
  );
};

export default NewsHeader;
