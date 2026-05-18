import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export const ReserveIdSlice = createSlice({
  name: "ReserveId",
  initialState: { reserveId: "" },
  reducers: {
    addReserveId: (state, action) => {
      state.reserveId = action.payload;
    },
  },
});
export const { addReserveId } = ReserveIdSlice.actions;
