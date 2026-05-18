import Http from "../../../interceptor/interceptor";
const GetCourseReplyComments = async (courseId, commentId) => {
  try {
    const result = await Http.get(
      `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`
    );

    return result;
  } catch (error) {
    console.log("GetCourseReplyComments error:", error);
    throw error;
  }
};

export default GetCourseReplyComments;
