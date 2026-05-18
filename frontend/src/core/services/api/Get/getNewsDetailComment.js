import Http from "../../../interceptor/interceptor";

const getNewsDetailComment = async (id) => {
  try {
    const result = await Http.get(`/News/GetNewsComments?NewsId=${id}`);

    return result;
  } catch (error) {
    console.log("getNewsDetailComment error:", error);
    throw error;
  }
};

export default getNewsDetailComment;
