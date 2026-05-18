import Http from "../../../interceptor/interceptor";

export const GetMultiAcc = async () => {
  try {
    const result = await Http.get("/v2/multiAccount/myAccounts");
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};
