import React, { useState, useRef, useEffect } from "react";
import regtwo from "../../../assets/Images/regtwo.svg";
import EastIcon from "@mui/icons-material/East";
import { Formik, Form, Field } from "formik";
import { RegisterStepTwo } from "../../../utils/Validations/RegisterVal/Register.validation";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TranslateButton from "../../../components/TranslateButton/TranslateButton";
import sun from "../../../assets/Icons/A/sun.png";
import moon from "../../../assets/Icons/A/moon.png";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import RegisterStepTwoApi from "../../../core/services/api/post/registerStepTwo";
import RegisterStepOne from "../../../core/services/api/post/registerStepOne";
import { ClockLoader } from "react-spinners";
import { useTheme } from "../../../utils/hooks/useTheme/useTheme";

const StepTwo = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gmail = searchParams.get("gmail");
  const [initialValues] = useState({ code: ["", "", "", "", "", ""] });

  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const inputsRef = useRef([]);

  const [time, setTime] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [time]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (values) => {
    const finalCode = values.code.join("");
    verifyCode({ gmail, verifyCode: finalCode });
  };

  const { mutate: verifyCode, isPending } = useMutation({
    mutationKey: ["VERIFY_CODE"],
    mutationFn: (payload) => RegisterStepTwoApi(payload),
    onSettled: (data) => {
      if (data?.success) {
        toast.success(t("registerStepOne.verifysuc"));
        navigate(`/RegisterStepThree?gmail=${encodeURIComponent(gmail)}`);
      } else if (!data?.success) {
        toast.error("کد وارد شده اشتباه است");
      }
    },
  });

  const { mutate: resendCode, isPending: isResending } = useMutation({
    mutationKey: ["RESEND_CODE"],
    mutationFn: () => RegisterStepOne({ gmail }),
    onSettled: (data) => {
      if (data?.success) {
        toast.success("کد جدید ارسال شد");
        setTime(120);
        setCanResend(false);
      } else {
        toast.error("خطا در ارسال مجدد کد");
      }
    },
  });

  const handleChange = (e, index, values, setFieldValue) => {
    const value = e.target.value.replace(/\D/, "");
    const newCode = [...values.code];
    newCode[index] = value;
    setFieldValue("code", newCode);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index, values, setFieldValue) => {
    if (e.key === "Backspace") {
      const newCode = [...values.code];
      newCode[index] = "";
      setFieldValue("code", newCode);
    }
  };

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
    hidden: { x: 200, opacity: 0, scale: 0.95 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
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
        validationSchema={RegisterStepTwo}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, touched }) => (
          <Form className="w-full flex justify-center">
            <motion.div
              className={` flex  flex-col md:flex-row w-[90%] sm:w-[95%] md:w-[90%] h-[72.17%] lg:h-[72.17%] rounded-4xl shadow-md overflow-hidden transition-colors duration-500 ${
                isDark ? "bg-[#333]" : "bg-white"
              }`}
            >
              <div className="w-full   hidden  lg:w-[47.44%] md:flex justify-center items-center">
                <motion.div
                  variants={imageVariant}
                  className={`  w-[95%] sm:w-[90%]  h-auto lg:h-[95.67%] rounded-xl flex flex-col justify-center items-center md:mb-4 md:mt-4 lg:mt-0 lg:mb-0 mr-0 lg:mr-2  relative transition-colors duration-500 ${
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
                    src={regtwo}
                    alt="regtwo"
                  />
                  <span
                    className={`font-bold text-xl sm:text-2xl md:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-10 text-center transition-colors duration-500 ${
                      isDark ? "text-white" : "text-[#005B77]"
                    }`}
                  >
                    {t("registerStepTwo.start_learning")}
                  </span>
                  <p
                    className={`w-[85%] sm:w-[80%] md:mb-6 lg:mb-0 text-center transition-colors duration-500 ${
                      isDark ? "text-gray-300" : "text-[#1E1E1E]"
                    }`}
                  >
                    {t("registerStepTwo.description")}
                  </p>
                </motion.div>
              </div>

              <div className="w-full    lg:w-[52.56%] flex flex-col justify-center px-4 sm:px-8 md:px-[5%] relative transition-colors duration-500">
                <motion.div
                  variants={fadeInOnly(0.5)}
                  initial="hidden"
                  animate="visible"
                  className="mb-25 sm:mb-25 md:mb-10 flex items-center justify-center"
                >
                  <div
                    className={`  w-[90%] md:w-[85%] lg:w-[65%] flex items-center justify-between   md:mb-6 text-sm absolute top-4 sm:top-6 lg:top-10  ${
                      i18n.language === "fa"
                        ? "right-4 sm:right-8 lg:right-22 xl:right-30"
                        : "left-4 sm:left-8 lg:left-22 xl:left-30"
                    } flex items-center`}
                  >
                    <div
                      onClick={toggleTheme}
                      className={` flex md:hidden cursor-pointer py-3 px-2 w-11 h-5 rounded-full   transition-colors duration-500 ${
                        isDark
                          ? "bg-yellow-300/40 justify-end"
                          : "bg-blue-900/30 justify-start"
                      }`}
                    >
                      <div className="w-3 h-[90%] rounded-full transition-all duration-500 flex items-center">
                        <img src={`${isDark ? sun : moon}`} alt="theme icon" />
                      </div>
                    </div>
                    <Link to="/RegisterStepOne">
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
                          {t("registerStepTwo.back")}
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
                  className={`text-xl sm:text-2xl md:text-2xl text-center font-bold mb-3 sm:mb-3 transition-colors duration-500 ${
                    isDark ? "text-white" : "text-[#008C78]"
                  }`}
                >
                  {t("registerStepTwo.create_account")}
                </motion.h2>

                <motion.p
                  variants={fadeInUp(0.9)}
                  initial="hidden"
                  animate="visible"
                  className={`mb-6 sm:mb-6 md:mb-8 text-center transition-colors duration-500 ${
                    isDark ? "text-gray-300" : "text-[#333333]"
                  }`}
                >
                  {t("registerStepTwo.enter_code")}
                </motion.p>

                <motion.div
                  variants={fadeInUp(1.2)}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center  relative   "
                >
                  <div
                    className="flex justify-center mb-2   "
                    style={{ direction: "ltr" }}
                  >
                    {values.code.map((digit, index) => (
                      <Field
                        key={index}
                        innerRef={(el) => (inputsRef.current[index] = el)}
                        name={`code[${index}]`}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) =>
                          handleChange(e, index, values, setFieldValue)
                        }
                        onKeyDown={(e) =>
                          handleKeyDown(e, index, values, setFieldValue)
                        }
                        className={`  w-9 h-9 sm:w-11 sm:h-11 md:w-11 md:h-11 lg:w-14 lg:h-14 mx-0.5 sm:mx-3 md:mx-1 lg:mx-3 text-center text-lg rounded-xl md:rounded-2xl transition-colors duration-300 focus:outline-none bg-[#ecececaf] ${
                          digit
                            ? "border-2 border-[#008C78]"
                            : touched.code?.[index]
                              ? "border-2 border-red-500"
                              : "border-2 border-transparent focus:border-[#008C78]"
                        }`}
                      />
                    ))}
                  </div>

                  {touched.code &&
                    values.code.some(
                      (val, idx) => touched.code[idx] && !val,
                    ) && (
                      <div
                        className={` text-red-500 text-sm mt-1 font-semibold text-center absolute  ${
                          i18n.language === "fa"
                            ? " right-1 md:right-18 top-12 md:top-14 lg:top-16 "
                            : " left-1 md:left-18 top-12 md:top-14 lg:top-16"
                        } `}
                      >
                        {t("registerStepTwo.validation.required")}
                      </div>
                    )}

                  <motion.div
                    variants={fadeInUp(1.5)}
                    initial="hidden"
                    animate="visible"
                    className="w-full flex justify-center"
                  >
                    <button
                      disabled={isPending}
                      type="submit"
                      className={`  text-center mt-10 font-semibold py-3 rounded-4xl w-[70%] sm:w-[80%] md:w-[80%]  transition-colors duration-500 cursor-pointer ${
                        isDark
                          ? "bg-[#008C78] text-[white]"
                          : "bg-[#008C78] text-white hover:bg-[#007563]"
                      }`}
                    >
                      {isPending ? (
                        <div className="flex items-center justify-center gap-3">
                          <p>{t("registerStepOne.loading")} </p>
                          <ClockLoader size={23} color="white" />
                        </div>
                      ) : (
                        t("registerStepTwo.confirm_otp")
                      )}
                    </button>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={fadeInUp(1.8)}
                  initial="hidden"
                  animate="visible"
                  className="text-sm mt-8 mb-8 md:mb-0  sm:mt-6 text-center transition-colors duration-500"
                >
                  {!canResend ? (
                    <span
                      className={isDark ? "text-gray-300" : "text-[#333333]"}
                    >
                      {formatTime(time)}
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isResending}
                      onClick={() => resendCode()}
                      className={`font-bold  cursor-pointer transition-colors duration-500 ${
                        isDark ? "text-[#008C78] " : "text-[#008C78] "
                      }`}
                    >
                      {isResending ? (
                        <p> {t("registerStepOne.sending")} </p>
                      ) : (
                        <p> {t("registerStepOne.resendcode")}</p>
                      )}
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default StepTwo;
