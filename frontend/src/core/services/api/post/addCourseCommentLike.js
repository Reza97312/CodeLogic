import http from "../../../interceptor/interceptor.js";
export const addCourseCommentLike = async (courseCommentId) => {
  try {
    const result = await http.post(
      `/Course/AddCourseCommentLike?CourseCommandId=${courseCommentId}`
    );

    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
