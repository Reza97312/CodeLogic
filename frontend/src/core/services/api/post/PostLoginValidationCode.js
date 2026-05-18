import http from "../../../interceptor/interceptor.js";
export const sendOtp = async (params) => {
  try {
    const result = await http.post(
      `/Sign/LoginTelegram/${params.code}/${params.phoneOrGmail}`
    );
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};
export default sendOtp;
