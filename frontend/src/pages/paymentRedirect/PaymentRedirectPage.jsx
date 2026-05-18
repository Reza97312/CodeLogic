import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PaymentStepTwo } from "../../core/services/api/patch/PaymentStepTwo";
import Lottie from "lottie-react";
import loading from "../../assets/Images/A/loading.gif";
import success from "../../assets/Images/Success.json";
import errorAnim from "../../assets/Images/Error 404.json";
import Button from "@mui/material/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getItem } from "../../utils/helper/storage.services";
import { useTranslation } from "react-i18next";
const PaymentRedirectPage = () => {
  const { t } = useTranslation();
  //   const reserveId = useSelector((state) => state.reserveIdRed.reserveId);
  const reserveId = getItem("reserveId");
  const [searchParams] = useSearchParams();
  const authority = searchParams.get("Authority");
  console.log("id", reserveId);
  const [status, setStatus] = useState("pending");

  const { mutate: step2 } = useMutation({
    mutationKey: ["STEPTWO"],
    mutationFn: (payload) => PaymentStepTwo(payload),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        setStatus("success");
      } else {
        toast.error(data.message || "پرداخت ناموفق بود");
        setStatus("failed");
      }
    },
    onError: () => {
      toast.error("مشکلی پیش امده !");
      setStatus("failed");
    },
  });
  const navigate = useNavigate();
  const calledRef = useRef(false);
  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    step2({ id: reserveId, auth: authority });
  }, []);
  return (
    <div
      className="flex  items-center bg-[#eee] h-screen
          flex-col py-4 px-6 dark:text-white dark:bg-[#333] gap-8"
    >
      <h2 className=" mt-15 text-[#008C78] text-[24px] font-bold ">
        {status === "pending"
          ? t("payment.pending")
          : status === "success"
          ? t("payment.success")
          : t("payment.pending")}
      </h2>
      {status === "pending" ? (
        <img className="w-[300px] h-[300px]" src={loading} />
      ) : status === "success" ? (
        <Lottie className="w-[300px] h-[300px]" animationData={success} />
      ) : (
        <Lottie className=" h-[300px]" animationData={errorAnim} />
      )}
      <button
        onClick={() => navigate("/userPanel/myReservedCourses")}
        disabled={status === "pending"}
        className="cursor-pointer px-5 py-3 bg-[#008C78] text-[#fff] rounded-2xl "
      >
        {t("payment.back")}
      </button>
    </div>
  );
};

export default PaymentRedirectPage;
