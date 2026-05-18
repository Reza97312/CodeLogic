import { createSlice } from "@reduxjs/toolkit";

export const gmailSlice = createSlice({
  name: "gmail",
  initialState: { gmail: "" },
  reducers: {
    addGmail: (state, action) => {
      state.gmail = action.payload;
    },
  },
});
export const { addGmail } = gmailSlice.actions;
