import React from "react";
import { useTranslation } from "react-i18next";

const CourseHeader = () => {
  const { t } = useTranslation();
  return (
    <div
      className=" dark:bg-[#454545] dark:text-[#ffff] w-full text-[16px] text-center font-semibold
             bg-[#ffff] rounded-t-4xl hidden md:flex items-center py-5 border-b border-[#EAEAEA] "
      style={{ direction: "rtl" }}
    >
      <div className="ps-8 flex-[1.3] text-right">
        {t("coursesPayment.CourseGroup")}
      </div>
      <div className="px-4 flex-1">{t("coursesPayment.paymentDate")}</div>
      <div className="px-4 flex-1">{t("coursesPayment.DateEntered")}</div>
      <div className="px-1 flex-[0.8]">{t("coursesPayment.PaymentStatus")}</div>
      <div className="px-4 flex-1">{t("coursesPayment.Payment")}</div>
      <div className="pe-8 w-[100px] text-left">
        {t("coursesPayment.Operation")}
      </div>
    </div>
  );
};

export default CourseHeader;
