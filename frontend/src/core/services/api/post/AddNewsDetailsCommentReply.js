import Http from "../../../interceptor/interceptor";

const AddNewsDetailsCommentReply = async (payload) => {
  try {
    const result = await Http.post("/News/CreateNewsReplyComment", payload);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default AddNewsDetailsCommentReply;
