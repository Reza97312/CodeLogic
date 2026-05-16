import EastIcon from "@mui/icons-material/East";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import regone from "../../../assets/Images/regone.svg";
import { RegisterStepThree } from "../../../utils/Validations/RegisterVal/Register.validation";
import TranslateButton from "../../../components/TranslateButton/TranslateButton";
import sun from "../../../assets/Icons/A/sun.png";
import moon from "../../../assets/Icons/A/moon.png";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import RegisterStepThreeApi from "../../../core/services/api/post/registerStepThree";
import { ClockLoader } from "react-spinners";
import { setItem } from "../../../utils/helper/storage.services";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";

const StepThree = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gmail = searchParams.get("gmail");

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: (payload) => RegisterStepThreeApi(payload),
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("ثبت‌ نام با موفقیت انجام شد");
        navigate(`/`);
        setItem("token", data.token);
      } else {
        toast.error(data?.message);
      }
    },
    onError: () => {
      toast.error("خطا در انجام ثبت‌ نام");
    },
  });

  const handleSubmit = (values) => {
    registerUser({
      gmail,
      phoneNumber: values.phoneNumber,
      password: values.password,
    });
  };

  const [initialValues] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleEyepassword = () => setShowPassword(!showPassword);
  const toggleEyeconfirmpassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const fadeInUp = (delay) => ({
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  });

  const fadeInOnly = (delay) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", delay },
    },
  });

  const imageVariant = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariant}
      className={`flex justify-center items-center min-h-screen transition-colors duration-500 ${
        isDark ? "bg-[#1e1e1e]" : "bg-[#EAEAEA]"
      }`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterStepThree}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="w-full flex justify-center">
            <div
              className={`flex flex-col md:flex-row w-[90%] sm:w-[95%] md:w-[90%] h-[72.17%] lg:h-[72.17%] rounded-4xl shadow-md overflow-hidden transition-colors duration-500 ${
                isDark ? "bg-[#333]" : "bg-white"
              }`}
            >
              <motion.div
                variants={imageVariant}
                initial="hidden"
                animate="visible"
                className="w-full  lg:w-[47.44%] hidden md:flex justify-center items-center"
              >
                <div
                  className={`w-[95%]  sm:w-[90%] md:w-[95%]  md:h-[97%] lg:h-[95.67%] rounded-xl flex flex-col justify-center items-center md:mb-4 md:mt-4 lg:mt-0 lg:mb-0 mr-0 lg:mr-2 relative transition-colors duration-500 ${
                    isDark ? "bg-[#454545]" : "bg-[#EEFFFC]"
                  }`}
                >
                  <div
                    onClick={toggleTheme}
                    className={`cursor-pointer py-3 px-2 w-11 h-5 rounded-full absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-7 flex transition-colors duration-500 ${
                      isDark
                        ? "bg-yellow-300/40 justify-end"
                        : "bg-blue-900/30 justify-start"
                    }`}
                  >
                    <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center">
                      <img src={`${isDark ? sun : moon}`} alt="theme icon" />
                    </div>
                  </div>

                  <img
                    className="w-[70%] sm:w-[75%] md:w-[70%] h-auto sm:h-[40%] md:h-[45%] lg:h-[52.63%] mb-6 sm:mb-8 lg:mb-10 transition-all duration-500"
                    src={regone}
                    alt="regone"
                  />
                  <span
                    className={`font-bold text-xl sm:text-2xl md:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-10 text-center transition-colors duration-500 ${
                      isDark ? "text-white" : "text-[#005B77]"
                    }`}
                  >
                    {t("registerStepThree.start_learning")}
                  </span>
                  <p
                    className={`w-[85%] sm:w-[80%] text-center transition-colors duration-500 ${
                      isDark ? "text-gray-300" : "text-[#1E1E1E]"
                    }`}
                  >
                    {t("registerStepThree.description")}
                  </p>
                </div>
              </motion.div>

              <div className="w-full lg:w-[52.56%] flex flex-col justify-center px-4 sm:px-8 md:px-[5%] relative transition-colors duration-500">
                <motion.div
                  variants={fadeInOnly(0.5)}
                  initial="hidden"
                  animate="visible"
                  className=" mb-25 sm:mb-25 md:mb-25 flex items-center justify-center"
                >
                  <div
                    className={`  w-[90%] md:w-[85%] lg:w-[65%] flex items-center justify-between   md:mb-6 text-sm absolute top-4 sm:top-6 lg:top-7  ${
                      i18n.language === "fa"
                        ? "right-4 sm:right-8 lg:right-22 xl:right-30"
                        : "left-4 sm:left-8 lg:left-22 xl:left-30"
                    } flex items-center`}
                  >
                    <div
                      onClick={toggleTheme}
                      className={` flex md:hidden cursor-pointer py-3 px-2 w-11 h-5 rounded-full transition-colors duration-500 ${
                        isDark
                          ? "bg-yellow-300/40 justify-end"
                          : "bg-blue-900/30 justify-start"
                      }`}
                    >
                      <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center">
                        <img src={`${isDark ? sun : moon}`} alt="theme icon" />
                      </div>
                    </div>
                    <Link to="/RegisterStepTwo">
                      <div>
                        <EastIcon
                          className={`cursor-pointer ml-2 transition-colors duration-500 ${
                            isDark ? "text-gray-300" : "text-[#005B77]"
                          }`}
                        />
                        <span
                          className={`cursor-pointer font-bold transition-colors duration-500 ${
                            isDark ? "text-gray-300" : "text-[#005B77]"
                          }`}
                        >
                          {t("registerStepThree.back")}
                        </span>
                      </div>
                    </Link>
                    <TranslateButton />
                  </div>
                </motion.div>

                <motion.h2
                  variants={fadeInUp(0.6)}
                  initial="hidden"
                  animate="visible"
                  className={`text-xl sm:text-2xl md:text-2xl text-center font-bold mb-2 sm:mb-3 transition-colors duration-500 ${
                    isDark ? "text-white" : "text-[#008C78]"
                  }`}
                >
                  {t("registerStepThree.create_account")}
                </motion.h2>

                <motion.p
                  variants={fadeInUp(0.9)}
                  initial="hidden"
                  animate="visible"
                  className={`mb-4 sm:mb-6 md:mb-8 text-center transition-colors duration-500 ${
                    isDark ? "text-gray-300" : "text-[#333333]"
                  }`}
                >
                  {t("registerStepThree.complete_info")}
                </motion.p>

                <motion.div
                  variants={fadeInUp(1.2)}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center relative"
                >
                  <PhoneIphoneIcon
                    className={`absolute top-3 ${
                      i18n.language === "fa"
                        ? "right-8 sm:right-20 md:right-13 lg:right-20 "
                        : "left-8 sm:left-20 md:left-13 lg:left-19"
                    } transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-[grey]"
                    }`}
                  />
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder={t("registerStepThree.placeholder.email")}
                    className={`!mb-10 rounded-4xl py-3 px-12 sm:px-16 mb-4 sm:mb-6 md:mb-6 w-[90%] sm:w-[80%] md:w-[80%] focus:outline-none focus:ring-2 transition-colors duration-500 ${
                      isDark
                        ? "bg-[#454545] text-gray-200 focus:ring-[#008C78] placeholder-gray-300"
                        : "bg-[#F3F4F6] text-[#383838] focus:ring-[#008C78] placeholder-gray-500"
                    }`}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <div
                      className={` text-red-500 text-sm absolute  font-semibold text-center ${
                        i18n.language === "fa"
                          ? " right-10 sm:right-20 md:right-20 top-14"
                          : " left-10 sm:left-20 md:left-20 top-14"
                      }  `}
                    >
                      {errors.phoneNumber}
                    </div>
                  )}

                  <LockIcon
                    className={`absolute top-25 ${
                      i18n.language === "fa"
                        ? "right-8 sm:right-20 md:right-13 lg:right-20 "
                        : "left-8 sm:left-20 md:left-13 lg:left-19"
                    } transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-[grey]"
                    }`}
                  />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("registerStepThree.placeholder.password")}
                    className={`!mb-10 rounded-4xl py-3 px-12 sm:px-16 mb-4 sm:mb-6 md:mb-6 w-[90%] sm:w-[80%] md:w-[80%] focus:outline-none focus:ring-2 transition-colors duration-500 ${
                      isDark
                        ? "bg-[#454545] text-gray-200 focus:ring-[#008C78] placeholder-gray-300"
                        : "bg-[#F3F4F6] text-[#383838] focus:ring-[#008C78] placeholder-gray-500"
                    }`}
                  />
                  {touched.password && errors.password && (
                    <div
                      className={`text-red-500  text-[11px]  sm:text-sm absolute font-semibold text-center  ${
                        i18n.language === "fa"
                          ? " right-10 sm:right-20 md:right-20 top-36"
                          : " left-10 sm:left-20 md:left-20 top-36"
                      }   `}
                    >
                      {errors.password}
                    </div>
                  )}
                  <VisibilityOffIcon
                    onClick={toggleEyepassword}
                    className={`absolute top-25 ${
                      i18n.language === "fa"
                        ? "left-8 sm:left-20 md:left-13 lg:left-20 "
                        : "right-8 sm:right-20 md:right-13 lg:right-19"
                    } transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-[grey]"
                    }`}
                  />

                  <LockIcon
                    className={`absolute top-47 ${
                      i18n.language === "fa"
                        ? "right-8 sm:right-20 md:right-13 lg:right-20 "
                        : "left-8 sm:left-20 md:left-13 lg:left-19"
                    } transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-[grey]"
                    }`}
                  />
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder={t(
                      "registerStepThree.placeholder.confirmPassword",
                    )}
                    className={`rounded-4xl py-3 px-12 sm:px-16 mb-4 sm:mb-6 md:mb-6 w-[90%] sm:w-[80%] md:w-[80%] focus:outline-none focus:ring-2 transition-colors duration-500 ${
                      isDark
                        ? "bg-[#454545] text-gray-200 focus:ring-[#008C78] placeholder-gray-300"
                        : "bg-[#F3F4F6] text-[#383838] focus:ring-[#008C78] placeholder-gray-500"
                    }`}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div
                      className={` text-red-500 text-sm absolute font-semibold text-center ${
                        i18n.language === "fa"
                          ? " right-10 sm:right-20 md:right-20 top-58"
                          : " left-10 sm:left-20 md:left-20 top-58"
                      }  `}
                    >
                      {errors.confirmPassword}
                    </div>
                  )}
                  <VisibilityOffIcon
                    onClick={toggleEyeconfirmpassword}
                    className={`absolute top-47 ${
                      i18n.language === "fa"
                        ? "left-8 sm:left-20 md:left-13 lg:left-20 "
                        : "right-8 sm:right-20 md:right-13 lg:right-19"
                    } transition-colors duration-500 ${
                      isDark ? "text-gray-400" : "text-[grey]"
                    }`}
                  />

                  <motion.div
                    variants={fadeInUp(1.5)}
                    initial="hidden"
                    animate="visible"
                    className="w-full flex justify-center"
                  >
                    <button
                      type="submit"
                      className={`text-center mt-6 md:mt-5 font-semibold py-3 rounded-4xl w-[90%] sm:w-[80%] md:w-[80%] transition-colors duration-500 cursor-pointer ${
                        isDark
                          ? "bg-[#008C78] text-[white] hover:bg-[#008C78]"
                          : "bg-[#008C78] text-white hover:bg-[#007563]"
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <p>{t("registerStepOne.loading")} </p>
                          <ClockLoader size={23} color="white" />
                        </div>
                      ) : (
                        t("registerStepThree.submit")
                      )}
                    </button>
                  </motion.div>

                  <motion.p
                    variants={fadeInUp(1.8)}
                    initial="hidden"
                    animate="visible"
                    className={`  text-sm mt-8 mb-8 md:mb-6 sm:mt-6 text-center transition-colors duration-500 ${
                      isDark ? "text-gray-300" : "text-[#333333]"
                    }`}
                  >
                    {t("registerStepThree.have_account")}{" "}
                    <span
                      className={`font-semibold cursor-pointer hover:underline transition-colors duration-500 ${
                        isDark ? "text-[#008C78]" : "text-[#008C78]"
                      }`}
                    >
                      <Link to="/login">{t("registerStepThree.login")}</Link>
                    </span>
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default StepThree;
