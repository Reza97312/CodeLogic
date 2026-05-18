import Http from "../../../interceptor/interceptor";

export const AddMultiAcc = async (payload) => {
  try {
    const result = await Http.post("/v2/multiAccount/addAccount", payload);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);

    throw err;
  }
};
