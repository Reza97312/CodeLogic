import Http from "../../../interceptor/interceptor";

const AddNewsDetailsComment = async (payload) => {
  try {
    const result = await Http.post("/News/CreateNewsComment", payload);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default AddNewsDetailsComment;
