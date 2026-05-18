import React from "react";
import http from "../../../interceptor/interceptor.js";
export const RemoveMultiAcc = async (id) => {
  try {
    const result = await http.patch(`/v2/multiAccount/removeAccount/${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
