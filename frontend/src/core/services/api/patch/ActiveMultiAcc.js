import React from "react";
import http from "../../../interceptor/interceptor.js";
export const ActiveMultiAcc = async (id) => {
  try {
    const result = await http.patch(`/v2/multiAccount/activeAccount/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
