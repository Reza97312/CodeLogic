import http from "../../../interceptor/interceptor.js";

export const likeCourses = async (id) => {
  try {
    const result = await http.post(`/Course/AddCourseLike?CourseId=${id}`);
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
