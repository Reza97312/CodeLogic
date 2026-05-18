import { Modal } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Login1Val } from "../../utils/Validations/loginVal/LoginVal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddMultiAcc } from "../../core/services/api/post/AddMultiAcc";
import { toast } from "react-toastify";
import i18n from "../../utils/i18n/i18n";
import lock from "../../assets/Icons/A/lock.png";
import use from "../../assets/Icons/A/user.png";
import eyeClose from "../../assets/Icons/A/eyeClose.png";
import eyeOpen from "../../assets/Icons/A/eyeOpen.png";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { removeItem, setItem } from "../../utils/helper/storage.services";

const AddMultiAccModal = ({ handleClose, isOpen }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "fa";
  const queryClient = useQueryClient();
  const { mutate: postMulti, isPending } = useMutation({
    mutationKey: ["ADDMULTI"],
    mutationFn: (vals) => AddMultiAcc(vals),
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["ALLMULTIACOUNTS"]);
      handleClose();
      setItem("token", data.token);
      queryClient.invalidateQueries([
        "profileInfo",
        "resCourses",
        "ALLMULTIACOUNTS",
      ]);
    },
  });
  const [validationSchema, setValidationSchema] = useState(Login1Val());
  useEffect(() => {
    setValidationSchema(Login1Val());
  }, [i18n.language]);

  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className=" w-[95%] sm:w-full max-w-md mx-auto mt-20 py-6 flex flex-col items-center  px-6 bg-white dark:bg-[#454545] rounded-xl shadow-lg">
        <h2 className="text-[19px] text-[#008C78] dark:text-[#008C78]  font-bold mb-4">
          افزودن اکانت
        </h2>
        <Formik
          initialValues={{
            phoneOrGmail: "",
            password: "",
            rememberMe: false,
          }}
          onSubmit={(values) => {
            console.log(values);
            postMulti(values);
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className=" flex flex-col gap-5 ">
                <div className="relative">
                  <Field
                    className={`outline-none  bg-no-repeat  ${
                      isRTL ? "bg-[right_20px_center]" : "bg-[left_20px_center]"
                    }  bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545]  w-full rounded-full px-13 py-3  placeholder:text-[15px] ${
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
                    className="text-[#EF5350] text-[14px] absolute top-15 right-0 "
                  />
                </div>

                <div className=" relative mt-6">
                  <Field
                    className={` bg-no-repeat   ${
                      isRTL ? "bg-[right_20px_center]" : "bg-[left_20px_center]"
                    } bg-[#F3F4F6] dark:text-[#ffff] dark:bg-[#454545] w-full rounded-full px-13 py-3 outline-none placeholder:text-[15px] ${
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
                    className="text-[#EF5350] text-[14px] absolute right-0 top-15 "
                  />
                </div>

                <div className="w-full flex justify-between mt-6 ">
                  <div className="flex gap-2">
                    <Field
                      className=""
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                    />
                    <label className=" text-[14px]" htmlFor="rememberMe">
                      {t("login.RememberMe")}
                    </label>
                  </div>
                  <Link
                    to={"/forgotPassOne"}
                    className="text-[13px] text-[#848484] hover:text-blue-400 transition duration-300"
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
                  className="w-full bg-[#008C78] text-white text-[16px] rounded-full mt-5 px-5 py-3  "
                >
                  {t("login.login")}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddMultiAccModal;
