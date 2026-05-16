import React, { useEffect, useState } from "react";
import bgCover from "../../assets/Images/A/contactUs.png";
import ContactUsSide from "../../components/ContactUsSide/ContactUsSide";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import telephone from "../../assets/Icons/A/telephone.png";
import textUs from "../../assets/Icons/A/textUs.png";
import emailIcon from "../../assets/Icons/A/email.png";
import userIcon from "../../assets/Icons/a/user.png";
import { useTranslation } from "react-i18next";
import { ContactVal } from "../../utils/Validations/contactUs/ContactVal";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "fa";
  const [validationSchema, setValidationShema] = useState(ContactVal());
  useEffect(() => {
    setValidationShema(ContactVal());
  }, [i18n.language]);
  const goDown = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const goOut = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  return (
    <motion.div
      variants={goDown}
      initial="hidden"
      animate="visible"
      className="bg-[#F3F4F6] dark:bg-[#1E1E1E]  pb-8"
    >
      <motion.div
        variants={goOut}
        initial="hidden"
        animate="visible"
        className=" relative w-full  h-[120px] sm:h-full  "
      >
        <div>
          <img src={bgCover} alt="" className="w-full h-[120px] sm:h-full " />
        </div>
        <div className="bg-[#00000081] absolute inset-0 "></div>
        <div
          className={`absolute top-[50%]  ${
            isRTL ? " right-7.5 sm:right-10" : " left-7.5 sm:left-10"
          } translate-y-[-50%] `}
        >
          <h2 className=" text-md sm:text-[32px]  font-bold text-[#ffff]">
            {t("contactUs.header1")}
          </h2>
          <p className=" text-sm sm:text-[16px] text-[#ffff] ">
            {t("contactUs.header2")}
          </p>
        </div>
      </motion.div>
      <div className="  flex flex-col md:flex-row justify-center items-center md:items-start gap-4 xl:gap-40 2xl:gap-70 py-[45px]">
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 300, type: "spring", stiffness: 250 }}
          className=" px-7  md:p-0 w-[full] md:w-[40%] h-full  2xl:mt-10"
        >
          <ContactUsSide />
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="w-full  md:w-[33%] px-10 md:p-0 mt-4 md:m-0"
        >
          <Formik
            initialValues={{
              name: "",
              number: "",
              email: "",
              text: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              toast.success("پیام شما با موفقیت ارسال شد");
            }}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <div
                  className="w-full h-full shadow-md rounded-4xl bg-[#FFFFFF] dark:bg-[#333]
               py-[30px] px-[16px] flex flex-col gap-10 items-center"
                >
                  <motion.div variants={item} className="w-[90%] relative">
                    <Field
                      name="name"
                      type="text"
                      className={`outline-none shadow  bg-no-repeat  ${
                        isRTL
                          ? "bg-[right_20px_center]"
                          : "bg-[left_20px_center]"
                      } ${
                        errors.name && touched.name
                          ? "border-[#EF5350] border-1 "
                          : ""
                      } bg-[#F3F4F6]
                   dark:text-[#ffff] dark:bg-[#454545]  w-full rounded-full px-13 py-3  placeholder:text-[15px] `}
                      placeholder={t("contactUs.name")}
                      style={{ backgroundImage: `url(${userIcon})` }}
                    />
                    <ErrorMessage
                      name={"name"}
                      component={"span"}
                      className="text-[#EF5350]  text-[12px] sm:text-[14px] absolute top-15 right-0 "
                    />
                  </motion.div>
                  <motion.div variants={item} className="w-[90%] relative">
                    <Field
                      name="email"
                      //     className={`outline-none shadow  bg-no-repeat  ${
                      //       isRTL
                      //         ? "bg-[right_20px_center]"
                      //         : "bg-[left_20px_center]"
                      //     }  bg-[#F3F4F6]
                      //  dark:text-[#ffff] dark:bg-[#454545]  w-full rounded-full px-13 py-3  placeholder:text-[15px] `}
                      className={`outline-none shadow  bg-no-repeat  ${
                        isRTL
                          ? "bg-[right_20px_center]"
                          : "bg-[left_20px_center]"
                      } ${
                        errors.email && touched.email
                          ? "border-[#EF5350] border-1 "
                          : ""
                      } bg-[#F3F4F6]
                   dark:text-[#ffff] dark:bg-[#454545]  w-full rounded-full px-13 py-3  placeholder:text-[15px] `}
                      type="text"
                      placeholder={t("contactUs.email")}
                      style={{ backgroundImage: `url(${emailIcon})` }}
                    />
                    <ErrorMessage
                      name={"email"}
                      component={"span"}
                      className="text-[#EF5350] whitespace-nowrap text-[14px] absolute top-15 right-0 "
                    />
                  </motion.div>
                  <motion.div variants={item} className="w-[90%] relative">
                    <Field
                      name="number"
                      type="text"
                      className={`outline-none shadow  bg-no-repeat  ${
                        isRTL
                          ? "bg-[right_20px_center]"
                          : "bg-[left_20px_center]"
                      } ${
                        errors.number && touched.number
                          ? "border-[#EF5350] border-1 "
                          : ""
                      } bg-[#F3F4F6]
                   dark:text-[#ffff] dark:bg-[#454545]  w-full rounded-full px-13 py-3  placeholder:text-[15px] `}
                      placeholder={t("contactUs.phone")}
                      style={{ backgroundImage: `url(${telephone})` }}
                    />
                    <ErrorMessage
                      name={"number"}
                      component={"span"}
                      className="text-[#EF5350] text-[14px] absolute top-15 right-0 "
                    />
                  </motion.div>
                  <motion.div variants={item} className="w-[90%] relative">
                    <Field
                      name="text"
                      type="text"
                      className={`outline-none shadow  bg-no-repeat  ${
                        isRTL
                          ? "bg-[right_20px_center]"
                          : "bg-[left_20px_center]"
                      } ${
                        errors.text && touched.text
                          ? "border-[#EF5350] border-1 "
                          : ""
                      } bg-[#F3F4F6]
                   dark:text-[#ffff] dark:bg-[#454545]  w-full rounded-full px-13 py-3  placeholder:text-[15px] `}
                      placeholder={t("contactUs.text")}
                      style={{ backgroundImage: `url(${textUs})` }}
                    />
                    <ErrorMessage
                      name={"text"}
                      component={"span"}
                      className="text-[#EF5350] text-[14px] absolute top-15 right-0 "
                    />
                  </motion.div>
                  <motion.button
                    whileHover={{
                      scale: "1.02",
                      boxShadow: "0 0 8px #cccccc",
                    }}
                    whileTap={{ scale: "0.98" }}
                    transition={{ ease: "easeInOut", duration: 350 }}
                    type="submit"
                    className="w-[90%] bg-[#008C78] text-white text-[16px] rounded-full px-5 py-3  "
                  >
                    ارسال
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
