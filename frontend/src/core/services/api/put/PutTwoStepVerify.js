import { toast } from "react-toastify";
import http from "../../../interceptor/interceptor.js";
export const PutTwoStepVerify = async (payload) => {
  try {
    const result = await http.put("/SharePanel/EditSecurity", payload);
    console.log(result);
    return result;
  } catch (err) {
    if (err.status === 400) {
      toast.error("ابتدا ربات را با لینک استارت کنید");
    }
  }
};
