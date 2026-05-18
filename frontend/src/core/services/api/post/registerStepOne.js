import Http from "../../../interceptor/interceptor";

const RegisterStepOne = async (payload) => {
  try {
    const result = await Http.post("/Sign/SendVerifyMessage", payload);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export default RegisterStepOne;
