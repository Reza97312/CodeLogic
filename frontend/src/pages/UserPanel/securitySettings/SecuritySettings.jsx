import { ErrorMessage, Field, Form, Formik } from "formik";
import { delay, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { securitySettingsVal } from "../../../utils/Validations/securitySettings/securitySettingsVal.js";
import { useTranslation } from "react-i18next";
import eyeOpen from "../../../assets/Icons/A/eyeOpen.png";
import eyeClose from "../../../assets/Icons/A/eyeClose.png";
import { useMutation } from "@tanstack/react-query";
import { securitySet } from "../../../core/services/api/post/securitySettings";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PutTwoStepVerify } from "../../../core/services/api/put/PutTwoStepVerify.js";
import { twpStepAuthValidation } from "../../../utils/Validations/securitySettings/twoStepAuth.js";
const SecuritySettings = () => {
  const navigate = useNavigate();
  //// post values ////
  const { mutate: postSecurityApi, isPending } = useMutation({
    mutationKey: ["SECURITY"],
    mutationFn: (values) => securitySet(values),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
  //// put twp step auth ////
  const { mutate: putTwoStep } = useMutation({
    mutationKey: ["TOWSTEPAUTH"],
    mutationFn: (values) => PutTwoStepVerify(values),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
  });
  //// 18n /////
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  //// validation ////
  const [validationSchema, setValidationSchema] = useState(
    securitySettingsVal(),
  );
  useEffect(() => {
    setValidationSchema(securitySettingsVal());
  }, [i18n.language]);
  //// is hide passWord ? ////
  const [isHide1, setIsHide1] = useState(true);
  const [isHide2, setIsHide2] = useState(true);

  /// motion framer ///
  const leftAnimate = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300, duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.35,
        type: "spring",
        stiffness: 250,
        delay: 0.2,
      },
    },
  };
  const rightAnimate = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        duration: 0.35,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.35, type: "spring", stiffness: 250 },
    },
  };
  const buttomAnimate = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        duration: 0.35,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -60,
      transition: { duration: 0.35, type: "spring", stiffness: 250 },
    },
  };
  const buttonAnimate = {
    hover: {
      scale: 1.1,
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
    tap: {
      scale: 0.98,
    },
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        duration: 0.35,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="bg-[#F3F4F6] dark:bg-[#333]  w-full h-full p-8 md:p-6 lg:p-8 flex flex-col gap-5 my-6 rounded-4xl ">
      <div>
        <Formik
          initialValues={{ oldPassword: "", newPassword: "" }}
          onSubmit={(values) => {
            postSecurityApi(values);
            console.log(values);
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="  flex justify-between flex-col lg:flex-row  lg:flex-wrap">
                <motion.div
                  variants={rightAnimate}
                  initial="hidden"
                  animate="visible"
                  className=" w-[100%] lg:w-[45%]  flex flex-col gap-4  "
                >
                  <label className="  text-center text-[16px] dark:text-[#848484] ">
                    {t("securitySetting.currentPassword")}
                  </label>
                  <div className=" mb-10 md:mb-6 lg:mb-0 w-full relative">
                    <Field
                      placeholder={t("securitySetting.currentPassPlaceHolder")}
                      type={`${isHide1 ? "password" : "text"}`}
                      name="oldPassword"
                      id="oldPassword"
                      className={`w-full relative bg-[#FFFFFF] dark:text-[#ffff] dark:bg-[#454545] placeholder:text-[12px] sm:placeholder:text-[14px] md:placeholder:text-[13px] lg:placeholder:text-[16px] focus:outline-none
                             ${
                               errors.oldPassword && touched.oldPassword
                                 ? "border border-red-600"
                                 : ""
                             }         placeholder:text-[#848484] rounded-[16px] py-2 px-3  border border-[#EAEAEA] shadow`}
                    />
                    <img
                      src={isHide1 ? eyeOpen : eyeClose}
                      alt=""
                      className={`absolute w-5 h-5 ${
                        isRTL ? "left-[15px]" : "right-[15px]"
                      } top-[50%] translate-y-[-50%] cursor-pointer `}
                      onClick={() => setIsHide1((prev) => !prev)}
                    />
                    <ErrorMessage
                      name={"oldPassword"}
                      component={"span"}
                      className="text-[#EF5350] text-[14px] absolute top-12  right-3  "
                    />
                  </div>
                </motion.div>
                <motion.div
                  variants={leftAnimate}
                  initial="hidden"
                  animate="visible"
                  className="w-[100%] lg:w-[45%] flex flex-col gap-4 dark:text-[#848484]"
                >
                  <label className="text-[16px] text-center dark:text-[#848484]">
                    {t("securitySetting.newPassword")}
                  </label>
                  <div className="w-full relative ">
                    <Field
                      placeholder={t("securitySetting.newPassPlaceHolder")}
                      type={`${isHide2 ? "password" : "text"}`}
                      name="newPassword"
                      id="newPassword"
                      className={`w-full dark:text-[#ffff] dark:bg-[#454545] bg-[#FFFFFF] placeholder:text-[12px] sm:placeholder:text-[14px] md:placeholder:text-[13px] lg:placeholder:text-[16px] focus:outline-none
                          ${
                            errors.newPassword && touched.newPassword
                              ? "border border-red-600"
                              : ""
                          }           placeholder:text-[#848484] rounded-[16px] py-2 px-3  border border-[#EAEAEA] shadow `}
                    />
                    <img
                      src={isHide2 ? eyeOpen : eyeClose}
                      alt=""
                      className={`absolute w-5 h-5 ${
                        isRTL ? "left-[15px]" : "right-[15px]"
                      } top-[50%] translate-y-[-50%] cursor-pointer `}
                      onClick={() => setIsHide2((prev) => !prev)}
                    />
                    <ErrorMessage
                      name={"newPassword"}
                      component={"span"}
                      className="text-[#EF5350] text-[14px] absolute top-12  right-3  "
                    />
                  </div>
                </motion.div>
                <motion.button
                  variants={buttonAnimate}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  className="  px-4 py-3 mt-9 md:mt-8 lg:mt-9 text-[#ffff] text-[16px] bg-[#008C78] cursor-pointer rounded-[16px]"
                >
                  {t("securitySetting.changePass")}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-7 md:mt-0 lg:mt-7">
        <Formik
          initialValues={{
            twoStepAuth: "",
            telegramUsername: "",
            recoveryEmail: "abolfazlmnf83@gmail.com",
          }}
          onSubmit={(values) => {
            putTwoStep(values);
            console.log(values);
          }}
          validationSchema={twpStepAuthValidation}
        >
          {({ errors, touched }) => (
            <Form>
              <motion.div
                variants={buttonAnimate}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4 w-[100%] lg:w-[45%] "
              >
                <div className="w-full relative ">
                  <Field
                    type="text"
                    name="telegramUsername"
                    id="telegramUsername"
                    placeholder={t("securitySetting.telegramId")}
                    className={`w-full dark:text-[#ffff] dark:bg-[#454545] bg-[#FFFFFF] placeholder:text-[12px] sm:placeholder:text-[14px] md:placeholder:text-[13px] lg:placeholder:text-[16px] focus:outline-none
                          ${
                            errors.telegramUsername && touched.telegramUsername
                              ? "border border-red-600"
                              : ""
                          } placeholder:text-[#848484] rounded-[16px] py-2 px-3  border border-[#EAEAEA] shadow `}
                  />
                  <ErrorMessage
                    name="telegramUsername"
                    component={"span"}
                    className="text-[#EF5350] text-[14px] absolute top-12  right-3 "
                  />
                </div>

                <div className="flex gap-3 mt-6  ">
                  <label className=" text-[16px] dark:text-[#ffff] md:whitespace-nowrap lg:whitespace-normal ">
                    {t("securitySetting.twpStepEnabled")}
                  </label>
                  <Field type="checkbox" id="twoStepAuth" name="twoStepAuth" />
                </div>
              </motion.div>
              <motion.button
                variants={buttonAnimate}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className=" w-[100%]  lg:w-auto px-4 py-3 mt-7 md:mt-4 lg:mt-7 text-[#ffff] text-[16px] bg-[#008C78] cursor-pointer rounded-[16px]"
              >
                {t("securitySetting.saveSettings")}
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SecuritySettings;
