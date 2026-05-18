import Http from "../../../interceptor/interceptor";

const Login = async (payload) => {
  try {
    const result = await Http.post("/Sign/Login", payload);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default Login;
