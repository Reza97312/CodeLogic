import React from "react";
import http from "../../../interceptor/interceptor.js";
export const GetNewsListSection = async (params) => {
  try {
    const result = await http.get("/News", {
      params: {
        RowsOfPage: 5,
        SortingCol: "InsertDate",
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
