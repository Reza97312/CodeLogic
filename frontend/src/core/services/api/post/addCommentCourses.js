import http from "../../../interceptor/interceptor.js";
export const addCommentCourses = async (commentData) => {
  try {
    const { id, title, describe } = commentData;
    const formData = new FormData();
    formData.append("CourseId", id);
    formData.append("Title", title);
    formData.append("Describe", describe);

    const result = await http.post("/Course/AddCommentCourse", formData);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
