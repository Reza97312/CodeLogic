import http from "../../../interceptor/interceptor.js";
export const addReplyCourseComments = async (replyData) => {
  try {
    const { commentId, courseId, title, describe } = replyData;

    const formData = new FormData();
    formData.append("CommentId", commentId);
    formData.append("CourseId", courseId);
    formData.append("Title", title);
    formData.append("Describe", describe);

    const result = await http.post("/Course/AddReplyCourseComment", formData);

    console.log(result);
    return result;
  } catch (err) {
    console.error("Error adding course reply:", err);
    throw err;
  }
};
