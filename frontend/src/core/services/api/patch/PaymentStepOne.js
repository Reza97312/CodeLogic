import React from "react";
import http from "../../../interceptor/interceptor.js";
export const PaymentStepOne = async (val) => {
  try {
    const result = await http.patch(
      `/NewVersion/CoursePayment/StepOneToPay/${val}`,
      { callbackUrl: "http://localhost:5173/redirect/" }
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
