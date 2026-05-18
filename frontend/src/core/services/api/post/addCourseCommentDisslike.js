import http from "../../../interceptor/interceptor.js";
export const addCourseCommentDisslike = async (courseCommentId) => {
  try {
    const result = await http.post(
      `/Course/AddCourseCommentDissLike?CourseCommandId=${courseCommentId}`
    );

    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
