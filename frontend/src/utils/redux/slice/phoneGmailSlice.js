import { createSlice } from "@reduxjs/toolkit";

export const phoneGmailSlice = createSlice({
  name: "phoneGmail",
  initialState: { phoneOrGmail: "" },
  reducers: {
    addPhoneGmail: (state, action) => {
      state.phoneOrGmail = action.payload;
    },
  },
});
export const { addPhoneGmail } = phoneGmailSlice.actions;
