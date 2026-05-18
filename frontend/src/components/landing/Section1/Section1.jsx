<<<<<<< HEAD:frontend/src/components/landing/Section1/Section1.jsx
import React from "react";
import Section1Card from "../../common/Section1Card/Section1Card";
import { useTranslation } from "react-i18next";
import getLandingReports from "../../../core/services/api/get/getLandingReports";
import { useQuery } from "@tanstack/react-query";

const Section1 = () => {
  const { t } = useTranslation();

  const { data: landingReportsData, isLoading } = useQuery({
    queryKey: ["GETLANDINGREPORTS"],
    queryFn: () => getLandingReports({}),
  });

  const sectionData = [
    {
      id: 1,
      title: t("section1.title1"),
      members: `${landingReportsData?.teacherCount}+`,
    },
    {
      id: 2,
      title: t("section1.title2"),
      members: `${landingReportsData?.studentCount}+`,
    },
    {
      id: 3,
      title: t("section1.title3"),
      members: `${landingReportsData?.courseCount}+`,
    },
    { id: 4, title: t("section1.title4"), members: "15+" },
  ];

  return (
    <div
      className="flex flex-col justify-center items-center w-full text-[#FFFFFF] divide-y-[2px] divide-[#FFFFFF] bg-[#008C78]   
    dark:divide-[#EEEEEE]
    sm:flex-row sm:py-6 sm:divide-y-0 sm:divide-x-[2px]
    lg:py-8"
    >
      {sectionData.map((item, index) => {
        return <Section1Card item={item} key={index} isLoading={isLoading} />;
      })}
    </div>
  );
};

export default Section1;
=======
import React from "react";
import Section1Card from "../../common/Section1Card/Section1Card";
import { useTranslation } from "react-i18next";
import getLandingReports from "../../../core/services/api/get/getLandingReports";
import { useQuery } from "@tanstack/react-query";

const Section1 = () => {
  const { t } = useTranslation();

  const { data: landingReportsData, isLoading } = useQuery({
    queryKey: ["GETLANDINGREPORTS"],
    queryFn: () => getLandingReports({}),
  });

  const sectionData = [
    {
      id: 1,
      title: t("section1.title1"),
      members: `${landingReportsData?.teacherCount}+`,
    },
    {
      id: 2,
      title: t("section1.title2"),
      members: `${landingReportsData?.studentCount}+`,
    },
    {
      id: 3,
      title: t("section1.title3"),
      members: `${landingReportsData?.courseCount}+`,
    },
    { id: 4, title: t("section1.title4"), members: "15+" },
  ];

  return (
    <div
      className="flex flex-col justify-center items-center w-full text-[#FFFFFF] divide-y-[2px] divide-[#FFFFFF] bg-[#008C78]   
    dark:divide-[#EEEEEE]
    sm:flex-row sm:py-6 sm:divide-y-0 sm:divide-x-[2px]
    lg:py-8"
    >
      {sectionData.map((item, index) => {
        return <Section1Card item={item} key={index} isLoading={isLoading} />;
      })}
    </div>
  );
};

export default Section1;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/landing/Section1/Section1.jsx
