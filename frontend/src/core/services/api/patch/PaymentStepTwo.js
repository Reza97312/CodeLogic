import React from "react";
import http from "../../../interceptor/interceptor.js";
export const PaymentStepTwo = async (payload) => {
  try {
    const result = await http.patch(
      `/NewVersion/CoursePayment/StepTwoToPay/${payload.id}`,
      { Authority: payload.auth }
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
