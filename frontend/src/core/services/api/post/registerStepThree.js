import Http from "../../../interceptor/interceptor";

const RegisterStepThreeApi = async (payload) => {
  try {
    const result = await Http.post("/Sign/Register", payload);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default RegisterStepThreeApi;
