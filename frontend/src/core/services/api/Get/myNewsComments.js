import Http from "../../../interceptor/interceptor";

const myNewsComments = async () => {
  try {
    const result = await Http.get("/SharePanel/GetMyNewsComments");
    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export default myNewsComments;
