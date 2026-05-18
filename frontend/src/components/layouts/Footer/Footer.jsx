import React from "react";
import { useTranslation } from "react-i18next";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  return (
    <div
      className={` dark:bg-[#1e1e1e]  w-full px-[7%] py-12 bg-[#008c78] rounded-tl-[50px] rounded-tr-[50px] rounded-bl-0 rounded-br-0 ${
        isRtl ? "rtl" : "ltr"
      }`}
    >
      <div className=" dark:bg-[#333] flex flex-col md:flex-row lg:flex-row items-center justify-between bg-[#006252] p-10 rounded-tl-[30px] rounded-tr-0 rounded-bl-0 rounded-br-[30px] mb-5">
        <div
          className={`w-full md:w-1/2 mb-6 md:mb-0 ${
            isRtl ? "text-right" : "text-left"
          }`}
        >
          <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {t("footer.newsletter_title")}
          </p>
        </div>

        <div className="w-full md:w-1/2 relative flex flex-col items-center md:items-start">
          <span className="hidden md:block mt-16 text-sm text-[#cccccc] w-full md:w-auto">
            {t("footer.newsletter_description")}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mb-8">
        <div className=" dark:bg-[#333] flex-1 min-w-[260px] bg-[#006252] p-10 rounded-tl-[12px] rounded-tr-0 rounded-bl-0 rounded-br-[12px] text-white">
          <h2 className="text-lg font-bold border-b-2 border-[#008c78] pb-2 mb-4 dark:border-[white]">
            {t("footer.skills")}
          </h2>
          <ul className="  space-y-2 text-sm">
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.htmlcss")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.javascript")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.react")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.nextjs")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.nodejs")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.restapi")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.git")}
            </li>
          </ul>
        </div>

        <div className=" dark:bg-[#333] flex-1 min-w-[260px] bg-[#006252] p-10 rounded-tl-[12px] rounded-tr-0 rounded-bl-0 rounded-br-[12px] text-white">
          <h2 className="text-lg font-bold border-b-2 border-[#008c78] pb-2 mb-4 dark:border-[white]">
            {t("footer.about")}
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.news")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300 ">
              {t("footer.jobs")}
            </li>
            <Link to={"/contactus"}>
              <li className="cursor-pointer hover:text-black transition-colors duration-300 mb-2">
                {t("footer.contact")}
              </li>
            </Link>

            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.trust_center")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.rules")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.security")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.privacy")}
            </li>
          </ul>
        </div>

        <div className=" dark:bg-[#333] flex-1 min-w-[260px] bg-[#006252] p-10 rounded-tl-[12px] rounded-tr-0 rounded-bl-0 rounded-br-[12px] text-white">
          <h2 className="text-lg font-bold border-b-2 border-[#008c78] pb-2 mb-4 dark:border-[white]">
            {t("footer.domains")}
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.frontend")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.backend")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.fullstack")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.ai")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.seo")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.uiux")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.mobile")}
            </li>
          </ul>
        </div>

        <div className=" dark:bg-[#333]  flex-1 min-w-[260px] bg-[#006252] p-10 rounded-tl-[12px] rounded-tr-0 rounded-bl-0 rounded-br-[12px] text-white">
          <h2 className="text-lg font-bold border-b-2 border-[#008c78] pb-2 mb-4 dark:border-[white]">
            {t("footer.support")}
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.events")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.panel")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.technical_support")}
            </li>
            <li className="cursor-pointer hover:text-black transition-colors duration-300">
              {t("footer.articles")}
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`flex flex-col sm:flex-col md:flex-row lg:flex-row items-center justify-between gap-4 ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <h1 className="text-white font-bold text-center md:text-right text-lg">
          {t("footer.academy")}
        </h1>
        <span className="text-white text-center md:text-right text-sm">
          {t("footer.rights")}
        </span>
        <div className="flex gap-4 text-white">
          <InstagramIcon
            className="cursor-pointer hover:text-black transition-all duration-300"
            sx={{ fontSize: 30 }}
          />
          <FacebookIcon
            className="cursor-pointer hover:text-black transition-all duration-300"
            sx={{ fontSize: 30 }}
          />
          <TwitterIcon
            className="cursor-pointer hover:text-black transition-all duration-300"
            sx={{ fontSize: 30 }}
          />
          <TelegramIcon
            className="cursor-pointer hover:text-black transition-all duration-300"
            sx={{ fontSize: 30 }}
          />
          <WhatsAppIcon
            className="cursor-pointer hover:text-black transition-all duration-300"
            sx={{ fontSize: 30 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
