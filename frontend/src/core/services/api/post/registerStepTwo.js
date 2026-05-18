import Http from "../../../interceptor/interceptor";

const RegisterStepTwoApi = async (payload) => {
  try {
    const result = await Http.post("/Sign/VerifyMessage", payload);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
export default RegisterStepTwoApi;
