import { configureStore } from "@reduxjs/toolkit";
import { gmailSlice } from "../slice/gmailSlice";
import { phoneGmailSlice } from "../slice/phoneGmailSlice";
import { ReserveIdSlice } from "../slice/ReserveIdSlice";

export const store = configureStore({
  reducer: {
    gmailred: gmailSlice.reducer,
    phoneGmailred: phoneGmailSlice.reducer,
    reserveIdRed: ReserveIdSlice.reducer,
  },
});
