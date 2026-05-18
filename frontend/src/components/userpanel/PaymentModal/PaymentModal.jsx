<<<<<<< HEAD:frontend/src/components/userpanel/PaymentModal/PaymentModal.jsx
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { PaymentStepOne } from "../../../core/services/api/patch/PaymentStepOne";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReserveId } from "../../../utils/redux/slice/ReserveIdSlice";
import { setItem } from "../../../utils/helper/storage.services";

const PaymentModal = ({ item, handleClosePayment }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: stepOne, isPending } = useMutation({
    mutationKey: ["STEPONE"],
    mutationFn: () => PaymentStepOne(item.reserveId),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = data.link;
      // dispatch(addReserveId(item.reserveId));
      setItem("reserveId", item.reserveId);
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className=" fixed inset-0 bg-black/50 backdrop-blur  flex justify-center items-center "
      onClick={() => handleClosePayment(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            duration: 300,
          },
        }}
        className=" bg-[#eee] rounded-3xl flex z-20 
          flex-col  mt-3 gap-6  py-4 px-6 dark:text-white dark:bg-[#333] "
      >
        <p>{t("payment.q1")}</p>
        <div className="flex gap-2 justify-center items-center  ">
          <button
            className="bg-[#008C78] text-[#ffff] cursor-pointer border 
               px-5 py-2 rounded-2xl hover:shadow-md "
            onClick={() => stepOne()}
          >
            {isPending ? t("payment.loading") : t("panelside.yes")}
          </button>
          <button
            onClick={() => handleClosePayment(false)}
            className=" cursor-pointer border dark:border-[#EAEAEA]
               dark:text-white px-3 py-2 rounded-2xl hover:shadow-md "
          >
            {t("login.Back")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;
=======
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import { PaymentStepOne } from "../../../core/services/api/patch/PaymentStepOne";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReserveId } from "../../../utils/redux/slice/ReserveIdSlice";
import { setItem } from "../../../utils/helper/storage.services";

const PaymentModal = ({ item, handleClosePayment }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: stepOne, isPending } = useMutation({
    mutationKey: ["STEPONE"],
    mutationFn: () => PaymentStepOne(item.reserveId),
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = data.link;
      // dispatch(addReserveId(item.reserveId));
      setItem("reserveId", item.reserveId);
    },
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className=" fixed inset-0 bg-black/50 backdrop-blur  flex justify-center items-center "
      onClick={() => handleClosePayment(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            stiffness: 300,
            duration: 300,
          },
        }}
        className=" bg-[#eee] rounded-3xl flex z-20 
          flex-col  mt-3 gap-6  py-4 px-6 dark:text-white dark:bg-[#333] "
      >
        <p>{t("payment.q1")}</p>
        <div className="flex gap-2 justify-center items-center  ">
          <button
            className="bg-[#008C78] text-[#ffff] cursor-pointer border 
               px-5 py-2 rounded-2xl hover:shadow-md "
            onClick={() => stepOne()}
          >
            {isPending ? t("payment.loading") : t("panelside.yes")}
          </button>
          <button
            onClick={() => handleClosePayment(false)}
            className=" cursor-pointer border dark:border-[#EAEAEA]
               dark:text-white px-3 py-2 rounded-2xl hover:shadow-md "
          >
            {t("login.Back")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;
>>>>>>> b25c6f7f5eb54a940fdd4c9c6f9c064a3c961de5:src/components/userpanel/PaymentModal/PaymentModal.jsx
