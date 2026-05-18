<<<<<<< HEAD:frontend/src/pages/auth/Login/LoginPage.jsx
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { motion } from "framer-motion";
import TranslateButton from "../../../components/TranslateButton/TranslateButton";
import { useTranslation } from "react-i18next";
import { Login1Val } from "../../../utils/Validations/loginVal/LoginVal";
import Login from "../../../core/services/api/post/login";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import loginData from "../../../components/common/Form/initialData/loginData";
import sun from "../../../assets/Icons/A/sun.png";
import moon from "../../../assets/Icons/A/moon.png";
import eyeClose from "../../../assets/Icons/A/eyeClose.png";
import eyeOpen from "../../../assets/Icons/A/eyeOpen.png";
import login1 from "../../../assets/Images/A/login1.png";
import home from "../../../assets/Icons/A/home.png";
import use from "../../../assets/Icons/A/user.png";
import lock from "../../../assets/Icons/A/lock.png";
import { setItem } from "../../../utils/helper/storage.services";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { useDispatch } from "react-redux";
import { addPhoneGmail } from "../../../utils/redux/slice/phoneGmailSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const { mutate: postLogin, isPending } = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: (values) => {
      const res = Login(values);
      dispatch(addPhoneGmail(values.phoneOrGmail));
      return res;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      if (data.success && data.token !== null) {
        console.log("Login token", data.token);
        setItem("token", data.token);
        toast.success(data.message);
        navigate(`/`);
      } else if (data.success && data.token === null) {
        toast.success(data.message);
        navigate("/loginValidation");
      } else if (!data.success) {
        toast.error(data?.response?.data?.message);
      }
    },
  });

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  const [validationSchema, setValidationSchema] = useState(Login1Val());
  useEffect(() => {
    setValidationSchema(Login1Val());
  }, [i18n.language]);

  return (
    <div className="bg-[#EAEAEA] dark:bg-[#1E1E1E] min-h-screen flex items-center  justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
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
          className=" md:h-full md:w-[50%] flex flex-1 flex-col  py-8 px-2 sm:p-10 md:p-5 2xl:p-17  mt-0 md:mt-10 lg:mt-10 2xl:mt-0  gap-5  md:gap-15 2xl:gap-10 "
        >
          <div className=" flex justify-around items-center">
            <div
              onClick={toggleTheme}
              className={`  flex md:hidden cursor-pointer  py-3 px-2  w-12 h-6   rounded-full     ${
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
              to={"/"}
              className=" pr-7 sm:pr-9 mx-2 sm:mx-0  bg-no-repeat bg-[length:22.489788055419922px_20px] bg-[right_1px_center] text-[14px]
                             hover:text-blue-400 transition duration-300"
              style={{ backgroundImage: `url(${home})` }}
            >
              {t("login.HomePage")}
            </Link>
            <TranslateButton />
          </div>
          <div className="flex flex-col justify-center items-center gap-5  ">
            <h2 className="text-[24px] font-bold text-[#008C78] ">
              {t("login.LoginToUserAccount")}
            </h2>
            <div className="w-full mt-6 sm:px-6 md:px-0  ">
              <Formik
                initialValues={loginData}
                onSubmit={(values) => {
                  console.log(values);
                  postLogin(values);
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className=" w-[75%] sm:w-full mx-auto flex flex-col gap-10  items-center sm:items-stretch ">
                      <div className=" w-full flex flex-col gap-1 relative  items-center sm:items-stretch">
                        <Field
                          className={`outline-none  bg-no-repeat  ${
                            isRTL
                              ? "bg-[right_20px_center]"
                              : "bg-[left_20px_center]"
                          }  bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545]  w-[95%] sm:w-full rounded-full px-12 py-3  placeholder:text-[15px] ${
                            errors.phoneOrGmail && touched.phoneOrGmail
                              ? "border-[#EF5350] border-1 "
                              : ""
                          }`}
                          style={{ backgroundImage: `url(${lock})` }}
                          type="text"
                          name="phoneOrGmail"
                          id="phoneOrGmail"
                          placeholder={t("login.EmailOrPhoneNumber")}
                        />
                        <ErrorMessage
                          name={"phoneOrGmail"}
                          component={"span"}
                          className="text-[#EF5350] text-[14px] whitespace-nowrap absolute top-15 right-5 md:right-3 sm:right-0 "
                        />
                      </div>

                      <div className=" w-full flex flex-col gap-1 relative  items-center sm:items-stretch mt-0 2xl:mt-6">
                        <Field
                          className={` bg-no-repeat   ${
                            isRTL
                              ? "bg-[right_20px_center]"
                              : "bg-[left_20px_center]"
                          } bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545] w-[95%] sm:w-full rounded-full px-12 py-3 outline-none placeholder:text-[15px] ${
                            errors.password && touched.password
                              ? "border-[#EF5350] border-1 "
                              : ""
                          } `}
                          style={{ backgroundImage: `url(${use})` }}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder={t("login.password")}
                        />
                        <img
                          onClick={handlePassword}
                          src={showPassword ? eyeClose : eyeOpen}
                          alt=""
                          className={` cursor-pointer absolute ${
                            isRTL ? "left-7" : "right-7"
                          } top-1/2 -translate-y-1/2 w-[17px] h-[15px] object-cover  `}
                        />
                        <ErrorMessage
                          name={"password"}
                          component={"span"}
                          className="text-[#EF5350] whitespace-nowrap text-[14px] absolute right-5 sm:right-0 md:right-3 top-15 "
                        />
                      </div>

                      <div className=" w-[95%] sm:w-full  flex justify-between mt-3 2xl:mt-6 ">
                        <div className="flex gap-2">
                          <Field
                            className=""
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                          />
                          <label
                            className="text-[12px] sm:text-[14px]"
                            htmlFor="rememberMe"
                          >
                            {t("login.RememberMe")}
                          </label>
                        </div>
                        <Link
                          to={"/forgotPassOne"}
                          className=" text-[12px] sm:text-[13px] text-[#848484] hover:text-blue-400 transition duration-300"
                        >
                          {t("login.ForgotPassword")}
                        </Link>
                      </div>
                      <motion.button
                        whileHover={{
                          scale: "1.03",
                          boxShadow: "0 0 8px #cccccc",
                        }}
                        whileTap={{ scale: "0.98" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="submit"
                        disabled={isPending}
                        className=" w-[95%]  py-2 sm:px-5 sm:py-3 whitespace-nowrap sm:w-full text-center mt-2 bg-[#008C78] text-white text-[16px] rounded-full  "
                      >
                        {t("login.login")}
                      </motion.button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-[14px] mt-10 mb-5 sm:mb-0 md:mt-0">
              {t("login.DontHaveAccount?")}{" "}
              <Link
                to={"/RegisterStepOne"}
                className="text-[#008C78]  hover:text-blue-500 transition duration-300"
              >
                {t("login.Register")}
              </Link>
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
            className={` cursor-pointer  py-3 px-2  w-12 h-6   rounded-full  absolute top-14 left-7 flex  ${
              isDark
                ? "bg-yellow-300/40 justify-end "
                : "bg-blue-900/30  justify-start"
            } `}
          >
            <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center ">
              <img src={isDark ? sun : moon} alt="" />
            </div>
          </div>
          <div className=" mt-5 flex flex-col  items-center justify-center gap-6 ">
            <div className=" flex flex-col justify-center items-center  ">
              <img
                className=" max-w-[435px] w-full md:h-[100%] lg:h-[300px] xl:h-[400px] 2xl:min-h-[409.592529296875px]  "
                src={login1}
                alt=""
              />
            </div>
            <div className="hidden md:flex flex-col justify-center items-center  gap-4">
              <h2 className="text-[#005B77]  tracking-wide mt-2 md:text-[19px] lg:text-[24px] font-bold dark:text-[white] ">
                {t("login.Title1")}
              </h2>
              <p className=" md:text-sm lg:text-[16px] text-center">
                {t("login.Caption1")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
=======
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { motion } from "framer-motion";
import TranslateButton from "../../../components/TranslateButton/TranslateButton";
import { useTranslation } from "react-i18next";
import { Login1Val } from "../../../utils/Validations/loginVal/LoginVal";
import Login from "../../../core/services/api/post/login";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import loginData from "../../../components/common/Form/initialData/loginData";
import sun from "../../../assets/Icons/A/sun.png";
import moon from "../../../assets/Icons/A/moon.png";
import eyeClose from "../../../assets/Icons/A/eyeClose.png";
import eyeOpen from "../../../assets/Icons/A/eyeOpen.png";
import login1 from "../../../assets/Images/A/login1.png";
import home from "../../../assets/Icons/A/home.png";
import use from "../../../assets/Icons/A/user.png";
import lock from "../../../assets/Icons/A/lock.png";
import { setItem } from "../../../utils/helper/storage.services";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";
import { useDispatch } from "react-redux";
import { addPhoneGmail } from "../../../utils/redux/slice/phoneGmailSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const { mutate: postLogin, isPending } = useMutation({
    mutationKey: ["LOGIN"],
    mutationFn: (values) => {
      const res = Login(values);
      dispatch(addPhoneGmail(values.phoneOrGmail));
      return res;
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      if (data.success && data.token !== null) {
        console.log("Login token", data.token);
        setItem("token", data.token);
        toast.success(data.message);
        navigate(`/`);
      } else if (data.success && data.token === null) {
        toast.success(data.message);
        navigate("/loginValidation");
      } else if (!data.success) {
        toast.error(data?.response?.data?.message);
      }
    },
  });

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  const [validationSchema, setValidationSchema] = useState(Login1Val());
  useEffect(() => {
    setValidationSchema(Login1Val());
  }, [i18n.language]);

  return (
    <div className="bg-[#EAEAEA] dark:bg-[#1E1E1E] min-h-screen flex items-center  justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
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
          className=" md:h-full md:w-[50%] flex flex-1 flex-col  py-8 px-2 sm:p-10 md:p-5 2xl:p-17  mt-0 md:mt-10 lg:mt-10 2xl:mt-0  gap-5  md:gap-15 2xl:gap-10 "
        >
          <div className=" flex justify-around items-center">
            <div
              onClick={toggleTheme}
              className={`  flex md:hidden cursor-pointer  py-3 px-2  w-12 h-6   rounded-full     ${
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
              to={"/"}
              className=" pr-7 sm:pr-9 mx-2 sm:mx-0  bg-no-repeat bg-[length:22.489788055419922px_20px] bg-[right_1px_center] text-[14px]
                             hover:text-blue-400 transition duration-300"
              style={{ backgroundImage: `url(${home})` }}
            >
              {t("login.HomePage")}
            </Link>
            <TranslateButton />
          </div>
          <div className="flex flex-col justify-center items-center gap-5  ">
            <h2 className="text-[24px] font-bold text-[#008C78] ">
              {t("login.LoginToUserAccount")}
            </h2>
            <div className="w-full mt-6 sm:px-6 md:px-0  ">
              <Formik
                initialValues={loginData}
                onSubmit={(values) => {
                  console.log(values);
                  postLogin(values);
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className=" w-[75%] sm:w-full mx-auto flex flex-col gap-10  items-center sm:items-stretch ">
                      <div className=" w-full flex flex-col gap-1 relative  items-center sm:items-stretch">
                        <Field
                          className={`outline-none  bg-no-repeat  ${
                            isRTL
                              ? "bg-[right_20px_center]"
                              : "bg-[left_20px_center]"
                          }  bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545]  w-[95%] sm:w-full rounded-full px-12 py-3  placeholder:text-[15px] ${
                            errors.phoneOrGmail && touched.phoneOrGmail
                              ? "border-[#EF5350] border-1 "
                              : ""
                          }`}
                          style={{ backgroundImage: `url(${lock})` }}
                          type="text"
                          name="phoneOrGmail"
                          id="phoneOrGmail"
                          placeholder={t("login.EmailOrPhoneNumber")}
                        />
                        <ErrorMessage
                          name={"phoneOrGmail"}
                          component={"span"}
                          className="text-[#EF5350] text-[14px] whitespace-nowrap absolute top-15 right-5 md:right-3 sm:right-0 "
                        />
                      </div>

                      <div className=" w-full flex flex-col gap-1 relative  items-center sm:items-stretch mt-0 2xl:mt-6">
                        <Field
                          className={` bg-no-repeat   ${
                            isRTL
                              ? "bg-[right_20px_center]"
                              : "bg-[left_20px_center]"
                          } bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545] w-[95%] sm:w-full rounded-full px-12 py-3 outline-none placeholder:text-[15px] ${
                            errors.password && touched.password
                              ? "border-[#EF5350] border-1 "
                              : ""
                          } `}
                          style={{ backgroundImage: `url(${use})` }}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder={t("login.password")}
                        />
                        <img
                          onClick={handlePassword}
                          src={showPassword ? eyeClose : eyeOpen}
                          alt=""
                          className={` cursor-pointer absolute ${
                            isRTL ? "left-7" : "right-7"
                          } top-1/2 -translate-y-1/2 w-[17px] h-[15px] object-cover  `}
                        />
                        <ErrorMessage
                          name={"password"}
                          component={"span"}
                          className="text-[#EF5350] whitespace-nowrap text-[14px] absolute right-5 sm:right-0 md:right-3 top-15 "
                        />
                      </div>

                      <div className=" w-[95%] sm:w-full  flex justify-between mt-3 2xl:mt-6 ">
                        <div className="flex gap-2">
                          <Field
                            className=""
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                          />
                          <label
                            className="text-[12px] sm:text-[14px]"
                            htmlFor="rememberMe"
                          >
                            {t("login.RememberMe")}
                          </label>
                        </div>
                        <Link
                          to={"/forgotPassOne"}
                          className=" text-[12px] sm:text-[13px] text-[#848484] hover:text-blue-400 transition duration-300"
                        >
                          {t("login.ForgotPassword")}
                        </Link>
                      </div>
                      <motion.button
                        whileHover={{
                          scale: "1.03",
                          boxShadow: "0 0 8px #cccccc",
                        }}
                        whileTap={{ scale: "0.98" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="submit"
                        disabled={isPending}
                        className=" w-[95%]  py-2 sm:px-5 sm:py-3 whitespace-nowrap sm:w-full text-center mt-2 bg-[#008C78] text-white text-[16px] rounded-full  "
                      >
                        {t("login.login")}
                      </motion.button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="text-[14px] mt-10 mb-5 sm:mb-0 md:mt-0">
              {t("login.DontHaveAccount?")}{" "}
              <Link
                to={"/RegisterStepOne"}
                className="text-[#008C78]  hover:text-blue-500 transition duration-300"
              >
                {t("login.Register")}
              </Link>
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
            className={` cursor-pointer  py-3 px-2  w-12 h-6   rounded-full  absolute top-14 left-7 flex  ${
              isDark
                ? "bg-yellow-300/40 justify-end "
                : "bg-blue-900/30  justify-start"
            } `}
          >
            <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center ">
              <img src={isDark ? sun : moon} alt="" />
            </div>
          </div>
          <div className=" mt-5 flex flex-col  items-center justify-center gap-6 ">
            <div className=" flex flex-col justify-center items-center  ">
              <img
                className=" max-w-[435px] w-full md:h-[100%] lg:h-[300px] xl:h-[400px] 2xl:min-h-[409.592529296875px]  "
                src={login1}
                alt=""
              />
            </div>
            <div className="hidden md:flex flex-col justify-center items-center  gap-4">
              <h2 className="text-[#005B77]  tracking-wide mt-2 md:text-[19px] lg:text-[24px] font-bold dark:text-[white] ">
                {t("login.Title1")}
              </h2>
              <p className=" md:text-sm lg:text-[16px] text-center">
                {t("login.Caption1")}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/pages/auth/Login/LoginPage.jsx
