<<<<<<< HEAD:frontend/src/pages/auth/forgotPassword/ForgotPasswordStepTwo.jsx
import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import * as Yup from "yup";
import TranslateButton from "../../../components/TranslateButton/TranslateButton";
import { useTranslation } from "react-i18next";
import { ForgotVal2 } from "../../../utils/Validations/forgotpassVal/ForgotVal";
import resetData2 from "../../../components/common/Form/initialData/resetData2";
import { useMutation } from "@tanstack/react-query";
import ResetPass2 from "../../../core/services/api/post/ResetPass2";
import { toast } from "react-toastify";
import back from "../../../assets/Icons/A/back.png";
import lock from "../../../assets/Icons/A/lock.png";
import email from "../../../assets/Icons/A/email.png";
import sun from "../../../assets/Icons/A/sun.png";
import moon from "../../../assets/Icons/A/moon.png";
import eyeClose from "../../../assets/Icons/A/eyeClose.png";
import eyeOpen from "../../../assets/Icons/A/eyeOpen.png";
import forgot2 from "../../../assets/Images/A/forgot2.png";
import { useSelector } from "react-redux";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { getItem } from "../../../utils/helper/storage.services";
const ForgotPasswordStepTwo = () => {
  const { id } = useParams();
  console.log("dd", id);

  const gmail = getItem("gmail");

  ////
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [validationSchema, setValidationSchema] = useState(ForgotVal2());
  useEffect(() => {
    setValidationSchema(ForgotVal2());
  }, [i18n.language]);

  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const handleFirstPassword = () => {
    setShowFirstPassword((prev) => !prev);
  };
  const handleSecondPassword = () => {
    setShowSecondPassword((prev) => !prev);
  };

  const navigate = useNavigate();
  const { mutate: PostNewPass, isPending } = useMutation({
    mutationKey: ["POSTNEWPASS"],
    mutationFn: (values) => ResetPass2(values),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
  });

  return (
    <div className="bg-[#EAEAEA] dark:bg-[#1E1E1E] min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" flex flex-col rounded-[60px] overflow-hidden  bg-[#ffff] dark:bg-[#333] dark:text-white shadow-lg md:flex-row lg:flex-row w-[90%] sm:w-[95%] md:w-[90%] h-[72.17%] lg:h-[72.17%] p-2  "
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            delay: 0.5,
          }}
          className="  md:h-full md:w-[50%] flex flex-1 flex-col  py-8 px-2 sm:p-17 md:p-10 mt-0 md:mt-10  gap-15 "
        >
          <div className="  flex items-center justify-around">
            <div
              onClick={toggleTheme}
              className={` flex md:hidden cursor-pointer py-3 px-2  w-12 h-6   rounded-full    ${
                isDark
                  ? "bg-yellow-300/40 justify-end "
                  : "bg-blue-900/30  justify-start"
              } `}
            >
              <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center ">
                <img src={isDark ? sun : moon} alt="" />
              </div>
            </div>
            <Link
              to={"/forgotPassOne"}
              className="pr-7 sm:pr-9 mx-2 sm:mx-0  bg-no-repeat  bg-[right_1px_center] text-[14px] hover:text-blue-400 
                            transition duration-300"
              style={{ backgroundImage: `url(${back})` }}
            >
              {t("forgotPass.back")}
            </Link>
            <TranslateButton />
          </div>
          <div className="flex flex-col justify-center items-center gap-3 sm:px-5 md:px-0 ">
            <div className="flex flex-col justify-center items-center gap-2  ">
              <h2 className="text-[24px] font-bold text-[#008C78] mb-2 ">
                {t("forgotPass.ForgotPassword")}
              </h2>
              <h3 className="text-[16px] tracking-wide">
                {t("forgotPass.SetNewPass")}
              </h3>
            </div>
            <div className="w-full mt-6 sm:px-6 md:px-0  ">
              <Formik
                initialValues={resetData2}
                onSubmit={(value) => {
                  const finalValues = {
                    gmail: gmail,
                    newPassword: value.newPassword,
                    resetValue: id,
                  };
                  PostNewPass(finalValues);
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className=" w-[75%] sm:w-full mx-auto flex flex-col gap-10  items-center sm:items-stretch ">
                      <div className=" w-full flex flex-col gap-1 relative  items-center sm:items-stretch">
                        <Field
                          className={` focus:outline-none  bg-no-repeat    ${
                            isRTL
                              ? "bg-[right_20px_center]"
                              : "bg-[left_20px_center]"
                          } bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545] w-[95%] sm:w-full rounded-full px-12 py-3  placeholder:text-[15px] ${
                            errors.newPassword && touched.newPassword
                              ? "border-[#EF5350] border-1 "
                              : ""
                          } `}
                          style={{ backgroundImage: `url(${lock})` }}
                          type={showFirstPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          placeholder={t("forgotPass.SetNewPass")}
                        />
                        <img
                          onClick={handleFirstPassword}
                          src={showFirstPassword ? eyeClose : eyeOpen}
                          alt=""
                          className={`cursor-pointer absolute top-1/2 -translate-y-1/2
      w-[17px] h-[15px] object-cover
      ${isRTL ? "left-5 sm:left-4" : "right-5 sm:right-4"}
    `}
                        />
                        <ErrorMessage
                          name={"newPassword"}
                          component={"span"}
                          className="text-[#EF5350] text-[14px] whitespace-nowrap absolute top-16 right-5 sm:right-4 "
                        />
                      </div>

                      <motion.button
                        whileHover={{
                          scale: "1.03",
                          boxShadow: "0 0 8px #cccccc",
                        }}
                        whileTap={{ scale: "0.98" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="submit"
                        className=" w-[95%]  py-2 sm:px-5 sm:py-3 whitespace-nowrap sm:w-full text-center mt-2 bg-[#008C78] text-white text-[16px] rounded-full  "
                      >
                        {t("forgotPass.RegisterNewPass")}
                      </motion.button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            delay: 0.5,
          }}
          className=" hidden md:flex flex-1 flex-col items-center justify-center  p-9  bg-[#EEFFFC] dark:bg-[#454545] rounded-[60px] relative"
        >
          <div
            onClick={toggleTheme}
            className={` cursor-pointer py-3 px-2  w-12 h-6   rounded-full  absolute top-14 left-7 flex  ${
              isDark
                ? "bg-yellow-300/40 justify-end "
                : "bg-blue-900/30  justify-start"
            } `}
          >
            <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center ">
              <img src={isDark ? sun : moon} alt="" />
            </div>
          </div>
          <div className=" mt-5 flex flex-col  items-center justify-center gap-6">
            <div className=" flex flex-col justify-center items-center  ">
              <img
                className=" max-w-[435px] w-full md:h-[100%] lg:h-[300px] xl:min-h-[409.592529296875px]  "
                src={forgot2}
                alt=""
              />
            </div>
            <div className=" flex flex-col justify-center items-center  gap-4">
              <h2 className="text-[#005B77]  tracking-wide mt-2 md:text-[19px] lg:text-[24px] font-bold dark:text-[white] ">
                {t("forgotPass.title2")}
              </h2>
              <p className=" md:text-sm lg:text-[16px] text-center">
                {t("forgotPass.caption2")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordStepTwo;
=======
import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import * as Yup from "yup";
import TranslateButton from "../../../components/TranslateButton/TranslateButton";
import { useTranslation } from "react-i18next";
import { ForgotVal2 } from "../../../utils/Validations/forgotpassVal/ForgotVal";
import resetData2 from "../../../components/common/Form/initialData/resetData2";
import { useMutation } from "@tanstack/react-query";
import ResetPass2 from "../../../core/services/api/post/ResetPass2";
import { toast } from "react-toastify";
import back from "../../../assets/Icons/A/back.png";
import lock from "../../../assets/Icons/A/lock.png";
import email from "../../../assets/Icons/A/email.png";
import sun from "../../../assets/Icons/A/sun.png";
import moon from "../../../assets/Icons/A/moon.png";
import eyeClose from "../../../assets/Icons/A/eyeClose.png";
import eyeOpen from "../../../assets/Icons/A/eyeOpen.png";
import forgot2 from "../../../assets/Images/A/forgot2.png";
import { useSelector } from "react-redux";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { getItem } from "../../../utils/helper/storage.services";
const ForgotPasswordStepTwo = () => {
  const { id } = useParams();
  console.log("dd", id);

  const gmail = getItem("gmail");

  ////
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [validationSchema, setValidationSchema] = useState(ForgotVal2());
  useEffect(() => {
    setValidationSchema(ForgotVal2());
  }, [i18n.language]);

  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const handleFirstPassword = () => {
    setShowFirstPassword((prev) => !prev);
  };
  const handleSecondPassword = () => {
    setShowSecondPassword((prev) => !prev);
  };

  const navigate = useNavigate();
  const { mutate: PostNewPass, isPending } = useMutation({
    mutationKey: ["POSTNEWPASS"],
    mutationFn: (values) => ResetPass2(values),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
  });

  return (
    <div className="bg-[#EAEAEA] dark:bg-[#1E1E1E] min-h-screen flex items-center justify-center ">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className=" flex flex-col rounded-[60px] overflow-hidden  bg-[#ffff] dark:bg-[#333] dark:text-white shadow-lg md:flex-row lg:flex-row w-[90%] sm:w-[95%] md:w-[90%] h-[72.17%] lg:h-[72.17%] p-2  "
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            delay: 0.5,
          }}
          className="  md:h-full md:w-[50%] flex flex-1 flex-col  py-8 px-2 sm:p-17 md:p-10 mt-0 md:mt-10  gap-15 "
        >
          <div className="  flex items-center justify-around">
            <div
              onClick={toggleTheme}
              className={` flex md:hidden cursor-pointer py-3 px-2  w-12 h-6   rounded-full    ${
                isDark
                  ? "bg-yellow-300/40 justify-end "
                  : "bg-blue-900/30  justify-start"
              } `}
            >
              <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center ">
                <img src={isDark ? sun : moon} alt="" />
              </div>
            </div>
            <Link
              to={"/forgotPassOne"}
              className="pr-7 sm:pr-9 mx-2 sm:mx-0  bg-no-repeat  bg-[right_1px_center] text-[14px] hover:text-blue-400 
                            transition duration-300"
              style={{ backgroundImage: `url(${back})` }}
            >
              {t("forgotPass.back")}
            </Link>
            <TranslateButton />
          </div>
          <div className="flex flex-col justify-center items-center gap-3 sm:px-5 md:px-0 ">
            <div className="flex flex-col justify-center items-center gap-2  ">
              <h2 className="text-[24px] font-bold text-[#008C78] mb-2 ">
                {t("forgotPass.ForgotPassword")}
              </h2>
              <h3 className="text-[16px] tracking-wide">
                {t("forgotPass.SetNewPass")}
              </h3>
            </div>
            <div className="w-full mt-6 sm:px-6 md:px-0  ">
              <Formik
                initialValues={resetData2}
                onSubmit={(value) => {
                  const finalValues = {
                    gmail: gmail,
                    newPassword: value.newPassword,
                    resetValue: id,
                  };
                  PostNewPass(finalValues);
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className=" w-[75%] sm:w-full mx-auto flex flex-col gap-10  items-center sm:items-stretch ">
                      <div className=" w-full flex flex-col gap-1 relative  items-center sm:items-stretch">
                        <Field
                          className={` focus:outline-none  bg-no-repeat    ${
                            isRTL
                              ? "bg-[right_20px_center]"
                              : "bg-[left_20px_center]"
                          } bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545] w-[95%] sm:w-full rounded-full px-12 py-3  placeholder:text-[15px] ${
                            errors.newPassword && touched.newPassword
                              ? "border-[#EF5350] border-1 "
                              : ""
                          } `}
                          style={{ backgroundImage: `url(${lock})` }}
                          type={showFirstPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          placeholder={t("forgotPass.SetNewPass")}
                        />
                        <img
                          onClick={handleFirstPassword}
                          src={showFirstPassword ? eyeClose : eyeOpen}
                          alt=""
                          className={`cursor-pointer absolute top-1/2 -translate-y-1/2
      w-[17px] h-[15px] object-cover
      ${isRTL ? "left-5 sm:left-4" : "right-5 sm:right-4"}
    `}
                        />
                        <ErrorMessage
                          name={"newPassword"}
                          component={"span"}
                          className="text-[#EF5350] text-[14px] whitespace-nowrap absolute top-16 right-5 sm:right-4 "
                        />
                      </div>

                      <motion.button
                        whileHover={{
                          scale: "1.03",
                          boxShadow: "0 0 8px #cccccc",
                        }}
                        whileTap={{ scale: "0.98" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="submit"
                        className=" w-[95%]  py-2 sm:px-5 sm:py-3 whitespace-nowrap sm:w-full text-center mt-2 bg-[#008C78] text-white text-[16px] rounded-full  "
                      >
                        {t("forgotPass.RegisterNewPass")}
                      </motion.button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeOut",
            type: "spring",
            stiffness: 300,
            delay: 0.5,
          }}
          className=" hidden md:flex flex-1 flex-col items-center justify-center  p-9  bg-[#EEFFFC] dark:bg-[#454545] rounded-[60px] relative"
        >
          <div
            onClick={toggleTheme}
            className={` cursor-pointer py-3 px-2  w-12 h-6   rounded-full  absolute top-14 left-7 flex  ${
              isDark
                ? "bg-yellow-300/40 justify-end "
                : "bg-blue-900/30  justify-start"
            } `}
          >
            <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center ">
              <img src={isDark ? sun : moon} alt="" />
            </div>
          </div>
          <div className=" mt-5 flex flex-col  items-center justify-center gap-6">
            <div className=" flex flex-col justify-center items-center  ">
              <img
                className=" max-w-[435px] w-full md:h-[100%] lg:h-[300px] xl:min-h-[409.592529296875px]  "
                src={forgot2}
                alt=""
              />
            </div>
            <div className=" flex flex-col justify-center items-center  gap-4">
              <h2 className="text-[#005B77]  tracking-wide mt-2 md:text-[19px] lg:text-[24px] font-bold dark:text-[white] ">
                {t("forgotPass.title2")}
              </h2>
              <p className=" md:text-sm lg:text-[16px] text-center">
                {t("forgotPass.caption2")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordStepTwo;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/pages/auth/forgotPassword/ForgotPasswordStepTwo.jsx
