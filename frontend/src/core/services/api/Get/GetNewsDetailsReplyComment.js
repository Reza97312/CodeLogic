import Http from "../../../interceptor/interceptor";

const GetNewsDetailsReplyComment = async (id) => {
  try {
    const result = await Http.get(`/News/GetRepliesComments?Id=${id}`);

    return result;
  } catch (error) {
    console.log("getNewsDetailComment error:", error);
    throw error;
  }
};

export default GetNewsDetailsReplyComment;
