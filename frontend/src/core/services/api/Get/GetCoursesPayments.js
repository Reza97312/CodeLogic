import React from "react";
import http from "../../../interceptor/interceptor.js";
export const GetCoursesPayments = async () => {
  try {
    const result = http.get("/CoursePayment/StudentUserPayList");
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
